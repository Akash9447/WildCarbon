import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const NFTMarketplace = () => {
  const { user } = useContext(AuthContext);
  const [nfts] = useState([
    {
      id: 1,
      name: "Amazon Rainforest Carbon Credit",
      park: "Amazon National Park",
      price: "0.5 ETH",
      carbonOffset: "10 tons CO2",
      image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Support rainforest conservation while offsetting your carbon footprint"
    },
    {
      id: 2,
      name: "Yellowstone Wildlife Protection",
      park: "Yellowstone National Park",
      price: "0.3 ETH",
      carbonOffset: "7 tons CO2",
      image: "https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Protect wildlife habitats and reduce carbon emissions"
    },
    {
      id: 3,
      name: "Serengeti Conservation Credit",
      park: "Serengeti National Park",
      price: "0.4 ETH",
      carbonOffset: "8 tons CO2",
      image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Support African wildlife conservation efforts"
    }
  ]);

  const handleBuy = (nft) => {
    if (user?.role === 'buyer') {
      alert(`Purchasing ${nft.name} for ${nft.price}`);
    } else {
      alert('Only buyers can purchase carbon credits');
    }
  };

  return (
    <div className="nft-marketplace">
      <div className="marketplace-header">
        <h2>🌍 Carbon Credit Marketplace</h2>
        <p>Purchase verified carbon credits from national parks worldwide</p>
      </div>

      <div className="nft-grid">
        {nfts.map(nft => (
          <div key={nft.id} className="nft-card">
            <div className="nft-image">
              <img src={nft.image} alt={nft.name} />
              <div className="carbon-badge">
                {nft.carbonOffset}
              </div>
            </div>
            
            <div className="nft-content">
              <h3>{nft.name}</h3>
              <p className="park-name">🏞️ {nft.park}</p>
              <p className="description">{nft.description}</p>
              
              <div className="nft-footer">
                <div className="price">
                  <span className="price-label">Price:</span>
                  <span className="price-value">{nft.price}</span>
                </div>
                
                {user?.role === 'buyer' ? (
                  <button 
                    className="buy-btn"
                    onClick={() => handleBuy(nft)}
                  >
                    🛒 Buy Now
                  </button>
                ) : user?.role === 'park' ? (
                  <div className="park-view">
                    <span className="revenue-info">💰 Your listing</span>
                  </div>
                ) : (
                  <button className="login-required" disabled>
                    Login to Purchase
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {user?.role === 'buyer' && (
        <div className="buyer-info">
          <h3>🏢 For {user.companyName}</h3>
          <p>Offset your company's carbon footprint with verified credits from protected areas.</p>
        </div>
      )}

      {user?.role === 'park' && (
        <div className="park-info">
          <h3>🌲 {user.parkName} Dashboard</h3>
          <p>Your conservation efforts are generating revenue through carbon credit sales.</p>
        </div>
      )}
    </div>
  );
};

export default NFTMarketplace;