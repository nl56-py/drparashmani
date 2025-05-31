
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load non-critical components
const ExpertisePreview = lazy(() => import('@/components/home/ExpertisePreview'));
const UrologyInfoPreview = lazy(() => import('@/components/home/UrologyInfoPreview'));
const BlogPreview = lazy(() => import('@/components/home/BlogPreview'));
const ContactPreview = lazy(() => import('@/components/home/ContactPreview'));
const VideoSection = lazy(() => import('@/components/home/VideoSection'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-16">
    <Loader2 className="h-8 w-8 animate-spin text-doctor-blue" />
  </div>
);

const Index = () => {
  const { language } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Enhanced SEO content for better ranking
  const seoTitle = language === 'en'
    ? 'Dr. Parash Mani Shrestha - Nepal\'s Leading Urologist & Urosurgeon | Blue Cross Hospital Kathmandu'
    : 'डा. पारस मणि श्रेष्ठ - नेपालका अग्रणी मूत्र रोग विशेषज्ञ र यूरोसर्जन | ब्लु क्रस अस्पताल काठमाडौं';

  const seoDescription = language === 'en'
    ? 'Dr. Parash Mani Shrestha is Nepal\'s leading urologist & urosurgeon with 20+ years experience. Senior Consultant at Blue Cross Hospital & Bir Hospital Kathmandu. Expert in kidney transplants, TURP surgery, urologic cancer treatment, kidney stone removal. Book appointment with top urologist in Nepal.'
    : 'डा. पारस मणि श्रेष्ठ नेपालका अग्रणी मूत्र रोग विशेषज्ञ र यूरोसर्जन हुन् जसको २०+ वर्षको अनुभव छ। काठमाडौंको ब्लु क्रस अस्पताल र बीर अस्पतालमा वरिष्ठ सल्लाहकार। मिर्गौला प्रत्यारोपण, TURP शल्यक्रिया, मूत्र रोगसम्बन्धी क्यान्सर उपचारमा विशेषज्ञ।';

  const seoKeywords = language === 'en'
    ? 'Dr Parash Mani Shrestha, Dr Parash Mani Shrestha urologist, best urologist in Kathmandu Nepal, kidney transplant doctor Nepal, TURP surgery specialist Nepal, urologic cancer treatment Kathmandu, kidney stone doctor Nepal, prostate treatment Nepal, Blue Cross Hospital urologist, Bir Hospital urologist, urology specialist Kathmandu, Nepal urologist, urologist near me Kathmandu, best kidney doctor Nepal, urosurgeon Nepal'
    : 'डा पारस मणि श्रेष्ठ, डा पारस मणि श्रेष्ठ मूत्ररोग विशेषज्ञ, काठमाडौं नेपालमा उत्तम मूत्ररोग विशेषज्ञ, नेपालमा मिर्गौला प्रत्यारोपण डाक्टर, नेपालमा TURP शल्यक्रिया विशेषज्ञ, काठमाडौंमा मूत्ररोग क्यान्सर उपचार, नेपालमा मिर्गौला पथरी डाक्टर, नेपालमा प्रोस्टेट उपचार, ब्लु क्रस अस्पताल मूत्ररोग विशेषज्ञ';

  // Video schema for VideoSection
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Dr. Parash Mani Shrestha - Urology Services Overview",
    "description": "Overview of comprehensive urology services provided by Dr. Parash Mani Shrestha, Nepal's leading urologist",
    "thumbnailUrl": "https://drparashmani.com.np/lovable-uploads/ec142a21-cb09-4e88-baf2-e729d0027613.png",
    "uploadDate": "2025-05-28",
    "duration": "PT5M",
    "contentUrl": "https://drparashmani.com.np/videos",
    "embedUrl": "https://drparashmani.com.np/videos",
    "publisher": {
      "@type": "Person",
      "name": "Dr. Parash Mani Shrestha"
    }
  };

  // Signal content freshness
  const publishedTime = "2025-05-28T13:30:00+05:45";

  // Control scroll to top button visibility
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical="/"
        publishedTime={publishedTime}
        structuredData={videoSchema}
      />
      <Header />
      <main className="overflow-hidden">
        {/* Critical above-the-fold content - loaded immediately */}
        <Hero />
        <Services />
        
        {/* Non-critical below-the-fold content - lazy loaded */}
        <Suspense fallback={<LoadingFallback />}>
          <ExpertisePreview />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <UrologyInfoPreview />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <BlogPreview />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <VideoSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <ContactPreview />
        </Suspense>
        
        {/* Scroll to top button */}
        <motion.button
          className="fixed bottom-8 right-8 p-3 rounded-full bg-doctor-blue text-white shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0, 
            scale: showScrollTop ? 1 : 0.8,
            pointerEvents: showScrollTop ? 'auto' : 'none'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      </main>
      <Footer />
    </>
  );
};

export default Index;
