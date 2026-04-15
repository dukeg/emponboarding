import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AnalyticsData {
  totalEmployees: number;
  onboardingInProgress: number;
  completedOnboarding: number;
  averageCompletionTime: number;
  taskCompletionRate: number;
  documentSubmissionRate: number;
  trainingAttendanceRate: number;
}

interface DepartmentStats {
  name: string;
  employees: number;
  completionRate: number;
  averageTime: number;
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [timeRange, setTimeRange] = useState('30days');

  useEffect(() => {
    // Mock analytics data
    setAnalytics({
      totalEmployees: 156,
      onboardingInProgress: 23,
      completedOnboarding: 133,
      averageCompletionTime: 18,
      taskCompletionRate: 87,
      documentSubmissionRate: 92,
      trainingAttendanceRate: 95,
    });

    setDepartmentStats([
      { name: 'Engineering', employees: 45, completionRate: 89, averageTime: 16 },
      { name: 'Sales', employees: 32, completionRate: 91, averageTime: 14 },
      { name: 'Marketing', employees: 28, completionRate: 85, averageTime: 19 },
      { name: 'HR', employees: 15, completionRate: 100, averageTime: 12 },
      { name: 'Operations', employees: 36, completionRate: 83, averageTime: 21 },
    ]);
  }, [timeRange]);

  if (!analytics) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/emponboarding/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Employees</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalEmployees}</p>
            <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Onboarding In Progress</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{analytics.onboardingInProgress}</p>
            <p className="text-xs text-gray-500 mt-2">{Math.round((analytics.onboardingInProgress / analytics.totalEmployees) * 100)}% of total</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{analytics.completedOnboarding}</p>
            <p className="text-xs text-gray-500 mt-2">{Math.round((analytics.completedOnboarding / analytics.totalEmployees) * 100)}% completion rate</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Avg. Time to Complete</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{analytics.averageCompletionTime}</p>
            <p className="text-xs text-gray-500 mt-2">days</p>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Task Completion Rate</h3>
            <div className="flex items-end gap-2 h-32">
              {[87, 85, 88, 86, 87, 89, 87].map((rate, i) => (
                <div key={i} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${(rate / 100) * 100}%` }}></div>
              ))}
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-4">{analytics.taskCompletionRate}%</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Document Submission Rate</h3>
            <div className="flex items-end gap-2 h-32">
              {[90, 91, 92, 91, 92, 92, 92].map((rate, i) => (
                <div key={i} className="flex-1 bg-green-200 rounded-t" style={{ height: `${(rate / 100) * 100}%` }}></div>
              ))}
            </div>
            <p className="text-2xl font-bold text-green-600 mt-4">{analytics.documentSubmissionRate}%</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Training Attendance Rate</h3>
            <div className="flex items-end gap-2 h-32">
              {[94, 95, 94, 95, 96, 95, 95].map((rate, i) => (
                <div key={i} className="flex-1 bg-purple-200 rounded-t" style={{ height: `${(rate / 100) * 100}%` }}></div>
              ))}
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-4">{analytics.trainingAttendanceRate}%</p>
          </div>
        </div>

        {/* Department Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Department Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Employees</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Completion Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg. Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept) => (
                  <tr key={dept.name} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">{dept.name}</td>
                    <td className="py-4 px-4 text-gray-600">{dept.employees}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${dept.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{dept.completionRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{dept.averageTime} days</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        dept.completionRate >= 90
                          ? 'bg-green-100 text-green-700'
                          : dept.completionRate >= 80
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {dept.completionRate >= 90 ? 'Excellent' : dept.completionRate >= 80 ? 'Good' : 'Needs Attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition">
            📊 Export as PDF
          </button>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition">
            📈 Export as Excel
          </button>
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition">
            📧 Email Report
          </button>
        </div>
      </main>
    </div>
  );
}
