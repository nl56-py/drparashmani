
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const AboutPreview = () => {
  const { t, language } = useLanguage();

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
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className={`text-3xl md:text-4xl font-bold mb-6 text-[#043c6d] ${language === 'np' ? 'nepali' : ''}`}
              variants={itemVariants}
            >
              {language === 'en' 
                ? "We are always ensure best Medical treatment for Your Health" 
                : "हामी सधैं तपाईंको स्वास्थ्यको लागि उत्कृष्ट चिकित्सा उपचार सुनिश्चित गर्दछौं"}
            </motion.h2>
            
            <motion.p
              className={`text-lg text-gray-700 mb-6 ${language === 'np' ? 'nepali' : ''}`}
              variants={itemVariants}
            >
              {language === 'en' 
                ? "Dr. Parash Mani Shrestha is a Senior Consultant Urosurgeon and Professor of Urology at the National Academy of Medical Sciences, Bir Hospital with extensive expertise in Endourology, Laparoscopic Urosurgery, and Kidney transplant procedures."
                : "डा. पारस मणि श्रेष्ठ राष्ट्रिय चिकित्सा विज्ञान प्रतिष्ठान, बीर अस्पतालका वरिष्ठ परामर्शदाता यूरोसर्जन र प्रोफेसर अफ युरोलोजी हुन्, जसलाई एन्डोयुरोलोजी, ल्यापारोस्कोपिक यूरोसर्जरी र मिर्गौला प्रत्यारोपण प्रक्रियाहरूमा विशाल विशेषज्ञता छ।"}
            </motion.p>
            
            <motion.ul 
              className="mb-8 space-y-2 text-gray-700"
              variants={containerVariants}
            >
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="h-2 w-2 rounded-full bg-doctor-blue-dark mr-2"></span>
                <span className={language === 'np' ? 'nepali' : ''}>
                  {language === 'en' ? 'Professor of Urology at Bir Hospital' : 'बीर अस्पतालमा युरोलोजी प्रोफेसर'}
                </span>
              </motion.li>
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="h-2 w-2 rounded-full bg-doctor-blue-dark mr-2"></span>
                <span className={language === 'np' ? 'nepali' : ''}>
                  {language === 'en' ? 'President of Nepal Association of Urological Surgeons' : 'नेपाल एसोसिएशन अफ युरोलजिकल सर्जन्सका अध्यक्ष'}
                </span>
              </motion.li>
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="h-2 w-2 rounded-full bg-doctor-blue-dark mr-2"></span>
                <span className={language === 'np' ? 'nepali' : ''}>
                  {language === 'en' ? 'Expert in Kidney Stones, Prostate diseases, Bladder diseases' : 'मिर्गौला पथरी, प्रोस्टेट रोगहरू, मूत्राशय रोगहरूमा विशेषज्ञ'}
                </span>
              </motion.li>
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="h-2 w-2 rounded-full bg-doctor-blue-dark mr-2"></span>
                <span className={language === 'np' ? 'nepali' : ''}>
                  {language === 'en' ? 'Specialist in Kidney/Bladder/Prostate Cancer treatments' : 'मिर्गौला/मूत्राशय/प्रोस्टेट क्यान्सर उपचारमा विशेषज्ञ'}
                </span>
              </motion.li>
              <motion.li className="flex items-center" variants={itemVariants}>
                <span className="h-2 w-2 rounded-full bg-doctor-blue-dark mr-2"></span>
                <span className={language === 'np' ? 'nepali' : ''}>
                  {language === 'en' ? 'Main field of interest: Endourology, Laparoscopic Urosurgery, Kidney Transplant' : 'रुचिको मुख्य क्षेत्र: एन्डोयुरोलोजी, ल्यापारोस्कोपिक युरोसर्जरी, मिर्गौला प्रत्यारोपण'}
                </span>
              </motion.li>
            </motion.ul>

            <motion.div variants={itemVariants}>
              <Button asChild size="lg" className="bg-[#0096cc] hover:bg-[#007cb8] transition-all duration-300">
                <Link to="/contact">
                  {language === 'en' ? "MAKE AN APPOINTMENT" : "अपोइन्टमेन्ट बनाउनुहोस्"} 
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right side - Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <img 
                src="/lovable-uploads/5c81b557-5e86-4894-8135-0496808d13cf.png" 
                alt="Dr. Parash Mani Shrestha"
                className="w-full rounded-2xl shadow-xl"
              />
              
              <motion.div 
                className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 rounded-md p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">{language === 'en' ? "Regular Checkup" : "नियमित जाँच"}</span>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full border-8 border-[#e6f7ff] z-0"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#e6f7ff] z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
