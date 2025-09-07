import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData({ name: '', email: '', organization: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        ...formData,
        role: selectedRole,
        id: Date.now(),
        joinedAt: new Date().toISOString()
      };
      
      login(userData);
      setIsLoading(false);
    }, 1000);
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              🌍 WildCarbon
            </h1>
            <p className="text-xl text-green-100 mb-2">
              Tokenizing Carbon Absorption for Wildlife Conservation
            </p>
            <p className="text-green-200 opacity-90">
              Choose your role to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buyer Card */}
            <div 
              onClick={() => handleRoleSelect('buyer')}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-green-200"
            >
              <div className="text-center">
                <div className="text-6xl mb-6">🏢</div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  Company / Buyer
                </h2>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Purchase verified carbon credits from wildlife sanctuaries to offset your company's carbon footprint and support conservation efforts.
                </p>
                <div className="space-y-3 text-sm text-green-600">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Browse carbon credit marketplace</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Purchase verified NFT credits</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Track your environmental impact</span>
                  </div>
                </div>
                <button className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105">
                  Continue as Buyer
                </button>
              </div>
            </div>

            {/* National Park Card */}
            <div 
              onClick={() => handleRoleSelect('national_park')}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-green-200"
            >
              <div className="text-center">
                <div className="text-6xl mb-6">🏞️</div>
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  National Park / Sanctuary
                </h2>
                <p className="text-green-700 mb-6 leading-relaxed">
                  Monetize your forest's carbon absorption by minting verified carbon credit NFTs and creating sustainable funding for conservation.
                </p>
                <div className="space-y-3 text-sm text-green-600">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Mint carbon credit NFTs</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>List credits on marketplace</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Generate sustainable revenue</span>
                  </div>
                </div>
                <button className="mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105">
                  Continue as Park
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="flex justify-center space-x-8 text-green-200 text-sm">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-green-200">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">
              {selectedRole === 'buyer' ? '🏢' : '🏞️'}
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {selectedRole === 'buyer' ? 'Company Registration' : 'Park Registration'}
            </h2>
            <p className="text-green-600">
              Complete your profile to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                {selectedRole === 'buyer' ? 'Contact Name' : 'Park Manager Name'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                {selectedRole === 'buyer' ? 'Company Name' : 'Park/Sanctuary Name'}
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder={selectedRole === 'buyer' ? 'Enter company name' : 'Enter park name'}
                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 bg-green-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-300 disabled:to-emerald-300 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>🌱</span>
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => setSelectedRole(null)}
            className="w-full mt-4 text-green-600 hover:text-green-800 font-medium py-2 transition-colors"
          >
            ← Back to role selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;