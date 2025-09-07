import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const { user, logout } = useAuth();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="nature-card shadow-xl border-b border-green-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
              🌍 WildCarbon
            </span>
            <div className="ml-4 hidden md:flex items-center space-x-4 text-sm text-green-600">
              <div className="flex items-center space-x-2">
                <span>🦋</span>
                <span>Protecting Wildlife Through Blockchain</span>
              </div>
              {user && (
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <span>{user.role === 'buyer' ? '🏢' : '🏞️'}</span>
                  <span className="font-medium text-green-800">{user.organization}</span>
                </div>
              )}
            </div>
            
            {user && (
              <button
                onClick={logout}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 text-sm"
              >
                Logout
              </button>
            )}
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-green-800">{user.name}</div>
                  <div className="text-xs text-green-600 capitalize">{user.role.replace('_', ' ')}</div>
                </div>
              </div>
            )}
            
            {account ? (
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-lg border border-green-200">
                  <span className="text-green-800 font-semibold">
                    {formatAddress(account)}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg font-medium transition-all transform hover:scale-105 text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-300 disabled:to-emerald-300 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span>🦊</span>
                    <span>Connect Wallet</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;