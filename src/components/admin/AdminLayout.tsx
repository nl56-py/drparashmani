import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Video, 
  LogOut, 
  ChevronLeft, 
  Menu,
  Users,
  Settings,
  Presentation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout, user, isSuperAdmin } = useAdminAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Run setup function on first super admin login
  useEffect(() => {
    const setupUserView = async () => {
      if (isSuperAdmin) {
        try {
          // Call the setup-users-view function
          const { error } = await supabase.functions.invoke('setup-users-view');
          
          if (error) {
            console.error('Error setting up users view:', error);
          } else {
            console.log('Users view setup completed');
          }
        } catch (err) {
          console.error('Failed to setup users view:', err);
        }
      }
    };
    
    if (isSuperAdmin) {
      setupUserView();
    }
  }, [isSuperAdmin]);
  
  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/admin/contacts', label: 'Contacts', icon: <MessageSquare size={18} /> },
    { path: '/admin/blogs', label: 'Blogs', icon: <FileText size={18} /> },
    { path: '/admin/videos', label: 'Videos', icon: <Video size={18} /> },
    { path: '/admin/lectures-abroad', label: 'Lectures Abroad', icon: <Presentation size={18} /> },
    { path: '/admin/users', label: 'Admin Users', icon: <Users size={18} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const NavLink = ({ path, label, icon }: { path: string; label: string; icon: React.ReactNode }) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
          isActive 
            ? 'bg-doctor-blue text-white' 
            : 'hover:bg-doctor-blue-light hover:text-doctor-blue-dark'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6 border-b">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-doctor-blue-dark">Dr. Parash Admin</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink key={item.path} path={item.path} label={item.label} icon={item.icon} />
        ))}
      </div>
      <div className="px-4 py-6 border-t mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">{user?.email}</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-[240px]">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-64">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b h-16 px-4">
          <div className="flex items-center">
            {/* IMPORTANT: The SheetTrigger must be inside the Sheet component */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(true)}>
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
            </Sheet>
            <Link to="/" className="md:hidden ml-2 flex items-center gap-2">
              <ChevronLeft size={16} />
              <span>Back to site</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="text-sm text-gray-600 hover:text-doctor-blue flex items-center gap-2">
              <ChevronLeft size={16} />
              <span>Back to site</span>
            </Link>
          </div>
        </div>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
