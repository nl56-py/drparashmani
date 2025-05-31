
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ViewerLayout from '@/components/viewer/ViewerLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Loader2, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { format } from 'date-fns';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
  viewed_at: string;
}

const ViewedContactsPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const fetchViewedContacts = async () => {
    try {
      const currentUser = (await supabase.auth.getUser()).data.user;
      if (!currentUser) throw new Error("User not authenticated");

      // Force refresh auth context to ensure we have current permissions
      await supabase.auth.refreshSession();
      
      console.log('Fetching viewed contacts...');
      const { data, error } = await supabase
        .from('contact_views')
        .select(`
          id,
          viewed_at,
          contact_id,
          contacts:contact_id (
            id, 
            name, 
            email, 
            phone, 
            message, 
            created_at
          )
        `)
        .eq('viewer_id', currentUser.id)
        .order('viewed_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching viewed contacts:', error);
        throw error;
      }

      console.log('Fetched viewed contacts:', data);
      
      // Transform the nested structure into a flatter one for easier use
      const contacts = data?.map(item => {
        const contact = item.contacts as any;
        return {
          ...contact,
          viewed_at: item.viewed_at
        };
      }) || [];
      
      return contacts as Contact[];
    } catch (error) {
      console.error('Error in fetchViewedContacts:', error);
      toast.error("Failed to load viewed contacts");
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['viewed-contacts'],
    queryFn: fetchViewedContacts,
  });

  const handleView = (contact: Contact) => {
    setSelectedContact(contact);
    setIsViewDialogOpen(true);
  };

  return (
    <ViewerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Viewed Contacts</h2>
          <p className="text-gray-500 mt-1">Contact submissions you have already viewed.</p>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Viewed On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone || 'N/A'}</TableCell>
                    <TableCell>{format(new Date(contact.viewed_at), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleView(contact)}
                      >
                        <Eye size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md bg-gray-50">
            <p className="text-gray-500">No viewed contact submissions found.</p>
          </div>
        )}
      </div>

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                <p>{selectedContact.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p>{selectedContact.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                <p>{selectedContact.phone || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Message</h4>
                <p className="whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Submitted On</h4>
                <p>{format(new Date(selectedContact.created_at), 'MMM d, yyyy h:mm a')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Viewed On</h4>
                <p>{format(new Date(selectedContact.viewed_at), 'MMM d, yyyy h:mm a')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ViewerLayout>
  );
};

export default ViewedContactsPage;
