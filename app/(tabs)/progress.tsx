import { ScrollView, Text, View } from 'react-native';
import { useEffect } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useOnboarding } from '@/lib/onboarding-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProgressScreen() {
  const { user } = useAuth();
  const { progress, fetchProgress, tasks, documents, trainingSessions } = useOnboarding();

  useEffect(() => {
    if (user?.id) {
      fetchProgress(user.id);
    }
  }, [user?.id]);

  if (!progress) {
    return (
      <ScreenContainer className="p-6 items-center justify-center">
        <Text className="text-lg text-muted">Loading progress...</Text>
      </ScreenContainer>
    );
  }

  const completedTasks = tasks.filter((t) => t.status === 'completed' || t.status === 'approved').length;
  const completedDocs = documents.filter((d) => d.status === 'approved').length;
  const completedTraining = trainingSessions.filter((t) => t.status === 'completed').length;

  const milestones = [
    {
      day: 'Day 1',
      title: 'Welcome & Orientation',
      completed: progress.completedTasks > 0,
      icon: 'check-circle',
    },
    {
      day: 'Week 1',
      title: 'IT Setup & Documents',
      completed: completedDocs > 0,
      icon: 'folder-open',
    },
    {
      day: 'Week 2',
      title: 'Department Training',
      completed: completedTraining > 0,
      icon: 'school',
    },
    {
      day: 'Month 1',
      title: 'Full Onboarding',
      completed: progress.overallProgress === 100,
      icon: 'flag',
    },
  ];

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-6">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Progress Tracking</Text>
            <Text className="text-base text-muted mt-1">Your onboarding journey</Text>
          </View>

          {/* Overall Progress */}
          <View className="bg-primary rounded-lg p-6 gap-4">
            <View className="gap-2">
              <Text className="text-white/90 text-sm font-semibold">Overall Progress</Text>
              <Text className="text-5xl font-bold text-white">{progress.overallProgress}%</Text>
            </View>
            <View className="bg-white/30 rounded-full h-3 overflow-hidden">
              <View
                className="bg-white h-full"
                style={{ width: `${progress.overallProgress}%` }}
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="text-white/80 text-xs">
                {progress.completedTasks} of {progress.totalTasks} tasks
              </Text>
              <Text className="text-white/80 text-xs">
                Est. completion: {new Date(progress.estimatedCompletionDate).toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Category Breakdown */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Breakdown by Category</Text>

            {/* Tasks */}
            <View className="bg-surface border border-border rounded-lg p-4 gap-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="bg-primary/10 rounded-full p-2">
                    <MaterialIcons name="check-circle" size={20} color="#0066CC" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-foreground">Tasks</Text>
                    <Text className="text-xs text-muted">{progress.totalTasks} total</Text>
                  </View>
                </View>
                <Text className="text-lg font-bold text-foreground">{completedTasks}</Text>
              </View>
              <View className="bg-background rounded-full h-2 overflow-hidden">
                <View
                  className="bg-primary h-full"
                  style={{
                    width: `${progress.totalTasks > 0 ? (completedTasks / progress.totalTasks) * 100 : 0}%`,
                  }}
                />
              </View>
            </View>

            {/* Documents */}
            <View className="bg-surface border border-border rounded-lg p-4 gap-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="bg-success/10 rounded-full p-2">
                    <MaterialIcons name="description" size={20} color="#22C55E" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-foreground">Documents</Text>
                    <Text className="text-xs text-muted">{progress.totalDocuments} total</Text>
                  </View>
                </View>
                <Text className="text-lg font-bold text-foreground">{completedDocs}</Text>
              </View>
              <View className="bg-background rounded-full h-2 overflow-hidden">
                <View
                  className="bg-success h-full"
                  style={{
                    width: `${progress.totalDocuments > 0 ? (completedDocs / progress.totalDocuments) * 100 : 0}%`,
                  }}
                />
              </View>
            </View>

            {/* Training */}
            <View className="bg-surface border border-border rounded-lg p-4 gap-2">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="bg-warning/10 rounded-full p-2">
                    <MaterialIcons name="school" size={20} color="#F59E0B" />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-foreground">Training</Text>
                    <Text className="text-xs text-muted">{progress.trainingScheduled} total</Text>
                  </View>
                </View>
                <Text className="text-lg font-bold text-foreground">{completedTraining}</Text>
              </View>
              <View className="bg-background rounded-full h-2 overflow-hidden">
                <View
                  className="bg-warning h-full"
                  style={{
                    width: `${progress.trainingScheduled > 0 ? (completedTraining / progress.trainingScheduled) * 100 : 0}%`,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Milestones Timeline */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-foreground">Milestones</Text>
            {milestones.map((milestone, index) => (
              <View key={index} className="flex-row gap-4">
                {/* Timeline Line */}
                <View className="items-center">
                  <View
                    className={`w-10 h-10 rounded-full items-center justify-center border-2 ${
                      milestone.completed
                        ? 'bg-success border-success'
                        : 'bg-surface border-border'
                    }`}
                  >
                    <MaterialIcons
                      name={milestone.completed ? 'check' : 'schedule'}
                      size={20}
                      color={milestone.completed ? '#ffffff' : '#687076'}
                    />
                  </View>
                  {index < milestones.length - 1 && (
                    <View className="w-1 h-8 bg-border mt-1" />
                  )}
                </View>

                {/* Milestone Content */}
                <View className="flex-1 pt-1 pb-4">
                  <Text className="text-xs font-semibold text-muted uppercase">{milestone.day}</Text>
                  <Text className="text-base font-semibold text-foreground mt-1">
                    {milestone.title}
                  </Text>
                  {milestone.completed && (
                    <Text className="text-xs text-success mt-1">✓ Completed</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
