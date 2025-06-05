
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
  if (cleanUrl.includes('youtube.com/watch') || cleanUrl.includes('www.youtube.com/watch')) {
    try {
      const urlObj = new URL(cleanUrl);
      const videoId = urlObj.searchParams.get('v');
      return videoId;
    } catch (e) {
      // Try regex fallback for malformed URLs
      const match = cleanUrl.match(/[?&]v=([^&]+)/);
      return match ? match[1] : null;
    }
  }
  
  // Handle YouTube shortened URLs
  else if (cleanUrl.includes('youtu.be/')) {
    try {
      const videoId = cleanUrl.split('youtu.be/')[1].split('?')[0].split('&')[0];
      return videoId;
    } catch (e) {
      console.error('Invalid YouTube URL:', e);
      return null;
    }
  }
  
  // Handle YouTube embed URLs
  else if (cleanUrl.includes('youtube.com/embed/')) {
    try {
      const videoId = cleanUrl.split('youtube.com/embed/')[1].split('?')[0].split('&')[0];
      return videoId;
    } catch (e) {
      console.error('Invalid YouTube URL:', e);
      return null;
    }
  }
  
  // Handle direct video ID (11 characters)
  else if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }
  
  return null;
};

/**
 * Get YouTube thumbnail with different qualities and fallbacks
 */
export const getYouTubeThumbnail = (
  url: string,
  quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'
): string => {
  const videoId = getYouTubeVideoId(url);
  
  if (videoId) {
    // Return the requested quality thumbnail
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }
  
  // Return a data URL placeholder if no video ID found
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGJ4Zj4KPHA+PHBhdGggZD0ibTkgMTIgOC00djh6Ci8+CjwvcD4KPC9ib3g+Cjwvc3ZnPgo8L3N2Zz4K';
};

/**
 * Get multiple YouTube thumbnail URLs for fallback - start with guaranteed ones
 */
export const getYouTubeThumbnailWithFallbacks = (url: string): string[] => {
  const videoId = getYouTubeVideoId(url);
  
  if (videoId) {
    // Start with thumbnails that always exist, then try higher quality ones
    return [
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, // Always exists, good quality
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, // Usually exists, higher quality
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, // May not exist, highest quality
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, // Always exists, medium quality
      `https://img.youtube.com/vi/${videoId}/default.jpg`, // Always exists, low quality
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGJ4Zj4KPHA+PHBhdGggZD0ibTkgMTIgOC00djh6Ci8+CjwvcD4KPC9ib3g+Cjwvc3ZnPgo8L3N2Zz4K'
    ];
  }
  
  return ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDY0MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iMzYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiM5Q0E0QUIiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGJ4Zj4KPHA+PHBhdGggZD0ibTkgMTIgOC00djh6Ci8+CjwvcD4KPC9ib3g+Cjwvc3ZnPgo8L3N2Zz4K'];
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
