
import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

const UsersPage = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { isSuperAdmin } = useAdminAuth();

  const fetchUsers = async () => {
    console.log('Fetching users');
    
    try {
      // Get all users with roles directly from the roles table
      const { data: roleData, error: roleError } = await supabase
        .from('roles')
        .select('user_id, role, created_at, id');
      
      if (roleError) {
        console.error('Error fetching roles:', roleError);
        throw roleError;
      }
      
      if (!roleData || roleData.length === 0) {
        console.log('No roles found');
        return [];
      }
      
      // Get email addresses for each user by querying the users_with_emails view
      const { data: authData, error: authError } = await supabase
        .from('users_with_emails' as any)
        .select('*');
      
      if (authError) {
        console.error('Error fetching user emails:', authError);
        // Return empty array to show no users message instead of throwing
        return [];
      }
      
      // Create a map of user IDs to emails for quick lookup
      const emailMap = new Map();
      if (authData) {
        authData.forEach((user: any) => {
          emailMap.set(user.id, user.email);
        });
      }
      
      // Now combine the role data with the email data
      const users: User[] = roleData.map(role => ({
        id: role.user_id,
        email: emailMap.get(role.user_id) || 'Unknown email',
        role: role.role,
        created_at: role.created_at
      }));
      
      console.log('Users fetched successfully:', users);
      return users;
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast.error('Failed to fetch users');
      return [];
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const handleCreate = () => {
    setNewUserEmail('');
    setNewUserPassword('');
    setIsFormDialogOpen(true);
  };

  const handleDeleteClick = (id: string, userRole: string) => {
    // Prevent deletion of admin users
    if (userRole === 'admin') {
      toast.error('Cannot delete admin users');
      return;
    }
    setUserToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    
    try {
      console.log('Deleting user:', userToDelete);
      
      // Call edge function to delete the user
      const { data: deletedData, error: deleteError } = await supabase
        .functions.invoke('delete-user', {
          body: { userId: userToDelete }
        });
      
      if (deleteError) {
        console.error('Delete error:', deleteError);
        throw deleteError;
      }
      
      console.log('User deleted successfully:', deletedData);
      toast.success('User removed successfully');
      setIsConfirmDeleteOpen(false);
      setUserToDelete(null);
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleSave = async () => {
    // Validate form
    if (!newUserEmail) {
      toast.error('Email is required');
      return;
    }
    
    if (!newUserPassword || newUserPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Creating new viewer user:', newUserEmail);
      
      // Use edge function to create the user - only viewer role allowed
      const { data: userData, error: createError } = await supabase
        .functions.invoke('create-user', {
          body: { 
            email: newUserEmail,
            password: newUserPassword,
            role: 'viewer'  // Force viewer role only
          }
        });
      
      if (createError) {
        console.error('Error creating user:', createError);
        throw createError;
      }
      
      if (!userData || !userData.user || !userData.user.id) {
        throw new Error('User creation failed');
      }
      
      toast.success('Viewer user created successfully');
      setIsFormDialogOpen(false);
      setNewUserEmail('');
      setNewUserPassword('');
      refetch();
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get appropriate role label
  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'admin':
        return 'Admin';
      case 'viewer':
        return 'Viewer';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Users</h2>
            <p className="text-gray-500 mt-1">Manage system users and their access permissions.</p>
          </div>
          {isSuperAdmin && (
            <Button onClick={handleCreate} className="bg-doctor-blue">
              <Plus className="h-4 w-4 mr-2" />
              Add Viewer User
            </Button>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-doctor-blue" />
          </div>
        ) : data && data.length > 0 ? (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 
                          user.role === 'viewer' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </TableCell>
                    <TableCell>{format(new Date(user.created_at), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      {/* Show delete button for viewer users, and info for admin users */}
                      {user.role === 'viewer' ? (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteClick(user.id, user.role)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-500">Protected</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md bg-gray-50">
            <p className="text-gray-500">No users found.</p>
            {isSuperAdmin && (
              <Button onClick={handleCreate} className="mt-4 bg-doctor-blue">
                Add Your First Viewer User
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Create User Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Viewer User</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input 
                id="email"
                value={newUserEmail} 
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="user@example.com"
                type="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input 
                id="password"
                value={newUserPassword} 
                onChange={(e) => setNewUserPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters.</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm text-blue-800">
                This will create a viewer user with read-only access to contacts.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSubmitting}
              className="bg-doctor-blue"
            >
              {isSubmitting ? 'Creating...' : 'Create Viewer User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to remove this user? This action cannot be undone and the user will no longer be able to login.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              Remove User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default UsersPage;
