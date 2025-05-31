
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
}

const LazyImage = ({
  src,
  alt,
  fallbackSrc = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
  className,
  containerClassName,
  sizes = '100vw',
  loading = 'lazy',
  ...props
}: LazyImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // Update source if prop changes
    if (src !== imgSrc) {
      setImgSrc(src);
      setIsLoaded(false);
      setHasError(false);
    }
  }, [src, imgSrc]);

  const handleError = () => {
    console.log('Image failed to load:', imgSrc);
    if (imgSrc !== fallbackSrc) {
      console.log('Using fallback image:', fallbackSrc);
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    console.log('Image loaded successfully:', imgSrc);
    setIsLoaded(true);
  };

  // Ensure alt text is meaningful
  const safeAlt = alt || 'Image';

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-slate-100', 
        containerClassName
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-doctor-blue border-t-transparent"></div>
        </div>
      )}
      <img
        src={imgSrc}
        alt={safeAlt}
        loading={loading}
        sizes={sizes}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
