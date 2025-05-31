
import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2, ImageIcon } from 'lucide-react';
import { BlogFormData } from './BlogForm';

interface BlogListProps {
  blogs: BlogFormData[];
  handleView: (blog: BlogFormData) => void;
  handleEdit: (blog: BlogFormData) => void;
  handleDeleteClick: (id: string) => void;
  handleImagePreview: (imageUrl: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ 
  blogs, 
  handleView, 
  handleEdit, 
  handleDeleteClick, 
  handleImagePreview 
}) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title (EN)</TableHead>
            <TableHead>Title (NP)</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium">{blog.title_en}</TableCell>
              <TableCell className="font-nepali">{blog.title_np}</TableCell>
              <TableCell>{blog.slug}</TableCell>
              <TableCell>
                {blog.published ? (
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                ) : (
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                    Draft
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleView(blog)}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEdit(blog)}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteClick(blog.id!)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                  {blog.image_url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleImagePreview(blog.image_url!)}
                    >
                      <ImageIcon size={16} />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogList;
