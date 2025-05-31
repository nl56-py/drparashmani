
import React from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogFormData } from './BlogForm';

interface BlogViewProps {
  blog: BlogFormData;
  handleImagePreview: (imageUrl: string) => void;
  authorImageUrl: string;
}

const BlogView: React.FC<BlogViewProps> = ({ blog, handleImagePreview, authorImageUrl }) => {
  return (
    <>
      <Tabs defaultValue="english" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="english">English Content</TabsTrigger>
          <TabsTrigger value="nepali">Nepali Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="english" className="space-y-6 mt-4">
          <div>
            <h3 className="font-bold text-xl mb-2">{blog.title_en}</h3>
            <p className="text-gray-700">{blog.excerpt_en}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Content</h4>
            <div className="mt-2 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content_en || '' }} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nepali" className="space-y-6 mt-4">
          <div>
            <h3 className="font-bold text-xl mb-2 font-nepali">{blog.title_np}</h3>
            <p className="text-gray-700 font-nepali">{blog.excerpt_np}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Content</h4>
            <div className="mt-2 prose max-w-none">
              <div 
                className="font-nepali"
                dangerouslySetInnerHTML={{ __html: blog.content_np || '' }} 
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Slug</h4>
          <p>{blog.slug}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Author</h4>
          <p>{blog.author || 'Not specified'}</p>
        </div>
      </div>
      
      {blog.image_url && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500">Featured Image</h4>
          <div className="mt-2 overflow-hidden rounded-md border">
            <img 
              src={blog.image_url} 
              alt={blog.title_en} 
              className="object-contain w-full"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => handleImagePreview(blog.image_url!)}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            View Full Image
          </Button>
        </div>
      )}
      
      <div className="flex items-center mt-6">
        <Avatar className="w-10 h-10 mr-2">
          <AvatarImage 
            src={authorImageUrl}
            alt={blog.author || ''}
            className="object-cover"
          />
          <AvatarFallback>{blog.author?.charAt(0) || 'D'}</AvatarFallback>
        </Avatar>
        <div className="flex justify-between flex-1 items-center">
          <div>
            <p className="text-sm font-medium">{blog.author || 'Dr. Parash Mani Shrestha'}</p>
            <p className="text-xs text-gray-500">
              {blog.id && format(new Date(blog.id), 'MMM d, yyyy')}
            </p>
          </div>
          <div>
            {blog.published ? (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Published
              </span>
            ) : (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                Draft
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogView;
