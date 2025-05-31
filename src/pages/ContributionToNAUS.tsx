
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Award, Users, GraduationCap, Target } from 'lucide-react';

const ContributionToNAUS = () => {
  const { t } = useLanguage();

  const positions = [
    {
      title: "Founding Member",
      period: "2005",
      description: "One of the founding members who established NAUS in 2005 with the vision to develop urological care and services in Nepal.",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Treasurer",
      description: "Managed financial resources and budget allocation for the association's activities and development programs.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Secretary",
      description: "Coordinated organizational activities, maintained records, and facilitated communication between members and stakeholders.",
      icon: <Award className="h-6 w-6" />
    },
    {
      title: "Vice President",
      description: "Assisted in strategic planning and policy formulation while supporting the President in organizational leadership.",
      icon: <GraduationCap className="h-6 w-6" />
    },
    {
      title: "President",
      period: "April 2025 - April 2027",
      description: "Leading the association with a vision to transform urological education and training in Nepal.",
      icon: <Award className="h-6 w-6" />,
      current: true
    }
  ];

  const majorContributions = [
    {
      title: "Training Platform Development",
      description: "Pioneered the development of comprehensive training platforms for complex urological surgeries in Nepal, reducing the need for doctors to travel abroad for specialized training.",
      impact: "Enabled local capacity building and reduced training costs for Nepali urologists"
    },
    {
      title: "Educational Infrastructure",
      description: "Established state-of-the-art training facilities and simulation centers for hands-on learning of advanced urological procedures.",
      impact: "Improved surgical skills and confidence among local urologists"
    },
    {
      title: "International Collaboration",
      description: "Facilitated partnerships with international urological societies and institutions to bring world-class training to Nepal.",
      impact: "Enhanced knowledge exchange and updated surgical techniques"
    },
    {
      title: "Research and Innovation",
      description: "Promoted research activities and clinical studies in urology, contributing to evidence-based practice in Nepal.",
      impact: "Advanced urological knowledge and improved patient outcomes"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Dr. Parash Mani Shrestha's Contribution to NAUS | Nepal Association of Urological Surgeons"
        description="Learn about Dr. Parash Mani Shrestha's significant contributions to NAUS as founding member, treasurer, secretary, vice president, and current president."
        keywords="NAUS, Nepal Association Urological Surgeons, Dr Parash Mani Shrestha, urologist Nepal, medical education Nepal"
        canonical="/contribution-to-naus"
      />
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-doctor-blue-dark mb-4">
                Contribution to NAUS
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dr. Parash Mani Shrestha's dedicated service to the Nepal Association of Urological Surgeons (NAUS) 
                and his transformative contributions to urological education in Nepal
              </p>
            </div>

            {/* About NAUS Section */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-doctor-blue" />
                  About Nepal Association of Urological Surgeons (NAUS)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The Nepal Association of Urological Surgeons (NAUS) was established in 2005 with the vision to develop 
                  urological care and services in Nepal. Founded by dedicated urologists including Dr. Parash Mani Shrestha, 
                  NAUS has been instrumental in advancing urological practice, education, and research in the country.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  NAUS became a member of the Urological Association of Asia (UAA) in 2005 and has been associated with 
                  educational initiatives including the Asian School of Urology (ASU). The association actively participates 
                  in international conferences and maintains strong bonds with urological societies globally.
                </p>
                <div className="pt-4">
                  <Button asChild variant="outline">
                    <a href="https://naus.org.np/about-naus/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Visit NAUS Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leadership Journey */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                Leadership Journey in NAUS
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {positions.map((position, index) => (
                  <Card key={index} className={`relative ${position.current ? 'ring-2 ring-doctor-blue' : ''}`}>
                    {position.current && (
                      <Badge className="absolute -top-2 -right-2 bg-doctor-blue">
                        Current
                      </Badge>
                    )}
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {position.icon}
                        <div>
                          <div className="text-lg">{position.title}</div>
                          {position.period && (
                            <div className="text-sm font-normal text-doctor-blue">
                              {position.period}
                            </div>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">
                        {position.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Major Contributions */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-doctor-blue-dark mb-8 text-center">
                Major Contributions to Urological Education
              </h2>
              <div className="space-y-6">
                {majorContributions.map((contribution, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl text-doctor-blue-dark">
                        {contribution.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {contribution.description}
                      </p>
                      <div className="bg-doctor-blue-light p-4 rounded-lg">
                        <p className="text-doctor-blue-dark font-medium">
                          <strong>Impact:</strong> {contribution.impact}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Vision Statement */}
            <Card className="bg-gradient-to-r from-doctor-blue to-doctor-blue-dark text-white">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Vision for Urological Education in Nepal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-lg leading-relaxed">
                  "To establish Nepal as a center of excellence for urological education and training, 
                  where Nepali doctors can receive world-class training without having to travel abroad."
                </p>
                <p className="text-doctor-blue-light">
                  - Dr. Parash Mani Shrestha, President, NAUS (2025-2027)
                </p>
              </CardContent>
            </Card>

          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ContributionToNAUS;
