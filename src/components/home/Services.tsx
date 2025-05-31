
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pill, Stethoscope, ActivitySquare, Search, Heart, CalendarClock } from 'lucide-react';

const Services = () => {
  const { t, language } = useLanguage();
  
  const services = [
    {
      title: t('services.transplant'),
      icon: <Pill className="h-8 w-8 text-white" />,
      link: '/expertise/kidney-transplant',
      color: 'bg-[#0096cc]'
    },
    {
      title: t('services.turp'),
      icon: <Stethoscope className="h-8 w-8 text-white" />,
      link: '/expertise/turp',
      color: 'bg-[#16a1d0]'
    },
    {
      title: t('services.cancer'),
      icon: <Heart className="h-8 w-8 text-white" />,
      link: '/expertise/cancer',
      color: 'bg-[#0caada]'
    },
    {
      title: t('services.consultation'),
      icon: <CalendarClock className="h-8 w-8 text-white" />,
      link: '/contact',
      color: 'bg-[#27b5e1]'
    },
    {
      title: language === 'en' ? 'Research & Test' : 'अनुसन्धान र परीक्षण',
      icon: <Search className="h-8 w-8 text-white" />,
      link: '/expertise',
      color: 'bg-[#39bde6]'
    },
    {
      title: language === 'en' ? 'Special Care' : 'विशेष हेरचाह',
      icon: <ActivitySquare className="h-8 w-8 text-white" />,
      link: '/expertise',
      color: 'bg-[#4bc6eb]'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#f8fcff]">
      <div className="section-container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            <span className={language === 'np' ? 'nepali' : ''}>
              {language === 'en' ? "Health service for you" : "तपाईंको लागि स्वास्थ्य सेवा"}
            </span>
          </h2>
          <p className={`text-gray-600 ${language === 'np' ? 'nepali' : ''}`}>
            {language === 'en' 
              ? "We are always here to listening and understanding" 
              : "हामी सधैं सुन्न र बुझ्नको लागि यहाँ छौं"}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <Link to={service.link} className="block">
                <div className="flex flex-col items-center text-center">
                  <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-3 shadow-md`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-sm font-medium ${language === 'np' ? 'nepali' : ''}`}>
                    {service.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
