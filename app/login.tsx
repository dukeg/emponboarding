import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

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
            <TextInput
              className={cn(
                'bg-surface border border-border rounded-lg px-4 py-3',
                'text-foreground text-base'
              )}
              placeholder="••••••••"
              placeholderTextColor="#9BA1A6"
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              secureTextEntry
            />
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
