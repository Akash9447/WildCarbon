import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';

const MintForm = () => {
  const { account } = useWallet();
  const { contract } = useContract();
  const [formData, setFormData] = useState({
    recipient: '',
    carbonCredits: '',
    metadataURI: '',
    price: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!account) {
      setError('Please connect your wallet first');
      return;
    }

    if (!contract) {
      setError('Contract not available');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Convert price to wei
      const priceInWei = ethers.parseEther(formData.price);
      
      // Call mintAndList function
      const tx = await contract.mintAndList(formData.metadataURI, priceInWei);
      
      // Wait for transaction confirmation
      await tx.wait();
      
      setSuccess(true);
      setFormData({
        recipient: '',
        carbonCredits: '',
        metadataURI: '',
        price: ''
      });
    } catch (err) {
      console.error('Minting error:', err);
      setError(err.message || 'Failed to mint NFT');
    } finally {
      setIsLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Required</h2>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to mint carbon credit NFTs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🏞️ Mint Carbon Credits</h2>
          <p className="text-gray-600">
            Create and list your carbon absorption NFTs for companies to purchase
          </p>
        </div>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-xl mr-2">✅</span>
              <span>NFT minted and listed successfully!</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-xl mr-2">❌</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Wallet Address
            </label>
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              The wallet address that will receive the minted NFT
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carbon Credits (tons CO₂)
            </label>
            <input
              type="number"
              name="carbonCredits"
              value={formData.carbonCredits}
              onChange={handleInputChange}
              placeholder="100"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Amount of CO₂ absorbed (in metric tons)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metadata URI
            </label>
            <input
              type="url"
              name="metadataURI"
              value={formData.metadataURI}
              onChange={handleInputChange}
              placeholder="https://ipfs.io/ipfs/..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              IPFS link to NFT metadata (JSON file with verification details)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (ETH)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.1"
              min="0.001"
              step="0.001"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Listing price in ETH for companies to purchase
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Minting & Listing...</span>
              </>
            ) : (
              <>
                <span>🌱</span>
                <span>Mint & List NFT</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Success:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ensure your metadata URI points to valid JSON with verification data</li>
            <li>• Price competitively based on current carbon credit market rates</li>
            <li>• Include detailed sanctuary information in your metadata</li>
            <li>• Consider environmental impact when setting gas fees</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MintForm;