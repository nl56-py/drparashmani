
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Award, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import LazyImage from '@/components/ui/lazy-image';
import { useLecturesAbroad, LectureAbroadWithImages } from '@/hooks/useLecturesAbroad';

const LectureDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { getLectureBySlug } = useLecturesAbroad();
  const [lecture, setLecture] = useState<LectureAbroadWithImages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchLecture = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setNotFound(false);
        console.log('Fetching lecture with slug:', slug);
        
        const data = await getLectureBySlug(slug);
        console.log('Lecture data received:', data);
        
        if (data) {
          setLecture(data);
        } else {
          console.log('No lecture found for slug:', slug);
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching lecture:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLecture();
  }, [slug, getLectureBySlug]);

  // Show loading state
  if (isLoading) {
    return (
      <>
        <SEOHead 
          title="Loading Lecture Details | Dr. Parash Mani Shrestha"
          description="Loading lecture details..."
          canonical={`/lectures-abroad/${slug}`}
        />
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-doctor-blue border-t-transparent mx-auto mb-4"></div>
                <p>Loading lecture details...</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  // Show 404 if not found
  if (notFound || !lecture) {
    return <Navigate to="/lectures-abroad" replace />;
  }

  const getTitle = () => {
    return language === 'np' ? (lecture.title_np || lecture.title_en) : lecture.title_en;
  };

  const getLocation = () => {
    return language === 'np' ? (lecture.location_np || lecture.location_en) : lecture.location_en;
  };

  const getVenue = () => {
    return language === 'np' ? (lecture.venue_np || lecture.venue_en) : lecture.venue_en;
  };

  const getDate = () => {
    return language === 'np' ? (lecture.date_np || lecture.date_en) : lecture.date_en;
  };

  const getAudience = () => {
    return language === 'np' ? (lecture.audience_np || lecture.audience_en) : lecture.audience_en;
  };

  const getBadge = () => {
    return language === 'np' ? (lecture.badge_np || lecture.badge_en) : lecture.badge_en;
  };

  const getDescription = () => {
    return language === 'np' ? (lecture.description_np || lecture.description_en) : lecture.description_en;
  };

  return (
    <>
      <SEOHead 
        title={`${getTitle()} | Dr. Parash Mani Shrestha's International Lectures`}
        description={getDescription() || `Detailed information about Dr. Parash Mani Shrestha's lecture: ${getTitle()}`}
        canonical={`/lectures-abroad/${slug}`}
      />
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="mb-4"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Lectures
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Header Card */}
                <Card>
                  <CardHeader>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          {getBadge() && (
                            <Badge className="bg-doctor-blue">{getBadge()}</Badge>
                          )}
                          <Badge variant={lecture.type === 'recent' ? 'default' : 'secondary'}>
                            {lecture.type}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-3xl text-doctor-blue-dark">
                        {getTitle()}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-doctor-blue flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-gray-600">{getLocation()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-doctor-blue flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Date</p>
                          <p className="text-gray-600">{getDate()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-doctor-blue flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Venue</p>
                          <p className="text-gray-600">{getVenue()}</p>
                        </div>
                      </div>

                      {getAudience() && (
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-doctor-blue flex-shrink-0" />
                          <div>
                            <p className="font-semibold">Audience</p>
                            <p className="text-gray-600">{getAudience()}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {getDescription() && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-doctor-blue-dark">Description</h3>
                        <p className="text-gray-700 leading-relaxed">{getDescription()}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Topics and Highlights */}
                <div className="grid md:grid-cols-2 gap-6">
                  {lecture.topics && lecture.topics.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-doctor-blue-dark">Topics Covered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {lecture.topics.map((topic, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-2 h-2 bg-doctor-blue rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {lecture.highlights && lecture.highlights.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-doctor-blue-dark">Key Highlights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {lecture.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Sidebar - Images */}
              <div className="lg:col-span-1">
                {lecture.lecture_images && lecture.lecture_images.length > 0 && (
                  <Card className="sticky top-8">
                    <CardHeader>
                      <CardTitle className="text-doctor-blue-dark">
                        Gallery ({lecture.lecture_images.length} image{lecture.lecture_images.length !== 1 ? 's' : ''})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Carousel className="w-full">
                        <CarouselContent>
                          {lecture.lecture_images.map((image) => (
                            <CarouselItem key={image.id}>
                              <div className="space-y-3">
                                <LazyImage 
                                  src={image.image_url} 
                                  alt={language === 'np' ? (image.alt_text_np || image.alt_text_en || getTitle()) : (image.alt_text_en || getTitle())}
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                                {(image.alt_text_en || image.alt_text_np) && (
                                  <p className="text-sm text-gray-600 text-center">
                                    {language === 'np' ? (image.alt_text_np || image.alt_text_en) : image.alt_text_en}
                                  </p>
                                )}
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {lecture.lecture_images.length > 1 && (
                          <>
                            <CarouselPrevious />
                            <CarouselNext />
                          </>
                        )}
                      </Carousel>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Metadata */}
            <Card className="mt-8 bg-gray-50">
              <CardContent className="pt-6">
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Created: {new Date(lecture.created_at).toLocaleString()}</p>
                  {lecture.updated_at && (
                    <p>Updated: {new Date(lecture.updated_at).toLocaleString()}</p>
                  )}
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default LectureDetail;
