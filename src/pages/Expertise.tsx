
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { expertiseData } from '@/data/expertiseData';
import { motion } from 'framer-motion';

const Expertise = () => {
  const { language } = useLanguage();
  
  const seoKeywordsEn = "urology expertise, kidney transplant Nepal, TURP procedure, urologic cancer treatment, Dr. Parash Mani Shrestha specialties, endourology, laparoscopic urosurgery";
  const seoKeywordsNp = "मूत्र रोग विशेषज्ञता, नेपाल मिर्गौला प्रत्यारोपण, TURP प्रक्रिया, मूत्र रोग क्यान्सर उपचार, डा. पारस मणि श्रेष्ठ विशेषताहरू, एन्डोयुरोलोजी, ल्यापारोस्कोपिक युरोसर्जरी";
  
  const seoDescription = language === 'en'
    ? "Explore Dr. Parash Mani Shrestha's areas of expertise including kidney transplantation, TURP procedures, urologic cancer treatments, endourology, and laparoscopic urosurgery in Nepal."
    : "डा. पारस मणि श्रेष्ठका विशेषज्ञता क्षेत्रहरू अन्वेषण गर्नुहोस् जसमा नेपालमा मिर्गौला प्रत्यारोपण, TURP प्रक्रियाहरू, मूत्र रोग क्यान्सर उपचारहरू, एन्डोयुरोलोजी, र ल्यापारोस्कोपिक युरोसर्जरी समावेश छन्।";

  // Expertise page specific schema
  const expertisePageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Areas of Expertise - Dr. Parash Mani Shrestha",
    "url": "https://drparashmani.com.np/expertise",
    "description": seoDescription,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": expertiseData.map((expertise, index) => ({
        "@type": "MedicalProcedure",
        "position": index + 1,
        "name": expertise.titleEn,
        "description": expertise.summaryEn,
        "url": `https://drparashmani.com.np/expertise/${expertise.id}`,
        "performer": {
          "@type": "Person",
          "@id": "https://drparashmani.com.np/#person"
        }
      }))
    }
  };

  const pageTitle = language === 'en' ? "Areas of Expertise" : "विशेषज्ञताको क्षेत्रहरू";
  const pageSubtitle = language === 'en' 
    ? "Dr. Parash Mani Shrestha's specialized urological services" 
    : "डा. पारस मणि श्रेष्ठका विशेष मूत्र रोग सेवाहरू";

  // Animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Function to get procedures performed and success rate stats
  const getDisplayStats = (stats) => {
    return stats.filter(stat => {
      const titleEn = stat.titleEn.toLowerCase();
      return titleEn.includes('procedure') || titleEn.includes('success rate') || 
             titleEn.includes('transplant') || titleEn.includes('treatment') || 
             titleEn.includes('surgeries');
    }).slice(0, 2); // Show max 2 stats
  };

  return (
    <>
      <SEOHead 
        title={pageTitle}
        description={seoDescription}
        keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
        canonical="/expertise"
        structuredData={expertisePageSchema}
      />
      <Header />
      <main>
        <section className="bg-gray-50 py-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="page-title text-center">
                <span className={language === 'np' ? 'nepali' : ''}>{pageTitle}</span>
              </h1>
              <p className="page-subtitle text-center mx-auto">
                <span className={language === 'np' ? 'nepali' : ''}>{pageSubtitle}</span>
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {expertiseData.map((expertise, index) => (
                <motion.div 
                  key={expertise.id} 
                  variants={cardVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img 
                          src={expertise.imageUrl} 
                          alt={language === 'en' ? expertise.titleEn : expertise.titleNp}
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-6">
                      <CardTitle className={`text-xl mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' ? expertise.titleEn : expertise.titleNp}
                      </CardTitle>
                      <CardDescription className={`text-base text-gray-700 ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' ? expertise.summaryEn : expertise.summaryNp}
                      </CardDescription>
                      
                      {expertise.stats && (
                        <div className="mt-4 grid grid-cols-1 gap-2">
                          {getDisplayStats(expertise.stats).map((stat, i) => (
                            <div key={i} className="text-center p-3 bg-gray-50 rounded-md">
                              <div className="flex items-center justify-center gap-2 mb-1">
                                {stat.icon && <span className="text-lg">{stat.icon}</span>}
                                <p className="text-lg font-bold text-doctor-blue-dark">
                                  {language === 'en' ? stat.valueEn : stat.valueNp}
                                </p>
                              </div>
                              <p className={`text-xs text-gray-600 ${language === 'np' ? 'nepali' : ''}`}>
                                {language === 'en' ? stat.titleEn : stat.titleNp}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/expertise/${expertise.id}`}>
                          {language === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Expertise;
