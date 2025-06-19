
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Clock, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import LazyImage from '@/components/ui/lazy-image';

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Navigation links with icons
  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.expertise'), href: '/expertise' },
    { label: t('nav.urology'), href: '/urology-info' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.videos'), href: '/videos' },
    { label: t('nav.contact'), href: '/contact' }
  ];

  const services = [
    { label: t('services.transplant'), href: '/expertise/kidney-transplant' },
    { label: t('services.turp'), href: '/expertise/turp' },
    { label: t('services.cancer'), href: '/expertise/cancer' },
    { label: t('services.consultation'), href: '/contact' },
  ];

  // Removed Bir Hospital, only keeping Blue Cross
  const location = { 
    name: t('contact.bluecross'),
    address: 'Tripureshwor, Kathmandu, Nepal',
    hours: language === 'en' ? 'Mon, Wed, Fri: 4pm-7pm' : 'सोमबार, बुधबार, शुक्रबार: दिउँसो ४ बजे - साँझ ७ बजे'
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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
    <footer className="relative bg-gradient-to-b from-gray-900 to-doctor-blue-dark text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10"></div>
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-doctor-blue/10 blur-3xl"></div>
      
      {/* Newsletter section */}
      <div className="relative bg-doctor-blue/20 backdrop-blur-sm border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <h3 className={`text-2xl font-bold mb-2 ${language === 'np' ? 'nepali' : ''}`}>
                {language === 'en' ? "Stay Updated on Medical Advancements" : "चिकित्सा प्रगतिमा अपडेट रहनुहोस्"}
              </h3>
              <p className={`text-gray-300 ${language === 'np' ? 'nepali' : ''}`}>
                {language === 'en' 
                  ? "Connect with Dr. Parash for the latest in urology care and treatments" 
                  : "मूत्ररोग सम्बन्धी उपचार र हेरचाहको बारेमा नवीनतम जानकारीको लागि डा पारसको सम्पर्कमा रहनुहोस्"}
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-start md:justify-end">
              <Button 
                asChild 
                className="bg-white text-doctor-blue-dark hover:bg-gray-100 group"
              >
                <Link to="/contact" className="flex items-center">
                  {language === 'en' ? "Book an Appointment" : "अपोइन्टमेन्ट बुक गर्नुहोस्"}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                <LazyImage
                  src="/lovable-uploads/5c81b557-5e86-4894-8135-0496808d13cf.png" 
                  alt="Dr. Parash Mani Shrestha"
                  className="h-full w-full object-cover"
                />
              </div>
              Dr. Parash Mani Shrestha
            </h2>
            
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="font-medium text-blue-300 mb-2">{location.name}</h3>
                <div className="flex items-start mb-2">
                  <MapPin className="mr-2 h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p>{location.address}</p>
                </div>
                <div className="flex items-start mb-2">
                  <Clock className="mr-2 h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className={`${language === 'np' ? 'nepali' : ''}`}>{location.hours}</p>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <Phone className="mr-2 h-5 w-5 text-gray-400 flex-shrink-0" />
                <p>+977-01-5319227, 01-5365927, 01-5369727, 01-5362027</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400 flex-shrink-0" />
                <p>drparas.uro@gmail.com</p>
              </div>
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-gray-400 flex-shrink-0" />
                <p>www.drparashmani.com.np</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h2 className={`text-xl font-bold mb-6 ${language === 'np' ? 'nepali' : ''}`}>
              {language === 'en' ? 'Quick Links' : 'द्रुत लिङ्कहरू'}
            </h2>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="hover:text-blue-300 transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-doctor-blue" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Medical Services */}
          <motion.div variants={itemVariants}>
            <h2 className={`text-xl font-bold mb-6 ${language === 'np' ? 'nepali' : ''}`}>
              {language === 'en' ? 'Medical Services' : 'चिकित्सा सेवाहरू'}
            </h2>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.href} 
                    className="hover:text-blue-300 transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-doctor-blue" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Media Links - Added to replace certifications */}
            <div className="mt-8">
              <h3 className={`text-lg font-medium mb-3 ${language === 'np' ? 'nepali' : ''}`}>
                {language === 'en' ? 'Connect With Us' : 'हामीसँग जोडिनुहोस्'}
              </h3>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/profile.php?id=61577077049747" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@Dr.ParashManiShresthaUrologist" className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom section with copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} Dr. Parash Mani Shrestha. {t('footer.rights')}.</p>
            </div>
            <div className="flex justify-start md:justify-end space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                About
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
              <Link to="/videos" className="text-gray-400 hover:text-white transition-colors text-sm">
                Videos
              </Link>
              <Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
