
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MessageSquare,
  FileText,
  Video,
  Users,
  Loader2,
  Presentation
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface DashboardStats {
  contacts: number;
  blogs: number;
  videos: number;
  admins: number;
  lectures: number;
}

const Dashboard = () => {
  const fetchStats = async (): Promise<DashboardStats> => {
    try {
      const [contactsResult, blogsResult, videosResult, adminsResult, lecturesResult] = await Promise.all([
        supabase.from('contacts').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select(`
          id
        `, { count: 'exact', head: true }),
        supabase.from('videos').select(`
          id
        `, { count: 'exact', head: true }),
        supabase.from('roles').select(`
          id
        `, { count: 'exact', head: true }).eq('role', 'admin'),
        supabase.from('lectures_abroad').select(`
          id
        `, { count: 'exact', head: true })
      ]);
      
      return {
        contacts: contactsResult.count || 0,
        blogs: blogsResult.count || 0,
        videos: videosResult.count || 0,
        admins: adminsResult.count || 0,
        lectures: lecturesResult.count || 0
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard statistics');
      return { contacts: 0, blogs: 0, videos: 0, admins: 0, lectures: 0 };
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchStats
  });

  const statItems = [
    { 
      title: 'Contact Submissions',
      value: data?.contacts || 0,
      icon: <MessageSquare className="h-6 w-6 text-doctor-blue" />,
      link: '/admin/contacts'
    },
    { 
      title: 'Blog Posts', 
      value: data?.blogs || 0,
      icon: <FileText className="h-6 w-6 text-green-600" />,
      link: '/admin/blogs'
    },
    { 
      title: 'Videos', 
      value: data?.videos || 0,
      icon: <Video className="h-6 w-6 text-indigo-500" />,
      link: '/admin/videos'
    },
    { 
      title: 'Lectures Abroad', 
      value: data?.lectures || 0,
      icon: <Presentation className="h-6 w-6 text-purple-500" />,
      link: '/admin/lectures-abroad'
    },
    { 
      title: 'Admin Users', 
      value: data?.admins || 0,
      icon: <Users className="h-6 w-6 text-amber-500" />,
      link: '/admin/users'
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-gray-500 mt-1">Welcome to the admin panel dashboard.</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-doctor-blue" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {statItems.map((item, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {item.title}
                  </CardTitle>
                  {item.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
