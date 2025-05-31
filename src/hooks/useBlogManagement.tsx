import { useState, useRef, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { BlogFormData } from '@/components/admin/blog/BlogForm';

export const useBlogManagement = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    title_en: '',
    title_np: '',
    content_en: '',
    content_np: '',
    excerpt_en: '',
    excerpt_np: '',
    slug: '',
    author: 'Dr. Parash Mani Shrestha',
    image_url: '',
    published: true,
    seo_title_en: '',
    seo_title_np: '',
    seo_desc_en: '',
    seo_desc_np: '',
    seo_keywords_en: '',
    seo_keywords_np: '',
  });
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  // Track content editing status for rich formatting handling
  const [isEditingContent, setIsEditingContent] = useState({
    content_en: false,
    content_np: false
  });

  const fetchBlogs = async () => {
    console.log('Fetching blogs...');
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching blogs:', error);
        throw error;
      }
      console.log('Fetched blogs:', data);
      return data as BlogFormData[];
    } catch (error) {
      console.error('Error in fetchBlogs:', error);
      toast({
        title: "Failed to load blog posts",
        description: "Please try again or contact support",
        variant: "destructive"
      });
      throw error;
    }
  };

  const { data: blogs, isLoading: isBlogsLoading, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditorChange = (fieldName: string, content: string) => {
    setFormData({
      ...formData,
      [fieldName]: content
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>, fieldName: string) => {
    // Handle pasted content to preserve formatting
    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData('text/html') || clipboardData.getData('text');
    
    if (pastedData) {
      // Update blog content with pasted data, preserving formatting
      const currentContent = formData[fieldName as keyof typeof formData] as string || '';
      
      // Get cursor position
      const target = e.currentTarget;
      const startPos = target.selectionStart;
      const endPos = target.selectionEnd;
      
      // Insert paste at cursor position
      const newContent = 
        currentContent.substring(0, startPos) + 
        pastedData + 
        currentContent.substring(endPos);
      
      setFormData({
        ...formData,
        [fieldName]: newContent
      });
      
      // Prevent default paste behavior
      e.preventDefault();
      
      // Set focus back to textarea and move cursor to end of pasted content
      setTimeout(() => {
        target.focus();
        const newPosition = startPos + pastedData.length;
        target.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      published: checked
    });
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Update the blog post with the image URL (use it both for image_url and og_image_url)
      setFormData({
        ...formData,
        image_url: publicUrlData.publicUrl,
        og_image_url: publicUrlData.publicUrl // Also set as OG image
      });

      toast({
        title: "Image uploaded successfully"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Failed to upload image",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const insertImageToEditor = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !contentRef.current) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `blog-content-images/${fileName}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(filePath, file);
        
      if (error) {
        throw error;
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);
        
      const imageUrl = publicUrlData.publicUrl;
      
      // Get the active textarea - find which tab is active
      const activeTabId = document.querySelector('[role="tabpanel"]:not([hidden]) textarea')?.id;
      const fieldName = activeTabId || '';
      
      // Get the current content and cursor position
      const textarea = document.getElementById(fieldName) as HTMLTextAreaElement;
      if (!textarea) return;
      
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      
      // Create the image HTML tag
      const imgTag = `<img src="${imageUrl}" alt="Blog image" class="my-4 rounded-lg w-full max-w-2xl mx-auto" />`;
      
      // Insert the image tag at the cursor position
      const currentContent = textarea.value;
      const newContent = 
        currentContent.substring(0, startPos) + 
        imgTag + 
        currentContent.substring(endPos);
        
      // Update the textarea value and cursor position
      textarea.value = newContent;
      textarea.selectionStart = startPos + imgTag.length;
      textarea.selectionEnd = startPos + imgTag.length;
      
      // Update the blog post state
      handleInputChange({
        target: {
          name: fieldName,
          value: newContent
        }
      } as ChangeEvent<HTMLTextAreaElement>);
      
      toast({
        title: "Image inserted successfully"
      });
    } catch (error) {
      console.error('Error uploading inline image:', error);
      toast({
        title: "Failed to upload image",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Clear the file input
      e.target.value = '';
    }
  };

  const handleCreate = () => {
    setFormData({
      title_en: '',
      title_np: '',
      content_en: '',
      content_np: '',
      excerpt_en: '',
      excerpt_np: '',
      slug: '',
      author: 'Dr. Parash Mani Shrestha',
      image_url: '',
      published: true,
      seo_title_en: '',
      seo_title_np: '',
      seo_desc_en: '',
      seo_desc_np: '',
      seo_keywords_en: '',
      seo_keywords_np: ''
    });
    setMode('create');
    setIsFormDialogOpen(true);
  };

  const handleImagePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setIsImagePreviewOpen(true);
  };

  const handleEdit = (blog: BlogFormData) => {
    setFormData(blog);
    setMode('edit');
    setIsFormDialogOpen(true);
  };

  const handleView = (blog: BlogFormData) => {
    setFormData(blog);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setBlogToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', blogToDelete);
      
      if (error) {
        console.error('Error in delete:', error);
        throw error;
      }
      
      toast({
        title: "Blog post deleted successfully"
      });
      setIsConfirmDeleteOpen(false);
      setBlogToDelete(null);
      refetch();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    // Validate form
    const requiredFields = [
      'title_en', 'title_np', 'content_en', 'content_np', 
      'excerpt_en', 'excerpt_np', 'slug'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: `${field.replace('_', ' ')} is required`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare blog data
      let blogData = { 
        ...formData,
        // Set default SEO fields if not provided
        seo_title_en: formData.seo_title_en || formData.title_en || '',
        seo_title_np: formData.seo_title_np || formData.title_np || '',
        seo_desc_en: formData.seo_desc_en || formData.excerpt_en || '',
        seo_desc_np: formData.seo_desc_np || formData.excerpt_np || '',
        // Ensure image URLs are properly set
        image_url: formData.image_url || null,
        og_image_url: formData.og_image_url || formData.image_url || null
      };

      if (mode === 'create') {
        // For create, use the table's default values for created_at and updated_at
        delete (blogData as any).created_at;
        delete (blogData as any).id;
      }
      
      console.log('Saving blog data:', blogData);
      
      let response;
      
      if (mode === 'create') {
        response = await supabase.from('blog_posts').insert(blogData);
      } else {
        response = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', formData.id);
      }
      
      const { error } = response;
      
      if (error) {
        console.error('Error in save:', error);
        throw error;
      }
      
      toast({
        title: `Blog post ${mode === 'create' ? 'created' : 'updated'} successfully`
      });
      setIsFormDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: `Failed to ${mode === 'create' ? 'create' : 'update'} blog post`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    blogs,
    isBlogsLoading,
    formData,
    isFormDialogOpen,
    setIsFormDialogOpen,
    isConfirmDeleteOpen, 
    setIsConfirmDeleteOpen,
    isViewDialogOpen,
    setIsViewDialogOpen,
    isImagePreviewOpen,
    setIsImagePreviewOpen,
    previewImage,
    mode,
    blogToDelete,
    isSubmitting,
    isUploading,
    fileInputRef,
    contentRef,
    isEditingContent,
    setIsEditingContent,
    handleInputChange,
    handleEditorChange,
    handlePaste,
    handleSwitchChange,
    handleFileUpload,
    handleCreate,
    handleImagePreview,
    handleEdit,
    handleView,
    handleDeleteClick,
    handleDelete,
    handleSave,
    insertImageToEditor,
  };
};
