import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, Calendar, Users, Award, Presentation, ArrowRight } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { useLecturesAbroad } from '@/hooks/useLecturesAbroad';

const LecturesAbroad = () => {
  const { language } = useLanguage();
  const { lectures, isLoading } = useLecturesAbroad();

  const recentLectures = lectures.filter(lecture => lecture.type === 'recent');
  const upcomingLectures = lectures.filter(lecture => lecture.type === 'upcoming');

  const getTitle = (lecture) => {
    return language === 'np' ? (lecture.title_np || lecture.title_en) : lecture.title_en;
  };

  const getLocation = (lecture) => {
    return language === 'np' ? (lecture.location_np || lecture.location_en) : lecture.location_en;
  };

  const getVenue = (lecture) => {
    return language === 'np' ? (lecture.venue_np || lecture.venue_en) : lecture.venue_en;
  };

  const getDate = (lecture) => {
    return language === 'np' ? (lecture.date_np || lecture.date_en) : lecture.date_en;
  };

  const getAudience = (lecture) => {
    return language === 'np' ? (lecture.audience_np || lecture.audience_en) : lecture.audience_en;
  };

  const getBadge = (lecture) => {
    return language === 'np' ? (lecture.badge_np || lecture.badge_en) : lecture.badge_en;
  };

  const getDescription = (lecture) => {
    return language === 'np' ? (lecture.description_np || lecture.description_en) : lecture.description_en;
  };

  // ... keep existing code (impactStats array)
  const impactStats = [
    {
      icon: <Globe className="h-8 w-8 text-doctor-blue" />,
      number: "15+",
      label: "Countries Visited",
      description: "Shared expertise across Asia and beyond"
    },
    {
      icon: <Users className="h-8 w-8 text-doctor-blue" />,
      number: "2000+",
      label: "Doctors Reached",
      description: "Direct impact through lectures and workshops"
    },
    {
      icon: <Presentation className="h-8 w-8 text-doctor-blue" />,
      number: "50+",
      label: "International Talks",
      description: "Knowledge sharing across borders"
    },
    {
      icon: <Award className="h-8 w-8 text-doctor-blue" />,
      number: "25+",
      label: "Recognition Awards",
      description: "International acknowledgment of contributions"
    }
  ];

  if (isLoading) {
    return (
      <>
        <SEOHead 
          title="Dr. Parash Mani Shrestha's International Lectures and Talks | Global Urology Education"
          description="Discover Dr. Parash Mani Shrestha's international lectures and talks in Bangladesh, Singapore, and other countries, sharing urological expertise globally."
          keywords="Dr Parash Mani Shrestha international lectures, urology talks Bangladesh Singapore, medical education abroad, urologist speaker"
          canonical="/lectures-abroad"
        />
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-8">Loading lectures...</div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Dr. Parash Mani Shrestha's International Lectures and Talks | Global Urology Education"
        description="Discover Dr. Parash Mani Shrestha's international lectures and talks in Bangladesh, Singapore, and other countries, sharing urological expertise globally."
        keywords="Dr Parash Mani Shrestha international lectures, urology talks Bangladesh Singapore, medical education abroad, urologist speaker"
        canonical="/lectures-abroad"
      />
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-doctor-blue-dark mb-4">
                Lectures and Talks Abroad
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sharing urological expertise and knowledge across international platforms, 
                fostering global collaboration in medical education and patient care
              </p>
            </div>

            {/* Impact Statistics */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {impactStats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-doctor-blue-dark mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-lg font-semibold text-doctor-blue mb-2">
                      {stat.label}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Lectures */}
            {recentLectures.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                  Recent International Lectures & Talks
                </h2>
                <div className="space-y-8">
                  {recentLectures.map((lecture) => (
                    <Card key={lecture.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        {lecture.lecture_images && lecture.lecture_images.length > 0 && (
                          <div className="md:w-1/3">
                            <LazyImage 
                              src={lecture.lecture_images[0].image_url}
                              alt={language === 'np' 
                                ? (lecture.lecture_images[0].alt_text_np || lecture.lecture_images[0].alt_text_en || getTitle(lecture))
                                : (lecture.lecture_images[0].alt_text_en || getTitle(lecture))
                              }
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                        )}
                        <div className={`${lecture.lecture_images && lecture.lecture_images.length > 0 ? 'md:w-2/3' : 'w-full'} p-6`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              {getBadge(lecture) && (
                                <Badge className="mb-2 bg-doctor-blue">
                                  {getBadge(lecture)}
                                </Badge>
                              )}
                              <h3 className="text-2xl font-bold text-doctor-blue-dark mb-2">
                                {getTitle(lecture)}
                              </h3>
                              <div className="flex items-center gap-4 text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{getLocation(lecture)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{getDate(lecture)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-gray-700 mb-2">
                              <strong>Venue:</strong> {getVenue(lecture)}
                            </p>
                            {getAudience(lecture) && (
                              <p className="text-gray-700 mb-4">
                                <strong>Audience:</strong> {getAudience(lecture)}
                              </p>
                            )}
                            {getDescription(lecture) && (
                              <p className="text-gray-700 mb-4 line-clamp-3">
                                {getDescription(lecture)}
                              </p>
                            )}
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {lecture.topics && lecture.topics.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-doctor-blue-dark mb-2">Topics Covered:</h4>
                                <ul className="space-y-1">
                                  {lecture.topics.slice(0, 3).map((topic, topicIndex) => (
                                    <li key={topicIndex} className="text-gray-700 text-sm">
                                      • {topic}
                                    </li>
                                  ))}
                                  {lecture.topics.length > 3 && (
                                    <li className="text-gray-500 text-sm italic">
                                      and {lecture.topics.length - 3} more...
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                            {lecture.highlights && lecture.highlights.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-doctor-blue-dark mb-2">Key Highlights:</h4>
                                <ul className="space-y-1">
                                  {lecture.highlights.slice(0, 3).map((highlight, highlightIndex) => (
                                    <li key={highlightIndex} className="text-gray-700 text-sm">
                                      • {highlight}
                                    </li>
                                  ))}
                                  {lecture.highlights.length > 3 && (
                                    <li className="text-gray-500 text-sm italic">
                                      and {lecture.highlights.length - 3} more...
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Know More Button */}
                          <div className="flex justify-end">
                            <Button asChild className="bg-doctor-blue hover:bg-doctor-blue-dark">
                              <Link to={`/lectures-abroad/${lecture.slug}`}>
                                Know More
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Engagements */}
            {upcomingLectures.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                  Upcoming International Engagements
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {upcomingLectures.map((engagement) => (
                    <Card key={engagement.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        {getBadge(engagement) && (
                          <Badge variant="outline" className="w-fit mb-2">
                            {getBadge(engagement)}
                          </Badge>
                        )}
                        <CardTitle className="text-lg text-doctor-blue-dark">
                          {getTitle(engagement)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{getLocation(engagement)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{getDate(engagement)}</span>
                          </div>
                        </div>
                        <Button asChild variant="outline" className="w-full">
                          <Link to={`/lectures-abroad/${engagement.slug}`}>
                            Learn More
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Show message if no lectures */}
            {lectures.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No lectures available at the moment.</p>
              </div>
            )}

            {/* Mission Statement */}
            <Card className="bg-gradient-to-r from-doctor-blue to-doctor-blue-dark text-white">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Global Mission in Medical Education
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  "Through international collaboration and knowledge sharing, we can elevate 
                  the standards of urological care not just in Nepal, but across the developing world. 
                  Every lecture, every workshop is an opportunity to save lives and improve outcomes."
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Globe className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Global Reach</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Knowledge Transfer</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <Award className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Excellence in Care</p>
                  </div>
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

export default LecturesAbroad;
