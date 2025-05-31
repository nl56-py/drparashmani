
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface StatItemProps {
  title: string;
  value: string;
  icon?: string;
  index: number;
}

const StatItem = ({ title, value, icon, index }: StatItemProps) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <h3 className="text-4xl font-bold text-doctor-blue-dark mb-2">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </motion.div>
  );
};

interface ExpertiseStatsProps {
  stats: {
    titleEn: string;
    titleNp: string;
    valueEn: string;
    valueNp: string;
    icon?: string;
  }[];
}

const ExpertiseStats = ({ stats }: ExpertiseStatsProps) => {
  const { language } = useLanguage();

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <div className="my-12">
      <h2 className={`text-2xl font-bold mb-6 text-center ${language === 'np' ? 'nepali' : ''}`}>
        {language === 'en' ? 'Key Statistics' : 'प्रमुख तथ्याङ्कहरू'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatItem 
            key={index}
            title={language === 'en' ? stat.titleEn : stat.titleNp}
            value={language === 'en' ? stat.valueEn : stat.valueNp}
            icon={stat.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpertiseStats;
