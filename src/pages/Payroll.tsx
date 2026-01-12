import React, { useState } from 'react';
import {
  Wallet,
  Download,
  Calendar,
  TrendingUp,
  IndianRupee,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calculator,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Mock payroll data
const payrollData = [
  {
    id: '1',
    employeeId: 'SSSPL001',
    employeeName: 'Rajesh Kumar Singh',
    department: 'Engineering',
    designation: 'Senior Engineer',
    month: 'December',
    year: '2025',
    payDays: 26,
    ctc: 1200000,
    grossSalary: 100000,
    basicSalary: 50000,
    hra: 25000,
    specialAllowance: 15000,
    conveyance: 5000,
    medicalAllowance: 5000,
    pfEmployee: 6000,
    pfEmployer: 6000,
    esicEmployee: 750,
    esicEmployer: 3250,
    professionalTax: 200,
    tds: 5000,
    totalDeductions: 11950,
    netPay: 88050,
    status: 'paid',
    bankAccount: 'HDFC XXXXX1234',
  },
  {
    id: '2',
    employeeId: 'SSSPL002',
    employeeName: 'Priya Sharma',
    department: 'Sales',
    designation: 'Sales Manager',
    month: 'December',
    year: '2025',
    payDays: 26,
    ctc: 900000,
    grossSalary: 75000,
    basicSalary: 37500,
    hra: 18750,
    specialAllowance: 11250,
    conveyance: 4000,
    medicalAllowance: 3500,
    pfEmployee: 4500,
    pfEmployer: 4500,
    esicEmployee: 563,
    esicEmployer: 2438,
    professionalTax: 200,
    tds: 3000,
    totalDeductions: 8263,
    netPay: 66737,
    status: 'paid',
    bankAccount: 'ICICI XXXXX5678',
  },
  {
    id: '3',
    employeeId: 'SSSPL003',
    employeeName: 'Amit Patel',
    department: 'Sales',
    designation: 'Regional Head',
    month: 'December',
    year: '2025',
    payDays: 26,
    ctc: 1800000,
    grossSalary: 150000,
    basicSalary: 75000,
    hra: 37500,
    specialAllowance: 22500,
    conveyance: 8000,
    medicalAllowance: 7000,
    pfEmployee: 9000,
    pfEmployer: 9000,
    esicEmployee: 0,
    esicEmployer: 0,
    professionalTax: 200,
    tds: 15000,
    totalDeductions: 24200,
    netPay: 125800,
    status: 'paid',
    bankAccount: 'SBI XXXXX9012',
  },
  {
    id: '4',
    employeeId: 'SSSPL004',
    employeeName: 'Sneha Reddy',
    department: 'HR',
    designation: 'HR Executive',
    month: 'December',
    year: '2025',
    payDays: 20,
    ctc: 600000,
    grossSalary: 50000,
    basicSalary: 25000,
    hra: 12500,
    specialAllowance: 7500,
    conveyance: 2500,
    medicalAllowance: 2500,
    pfEmployee: 3000,
    pfEmployer: 3000,
    esicEmployee: 375,
    esicEmployer: 1625,
    professionalTax: 200,
    tds: 0,
    totalDeductions: 3575,
    netPay: 35117,
    status: 'processed',
    bankAccount: 'AXIS XXXXX3456',
  },
  {
    id: '5',
    employeeId: 'SSSPL005',
    employeeName: 'Vikram Joshi',
    department: 'Operations',
    designation: 'Service Engineer',
    month: 'December',
    year: '2025',
    payDays: 26,
    ctc: 480000,
    grossSalary: 40000,
    basicSalary: 20000,
    hra: 10000,
    specialAllowance: 6000,
    conveyance: 2000,
    medicalAllowance: 2000,
    pfEmployee: 2400,
    pfEmployer: 2400,
    esicEmployee: 300,
    esicEmployer: 1300,
    professionalTax: 200,
    tds: 0,
    totalDeductions: 2900,
    netPay: 37100,
    status: 'draft',
    bankAccount: 'KOTAK XXXXX7890',
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const Payroll: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayslip, setSelectedPayslip] = useState<typeof payrollData[0] | null>(null);
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="badge-success">Paid</Badge>;
      case 'processed':
        return <Badge className="badge-info">Processed</Badge>;
      case 'draft':
        return <Badge className="badge-warning">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredData = payrollData.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPayroll = payrollData.reduce((sum, p) => sum + p.netPay, 0);
  const totalDeductions = payrollData.reduce((sum, p) => sum + p.totalDeductions, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payroll</h1>
          <p className="text-muted-foreground">Manage salary and compensation</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
                (month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['2024', '2025', '2026'].map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-accent hover:bg-accent/90"
            onClick={() => toast({ title: 'Processing...', description: 'Payroll processing initiated.' })}
          >
            <Calculator className="h-4 w-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalPayroll)}</p>
                <p className="text-sm text-muted-foreground">for {selectedMonth}</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <Wallet className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Deductions</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalDeductions)}</p>
                <p className="text-sm text-muted-foreground">PF, ESI, Tax, etc.</p>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Employees Paid</p>
                <p className="text-2xl font-bold mt-1">3 / 5</p>
                <p className="text-sm text-muted-foreground">60% complete</p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <IndianRupee className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Salary</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalPayroll / 5)}</p>
                <p className="text-sm text-muted-foreground">per employee</p>
              </div>
              <div className="p-3 rounded-xl bg-info/10">
                <Building2 className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Input
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All Payslips
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Register - {selectedMonth} {selectedYear}</CardTitle>
          <CardDescription>Salary details for all employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Gross</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.employeeName}</p>
                        <p className="text-sm text-muted-foreground">{record.employeeId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.department}</p>
                        <p className="text-sm text-muted-foreground">{record.designation}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(record.grossSalary)}
                    </TableCell>
                    <TableCell className="text-right text-destructive">
                      -{formatCurrency(record.totalDeductions)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-success">
                      {formatCurrency(record.netPay)}
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPayslip(record)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {payrollData.length} records
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

      {/* Payslip Dialog */}
      <Dialog open={!!selectedPayslip} onOpenChange={() => setSelectedPayslip(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPayslip && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Payslip - {selectedPayslip.month} {selectedPayslip.year}
                </DialogTitle>
                <DialogDescription>
                  {selectedPayslip.employeeName} ({selectedPayslip.employeeId})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Company & Employee Info */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Company</p>
                    <p className="font-semibold">Srinivasa Sales and Service Pvt Ltd</p>
                    <p className="text-sm text-muted-foreground">Somajiguda, Hyderabad</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase">Pay Period</p>
                    <p className="font-semibold">{selectedPayslip.month} {selectedPayslip.year}</p>
                    <p className="text-sm text-muted-foreground">
                      Pay Days: {selectedPayslip.payDays}
                    </p>
                  </div>
                </div>

                {/* Employee Details */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Employee Name</p>
                    <p className="font-medium">{selectedPayslip.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Designation</p>
                    <p className="font-medium">{selectedPayslip.designation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Department</p>
                    <p className="font-medium">{selectedPayslip.department}</p>
                  </div>
                </div>

                {/* Earnings & Deductions */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Earnings */}
                  <div>
                    <h4 className="font-semibold text-success mb-3">Earnings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Basic Salary</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.basicSalary)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>HRA</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.hra)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Special Allowance</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.specialAllowance)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Conveyance</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.conveyance)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Medical Allowance</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.medicalAllowance)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Gross Salary</span>
                        <span className="text-success">{formatCurrency(selectedPayslip.grossSalary)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div>
                    <h4 className="font-semibold text-destructive mb-3">Deductions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>PF (Employee)</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.pfEmployee)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ESIC (Employee)</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.esicEmployee)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Professional Tax</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.professionalTax)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>TDS</span>
                        <span className="font-medium">{formatCurrency(selectedPayslip.tds)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Deductions</span>
                        <span className="text-destructive">{formatCurrency(selectedPayslip.totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Pay */}
                <div className="p-4 bg-accent/10 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Pay</p>
                    <p className="text-3xl font-bold text-accent">
                      {formatCurrency(selectedPayslip.netPay)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Credited to</p>
                    <p className="font-medium">{selectedPayslip.bankAccount}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button className="bg-accent hover:bg-accent/90">
                    Send to Employee
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payroll;
