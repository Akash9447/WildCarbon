import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';

const UserRegistration = ({ userRole, onComplete }) => {
  const { account, connectWallet, isConnecting } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    id: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (account && formData.name && formData.email && formData.id) {
      onComplete(formData);
    }
  };

  const isFormValid = formData.name && formData.email && formData.id && account;

  const roleConfig = {
    company: {
      title: 'Company Registration',
      fields: {
        name: 'Company Name',
        email: 'Email',
        id: 'Carbon Buyer ID/No'
      }
    },
    park: {
      title: 'Park Registration',
      fields: {
        name: 'Park Name',
        email: 'Email',
        id: 'Seller ID/No'
      }
    }
  };

  const config = roleConfig[userRole];

  return (
    <div className="min-h-screen p-8">
      {/* Wallet Connect Button - Top Right */}
      <div className="flex justify-end mb-8">
        {!account ? (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="btn-primary flex items-center gap-2"
          >
            {isConnecting ? (
              <>
                <div className="spinner"></div>
                Connecting...
              </>
            ) : (
              'Connect Wallet'
            )}
          </button>
        ) : (
          <div className="card">
            <p className="text-sm font-semibold">
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
          </div>
        )}
      </div>

      {/* Registration Form */}
      <div className="flex items-center justify-center">
        <div className="card max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-8">
            {config.title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {config.fields.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {config.fields.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {config.fields.id}
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="btn-primary w-full"
            >
              Continue to Dashboard
            </button>
          </form>

          {!account && (
            <p className="text-center text-sm mt-4 opacity-75">
              Please connect your wallet to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;