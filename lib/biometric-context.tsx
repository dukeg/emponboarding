import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export interface BiometricAvailability {
  available: boolean;
  compatible: boolean;
  biometryType: LocalAuthentication.AuthenticationType | null;
  enrolled: boolean;
}

interface BiometricContextType {
  availability: BiometricAvailability;
  isBiometricEnabled: boolean;
  isAuthenticating: boolean;
  error: string | null;
  
  // Methods
  checkBiometricAvailability: () => Promise<void>;
  enableBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
  authenticateWithBiometric: () => Promise<boolean>;
  authenticateWithFallback: (password: string) => Promise<boolean>;
}

const BiometricContext = createContext<BiometricContextType | undefined>(undefined);

export function BiometricProvider({ children }: { children: ReactNode }) {
  const [availability, setAvailability] = useState<BiometricAvailability>({
    available: false,
    compatible: false,
    biometryType: null,
    enrolled: false,
  });
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check biometric availability on mount
  useEffect(() => {
    checkBiometricAvailability();
    checkBiometricEnabled();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      
      let biometryType: LocalAuthentication.AuthenticationType | null = null;
      if (compatible && enrolled) {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        // Prefer Face ID over Fingerprint
        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          biometryType = LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION;
        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          biometryType = LocalAuthentication.AuthenticationType.FINGERPRINT;
        }
      }

      setAvailability({
        available: compatible && enrolled,
        compatible,
        biometryType,
        enrolled,
      });
    } catch (err) {
      console.error('Error checking biometric availability:', err);
      setError('Unable to check biometric availability');
    }
  };

  const checkBiometricEnabled = async () => {
    try {
      const enabled = await AsyncStorage.getItem('biometric_enabled');
      setIsBiometricEnabled(enabled === 'true');
    } catch (err) {
      console.error('Error checking biometric enabled:', err);
    }
  };

  const enableBiometric = async () => {
    try {
      if (!availability.available) {
        setError('Biometric authentication is not available on this device');
        return;
      }

      // Authenticate once to confirm
      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        await AsyncStorage.setItem('biometric_enabled', 'true');
        setIsBiometricEnabled(true);
        setError(null);
      } else {
        setError('Biometric authentication failed');
      }
    } catch (err) {
      console.error('Error enabling biometric:', err);
      setError('Failed to enable biometric authentication');
    }
  };

  const disableBiometric = async () => {
    try {
      await AsyncStorage.setItem('biometric_enabled', 'false');
      setIsBiometricEnabled(false);
      setError(null);
    } catch (err) {
      console.error('Error disabling biometric:', err);
      setError('Failed to disable biometric authentication');
    }
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    if (!availability.available || !isBiometricEnabled) {
      setError('Biometric authentication is not available');
      return false;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      const biometryLabel = availability.biometryType === 
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION 
        ? 'Face ID' 
        : 'Fingerprint';

      const result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        return true;
      } else if (result.error === 'user_cancel' || result.error === 'app_cancel') {
        setError('Authentication cancelled');
      } else if (result.error === 'system_cancel') {
        setError('Authentication cancelled by system');
      } else if (result.error === 'not_enrolled') {
        setError('Biometric not enrolled on this device');
      } else {
        setError('Biometric authentication failed');
      }
      return false;
    } catch (err) {
      console.error('Biometric authentication error:', err);
      setError('An error occurred during authentication');
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const authenticateWithFallback = async (password: string): Promise<boolean> => {
    setIsAuthenticating(true);
    setError(null);

    try {
      // TODO: Replace with actual password validation against backend
      // For now, accept any non-empty password
      if (password && password.length > 0) {
        return true;
      } else {
        setError('Invalid password');
        return false;
      }
    } catch (err) {
      console.error('Password authentication error:', err);
      setError('Authentication failed');
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <BiometricContext.Provider
      value={{
        availability,
        isBiometricEnabled,
        isAuthenticating,
        error,
        checkBiometricAvailability,
        enableBiometric,
        disableBiometric,
        authenticateWithBiometric,
        authenticateWithFallback,
      }}
    >
      {children}
    </BiometricContext.Provider>
  );
}

export function useBiometric() {
  const context = useContext(BiometricContext);
  if (context === undefined) {
    throw new Error('useBiometric must be used within a BiometricProvider');
  }
  return context;
}
