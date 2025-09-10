import React from 'react';
import { useWallet } from '../hooks/useWallet';

const Navbar = ({ userRole, onBack }) => {
  const { account, disconnectWallet } = useWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const roleConfig = {
    sanctuary: {
      icon: '🏞️',
      title: 'Sanctuary Dashboard',
      color: 'from-green-600 to-emerald-600'
    },
    company: {
      icon: '🏢',
      title: 'Company Dashboard',
      color: 'from-blue-600 to-indigo-600'
    }
  };

  const config = roleConfig[userRole] || { icon: '🌍', title: 'WildCarbon', color: 'from-green-600 to-emerald-600' };

  return (
    <nav className="nature-card shadow-xl border-b border-green-200 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{config.icon}</span>
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                WildCarbon
              </span>
            </div>
            
            {userRole && (
              <>
                <div className="hidden md:block w-px h-6 bg-green-300"></div>
                <span className="hidden md:block text-forest font-medium">
                  {config.title}
                </span>
              </>
            )}
          </div>

          {/* Wallet Info and Actions */}
          <div className="flex items-center space-x-4">
            {account ? (
              <>
                {/* Wallet Address */}
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-forest font-semibold text-sm">
                        {formatAddress(account)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile wallet indicator */}
                <div className="sm:hidden">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                {/* Disconnect Button */}
                <button
                  onClick={disconnectWallet}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 text-sm shadow-lg"
                >
                  <span className="hidden sm:inline">Disconnect</span>
                  <span className="sm:hidden">🔌</span>
                </button>
              </>
            ) : (
              <div className="text-forest text-sm">
                Wallet not connected
              </div>
            )}

            {/* Back Button */}
            {onBack && (
              <button
                onClick={onBack}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 text-sm shadow-lg"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;