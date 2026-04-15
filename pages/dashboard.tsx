import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'completed' | 'in-progress';
  dueDate: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setUser({ email: 'demo@example.com', role: 'employee' });
    } else {
      setUser(JSON.parse(userData));
    }

    setTasks([
      { id: '1', title: 'Complete Employee Profile', category: 'Admin', status: 'completed', dueDate: '2024-04-01' },
      { id: '2', title: 'IT Setup & Equipment', category: 'IT', status: 'in-progress', dueDate: '2024-04-05' },
      { id: '3', title: 'Company Orientation', category: 'Training', status: 'pending', dueDate: '2024-04-10' },
      { id: '4', title: 'Submit Required Documents', category: 'Documents', status: 'pending', dueDate: '2024-04-08' },
      { id: '5', title: 'Department Onboarding', category: 'Training', status: 'pending', dueDate: '2024-04-15' },
    ]);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">OnboardHub</h1>
            <p className="text-blue-100 text-sm">AI-Powered Global Onboarding Platform</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-blue-100">Welcome, {user.email}</p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{completedCount}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressCount}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{pendingCount}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.5H7a1 1 0 100 2h4a1 1 0 001-1v-4.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Progress</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{Math.round((completedCount / tasks.length) * 100)}%</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/emponboarding/onboarding/checklist" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-semibold text-gray-900">Checklist</h3>
              <p className="text-sm text-gray-600 mt-2">Track your onboarding tasks</p>
            </div>
          </Link>

          <Link href="/emponboarding/onboarding/documents" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-semibold text-gray-900">Documents</h3>
              <p className="text-sm text-gray-600 mt-2">Upload required documents</p>
            </div>
          </Link>

          <Link href="/emponboarding/onboarding/training" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900">Training</h3>
              <p className="text-sm text-gray-600 mt-2">View training schedule</p>
            </div>
          </Link>

          <Link href="/emponboarding/ai-assistant" className="block">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer border border-blue-200">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-600 mt-2">Get instant help</p>
            </div>
          </Link>
        </div>

        {/* Advanced Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🌐 Global Operations</h2>
            <p className="text-gray-600 text-sm mb-4">Access global offices, timezones, and localization features</p>
            <Link href="/emponboarding/global-operations" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
              Explore Global →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Analytics</h2>
            <p className="text-gray-600 text-sm mb-4">View comprehensive onboarding analytics and insights</p>
            <Link href="/emponboarding/admin/analytics" className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
              View Analytics →
            </Link>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
            <Link href="/emponboarding/onboarding/checklist" className="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </Link>
          </div>

          <div className="divide-y divide-gray-200">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {task.status === 'completed' && (
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    {task.status === 'in-progress' && (
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    )}
                    {task.status === 'pending' && (
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200"></div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">{task.category}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
