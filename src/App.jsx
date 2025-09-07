import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import MintForm from './components/MintForm';
import NFTMarketplace from './components/NFTMarketplace';

const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('marketplace');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading WildCarbon...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

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
        {activeTab === 'marketplace' && <NFTMarketplace userRole={user.role} />}
        {activeTab === 'mint' && user.role === 'national_park' && <MintForm />}
        {activeTab === 'mint' && user.role === 'buyer' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="nature-card rounded-xl shadow-xl p-8">
              <div className="text-6xl mb-4">🏢</div>
              <h2 className="text-2xl font-bold text-nature-dark mb-4">Company Dashboard</h2>
              <p className="text-green-700 mb-6">
                As a company, you can browse and purchase carbon credits from the marketplace to offset your carbon footprint.
              </p>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                Browse Marketplace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;