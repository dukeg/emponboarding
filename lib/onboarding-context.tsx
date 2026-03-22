import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  assignedBy: string;
  assignedTo: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected' | 'completed';
  estimatedMinutes: number;
  createdAt: string;
}

export interface Document {
  id: string;
  type: string;
  title: string;
  description: string;
  required: boolean;
  dueDate: string;
  fileUrl?: string;
  uploadedBy: string;
  uploadedAt?: string;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  instructor: string;
  location: string;
  assignedTo: string[];
  status?: 'scheduled' | 'completed' | 'missed';
}

export interface OnboardingProgress {
  id: string;
  employeeId: string;
  totalTasks: number;
  completedTasks: number;
  totalDocuments: number;
  submittedDocuments: number;
  approvedDocuments: number;
  trainingScheduled: number;
  trainingCompleted: number;
  overallProgress: number;
  estimatedCompletionDate: string;
  lastUpdated: string;
}

interface OnboardingContextType {
  tasks: Task[];
  documents: Document[];
  trainingSessions: Training[];
  progress: OnboardingProgress | null;
  isLoading: boolean;
  
  // Task methods
  fetchTasks: (employeeId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>;
  
  // Document methods
  fetchDocuments: (employeeId: string) => Promise<void>;
  uploadDocument: (documentId: string, fileUrl: string) => Promise<void>;
  
  // Training methods
  fetchTrainingSessions: (employeeId: string) => Promise<void>;
  confirmTrainingAttendance: (trainingId: string) => Promise<void>;
  
  // Progress methods
  fetchProgress: (employeeId: string) => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [trainingSessions, setTrainingSessions] = useState<Training[]>([]);
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async (employeeId: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Complete Tax Form W-4',
          description: 'Submit your federal tax withholding form',
          category: 'HR Paperwork',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          assignedBy: 'manager-1',
          assignedTo: employeeId,
          status: 'pending',
          estimatedMinutes: 15,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'IT Equipment Setup',
          description: 'Set up your laptop, phone, and accounts',
          category: 'IT Setup',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          assignedBy: 'manager-1',
          assignedTo: employeeId,
          status: 'pending',
          estimatedMinutes: 60,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Company Orientation',
          description: 'Attend company orientation and policies training',
          category: 'Training',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          assignedBy: 'manager-1',
          assignedTo: employeeId,
          status: 'pending',
          estimatedMinutes: 120,
          createdAt: new Date().toISOString(),
        },
      ];

      await AsyncStorage.setItem(`tasks_${employeeId}`, JSON.stringify(mockTasks));
      setTasks(mockTasks);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, status: Task['status']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
    // TODO: Sync to server
  };

  const fetchDocuments = async (employeeId: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockDocuments: Document[] = [
        {
          id: 'doc-1',
          type: 'tax_form',
          title: 'Tax Form W-4',
          description: 'Federal tax withholding form',
          required: true,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          uploadedBy: employeeId,
          status: 'pending',
        },
        {
          id: 'doc-2',
          type: 'id_copy',
          title: 'Government ID Copy',
          description: 'Copy of your passport or driver license',
          required: true,
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          uploadedBy: employeeId,
          status: 'pending',
        },
        {
          id: 'doc-3',
          type: 'direct_deposit',
          title: 'Direct Deposit Form',
          description: 'Bank account information for payroll',
          required: true,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          uploadedBy: employeeId,
          status: 'pending',
        },
      ];

      await AsyncStorage.setItem(`documents_${employeeId}`, JSON.stringify(mockDocuments));
      setDocuments(mockDocuments);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (documentId: string, fileUrl: string) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.id === documentId
          ? { ...doc, fileUrl, status: 'submitted', uploadedAt: new Date().toISOString() }
          : doc
      )
    );
    // TODO: Sync to server
  };

  const fetchTrainingSessions = async (employeeId: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockTraining: Training[] = [
        {
          id: 'train-1',
          title: 'Company Orientation',
          description: 'Introduction to company culture, policies, and procedures',
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '09:00',
          duration: 120,
          instructor: 'HR Manager',
          location: 'Conference Room A',
          assignedTo: [employeeId],
          status: 'scheduled',
        },
        {
          id: 'train-2',
          title: 'Department Overview',
          description: 'Learn about your department and team',
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '10:00',
          duration: 60,
          instructor: 'Department Manager',
          location: 'Department Office',
          assignedTo: [employeeId],
          status: 'scheduled',
        },
      ];

      await AsyncStorage.setItem(`training_${employeeId}`, JSON.stringify(mockTraining));
      setTrainingSessions(mockTraining);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmTrainingAttendance = async (trainingId: string) => {
    setTrainingSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === trainingId ? { ...session, status: 'completed' } : session
      )
    );
    // TODO: Sync to server
  };

  const fetchProgress = async (employeeId: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockProgress: OnboardingProgress = {
        id: `progress_${employeeId}`,
        employeeId,
        totalTasks: 10,
        completedTasks: 2,
        totalDocuments: 5,
        submittedDocuments: 1,
        approvedDocuments: 1,
        trainingScheduled: 3,
        trainingCompleted: 0,
        overallProgress: 20,
        estimatedCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      await AsyncStorage.setItem(`progress_${employeeId}`, JSON.stringify(mockProgress));
      setProgress(mockProgress);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        tasks,
        documents,
        trainingSessions,
        progress,
        isLoading,
        fetchTasks,
        updateTaskStatus,
        fetchDocuments,
        uploadDocument,
        fetchTrainingSessions,
        confirmTrainingAttendance,
        fetchProgress,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
