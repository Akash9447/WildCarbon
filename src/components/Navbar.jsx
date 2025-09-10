import React from 'react';
import { useWallet } from '../hooks/useWallet';

const Navbar = ({ userData, onLogout }) => {
  const { account, disconnectWallet } = useWallet();

  const handleLogout = () => {
    disconnectWallet();
    onLogout();
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-white border-b-2 border-brown-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          WildCarbon
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {userData && (
            <span className="font-semibold">
              {userData.name}
            </span>
          )}
          
          {account && (
            <div className="card py-2 px-4">
              <span className="text-sm font-semibold">
                {formatAddress(account)}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="btn-primary"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;