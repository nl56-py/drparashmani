
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, ChevronRight } from 'lucide-react';
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
  published: boolean;
  // SEO fields
  seo_title_en: string | null;
  seo_title_np: string | null;
  seo_desc_en: string | null;
  seo_desc_np: string | null;
  seo_keywords_en: string | null;
  seo_keywords_np: string | null;
}

const BlogPreview = () => {
  const { t, language } = useLanguage();
  const [dbBlogPosts, setDbBlogPosts] = useState<DBBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchBlogsFromDB = async () => {
      setIsLoading(true);
      try {
        // Explicitly specify the columns we need to avoid ambiguous column references
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id, 
            slug, 
            created_at, 
            image_url,
            og_image_url,
            author, 
            excerpt_np, 
            published, 
            excerpt_en, 
            content_np, 
            content_en, 
            title_np, 
            title_en,
            seo_title_en,
            seo_title_np,
            seo_desc_en,
            seo_desc_np,
            seo_keywords_en,
            seo_keywords_np
          `)
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching blogs from database:', error);
          setError('Failed to load blog preview');
        } else if (data) {
          setDbBlogPosts(data as DBBlogPost[]);
        }
      } catch (err) {
        console.error('Exception fetching blogs:', err);
        setError('Failed to load blog preview');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogsFromDB();
  }, []);
  
  // Get all preview blogs
  const previewBlogs = dbBlogPosts.map(post => ({
    id: post.id,
    title: language === 'en' 
      ? (post.seo_title_en || post.title_en) 
      : (post.seo_title_np || post.title_np),
    date: new Date(post.created_at).toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP'),
    image: post.image_url || post.og_image_url || 'https://images.unsplash.com/photo-1551076805-e1869033e561',
    link: `/blog/${post.slug}`,
    summary: language === 'en' 
      ? (post.seo_desc_en || post.excerpt_en) 
      : (post.seo_desc_np || post.excerpt_np)
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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
      <section className="bg-[#f7fafd] py-16 md:py-24">
        <div className="section-container flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-doctor-blue" />
        </div>
      </section>
    );
  }

  // If there are no blog posts, don't show the blog preview section at all
  if (dbBlogPosts.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f7fafd] py-16 md:py-24">
      <div className="section-container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-4 text-[#043c6d] ${language === 'np' ? 'nepali' : ''}`} 
            variants={itemVariants}
          >
            {t('blog.section.title')}
          </motion.h2>
          <motion.p 
            className={`text-xl text-gray-600 ${language === 'np' ? 'nepali' : ''}`} 
            variants={itemVariants}
          >
            {t('blog.section.subtitle')}
          </motion.p>
        </motion.div>
        
        {/* Scrollable container for all blog posts */}
        <motion.div 
          className="relative mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {previewBlogs.map((blog, index) => (
                <motion.div 
                  key={`${blog.id}-${index}`} 
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                  className="w-80 flex-shrink-0"
                >
                  <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-500 group">
                    <div className="h-52 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="pt-6 flex-grow">
                      <div className="mb-2">
                        <span className="text-[#0096cc] text-sm">{blog.date}</span>
                      </div>
                      <h3 className={`${language === 'np' ? 'nepali' : ''} text-xl font-bold mb-3 line-clamp-2`}>
                        {blog.title}
                      </h3>
                      <p className={`text-gray-600 line-clamp-3 ${language === 'np' ? 'nepali' : ''}`}>
                        {blog.summary.length > 100 ? blog.summary.substring(0, 100) + '...' : blog.summary}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm"
                        className="group/btn border-[#0096cc] text-[#0096cc] hover:bg-[#0096cc] hover:text-white transition-all duration-300 w-full"
                      >
                        <Link to={blog.link} className="flex items-center justify-center">
                          <span className={language === 'np' ? 'nepali' : ''}>
                            {t('blog.read.more')}
                          </span>
                          <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-all duration-300" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(previewBlogs.length / 3) }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-[#0096cc] text-[#0096cc] hover:bg-[#0096cc] hover:text-white transition-all duration-300 group"
          >
            <Link to="/blog" className="flex items-center">
              <span className={language === 'np' ? 'nepali' : ''}>
                {t('blog.view.all')}
              </span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
