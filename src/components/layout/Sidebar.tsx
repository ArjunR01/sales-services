import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  Wallet,
  UserPlus,
  GraduationCap,
  Laptop,
  Plane,
  Target,
  AlertTriangle,
  MessageSquare,
  LogOut,
  FileText,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  Shield,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Organization', href: '/organization', icon: Building2, roles: ['admin', 'hr'] },
  { title: 'Employees', href: '/employees', icon: Users },
  { title: 'Attendance', href: '/attendance', icon: Clock },
  { title: 'Leave', href: '/leave', icon: Calendar },
  { title: 'Payroll', href: '/payroll', icon: Wallet, roles: ['admin', 'hr', 'accounts'] },
  { title: 'Recruitment', href: '/recruitment', icon: UserPlus, roles: ['admin', 'hr'] },
  { title: 'Performance', href: '/performance', icon: Target },
  { title: 'Training', href: '/training', icon: GraduationCap },
  { title: 'Assets', href: '/assets', icon: Laptop },
  { title: 'Travel & Expense', href: '/travel', icon: Plane },
  { title: 'Disciplinary', href: '/disciplinary', icon: AlertTriangle, roles: ['admin', 'hr'] },
  { title: 'Grievance', href: '/grievance', icon: MessageSquare },
  { title: 'Separation', href: '/separation', icon: LogOut, roles: ['admin', 'hr'] },
  { title: 'Compliance', href: '/compliance', icon: Shield, roles: ['admin', 'hr', 'accounts'] },
  { title: 'Reports', href: '/reports', icon: FileText, roles: ['admin', 'hr', 'manager', 'accounts'] },
  { title: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return user?.role && item.roles.includes(user.role);
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen bg-sidebar transition-all duration-300 flex flex-col',
          isCollapsed ? 'w-16' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-sm">SS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sidebar-foreground font-semibold text-sm">SSSMS</span>
                <span className="text-sidebar-muted text-[10px]">HR Portal</span>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center mx-auto">
              <span className="text-sidebar-primary-foreground font-bold text-sm">SS</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    )
                  }
                >
                  <item.icon className={cn('h-5 w-5 flex-shrink-0', isCollapsed && 'mx-auto')} />
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        {!isCollapsed && user && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sidebar-accent-foreground font-medium text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sidebar-foreground text-sm font-medium truncate">{user.name}</p>
                <p className="text-sidebar-muted text-xs capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
