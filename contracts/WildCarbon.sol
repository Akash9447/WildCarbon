// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WildCarbonMarket is ERC721, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Listing {
        uint256 price;
        address seller;
        bool isListed;
    }

    mapping(uint256 => Listing) public listings;

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string tokenURI, uint256 price);
    event NFTListed(uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTSold(uint256 indexed tokenId, uint256 price, address indexed buyer, address indexed seller);

    constructor() ERC721("WildCarbon", "WCC") {}

    /// @notice Mint NFT and directly list it for sale
    function mintAndList(string memory tokenURI, uint256 price) external returns (uint256) {
        require(price > 0, "Price must be greater than 0");

        _tokenIds.increment();
        uint256 newId = _tokenIds.current();

        _mint(msg.sender, newId);

        listings[newId] = Listing({
            price: price,
            seller: msg.sender,
            isListed: true
        });

        emit NFTMinted(newId, msg.sender, tokenURI, price);
        emit NFTListed(newId, price, msg.sender);

        return newId;
    }

    /// @notice Buy a listed NFT
    function buyNFT(uint256 tokenId) external payable nonReentrant {
        Listing memory item = listings[tokenId];

        require(item.isListed, "NFT not for sale");
        require(msg.value >= item.price, "Insufficient payment");
        require(item.seller != address(0), "Invalid seller");
        require(item.seller != msg.sender, "Cannot buy your own NFT");

        // ✅ Checks done above

        // ✅ Effects (update state before external interaction)
        listings[tokenId].isListed = false;
        listings[tokenId].seller = address(0);

        // ✅ Interaction: transfer NFT
        _transfer(item.seller, msg.sender, tokenId);

        // ✅ Interaction: transfer funds securely with call
        (bool sent, ) = payable(item.seller).call{value: msg.value}("");
        require(sent, "Payment failed");

        emit NFTSold(tokenId, item.price, msg.sender, item.seller);
    }

    /// @notice Update listing price (relist)
    function updateListing(uint256 tokenId, uint256 newPrice) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner can list");
        require(newPrice > 0, "Price must be >0");

        listings[tokenId] = Listing({
            price: newPrice,
            seller: msg.sender,
            isListed: true
        });

        emit NFTListed(tokenId, newPrice, msg.sender);
    }

    /// @notice Cancel a listing
    function cancelListing(uint256 tokenId) external {
        require(listings[tokenId].isListed, "Not listed");
        require(listings[tokenId].seller == msg.sender, "Not seller");

        listings[tokenId].isListed = false;
        listings[tokenId].seller = address(0);

        emit NFTListed(tokenId, 0, msg.sender);
    }
}
