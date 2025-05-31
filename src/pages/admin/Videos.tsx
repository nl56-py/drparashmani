import React, { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Loader2, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Video {
  id: string;
  embed_url: string;
  title_en: string;
  title_np: string;
  description_en: string | null;
  description_np: string | null;
  category_en: string | null;
  category_np: string | null;
  date_en: string | null;
  date_np: string | null;
  featured: boolean;
  created_at: string;
  slug: string | null;
  // SEO fields
  seo_title_en: string | null;
  seo_title_np: string | null;
  seo_desc_en: string | null;
  seo_desc_np: string | null;
  seo_keywords_en: string | null;
  seo_keywords_np: string | null;
  og_image_url: string | null;
}

const VideosPage = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Partial<Video>>({
    title_en: '',
    title_np: '',
    embed_url: '',
    description_en: '',
    description_np: '',
    category_en: '',
    category_np: '',
    date_en: '',
    date_np: '',
    featured: false,
    slug: '',
    seo_title_en: null,
    seo_title_np: null,
    seo_desc_en: null,
    seo_desc_np: null,
    seo_keywords_en: null,
    seo_keywords_np: null,
    og_image_url: null
  });
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchVideos = async () => {
    console.log('Fetching videos...');
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching videos:', error);
        throw error;
      }
      console.log('Fetched videos:', data);
      return data as Video[];
    } catch (error) {
      console.error('Error in fetchVideos:', error);
      toast({
        title: "Failed to load videos",
        description: "Please try again or contact support",
        variant: "destructive"
      });
      throw error;
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug when title_en changes
    if (name === 'title_en' && mode === 'create') {
      setCurrentVideo({
        ...currentVideo,
        [name]: value,
        slug: generateSlug(value)
      });
    } else {
      setCurrentVideo({
        ...currentVideo,
        [name]: value
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentVideo({
      ...currentVideo,
      featured: checked
    });
  };

  const handleCreate = () => {
    setCurrentVideo({
      title_en: '',
      title_np: '',
      embed_url: '',
      description_en: '',
      description_np: '',
      category_en: '',
      category_np: '',
      date_en: '',
      date_np: '',
      featured: false,
      slug: '',
      seo_title_en: null,
      seo_title_np: null,
      seo_desc_en: null,
      seo_desc_np: null,
      seo_keywords_en: null,
      seo_keywords_np: null,
      og_image_url: null
    });
    setMode('create');
    setIsFormDialogOpen(true);
  };

  const handleEdit = (video: Video) => {
    setCurrentVideo(video);
    setMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleView = (video: Video) => {
    setCurrentVideo(video);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setVideoToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;
    
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', videoToDelete);
      
      if (error) {
        console.error('Error in delete:', error);
        throw error;
      }
      
      toast({
        title: "Video deleted successfully"
      });
      setIsConfirmDeleteOpen(false);
      setVideoToDelete(null);
      refetch();
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: "Failed to delete video",
        variant: "destructive"
      });
    }
  };

  // Function to convert YouTube URLs to proper embed format
  const getEmbedUrl = (url: string) => {
    // Handle YouTube watch URLs
    if (url.includes('youtube.com/watch')) {
      const videoIdMatch = url.match(/[?&]v=([^&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle YouTube shortened URLs
    else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle YouTube embed URLs (already in correct format)
    else if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    // If not a recognized YouTube URL format, return as is
    return url;
  };

  const handleSave = async () => {
    // Validate form
    const requiredFields = ['title_en', 'title_np', 'embed_url', 'slug'];
    
    for (const field of requiredFields) {
      if (!currentVideo[field as keyof typeof currentVideo]) {
        toast({
          title: `${field.replace('_', ' ')} is required`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // Ensure required fields are not undefined
      let videoData = { 
        ...currentVideo,
        // Convert YouTube URL to embed format before saving
        embed_url: getEmbedUrl(currentVideo.embed_url || ''),
        title_en: currentVideo.title_en || '',
        title_np: currentVideo.title_np || '',
        slug: currentVideo.slug || '',
      };
      
      if (mode === 'create') {
        // For create, use the table's default values for created_at
        delete videoData.created_at;
        delete videoData.id;
      }
      
      console.log('Saving video data:', videoData);
      
      let response;
      
      if (mode === 'create') {
        response = await supabase.from('videos').insert(videoData);
      } else {
        response = await supabase
          .from('videos')
          .update(videoData)
          .eq('id', currentVideo.id);
      }
      
      const { error } = response;
      
      if (error) {
        console.error('Error in save:', error);
        throw error;
      }
      
      toast({
        title: `Video ${mode === 'create' ? 'created' : 'updated'} successfully`
      });
      setIsFormDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Error saving video:', error);
      toast({
        title: `Failed to ${mode === 'create' ? 'create' : 'update'} video`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Videos</h2>
            <p className="text-gray-500 mt-1">Manage your video gallery.</p>
          </div>
          <Button onClick={handleCreate} className="bg-doctor-blue">
            <Plus className="h-4 w-4 mr-2" />
            Add New Video
          </Button>
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
                  <TableHead>Title (EN)</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">{video.title_en}</TableCell>
                    <TableCell className="text-sm text-blue-600">/{video.slug || 'no-slug'}</TableCell>
                    <TableCell>{video.category_en || 'N/A'}</TableCell>
                    <TableCell>
                      {video.featured ? (
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Regular
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(video.created_at), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleView(video)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEdit(video)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteClick(video.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md bg-gray-50">
            <p className="text-gray-500">No videos found.</p>
            <Button onClick={handleCreate} className="mt-4 bg-doctor-blue">
              Add Your First Video
            </Button>
          </div>
        )}
      </div>

      {/* Video Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === 'create' ? 'Add New Video' : 'Edit Video'}</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            <Label htmlFor="embed_url">Video URL (YouTube)</Label>
            <Input 
              id="embed_url"
              name="embed_url"
              value={currentVideo.embed_url || ''} 
              onChange={handleInputChange}
              placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID)
            </p>
          </div>

          <div className="mt-4">
            <Label htmlFor="slug">URL Slug</Label>
            <Input 
              id="slug"
              name="slug"
              value={currentVideo.slug || ''} 
              onChange={handleInputChange}
              placeholder="kidney-transplant-procedure"
            />
            <p className="text-xs text-gray-500 mt-1">
              SEO-friendly URL: /videos/{currentVideo.slug || 'your-slug'}
            </p>
          </div>
          
          <Tabs defaultValue="english" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="english">English Content</TabsTrigger>
              <TabsTrigger value="nepali">Nepali Content</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            {/* English Tab */}
            <TabsContent value="english" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title_en">Title (English)</Label>
                <Input 
                  id="title_en"
                  name="title_en"
                  value={currentVideo.title_en || ''} 
                  onChange={handleInputChange}
                  placeholder="Enter video title in English"
                />
              </div>
              <div>
                <Label htmlFor="description_en">Description (English)</Label>
                <Textarea 
                  id="description_en"
                  name="description_en"
                  value={currentVideo.description_en || ''} 
                  onChange={handleInputChange}
                  placeholder="Enter video description in English"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="category_en">Category (English)</Label>
                <Input 
                  id="category_en"
                  name="category_en"
                  value={currentVideo.category_en || ''} 
                  onChange={handleInputChange}
                  placeholder="Enter category in English"
                />
              </div>
              <div>
                <Label htmlFor="date_en">Date (English)</Label>
                <Input 
                  id="date_en"
                  name="date_en"
                  value={currentVideo.date_en || ''} 
                  onChange={handleInputChange}
                  placeholder="March 15, 2023"
                />
              </div>
            </TabsContent>
            
            {/* Nepali Tab */}
            <TabsContent value="nepali" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title_np">Title (Nepali)</Label>
                <Input 
                  id="title_np"
                  name="title_np"
                  value={currentVideo.title_np || ''} 
                  onChange={handleInputChange}
                  placeholder="Enter video title in Nepali"
                  className="font-nepali"
                />
              </div>
              <div>
                <Label htmlFor="description_np">Description (Nepali)</Label>
                <Textarea 
                  id="description_np"
                  name="description_np"
                  value={currentVideo.description_np || ''} 
                  onChange={handleInputChange}
                  placeholder="Enter video description in Nepali"
                  className="font-nepali"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="category_np">Category (Nepali)</Label>
                <Input 
                  id="category_np"
                  name="category_np"
                  value={currentVideo.category_np || ''} 
                  onChange={handleInputChange}
                  placeholder="Enter category in Nepali"
                  className="font-nepali"
                />
              </div>
              <div>
                <Label htmlFor="date_np">Date (Nepali)</Label>
                <Input 
                  id="date_np"
                  name="date_np"
                  value={currentVideo.date_np || ''} 
                  onChange={handleInputChange}
                  placeholder="चैत्र १, २०७९"
                  className="font-nepali"
                />
              </div>
            </TabsContent>
            
            {/* SEO Tab */}
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">English SEO</h3>
                  
                  <div>
                    <Label htmlFor="seo_title_en">SEO Title (English)</Label>
                    <Input 
                      id="seo_title_en"
                      name="seo_title_en"
                      value={currentVideo.seo_title_en || ''} 
                      onChange={handleInputChange}
                      placeholder="SEO optimized title in English"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      If empty, regular title will be used
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="seo_desc_en">SEO Description (English)</Label>
                    <Textarea 
                      id="seo_desc_en"
                      name="seo_desc_en"
                      value={currentVideo.seo_desc_en || ''} 
                      onChange={handleInputChange}
                      placeholder="SEO optimized description in English"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      If empty, regular description will be used
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="seo_keywords_en">SEO Keywords (English)</Label>
                    <Textarea 
                      id="seo_keywords_en"
                      name="seo_keywords_en"
                      value={currentVideo.seo_keywords_en || ''} 
                      onChange={handleInputChange}
                      placeholder="urology videos, kidney health, prostate, Nepal"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Comma-separated keywords with local intent
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg font-nepali">Nepali SEO</h3>
                  
                  <div>
                    <Label htmlFor="seo_title_np">SEO Title (Nepali)</Label>
                    <Input 
                      id="seo_title_np"
                      name="seo_title_np"
                      value={currentVideo.seo_title_np || ''} 
                      onChange={handleInputChange}
                      placeholder="SEO optimized title in Nepali"
                      className="font-nepali"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="seo_desc_np">SEO Description (Nepali)</Label>
                    <Textarea 
                      id="seo_desc_np"
                      name="seo_desc_np"
                      value={currentVideo.seo_desc_np || ''} 
                      onChange={handleInputChange}
                      placeholder="SEO optimized description in Nepali"
                      rows={3}
                      className="font-nepali"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="seo_keywords_np">SEO Keywords (Nepali)</Label>
                    <Textarea 
                      id="seo_keywords_np"
                      name="seo_keywords_np"
                      value={currentVideo.seo_keywords_np || ''} 
                      onChange={handleInputChange}
                      placeholder="मूत्र रोग भिडियोहरू, मिर्गौला स्वास्थ्य, प्रोस्टेट, नेपाल"
                      rows={2}
                      className="font-nepali"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="og_image_url">OpenGraph Image URL</Label>
                <Input 
                  id="og_image_url"
                  name="og_image_url"
                  value={currentVideo.og_image_url || ''} 
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Custom image for social sharing. If empty, YouTube thumbnail will be used.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex items-center space-x-2 mt-4">
            <Switch 
              id="featured"
              checked={currentVideo.featured || false}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="featured">Featured Video</Label>
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
              {isSubmitting ? 'Saving...' : 'Save Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Video Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Video Details</DialogTitle>
          </DialogHeader>
          
          {currentVideo.embed_url && (
            <div className="aspect-video w-full mt-4">
              <iframe 
                src={getEmbedUrl(currentVideo.embed_url)}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentVideo.title_en}
              />
            </div>
          )}
          
          <Tabs defaultValue="english" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English Content</TabsTrigger>
              <TabsTrigger value="nepali">Nepali Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="english" className="space-y-4 mt-4">
              <div>
                <h3 className="font-bold text-xl">{currentVideo.title_en}</h3>
                {currentVideo.category_en && (
                  <span className="text-sm text-gray-500">{currentVideo.category_en}</span>
                )}
                {currentVideo.date_en && (
                  <p className="text-sm text-gray-500 mt-1">{currentVideo.date_en}</p>
                )}
              </div>
              
              {currentVideo.description_en && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="whitespace-pre-wrap">{currentVideo.description_en}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="nepali" className="space-y-4 mt-4">
              <div>
                <h3 className="font-bold text-xl font-nepali">{currentVideo.title_np}</h3>
                {currentVideo.category_np && (
                  <span className="text-sm text-gray-500 font-nepali">{currentVideo.category_np}</span>
                )}
                {currentVideo.date_np && (
                  <p className="text-sm text-gray-500 mt-1 font-nepali">{currentVideo.date_np}</p>
                )}
              </div>
              
              {currentVideo.description_np && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="whitespace-pre-wrap font-nepali">{currentVideo.description_np}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            {currentVideo.featured ? (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Featured
              </span>
            ) : (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                Regular
              </span>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this video? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default VideosPage;
