import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';

const NFTMarketplace = () => {
  const { account } = useWallet();
  const { contract } = useContract();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buyingTokenId, setBuyingTokenId] = useState(null);
  const [error, setError] = useState('');

  const fetchListings = async () => {
    if (!contract) return;

    try {
      setIsLoading(true);
      // This is a simplified approach - in a real app, you'd need to implement
      // a way to get all listings from the contract or use events
      const mockListings = [
        {
          tokenId: 1,
          seller: '0x1234567890123456789012345678901234567890',
          price: ethers.parseEther('0.1'),
          credits: 100,
          sanctuary: 'Amazon Rainforest Reserve'
        },
        {
          tokenId: 2,
          seller: '0x0987654321098765432109876543210987654321',
          price: ethers.parseEther('0.05'),
          credits: 50,
          sanctuary: 'Yellowstone National Park'
        }
      ];
      setListings(mockListings);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [contract]);

  const handleBuyNFT = async (tokenId, price) => {
    if (!account || !contract) {
      setError('Please connect your wallet first');
      return;
    }

    setBuyingTokenId(tokenId);
    setError('');

    try {
      const tx = await contract.buyNFT(tokenId, { value: price });
      await tx.wait();
      
      // Refresh listings after successful purchase
      await fetchListings();
      setBuyingTokenId(null);
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err.message || 'Failed to purchase NFT');
      setBuyingTokenId(null);
    }
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatPrice = (price) => {
    return ethers.formatEther(price);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🏢 Carbon Credit Marketplace</h2>
        <p className="text-gray-600">
          Purchase verified carbon credits from wildlife sanctuaries worldwide
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center">
            <span className="text-xl mr-2">❌</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {!account && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center">
            <span className="text-xl mr-2">⚠️</span>
            <span>Connect your wallet to purchase carbon credits</span>
          </div>
        </div>
      )}

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No listings available</h3>
          <p className="text-gray-600">Check back later for new carbon credit offerings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.tokenId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-32 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl mb-2">🌍</div>
                  <div className="font-semibold">Token #{listing.tokenId}</div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {listing.sanctuary || 'Wildlife Sanctuary'}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Credits:</span>
                    <span className="font-semibold text-green-600">
                      {listing.credits || 'N/A'} tons CO₂
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Seller:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {formatAddress(listing.seller)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-xl text-blue-600">
                      {formatPrice(listing.price)} ETH
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleBuyNFT(listing.tokenId, listing.price)}
                  disabled={!account || buyingTokenId === listing.tokenId || listing.seller.toLowerCase() === account?.toLowerCase()}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {buyingTokenId === listing.tokenId ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Purchasing...</span>
                    </>
                  ) : listing.seller.toLowerCase() === account?.toLowerCase() ? (
                    <span>Your Listing</span>
                  ) : !account ? (
                    <span>Connect Wallet</span>
                  ) : (
                    <>
                      <span>💳</span>
                      <span>Buy NFT</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 bg-green-50 rounded-xl p-6">
        <h3 className="font-bold text-green-800 mb-4">🌿 Why Choose WildCarbon?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-semibold text-green-700">Blockchain Verified</div>
            <div className="text-green-600">Every credit is immutably recorded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🦋</div>
            <div className="font-semibold text-green-700">Wildlife Protection</div>
            <div className="text-green-600">Direct funding to sanctuaries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-green-700">Transparent Impact</div>
            <div className="text-green-600">Track your environmental contribution</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;