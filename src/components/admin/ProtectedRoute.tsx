
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'content' | 'contacts' | 'super';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAdmin, isLoading, user, isSuperAdmin } = useAdminAuth();
  const location = useLocation();

  // If still loading, show loading indicator
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-doctor-blue" />
      </div>
    );
  }

  // Use strict comparison to ensure isAdmin is truly boolean
  // If no user or not an admin (even if they're a viewer), redirect to admin login
  if (!user || isAdmin !== true) {
    console.log("Access denied: User is not an admin, redirecting to login");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check specific role requirements
  if (requiredRole) {
    switch (requiredRole) {
      case 'super':
        if (!isSuperAdmin) {
          console.log("Access denied: User is not a super admin");
          return <Navigate to="/admin/dashboard" replace />;
        }
        break;
      case 'content':
      case 'contacts':
        // For now, allow all admins to access content and contacts
        // You can implement specific role checks here if needed
        break;
      default:
        break;
    }
  }

  console.log("Access granted: User is an admin");
  return <>{children}</>;
};

export default ProtectedRoute;
