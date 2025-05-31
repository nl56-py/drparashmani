
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2 } from 'lucide-react';

interface ViewerProtectedRouteProps {
  children: React.ReactNode;
}

const ViewerProtectedRoute: React.FC<ViewerProtectedRouteProps> = ({ children }) => {
  const { isViewer, isLoading, user } = useAdminAuth();
  const location = useLocation();

  // If still loading, show loading indicator
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-doctor-blue" />
      </div>
    );
  }

  // Use strict comparison to ensure isViewer is truly boolean
  // If no user or not a viewer, redirect to viewer login
  if (!user || isViewer !== true) {
    console.log("Access denied: User is not a viewer, redirecting to login");
    return <Navigate to="/viewer/login" state={{ from: location }} replace />;
  }

  console.log("Access granted: User is a viewer");
  return <>{children}</>;
};

export default ViewerProtectedRoute;
