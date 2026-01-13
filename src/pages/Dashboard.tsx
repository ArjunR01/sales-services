import React from 'react';
import {
  Users,
  UserCheck,
  Clock,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  Building2,
  UserPlus,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - In production, this comes from PHP API
const statsData = [
  {
    title: 'Total Employees',
    value: '248',
    change: '+12',
    changeType: 'positive',
    icon: Users,
    percentage: 100,
  },
  {
    title: 'Present Today',
    value: '231',
    change: '93.1%',
    changeType: 'positive',
    icon: UserCheck,
    percentage: 93,
  },
  {
    title: 'On Leave',
    value: '14',
    change: '5.6%',
    changeType: 'neutral',
    icon: Calendar,
    percentage: 6,
  },
  {
    title: 'Absent Today',
    value: '3',
    change: '1.2%',
    changeType: 'negative',
    icon: AlertCircle,
    percentage: 1,
  },
];

const attendanceData = [
  { month: 'Jul', present: 95, absent: 5 },
  { month: 'Aug', present: 92, absent: 8 },
  { month: 'Sep', present: 94, absent: 6 },
  { month: 'Oct', present: 91, absent: 9 },
  { month: 'Nov', present: 96, absent: 4 },
  { month: 'Dec', present: 93, absent: 7 },
  { month: 'Jan', present: 93, absent: 7 },
];

const departmentData = [
  { name: 'Sales', value: 85, color: 'hsl(280, 65%, 35%)' },
  { name: 'Service', value: 62, color: 'hsl(320, 80%, 50%)' },
  { name: 'Admin', value: 48, color: 'hsl(280, 65%, 55%)' },
  { name: 'Finance', value: 28, color: 'hsl(320, 80%, 65%)' },
  { name: 'IT', value: 25, color: 'hsl(280, 50%, 70%)' },
];

const leaveBalances = [
  { type: 'Casual Leave', used: 4, total: 12, color: 'bg-primary' },
  { type: 'Sick Leave', used: 2, total: 6, color: 'bg-accent' },
  { type: 'Earned Leave', used: 5, total: 15, color: 'bg-success' },
];

const recentActivities = [
  {
    id: 1,
    type: 'leave',
    title: 'Leave Request Approved',
    description: 'Rajesh Kumar - 3 days CL approved',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'attendance',
    title: 'Late Arrival',
    description: 'Priya Sharma marked late by 45 minutes',
    time: '3 hours ago',
    status: 'warning',
  },
  {
    id: 3,
    type: 'payroll',
    title: 'Payroll Processed',
    description: 'December 2025 payroll completed',
    time: '1 day ago',
    status: 'info',
  },
  {
    id: 4,
    type: 'employee',
    title: 'New Employee Joined',
    description: 'Amit Patel joined as Senior Engineer',
    time: '2 days ago',
    status: 'success',
  },
];

const upcomingEvents = [
  { id: 1, title: 'Safety Training', date: 'Jan 15', type: 'Training' },
  { id: 2, title: 'Quarterly Review', date: 'Jan 20', type: 'Meeting' },
  { id: 3, title: 'Republic Day', date: 'Jan 26', type: 'Holiday' },
  { id: 4, title: 'Annual Awards', date: 'Feb 05', type: 'Event' },
];

const quickActions = [
  { icon: UserPlus, label: 'Add Employee', color: 'bg-primary/10 text-primary' },
  { icon: Clock, label: 'Punch In/Out', color: 'bg-accent/10 text-accent' },
  { icon: Calendar, label: 'Apply Leave', color: 'bg-success/10 text-success' },
  { icon: Wallet, label: 'View Payslip', color: 'bg-info/10 text-info' },
  { icon: Target, label: 'My Goals', color: 'bg-warning/10 text-warning' },
  { icon: FileText, label: 'Reports', color: 'bg-primary/10 text-primary' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient-primary">{user?.name?.split(' ')[0] || 'User'}</span>!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your organization today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString('en-IN', { year: 'numeric' })}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white">
            <Calendar className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="stat-card overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    {stat.changeType === 'positive' ? (
                      <div className="flex items-center gap-1 text-success">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    ) : stat.changeType === 'negative' ? (
                      <div className="flex items-center gap-1 text-destructive">
                        <ArrowDownRight className="h-4 w-4" />
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">{stat.change}</span>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="transparent"
                      className="text-muted/30"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={`${(stat.percentage / 100) * 176} 176`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(280, 65%, 35%)" />
                        <stop offset="100%" stopColor="hsl(320, 80%, 50%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Attendance Trends</CardTitle>
              <CardDescription>Monthly attendance overview</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              View Details <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(280, 65%, 35%)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(280, 65%, 35%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(270, 10%, 45%)', fontSize: 12 }} 
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(270, 10%, 45%)', fontSize: 12 }} 
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0, 0%, 100%)',
                      border: '1px solid hsl(270, 20%, 90%)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="hsl(280, 65%, 35%)"
                    strokeWidth={3}
                    fill="url(#presentGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Departments</CardTitle>
            <CardDescription>Employee distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-muted-foreground truncate">{dept.name}</span>
                  <span className="font-semibold ml-auto">{dept.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Balances */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">My Leave Balance</CardTitle>
            <CardDescription>Current year status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaveBalances.map((leave, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{leave.type}</span>
                  <span className="font-medium">{leave.total - leave.used} / {leave.total}</span>
                </div>
                <Progress 
                  value={((leave.total - leave.used) / leave.total) * 100} 
                  className="h-2"
                />
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              Apply Leave
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
              <CardDescription>Latest updates</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.status === 'success'
                        ? 'bg-success'
                        : activity.status === 'warning'
                        ? 'bg-warning'
                        : 'bg-info'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
              <CardDescription>Events & Holidays</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              Calendar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary-light flex flex-col items-center justify-center">
                    <span className="text-[10px] text-primary font-medium">
                      {event.date.split(' ')[0]}
                    </span>
                    <span className="text-base font-bold text-primary">
                      {event.date.split(' ')[1]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] mt-1 ${
                        event.type === 'Holiday'
                          ? 'bg-success/10 text-success'
                          : event.type === 'Training'
                          ? 'bg-info/10 text-info'
                          : event.type === 'Meeting'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-btn"
              >
                <div className={`quick-action-icon ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;