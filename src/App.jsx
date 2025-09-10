import React, { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import LandingPage from './components/LandingPage';
import UserRegistration from './components/UserRegistration';
import CompanyDashboard from './components/CompanyDashboard';
import ParkDashboard from './components/ParkDashboard';
import Navbar from './components/Navbar';

function App() {
  const { account } = useWallet();
  const [currentStep, setCurrentStep] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setCurrentStep('registration');
  };

  const handleRegistrationComplete = (data) => {
    setUserData(data);
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    setCurrentStep('landing');
    setUserRole(null);
    setUserData(null);
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'dashboard' && (
        <Navbar userData={userData} onLogout={handleLogout} />
      )}
      
      {currentStep === 'landing' && (
        <LandingPage onRoleSelect={handleRoleSelect} />
      )}
      
      {currentStep === 'registration' && (
        <UserRegistration 
          userRole={userRole} 
          onComplete={handleRegistrationComplete}
        />
      )}
      
      {currentStep === 'dashboard' && account && userData && (
        <>
          {userRole === 'company' && (
            <CompanyDashboard userData={userData} />
          )}
          {userRole === 'park' && (
            <ParkDashboard userData={userData} />
          )}
        </>
      )}
    </div>
  );
}

export default App;