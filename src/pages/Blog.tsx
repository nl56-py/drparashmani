
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface DBBlogPost {
  id: string;
  title_en: string;
  title_np: string;
  excerpt_en: string;
  excerpt_np: string;
  content_en: string;
  content_np: string;
  slug: string;
  image_url: string | null;
  og_image_url: string | null;
  author: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
  // SEO fields
  seo_title_en: string | null;
  seo_title_np: string | null;
  seo_desc_en: string | null;
  seo_desc_np: string | null;
  seo_keywords_en: string | null;
  seo_keywords_np: string | null;
}

const Blog = () => {
  const { t, language } = useLanguage();
  const [dbBlogPosts, setDbBlogPosts] = useState<DBBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const seoKeywordsEn = "urology blog, kidney health articles, prostate cancer information, Dr. Parash Mani Shrestha blog, urology Nepal";
  const seoKeywordsNp = "मूत्ररोग ब्लग, मिर्गौला स्वास्थ्य लेख, प्रोस्टेट क्यान्सर जानकारी, डा. पारस मणि श्रेष्ठ ब्लग, मूत्ररोग नेपाल";

  const seoDescription = language === 'en'
    ? "Read insightful articles on urology, kidney health, prostate cancer, and more by Dr. Parash Mani Shrestha, a leading urologist in Nepal."
    : "नेपालका अग्रणी मूत्ररोग विशेषज्ञ डा. पारस मणि श्रेष्ठद्वारा मूत्ररोग, मिर्गौला स्वास्थ्य, प्रोस्टेट क्यान्सर, र थप बारेमा जानकारीमूलक लेखहरू पढ्नुहोस्।";

  const pageTitle = language === 'en' ? "Urology Blog" : "मूत्ररोग ब्लग";

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": language === 'en' ? "Dr. Parash Mani Shrestha's Urology Blog" : "डा. पारस मणि श्रेष्ठको मूत्ररोग ब्लग",
    "description": seoDescription,
    "author": {
      "@type": "Person",
      "name": "Dr. Parash Mani Shrestha",
      "jobTitle": "Urologist",
      "url": "https://drparashmani.com.np/about"
    },
    "url": "https://drparashmani.com.np/blog",
    "keywords": language === 'en' ? seoKeywordsEn : seoKeywordsNp
  };

  useEffect(() => {
    const fetchBlogsFromDB = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching blogs from database:', error);
          setError('Failed to load blogs');
        } else {
          console.log('Blogs from database:', data);
          setDbBlogPosts(data);
        }
      } catch (err) {
        console.error('Exception fetching blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogsFromDB();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    }
  };

  if (isLoading) {
    return (
      <>
        <SEOHead
          title={pageTitle}
          description={seoDescription}
          keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
          canonical="/blog"
          structuredData={blogJsonLd}
        />
        <Header />
        <main className="flex-grow">
          <section className="bg-gray-50 py-20">
            <div className="section-container">
              <div className="text-center">
                <h1 className="page-title">
                  <span className={language === 'np' ? 'nepali' : ''}>{pageTitle}</span>
                </h1>
                <p className="page-subtitle">
                  <span className={language === 'np' ? 'nepali' : ''}>{seoDescription}</span>
                </p>
                <Loader2 className="h-8 w-8 animate-spin text-doctor-blue mx-auto mt-8" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEOHead
          title={pageTitle}
          description={seoDescription}
          keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
          canonical="/blog"
          structuredData={blogJsonLd}
        />
        <Header />
        <main className="flex-grow">
          <section className="bg-gray-50 py-20">
            <div className="section-container">
              <div className="text-center">
                <h1 className="page-title">
                  <span className={language === 'np' ? 'nepali' : ''}>{pageTitle}</span>
                </h1>
                <p className="page-subtitle">
                  <span className={language === 'np' ? 'nepali' : ''}>{seoDescription}</span>
                </p>
                <p className="text-red-500 mt-8">{error}</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Show a message if no blogs are available
  if (dbBlogPosts.length === 0) {
    return (
      <>
        <SEOHead
          title={pageTitle}
          description={seoDescription}
          keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
          canonical="/blog"
          structuredData={blogJsonLd}
        />
        <Header />
        <main className="flex-grow">
          <section className="bg-gray-50 py-20">
            <div className="section-container">
              <div className="text-center">
                <h1 className="page-title">
                  <span className={language === 'np' ? 'nepali' : ''}>{pageTitle}</span>
                </h1>
                <p className="page-subtitle">
                  <span className={language === 'np' ? 'nepali' : ''}>{seoDescription}</span>
                </p>
                <p className="text-gray-500 mt-8">
                  {language === 'en' 
                    ? "No blog posts available at the moment. Please check back later." 
                    : "हाल कुनै ब्लग पोस्टहरू उपलब्ध छैनन्। कृपया पछि फेरि जाँच गर्नुहोस्।"}
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title={pageTitle}
        description={seoDescription}
        keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
        canonical="/blog"
        structuredData={blogJsonLd}
      />
      <Header />
      <main className="flex-grow">
        <section className="bg-gray-50 py-16">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="page-title">
                <span className={language === 'np' ? 'nepali' : ''}>{pageTitle}</span>
              </h1>
              <p className="page-subtitle">
                <span className={language === 'np' ? 'nepali' : ''}>{seoDescription}</span>
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {dbBlogPosts.map((post) => {
                // Normalize data structure for blog posts
                const normalizedPost = {
                  id: post.id,
                  title: language === 'en' 
                    ? (post.seo_title_en || post.title_en) 
                    : (post.seo_title_np || post.title_np),
                  summary: language === 'en' 
                    ? (post.seo_desc_en || post.excerpt_en) 
                    : (post.seo_desc_np || post.excerpt_np),
                  slug: post.slug,
                  imageUrl: post.image_url || post.og_image_url || 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
                  date: new Date(post.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP'),
                  author: post.author || 'Dr. Parash Mani Shrestha'
                };

                return (
                  <motion.div
                    key={normalizedPost.id}
                    variants={itemVariants}
                    className="w-full"
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="h-52 overflow-hidden">
                        <img
                          src={normalizedPost.imageUrl}
                          alt={normalizedPost.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                      </div>
                      <CardContent className="pt-6 flex-grow">
                        <div className="mb-2">
                          <span className="text-[#0096cc] text-sm">{normalizedPost.date}</span>
                        </div>
                        <h3 className={`${language === 'np' ? 'nepali' : ''} text-xl font-bold mb-3`}>
                          {normalizedPost.title}
                        </h3>
                        <CardDescription className={`text-gray-600 line-clamp-2 ${language === 'np' ? 'nepali' : ''}`}>
                          {normalizedPost.summary.length > 100 ? normalizedPost.summary.substring(0, 100) + '...' : normalizedPost.summary}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button asChild variant="link" className="p-0 text-[#0096cc] hover:text-[#007cb8]">
                          <Link to={`/blog/${normalizedPost.slug}`}>
                            {t('blog.read.more')} →
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
