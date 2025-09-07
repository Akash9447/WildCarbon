import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MintForm from './components/MintForm';
import NFTMarketplace from './components/NFTMarketplace';

function App() {
  const [activeTab, setActiveTab] = useState('marketplace');

  return (
    <div className="min-h-screen wildlife-bg">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-emerald-700 text-white py-20 forest-bg">
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
          <div className="mt-8 flex justify-center space-x-8 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🐘</span>
              <span>Protect Elephants</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🐅</span>
              <span>Save Tigers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🦏</span>
              <span>Preserve Rhinos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="nature-card rounded-xl p-1 shadow-xl">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
              }`}
            >
              🏢 Marketplace
            </button>
            <button
              onClick={() => setActiveTab('mint')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'mint'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
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