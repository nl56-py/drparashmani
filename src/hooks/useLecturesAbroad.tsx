
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

export type LectureAbroad = Tables<'lectures_abroad'>;
export type LectureImage = Tables<'lecture_images'>;

export interface LectureAbroadWithImages extends LectureAbroad {
  lecture_images: LectureImage[];
}

// Create a more flexible type for creating lectures
export type CreateLectureData = {
  title_en: string;
  title_np?: string;
  location_en: string;
  location_np?: string;
  venue_en: string;
  venue_np?: string;
  date_en: string;
  date_np?: string;
  audience_en?: string;
  audience_np?: string;
  badge_en?: string;
  badge_np?: string;
  description_en?: string;
  description_np?: string;
  type: string;
  topics?: string[] | null;
  highlights?: string[] | null;
};

export const useLecturesAbroad = () => {
  const [lectures, setLectures] = useState<LectureAbroadWithImages[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchLectures = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('lectures_abroad')
        .select(`
          *,
          lecture_images (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLectures(data || []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lectures. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createLecture = async (lectureData: CreateLectureData) => {
    try {
      // Generate slug from title_en
      const slug = lectureData.title_en
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
        .replace(/^-|-$/g, '');

      const dataToInsert = {
        ...lectureData,
        slug: slug,
        // Ensure all required fields have values
        audience_en: lectureData.audience_en || '',
        audience_np: lectureData.audience_np || '',
        badge_en: lectureData.badge_en || '',
        badge_np: lectureData.badge_np || '',
        description_en: lectureData.description_en || '',
        description_np: lectureData.description_np || '',
        title_np: lectureData.title_np || '',
        location_np: lectureData.location_np || '',
        venue_np: lectureData.venue_np || '',
        date_np: lectureData.date_np || '',
      };

      const { data, error } = await supabase
        .from('lectures_abroad')
        .insert(dataToInsert)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lecture created successfully!",
      });

      await fetchLectures();
      return data;
    } catch (error) {
      console.error('Error creating lecture:', error);
      toast({
        title: "Error",
        description: "Failed to create lecture. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const uploadLectureImages = async (lectureId: string, images: File[]) => {
    try {
      const uploadPromises = images.map(async (image, index) => {
        const fileExt = image.name.split('.').pop();
        const fileName = `${lectureId}_${index}_${Date.now()}.${fileExt}`;
        
        // Upload to Supabase storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('lecture-images')
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('lecture-images')
          .getPublicUrl(fileName);

        // Save image record to database
        const { error: dbError } = await supabase
          .from('lecture_images')
          .insert({
            lecture_id: lectureId,
            image_url: urlData.publicUrl,
            alt_text_en: `Lecture image ${index + 1}`,
            display_order: index
          });

        if (dbError) throw dbError;
      });

      await Promise.all(uploadPromises);
      
      toast({
        title: "Success",
        description: "Images uploaded successfully!",
      });

      await fetchLectures();
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteLectureImage = async (imageId: string, imageUrl: string) => {
    try {
      // Extract filename from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('lecture-images')
        .remove([fileName]);

      if (storageError) {
        console.warn('Storage deletion error:', storageError);
        // Continue even if storage deletion fails
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('lecture_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image deleted successfully!",
      });

      await fetchLectures();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateLectureImage = async (imageId: string, altTextEn?: string, altTextNp?: string) => {
    try {
      const updateData: any = {};
      if (altTextEn !== undefined) updateData.alt_text_en = altTextEn;
      if (altTextNp !== undefined) updateData.alt_text_np = altTextNp;

      const { error } = await supabase
        .from('lecture_images')
        .update(updateData)
        .eq('id', imageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image updated successfully!",
      });

      await fetchLectures();
    } catch (error) {
      console.error('Error updating image:', error);
      toast({
        title: "Error",
        description: "Failed to update image. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateLecture = async (id: string, lectureData: Partial<LectureAbroad>) => {
    try {
      const { data, error } = await supabase
        .from('lectures_abroad')
        .update(lectureData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lecture updated successfully!",
      });

      await fetchLectures();
      return data;
    } catch (error) {
      console.error('Error updating lecture:', error);
      toast({
        title: "Error",
        description: "Failed to update lecture. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteLecture = async (id: string) => {
    try {
      const { error } = await supabase
        .from('lectures_abroad')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lecture deleted successfully!",
      });

      await fetchLectures();
    } catch (error) {
      console.error('Error deleting lecture:', error);
      toast({
        title: "Error",
        description: "Failed to delete lecture. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getLectureBySlug = useCallback(async (slug: string) => {
    try {
      console.log('Fetching lecture with slug:', slug);
      const { data, error } = await supabase
        .from('lectures_abroad')
        .select(`
          *,
          lecture_images (*)
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching lecture by slug:', error);
        throw error;
      }
      
      console.log('Lecture data found:', data);
      return data;
    } catch (error) {
      console.error('Error fetching lecture by slug:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchLectures();
  }, []);

  return {
    lectures,
    isLoading,
    createLecture,
    updateLecture,
    deleteLecture,
    uploadLectureImages,
    deleteLectureImage,
    updateLectureImage,
    getLectureBySlug,
    refetchLectures: fetchLectures,
  };
};
