
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { expertiseData } from '@/data/expertiseData';
import LazyImage from '@/components/ui/lazy-image';

const ExpertisePreview = () => {
  const { language } = useLanguage();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  // Function to get procedures performed and success rate stats
  const getPreviewStats = (stats) => {
    return stats.filter(stat => {
      const titleEn = stat.titleEn.toLowerCase();
      return titleEn.includes('procedure') || titleEn.includes('success rate') || 
             titleEn.includes('transplant') || titleEn.includes('treatment') || 
             titleEn.includes('surgeries');
    }).slice(0, 2); // Show max 2 stats for preview
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="section-container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-blue-50 text-doctor-blue text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {language === 'en' ? "Our Expertise" : "हाम्रो विशेषज्ञता"}
          </motion.span>
          
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-4 text-[#043c6d] ${language === 'np' ? 'nepali' : ''}`} 
            variants={itemVariants}
          >
            {language === 'en' ? 'Areas of Medical Expertise' : 'चिकित्सा विशेषज्ञताका क्षेत्रहरू'}
          </motion.h2>
          
          <motion.p 
            className={`text-xl text-gray-600 ${language === 'np' ? 'nepali' : ''}`} 
            variants={itemVariants}
          >
            {language === 'en' 
              ? 'Comprehensive urological care with advanced treatment options' 
              : 'उन्नत उपचार विकल्पहरूसहित व्यापक मूत्र रोग हेरचाह'}
          </motion.p>
        </motion.div>

        {/* Scrollable container for all expertise items */}
        <motion.div 
          className="relative mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {expertiseData.map((item, index) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                  className="w-80 flex-shrink-0"
                >
                  <Card className="overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 h-full group">
                    <div className="aspect-[4/3] overflow-hidden">
                      <LazyImage
                        src={item.imageUrl}
                        alt={language === 'en' ? item.titleEn : item.titleNp}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className={`text-lg font-bold mb-3 text-doctor-blue-dark group-hover:text-doctor-blue transition-colors ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' ? item.titleEn : item.titleNp}
                      </h3>
                      <p className={`text-gray-600 text-sm mb-4 line-clamp-3 ${language === 'np' ? 'nepali' : ''}`}>
                        {language === 'en' ? item.summaryEn : item.summaryNp}
                      </p>
                      
                      {/* Stats for preview */}
                      {item.stats && (
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          {getPreviewStats(item.stats).map((stat, i) => (
                            <div key={i} className="text-center p-2 bg-gray-50 rounded-md">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                {stat.icon && <span className="text-sm">{stat.icon}</span>}
                                <p className="text-sm font-bold text-doctor-blue-dark">
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
                      
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm"
                        className="group/btn border-doctor-blue text-doctor-blue hover:bg-doctor-blue hover:text-white transition-all duration-300 w-full"
                      >
                        <Link to={`/expertise/${item.id}`} className="flex items-center justify-center">
                          <span className={language === 'np' ? 'nepali' : ''}>
                            {language === 'en' ? 'Learn More' : 'थप जान्नुहोस्'}
                          </span>
                          <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-all duration-300" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(expertiseData.length / 3) }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-doctor-blue hover:bg-doctor-blue-dark transition-all duration-300 group"
          >
            <Link to="/expertise" className="flex items-center">
              <span className={language === 'np' ? 'nepali' : ''}>
                {language === 'en' ? 'View All Expertise' : 'सबै विशेषज्ञताहरू हेर्नुहोस्'}
              </span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertisePreview;
