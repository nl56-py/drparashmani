
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Award } from 'lucide-react';

const Hero = () => {
  const { t, language } = useLanguage();

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const statsItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5
      }
    }
  };

  const statsItems = [
    { icon: <Calendar className="h-5 w-5 text-doctor-blue" />, value: "20+", label: language === 'en' ? "Years Experience" : "वर्षको अनुभव" },
    { icon: <Award className="h-5 w-5 text-doctor-blue" />, value: "5000+", label: language === 'en' ? "Successful Surgeries" : "सफल शल्यक्रियाहरू" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-[#e6f7ff] via-[#f0f9ff] to-white py-20 md:py-28 lg:py-32">      
      {/* Enhanced background elements */}
      <div className="absolute inset-0 opacity-20 z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="absolute w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,120,200,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-100 opacity-60 -z-10 blur-3xl"></div>
      <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-blue-200 opacity-40 -z-10 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-blue-50 opacity-60 -z-10 blur-3xl"></div>
      
      <div className="section-container relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-8 md:pt-16 pb-16 md:pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="order-2 md:order-1" variants={itemVariants}>
            <div className={language === 'np' ? 'nepali' : ''}>
              <motion.span 
                className="inline-block px-4 py-1 rounded-full bg-blue-100 text-doctor-blue-dark text-sm font-medium mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {language === 'en' ? "Nepal's Leading Urologist" : "नेपालका अग्रणी युरोलोजिस्ट "}
              </motion.span>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                variants={itemVariants}
              >
                {language === 'en' 
                  ? "Nepal's Leading Urologist & Senior Consultant Urosurgeon" 
                  : "नेपालका अग्रणी युरोलोजिस्ट र वरिष्ठ परामर्शदाता यूरोसर्जन"}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-700 mb-8"
                variants={itemVariants}
              >
                {language === 'en' 
                  ? "Dr. Parash Mani Shrestha, Senior Consultant Urosurgeon and Professor of Urology at Bir Hospital and Blue Cross Hospital, with over 20 years of experience." 
                  : "डा. पारस मणि श्रेष्ठ,वीर तथा ब्ल्रु क्रस अस्पतालका  वरिष्ठ परामर्शदाता युरोलोजिस्ट, यूरोसर्जन र प्रोफेसर हुन्, जसलाई २० वर्षभन्दा बढीको अनुभव छ।"}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-doctor-blue-dark hover:bg-doctor-blue transition-all duration-300 group"
                >
                  <Link to="/contact" className="flex items-center">
                    {language === 'en' ? "Book an Appointment" : "अपोइन्टमेन्ट बुक गर्नुहोस्"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-doctor-blue-dark text-doctor-blue-dark transition-all duration-300 hover:bg-doctor-blue-dark/5"
                >
                  <Link to="/expertise">
                    {language === 'en' ? "Areas of Expertise" : "विशेषज्ञताको क्षेत्रहरू"}
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Stats cards */}
            <motion.div 
              className="grid grid-cols-2 gap-2 mt-10"
              variants={statsVariants}
              initial="hidden"
              animate="visible"
            >
              {statsItems.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={statsItemVariants}
                  className="flex flex-col items-center justify-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2 rounded-full bg-blue-50 mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-lg font-bold text-doctor-blue-dark">{stat.value}</p>
                  <p className={`text-xs text-gray-600 text-center ${language === 'np' ? 'nepali' : ''}`}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            variants={imageVariants}
          >
            <div className="relative">
              {/* Main image with enhanced effects */}
              <motion.div 
                className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-doctor-blue-dark/30 z-10"></div>
                <img 
                  src="/lovable-uploads/5c81b557-5e86-4894-8135-0496808d13cf.png" 
                  alt="Dr. Parash Mani Shrestha - Nepal's Leading Urologist & Senior Consultant Urosurgeon"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-doctor-blue-light z-0"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border-8 border-[#e6f7ff] z-0"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              {/* Floating badge */}
              <motion.div 
                className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-doctor-blue rounded-md p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`font-medium ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? "Personalized Care" : "व्यक्तिगत स्याहार"}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced wave-like shape at the bottom with more modern styling */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 overflow-hidden z-0">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-auto"
        >
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,197.3C672,213,768,203,864,170.7C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
