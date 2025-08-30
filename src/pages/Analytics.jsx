import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Calendar, Clock, Download, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('attendance');

  // Sample data - in real app, fetch from Firebase
  const departmentData = [
    { name: 'Engineering', employees: 45, attendance: 92 },
    { name: 'Marketing', employees: 28, attendance: 88 },
    { name: 'Sales', employees: 35, attendance: 95 },
    { name: 'HR', employees: 12, attendance: 90 },
    { name: 'Finance', employees: 18, attendance: 94 },
  ];

  const attendanceData = [
    { month: 'Jan', present: 220, absent: 28, late: 15 },
    { month: 'Feb', present: 235, absent: 13, late: 12 },
    { month: 'Mar', present: 242, absent: 6, late: 8 },
    { month: 'Apr', present: 238, absent: 10, late: 10 },
    { month: 'May', present: 245, absent: 3, late: 5 },
    { month: 'Jun', present: 240, absent: 8, late: 7 },
  ];

  const leaveTypeData = [
    { name: 'Annual Leave', value: 45, color: '#3B82F6' },
    { name: 'Sick Leave', value: 28, color: '#EF4444' },
    { name: 'Personal Leave', value: 18, color: '#F59E0B' },
    { name: 'Emergency Leave', value: 9, color: '#10B981' },
  ];

  const performanceData = [
    { month: 'Jan', productivity: 85, satisfaction: 78 },
    { month: 'Feb', productivity: 88, satisfaction: 82 },
    { month: 'Mar', productivity: 92, satisfaction: 85 },
    { month: 'Apr', productivity: 89, satisfaction: 83 },
    { month: 'May', productivity: 94, satisfaction: 88 },
    { month: 'Jun', productivity: 91, satisfaction: 86 },
  ];

  const kpiCards = [
    {
      title: 'Employee Retention',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Attendance',
      value: '92.8%',
      change: '+1.5%',
      trend: 'up',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Productivity Score',
      value: '89.5%',
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg. Response Time',
      value: '2.4h',
      change: '-0.3h',
      trend: 'down',
      icon: Clock,
      color: 'bg-orange-500'
    },
  ];

  const exportData = () => {
    const data = {
      departments: departmentData,
      attendance: attendanceData,
      leaveTypes: leaveTypeData,
      performance: performanceData,
      exportDate: new Date().toISOString(),
      timeRange: timeRange
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hr-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Analytics data exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR Analytics</h1>
          <p className="mt-1 text-sm text-gray-600">
            Insights and metrics for data-driven decisions
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={exportData}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${kpi.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
                    <p className={`ml-2 text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Department Overview</h3>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="#3B82F6" name="Employees" />
              <Bar dataKey="attendance" fill="#10B981" name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {leaveTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trends */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} name="Present" />
              <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} name="Absent" />
              <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} name="Late" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="productivity" stroke="#8B5CF6" strokeWidth={2} name="Productivity %" />
              <Line type="monotone" dataKey="satisfaction" stroke="#06B6D4" strokeWidth={2} name="Satisfaction %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Department Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productivity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentData.map((dept) => (
                <tr key={dept.name} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {dept.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.employees}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {dept.attendance}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 20) + 80}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 15) + 80}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      dept.attendance >= 90 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {dept.attendance >= 90 ? 'Excellent' : 'Good'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Attendance Improvement</h4>
            <p className="text-sm text-blue-700">
              Overall attendance has improved by 3.2% this quarter, with Sales department leading at 95%.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Productivity Growth</h4>
            <p className="text-sm text-green-700">
              Employee productivity increased by 8% compared to last quarter, driven by new workflow tools.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Leave Patterns</h4>
            <p className="text-sm text-yellow-700">
              Annual leave requests peak in summer months. Consider workforce planning adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;