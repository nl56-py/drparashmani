
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/lazy-image';
import { urologyConditions } from '@/data/urologyData';

const UrologyInfoPreview = () => {
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

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="section-container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            {language === 'en' ? "Health Information" : "स्वास्थ्य जानकारी"}
          </motion.span>
          
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-4 text-[#043c6d] ${language === 'np' ? 'nepali' : ''}`} 
            variants={itemVariants}
          >
            {language === 'en' ? 'Urology Health Information' : 'मूत्र रोग स्वास्थ्य जानकारी'}
          </motion.h2>
          
          <motion.p 
            className={`text-xl text-gray-600 ${language === 'np' ? 'nepali' : ''}`} 
            variants={itemVariants}
          >
            {language === 'en' 
              ? 'Learn about common urological conditions and treatments' 
              : 'सामान्य मूत्र रोग अवस्थाहरू र उपचारहरूको बारेमा जान्नुहोस्'}
          </motion.p>
        </motion.div>

        {/* Scrollable container for all urology info items */}
        <motion.div 
          className="relative mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {urologyConditions.map((item, index) => (
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
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm"
                        className="group/btn border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 w-full"
                      >
                        <Link to={`/urology-info/${item.id}`} className="flex items-center justify-center">
                          <span className={language === 'np' ? 'nepali' : ''}>
                            {language === 'en' ? 'Read More' : 'थप पढ्नुहोस्'}
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
              {Array.from({ length: Math.ceil(urologyConditions.length / 3) }).map((_, i) => (
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
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 group"
          >
            <Link to="/urology-info" className="flex items-center">
              <span className={language === 'np' ? 'nepali' : ''}>
                {language === 'en' ? 'View All Health Info' : 'सबै स्वास्थ्य जानकारी हेर्नुहोस्'}
              </span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default UrologyInfoPreview;
