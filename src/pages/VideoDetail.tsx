
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import VideoPlayer from '@/components/ui/video-player';
import { getYouTubeThumbnail } from '@/utils/imageOptimization';

interface Video {
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
  slug: string;
  seo_title_en: string | null;
  seo_title_np: string | null;
  seo_desc_en: string | null;
  seo_desc_np: string | null;
  seo_keywords_en: string | null;
  seo_keywords_np: string | null;
  og_image_url: string | null;
  created_at: string;
}

const VideoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Searching for slug:', slug);
        
        // First try to find by slug, then by ID if slug doesn't work
        let query = supabase.from('videos').select('*');
        
        // If slug looks like a UUID, search by ID, otherwise search by slug
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
        
        if (isUUID) {
          query = query.eq('id', slug);
        } else {
          // Get all videos and filter manually to handle trimming
          const { data: allVideos, error: fetchError } = await supabase
            .from('videos')
            .select('*');
            
          if (fetchError) {
            console.error('Error fetching videos:', fetchError);
            setNotFound(true);
            setIsLoading(false);
            return;
          }
          
          // Find video by trimmed slug comparison
          const matchedVideo = allVideos?.find(video => 
            video.slug && video.slug.trim() === slug.trim()
          );
          
          if (matchedVideo) {
            console.log('Found video:', matchedVideo);
            setVideo(matchedVideo);
          } else {
            console.log('No video found with slug:', slug);
            setNotFound(true);
          }
          setIsLoading(false);
          return;
        }
        
        const { data, error } = await query.single();

        if (error || !data) {
          console.error('Error fetching video:', error);
          setNotFound(true);
        } else {
          console.log('Found video by ID:', data);
          setVideo(data);
        }
      } catch (err) {
        console.error('Exception fetching video:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-doctor-blue" />
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !video) {
    return <Navigate to="/videos" replace />;
  }

  const title = language === 'en' 
    ? (video.seo_title_en || video.title_en) 
    : (video.seo_title_np || video.title_np);
    
  const description = language === 'en' 
    ? (video.seo_desc_en || video.description_en || '') 
    : (video.seo_desc_np || video.description_np || '');
    
  const keywords = language === 'en' 
    ? (video.seo_keywords_en || 'urology video, medical education, Dr. Parash Mani Shrestha') 
    : (video.seo_keywords_np || 'मूत्र रोग भिडियो, चिकित्सा शिक्षा, डा. पारस मणि श्रेष्ठ');

  const category = language === 'en' ? video.category_en : video.category_np;
  const date = language === 'en' ? video.date_en : video.date_np;
  const thumbnail = video.og_image_url || getYouTubeThumbnail(video.embed_url);

  // Create structured data for the video
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": title,
    "description": description,
    "thumbnailUrl": thumbnail,
    "uploadDate": video.created_at,
    "embedUrl": video.embed_url,
    "contentUrl": video.embed_url,
    "publisher": {
      "@type": "Person",
      "name": "Dr. Parash Mani Shrestha",
      "url": "https://drparashmani.com.np"
    }
  };

  // Use slug if available, otherwise use ID for canonical URL
  const canonicalPath = video.slug ? `/videos/${video.slug.trim()}` : `/videos/${video.id}`;

  return (
    <>
      <SEOHead 
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonicalPath}
        ogImage={thumbnail}
        structuredData={videoSchema}
      />
      <Header />
      <main>
        <section className="py-8 md:py-16">
          <div className="section-container max-w-4xl">
            {/* Back to Videos Button */}
            <div className="mb-6">
              <Button variant="outline" asChild>
                <Link to="/videos" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Back to Videos' : 'भिडियोहरूमा फिर्ता'}
                </Link>
              </Button>
            </div>

            {/* Video Player */}
            <div className="mb-8">
              <VideoPlayer
                embedUrl={video.embed_url}
                title={title}
                thumbnailUrl={thumbnail}
                className="shadow-lg rounded-lg overflow-hidden"
              />
            </div>

            {/* Video Information */}
            <div className="space-y-6">
              {/* Category and Date */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {category && (
                  <span className={`px-3 py-1 bg-doctor-blue/10 text-doctor-blue rounded-full ${language === 'np' ? 'nepali' : ''}`}>
                    {category}
                  </span>
                )}
                {date && (
                  <span className={language === 'np' ? 'nepali' : ''}>
                    {date}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 ${language === 'np' ? 'nepali' : ''}`}>
                {title}
              </h1>

              {/* Description */}
              {description && (
                <div className="prose max-w-none">
                  <p className={`text-lg text-gray-700 leading-relaxed ${language === 'np' ? 'nepali' : ''}`}>
                    {description}
                  </p>
                </div>
              )}

              {/* Additional Information */}
              <div className="pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${language === 'np' ? 'nepali' : ''}`}>
                      {language === 'en' ? 'About Dr. Parash Mani Shrestha' : 'डा. पारस मणि श्रेष्ठको बारेमा'}
                    </h3>
                    <p className={`text-gray-600 ${language === 'np' ? 'nepali' : ''}`}>
                      {language === 'en' 
                        ? 'Leading urologist and kidney transplant specialist in Nepal, dedicated to providing world-class urological care and education.'
                        : 'नेपालका अग्रणी मूत्र रोग विशेषज्ञ र मिर्गौला प्रत्यारोपण विशेषज्ञ, विश्वस्तरीय मूत्र रोग हेरचाह र शिक्षा प्रदान गर्न समर्पित।'}
                    </p>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${language === 'np' ? 'nepali' : ''}`}>
                      {language === 'en' ? 'Related Topics' : 'सम्बन्धित विषयहरू'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Link 
                        to="/expertise" 
                        className={`text-doctor-blue hover:underline ${language === 'np' ? 'nepali' : ''}`}
                      >
                        {language === 'en' ? 'Our Expertise' : 'हाम्रो विशेषज्ञता'}
                      </Link>
                      <span>•</span>
                      <Link 
                        to="/urology-info" 
                        className={`text-doctor-blue hover:underline ${language === 'np' ? 'nepali' : ''}`}
                      >
                        {language === 'en' ? 'Urology Information' : 'मूत्र रोग जानकारी'}
                      </Link>
                      <span>•</span>
                      <Link 
                        to="/contact" 
                        className={`text-doctor-blue hover:underline ${language === 'np' ? 'nepali' : ''}`}
                      >
                        {language === 'en' ? 'Contact Us' : 'हामीलाई सम्पर्क गर्नुहोस्'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VideoDetail;
