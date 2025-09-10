import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';

const CompanyDashboard = () => {
  const { account } = useWallet();
  const { contract } = useContract();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null);
  const [txStatus, setTxStatus] = useState('');

  // Sample NFT data (in real app, this would come from blockchain)
  const sampleNFTs = [
    {
      id: 1,
      name: "Amazon Rainforest Carbon Credit",
      sanctuary: "Amazon Wildlife Reserve",
      location: "Brazil, South America",
      carbonCredits: "50",
      price: "0.25",
      image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Verified carbon credits from 1,000 hectares of protected Amazon rainforest",
      verified: true
    },
    {
      id: 2,
      name: "Yellowstone Forest Conservation",
      sanctuary: "Yellowstone National Park",
      location: "Wyoming, USA",
      carbonCredits: "30",
      price: "0.18",
      image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Carbon absorption from old-growth forest protection initiatives",
      verified: true
    },
    {
      id: 3,
      name: "Serengeti Wildlife Sanctuary",
      sanctuary: "Serengeti Conservation Area",
      location: "Tanzania, Africa",
      carbonCredits: "75",
      price: "0.35",
      image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Grassland restoration and tree planting carbon offset program",
      verified: true
    },
    {
      id: 4,
      name: "Borneo Orangutan Habitat",
      sanctuary: "Borneo Wildlife Foundation",
      location: "Borneo, Indonesia",
      carbonCredits: "40",
      price: "0.22",
      image: "https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Protecting critical orangutan habitat while capturing carbon",
      verified: true
    }
  ];

  useEffect(() => {
    // Simulate loading NFTs from blockchain
    setTimeout(() => {
      setNfts(sampleNFTs);
      setLoading(false);
    }, 1500);
  }, []);

  const handleBuy = async (nft) => {
    if (!contract) {
      setTxStatus('Contract not available');
      return;
    }

    setBuyingId(nft.id);
    setTxStatus('Preparing purchase...');

    try {
      const priceInWei = ethers.parseEther(nft.price);
      
      setTxStatus('Confirming purchase...');
      // In real implementation: const tx = await contract.buyNFT(nft.id, { value: priceInWei });
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setTxStatus('✅ Carbon credit purchased successfully!');
      
      // Remove purchased NFT from list
      setNfts(prev => prev.filter(n => n.id !== nft.id));
      
      setTimeout(() => setTxStatus(''), 3000);

    } catch (error) {
      console.error('Purchase error:', error);
      setTxStatus(`❌ Error: ${error.message || 'Purchase failed'}`);
      setTimeout(() => setTxStatus(''), 5000);
    } finally {
      setBuyingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen wildlife-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-medium">Loading carbon credits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen wildlife-bg">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🏢 Company Dashboard
            </h1>
            <p className="text-xl opacity-90">
              Purchase verified carbon credits to offset your emissions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Message */}
        {txStatus && (
          <div className={`mb-8 p-4 rounded-lg border max-w-2xl mx-auto ${
            txStatus.includes('✅') 
              ? 'bg-green-100 border-green-300 text-green-800' 
              : txStatus.includes('❌')
              ? 'bg-red-100 border-red-300 text-red-800'
              : 'bg-blue-100 border-blue-300 text-blue-800'
          }`}>
            <div className="flex items-center justify-center">
              <span className="mr-2">
                {txStatus.includes('✅') ? '✅' : txStatus.includes('❌') ? '❌' : '⏳'}
              </span>
              <span className="font-medium">{txStatus}</span>
            </div>
          </div>
        )}

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="nature-card rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-2xl font-bold text-nature-dark">195</div>
            <div className="text-forest">Tons CO₂ Available</div>
          </div>
          <div className="nature-card rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">🏞️</div>
            <div className="text-2xl font-bold text-nature-dark">{nfts.length}</div>
            <div className="text-forest">Sanctuaries Listed</div>
          </div>
          <div className="nature-card rounded-xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-nature-dark">100%</div>
            <div className="text-forest">Verified Credits</div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft) => (
            <div key={nft.id} className="nft-card nature-card rounded-2xl shadow-xl overflow-hidden">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={nft.image} 
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  {nft.verified && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                      <span>✓</span>
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-forest font-bold">{nft.carbonCredits} tons CO₂</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-nature-dark mb-2">{nft.name}</h3>
                
                <div className="flex items-center text-forest mb-2">
                  <span className="text-sm">🏞️</span>
                  <span className="ml-1 text-sm font-medium">{nft.sanctuary}</span>
                </div>
                
                <div className="flex items-center text-forest mb-3">
                  <span className="text-sm">📍</span>
                  <span className="ml-1 text-sm">{nft.location}</span>
                </div>

                <p className="text-nature-dark text-sm mb-4 leading-relaxed">
                  {nft.description}
                </p>

                {/* Price and Buy Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-nature-dark">{nft.price} ETH</div>
                    <div className="text-xs text-forest">≈ ${(parseFloat(nft.price) * 2000).toFixed(0)} USD</div>
                  </div>
                  
                  <button
                    onClick={() => handleBuy(nft)}
                    disabled={buyingId === nft.id}
                    className="btn-primary text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg disabled:opacity-50"
                  >
                    {buyingId === nft.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Buying...</span>
                      </>
                    ) : (
                      <>
                        <span>🛒</span>
                        <span>Buy Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {nfts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🌱</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Carbon Credits Available
            </h3>
            <p className="text-green-200">
              Check back later for new listings from wildlife sanctuaries
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 nature-card rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-nature-dark mb-6 text-center">
            🌍 Why Choose WildCarbon Credits?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="font-semibold text-nature-dark mb-2">Blockchain Verified</h4>
              <p className="text-forest text-sm">Every credit is verified on the blockchain with immutable proof</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🦏</div>
              <h4 className="font-semibold text-nature-dark mb-2">Wildlife Protection</h4>
              <p className="text-forest text-sm">Your purchase directly funds wildlife conservation efforts</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-nature-dark mb-2">Impact Tracking</h4>
              <p className="text-forest text-sm">Track your environmental impact with detailed reporting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;