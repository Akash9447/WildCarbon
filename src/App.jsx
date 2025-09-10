import React, { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import LandingPage from './components/LandingPage';
import WalletConnect from './components/WalletConnect';
import SanctuaryDashboard from './components/SanctuaryDashboard';
import CompanyDashboard from './components/CompanyDashboard';
import Navbar from './components/Navbar';

function App() {
  const { account } = useWallet();
  const [currentStep, setCurrentStep] = useState('landing'); // 'landing', 'wallet', 'dashboard'
  const [userRole, setUserRole] = useState(null); // 'sanctuary' or 'company'

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentStep('wallet');
  };

  const handleWalletConnected = () => {
    setCurrentStep('dashboard');
  };

  const handleBack = () => {
    if (currentStep === 'wallet') {
      setCurrentStep('landing');
      setUserRole(null);
    } else if (currentStep === 'dashboard') {
      setCurrentStep('landing');
      setUserRole(null);
    }
  };

  // Show navbar only when not on landing page
  const showNavbar = currentStep !== 'landing';

  return (
    <div className="min-h-screen">
      {showNavbar && (
        <Navbar 
          userRole={userRole} 
          onBack={handleBack}
        />
      )}
      
      {currentStep === 'landing' && (
        <LandingPage onRoleSelect={handleRoleSelect} />
      )}
      
      {currentStep === 'wallet' && (
        <WalletConnect 
          userRole={userRole} 
          onConnected={handleWalletConnected}
        />
      )}
      
      {currentStep === 'dashboard' && account && (
        <>
          {userRole === 'sanctuary' && <SanctuaryDashboard />}
          {userRole === 'company' && <CompanyDashboard />}
        </>
      )}
    </div>
  );
}

export default App;