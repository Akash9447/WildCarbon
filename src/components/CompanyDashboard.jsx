import React, { useState, useEffect } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useContract } from '../hooks/useContract';
import { ethers } from 'ethers';

const CompanyDashboard = ({ userData }) => {
  const { account } = useWallet();
  const { contract } = useContract();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadNFTs();
  }, [contract]);

  const loadNFTs = async () => {
    if (!contract) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // In a real implementation, this would query the contract for listed NFTs
      // For now, we'll simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be replaced with actual contract calls
      // const listedNFTs = await contract.getListedNFTs();
      setNfts([]); // Will be populated with real data
      
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setStatus('Error loading NFTs');
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (nft) => {
    if (!contract) return;

    setBuyingId(nft.id);
    setStatus('Processing purchase...');

    try {
      const priceInWei = ethers.parseEther(nft.price.toString());
      const tx = await contract.buyNFT(nft.id, { value: priceInWei });
      
      setStatus('Confirming transaction...');
      await tx.wait();
      
      setStatus('Purchase successful!');
      loadNFTs(); // Refresh the list
      
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Purchase error:', error);
      setStatus('Purchase failed: ' + (error.message || 'Unknown error'));
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setBuyingId(null);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {userData.name}
          </h1>
          <p className="text-xl">
            Browse and purchase carbon credit NFTs
          </p>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`status-message ${
            status.includes('successful') ? 'status-success' : 
            status.includes('failed') || status.includes('Error') ? 'status-error' : 
            'status-loading'
          }`}>
            {status.includes('Processing') || status.includes('Confirming') ? (
              <div className="flex items-center gap-2">
                <div className="spinner"></div>
                {status}
              </div>
            ) : (
              status
            )}
          </div>
        )}

        {/* NFT Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3">
              <div className="spinner"></div>
              <span className="text-xl">Loading carbon credits...</span>
            </div>
          </div>
        ) : nfts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold mb-4">
              No Carbon Credits Available
            </h3>
            <p className="text-lg">
              Check back later for new listings from parks and sanctuaries
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft) => (
              <div key={nft.id} className="nft-card">
                <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                <p className="mb-2">
                  <strong>Park:</strong> {nft.sanctuary}
                </p>
                <p className="mb-2">
                  <strong>Location:</strong> {nft.location}
                </p>
                <p className="mb-2">
                  <strong>Carbon Credits:</strong> {nft.carbonCredits} tons CO₂
                </p>
                <p className="mb-4">
                  <strong>Price:</strong> {nft.price} ETH
                </p>
                
                <button
                  onClick={() => handleBuy(nft)}
                  disabled={buyingId === nft.id}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {buyingId === nft.id ? (
                    <>
                      <div className="spinner"></div>
                      Buying...
                    </>
                  ) : (
                    'Buy Now'
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;