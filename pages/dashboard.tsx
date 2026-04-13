import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Task {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'completed' | 'in-progress';
  dueDate: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));

    // Mock tasks data
    setTasks([
      { id: '1', title: 'Complete Employee Profile', category: 'Admin', status: 'completed', dueDate: '2024-04-01' },
      { id: '2', title: 'IT Setup & Equipment', category: 'IT', status: 'in-progress', dueDate: '2024-04-05' },
      { id: '3', title: 'Company Orientation', category: 'Training', status: 'pending', dueDate: '2024-04-10' },
      { id: '4', title: 'Submit Required Documents', category: 'Documents', status: 'pending', dueDate: '2024-04-08' },
      { id: '5', title: 'Department Onboarding', category: 'Training', status: 'pending', dueDate: '2024-04-15' },
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">OnboardHub</h1>
            <p className="text-gray-600 text-sm">Welcome, {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
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

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressCount}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V9" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
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
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Onboarding Tasks</h2>
            <Link href="/onboarding/checklist" className="text-blue-600 hover:text-blue-700 font-medium">
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/onboarding/documents" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Upload Documents</h3>
                  <p className="text-sm text-gray-600">Submit required paperwork</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/onboarding/training" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Training Schedule</h3>
                  <p className="text-sm text-gray-600">View upcoming training sessions</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
