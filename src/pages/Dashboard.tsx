import React from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Target,
  Building2,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
    color: 'bg-info/10 text-info',
  },
  {
    title: 'Present Today',
    value: '231',
    change: '93.1%',
    changeType: 'positive',
    icon: UserCheck,
    color: 'bg-success/10 text-success',
  },
  {
    title: 'On Leave',
    value: '14',
    change: '5.6%',
    changeType: 'neutral',
    icon: Calendar,
    color: 'bg-warning/10 text-warning',
  },
  {
    title: 'Pending Requests',
    value: '23',
    change: '-5',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-accent/10 text-accent',
  },
];

const attendanceData = [
  { month: 'Jul', present: 95, absent: 5 },
  { month: 'Aug', present: 92, absent: 8 },
  { month: 'Sep', present: 94, absent: 6 },
  { month: 'Oct', present: 91, absent: 9 },
  { month: 'Nov', present: 96, absent: 4 },
  { month: 'Dec', present: 93, absent: 7 },
];

const departmentData = [
  { name: 'Engineering', value: 85, color: 'hsl(173, 80%, 40%)' },
  { name: 'Sales', value: 62, color: 'hsl(199, 89%, 48%)' },
  { name: 'Operations', value: 48, color: 'hsl(160, 84%, 39%)' },
  { name: 'HR', value: 28, color: 'hsl(38, 92%, 50%)' },
  { name: 'Finance', value: 25, color: 'hsl(222, 47%, 15%)' },
];

const recentActivities = [
  {
    id: 1,
    type: 'leave',
    title: 'Leave Request Approved',
    description: 'Rajesh Kumar - 3 days CL approved by HR',
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
    description: 'December 2025 payroll completed for 248 employees',
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
  {
    id: 5,
    type: 'performance',
    title: 'Appraisal Submitted',
    description: 'Q4 2025 appraisals submitted by 85% employees',
    time: '3 days ago',
    status: 'info',
  },
];

const upcomingEvents = [
  { id: 1, title: 'Safety Training', date: 'Jan 15, 2026', type: 'Training' },
  { id: 2, title: 'Quarterly Review', date: 'Jan 20, 2026', type: 'Meeting' },
  { id: 3, title: 'Republic Day', date: 'Jan 26, 2026', type: 'Holiday' },
  { id: 4, title: 'Annual Awards', date: 'Feb 05, 2026', type: 'Event' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your organization today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : stat.changeType === 'negative' ? (
                      <ArrowDownRight className="h-4 w-4 text-destructive" />
                    ) : null}
                    <span
                      className={`text-sm ${
                        stat.changeType === 'positive'
                          ? 'text-success'
                          : stat.changeType === 'negative'
                          ? 'text-destructive'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance percentage over last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(215, 16%, 47%)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(0, 0%, 100%)',
                      border: '1px solid hsl(220, 13%, 91%)',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="present"
                    stroke="hsl(173, 80%, 40%)"
                    strokeWidth={2}
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
            <CardTitle className="text-lg font-semibold">Department Wise</CardTitle>
            <CardDescription>Employee distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
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
            <div className="mt-4 space-y-2">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="text-muted-foreground">{dept.name}</span>
                  </div>
                  <span className="font-medium">{dept.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Events Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
                <CardDescription>Latest updates across the organization</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-accent">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success'
                        ? 'bg-success'
                        : activity.status === 'warning'
                        ? 'bg-warning'
                        : 'bg-info'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground truncate">
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
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Upcoming Events</CardTitle>
                <CardDescription>Holidays, trainings, and meetings</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-accent">
                View Calendar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex flex-col items-center justify-center">
                      <span className="text-xs text-accent font-medium">
                        {event.date.split(' ')[0]}
                      </span>
                      <span className="text-sm font-bold text-accent">
                        {event.date.split(' ')[1].replace(',', '')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      event.type === 'Holiday'
                        ? 'bg-success/10 text-success border-success/20'
                        : event.type === 'Training'
                        ? 'bg-info/10 text-info border-info/20'
                        : 'bg-accent/10 text-accent border-accent/20'
                    }
                  >
                    {event.type}
                  </Badge>
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
            {[
              { icon: Users, label: 'Add Employee', color: 'bg-info/10 text-info' },
              { icon: Clock, label: 'Mark Attendance', color: 'bg-success/10 text-success' },
              { icon: Calendar, label: 'Apply Leave', color: 'bg-warning/10 text-warning' },
              { icon: Wallet, label: 'View Payslip', color: 'bg-accent/10 text-accent' },
              { icon: Target, label: 'Set Goals', color: 'bg-primary/10 text-primary' },
              { icon: Building2, label: 'Directory', color: 'bg-destructive/10 text-destructive' },
            ].map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-all hover:shadow-md group"
              >
                <div
                  className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}
                >
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
