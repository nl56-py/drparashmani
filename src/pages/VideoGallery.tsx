
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import VideoPlayer from '@/components/ui/video-player';
import LazyImage from '@/components/ui/lazy-image';
import { getYouTubeThumbnail, generateAltText } from '@/utils/imageOptimization';
import { Link } from 'react-router-dom';

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
  // New SEO fields
  seo_title_en: string | null;
  seo_title_np: string | null;
  seo_desc_en: string | null;
  seo_desc_np: string | null;
  seo_keywords_en: string | null;
  seo_keywords_np: string | null;
  og_image_url: string | null;
}

const VideoGallery = () => {
  const { language } = useLanguage();
  const [dbVideos, setDbVideos] = useState<DBVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const seoKeywordsEn = "urology videos, kidney health videos, Dr. Parash Mani Shrestha videos, urology education, medical videos Nepal";
  const seoKeywordsNp = "मूत्र रोग भिडियोहरू, मिर्गौला स्वास्थ्य भिडियोहरू, डा. पारस मणि श्रेष्ठ भिडियोहरू, मूत्र रोग शिक्षा, नेपाल मेडिकल भिडियोहरू";
  
  const seoDescription = language === 'en'
    ? "Watch educational videos on urology, kidney health, and urological procedures by Dr. Parash Mani Shrestha, Nepal's leading urologist."
    : "डा. पारस मणि श्रेष्ठ, नेपालका अग्रणी मूत्र रोग विशेषज्ञद्वारा मूत्र रोग, मिर्गौला स्वास्थ्य, र मूत्र रोग प्रक्रियाहरूमा शैक्षिक भिडियोहरू हेर्नुहोस्।";

  const pageTitle = language === 'en' ? "Educational Videos" : "शैक्षिक भिडियोहरू";
  const pageSubtitle = language === 'en' 
    ? "Watch informative videos about urological conditions and treatments"
    : "मूत्र रोग अवस्था र उपचारहरू बारे जानकारीमूलक भिडियोहरू हेर्नुहोस्";

  // Create structured data for video gallery
  const videoGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [],
    "name": language === 'en' ? "Urology Educational Videos by Dr. Parash Mani Shrestha" : "डा. पारस मणि श्रेष्ठका मूत्र रोग शैक्षिक भिडियोहरू",
    "description": seoDescription
  };

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
          setError('Failed to load videos');
        } else {
          console.log('Videos from database:', data);
          setDbVideos(data || []);
        }
      } catch (err) {
        console.error('Exception fetching videos:', err);
        setError('Failed to load videos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideosFromDB();
  }, []);

  // Find featured video from database
  const featuredVideo = dbVideos.find(video => video.featured);
  const hasVideos = dbVideos.length > 0;

  // Add videos to schema
  if (dbVideos.length > 0) {
    videoGallerySchema.itemListElement = dbVideos.map((video, index) => {
      const title = language === 'en' 
        ? (video.seo_title_en || video.title_en) 
        : (video.seo_title_np || video.title_np);
        
      const description = language === 'en' 
        ? (video.seo_desc_en || video.description_en || '') 
        : (video.seo_desc_np || video.description_np || '');
        
      const thumbnail = video.og_image_url || getYouTubeThumbnail(video.embed_url);
      
      return {
        "@type": "VideoObject",
        "position": index + 1,
        "name": title,
        "description": description,
        "thumbnailUrl": thumbnail,
        "embedUrl": video.embed_url,
        "contentUrl": video.embed_url,
        "uploadDate": video.created_at
      };
    });
  }

  return (
    <>
      <SEOHead 
        title={pageTitle}
        description={seoDescription}
        keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
        canonical="/videos"
        structuredData={videoGallerySchema}
      />
      <Header />
      <main>
        <section className="bg-gray-50 py-16">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="page-title">
                <span className={language === 'np' ? 'nepali' : ''}>{pageTitle}</span>
              </h1>
              <p className="page-subtitle">
                <span className={language === 'np' ? 'nepali' : ''}>{pageSubtitle}</span>
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-doctor-blue" />
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
              </div>
            ) : !hasVideos ? (
              <div className="text-center py-12">
                <p className={`text-xl text-gray-600 ${language === 'np' ? 'nepali' : ''}`}>
                  {language === 'en' 
                    ? "No videos available at the moment. Please check back later."
                    : "हाल कुनै भिडियोहरू उपलब्ध छैनन्। कृपया पछि फेरि जाँच गर्नुहोस्।"}
                </p>
              </div>
            ) : (
              <>
                {/* Featured Video Section */}
                {featuredVideo && (
                  <div className="mb-16 bg-white p-8 rounded-xl shadow-md">
                    <h2 className={`text-2xl font-bold mb-6 text-center ${language === 'np' ? 'nepali' : ''}`}>
                      {language === 'en' 
                        ? (featuredVideo.seo_title_en || featuredVideo.title_en) 
                        : (featuredVideo.seo_title_np || featuredVideo.title_np)}
                    </h2>
                    <div className="max-w-4xl mx-auto">
                      <Link to={`/videos/${featuredVideo.slug ? featuredVideo.slug.trim() : featuredVideo.id}`}>
                        <VideoPlayer 
                          embedUrl={featuredVideo.embed_url}
                          title={language === 'en' ? featuredVideo.title_en : featuredVideo.title_np}
                          thumbnailUrl={featuredVideo.og_image_url || undefined}
                          className="shadow-lg rounded-lg overflow-hidden"
                        />
                      </Link>
                    </div>
                    <div className="mt-6 text-center">
                      <h3 className={`text-xl font-semibold ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' 
                          ? (featuredVideo.seo_title_en || 'Featured Video') 
                          : (featuredVideo.seo_title_np || 'विशेष भिडियो')}
                      </h3>
                      <p className={`mt-4 text-gray-700 max-w-4xl mx-auto ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' 
                          ? (featuredVideo.seo_desc_en || featuredVideo.description_en || '')
                          : (featuredVideo.seo_desc_np || featuredVideo.description_np || '')}
                      </p>
                      <Link 
                        to={`/videos/${featuredVideo.slug ? featuredVideo.slug.trim() : featuredVideo.id}`}
                        className={`inline-block mt-4 text-doctor-blue hover:underline ${language === 'np' ? 'nepali' : ''}`}
                      >
                        {language === 'en' ? 'Watch Full Video' : 'पूर्ण भिडियो हेर्नुहोस्'}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dbVideos.map((video) => {
                    const title = language === 'en' 
                      ? (video.seo_title_en || video.title_en) 
                      : (video.seo_title_np || video.title_np);
                    const description = language === 'en' 
                      ? (video.seo_desc_en || video.description_en || '')
                      : (video.seo_desc_np || video.description_np || '');
                    const category = language === 'en' ? video.category_en : video.category_np;
                    const date = language === 'en' ? video.date_en : video.date_np;
                    const videoPath = video.slug ? `/videos/${video.slug.trim()}` : `/videos/${video.id}`;
                      
                    return (
                      <Card key={video.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                        <Link to={videoPath}>
                          <VideoPlayer
                            embedUrl={video.embed_url}
                            title={title}
                            thumbnailUrl={video.og_image_url || undefined}
                          />
                        </Link>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                            <span className={language === 'np' ? 'nepali' : ''}>
                              {date}
                            </span>
                            <span className={`text-doctor-blue ${language === 'np' ? 'nepali' : ''}`}>
                              {category}
                            </span>
                          </div>
                          <h3 className={`text-xl font-bold mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                            <Link to={videoPath} className="hover:text-doctor-blue transition-colors">
                              {title}
                            </Link>
                          </h3>
                          <p className={`text-base text-gray-700 mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                            {description}
                          </p>
                          <Link 
                            to={videoPath}
                            className={`text-doctor-blue hover:underline ${language === 'np' ? 'nepali' : ''}`}
                          >
                            {language === 'en' ? 'Watch Video' : 'भिडियो हेर्नुहोस्'} →
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default VideoGallery;
