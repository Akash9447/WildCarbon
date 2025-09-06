import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MintForm from './components/MintForm';
import NFTMarketplace from './components/NFTMarketplace';

function App() {
  const [activeTab, setActiveTab] = useState('marketplace');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🌍 WildCarbon
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Tokenizing Carbon Absorption for Wildlife Conservation
          </p>
          <p className="text-lg max-w-3xl mx-auto opacity-80">
            Connect wildlife sanctuaries with companies through blockchain-verified carbon credit NFTs. 
            Every token represents real CO₂ absorption, creating sustainable funding for conservation.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              🏢 Marketplace
            </button>
            <button
              onClick={() => setActiveTab('mint')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'mint'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              🏞️ Mint Credits
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'marketplace' && <NFTMarketplace />}
        {activeTab === 'mint' && <MintForm />}
      </div>
    </div>
  );
}

export default App;