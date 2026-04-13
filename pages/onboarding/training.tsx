import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface TrainingSession {
  id: string;
  title: string;
  description: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function Training() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));

    // Mock training sessions
    setSessions([
      {
        id: '1',
        title: 'Company Orientation',
        description: 'Overview of company history, values, and culture',
        instructor: 'HR Team',
        date: '2024-04-10',
        time: '09:00 AM',
        duration: '2 hours',
        location: 'Conference Room A',
        status: 'scheduled'
      },
      {
        id: '2',
        title: 'IT Systems Training',
        description: 'Introduction to company software and tools',
        instructor: 'IT Department',
        date: '2024-04-11',
        time: '10:00 AM',
        duration: '1.5 hours',
        location: 'IT Lab',
        status: 'scheduled'
      },
      {
        id: '3',
        title: 'Security & Compliance',
        description: 'Mandatory security training and compliance requirements',
        instructor: 'Compliance Officer',
        date: '2024-04-12',
        time: '02:00 PM',
        duration: '1 hour',
        location: 'Online',
        status: 'scheduled'
      },
      {
        id: '4',
        title: 'Department Onboarding',
        description: 'Meet your team and learn about department processes',
        instructor: 'Your Manager',
        date: '2024-04-15',
        time: '11:00 AM',
        duration: '2 hours',
        location: 'Department Office',
        status: 'scheduled'
      },
    ]);
  }, [router]);

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled');
  const completedSessions = sessions.filter(s => s.status === 'completed');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Training Schedule</h1>
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upcoming Sessions */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{session.description}</p>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    Scheduled
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Time</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{session.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Duration</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{session.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{session.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Instructor</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{session.instructor}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
                    Add to Calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Sessions */}
        {completedSessions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Completed Sessions</h2>
            <div className="space-y-4">
              {completedSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-lg shadow p-6 opacity-75">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{session.description}</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-2">Training Tips</h3>
          <ul className="text-sm text-purple-800 space-y-2">
            <li>• Arrive 10 minutes early to each session</li>
            <li>• Bring a notebook to take notes</li>
            <li>• Ask questions - we encourage participation</li>
            <li>• Check your email for session materials and updates</li>
            <li>• If you need to reschedule, contact HR at least 24 hours in advance</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
