
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { expertiseData } from '@/data/expertiseData';
import ExpertiseStats from '@/components/expertise/ExpertiseStats';
import { motion } from 'framer-motion';

const ExpertiseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  
  const expertise = expertiseData.find(item => item.id === slug);
  
  if (!expertise) {
    return (
      <>
        <Header />
        <div className="section-container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Expertise not found' : 'विशेषज्ञता फेला परेन'}
          </h1>
          <Button asChild>
            <Link to="/expertise">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'en' ? 'Back to Expertise' : 'विशेषज्ञतामा फिर्ता'}
            </Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }
  
  const title = language === 'en' ? expertise.titleEn : expertise.titleNp;
  const description = language === 'en' ? expertise.summaryEn : expertise.summaryNp;
  
  const seoKeywordsEn = `${expertise.titleEn}, Dr. Parash Mani Shrestha, urology Nepal, ${expertise.titleEn} specialist, ${expertise.titleEn} treatment Nepal`;
  const seoKeywordsNp = `${expertise.titleNp}, डा. पारस मणि श्रेष्ठ, नेपाल मूत्र रोग, ${expertise.titleNp} विशेषज्ञ, ${expertise.titleNp} उपचार नेपाल`;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
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
        canonical={`/expertise/${slug}`}
      />
      <Header />
      <main>
        <div className="bg-gray-50 py-16">
          <motion.div 
            className="section-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-8" variants={itemVariants}>
              <Button asChild variant="outline">
                <Link to="/expertise">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Back to Expertise' : 'विशेषज्ञतामा फिर्ता'}
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden"
              variants={itemVariants}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={expertise.imageUrl} 
                  alt={title}
                  className="w-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <motion.h1 
                  className={`text-3xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}
                  variants={itemVariants}
                >
                  {title}
                </motion.h1>
                
                <motion.p 
                  className={`text-xl text-gray-600 mb-8 ${language === 'np' ? 'nepali' : ''}`}
                  variants={itemVariants}
                >
                  {description}
                </motion.p>
                
                {expertise.stats && (
                  <ExpertiseStats stats={expertise.stats} />
                )}
                
                <motion.div 
                  className={`prose max-w-none ${language === 'np' ? 'nepali' : ''}`} 
                  dangerouslySetInnerHTML={{ 
                    __html: language === 'en' ? expertise.descriptionEn : expertise.descriptionNp 
                  }}
                  variants={itemVariants}
                />
                
                <motion.div className="mt-10 mb-10" variants={itemVariants}>
                  <h2 className={`text-2xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Key Benefits' : 'प्रमुख फाइदाहरू'}
                  </h2>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(language === 'en' ? expertise.benefitsEn : expertise.benefitsNp).map((benefit, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <span className="text-doctor-blue-dark mr-2 mt-1">✓</span>
                        <span className={`${language === 'np' ? 'nepali' : ''}`}>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="mt-12 bg-gray-50 p-6 rounded-lg"
                  variants={itemVariants}
                >
                  <h2 className={`text-2xl font-bold mb-6 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Frequently Asked Questions' : 'बारम्बार सोधिने प्रश्नहरू'}
                  </h2>
                  
                  <div className="space-y-6">
                    {(language === 'en' ? expertise.faqEn : expertise.faqNp).map((faq, index) => (
                      <motion.div 
                        key={index} 
                        className="border-b border-gray-200 pb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                      >
                        <h3 className={`text-lg font-medium mb-2 ${language === 'np' ? 'nepali' : ''}`}>
                          {faq.question}
                        </h3>
                        <p className={`text-gray-600 ${language === 'np' ? 'nepali' : ''}`}>
                          {faq.answer}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-10 text-center"
                  variants={itemVariants}
                >
                  <p className={`mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' 
                      ? 'Would you like to schedule a consultation with Dr. Shrestha?' 
                      : 'के तपाईं डा. श्रेष्ठसँग परामर्श तालिका बनाउन चाहनुहुन्छ?'
                    }
                  </p>
                  <Button asChild size="lg">
                    <Link to="/contact">
                      {language === 'en' ? 'Contact Now' : 'अहिले सम्पर्क गर्नुहोस्'}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExpertiseDetail;
