import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useOnboarding, Task } from '@/lib/onboarding-context';
import { cn } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { tasks, progress, fetchTasks, fetchProgress, isLoading } = useOnboarding();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchTasks(user.id);
      fetchProgress(user.id);
    }
  }, [user?.id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (user?.id) {
      await fetchTasks(user.id);
      await fetchProgress(user.id);
    }
    setIsRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const pendingTasks = tasks.filter((t) => t.status === 'pending' || t.status === 'submitted');
  const nextTasks = pendingTasks.slice(0, 3);

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      onPress={() => router.push('/(tabs)/checklist')}
      className="bg-surface border border-border rounded-lg p-4 mb-3"
    >
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">{item.title}</Text>
          <Text className="text-sm text-muted mt-1">{item.category}</Text>
          <View className="flex-row items-center gap-2 mt-2">
            <MaterialIcons name="schedule" size={14} color="#687076" />
            <Text className="text-xs text-muted">
              Due {new Date(item.dueDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View
          className={cn(
            'px-2 py-1 rounded',
            item.status === 'pending' && 'bg-warning/20',
            item.status === 'submitted' && 'bg-primary/20'
          )}
        >
          <Text
            className={cn(
              'text-xs font-semibold',
              item.status === 'pending' && 'text-warning',
              item.status === 'submitted' && 'text-primary'
            )}
          >
            {item.status === 'pending' ? 'Pending' : 'Submitted'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      >
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-3xl font-bold text-foreground">Welcome</Text>
              <Text className="text-base text-muted mt-1">{user?.name}</Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-surface border border-border rounded-full p-2"
            >
              <MaterialIcons name="logout" size={20} color="#0066CC" />
            </TouchableOpacity>
          </View>

          {/* Progress Card */}
          {progress && (
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/progress')}
              className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 gap-3"
            >
              <Text className="text-white text-sm font-semibold opacity-90">Overall Progress</Text>
              <View className="gap-2">
                <Text className="text-4xl font-bold text-white">{progress.overallProgress}%</Text>
                <View className="bg-white/30 rounded-full h-2 overflow-hidden">
                  <View
                    className="bg-white h-full"
                    style={{ width: `${progress.overallProgress}%` }}
                  />
                </View>
              </View>
              <Text className="text-white/90 text-xs">
                {progress.completedTasks} of {progress.totalTasks} tasks completed
              </Text>
            </TouchableOpacity>
          )}

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface border border-border rounded-lg p-4 items-center gap-2">
              <View className="bg-success/10 rounded-full p-2">
                <MaterialIcons name="check-circle" size={20} color="#22C55E" />
              </View>
              <Text className="text-2xl font-bold text-foreground">
                {progress?.completedTasks || 0}
              </Text>
              <Text className="text-xs text-muted text-center">Completed</Text>
            </View>

            <View className="flex-1 bg-surface border border-border rounded-lg p-4 items-center gap-2">
              <View className="bg-warning/10 rounded-full p-2">
                <MaterialIcons name="pending-actions" size={20} color="#F59E0B" />
              </View>
              <Text className="text-2xl font-bold text-foreground">{pendingTasks.length}</Text>
              <Text className="text-xs text-muted text-center">Pending</Text>
            </View>

            <View className="flex-1 bg-surface border border-border rounded-lg p-4 items-center gap-2">
              <View className="bg-primary/10 rounded-full p-2">
                <MaterialIcons name="school" size={20} color="#0066CC" />
              </View>
              <Text className="text-2xl font-bold text-foreground">
                {progress?.trainingScheduled || 0}
              </Text>
              <Text className="text-xs text-muted text-center">Training</Text>
            </View>
          </View>

          {/* Upcoming Tasks */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-foreground">Upcoming Tasks</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/checklist')}>
                <Text className="text-primary text-sm font-semibold">View All</Text>
              </TouchableOpacity>
            </View>

            {nextTasks.length > 0 ? (
              <FlatList
                data={nextTasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View className="bg-surface border border-border rounded-lg p-6 items-center gap-2">
                <MaterialIcons name="check-circle" size={32} color="#22C55E" />
                <Text className="text-base font-semibold text-foreground">All caught up!</Text>
                <Text className="text-sm text-muted text-center">
                  You've completed all your pending tasks
                </Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/checklist')}
              className="bg-primary rounded-lg py-3 items-center"
            >
              <Text className="text-white font-semibold">View Full Checklist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/(tabs)/documents')}
              className="bg-surface border border-border rounded-lg py-3 items-center"
            >
              <Text className="text-primary font-semibold">Upload Documents</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
