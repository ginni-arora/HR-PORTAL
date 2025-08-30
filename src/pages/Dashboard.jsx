import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Bell,
  Database,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { addSampleData } from '../utils/sampleData';
import { createAdminUser } from '../utils/createAdmin';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount] = useState(3); // Mock unread count
  const [leaveForm, setLeaveForm] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    phone: ''
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { name: 'Total Employees', value: '248', icon: Users, change: '+12%', color: 'bg-blue-500' },
    { name: 'Present Today', value: '234', icon: CheckCircle, change: '+2%', color: 'bg-green-500' },
    { name: 'On Leave', value: '14', icon: Calendar, change: '-5%', color: 'bg-yellow-500' },
    { name: 'Pending Requests', value: '8', icon: AlertCircle, change: '+3%', color: 'bg-red-500' },
  ];

  const recentActivities = [
    { id: 1, user: 'Sarah Johnson', action: 'submitted leave request', time: '2 hours ago', type: 'leave' },
    { id: 2, user: 'Mike Chen', action: 'checked in', time: '3 hours ago', type: 'attendance' },
    { id: 3, user: 'Emma Davis', action: 'completed onboarding', time: '5 hours ago', type: 'onboarding' },
    { id: 4, user: 'James Wilson', action: 'updated profile', time: '1 day ago', type: 'profile' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', date: 'Today' },
    { id: 2, title: 'Performance Review', time: '2:00 PM', date: 'Tomorrow' },
    { id: 3, title: 'Company All-Hands', time: '11:00 AM', date: 'Friday' },
  ];

  const handleAddSampleData = async () => {
    try {
      await addSampleData();
      toast.success('Sample data added successfully!');
    } catch (error) {
      toast.error('Failed to add sample data');
    }
  };

  const handleCreateAdmin = async () => {
    try {
      const success = await createAdminUser();
      if (success) {
        toast.success('Admin user created! Use admin@company.com / password123');
      } else {
        toast.error('Admin user already exists or creation failed');
      }
    } catch (error) {
      toast.error('Failed to create admin user');
    }
  };

  const handleLeaveRequest = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'leaveRequests'), {
        ...leaveForm,
        employeeName: userProfile?.name || 'Unknown',
        department: userProfile?.department || 'Unknown',
        status: 'pending',
        createdAt: new Date()
      });
      toast.success('Leave request submitted!');
      setShowLeaveModal(false);
      setLeaveForm({ type: '', startDate: '', endDate: '', reason: '' });
    } catch (error) {
      toast.error('Failed to submit leave request');
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'employees'), {
        ...employeeForm,
        status: 'active',
        role: 'employee',
        joinDate: new Date().toISOString().split('T')[0],
        createdAt: new Date()
      });
      toast.success('Employee added successfully!');
      setShowEmployeeModal(false);
      setEmployeeForm({ name: '', email: '', department: '', position: '', phone: '' });
    } catch (error) {
      toast.error('Failed to add employee');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good morning, {userProfile?.name || 'User'}! 👋
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {format(currentTime, 'EEEE, MMMM do, yyyy')} • {format(currentTime, 'h:mm:ss a')}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setShowLeaveModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <button 
            onClick={() => setShowEmployeeModal(true)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <span className="text-sm font-medium">Add Employee</span>
          </button>
          <button 
            onClick={() => setShowLeaveModal(true)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <Calendar className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <span className="text-sm font-medium">Request Leave</span>
          </button>
          <button 
            onClick={() => navigate('/employees')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
            <span className="text-sm font-medium">View Employees</span>
          </button>
          <button 
            onClick={() => navigate('/analytics')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <span className="text-sm font-medium">View Reports</span>
          </button>
          <button 
            onClick={handleAddSampleData}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <Database className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
            <span className="text-sm font-medium">Add Sample Data</span>
          </button>
          <button 
            onClick={handleCreateAdmin}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center transition-colors"
          >
            <Users className="h-6 w-6 mx-auto mb-2 text-red-600" />
            <span className="text-sm font-medium">Create Admin</span>
          </button>
        </div>
      </div>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Request Leave</h2>
              <button onClick={() => setShowLeaveModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleLeaveRequest} className="space-y-4">
              <select
                value={leaveForm.type}
                onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Emergency Leave">Emergency Leave</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={leaveForm.startDate}
                  onChange={(e) => setLeaveForm({...leaveForm, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="date"
                  value={leaveForm.endDate}
                  onChange={(e) => setLeaveForm({...leaveForm, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <textarea
                placeholder="Reason for leave"
                value={leaveForm.reason}
                onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Add Employee</h2>
              <button onClick={() => setShowEmployeeModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={employeeForm.name}
                onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={employeeForm.email}
                onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={employeeForm.department}
                onChange={(e) => setEmployeeForm({...employeeForm, department: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
              <input
                type="text"
                placeholder="Position"
                value={employeeForm.position}
                onChange={(e) => setEmployeeForm({...employeeForm, position: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={employeeForm.phone}
                onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEmployeeModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;