import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Camera, History, MessageCircle, Settings, FileText, Pill, Calendar, TrendingUp } from 'lucide-react';
import WeatherBanner from '../components/WeatherBanner';
import AIAssistant from '../components/AIAssistant';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock scan history data
  const recentScans = [
    {
      id: '1',
      medicine: 'Paracetamol 500mg',
      date: '2024-01-15',
      safety: 'Safe',
      safetyColor: 'text-green-600 bg-green-100'
    },
    {
      id: '2',
      medicine: 'Ibuprofen 400mg',
      date: '2024-01-14',
      safety: 'Caution',
      safetyColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: '3',
      medicine: 'Amoxicillin 250mg',
      date: '2024-01-13',
      safety: 'Safe',
      safetyColor: 'text-green-600 bg-green-100'
    }
  ];

  const quickStats = [
    { label: 'Total Scans', value: '24', icon: Pill, color: 'text-blue-600 bg-blue-100' },
    { label: 'This Month', value: '8', icon: Calendar, color: 'text-emerald-600 bg-emerald-100' },
    { label: 'Safety Score', value: '95%', icon: TrendingUp, color: 'text-purple-600 bg-purple-100' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AIAssistant />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Monitor your medicine safety and get AI-powered insights
          </p>
        </div>

        <WeatherBanner />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/scanner"
                  className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Scan Medicine
                </Link>
                <Link
                  to="/feedback"
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Give Feedback
                </Link>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Name</label>
                  <p className="text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900">{user?.email}</p>
                </div>
                {user?.age && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Age</label>
                    <p className="text-gray-900">{user.age} years</p>
                  </div>
                )}
                {user?.healthConditions && user.healthConditions.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Health Conditions</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.healthConditions.map((condition, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  Update Profile
                </button>
              </div>
            </div>
          </div>

          {/* Recent Scans */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Scans</h2>
                <Link
                  to="/scanner"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              {recentScans.length > 0 ? (
                <div className="space-y-4">
                  {recentScans.map((scan) => (
                    <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Pill className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{scan.medicine}</h3>
                            <p className="text-sm text-gray-600">{scan.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${scan.safetyColor}`}>
                            {scan.safety}
                          </span>
                          <Link
                            to={`/report/${scan.id}`}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <FileText className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No scans yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start by scanning your first medicine to see detailed safety reports
                  </p>
                  <Link
                    to="/scanner"
                    className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Scan Medicine
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;