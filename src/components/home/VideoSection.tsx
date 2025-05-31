
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import VideoPlayer from '@/components/ui/video-player';
import { generateAltText } from '@/utils/imageOptimization';

interface DBVideo {
  id: string;
  title_en: string;
  title_np: string;
  description_en: string | null;
  description_np: string | null;
  embed_url: string;
  date_en: string | null;
  date_np: string | null;
  category_en: string | null;
  category_np: string | null;
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

interface NormalizedVideo {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  thumbnail: string;
  date: string;
  category: string;
  slug: string | null;
  videoPath: string;
}

const VideoSection = () => {
  const { language } = useLanguage();
  const [dbVideos, setDbVideos] = useState<DBVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideosFromDB = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching videos from database:', error);
        } else {
          console.log('Videos from database:', data);
          setDbVideos(data || []);
        }
      } catch (err) {
        console.error('Exception fetching videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideosFromDB();
  }, []);

  // Normalize DB videos to a consistent format
  const normalizeDBVideos = (videos: DBVideo[]): NormalizedVideo[] => {
    return videos.map(video => {
      const trimmedSlug = video.slug ? video.slug.trim() : null;
      const videoPath = trimmedSlug ? `/videos/${trimmedSlug}` : `/videos/${video.id}`;
      return {
        id: video.id,
        title: language === 'en' 
          ? (video.seo_title_en || video.title_en) 
          : (video.seo_title_np || video.title_np),
        description: language === 'en' 
          ? (video.seo_desc_en || video.description_en || '') 
          : (video.seo_desc_np || video.description_np || ''),
        embedUrl: video.embed_url.trim(),
        thumbnail: video.og_image_url || '',
        date: language === 'en' ? (video.date_en || '') : (video.date_np || ''),
        category: language === 'en' ? (video.category_en || '') : (video.category_np || ''),
        slug: trimmedSlug,
        videoPath
      };
    });
  };

  // Get all DB videos
  const normalizedDBVideos = normalizeDBVideos(dbVideos);
  const hasVideos = normalizedDBVideos.length > 0;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring" }
    }
  };

  // If no videos are available, return null (don't render section)
  if (!hasVideos && !isLoading) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 relative bg-gray-50">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-blue-50 text-doctor-blue text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {language === 'en' ? "Educational Videos" : "शैक्षिक भिडियोहरू"}
          </motion.span>
          
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-gray-900 ${language === 'np' ? 'nepali' : ''}`}>
            {language === 'en' 
              ? "Watch and Learn" 
              : "हेर्नुहोस् र सिक्नुहोस्"}
          </h2>
          
          <p className={`text-xl text-gray-600 mb-4 ${language === 'np' ? 'nepali' : ''}`}>
            {language === 'en' 
              ? "Explore our latest educational videos on urological health and treatments" 
              : "मूत्र संबंधी स्वास्थ्य र उपचारहरूमा हाम्रा नवीनतम शैक्षिक भिडियोहरू हेर्नुहोस्"}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-doctor-blue" />
          </div>
        ) : (
          /* Scrollable container for all videos */
          <motion.div 
            className="relative mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {normalizedDBVideos.map((video, index) => (
                  <motion.div 
                    key={video.id}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3, type: "spring", stiffness: 300 }
                    }}
                    className="w-80 flex-shrink-0"
                  >
                    <Card className="overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 h-full">
                      <Link to={video.videoPath}>
                        <VideoPlayer
                          embedUrl={video.embedUrl}
                          title={video.title}
                          thumbnailUrl={video.thumbnail}
                        />
                      </Link>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                          <span className={language === 'np' ? 'nepali' : ''}>
                            {video.date}
                          </span>
                          <span className={`text-doctor-blue ${language === 'np' ? 'nepali' : ''}`}>
                            {video.category}
                          </span>
                        </div>
                        <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${language === 'np' ? 'nepali' : ''}`}>
                          <Link to={video.videoPath} className="hover:text-doctor-blue transition-colors">
                            {video.title}
                          </Link>
                        </h3>
                        <p className={`text-gray-600 text-sm line-clamp-2 ${language === 'np' ? 'nepali' : ''}`}>
                          {video.description}
                        </p>
                        <Link 
                          to={video.videoPath} 
                          className="mt-3 inline-block text-doctor-blue hover:text-doctor-blue-dark"
                        >
                          {language === 'en' ? 'Watch Video' : 'भिडियो हेर्नुहोस्'} →
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(normalizedDBVideos.length / 3) }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {hasVideos && (
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              asChild 
              variant="outline" 
              className="border-doctor-blue text-doctor-blue hover:bg-doctor-blue hover:text-white transition-all duration-300 group"
            >
              <Link to="/videos" className="flex items-center">
                {language === 'en' ? 'View All Videos' : 'सबै भिडियोहरू हेर्नुहोस्'}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
