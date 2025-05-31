
import React, { useState, useEffect } from 'react';
import { Play, Video } from 'lucide-react';
import { getYouTubeThumbnail, getEmbedUrl } from '@/utils/imageOptimization';
import LazyImage from './lazy-image';

interface VideoPlayerProps {
  embedUrl: string;
  title: string;
  thumbnailUrl?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  embedUrl,
  title,
  thumbnailUrl,
  aspectRatio = 'video',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Clean URL by trimming whitespace
  const cleanUrl = embedUrl.trim();
  
  // Get thumbnail from YouTube if not provided
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  
  useEffect(() => {
    // Set the thumbnail
    if (thumbnailUrl) {
      setThumbnail(thumbnailUrl);
    } else {
      const youtubeThumb = getYouTubeThumbnail(cleanUrl);
      setThumbnail(youtubeThumb);
    }
  }, [thumbnailUrl, cleanUrl]);
  
  // Convert to proper embed URL if needed
  const processedEmbedUrl = getEmbedUrl(cleanUrl);
  
  // Calculate aspect ratio class
  const aspectRatioClass = aspectRatio === 'square' 
    ? 'aspect-square' 
    : aspectRatio === 'portrait' 
      ? 'aspect-[3/4]' 
      : 'aspect-video';

  // Handle iframe errors
  const handleIframeError = () => {
    setError("Failed to load the video. Please try again later.");
    setIsPlaying(false);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${aspectRatioClass} ${className}`}>
      {!isPlaying ? (
        <>
          <LazyImage
            src={thumbnail || 'https://via.placeholder.com/640x360?text=Video+Thumbnail'}
            alt={`Video thumbnail: ${title}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            containerClassName="w-full h-full"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300"
            onClick={() => setIsPlaying(true)}
          >
            <div className="bg-doctor-blue bg-opacity-80 rounded-full p-4 transform transition-transform duration-300 hover:scale-110">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
          {error && (
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm">
              {error}
            </div>
          )}
        </>
      ) : (
        <>
          <iframe
            src={`${processedEmbedUrl}${processedEmbedUrl.includes('?') ? '&' : '?'}autoplay=1`}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleIframeError}
          />
          {error && (
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm">
              {error}
              <button 
                className="underline ml-2 font-bold"
                onClick={() => {
                  setError(null);
                  setIsPlaying(false);
                }}
              >
                Retry
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
