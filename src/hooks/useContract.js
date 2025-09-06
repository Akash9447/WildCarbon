import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from './useWallet';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../contract-config';

export const useContract = () => {
  const { signer, provider } = useWallet();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (signer && CONTRACT_ADDRESS && CONTRACT_ABI) {
      try {
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error creating contract instance:', error);
      }
    } else if (provider && CONTRACT_ADDRESS && CONTRACT_ABI) {
      // Read-only contract for when wallet is not connected
      try {
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error creating read-only contract instance:', error);
      }
    } else {
      setContract(null);
    }
  }, [signer, provider]);

  return { contract };
};