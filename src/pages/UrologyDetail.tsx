
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { urologyConditions } from '@/data/urologyData';
import { motion } from 'framer-motion';

const UrologyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  
  const condition = urologyConditions.find(item => item.id === slug);
  
  if (!condition) {
    return (
      <>
        <Header />
        <div className="section-container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Condition not found' : 'अवस्था फेला परेन'}
          </h1>
          <Button asChild>
            <Link to="/urology-info">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Back to Urology Information' : 'मूत्र रोग जानकारीमा फिर्ता'}
            </Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }
  
  const title = language === 'en' ? condition.titleEn : condition.titleNp;
  const description = language === 'en' ? condition.summaryEn : condition.summaryNp;
  const symptoms = language === 'en' ? condition.symptomsEn : condition.symptomsNp;
  
  const seoKeywordsEn = `${condition.titleEn}, ${condition.titleEn} treatment Nepal, ${condition.titleEn} symptoms, ${condition.titleEn} causes, Dr. Parash Mani Shrestha, urosurgeon Nepal`;
  const seoKeywordsNp = `${condition.titleNp}, ${condition.titleNp} उपचार नेपाल, ${condition.titleNp} लक्षणहरू, ${condition.titleNp} कारणहरू, डा. पारस मणि श्रेष्ठ, युरोसर्जन नेपाल`;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  return (
    <>
      <SEOHead 
        title={title}
        description={description}
        keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
        canonical={`/urology-info/${slug}`}
        ogImage={condition.imageUrl}
      />
      <Header />
      <main>
        <div className="bg-gray-50 py-16">
          <div className="section-container">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button asChild variant="outline">
                <Link to="/urology-info">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Back to Urology Information' : 'मूत्र रोग जानकारीमा फिर्ता'}
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="h-64 overflow-hidden">
                <motion.img 
                  src={condition.imageUrl} 
                  alt={title}
                  className="w-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              
              <div className="p-8">
                <motion.h1 
                  className={`text-3xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  {title}
                </motion.h1>
                
                <motion.p 
                  className={`text-xl text-gray-600 mb-8 ${language === 'np' ? 'nepali' : ''}`}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  {description}
                </motion.p>
                
                {/* Symptoms Section */}
                <motion.div 
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                >
                  <h2 className={`text-2xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('section.symptoms')}
                  </h2>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {symptoms.map((symptom, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <span className="text-doctor-blue-dark mr-2 mt-1">•</span>
                        <span className={`${language === 'np' ? 'nepali' : ''}`}>{symptom}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                {/* Causes Section */}
                <motion.div 
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <h2 className={`text-2xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('section.causes')}
                  </h2>
                  
                  <div className={`prose max-w-none ${language === 'np' ? 'nepali' : ''}`} 
                    dangerouslySetInnerHTML={{ 
                      __html: language === 'en' ? condition.causesEn : condition.causesNp 
                    }} 
                  />
                </motion.div>
                
                {/* Diagnosis Section */}
                <motion.div 
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                >
                  <h2 className={`text-2xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('section.diagnosis')}
                  </h2>
                  
                  <div className={`prose max-w-none ${language === 'np' ? 'nepali' : ''}`} 
                    dangerouslySetInnerHTML={{ 
                      __html: language === 'en' ? condition.diagnosisEn : condition.diagnosisNp 
                    }} 
                  />
                </motion.div>
                
                {/* Treatment Section */}
                <motion.div 
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                >
                  <h2 className={`text-2xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('section.treatment')}
                  </h2>
                  
                  <div className={`prose max-w-none ${language === 'np' ? 'nepali' : ''}`} 
                    dangerouslySetInnerHTML={{ 
                      __html: language === 'en' ? condition.treatmentEn : condition.treatmentNp 
                    }} 
                  />
                </motion.div>
                
                {/* Prevention Section */}
                <motion.div 
                  className="mb-12"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.7 }}
                >
                  <h2 className={`text-2xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('section.prevention')}
                  </h2>
                  
                  <div className={`prose max-w-none ${language === 'np' ? 'nepali' : ''}`} 
                    dangerouslySetInnerHTML={{ 
                      __html: language === 'en' ? condition.preventionEn : condition.preventionNp 
                    }} 
                  />
                </motion.div>
                
                {/* Consult Section */}
                <motion.div 
                  className="mt-10 text-center bg-gray-50 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className={`text-xl mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' 
                      ? "Do you have symptoms of this condition? Consult with Dr. Parash Mani Shrestha" 
                      : "के तपाईंसँग यस अवस्थाका लक्षणहरू छन्? डा. पारस मणि श्रेष्ठसँग परामर्श गर्नुहोस्"
                    }
                  </p>
                  <Button asChild size="lg">
                    <Link to="/contact">
                      {language === 'en' ? 'Book Consultation' : 'परामर्श बुक गर्नुहोस्'}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UrologyDetail;
