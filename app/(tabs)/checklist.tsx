import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useOnboarding, Task } from '@/lib/onboarding-context';
import { cn } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';

type FilterStatus = 'all' | 'pending' | 'completed' | 'overdue';

export default function ChecklistScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { tasks, fetchTasks } = useOnboarding();
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchTasks(user.id);
    }
  }, [user?.id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (user?.id) {
      await fetchTasks(user.id);
    }
    setIsRefreshing(false);
  };

  const getFilteredTasks = () => {
    const now = new Date();
    switch (filter) {
      case 'pending':
        return tasks.filter((t) => t.status === 'pending' || t.status === 'submitted');
      case 'completed':
        return tasks.filter((t) => t.status === 'completed' || t.status === 'approved');
      case 'overdue':
        return tasks.filter((t) => new Date(t.dueDate) < now && t.status !== 'completed');
      default:
        return tasks;
    }
  };

  const groupedTasks = getFilteredTasks().reduce(
    (acc, task) => {
      const category = task.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(task);
      return acc;
    },
    {} as Record<string, Task[]>
  );

  const categories = Object.keys(groupedTasks);

  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      onPress={() => router.push('/(tabs)/checklist')}
      className="bg-background border-l-4 border-l-primary pl-4 py-3 mb-2 flex-row items-center justify-between"
    >
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{item.title}</Text>
        <Text className="text-xs text-muted mt-1">
          Due {new Date(item.dueDate).toLocaleDateString()}
        </Text>
      </View>
      <View
        className={cn(
          'px-3 py-1 rounded-full',
          item.status === 'completed' && 'bg-success/20',
          item.status === 'approved' && 'bg-success/20',
          item.status === 'pending' && 'bg-warning/20',
          item.status === 'submitted' && 'bg-primary/20',
          item.status === 'rejected' && 'bg-error/20'
        )}
      >
        <Text
          className={cn(
            'text-xs font-semibold',
            (item.status === 'completed' || item.status === 'approved') && 'text-success',
            item.status === 'pending' && 'text-warning',
            item.status === 'submitted' && 'text-primary',
            item.status === 'rejected' && 'text-error'
          )}
        >
          {item.status === 'completed' ? '✓' : item.status === 'approved' ? '✓' : item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="p-6">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      >
        <View className="gap-4">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Onboarding Checklist</Text>
            <Text className="text-base text-muted mt-1">
              {getFilteredTasks().length} tasks
            </Text>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row gap-2">
            {(['all', 'pending', 'completed', 'overdue'] as FilterStatus[]).map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                className={cn(
                  'px-4 py-2 rounded-full border',
                  filter === f
                    ? 'bg-primary border-primary'
                    : 'bg-surface border-border'
                )}
              >
                <Text
                  className={cn(
                    'text-sm font-semibold capitalize',
                    filter === f ? 'text-white' : 'text-foreground'
                  )}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tasks by Category */}
          {categories.length > 0 ? (
            categories.map((category) => (
              <View key={category} className="gap-2">
                <Text className="text-lg font-semibold text-foreground">{category}</Text>
                <FlatList
                  data={groupedTasks[category]}
                  renderItem={renderTaskItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-12 gap-3">
              <MaterialIcons name="check-circle" size={48} color="#22C55E" />
              <Text className="text-lg font-semibold text-foreground">No tasks found</Text>
              <Text className="text-sm text-muted text-center">
                Try adjusting your filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
