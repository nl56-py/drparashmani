
/**
 * Utility functions for image optimization
 */

/**
 * Generates responsive image sizes attribute for different viewport widths
 */
export const getResponsiveSizes = (type: 'thumbnail' | 'hero' | 'blog' = 'thumbnail'): string => {
  switch (type) {
    case 'hero':
      return '(min-width: 1280px) 1200px, (min-width: 768px) 800px, 100vw';
    case 'blog':
      return '(min-width: 1280px) 800px, (min-width: 768px) 600px, 100vw';
    case 'thumbnail':
    default:
      return '(min-width: 1280px) 400px, (min-width: 768px) 300px, 100vw';
  }
};

/**
 * Generates alt text for images when none is provided
 */
export const generateAltText = (title: string, context: 'video' | 'blog' = 'blog'): string => {
  return `${context === 'video' ? 'Video' : 'Blog post'}: ${title}`;
};

/**
 * Process YouTube URL to get video ID
 * Handles various YouTube URL formats and cleans up the input
 */
export const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Clean the URL
  const cleanUrl = url.trim();
  
  // Handle YouTube watch URLs
  if (cleanUrl.includes('youtube.com/watch')) {
    try {
      const videoId = new URL(cleanUrl).searchParams.get('v');
      return videoId;
    } catch (e) {
      console.error('Invalid YouTube URL:', e);
      return null;
    }
  }
  
  // Handle YouTube shortened URLs
  else if (cleanUrl.includes('youtu.be/')) {
    try {
      const videoId = cleanUrl.split('youtu.be/')[1].split('?')[0];
      return videoId;
    } catch (e) {
      console.error('Invalid YouTube URL:', e);
      return null;
    }
  }
  
  // Handle YouTube embed URLs
  else if (cleanUrl.includes('youtube.com/embed/')) {
    try {
      const videoId = cleanUrl.split('youtube.com/embed/')[1].split('?')[0].trim();
      return videoId;
    } catch (e) {
      console.error('Invalid YouTube URL:', e);
      return null;
    }
  }
  
  return null;
};

/**
 * Get YouTube thumbnail with different qualities
 * Tries multiple thumbnail qualities in case one fails
 */
export const getYouTubeThumbnail = (
  url: string,
  quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'maxresdefault'
): string => {
  const videoId = getYouTubeVideoId(url);
  
  if (videoId) {
    // Return the requested quality
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }
  
  return 'https://via.placeholder.com/640x360?text=Video+Thumbnail';
};

/**
 * Convert YouTube URL to embed URL with parameters
 */
export const getEmbedUrl = (url: string): string => {
  const videoId = getYouTubeVideoId(url);
  
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1`;
  }
  
  // If not a recognized YouTube URL format, return as is
  return url.trim();
};
