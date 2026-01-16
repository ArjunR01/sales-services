import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Login from "@/employee/Login";
import Dashboard from "@/employee/Dashboard";
import Employees from "@/employee/Employees";
import Attendance from "@/employee/Attendance";
import Leave from "@/employee/Leave";
import Payroll from "@/employee/Payroll";
import NotFound from "./employee/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/organization" element={<Dashboard />} />
              <Route path="/recruitment" element={<Dashboard />} />
              <Route path="/performance" element={<Dashboard />} />
              <Route path="/training" element={<Dashboard />} />
              <Route path="/assets" element={<Dashboard />} />
              <Route path="/travel" element={<Dashboard />} />
              <Route path="/disciplinary" element={<Dashboard />} />
              <Route path="/grievance" element={<Dashboard />} />
              <Route path="/separation" element={<Dashboard />} />
              <Route path="/compliance" element={<Dashboard />} />
              <Route path="/reports" element={<Dashboard />} />
              <Route path="/settings" element={<Dashboard />} />
              <Route path="/profile" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
