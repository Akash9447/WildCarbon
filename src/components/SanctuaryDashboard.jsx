import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';

const SanctuaryDashboard = () => {
  const { account } = useWallet();
  const { contract } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [txStatus, setTxStatus] = useState('');
  const [myNFTs, setMyNFTs] = useState([]);
  const [formData, setFormData] = useState({
    carbonCredits: '',
    sanctuaryName: '',
    location: '',
    verificationURI: '',
    price: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateMetadataURI = () => {
    // In a real app, this would upload to IPFS
    const metadata = {
      name: `${formData.sanctuaryName} Carbon Credit`,
      description: `Verified carbon credit representing ${formData.carbonCredits} tons of CO₂ absorbed by ${formData.sanctuaryName}`,
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800",
      attributes: [
        { trait_type: "Carbon Credits", value: formData.carbonCredits },
        { trait_type: "Sanctuary", value: formData.sanctuaryName },
        { trait_type: "Location", value: formData.location },
        { trait_type: "Verification", value: formData.verificationURI }
      ]
    };
    
    // Simulate IPFS hash
    return `ipfs://QmExample${Date.now()}`;
  };

  const handleMint = async (e) => {
    e.preventDefault();
    
    if (!contract) {
      setTxStatus('Contract not available');
      return;
    }

    setIsLoading(true);
    setTxStatus('Preparing transaction...');

    try {
      const metadataURI = generateMetadataURI();
      const priceInWei = ethers.parseEther(formData.price);
      
      setTxStatus('Minting NFT...');
      const tx = await contract.mintAndList(metadataURI, priceInWei);
      
      setTxStatus('Confirming transaction...');
      const receipt = await tx.wait();
      
      setTxStatus('✅ NFT minted and listed successfully!');
      
      // Reset form
      setFormData({
        carbonCredits: '',
        sanctuaryName: '',
        location: '',
        verificationURI: '',
        price: ''
      });

      // Refresh NFT list
      setTimeout(() => {
        setTxStatus('');
        loadMyNFTs();
      }, 3000);

    } catch (error) {
      console.error('Minting error:', error);
      setTxStatus(`❌ Error: ${error.message || 'Transaction failed'}`);
      setTimeout(() => setTxStatus(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMyNFTs = async () => {
    // In a real implementation, this would query the blockchain for user's NFTs
    // For now, we'll show a placeholder
    setMyNFTs([]);
  };

  useEffect(() => {
    if (contract && account) {
      loadMyNFTs();
    }
  }, [contract, account]);

  return (
    <div className="min-h-screen wildlife-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🏞️ Sanctuary Dashboard
            </h1>
            <p className="text-xl opacity-90">
              Mint and manage your carbon credit NFTs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mint Form */}
          <div className="nature-card rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-nature-dark mb-2">
                🌱 Mint Carbon Credits
              </h2>
              <p className="text-forest">
                Create verified carbon credit NFTs from your conservation efforts
              </p>
            </div>

            {txStatus && (
              <div className={`mb-6 p-4 rounded-lg border ${
                txStatus.includes('✅') 
                  ? 'bg-green-100 border-green-300 text-green-800' 
                  : txStatus.includes('❌')
                  ? 'bg-red-100 border-red-300 text-red-800'
                  : 'bg-blue-100 border-blue-300 text-blue-800'
              }`}>
                <div className="flex items-center">
                  <span className="mr-2">
                    {txStatus.includes('✅') ? '✅' : txStatus.includes('❌') ? '❌' : '⏳'}
                  </span>
                  <span className="text-sm font-medium">{txStatus}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleMint} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-nature-dark mb-2">
                    Sanctuary Name *
                  </label>
                  <input
                    type="text"
                    name="sanctuaryName"
                    value={formData.sanctuaryName}
                    onChange={handleInputChange}
                    placeholder="Amazon Wildlife Reserve"
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-forest bg-green-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-nature-dark mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Brazil, South America"
                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-forest bg-green-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-nature-dark mb-2">
                  Carbon Credits (tons CO₂) *
                </label>
                <input
                  type="number"
                  name="carbonCredits"
                  value={formData.carbonCredits}
                  onChange={handleInputChange}
                  placeholder="100"
                  min="1"
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-forest bg-green-50"
                  required
                />
                <p className="text-sm text-forest mt-1">
                  Amount of CO₂ absorbed by your sanctuary
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-nature-dark mb-2">
                  Verification Document URI *
                </label>
                <input
                  type="url"
                  name="verificationURI"
                  value={formData.verificationURI}
                  onChange={handleInputChange}
                  placeholder="https://ipfs.io/ipfs/..."
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-forest bg-green-50"
                  required
                />
                <p className="text-sm text-forest mt-1">
                  Link to environmental audit or verification document
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-nature-dark mb-2">
                  Price (ETH) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.1"
                  min="0.001"
                  step="0.001"
                  className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-forest bg-green-50"
                  required
                />
                <p className="text-sm text-forest mt-1">
                  Listing price for companies to purchase
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Minting...</span>
                  </>
                ) : (
                  <>
                    <span>🌱</span>
                    <span>Mint & List NFT</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* My NFTs */}
          <div className="nature-card rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-nature-dark mb-2">
                📊 My Carbon Credits
              </h2>
              <p className="text-forest">
                Track your minted and listed NFTs
              </p>
            </div>

            {myNFTs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-50">🌳</div>
                <h3 className="text-xl font-semibold text-nature-dark mb-2">
                  No NFTs Yet
                </h3>
                <p className="text-forest">
                  Mint your first carbon credit NFT to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {myNFTs.map((nft, index) => (
                  <div key={index} className="border border-green-200 rounded-lg p-4">
                    {/* NFT details would go here */}
                  </div>
                ))}
              </div>
            )}

            {/* Tips */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <h3 className="font-semibold text-forest mb-3">💡 Tips for Success:</h3>
              <ul className="text-sm text-nature-dark space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-forest mt-1">•</span>
                  <span>Include detailed verification from environmental auditors</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-forest mt-1">•</span>
                  <span>Price competitively based on current carbon credit rates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-forest mt-1">•</span>
                  <span>Document your conservation impact with photos and data</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SanctuaryDashboard;