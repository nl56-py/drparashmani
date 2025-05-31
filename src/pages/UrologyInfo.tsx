
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { urologyConditions } from '@/data/urologyData';
import { motion } from 'framer-motion';

const UrologyInfo = () => {
  const { t, language } = useLanguage();
  
  const seoKeywordsEn = "urology information, urological conditions, kidney stones, BPH, UTI, prostate diseases, bladder diseases, urological diseases, urology treatments Nepal, Dr. Parash Mani Shrestha";
  const seoKeywordsNp = "मूत्र रोग जानकारी, मूत्र रोग अवस्थाहरू, मिर्गौलामा पत्थरी, BPH, UTI, प्रोस्टेट रोगहरू, मूत्राशय रोगहरू, मूत्र रोग, मूत्र रोग उपचार नेपाल, डा. पारस मणि श्रेष्ठ";
  
  const seoDescription = language === 'en'
    ? "Comprehensive information about common urological conditions, their symptoms, causes, diagnosis, and treatment options by Dr. Parash Mani Shrestha."
    : "डा. पारस मणि श्रेष्ठद्वारा सामान्य मूत्र रोग अवस्थाहरू, तिनीहरूका लक्षणहरू, कारणहरू, निदान, र उपचार विकल्पहरूको बारेमा विस्तृत जानकारी।";

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <SEOHead 
        title={t('urology.title')}
        description={seoDescription}
        keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
        canonical="/urology-info"
        ogImage="https://images.unsplash.com/photo-1579684385127-1ef15d508118"
      />
      <Header />
      <main>
        <section className="bg-gray-50 py-16">
          <div className="section-container">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h1 className="page-title">
                <span className={language === 'np' ? 'nepali' : ''}>{t('urology.title')}</span>
              </h1>
              <p className="page-subtitle">
                <span className={language === 'np' ? 'nepali' : ''}>{t('urology.subtitle')}</span>
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {urologyConditions.map((condition, index) => (
                <motion.div key={condition.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="h-48 overflow-hidden rounded-t-lg">
                        <img 
                          src={condition.imageUrl} 
                          alt={language === 'en' ? condition.titleEn : condition.titleNp}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-6">
                      <CardTitle className={`text-xl mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' ? condition.titleEn : condition.titleNp}
                      </CardTitle>
                      <CardDescription className={`text-base text-gray-700 ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' ? condition.summaryEn : condition.summaryNp}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/urology-info/${condition.id}`}>
                          <span className={language === 'np' ? 'nepali' : ''}>
                            {t('urology.learnMore')}
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Common Urological Conditions Section */}
            <motion.div 
              className="mt-16 bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className={`text-2xl font-bold mb-6 text-center ${language === 'np' ? 'nepali' : ''}`}>
                {language === 'en' ? 'Common Urological Conditions' : 'सामान्य मूत्ररोग अवस्थाहरू'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className={`text-xl font-bold mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Kidney Stones' : 'मिर्गौला पथरी'}
                  </h3>
                  <p className={`mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' 
                      ? "Solid crystals that form in the kidneys from minerals in urine. Dr. Shrestha offers advanced treatment options including ESWL, ureteroscopy, and PCNL." 
                      : "मूत्रमा खनिजहरूबाट मिर्गौलामा बन्ने ठोस क्रिस्टलहरू। डा. श्रेष्ठले ESWL, युरेटरोस्कोपी, र PCNL सहित उन्नत उपचार विकल्पहरू प्रदान गर्नुहुन्छ।"}
                  </p>
                  <Button asChild size="sm">
                    <Link to="/expertise/kidney-stones">
                      {language === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className={`text-xl font-bold mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Benign Prostatic Hyperplasia (BPH)' : 'सौम्य प्रोस्टेटिक हाइपरप्लासिया (BPH)'}
                  </h3>
                  <p className={`mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' 
                      ? "Non-cancerous enlargement of the prostate gland causing urinary symptoms. Dr. Shrestha specializes in TURP and other minimally invasive treatments." 
                      : "मूत्र लक्षणहरू निम्त्याउने प्रोस्टेट ग्रन्थिको गैर-क्यान्सरयुक्त वृद्धि। डा. श्रेष्ठ TURP र अन्य न्यूनतम आक्रामक उपचारहरूमा विशेषज्ञता राख्नुहुन्छ।"}
                  </p>
                  <Button asChild size="sm">
                    <Link to="/urology-info/benign-prostatic-hyperplasia">
                      {language === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className={`text-xl font-bold mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Urological Cancers' : 'मूत्ररोग क्यान्सरहरू'}
                  </h3>
                  <p className={`mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' 
                      ? "Cancers affecting the urinary system including kidney, bladder, and prostate. Dr. Shrestha provides comprehensive cancer care with a multidisciplinary approach." 
                      : "मिर्गौला, मूत्राशय, र प्रोस्टेट सहित मूत्र प्रणालीलाई प्रभावित गर्ने क्यान्सरहरू। डा. श्रेष्ठले बहु-विषयक दृष्टिकोणका साथ व्यापक क्यान्सर हेरचाह प्रदान गर्नुहुन्छ।"}
                  </p>
                  <Button asChild size="sm">
                    <Link to="/expertise/cancer">
                      {language === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className={`text-xl font-bold mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Urinary Tract Infections' : 'मूत्र पथ संक्रमणहरू'}
                  </h3>
                  <p className={`mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' 
                      ? "Bacterial infections affecting any part of the urinary system. Dr. Shrestha provides accurate diagnosis and effective treatment for both simple and complex UTIs." 
                      : "मूत्र प्रणालीको कुनै पनि भागलाई प्रभावित गर्ने ब्याक्टेरियल संक्रमणहरू। डा. श्रेष्ठले साधारण र जटिल दुवै UTIs को लागि सटीक निदान र प्रभावकारी उपचार प्रदान गर्नुहुन्छ।"}
                  </p>
                  <Button asChild size="sm">
                    <Link to="/urology-info/urinary-tract-infection">
                      {language === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Doctor's Image - Dr. Parash Mani Shrestha */}
            <motion.div 
              className="mt-16 bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <motion.img 
                    src="/lovable-uploads/051b28c5-e590-4744-8f66-d1f622b4884d.png" 
                    alt="Dr. Parash Mani Shrestha" 
                    className="rounded-lg shadow mx-auto max-w-[240px]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <h2 className={`text-2xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' 
                      ? "Dr. Parash Mani Shrestha - Nepal's Leading Urologist & Urosurgeon" 
                      : "डा. पारस मणि श्रेष्ठ - नेपालका अग्रणी मूत्र रोग विशेषज्ञ र युरोसर्जन"}
                  </h2>
                  <p className={`text-gray-700 mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en'
                      ? "Dr. Shrestha provides comprehensive diagnosis and treatment for all urological conditions. With over 20 years of experience and specialized training, he offers the latest and most effective treatment options for kidney stones, prostate diseases, bladder conditions, and urological cancers in Nepal."
                      : "डा. श्रेष्ठले सबै मूत्र रोग अवस्थाहरूको लागि व्यापक निदान र उपचार प्रदान गर्नुहुन्छ। २० वर्षभन्दा बढीको अनुभव र विशेष तालिमका साथ, उहाँले नेपालमा मिर्गौला पथरी, प्रोस्टेट रोगहरू, मूत्राशय अवस्थाहरू, र मूत्ररोग क्यान्सरहरूको लागि नवीनतम र सबैभन्दा प्रभावकारी उपचार विकल्पहरू प्रदान गर्नुहुन्छ।"
                    }
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to="/about">
                        {language === 'en' ? 'About Dr. Shrestha' : 'डा. श्रेष्ठको बारेमा'}
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/contact">
                        {language === 'en' ? 'Book Consultation' : 'परामर्श बुक गर्नुहोस्'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UrologyInfo;
