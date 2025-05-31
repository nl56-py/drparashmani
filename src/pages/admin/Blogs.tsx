
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBlogManagement } from '@/hooks/useBlogManagement';
import BlogList from '@/components/admin/blog/BlogList';
import BlogForm from '@/components/admin/blog/BlogForm';
import BlogView from '@/components/admin/blog/BlogView';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const BlogsPage = () => {
  const authorImageUrl = "/lovable-uploads/051b28c5-e590-4744-8f66-d1f622b4884d.png";
  
  const {
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
  } = useBlogManagement();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Blog Posts</h2>
            <p className="text-gray-500 mt-1">Manage your blog content.</p>
          </div>
          <Button onClick={handleCreate} className="bg-doctor-blue">
            <Plus className="h-4 w-4 mr-2" />
            Add New Post
          </Button>
        </div>
        
        {isBlogsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-doctor-blue" />
          </div>
        ) : blogs && blogs.length > 0 ? (
          <BlogList
            blogs={blogs}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDeleteClick={handleDeleteClick}
            handleImagePreview={handleImagePreview}
          />
        ) : (
          <div className="text-center py-12 border rounded-md bg-gray-50">
            <p className="text-gray-500">No blog posts found.</p>
            <Button onClick={handleCreate} className="mt-4 bg-doctor-blue">
              Add Your First Post
            </Button>
          </div>
        )}
      </div>

      {/* Blog Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}</DialogTitle>
          </DialogHeader>
          
          <BlogForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleEditorChange={handleEditorChange}
            handlePaste={handlePaste}
            handleSwitchChange={handleSwitchChange}
            handleFileUpload={handleFileUpload}
            handleSave={handleSave}
            isSubmitting={isSubmitting}
            isUploading={isUploading}
            fileInputRef={fileInputRef}
            contentRef={contentRef}
            isEditingContent={isEditingContent}
            setIsEditingContent={setIsEditingContent}
            insertImageToEditor={insertImageToEditor}
            setIsFormDialogOpen={setIsFormDialogOpen}
          />
        </DialogContent>
      </Dialog>
      
      {/* View Blog Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Blog Post Details</DialogTitle>
          </DialogHeader>
          
          <BlogView
            blog={formData}
            handleImagePreview={handleImagePreview}
            authorImageUrl={authorImageUrl}
          />
        </DialogContent>
      </Dialog>
      
      {/* Image Preview Dialog */}
      <Dialog open={isImagePreviewOpen} onOpenChange={setIsImagePreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <div className="overflow-auto">
              <img 
                src={previewImage} 
                alt="Full size preview" 
                className="w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this blog post? This action cannot be undone.</p>
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

export default BlogsPage;
