
import { supabase } from '@/integrations/supabase/client';
import { urologyConditions } from '@/data/urologyData';

interface SitemapData {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

interface VideoSitemapData {
  loc: string;
  video: {
    thumbnail_loc: string;
    title: string;
    description: string;
    content_loc?: string;
    player_loc?: string;
    duration?: string;
    publication_date?: string;
    family_friendly?: 'yes' | 'no';
    restriction?: string;
    gallery_loc?: string;
    price?: string;
    requires_subscription?: 'yes' | 'no';
    uploader?: string;
    platform?: string;
    live?: 'yes' | 'no';
  };
}

// Base URL for the website
const BASE_URL = 'https://drparashmani.com.np';

// Fetch blog posts for sitemap
export const fetchBlogPostsForSitemap = async (): Promise<SitemapData[]> => {
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at')
      .eq('published', true);
    
    if (error) {
      console.error('Error fetching blog posts for sitemap:', error);
      return [];
    }
    
    return posts.map(post => ({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: post.updated_at || post.created_at,
      changefreq: 'monthly' as const,
      priority: 0.7
    }));
  } catch (err) {
    console.error('Failed to fetch blog posts for sitemap:', err);
    return [];
  }
};

// Fetch videos for sitemap
export const fetchVideosForSitemap = async (): Promise<SitemapData[]> => {
  try {
    const { data: videos, error } = await supabase
      .from('videos')
      .select('slug, id, created_at')
      .not('slug', 'is', null);
    
    if (error) {
      console.error('Error fetching videos for sitemap:', error);
      return [];
    }
    
    return videos.map(video => ({
      loc: `${BASE_URL}/videos/${video.slug ? video.slug.trim() : video.id}`,
      lastmod: video.created_at,
      changefreq: 'monthly' as const,
      priority: 0.8
    }));
  } catch (err) {
    console.error('Failed to fetch videos for sitemap:', err);
    return [];
  }
};

// Fetch videos for video sitemap with detailed information
export const fetchVideosForVideoSitemap = async (): Promise<VideoSitemapData[]> => {
  try {
    const { data: videos, error } = await supabase
      .from('videos')
      .select('*');
    
    if (error) {
      console.error('Error fetching videos for video sitemap:', error);
      return [];
    }
    
    return videos.map(video => {
      const trimmedSlug = video.slug ? video.slug.trim() : null;
      const videoPath = trimmedSlug ? `/videos/${trimmedSlug}` : `/videos/${video.id}`;
      
      return {
        loc: `${BASE_URL}${videoPath}`,
        video: {
          thumbnail_loc: video.og_image_url || 'https://drparashmani.com.np/lovable-uploads/ec142a21-cb09-4e88-baf2-e729d0027613.png',
          title: video.seo_title_en || video.title_en || 'Dr. Parash Mani Shrestha Medical Video',
          description: video.seo_desc_en || video.description_en || 'Educational medical video by Dr. Parash Mani Shrestha',
          content_loc: video.embed_url?.trim() || '',
          publication_date: video.created_at ? new Date(video.created_at).toISOString() : new Date().toISOString(),
          family_friendly: 'yes',
          uploader: 'Dr. Parash Mani Shrestha',
          duration: '300', // Default 5 minutes, can be updated based on actual video duration
          requires_subscription: 'no',
          live: 'no'
        }
      };
    });
  } catch (err) {
    console.error('Failed to fetch videos for video sitemap:', err);
    return [];
  }
};

// Get actual urology condition URLs from urologyData
export const getUrologyConditionRoutes = (): SitemapData[] => {
  return urologyConditions.map(condition => ({
    loc: `${BASE_URL}/urology-info/${condition.id}`,
    lastmod: '2025-01-26',
    changefreq: 'monthly' as const,
    priority: 0.7
  }));
};

// Static routes for sitemap with realistic lastmod dates
export const getStaticRoutes = (): SitemapData[] => {
  return [
    // Main pages
    { 
      loc: BASE_URL, 
      lastmod: '2025-01-26', 
      changefreq: 'weekly', 
      priority: 1.0 
    },
    { 
      loc: `${BASE_URL}/about`, 
      lastmod: '2025-01-20', 
      changefreq: 'monthly', 
      priority: 0.9 
    },
    { 
      loc: `${BASE_URL}/contact`, 
      lastmod: '2025-01-22', 
      changefreq: 'monthly', 
      priority: 0.9 
    },
    
    // Main sections
    { 
      loc: `${BASE_URL}/expertise`, 
      lastmod: '2025-01-18', 
      changefreq: 'monthly', 
      priority: 0.9 
    },
    { 
      loc: `${BASE_URL}/urology-info`, 
      lastmod: '2025-01-19', 
      changefreq: 'monthly', 
      priority: 0.8 
    },
    { 
      loc: `${BASE_URL}/blog`, 
      lastmod: '2025-01-25', 
      changefreq: 'weekly', 
      priority: 0.8 
    },
    { 
      loc: `${BASE_URL}/videos`, 
      lastmod: '2025-01-25', 
      changefreq: 'weekly', 
      priority: 0.8 
    },
    
    // Language alternatives
    { 
      loc: `${BASE_URL}/?lang=en`, 
      lastmod: '2025-01-26', 
      changefreq: 'weekly', 
      priority: 0.9 
    },
    { 
      loc: `${BASE_URL}/?lang=np`, 
      lastmod: '2025-01-26', 
      changefreq: 'weekly', 
      priority: 0.9 
    },
  ];
};

// Generate video sitemap XML
export const generateVideoSitemapXML = async (): Promise<string> => {
  const videoData = await fetchVideosForVideoSitemap();
  
  if (videoData.length === 0) {
    return '';
  }
  
  const xmlParts: string[] = [];
  
  // XML declaration and namespace
  xmlParts.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlParts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  xmlParts.push('        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">');
  
  // Add each video URL
  videoData.forEach(item => {
    xmlParts.push('  <url>');
    xmlParts.push(`    <loc>${item.loc}</loc>`);
    xmlParts.push('    <video:video>');
    xmlParts.push(`      <video:thumbnail_loc>${item.video.thumbnail_loc}</video:thumbnail_loc>`);
    xmlParts.push(`      <video:title><![CDATA[${item.video.title}]]></video:title>`);
    xmlParts.push(`      <video:description><![CDATA[${item.video.description}]]></video:description>`);
    
    if (item.video.content_loc) {
      xmlParts.push(`      <video:content_loc>${item.video.content_loc}</video:content_loc>`);
    }
    
    if (item.video.publication_date) {
      xmlParts.push(`      <video:publication_date>${item.video.publication_date}</video:publication_date>`);
    }
    
    if (item.video.duration) {
      xmlParts.push(`      <video:duration>${item.video.duration}</video:duration>`);
    }
    
    xmlParts.push(`      <video:family_friendly>${item.video.family_friendly}</video:family_friendly>`);
    
    if (item.video.uploader) {
      xmlParts.push(`      <video:uploader><![CDATA[${item.video.uploader}]]></video:uploader>`);
    }
    
    xmlParts.push(`      <video:requires_subscription>${item.video.requires_subscription}</video:requires_subscription>`);
    xmlParts.push(`      <video:live>${item.video.live}</video:live>`);
    
    xmlParts.push('    </video:video>');
    xmlParts.push('  </url>');
  });
  
  xmlParts.push('</urlset>');
  
  return xmlParts.join('\n').trim();
};

// Generate full sitemap XML with proper formatting
export const generateSitemapXML = async (): Promise<string> => {
  const staticRoutes = getStaticRoutes();
  const blogPosts = await fetchBlogPostsForSitemap();
  const videos = await fetchVideosForSitemap();
  const urologyConditions = getUrologyConditionRoutes();
  
  const allRoutes = [...staticRoutes, ...blogPosts, ...videos, ...urologyConditions];
  
  // Build XML string without any leading whitespace
  const xmlParts: string[] = [];
  
  // XML declaration - no whitespace before
  xmlParts.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlParts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  
  // Add each URL
  allRoutes.forEach(route => {
    xmlParts.push('  <url>');
    xmlParts.push(`    <loc>${route.loc}</loc>`);
    
    if (route.lastmod) {
      const formattedDate = new Date(route.lastmod).toISOString().split('T')[0];
      xmlParts.push(`    <lastmod>${formattedDate}</lastmod>`);
    }
    
    if (route.changefreq) {
      xmlParts.push(`    <changefreq>${route.changefreq}</changefreq>`);
    }
    
    if (route.priority !== undefined) {
      xmlParts.push(`    <priority>${route.priority.toFixed(1)}</priority>`);
    }
    
    xmlParts.push('  </url>');
  });
  
  xmlParts.push('</urlset>');
  
  // Join with newlines and ensure no leading/trailing whitespace
  return xmlParts.join('\n').trim();
};

// Generate sitemap index that references both regular and video sitemaps
export const generateSitemapIndexXML = async (): Promise<string> => {
  const xmlParts: string[] = [];
  
  xmlParts.push('<?xml version="1.0" encoding="UTF-8"?>');
  xmlParts.push('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  
  // Regular sitemap
  xmlParts.push('  <sitemap>');
  xmlParts.push(`    <loc>${BASE_URL}/sitemap.xml</loc>`);
  xmlParts.push(`    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
  xmlParts.push('  </sitemap>');
  
  // Video sitemap
  const videoSitemap = await generateVideoSitemapXML();
  if (videoSitemap) {
    xmlParts.push('  <sitemap>');
    xmlParts.push(`    <loc>${BASE_URL}/video-sitemap.xml</loc>`);
    xmlParts.push(`    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
    xmlParts.push('  </sitemap>');
  }
  
  xmlParts.push('</sitemapindex>');
  
  return xmlParts.join('\n').trim();
};
