
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { getResponsiveSizes, generateAltText } from '@/utils/imageOptimization';

// Update the blog post interface to include all required fields
interface BlogPost {
  id: string;
  slug: string;
  title_en: string;
  title_np: string;
  content_en: string;
  content_np: string;
  excerpt_en: string;
  excerpt_np: string;
  author: string | null;
  image_url: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string | null;
  published: boolean;
  seo_title_en: string | null;
  seo_title_np: string | null;
  seo_desc_en: string | null;
  seo_desc_np: string | null;
  seo_keywords_en: string | null;
  seo_keywords_np: string | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const defaultKeywordsEn = 'best urologist in Kathmandu, kidney stone surgeon Nepal, urologic cancer treatment Kathmandu, prostate treatment Nepal, urology specialist Kathmandu';
  const defaultKeywordsNp = 'काठमाडौंमा उत्तम मूत्ररोग विशेषज्ञ, नेपालमा मिर्गौला पथरी शल्यचिकित्सक, काठमाडौंमा मूत्ररोग क्यान्सर उपचार, नेपालमा प्रोस्टेट उपचार, काठमाडौंमा मूत्ररोग विशेषज्ञ';

  useEffect(() => {
    const fetchBlogPost = async () => {
      setIsLoading(true);
      
      try {
        // Try to get from Supabase
        if (slug) {
          const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .eq('published', true)
            .single();
          
          if (error) {
            console.error('Error fetching blog post from Supabase:', error);
            setError('Blog post not found');
          } else if (data) {
            setPost(data);
          } else {
            setError('Blog post not found');
          }
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Exception in fetchBlogPost:', err);
        setError('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  // Create structured data for the blog post
  const createBlogPostingSchema = () => {
    if (!post) return null;
    
    const blogTitle = language === 'en' 
      ? (post.seo_title_en || post.title_en) 
      : (post.seo_title_np || post.title_np);
      
    const blogDescription = language === 'en' 
      ? (post.seo_desc_en || post.excerpt_en) 
      : (post.seo_desc_np || post.excerpt_np);
      
    const blogKeywords = language === 'en'
      ? (post.seo_keywords_en || defaultKeywordsEn)
      : (post.seo_keywords_np || defaultKeywordsNp);
      
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogTitle,
      "description": blogDescription,
      "author": {
        "@type": "Person",
        "name": post.author || "Dr. Parash Mani Shrestha"
      },
      "datePublished": post.created_at,
      "dateModified": post.updated_at || post.created_at,
      "image": post.og_image_url || post.image_url || "https://images.unsplash.com/photo-1551076805-e1869033e561",
      "keywords": blogKeywords,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://drparashmani.com.np/blog/${post.slug}`
      }
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (post) {
    const title = language === 'en' 
      ? (post.seo_title_en || post.title_en) 
      : (post.seo_title_np || post.title_np);
    
    const description = language === 'en' 
      ? (post.seo_desc_en || post.excerpt_en) 
      : (post.seo_desc_np || post.excerpt_np);
      
    const keywords = language === 'en'
      ? (post.seo_keywords_en || defaultKeywordsEn)
      : (post.seo_keywords_np || defaultKeywordsNp);

    // Get the best available image for OG
    const ogImage = post.og_image_url || post.image_url;
    const postImage = post.image_url || post.og_image_url;

    return (
      <>
        <SEOHead 
          title={title}
          description={description}
          keywords={keywords}
          ogImage={ogImage || undefined}
          canonical={`/blog/${post.slug}`}
          publishedTime={post.created_at}
          author={post.author || "Dr. Parash Mani Shrestha"}
          structuredData={createBlogPostingSchema()}
        />

        <Header />
        <main className="bg-white py-12 lg:py-24">
          <div className="section-container">
            <article className="blog-content">
              <header className="mb-8">
                <h1 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                  {language === 'en' ? post.title_en : post.title_np}
                </h1>
                <div className="text-gray-600 flex items-center justify-between">
                  <span className={`inline-flex items-center ${language === 'np' ? 'nepali' : ''}`}>
                    {post.author || "Dr. Parash Mani Shrestha"}
                  </span>
                  <span>{new Date(post.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP')}</span>
                </div>
              </header>
              
              {postImage && (
                <div className="mb-8">
                  <LazyImage 
                    src={postImage} 
                    alt={generateAltText(language === 'en' ? post.title_en : post.title_np, 'blog')} 
                    className="w-full rounded-lg shadow-md" 
                    sizes={getResponsiveSizes('blog')}
                  />
                </div>
              )}
              
              <div dangerouslySetInnerHTML={{
                __html: language === 'en' ? post.content_en : post.content_np
              }} className={language === 'np' ? 'nepali' : ''} />
            </article>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen text-gray-500">
      <p>Loading blog post...</p>
    </div>
  );
};

export default BlogPost;
