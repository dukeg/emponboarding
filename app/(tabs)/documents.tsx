import { ScrollView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { ScreenContainer } from '@/components/screen-container';
import { useAuth } from '@/lib/auth-context';
import { useOnboarding, Document } from '@/lib/onboarding-context';
import { cn } from '@/lib/utils';
import { MaterialIcons } from '@expo/vector-icons';

export default function DocumentsScreen() {
  const { user } = useAuth();
  const { documents, fetchDocuments, uploadDocument } = useOnboarding();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchDocuments(user.id);
    }
  }, [user?.id]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (user?.id) {
      await fetchDocuments(user.id);
    }
    setIsRefreshing(false);
  };

  const handleUploadDocument = async (documentId: string) => {
    // In a real app, this would open a file picker
    // For now, we'll simulate an upload
    await uploadDocument(documentId, 'https://example.com/document.pdf');
  };

  const renderDocumentItem = ({ item }: { item: Document }) => (
    <View className="bg-surface border border-border rounded-lg p-4 mb-3 gap-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">{item.title}</Text>
          <Text className="text-sm text-muted mt-1">{item.description}</Text>
        </View>
        <View
          className={cn(
            'px-3 py-1 rounded-full',
            item.status === 'pending' && 'bg-warning/20',
            item.status === 'submitted' && 'bg-primary/20',
            item.status === 'approved' && 'bg-success/20',
            item.status === 'rejected' && 'bg-error/20'
          )}
        >
          <Text
            className={cn(
              'text-xs font-semibold capitalize',
              item.status === 'pending' && 'text-warning',
              item.status === 'submitted' && 'text-primary',
              item.status === 'approved' && 'text-success',
              item.status === 'rejected' && 'text-error'
            )}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Document Details */}
      <View className="flex-row items-center gap-2 text-sm text-muted border-t border-border pt-3">
        <MaterialIcons name="event" size={14} color="#687076" />
        <Text className="text-xs text-muted">
          Due {new Date(item.dueDate).toLocaleDateString()}
        </Text>
      </View>

      {/* Rejection Reason */}
      {item.status === 'rejected' && item.rejectionReason && (
        <View className="bg-error/10 border border-error/30 rounded-lg p-3 gap-1">
          <Text className="text-xs font-semibold text-error">Rejection Reason</Text>
          <Text className="text-xs text-error">{item.rejectionReason}</Text>
        </View>
      )}

      {/* Action Buttons */}
      {item.status === 'pending' || item.status === 'rejected' ? (
        <TouchableOpacity
          onPress={() => handleUploadDocument(item.id)}
          className="bg-primary rounded-lg py-2 items-center mt-2"
        >
          <Text className="text-white font-semibold text-sm">
            {item.status === 'rejected' ? 'Re-upload' : 'Upload Document'}
          </Text>
        </TouchableOpacity>
      ) : item.status === 'submitted' ? (
        <View className="bg-primary/10 rounded-lg py-2 items-center mt-2">
          <Text className="text-primary font-semibold text-sm">Pending Review</Text>
        </View>
      ) : (
        <View className="bg-success/10 rounded-lg py-2 items-center mt-2 flex-row justify-center gap-1">
          <MaterialIcons name="check-circle" size={16} color="#22C55E" />
          <Text className="text-success font-semibold text-sm">Approved</Text>
        </View>
      )}
    </View>
  );

  const requiredDocs = documents.filter((d) => d.required);
  const approvedDocs = documents.filter((d) => d.status === 'approved').length;

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="gap-4">
          {/* Header */}
          <View>
            <Text className="text-3xl font-bold text-foreground">Documents</Text>
            <Text className="text-base text-muted mt-1">
              {approvedDocs} of {requiredDocs.length} documents approved
            </Text>
          </View>

          {/* Progress Summary */}
          <View className="bg-primary/10 border border-primary/30 rounded-lg p-4 gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm font-semibold text-primary">Document Submission Progress</Text>
              <Text className="text-lg font-bold text-primary">
                {Math.round((approvedDocs / requiredDocs.length) * 100)}%
              </Text>
            </View>
            <View className="bg-primary/20 rounded-full h-2 overflow-hidden">
              <View
                className="bg-primary h-full"
                style={{
                  width: `${requiredDocs.length > 0 ? (approvedDocs / requiredDocs.length) * 100 : 0}%`,
                }}
              />
            </View>
          </View>

          {/* Documents List */}
          {documents.length > 0 ? (
            <FlatList
              data={documents}
              renderItem={renderDocumentItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View className="items-center justify-center py-12 gap-3">
              <MaterialIcons name="folder-open" size={48} color="#0066CC" />
              <Text className="text-lg font-semibold text-foreground">No documents required</Text>
              <Text className="text-sm text-muted text-center">
                All required documents have been uploaded
              </Text>
            </View>
          )}

          {/* Help Text */}
          <View className="bg-surface border border-border rounded-lg p-4 gap-2 mt-4">
            <Text className="text-sm font-semibold text-foreground">Document Requirements</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Please ensure all required documents are uploaded and approved before your onboarding is complete. If your document is rejected, please review the feedback and re-upload.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
