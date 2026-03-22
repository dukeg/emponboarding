import { ScrollView, Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useOnboarding, Training } from '@/lib/onboarding-context';
import { cn } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';

export default function TrainingScreen() {
  const { user } = useAuth();
  const { trainingSessions, fetchTrainingSessions, confirmTrainingAttendance } = useOnboarding();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchTrainingSessions(user.id);
    }
  }, [user?.id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (user?.id) {
      await fetchTrainingSessions(user.id);
    }
    setIsRefreshing(false);
  };

  const handleConfirmAttendance = async (trainingId: string) => {
    await confirmTrainingAttendance(trainingId);
  };

  const renderTrainingItem = ({ item }: { item: Training }) => (
    <View className="bg-surface border border-border rounded-lg p-4 mb-3 gap-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-foreground">{item.title}</Text>
          <Text className="text-sm text-muted mt-1">{item.description}</Text>
        </View>
        <View
          className={cn(
            'px-3 py-1 rounded-full',
            item.status === 'completed' && 'bg-success/20',
            item.status === 'scheduled' && 'bg-primary/20',
            item.status === 'missed' && 'bg-error/20'
          )}
        >
          <Text
            className={cn(
              'text-xs font-semibold capitalize',
              item.status === 'completed' && 'text-success',
              item.status === 'scheduled' && 'text-primary',
              item.status === 'missed' && 'text-error'
            )}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Training Details */}
      <View className="gap-2 border-t border-border pt-3">
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="event" size={16} color="#687076" />
          <Text className="text-sm text-foreground">
            {new Date(item.date).toLocaleDateString()} at {item.time}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="schedule" size={16} color="#687076" />
          <Text className="text-sm text-foreground">{item.duration} minutes</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="person" size={16} color="#687076" />
          <Text className="text-sm text-foreground">{item.instructor}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <MaterialIcons name="location-on" size={16} color="#687076" />
          <Text className="text-sm text-foreground">{item.location}</Text>
        </View>
      </View>

      {/* Action Button */}
      {item.status === 'scheduled' && (
        <TouchableOpacity
          onPress={() => handleConfirmAttendance(item.id)}
          className="bg-success rounded-lg py-2 items-center mt-2"
        >
          <Text className="text-white font-semibold text-sm">Confirm Attendance</Text>
        </TouchableOpacity>
      )}
    </View>
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
            <Text className="text-3xl font-bold text-foreground">Training Schedule</Text>
            <Text className="text-base text-muted mt-1">
              {trainingSessions.length} sessions assigned
            </Text>
          </View>

          {/* Training Sessions */}
          {trainingSessions.length > 0 ? (
            <FlatList
              data={trainingSessions}
              renderItem={renderTrainingItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center justify-center py-12 gap-3">
              <MaterialIcons name="school" size={48} color="#0066CC" />
              <Text className="text-lg font-semibold text-foreground">No training sessions</Text>
              <Text className="text-sm text-muted text-center">
                Your training schedule will appear here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
