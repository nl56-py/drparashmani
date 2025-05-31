
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  MessageSquare, 
  LogOut, 
  ChevronLeft, 
  Menu,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ViewerLayoutProps {
  children: React.ReactNode;
}

const ViewerLayout: React.FC<ViewerLayoutProps> = ({ children }) => {
  const { logout, user } = useAdminAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { path: '/viewer/contacts', label: 'Contacts', icon: <MessageSquare size={18} /> },
    { path: '/viewer/viewed', label: 'Viewed', icon: <Eye size={18} /> },
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
        <Link to="/viewer/contacts" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-doctor-blue-dark">Viewer Panel</span>
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
            <div className="text-xs text-gray-500">Viewer</div>
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

export default ViewerLayout;
