
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
}

const ViewerContactsPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const fetchContacts = async () => {
    try {
      console.log('Fetching contacts for viewer...');
      // Force refresh auth context to ensure we have current permissions
      await supabase.auth.refreshSession();
      const { data, error } = await supabase
        .from('contacts')
        .select('id, name, email, phone, message, created_at')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contacts:', error);
        throw error;
      }

      console.log('Fetched contacts:', data);
      return data as Contact[];
    } catch (error) {
      console.error('Error in fetchContacts:', error);
      toast.error("Failed to load contacts. Please try again.");
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['viewer-contacts'],
    queryFn: fetchContacts,
  });

  const markAsViewed = useMutation({
    mutationFn: async (contactId: string) => {
      try {
        const currentUser = (await supabase.auth.getUser()).data.user;
        if (!currentUser) throw new Error("User not authenticated");

        // First check if already viewed
        const { data: existingView } = await supabase
          .from('contact_views')
          .select('id')
          .eq('contact_id', contactId)
          .eq('viewer_id', currentUser.id)
          .maybeSingle();

        // If not already viewed, mark as viewed
        if (!existingView) {
          const { error } = await supabase
            .from('contact_views')
            .insert({
              contact_id: contactId,
              viewer_id: currentUser.id
            });
          
          if (error) {
            console.error('Error inserting contact view:', error);
            throw error;
          }
        }

        return contactId;
      } catch (error) {
        console.error('Error in markAsViewed:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['viewer-contacts'] });
      queryClient.invalidateQueries({ queryKey: ['viewed-contacts'] });
    },
    onError: (error) => {
      console.error('Error marking contact as viewed:', error);
      toast.error("Failed to mark contact as viewed");
    }
  });

  const handleView = async (contact: Contact) => {
    try {
      // Mark as viewed first
      await markAsViewed.mutateAsync(contact.id);
      // Then show dialog
      setSelectedContact(contact);
      setIsViewDialogOpen(true);
    } catch (error) {
      console.error('Error in handleView:', error);
    }
  };

  return (
    <ViewerLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Contact Submissions</h2>
          <p className="text-gray-500 mt-1">View recent contact submissions.</p>
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
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone || 'N/A'}</TableCell>
                    <TableCell>{format(new Date(contact.created_at), 'MMM d, yyyy')}</TableCell>
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
            <p className="text-gray-500">No contact submissions found.</p>
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
                <h4 className="text-sm font-medium text-gray-500">Date</h4>
                <p>{format(new Date(selectedContact.created_at), 'MMM d, yyyy h:mm a')}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ViewerLayout>
  );
};

export default ViewerContactsPage;
