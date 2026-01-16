import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  Timer,
  AlertCircle,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

// Mock attendance data
const attendanceData = [
  {
    id: '1',
    employeeId: 'SSSPL001',
    name: 'Rajesh Kumar Singh',
    date: '2026-01-12',
    inTime: '09:05',
    outTime: '18:30',
    totalHours: 9.42,
    shift: 'General',
    status: 'present',
    lateBy: 5,
    overtime: 30,
  },
  {
    id: '2',
    employeeId: 'SSSPL002',
    name: 'Priya Sharma',
    date: '2026-01-12',
    inTime: '09:00',
    outTime: '18:00',
    totalHours: 9,
    shift: 'General',
    status: 'present',
    lateBy: 0,
    overtime: 0,
  },
  {
    id: '3',
    employeeId: 'SSSPL003',
    name: 'Amit Patel',
    date: '2026-01-12',
    inTime: '09:45',
    outTime: '18:15',
    totalHours: 8.5,
    shift: 'General',
    status: 'late',
    lateBy: 45,
    overtime: 15,
  },
  {
    id: '4',
    employeeId: 'SSSPL004',
    name: 'Sneha Reddy',
    date: '2026-01-12',
    inTime: '-',
    outTime: '-',
    totalHours: 0,
    shift: 'General',
    status: 'absent',
    lateBy: 0,
    overtime: 0,
  },
  {
    id: '5',
    employeeId: 'SSSPL005',
    name: 'Vikram Joshi',
    date: '2026-01-12',
    inTime: '09:00',
    outTime: '13:00',
    totalHours: 4,
    shift: 'General',
    status: 'half-day',
    lateBy: 0,
    overtime: 0,
  },
  {
    id: '6',
    employeeId: 'SSSPL006',
    name: 'Ananya Gupta',
    date: '2026-01-12',
    inTime: '-',
    outTime: '-',
    totalHours: 0,
    shift: 'General',
    status: 'on-leave',
    lateBy: 0,
    overtime: 0,
  },
];

const statsCards = [
  {
    title: 'Present',
    value: '231',
    percentage: '93.1%',
    icon: CheckCircle2,
    color: 'bg-success/10 text-success',
  },
  {
    title: 'Absent',
    value: '8',
    percentage: '3.2%',
    icon: XCircle,
    color: 'bg-destructive/10 text-destructive',
  },
  {
    title: 'Late Arrivals',
    value: '12',
    percentage: '4.8%',
    icon: Timer,
    color: 'bg-warning/10 text-warning',
  },
  {
    title: 'On Leave',
    value: '9',
    percentage: '3.6%',
    icon: Calendar,
    color: 'bg-info/10 text-info',
  },
];

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePunchIn = () => {
    const now = new Date();
    toast({
      title: 'Punched In Successfully',
      description: `You have punched in at ${now.toLocaleTimeString('en-IN')}`,
    });
  };

  const handlePunchOut = () => {
    const now = new Date();
    toast({
      title: 'Punched Out Successfully',
      description: `You have punched out at ${now.toLocaleTimeString('en-IN')}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="badge-success">Present</Badge>;
      case 'absent':
        return <Badge className="badge-destructive">Absent</Badge>;
      case 'late':
        return <Badge className="badge-warning">Late</Badge>;
      case 'half-day':
        return <Badge className="badge-info">Half Day</Badge>;
      case 'on-leave':
        return <Badge variant="secondary">On Leave</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track and manage daily attendance</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={selectedDate}
            // onChange={(e) => setSelectedDate(e.target.value)}
            className="w-[160px]"
          />
          {/* <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button> */}
        </div>
      </div>

      {/* Punch In/Out Card - For Employees */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>
                <p className="text-3xl font-bold text-accent">
                  {new Date().toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">In Time</p>
                <p className="text-lg font-semibold text-success">09:05</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Out Time</p>
                <p className="text-lg font-semibold text-muted-foreground">--:--</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Working Hours</p>
                <p className="text-lg font-semibold">5h 30m</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePunchIn} className="bg-success hover:bg-success/90" disabled>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Punch In
              </Button>
              <Button onClick={handlePunchOut} className="bg-destructive hover:bg-destructive/90">
                <XCircle className="h-4 w-4 mr-2" />
                Punch Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.percentage}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance Register</CardTitle>
          <CardDescription>
            Attendance records for {new Date(selectedDate).toLocaleDateString('en-IN', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Employee</TableHead>
                  <TableHead>In Time</TableHead>
                  <TableHead>Out Time</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Late By</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.name}</p>
                        <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={record.inTime === '-' ? 'text-muted-foreground' : 'font-medium'}>
                        {record.inTime}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={record.outTime === '-' ? 'text-muted-foreground' : 'font-medium'}>
                        {record.outTime}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {record.totalHours > 0 ? `${record.totalHours.toFixed(1)}h` : '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {record.lateBy > 0 ? (
                        <span className="text-warning font-medium">{record.lateBy} min</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.overtime > 0 ? (
                        <span className="text-success font-medium">{record.overtime} min</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              Showing {filteredData.length} records
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
