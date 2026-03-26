import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useBiometric } from '@/lib/biometric-context';
import { cn } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginBiometricScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [useBiometricLogin, setUseBiometricLogin] = useState(false);
  
  const { login } = useAuth();
  const { availability, isBiometricEnabled, authenticateWithBiometric, error: bioError } = useBiometric();
  const router = useRouter();

  useEffect(() => {
    // Auto-attempt biometric if enabled
    if (isBiometricEnabled && availability.available) {
      attemptBiometricLogin();
    }
  }, []);

  const attemptBiometricLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const success = await authenticateWithBiometric();
      if (success) {
        await login('biometric@user.com', 'biometric-auth');
        router.replace('/(tabs)');
      }
    } catch (err) {
      setError('Biometric authentication failed. Please use password login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setUseBiometricLogin(true);
    setError('');
    setIsLoading(true);

    try {
      const success = await authenticateWithBiometric();
      if (success) {
        // Biometric successful - log in with stored credentials
        await login('biometric@user.com', 'biometric-auth');
        router.replace('/(tabs)');
      } else if (bioError) {
        setError(bioError);
      }
    } catch (err) {
      setError('Biometric authentication failed');
    } finally {
      setIsLoading(false);
      setUseBiometricLogin(false);
    }
  };

  const isFacialRecognition = availability.biometryType?.toString().includes('facial') || availability.biometryType?.toString().includes('FACIAL');
  const biometryLabel = isFacialRecognition ? 'Face ID' : 'Fingerprint';

  return (
    <ScreenContainer className="bg-background" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center px-6 py-8 gap-6">
          {/* Header */}
          <View className="items-center gap-2 mb-4">
            <Text className="text-4xl font-bold text-foreground">OnboardHub</Text>
            <Text className="text-base text-muted text-center">
              Employee Onboarding Workflow
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View className="bg-error/10 border border-error rounded-lg p-3">
              <Text className="text-error text-sm">{error}</Text>
            </View>
          ) : null}

          {/* Biometric Option */}
          {availability.available && isBiometricEnabled && !useBiometricLogin && (
            <TouchableOpacity
              onPress={handleBiometricLogin}
              disabled={isLoading}
              className="bg-primary rounded-lg py-4 items-center justify-center gap-2"
            >
              <MaterialIcons 
                name={isFacialRecognition ? 'face' : 'fingerprint'} 
                size={32} 
                color="#ffffff" 
              />
              <Text className="text-white font-semibold text-base">
                Sign in with {biometryLabel}
              </Text>
            </TouchableOpacity>
          )}

          {/* Divider */}
          {availability.available && isBiometricEnabled && !useBiometricLogin && (
            <View className="flex-row items-center gap-3">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-muted text-sm">or</Text>
              <View className="flex-1 h-px bg-border" />
            </View>
          )}

          {/* Email Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Email</Text>
            <TextInput
              className={cn(
                'bg-surface border border-border rounded-lg px-4 py-3',
                'text-foreground text-base'
              )}
              placeholder="your@email.com"
              placeholderTextColor="#9BA1A6"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">Password</Text>
            <View className="flex-row items-center border border-border rounded-lg px-4 bg-surface">
              <TextInput
                className={cn(
                  'flex-1 py-3',
                  'text-foreground text-base'
                )}
                placeholder="••••••••"
                placeholderTextColor="#9BA1A6"
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <MaterialIcons 
                  name={showPassword ? 'visibility' : 'visibility-off'} 
                  size={20} 
                  color="#687076" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={cn(
              'bg-primary rounded-lg py-3 items-center justify-center',
              isLoading && 'opacity-70'
            )}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-semibold text-base">Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Enable Biometric Option */}
          {availability.available && !isBiometricEnabled && (
            <View className="bg-primary/10 border border-primary/30 rounded-lg p-4 gap-2">
              <View className="flex-row items-center gap-2">
                <MaterialIcons 
                  name={isFacialRecognition ? 'face' : 'fingerprint'} 
                  size={20} 
                  color="#0066CC" 
                />
                <Text className="text-sm font-semibold text-primary flex-1">
                  Enable {biometryLabel} Login
                </Text>
              </View>
              <Text className="text-xs text-primary/80 mb-2">
                Speed up your login with biometric authentication
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // TODO: Implement biometric setup flow
                  setError('Biometric setup coming soon');
                }}
                className="bg-primary rounded-lg py-2 items-center"
              >
                <Text className="text-white font-semibold text-sm">Set Up Now</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Demo Credentials */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-muted uppercase">Demo Credentials</Text>
            <Text className="text-sm text-foreground">
              Email: <Text className="font-mono">demo@example.com</Text>
            </Text>
            <Text className="text-sm text-foreground">
              Password: <Text className="font-mono">password</Text>
            </Text>
          </View>

          {/* Footer */}
          <View className="items-center gap-1 mt-4">
            <Text className="text-sm text-muted">
              New to OnboardHub?{' '}
              <Text className="text-primary font-semibold">Contact your HR team</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
