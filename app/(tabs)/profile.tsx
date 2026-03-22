import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useOnboarding } from '@/lib/onboarding-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { progress } = useOnboarding();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  if (!user) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-lg text-muted">Loading profile...</Text>
      </ScreenContainer>
    );
  }

  const startDate = new Date(user.startDate);
  const today = new Date();
  const daysOnboarding = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Profile Header */}
          <View className="items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center">
              <MaterialIcons name="person" size={40} color="#0066CC" />
            </View>
            <View className="items-center gap-1">
              <Text className="text-3xl font-bold text-foreground">{user.name}</Text>
              <Text className="text-base text-muted capitalize">{user.role}</Text>
            </View>
          </View>

          {/* User Information */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-4">
            <View className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Email</Text>
                <Text className="text-sm font-semibold text-foreground">{user.email}</Text>
              </View>
              <View className="border-t border-border" />
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Start Date</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {startDate.toLocaleDateString()}
                </Text>
              </View>
              <View className="border-t border-border" />
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Days in Onboarding</Text>
                <Text className="text-sm font-semibold text-foreground">{daysOnboarding} days</Text>
              </View>
              <View className="border-t border-border" />
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-muted">Department</Text>
                <Text className="text-sm font-semibold text-foreground">{user.departmentId}</Text>
              </View>
            </View>
          </View>

          {/* Onboarding Status */}
          {progress && (
            <View className="bg-surface border border-border rounded-lg p-4 gap-4">
              <Text className="text-lg font-semibold text-foreground">Onboarding Status</Text>

              <View className="gap-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <MaterialIcons name="check-circle" size={20} color="#22C55E" />
                    <Text className="text-sm text-foreground">Overall Progress</Text>
                  </View>
                  <Text className="text-lg font-bold text-primary">{progress.overallProgress}%</Text>
                </View>

                <View className="bg-background rounded-full h-2 overflow-hidden">
                  <View
                    className="bg-primary h-full"
                    style={{ width: `${progress.overallProgress}%` }}
                  />
                </View>

                <View className="grid grid-cols-2 gap-3 mt-2">
                  <View className="bg-background rounded-lg p-3">
                    <Text className="text-xs text-muted">Tasks Completed</Text>
                    <Text className="text-2xl font-bold text-foreground mt-1">
                      {progress.completedTasks}/{progress.totalTasks}
                    </Text>
                  </View>
                  <View className="bg-background rounded-lg p-3">
                    <Text className="text-xs text-muted">Documents Approved</Text>
                    <Text className="text-2xl font-bold text-foreground mt-1">
                      {progress.approvedDocuments}/{progress.totalDocuments}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Quick Actions</Text>

            <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="notifications" size={20} color="#0066CC" />
                <Text className="text-base font-semibold text-foreground">Notifications</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#687076" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="help" size={20} color="#0066CC" />
                <Text className="text-base font-semibold text-foreground">Help & Support</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#687076" />
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <MaterialIcons name="settings" size={20} color="#0066CC" />
                <Text className="text-base font-semibold text-foreground">Settings</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#687076" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error rounded-lg py-3 items-center mt-4"
          >
            <Text className="text-white font-semibold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
