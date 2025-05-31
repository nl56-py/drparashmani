
import React, { useEffect, useState } from 'react';
import { generateSitemapXML, generateVideoSitemapXML, generateSitemapIndexXML } from '@/utils/sitemapGenerator';

const Sitemap = () => {
  const [sitemap, setSitemap] = useState<string>('');
  const [videoSitemap, setVideoSitemap] = useState<string>('');
  const [sitemapIndex, setSitemapIndex] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'regular' | 'video' | 'index'>('regular');

  useEffect(() => {
    const fetchAllSitemaps = async () => {
      try {
        setIsGenerating(true);
        setError('');
        
        // Generate all sitemaps
        const [regularXml, videoXml, indexXml] = await Promise.all([
          generateSitemapXML(),
          generateVideoSitemapXML(),
          generateSitemapIndexXML()
        ]);
        
        setSitemap(regularXml.trim());
        setVideoSitemap(videoXml.trim());
        setSitemapIndex(indexXml.trim());
        
      } catch (err) {
        console.error('Error generating sitemaps:', err);
        setError('Failed to generate sitemaps');
      } finally {
        setIsGenerating(false);
      }
    };

    fetchAllSitemaps();
  }, []);

  const handleDownload = (content: string, filename: string) => {
    if (!content) return;
    
    const blob = new Blob([content], { 
      type: 'application/xml;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  };

  const handlePreview = (content: string, title: string) => {
    if (!content) return;
    
    const blob = new Blob([content], { 
      type: 'application/xml;charset=utf-8' 
    });
    const url = URL.createObjectURL(blob);
    
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.document.title = title;
    }
    
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'video': return videoSitemap;
      case 'index': return sitemapIndex;
      default: return sitemap;
    }
  };

  const getCurrentFilename = () => {
    switch (activeTab) {
      case 'video': return 'video-sitemap.xml';
      case 'index': return 'sitemap-index.xml';
      default: return 'sitemap.xml';
    }
  };

  const getCurrentTitle = () => {
    switch (activeTab) {
      case 'video': return 'Video Sitemap XML Preview';
      case 'index': return 'Sitemap Index XML Preview';
      default: return 'Sitemap XML Preview';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-4xl w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sitemap XML Generator</h1>
        
        {isGenerating ? (
          <div>
            <p className="mb-4">Generating your sitemaps...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <div>
            <p className="mb-6">Your sitemaps have been generated successfully!</p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-6 border-b">
              <button
                onClick={() => setActiveTab('regular')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'regular' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Regular Sitemap
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'video' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Video Sitemap
              </button>
              <button
                onClick={() => setActiveTab('index')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'index' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sitemap Index
              </button>
            </div>

            {/* Content Display */}
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <p className="text-sm text-green-600 font-medium">✓ {getCurrentTitle().replace(' Preview', '')} generated successfully</p>
              <p className="text-xs text-gray-500 mt-1">
                {activeTab === 'regular' && `Generated ${sitemap.split('<url>').length - 1} URLs`}
                {activeTab === 'video' && videoSitemap && `Generated ${videoSitemap.split('<video:video>').length - 1} video entries`}
                {activeTab === 'video' && !videoSitemap && 'No videos found'}
                {activeTab === 'index' && `Generated sitemap index with ${sitemapIndex.split('<sitemap>').length - 1} sitemaps`}
              </p>
              
              <div className="flex gap-2 mt-4 justify-center">
                <button
                  onClick={() => handlePreview(getCurrentContent(), getCurrentTitle())}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  disabled={!getCurrentContent()}
                >
                  Preview XML
                </button>
                <button
                  onClick={() => handleDownload(getCurrentContent(), getCurrentFilename())}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  disabled={!getCurrentContent()}
                >
                  Download XML
                </button>
              </div>
              
              {getCurrentContent() && (
                <div className="mt-4 p-2 bg-white border rounded text-xs text-left">
                  <p className="font-mono text-gray-600 overflow-x-auto">
                    {getCurrentContent().substring(0, 200)}...
                  </p>
                </div>
              )}
            </div>

            {/* Download All Button */}
            <div className="mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  handleDownload(sitemap, 'sitemap.xml');
                  if (videoSitemap) {
                    setTimeout(() => handleDownload(videoSitemap, 'video-sitemap.xml'), 500);
                  }
                  setTimeout(() => handleDownload(sitemapIndex, 'sitemap-index.xml'), 1000);
                }}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
              >
                Download All Sitemaps
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Downloads all generated sitemaps including video sitemap and sitemap index
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sitemap;
