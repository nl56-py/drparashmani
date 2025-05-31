import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload, Trash2, Edit2 } from 'lucide-react';
import { useLecturesAbroad, LectureAbroadWithImages } from '@/hooks/useLecturesAbroad';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const lectureSchema = z.object({
  title_en: z.string().min(1, 'English title is required'),
  title_np: z.string().optional(),
  location_en: z.string().min(1, 'English location is required'),
  location_np: z.string().optional(),
  venue_en: z.string().min(1, 'English venue is required'),
  venue_np: z.string().optional(),
  date_en: z.string().min(1, 'English date is required'),
  date_np: z.string().optional(),
  audience_en: z.string().optional(),
  audience_np: z.string().optional(),
  badge_en: z.string().optional(),
  badge_np: z.string().optional(),
  description_en: z.string().optional(),
  description_np: z.string().optional(),
  type: z.enum(['recent', 'upcoming']),
});

type LectureFormData = z.infer<typeof lectureSchema>;

interface LectureFormProps {
  lecture?: LectureAbroadWithImages | null;
  onClose: () => void;
}

const LectureForm: React.FC<LectureFormProps> = ({ lecture, onClose }) => {
  const { createLecture, updateLecture, uploadLectureImages, deleteLectureImage, updateLectureImage } = useLecturesAbroad();
  const [topics, setTopics] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [editingImage, setEditingImage] = useState<{id: string, altEn: string, altNp: string} | null>(null);

  const form = useForm<LectureFormData>({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      title_en: '',
      title_np: '',
      location_en: '',
      location_np: '',
      venue_en: '',
      venue_np: '',
      date_en: '',
      date_np: '',
      audience_en: '',
      audience_np: '',
      badge_en: '',
      badge_np: '',
      description_en: '',
      description_np: '',
      type: 'recent',
    },
  });

  useEffect(() => {
    if (lecture) {
      form.reset({
        title_en: lecture.title_en,
        title_np: lecture.title_np || '',
        location_en: lecture.location_en,
        location_np: lecture.location_np || '',
        venue_en: lecture.venue_en,
        venue_np: lecture.venue_np || '',
        date_en: lecture.date_en,
        date_np: lecture.date_np || '',
        audience_en: lecture.audience_en || '',
        audience_np: lecture.audience_np || '',
        badge_en: lecture.badge_en || '',
        badge_np: lecture.badge_np || '',
        description_en: lecture.description_en || '',
        description_np: lecture.description_np || '',
        type: lecture.type as 'recent' | 'upcoming',
      });
      setTopics(lecture.topics || []);
      setHighlights(lecture.highlights || []);
    }
  }, [lecture, form]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (imageId: string, imageUrl: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      await deleteLectureImage(imageId, imageUrl);
    }
  };

  const handleUpdateImageAltText = async () => {
    if (editingImage) {
      await updateLectureImage(editingImage.id, editingImage.altEn, editingImage.altNp);
      setEditingImage(null);
    }
  };

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const removeTopic = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const addHighlight = () => {
    if (newHighlight.trim() && !highlights.includes(newHighlight.trim())) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: LectureFormData) => {
    try {
      setIsSubmitting(true);
      
      const lectureData = {
        title_en: data.title_en,
        title_np: data.title_np,
        location_en: data.location_en,
        location_np: data.location_np,
        venue_en: data.venue_en,
        venue_np: data.venue_np,
        date_en: data.date_en,
        date_np: data.date_np,
        audience_en: data.audience_en,
        audience_np: data.audience_np,
        badge_en: data.badge_en,
        badge_np: data.badge_np,
        description_en: data.description_en,
        description_np: data.description_np,
        type: data.type,
        topics: topics.length > 0 ? topics : null,
        highlights: highlights.length > 0 ? highlights : null,
      };

      let lectureResult;
      if (lecture) {
        lectureResult = await updateLecture(lecture.id, lectureData);
      } else {
        lectureResult = await createLecture(lectureData);
      }

      // Upload new images if any are selected and we have a lecture ID
      if (selectedImages.length > 0 && (lectureResult?.id || lecture?.id)) {
        await uploadLectureImages(lectureResult?.id || lecture!.id, selectedImages);
      }

      onClose();
    } catch (error) {
      console.error('Error saving lecture:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (English) *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title_np"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (Nepali)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (English) *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location_np"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (Nepali)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Venue Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="venue_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue (English) *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="venue_np"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue (Nepali)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date and Type Fields */}
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="date_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date (English) *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., September 2024" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_np"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date (Nepali)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="recent">Recent</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Audience Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="audience_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audience (English)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., 200+ Urologists from South Asia" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="audience_np"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audience (Nepali)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Badge Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="badge_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge (English)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Keynote Speaker" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="badge_np"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge (Nepali)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Existing Images Section */}
        {lecture && lecture.lecture_images && lecture.lecture_images.length > 0 && (
          <div className="space-y-3">
            <FormLabel>Existing Images</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {lecture.lecture_images.map((image) => (
                <div key={image.id} className="relative group">
                  <img 
                    src={image.image_url} 
                    alt={image.alt_text_en || 'Lecture image'}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingImage({
                            id: image.id,
                            altEn: image.alt_text_en || '',
                            altNp: image.alt_text_np || ''
                          })}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Image Alt Text</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Alt Text (English)</label>
                            <Input
                              value={editingImage?.altEn || ''}
                              onChange={(e) => setEditingImage(prev => prev ? {...prev, altEn: e.target.value} : null)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Alt Text (Nepali)</label>
                            <Input
                              value={editingImage?.altNp || ''}
                              onChange={(e) => setEditingImage(prev => prev ? {...prev, altNp: e.target.value} : null)}
                            />
                          </div>
                          <Button onClick={handleUpdateImageAltText}>Update</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteExistingImage(image.id, image.image_url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {image.alt_text_en && (
                    <p className="text-xs text-gray-600 mt-1 truncate">{image.alt_text_en}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Image Upload Section */}
        <div className="space-y-3">
          <FormLabel>Add New Images</FormLabel>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageSelect}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-doctor-blue file:text-white hover:file:bg-doctor-blue-dark"
            />
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </div>
          
          {/* New Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => removeNewImage(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Topics Section */}
        <div className="space-y-3">
          <FormLabel>Topics Covered</FormLabel>
          <div className="flex gap-2">
            <Input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Add a topic"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
            />
            <Button type="button" onClick={addTopic} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {topic}
                <button
                  type="button"
                  onClick={() => removeTopic(index)}
                  className="ml-1 hover:bg-red-500 hover:text-white rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        <div className="space-y-3">
          <FormLabel>Key Highlights</FormLabel>
          <div className="flex gap-2">
            <Input
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add a highlight"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
            />
            <Button type="button" onClick={addHighlight} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {highlight}
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="ml-1 hover:bg-red-500 hover:text-white rounded-full"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Description Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="description_en"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (English)</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description_np"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Nepali)</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : lecture ? 'Update Lecture' : 'Create Lecture'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LectureForm;
