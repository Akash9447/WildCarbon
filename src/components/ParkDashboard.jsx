import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';

const ParkDashboard = ({ userData }) => {
  const { account } = useWallet();
  const { contract } = useContract();
  const [activeTab, setActiveTab] = useState('mint');
  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    carbonCredits: '',
    location: '',
    verificationURI: '',
    price: ''
  });

  useEffect(() => {
    if (activeTab === 'listings') {
      loadMyNFTs();
    }
  }, [activeTab, contract]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateMetadataURI = () => {
    const metadata = {
      name: `${userData.name} Carbon Credit`,
      description: `Verified carbon credit representing ${formData.carbonCredits} tons of CO₂ absorbed by ${userData.name}`,
      attributes: [
        { trait_type: "Carbon Credits", value: formData.carbonCredits },
        { trait_type: "Park", value: userData.name },
        { trait_type: "Location", value: formData.location },
        { trait_type: "Verification", value: formData.verificationURI }
      ]
    };
    
    return `ipfs://QmExample${Date.now()}`;
  };

  const handleMint = async (e) => {
    e.preventDefault();
    
    if (!contract) {
      setStatus('Contract not available');
      return;
    }

    setLoading(true);
    setStatus('Preparing transaction...');

    try {
      const metadataURI = generateMetadataURI();
      const priceInWei = ethers.parseEther(formData.price);
      
      setStatus('Minting NFT...');
      const tx = await contract.mintAndList(metadataURI, priceInWei);
      
      setStatus('Confirming transaction...');
      await tx.wait();
      
      setStatus('NFT minted and listed successfully!');
      
      setFormData({
        carbonCredits: '',
        location: '',
        verificationURI: '',
        price: ''
      });

      setTimeout(() => setStatus(''), 3000);

    } catch (error) {
      console.error('Minting error:', error);
      setStatus('Minting failed: ' + (error.message || 'Unknown error'));
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const loadMyNFTs = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      // In a real implementation, this would query the contract for user's NFTs
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMyNFTs([]); // Will be populated with real data
    } catch (error) {
      console.error('Error loading NFTs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {userData.name}
          </h1>
          <p className="text-xl">
            Mint and manage your carbon credit NFTs
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex border-2 border-brown-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('mint')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'mint' 
                  ? 'bg-brown-600 text-white' 
                  : 'bg-white text-brown-600 hover:bg-brown-50'
              }`}
            >
              Mint NFT
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-3 font-semibold ${
                activeTab === 'listings' 
                  ? 'bg-brown-600 text-white' 
                  : 'bg-white text-brown-600 hover:bg-brown-50'
              }`}
            >
              My Listings
            </button>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`status-message ${
            status.includes('successfully') ? 'status-success' : 
            status.includes('failed') || status.includes('not available') ? 'status-error' : 
            'status-loading'
          }`}>
            {status.includes('Preparing') || status.includes('Minting') || status.includes('Confirming') ? (
              <div className="flex items-center gap-2">
                <div className="spinner"></div>
                {status}
              </div>
            ) : (
              status
            )}
          </div>
        )}

        {/* Mint Tab */}
        {activeTab === 'mint' && (
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              Mint Carbon Credit NFT
            </h2>

            <form onSubmit={handleMint} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Carbon Credits (tons CO₂)
                </label>
                <input
                  type="number"
                  name="carbonCredits"
                  value={formData.carbonCredits}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="100"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Brazil, South America"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Verification Document URI
                </label>
                <input
                  type="url"
                  name="verificationURI"
                  value={formData.verificationURI}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="https://ipfs.io/ipfs/..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price (ETH)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="0.1"
                  min="0.001"
                  step="0.001"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Minting...
                  </>
                ) : (
                  'Mint & List NFT'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="flex items-center gap-3">
                  <div className="spinner"></div>
                  <span className="text-xl">Loading your listings...</span>
                </div>
              </div>
            ) : myNFTs.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">
                  No NFTs Listed Yet
                </h3>
                <p className="text-lg mb-6">
                  Mint your first carbon credit NFT to get started
                </p>
                <button
                  onClick={() => setActiveTab('mint')}
                  className="btn-primary"
                >
                  Mint Your First NFT
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myNFTs.map((nft, index) => (
                  <div key={index} className="nft-card">
                    <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                    <p className="mb-2">
                      <strong>Carbon Credits:</strong> {nft.carbonCredits} tons CO₂
                    </p>
                    <p className="mb-2">
                      <strong>Location:</strong> {nft.location}
                    </p>
                    <p className="mb-4">
                      <strong>Price:</strong> {nft.price} ETH
                    </p>
                    <p className="text-sm opacity-75">
                      Status: {nft.isListed ? 'Listed' : 'Unlisted'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkDashboard;