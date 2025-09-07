import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { useAuth } from '../contexts/AuthContext';
import { ethers } from 'ethers';

const MintForm = () => {
  const { account } = useWallet();
  const { contract } = useContract();
  const { user } = useAuth();
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
        <div className="nature-card rounded-xl shadow-xl p-8 text-center elephant-bg">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-white opacity-90 mb-6">
            {user?.organization}, please connect your wallet to mint carbon credit NFTs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="nature-card rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-nature-dark mb-2">🏞️ Mint Carbon Credits</h2>
          <p className="text-green-700">
            {user?.organization} - Create and list your carbon absorption NFTs for companies to purchase
          </p>
        </div>

        {success && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg mb-6">
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
            <label className="block text-sm font-semibold text-nature-dark mb-2">
              Your Wallet Address (Auto-filled)
            </label>
            <input
              type="text"
              name="recipient"
              value={account || formData.recipient}
              onChange={handleInputChange}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50"
              readOnly={!!account}
              required
            />
            <p className="text-sm text-green-600 mt-1">
              Your connected wallet will receive the minted NFT
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-nature-dark mb-2">
              Carbon Credits (tons CO₂)
            </label>
            <input
              type="number"
              name="carbonCredits"
              value={formData.carbonCredits}
              onChange={handleInputChange}
              placeholder="100"
              min="1"
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50"
              required
            />
            <p className="text-sm text-green-600 mt-1">
              Amount of CO₂ absorbed (in metric tons)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-nature-dark mb-2">
              Sanctuary/Park Name
            </label>
            <input
              type="text"
              value={user?.organization || ''}
              className="w-full px-4 py-3 border border-green-300 rounded-lg bg-green-100 text-green-800 font-medium"
              readOnly
            />
            <p className="text-sm text-green-600 mt-1">
              Your registered park name
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-nature-dark mb-2">
              Metadata URI
            </label>
            <input
              type="url"
              name="metadataURI"
              value={formData.metadataURI}
              onChange={handleInputChange}
              placeholder="https://ipfs.io/ipfs/..."
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50"
              required
            />
            <p className="text-sm text-green-600 mt-1">
              IPFS link to NFT metadata (JSON file with verification details)
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-nature-dark mb-2">
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
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50"
              required
            />
            <p className="text-sm text-green-600 mt-1">
              Listing price in ETH for companies to purchase
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-300 disabled:to-emerald-300 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
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

        <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">💡 Tips for Success:</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Include detailed verification data from environmental auditors</li>
            <li>• Price competitively based on current carbon credit market rates</li>
            <li>• Document your {user?.organization}'s conservation efforts</li>
            <li>• Consider environmental impact when setting gas fees</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MintForm;