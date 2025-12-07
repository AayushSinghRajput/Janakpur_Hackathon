// src/data/analyticsData.js
export const analyticsData = {
  overview: {
    totalReports: 1587,
    reportsThisMonth: 127,
    reportsThisWeek: 42,
    avgResponseTime: "3.2 hours",
    resolutionRate: "78%",
    activeCases: 89,
    closedCases: 1234,
    ngoPartnerships: 23
  },
  
  reportsTrend: {
    daily: [
      { date: "Dec 1", count: 12 },
      { date: "Dec 2", count: 15 },
      { date: "Dec 3", count: 18 },
      { date: "Dec 4", count: 22 },
      { date: "Dec 5", count: 19 },
      { date: "Dec 6", count: 16 },
      { date: "Dec 7", count: 14 }
    ],
    monthly: [
      { month: "Jan", count: 112 },
      { month: "Feb", count: 124 },
      { month: "Mar", count: 135 },
      { month: "Apr", count: 148 },
      { month: "May", count: 156 },
      { month: "Jun", count: 142 },
      { month: "Jul", count: 165 },
      { month: "Aug", count: 178 },
      { month: "Sep", count: 192 },
      { month: "Oct", count: 201 },
      { month: "Nov", count: 189 },
      { month: "Dec", count: 127 }
    ]
  },
  
  incidentTypes: [
    { type: "Domestic Violence", count: 523, percentage: 33 },
    { type: "Sexual Harassment", count: 421, percentage: 26.5 },
    { type: "Workplace Harassment", count: 287, percentage: 18 },
    { type: "Online Harassment", count: 198, percentage: 12.5 },
    { type: "Child Abuse", count: 89, percentage: 5.6 },
    { type: "Other", count: 69, percentage: 4.4 }
  ],
  
  urgencyLevels: [
    { level: "Emergency", count: 567, color: "#EF4444" },
    { level: "High Priority", count: 432, color: "#F97316" },
    { level: "Medium", count: 321, color: "#EAB308" },
    { level: "Low", count: 267, color: "#3B82F6" }
  ],
  
  statusDistribution: [
    { status: "Pending", count: 89, color: "#F59E0B" },
    { status: "Under Review", count: 156, color: "#3B82F6" },
    { status: "Action Taken", count: 423, color: "#8B5CF6" },
    { status: "Resolved", count: 811, color: "#10B981" },
    { status: "Archived", count: 108, color: "#6B7280" }
  ],
  
  geographicalData: [
    { location: "Kathmandu", count: 456 },
    { location: "Pokhara", count: 287 },
    { location: "Lalitpur", count: 234 },
    { location: "Biratnagar", count: 198 },
    { location: "Dharan", count: 156 },
    { location: "Butwal", count: 132 },
    { location: "Bharatpur", count: 124 }
  ],
  
  timeAnalysis: {
    peakHours: [
      { hour: "6-9 AM", count: 45 },
      { hour: "9-12 PM", count: 78 },
      { hour: "12-3 PM", count: 112 },
      { hour: "3-6 PM", count: 156 },
      { hour: "6-9 PM", count: 189 },
      { hour: "9-12 AM", count: 134 },
      { hour: "12-3 AM", count: 67 },
      { hour: "3-6 AM", count: 23 }
    ],
    dayOfWeek: [
      { day: "Monday", count: 198 },
      { day: "Tuesday", count: 203 },
      { day: "Wednesday", count: 187 },
      { day: "Thursday", count: 176 },
      { day: "Friday", count: 234 },
      { day: "Saturday", count: 256 },
      { day: "Sunday", count: 189 }
    ]
  },
  
  evidenceStatistics: {
    totalFiles: 2345,
    byType: [
      { type: "Images", count: 1567, percentage: 66.8 },
      { type: "Documents", count: 456, percentage: 19.4 },
      { type: "Videos", count: 289, percentage: 12.3 },
      { type: "Audio", count: 33, percentage: 1.4 }
    ],
    avgFilesPerReport: 1.5
  },
  
  responseMetrics: {
    avgFirstResponse: "1.8 hours",
    avgResolutionTime: "5.3 days",
    escalationRate: "12%",
    ngoInvolvementRate: "65%",
    followUpRate: "89%"
  },
  
  demographicData: {
    gender: [
      { gender: "Female", count: 1342, percentage: 84.6 },
      { gender: "Male", count: 156, percentage: 9.8 },
      { gender: "Other", count: 89, percentage: 5.6 }
    ],
    ageGroups: [
      { group: "18-24", count: 456, percentage: 28.7 },
      { group: "25-34", count: 567, percentage: 35.7 },
      { group: "35-44", count: 321, percentage: 20.2 },
      { group: "45+", count: 243, percentage: 15.4 }
    ]
  },
  
  ngoPerformance: [
    { name: "Women's Rights Nepal", cases: 234, resolutionRate: "85%" },
    { name: "Child Protection Org", cases: 189, resolutionRate: "92%" },
    { name: "Legal Aid Society", cases: 156, resolutionRate: "78%" },
    { name: "Mental Health Support", cases: 134, resolutionRate: "89%" },
    { name: "Community Safety", cases: 98, resolutionRate: "81%" }
  ],
  
  recentActivity: [
    { 
      id: 1, 
      action: "Report Resolved", 
      description: "Case #DV-2345 marked as resolved", 
      time: "2 hours ago",
      icon: "✓" 
    },
    { 
      id: 2, 
      action: "New Evidence Added", 
      description: "3 files added to case #SH-6789", 
      time: "4 hours ago",
      icon: "📎" 
    },
    { 
      id: 3, 
      action: "Emergency Case", 
      description: "Emergency report received from Kathmandu", 
      time: "6 hours ago",
      icon: "⚠️" 
    },
    { 
      id: 4, 
      action: "NGO Assigned", 
      description: "Women's Rights Nepal assigned to case #WH-4567", 
      time: "1 day ago",
      icon: "👥" 
    },
    { 
      id: 5, 
      action: "Weekly Report", 
      description: "Weekly analytics report generated", 
      time: "1 day ago",
      icon: "📊" 
    }
  ]
};