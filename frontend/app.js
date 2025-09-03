// frontend/app.js
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract-config.js";

let provider;
let signer;
let contract;

// Connect Wallet
export async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const address = await signer.getAddress();
    document.getElementById("wallet").innerText = "Connected: " + address;
    return address;
  } else {
    alert("Please install MetaMask!");
  }
}

// Mint + List NFT
export async function mintAndListNFT(to, credits, uri, price) {
  try {
    const tx = await contract.mintAndListNFT(to, credits, uri, price);
    await tx.wait();
    alert("NFT minted and listed successfully!");
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
}

// Buy NFT
export async function buyNFT(tokenId, price) {
  try {
    const tx = await contract.buyNFT(tokenId, { value: price });
    await tx.wait();
    alert("NFT bought successfully!");
  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
}

// Get Listing
export async function getListing(tokenId) {
  try {
    const listing = await contract.getListing(tokenId);
    console.log("Listing:", listing);
    return listing;
  } catch (err) {
    console.error(err);
  }
}
