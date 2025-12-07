// src/pages/AnalyticsPage.js
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  MapPin, 
  AlertTriangle,
  Shield,
  Download,
  ArrowLeft,
  CheckCircle,
  BarChart3 as BarChartIcon
} from 'lucide-react';
import { analyticsData } from '../data/analyticsData';
import Button from '../components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const AnalyticsPage = ({ onBack }) => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [activeView, setActiveView] = useState('overview');

  const StatCard = ({ title, value, icon: Icon, change, color = "primary" }) => (
    <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${
          color === 'primary' ? 'bg-purple-50' : 
          color === 'error' ? 'bg-red-50' : 
          color === 'success' ? 'bg-green-50' : 
          'bg-amber-50'
        }`}>
          <Icon className={`h-6 w-6 ${
            color === 'primary' ? 'text-primary-accent' : 
            color === 'error' ? 'text-error' : 
            color === 'success' ? 'text-success' : 
            'text-amber-600'
          }`} />
        </div>
        <span className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-error'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-primary-text">{value}</h3>
      <p className="text-secondary-text mt-2">{title}</p>
    </div>
  );

  const ProgressBar = ({ percentage, color = "primary", label }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-secondary-text mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-borders rounded-full overflow-hidden">
        <div 
          className={`h-full ${
            color === 'primary' ? 'bg-primary-accent' : 
            color === 'error' ? 'bg-error' : 
            color === 'success' ? 'bg-success' : 
            'bg-secondary-accent'
          } rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

  // Get the current trend data based on selected time range
  const getTrendData = () => {
    if (timeRange === 'daily') {
      return analyticsData.reportsTrend.daily.map(item => ({
        name: item.date,
        Reports: item.count,
        date: item.date
      }));
    } else if (timeRange === 'weekly') {
      // Create weekly data from daily data
      const dailyData = analyticsData.reportsTrend.daily;
      return [
        { name: 'Week 1', Reports: dailyData.slice(0, 2).reduce((sum, day) => sum + day.count, 0), week: 'Week 1' },
        { name: 'Week 2', Reports: dailyData.slice(2, 4).reduce((sum, day) => sum + day.count, 0), week: 'Week 2' },
        { name: 'Week 3', Reports: dailyData.slice(4, 7).reduce((sum, day) => sum + day.count, 0), week: 'Week 3' }
      ];
    } else {
      return analyticsData.reportsTrend.monthly.map(item => ({
        name: item.month,
        Reports: item.count,
        month: item.month
      }));
    }
  };

  const trendData = getTrendData();
  const peakHoursData = analyticsData.timeAnalysis.peakHours.map(item => ({
    name: item.hour,
    Reports: item.count,
    hour: item.hour,
    isPeak: ['3-6 PM', '6-9 PM'].includes(item.hour) // Mark peak hours
  }));

  // Custom Tooltip for bar charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary-text text-white p-3 rounded-lg shadow-lg">
          <p className="font-semibold">{`${payload[0].value} reports`}</p>
          <p className="text-borders text-sm">{label}</p>
        </div>
      );
    }
    return null;
  };

  // Colors for different data ranges
  const getBarColor = (value, maxValue) => {
    const percentage = (value / maxValue) * 100;
    if (percentage > 75) return '#7c3aed'; // Primary Accent
    if (percentage > 50) return '#8b5cf6'; // Lighter purple
    if (percentage > 25) return '#a78bfa'; // Even lighter purple
    return '#c4b5fd'; // Lightest purple
  };

  const getPeakHourColor = (isPeak) => {
    return isPeak ? '#f59e0b' : '#7c3aed'; // Amber for peak, Primary Accent for normal
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-borders rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-primary-accent" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-headings">Analytics Dashboard</h1>
                <p className="text-secondary-text mt-2">Comprehensive insights into incident reports and platform performance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex bg-background rounded-lg border border-borders p-1">
                <button
                  onClick={() => setTimeRange('daily')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${timeRange === 'daily' ? 'bg-primary-accent text-white' : 'text-secondary-text hover:text-primary-accent'}`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${timeRange === 'weekly' ? 'bg-primary-accent text-white' : 'text-secondary-text hover:text-primary-accent'}`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${timeRange === 'monthly' ? 'bg-primary-accent text-white' : 'text-secondary-text hover:text-primary-accent'}`}
                >
                  Monthly
                </button>
              </div>
              <Button icon={Download}>
                Export Report
              </Button>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 rounded-lg font-medium ${activeView === 'overview' ? 'bg-primary-accent text-white' : 'bg-background text-secondary-text hover:bg-borders'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('reports')}
              className={`px-4 py-2 rounded-lg font-medium ${activeView === 'reports' ? 'bg-primary-accent text-white' : 'bg-background text-secondary-text hover:bg-borders'}`}
            >
              Reports Analysis
            </button>
            <button
              onClick={() => setActiveView('evidence')}
              className={`px-4 py-2 rounded-lg font-medium ${activeView === 'evidence' ? 'bg-primary-accent text-white' : 'bg-background text-secondary-text hover:bg-borders'}`}
            >
              Evidence
            </button>
            <button
              onClick={() => setActiveView('performance')}
              className={`px-4 py-2 rounded-lg font-medium ${activeView === 'performance' ? 'bg-primary-accent text-white' : 'bg-background text-secondary-text hover:bg-borders'}`}
            >
              Performance
            </button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Reports" 
              value={analyticsData.overview.totalReports.toLocaleString()} 
              icon={FileText}
              change={12.5}
              color="primary"
            />
            <StatCard 
              title="Active Cases" 
              value={analyticsData.overview.activeCases} 
              icon={AlertTriangle}
              change={-3.2}
              color="amber"
            />
            <StatCard 
              title="Avg Response Time" 
              value={analyticsData.overview.avgResponseTime} 
              icon={Clock}
              change={-15}
              color="success"
            />
            <StatCard 
              title="Resolution Rate" 
              value={analyticsData.overview.resolutionRate} 
              icon={CheckCircle}
              change={5.8}
              color="primary"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reports Trend Chart - Professional Bar Diagram */}
            <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BarChartIcon className="h-6 w-6 text-primary-accent" />
                  <h2 className="text-xl font-bold text-headings">Reports Trend</h2>
                </div>
                <div className="flex items-center space-x-2 text-sm text-secondary-text">
                  <TrendingUp className="h-4 w-4" />
                  <span>+18% from last {timeRange === 'daily' ? 'day' : timeRange === 'weekly' ? 'week' : 'month'}</span>
                </div>
              </div>
              
              {/* Professional Bar Chart using Recharts */}
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e0eb" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      label={{ 
                        value: 'Number of Reports', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: '#4a3366' }
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      dataKey="Reports" 
                      name="Report Count"
                      radius={[4, 4, 0, 0]}
                    >
                      {trendData.map((entry, index) => {
                        const maxValue = Math.max(...trendData.map(item => item.Reports));
                        return <Cell key={`cell-${index}`} fill={getBarColor(entry.Reports, maxValue)} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Time Range Summary */}
              <div className="mt-8 pt-6 border-t border-borders">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-accent">
                      {Math.round(trendData.reduce((sum, item) => sum + item.Reports, 0) / trendData.length)}
                    </div>
                    <p className="text-sm text-secondary-text">Average per {timeRange.slice(0, -2)}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      {Math.max(...trendData.map(item => item.Reports))}
                    </div>
                    <p className="text-sm text-secondary-text">Peak Reports</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">
                      {Math.min(...trendData.map(item => item.Reports))}
                    </div>
                    <p className="text-sm text-secondary-text">Lowest Reports</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Incident Type Distribution */}
            <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
              <h2 className="text-xl font-bold text-headings mb-6">Incident Type Distribution</h2>
              <div className="space-y-4">
                {analyticsData.incidentTypes.map((item, index) => (
                  <ProgressBar 
                    key={index}
                    label={item.type}
                    percentage={item.percentage}
                    color={index === 0 ? "error" : index === 1 ? "primary" : index === 2 ? "amber" : "primary"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Status Distribution */}
            <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
              <h2 className="text-xl font-bold text-headings mb-6">Status Distribution</h2>
              <div className="space-y-4">
                {analyticsData.statusDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-borders rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-primary-text">{item.status}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-headings">{item.count}</span>
                      <span className="text-sm text-secondary-text">
                        ({Math.round((item.count / analyticsData.overview.totalReports) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographical Distribution */}
            <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary-accent" />
                  <h2 className="text-xl font-bold text-headings">Top Locations</h2>
                </div>
                <span className="text-sm text-primary-accent font-medium">
                  Total: {analyticsData.geographicalData.reduce((sum, item) => sum + item.count, 0)}
                </span>
              </div>
              <div className="space-y-4">
                {analyticsData.geographicalData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-accent">{index + 1}</span>
                      </div>
                      <span className="text-primary-text">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-2 bg-borders rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-400 to-primary-accent rounded-full"
                          style={{ width: `${(item.count / 500) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-semibold text-headings w-12 text-right">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Row - Both Bar Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Peak Reporting Hours - Professional Bar Chart */}
          <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary-accent" />
                <h2 className="text-xl font-bold text-headings">Peak Reporting Hours</h2>
              </div>
              <div className="text-sm text-secondary-text">
                Most active: {analyticsData.timeAnalysis.peakHours.reduce((max, item) => 
                  item.count > max.count ? item : max
                ).hour}
              </div>
            </div>
            
            {/* Peak Hours Bar Chart */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={peakHoursData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e0eb" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    label={{ 
                      value: 'Number of Reports', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: '#4a3366' }
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="Reports" 
                    name="Report Count"
                    radius={[4, 4, 0, 0]}
                  >
                    {peakHoursData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getPeakHourColor(entry.isPeak)} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#7c3aed' }}></div>
                <span className="text-secondary-text">Normal Hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                <span className="text-secondary-text">Peak Hours (3PM - 9PM)</span>
              </div>
            </div>
          </div>

          {/* Evidence Statistics */}
          <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary-accent" />
                <h2 className="text-xl font-bold text-headings">Evidence Statistics</h2>
              </div>
              <span className="text-sm text-primary-accent font-medium">
                Avg: {analyticsData.evidenceStatistics.avgFilesPerReport} per report
              </span>
            </div>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary-accent">{analyticsData.evidenceStatistics.totalFiles.toLocaleString()}</div>
              <p className="text-secondary-text mt-2">Total Evidence Files</p>
            </div>
            
            {/* Evidence Type Distribution - Bar Style */}
            <div className="space-y-4">
              {analyticsData.evidenceStatistics.byType.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm text-primary-text">
                    <span>{item.type}</span>
                    <span>{item.percentage}% ({item.count.toLocaleString()})</span>
                  </div>
                  <div className="h-3 bg-borders rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-gradient-to-r from-primary-accent to-purple-400' :
                        index === 1 ? 'bg-gradient-to-r from-secondary-accent to-purple-400' :
                        index === 2 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                        'bg-gradient-to-r from-success to-green-400'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row - Demographics and NGO Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Demographic Data */}
          <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
            <h2 className="text-xl font-bold text-headings mb-6">Demographic Overview</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-primary-text mb-4">Gender Distribution</h3>
                <div className="space-y-3">
                  {analyticsData.demographicData.gender.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-secondary-text">{item.gender}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-borders rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              index === 0 ? 'bg-gradient-to-r from-primary-accent to-purple-400' :
                              index === 1 ? 'bg-gradient-to-r from-success to-green-400' :
                              'bg-gradient-to-r from-secondary-accent to-purple-400'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-headings">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-primary-text mb-4">Age Groups</h3>
                <div className="space-y-3">
                  {analyticsData.demographicData.ageGroups.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-secondary-text">{item.group}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-2 bg-borders rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              index === 0 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                              index === 1 ? 'bg-gradient-to-r from-success to-green-400' :
                              index === 2 ? 'bg-gradient-to-r from-primary-accent to-purple-400' :
                              'bg-gradient-to-r from-secondary-accent to-purple-400'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-headings">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* NGO Performance */}
          <div className="bg-background rounded-2xl p-6 shadow-lg border border-borders">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary-accent" />
                <h2 className="text-xl font-bold text-headings">NGO Performance</h2>
              </div>
              <span className="text-sm text-primary-accent font-medium">
                Avg Resolution Rate: {
                  Math.round(
                    analyticsData.ngoPerformance.reduce((sum, ngo) => 
                      sum + parseFloat(ngo.resolutionRate), 0
                    ) / analyticsData.ngoPerformance.length
                  )
                }%
              </span>
            </div>
            <div className="space-y-4">
              {analyticsData.ngoPerformance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium text-headings">{item.name}</p>
                    <p className="text-sm text-secondary-text">{item.cases} cases handled</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      parseFloat(item.resolutionRate) >= 90 ? 'text-success' :
                      parseFloat(item.resolutionRate) >= 80 ? 'text-primary-accent' :
                      'text-amber-600'
                    }`}>
                      {item.resolutionRate}
                    </div>
                    <p className="text-sm text-secondary-text">Resolution Rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-background rounded-2xl p-6 shadow-lg border border-borders">
          <h2 className="text-xl font-bold text-headings mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-borders rounded-lg transition-colors">
                <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-primary-accent">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-headings">{activity.action}</p>
                  <p className="text-sm text-secondary-text">{activity.description}</p>
                </div>
                <span className="text-sm text-secondary-text">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-secondary-text text-sm">
          <p>Data updated: Today, 10:30 AM • Next update: 24 hours</p>
          <p className="mt-2">All data is anonymized and encrypted for security</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;