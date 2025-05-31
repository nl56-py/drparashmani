
import React, { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, ImagePlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogFooter } from '@/components/ui/dialog';

// Define types
export interface BlogFormData {
  id?: string;
  title_en: string;
  title_np: string;
  content_en: string;
  content_np: string;
  excerpt_en: string;
  excerpt_np: string;
  slug: string;
  author: string | null;
  image_url: string | null; // Optional image URL
  published: boolean;
  // SEO fields
  seo_title_en: string | null;
  seo_title_np: string | null;
  seo_desc_en: string | null;
  seo_desc_np: string | null;
  seo_keywords_en: string | null;
  seo_keywords_np: string | null;
  og_image_url?: string | null; // Explicitly add og_image_url field
}

export interface BlogFormProps {
  formData: BlogFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleEditorChange: (fieldName: string, content: string) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLTextAreaElement>, fieldName: string) => void;
  handleSwitchChange: (checked: boolean) => void;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  isSubmitting: boolean;
  isUploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
  isEditingContent: {
    content_en: boolean;
    content_np: boolean;
  };
  setIsEditingContent: React.Dispatch<React.SetStateAction<{
    content_en: boolean;
    content_np: boolean;
  }>>;
  insertImageToEditor: (e: ChangeEvent<HTMLInputElement>) => void;
  setIsFormDialogOpen: (open: boolean) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({
  formData,
  handleInputChange,
  handleEditorChange,
  handlePaste,
  handleSwitchChange,
  handleFileUpload,
  handleSave,
  isSubmitting,
  isUploading,
  fileInputRef,
  contentRef,
  isEditingContent,
  setIsEditingContent,
  insertImageToEditor,
  setIsFormDialogOpen
}) => {
  return (
    <form onSubmit={handleSave}>
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="nepali">नेपाली</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        {/* Content tab */}
        <TabsContent value="content">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title_en">Title (English)</Label>
              <Input 
                id="title_en"
                name="title_en"
                value={formData.title_en || ''} 
                onChange={handleInputChange}
                placeholder="Enter blog title in English"
              />
            </div>
            <div>
              <Label htmlFor="excerpt_en">Excerpt (English)</Label>
              <Textarea 
                id="excerpt_en"
                name="excerpt_en"
                value={formData.excerpt_en || ''} 
                onChange={handleInputChange}
                placeholder="Enter short summary in English"
                className="min-h-[80px]"
              />
            </div>
            <div>
              <Label htmlFor="content_en" className="flex justify-between">
                <span>Content (English)</span>
                <Button
                  variant="outline" 
                  size="sm"
                  type="button" 
                  onClick={() => document.getElementById('inline-image-en')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Insert Image
                    </>
                  )}
                </Button>
                <input
                  type="file"
                  id="inline-image-en"
                  accept="image/*"
                  className="hidden"
                  onChange={insertImageToEditor}
                />
              </Label>
              <Textarea 
                id="content_en"
                name="content_en"
                value={formData.content_en || ''} 
                onChange={handleInputChange}
                onPaste={(e) => handlePaste(e, 'content_en')}
                placeholder="Paste or enter your content here. Paste from MS Word/Google Docs to preserve formatting."
                rows={15}
                ref={contentRef}
                className="font-sans"
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatting from MS Word or Google Docs will be preserved when pasting content.
              </p>
            </div>
            
            {/* SEO Fields - English */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-3">SEO Settings (English)</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="seo_title_en">SEO Title (English)</Label>
                  <Input 
                    id="seo_title_en"
                    name="seo_title_en"
                    value={formData.seo_title_en || ''} 
                    onChange={handleInputChange}
                    placeholder="Enter SEO-optimized title (leave blank to use post title)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended length: 50-60 characters
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="seo_desc_en">Meta Description (English)</Label>
                  <Textarea 
                    id="seo_desc_en"
                    name="seo_desc_en"
                    value={formData.seo_desc_en || ''} 
                    onChange={handleInputChange}
                    placeholder="Enter SEO-optimized description (leave blank to use excerpt)"
                    className="min-h-[80px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended length: 150-160 characters
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="seo_keywords_en">Meta Keywords (English)</Label>
                  <Input
                    id="seo_keywords_en"
                    name="seo_keywords_en"
                    value={formData.seo_keywords_en || ''} 
                    onChange={handleInputChange}
                    placeholder="e.g.: best urologist in Kathmandu, kidney stone surgeon Nepal"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use 3-5 key phrases separated by commas, include local intent
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-2 border p-4 rounded-md bg-gray-50">
              <h4 className="font-medium mb-2">Preview</h4>
              <div 
                className="prose max-w-none border-t pt-2"
                dangerouslySetInnerHTML={{ __html: formData.content_en || '' }}
              />
            </div>
          </div>
        </TabsContent>
        
        {/* Nepali tab */}
        <TabsContent value="nepali" className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title_np">Title (Nepali)</Label>
              <Input 
                id="title_np"
                name="title_np"
                value={formData.title_np || ''} 
                onChange={handleInputChange}
                placeholder="Enter blog title in Nepali"
                className="font-nepali"
              />
            </div>
            <div>
              <Label htmlFor="excerpt_np">Excerpt (Nepali)</Label>
              <Textarea 
                id="excerpt_np"
                name="excerpt_np"
                value={formData.excerpt_np || ''} 
                onChange={handleInputChange}
                placeholder="Enter short summary in Nepali"
                className="font-nepali"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="content_np" className="flex justify-between">
                <span>Content (Nepali)</span>
                <Button
                  variant="outline" 
                  size="sm"
                  type="button" 
                  onClick={() => document.getElementById('inline-image-np')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <ImagePlus className="h-4 w-4 mr-2" />
                      Insert Image
                    </>
                  )}
                </Button>
                <input
                  type="file"
                  id="inline-image-np"
                  accept="image/*"
                  className="hidden"
                  onChange={insertImageToEditor}
                />
              </Label>
              <Textarea 
                id="content_np"
                name="content_np"
                value={formData.content_np || ''} 
                onChange={handleInputChange}
                onPaste={(e) => handlePaste(e, 'content_np')}
                placeholder="Paste or enter your content here. Paste from MS Word/Google Docs to preserve formatting."
                className="font-nepali"
                rows={15}
              />
              <p className="text-xs text-gray-500 mt-1 font-nepali">
                MS Word वा Google Docs बाट पेस्ट गर्दा फर्म्याटिङ सुरक्षित गरिन्छ।
              </p>
            </div>
            
            {/* SEO Fields - Nepali */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-3">SEO Settings (Nepali)</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="seo_title_np">SEO Title (Nepali)</Label>
                  <Input 
                    id="seo_title_np"
                    name="seo_title_np"
                    value={formData.seo_title_np || ''} 
                    onChange={handleInputChange}
                    placeholder="Enter SEO-optimized title in Nepali"
                    className="font-nepali"
                  />
                </div>
                
                <div>
                  <Label htmlFor="seo_desc_np">Meta Description (Nepali)</Label>
                  <Textarea 
                    id="seo_desc_np"
                    name="seo_desc_np"
                    value={formData.seo_desc_np || ''} 
                    onChange={handleInputChange}
                    placeholder="Enter SEO-optimized description in Nepali"
                    className="font-nepali min-h-[80px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="seo_keywords_np">Meta Keywords (Nepali)</Label>
                  <Input
                    id="seo_keywords_np"
                    name="seo_keywords_np"
                    value={formData.seo_keywords_np || ''} 
                    onChange={handleInputChange}
                    placeholder="मूत्ररोग, मिर्गौला पत्थरी, प्रोस्टेट, नेपाल, काठमाडौं"
                    className="font-nepali"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-2 border p-4 rounded-md bg-gray-50">
              <h4 className="font-medium mb-2">Preview</h4>
              <div 
                className="prose max-w-none border-t pt-2 font-nepali"
                dangerouslySetInnerHTML={{ __html: formData.content_np || '' }}
              />
            </div>
          </div>
        </TabsContent>
        
        {/* Settings tab */}
        <TabsContent value="settings">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input 
                id="slug"
                name="slug"
                value={formData.slug || ''} 
                onChange={handleInputChange}
                placeholder="blog-post-url-slug"
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author"
                name="author"
                value={formData.author || ''} 
                onChange={handleInputChange}
                placeholder="Dr. Parash Mani Shrestha"
              />
            </div>
            
            {/* Featured Image Section - Now explicitly optional */}
            <div>
              <Label htmlFor="featured-image" className="flex justify-between">
                <span>Featured Image (Optional)</span>
                <span className="text-xs text-gray-500">This will also be used as the OG image</span>
              </Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-md p-6 text-center">
                {formData.image_url ? (
                  <div>
                    <img 
                      src={formData.image_url} 
                      alt="Featured" 
                      className="max-h-48 mx-auto mb-4 rounded"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.click();
                        }
                      }}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : 'Change Image'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <ImagePlus className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-4">
                      Click to upload a featured image (optional)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.click();
                        }
                      }}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : 'Upload Image'}
                    </Button>
                  </div>
                )}
                <input 
                  type="file"
                  id="image_url" 
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-4">
                  Recommended size: 1200 x 630 pixels for optimal social sharing
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Switch 
              id="published"
              checked={formData.published || false}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="published">Published</Label>
          </div>
        </TabsContent>
        
        {/* SEO tab */}
        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">English SEO</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="seo_title_en">SEO Title (English)</Label>
                  <Input
                    id="seo_title_en"
                    name="seo_title_en"
                    value={formData.seo_title_en || ''}
                    onChange={handleInputChange}
                    placeholder="SEO optimized title in English"
                    className="mt-1"
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
                    value={formData.seo_desc_en || ''}
                    onChange={handleInputChange}
                    placeholder="SEO optimized description in English"
                    className="mt-1"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    If empty, excerpt will be used
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="seo_keywords_en">SEO Keywords (English)</Label>
                  <Textarea
                    id="seo_keywords_en"
                    name="seo_keywords_en"
                    value={formData.seo_keywords_en || ''}
                    onChange={handleInputChange}
                    placeholder="urology, kidney stone, prostate, Nepal, Kathmandu"
                    className="mt-1"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Comma-separated keywords with local intent
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium font-nepali">Nepali SEO</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="seo_title_np">SEO Title (Nepali)</Label>
                  <Input
                    id="seo_title_np"
                    name="seo_title_np"
                    value={formData.seo_title_np || ''}
                    onChange={handleInputChange}
                    placeholder="SEO optimized title in Nepali"
                    className="mt-1 font-nepali"
                  />
                </div>
                
                <div>
                  <Label htmlFor="seo_desc_np">SEO Description (Nepali)</Label>
                  <Textarea
                    id="seo_desc_np"
                    name="seo_desc_np"
                    value={formData.seo_desc_np || ''}
                    onChange={handleInputChange}
                    placeholder="SEO optimized description in Nepali"
                    className="mt-1 font-nepali"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="seo_keywords_np">SEO Keywords (Nepali)</Label>
                  <Textarea
                    id="seo_keywords_np"
                    name="seo_keywords_np"
                    value={formData.seo_keywords_np || ''}
                    onChange={handleInputChange}
                    placeholder="मूत्ररोग, मिर्गौला पत्थरी, प्रोस्टेट, नेपाल, काठमाडौं"
                    className="mt-1 font-nepali"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Duplicate slug and author fields at bottom of form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input 
            id="slug"
            name="slug"
            value={formData.slug || ''} 
            onChange={handleInputChange}
            placeholder="blog-post-url-slug"
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input 
            id="author"
            name="author"
            value={formData.author || ''} 
            onChange={handleInputChange}
            placeholder="Dr. Parash Mani Shrestha"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Switch 
          id="published"
          checked={formData.published || false}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="published">Published</Label>
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
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Post'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default BlogForm;
