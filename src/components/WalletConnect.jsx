import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';

const WalletConnect = ({ userRole, onConnected }) => {
  const { connectWallet, isConnecting } = useWallet();
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setError('');
    try {
      await connectWallet();
      onConnected();
    } catch (err) {
      setError('Failed to connect wallet. Please make sure MetaMask is installed.');
    }
  };

  const roleConfig = {
    sanctuary: {
      icon: '🏞️',
      title: 'Wildlife Sanctuary',
      subtitle: 'Connect your wallet to mint carbon credits',
      description: 'You\'ll be able to create and list carbon credit NFTs representing your forest\'s CO₂ absorption.',
      buttonText: 'Connect Wallet to Mint'
    },
    company: {
      icon: '🏢',
      title: 'Company / Buyer',
      subtitle: 'Connect your wallet to purchase credits',
      description: 'You\'ll be able to browse and purchase verified carbon credits to offset your emissions.',
      buttonText: 'Connect Wallet to Buy'
    }
  };

  const config = roleConfig[userRole];

  return (
    <div className="min-h-screen wildlife-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="nature-card rounded-2xl p-8 shadow-2xl text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">{config.icon}</div>
            <h2 className="text-3xl font-bold text-nature-dark mb-2">
              {config.title}
            </h2>
            <p className="text-forest text-lg">
              {config.subtitle}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-nature-dark leading-relaxed">
              {config.description}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <div className="flex items-center text-red-700">
                <span className="text-xl mr-2">⚠️</span>
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="text-3xl">🦊</div>
              <div className="text-left">
                <div className="font-semibold text-nature-dark">MetaMask Required</div>
                <div className="text-sm text-forest">Secure wallet connection</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full btn-primary text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>🔗</span>
                <span>{config.buttonText}</span>
              </>
            )}
          </button>

          <div className="mt-6 text-xs text-gray-600">
            <p>By connecting, you agree to our terms of service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;