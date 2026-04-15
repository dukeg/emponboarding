import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'completed' | 'in-progress';
  dueDate: string;
}

export default function Checklist() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTasks([
      { id: '1', title: 'Complete Employee Profile', description: 'Fill in your personal and professional information', category: 'Admin', status: 'completed', dueDate: '2024-04-01' },
      { id: '2', title: 'IT Setup & Equipment', description: 'Receive laptop, phone, and access credentials', category: 'IT', status: 'in-progress', dueDate: '2024-04-05' },
      { id: '3', title: 'Company Orientation', description: 'Attend company-wide orientation session', category: 'Training', status: 'pending', dueDate: '2024-04-10' },
      { id: '4', title: 'Submit Required Documents', description: 'Upload ID, tax forms, and insurance documents', category: 'Documents', status: 'pending', dueDate: '2024-04-08' },
      { id: '5', title: 'Department Onboarding', description: 'Meet with your department and team members', category: 'Training', status: 'pending', dueDate: '2024-04-15' },
      { id: '6', title: 'Security Training', description: 'Complete mandatory security and compliance training', category: 'Training', status: 'pending', dueDate: '2024-04-12' },
      { id: '7', title: 'Set Up Workspace', description: 'Arrange your desk and office supplies', category: 'Admin', status: 'pending', dueDate: '2024-04-03' },
    ]);
    setIsLoading(false);
  }, []);

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(t => t.category === filter);

  const categories = ['all', ...new Set(tasks.map(t => t.category))];
  const completionPercentage = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/emponboarding/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Onboarding Checklist</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
            <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
          </p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    task.status === 'completed'
                      ? 'bg-green-600 border-green-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {task.status === 'completed' && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      {task.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    {task.status === 'in-progress' && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tasks in this category</p>
          </div>
        )}
      </main>
    </div>
  );
}
