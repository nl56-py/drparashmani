
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

interface AdminAuthContextProps {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isViewer: boolean;
  isSuperAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextProps | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isViewer, setIsViewer] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to avoid potential recursion issues
          setTimeout(() => {
            checkUserRoles(session.user.id).then(({ isAdmin, isViewer, isSuperAdmin }) => {
              console.log('Role check:', { isAdmin, isViewer, isSuperAdmin });
              setIsAdmin(isAdmin);
              setIsViewer(isViewer);
              setIsSuperAdmin(isSuperAdmin);
              setIsLoading(false);
            });
          }, 0);
        } else {
          setIsAdmin(false);
          setIsViewer(false);
          setIsSuperAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkUserRoles(session.user.id).then(({ isAdmin, isViewer, isSuperAdmin }) => {
          console.log('Initial role check:', { isAdmin, isViewer, isSuperAdmin });
          setIsAdmin(isAdmin);
          setIsViewer(isViewer);
          setIsSuperAdmin(isSuperAdmin);
          setIsLoading(false);
        });
      } else {
        setIsAdmin(false);
        setIsViewer(false);
        setIsSuperAdmin(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: string = 'admin') => {
    try {
      console.log(`Attempting ${role} login for:`, email);
      setIsLoading(true);
      
      // First authenticate the user
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      if (data.user) {
        console.log('User authenticated:', data.user.email);
        
        // Check roles to enforce strict access control
        const { isAdmin, isViewer, isSuperAdmin } = await checkUserRoles(data.user.id);
        console.log('Role after login:', { isAdmin, isViewer, isSuperAdmin });
        
        // Strict role validation based on login route
        if (role === 'admin' && !isAdmin) {
          console.log('User is not admin, signing out');
          await supabase.auth.signOut();
          setIsLoading(false);
          toast.error('Not authorized as admin');
          return;
        }

        if (role === 'viewer' && !isViewer) {
          console.log('User is not viewer, signing out');
          await supabase.auth.signOut();
          setIsLoading(false);
          toast.error('Not authorized as viewer');
          return;
        }
        
        // Set state only after verifying the correct role
        setIsAdmin(isAdmin);
        setIsViewer(isViewer);
        setIsSuperAdmin(isSuperAdmin);
        setIsLoading(false);
        toast.success('Login successful');
        
        // Redirect to the appropriate dashboard based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'viewer') {
          navigate('/viewer/contacts');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      
      // Navigate based on the current role
      if (isAdmin) {
        navigate('/admin/login');
      } else if (isViewer) {
        navigate('/viewer/login');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  // Check user roles
  const checkUserRoles = async (userId: string): Promise<{ 
    isAdmin: boolean; 
    isViewer: boolean; 
    isSuperAdmin: boolean; 
  }> => {
    if (!userId) return { isAdmin: false, isViewer: false, isSuperAdmin: false };
    
    try {
      console.log('Checking roles for user ID:', userId);
      
      // Check admin role using the updated is_admin function
      const { data: isAdminData, error: adminError } = await supabase.rpc('is_admin', {
        user_id: userId
      });
      
      // Log the raw response for debugging
      console.log('Raw isAdminData:', isAdminData);
      
      if (adminError) {
        console.error('Admin role check error:', adminError);
        return { isAdmin: false, isViewer: false, isSuperAdmin: false };
      }

      // Check viewer role using the updated is_viewer function
      const { data: isViewerData, error: viewerError } = await supabase.rpc('is_viewer', {
        user_id: userId
      });
      
      // Log the raw response for debugging
      console.log('Raw isViewerData:', isViewerData);
      
      if (viewerError) {
        console.error('Viewer role check error:', viewerError);
        return { isAdmin: isAdminData === true, isViewer: false, isSuperAdmin: false };
      }

      // Check super admin role using the updated is_super_admin function
      const { data: isSuperAdminData, error: superAdminError } = await supabase.rpc('is_super_admin', {
        user_id: userId
      });
      
      // Log the raw response for debugging
      console.log('Raw isSuperAdminData:', isSuperAdminData);
      
      if (superAdminError) {
        console.error('Super admin role check error:', superAdminError);
        return { isAdmin: isAdminData === true, isViewer: isViewerData === true, isSuperAdmin: false };
      }
      
      // Use strict equality comparison to ensure boolean values
      return { 
        isAdmin: isAdminData === true, 
        isViewer: isViewerData === true,
        isSuperAdmin: isSuperAdminData === true
      };
    } catch (error) {
      console.error('Role check error:', error);
      return { isAdmin: false, isViewer: false, isSuperAdmin: false };
    }
  };

  return (
    <AdminAuthContext.Provider value={{ 
      session, 
      user, 
      isAdmin, 
      isViewer,
      isSuperAdmin,
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
