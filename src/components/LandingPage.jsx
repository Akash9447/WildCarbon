import React from 'react';

const LandingPage = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-bold text-center mb-16">
        WildCarbon
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <button
          onClick={() => onRoleSelect('company')}
          className="role-button"
        >
          Are you a Company?
        </button>
        
        <button
          onClick={() => onRoleSelect('park')}
          className="role-button"
        >
          Are you a Park?
        </button>
      </div>
    </div>
  );
};

export default LandingPage;