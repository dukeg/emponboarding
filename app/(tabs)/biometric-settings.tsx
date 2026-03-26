import { ScrollView, Text, View, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useBiometric } from '@/lib/biometric-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function BiometricSettingsScreen() {
  const { 
    availability, 
    isBiometricEnabled, 
    isAuthenticating,
    enableBiometric, 
    disableBiometric 
  } = useBiometric();
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleBiometric = async () => {
    setIsToggling(true);
    try {
      if (isBiometricEnabled) {
        await disableBiometric();
      } else {
        await enableBiometric();
      }
    } catch (err) {
      console.error('Error toggling biometric:', err);
    } finally {
      setIsToggling(false);
    }
  };

  const isFacialRecognition = availability.biometryType?.toString().includes('facial') || availability.biometryType?.toString().includes('FACIAL');
  const biometryLabel = isFacialRecognition ? 'Face ID' : 'Fingerprint';
  const biometryIcon = isFacialRecognition ? 'face' : 'fingerprint';

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Biometric Security</Text>
            <Text className="text-base text-muted mt-1">
              Manage your fingerprint and face authentication
            </Text>
          </View>

          {/* Biometric Availability Status */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-primary/10 rounded-full p-3">
                  <MaterialIcons name={biometryIcon} size={24} color="#0066CC" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-semibold text-foreground">{biometryLabel}</Text>
                  <Text className="text-xs text-muted mt-1">
                    {availability.available 
                      ? 'Available on this device' 
                      : 'Not available on this device'}
                  </Text>
                </View>
              </View>
              {availability.available && (
                <Switch
                  value={isBiometricEnabled}
                  onValueChange={handleToggleBiometric}
                  disabled={isToggling || isAuthenticating}
                />
              )}
            </View>
          </View>

          {/* Device Compatibility Info */}
          <View className="bg-primary/10 border border-primary/30 rounded-lg p-4 gap-2">
            <View className="flex-row items-center gap-2 mb-2">
              <MaterialIcons name="info" size={20} color="#0066CC" />
              <Text className="text-sm font-semibold text-primary">Device Information</Text>
            </View>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-xs text-primary/80">Hardware Compatible:</Text>
                <Text className="text-xs font-semibold text-primary">
                  {availability.compatible ? '✓ Yes' : '✗ No'}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-primary/80">Biometric Enrolled:</Text>
                <Text className="text-xs font-semibold text-primary">
                  {availability.enrolled ? '✓ Yes' : '✗ No'}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-primary/80">Authentication Type:</Text>
                <Text className="text-xs font-semibold text-primary">
                  {biometryLabel}
                </Text>
              </View>
            </View>
          </View>

          {/* Benefits Section */}
          {availability.available && (
            <View className="gap-3">
              <Text className="text-lg font-semibold text-foreground">Benefits</Text>
              
              <View className="bg-surface border border-border rounded-lg p-4 gap-3">
                <View className="flex-row gap-3">
                  <MaterialIcons name="security" size={20} color="#22C55E" />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground">Secure</Text>
                    <Text className="text-xs text-muted mt-1">
                      Your biometric data is stored securely on your device
                    </Text>
                  </View>
                </View>
              </View>

              <View className="bg-surface border border-border rounded-lg p-4 gap-3">
                <View className="flex-row gap-3">
                  <MaterialIcons name="speed" size={20} color="#0066CC" />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground">Fast</Text>
                    <Text className="text-xs text-muted mt-1">
                      Sign in instantly without typing your password
                    </Text>
                  </View>
                </View>
              </View>

              <View className="bg-surface border border-border rounded-lg p-4 gap-3">
                <View className="flex-row gap-3">
                  <MaterialIcons name="touch-app" size={20} color="#F59E0B" />
                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-foreground">Convenient</Text>
                    <Text className="text-xs text-muted mt-1">
                      One-tap authentication with your face or fingerprint
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Setup Instructions */}
          {availability.compatible && !availability.enrolled && (
            <View className="bg-warning/10 border border-warning/30 rounded-lg p-4 gap-2">
              <View className="flex-row items-center gap-2 mb-2">
                <MaterialIcons name="warning" size={20} color="#F59E0B" />
                <Text className="text-sm font-semibold text-warning">Setup Required</Text>
              </View>
              <Text className="text-xs text-warning/80 leading-relaxed">
                To use {biometryLabel} authentication, you need to set it up in your device settings first. 
                Go to Settings → Security → Biometrics to add your {biometryLabel.toLowerCase()}.
              </Text>
            </View>
          )}

          {/* Not Available */}
          {!availability.compatible && (
            <View className="bg-error/10 border border-error/30 rounded-lg p-4 gap-2">
              <View className="flex-row items-center gap-2 mb-2">
                <MaterialIcons name="error" size={20} color="#EF4444" />
                <Text className="text-sm font-semibold text-error">Not Available</Text>
              </View>
              <Text className="text-xs text-error/80 leading-relaxed">
                Your device does not support biometric authentication. 
                You can continue using password-based login.
              </Text>
            </View>
          )}

          {/* Status Messages */}
          {isToggling && (
            <View className="flex-row items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg p-3">
              <ActivityIndicator size="small" color="#0066CC" />
              <Text className="text-sm text-primary">
                {isBiometricEnabled ? 'Disabling' : 'Enabling'} biometric authentication...
              </Text>
            </View>
          )}

          {/* Privacy Notice */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-2">
            <Text className="text-xs font-semibold text-muted uppercase">Privacy Notice</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Your biometric data is never shared with our servers. All authentication happens locally on your device using your device's secure enclave.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
