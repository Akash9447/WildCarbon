import React from 'react';

const LandingPage = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen forest-bg flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              🌍 WildCarbon
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mb-6"></div>
          </div>
          
          <p className="text-2xl md:text-3xl text-green-100 mb-4 font-light">
            Tokenizing Carbon Absorption for Wildlife Conservation
          </p>
          
          <p className="text-lg text-green-200 max-w-3xl mx-auto mb-8 leading-relaxed">
            Connect wildlife sanctuaries with companies through blockchain-verified carbon credit NFTs. 
            Every token represents real CO₂ absorption, creating sustainable funding for conservation.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">🌳</div>
              <div className="text-2xl font-bold text-white">1M+</div>
              <div className="text-green-200">Trees Protected</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">🏢</div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-green-200">Companies Offsetting</div>
            </div>
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">🦏</div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-green-200">Sanctuaries Funded</div>
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Park/Sanctuary Card */}
          <div 
            onClick={() => onRoleSelect('sanctuary')}
            className="nature-card rounded-2xl p-8 shadow-nature hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
          >
            <div className="text-center">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">🏞️</div>
              <h2 className="text-3xl font-bold text-nature-dark mb-4">
                Wildlife Sanctuary
              </h2>
              <p className="text-forest mb-6 leading-relaxed text-lg">
                Monetize your forest's carbon absorption by minting verified carbon credit NFTs. 
                Create sustainable funding for conservation efforts.
              </p>
              
              <div className="space-y-3 text-sm text-nature-dark mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-forest rounded-full"></span>
                  <span>Mint Carbon Credit NFTs</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-forest rounded-full"></span>
                  <span>List Credits on Marketplace</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-forest rounded-full"></span>
                  <span>Generate Sustainable Revenue</span>
                </div>
              </div>
              
              <button className="btn-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg">
                Continue as Sanctuary
              </button>
            </div>
          </div>

          {/* Company/Buyer Card */}
          <div 
            onClick={() => onRoleSelect('company')}
            className="nature-card rounded-2xl p-8 shadow-nature hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
          >
            <div className="text-center">
              <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">🏢</div>
              <h2 className="text-3xl font-bold text-nature-dark mb-4">
                Company / Buyer
              </h2>
              <p className="text-forest mb-6 leading-relaxed text-lg">
                Purchase verified carbon credits from wildlife sanctuaries to offset your 
                company's carbon footprint and support conservation.
              </p>
              
              <div className="space-y-3 text-sm text-nature-dark mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-earth rounded-full"></span>
                  <span>Browse Carbon Credit Marketplace</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-earth rounded-full"></span>
                  <span>Purchase Verified NFT Credits</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-3 h-3 bg-earth rounded-full"></span>
                  <span>Track Environmental Impact</span>
                </div>
              </div>
              
              <button className="btn-secondary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg">
                Continue as Company
              </button>
            </div>
          </div>
        </div>

        {/* Wildlife Icons */}
        <div className="mt-16 text-center">
          <div className="flex justify-center space-x-12 text-green-200 text-sm">
            <div className="flex flex-col items-center space-y-2 group">
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">🐘</span>
              <span>Protect Elephants</span>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">🐅</span>
              <span>Save Tigers</span>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">🦏</span>
              <span>Preserve Rhinos</span>
            </div>
            <div className="flex flex-col items-center space-y-2 group">
              <span className="text-4xl group-hover:scale-125 transition-transform duration-300">🦋</span>
              <span>Protect Ecosystems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;