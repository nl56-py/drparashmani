import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, Mail, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPreview = () => {
  const { t, language } = useLanguage();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  const locations = [
    {
      id: 'bir',
      name: t('contact.bir'),
      address: language === 'en' ? 'Mahaboudha, Kathmandu, Nepal' : 'महाबौद्ध, काठमाडौं, नेपाल',
      phone: '+977-01-4221119',
      hours: language === 'en' ? 'Sunday-Thursday: OT, Friday: OPD, 9:00 AM - 4:00 PM' : 'आइतबार-बिहीबार: OT, शुक्रबार: OPD, ९:०० बिहान - ४:०० दिउँसो',
      website: 'https://www.birhospital.gov.np',
      message: language === 'en'
        ? 'For OPD appointments, visit Birhospitals website for online booking or contact the hospital directly.'
        : 'OPD अपोइन्टमेन्टको लागि, अनलाइन बुकिंगको लागि वीर हस्पिटल वेबसाइटबाट गर्नुहोस् वा अस्पताललाई सीधा सम्पर्क गर्नुहोस्।',
      showAppointmentButton: false
    },
    {
      id: 'bluecross',
      name: t('contact.bluecross'),
      address: language === 'en' ? 'Tripureshwor, Kathmandu, Nepal' : 'त्रिपुरेश्वर, काठमाडौं, नेपाल',
      phone: '+977-01-5319227, 01-5365927, 01-5369727, 01-5362027',
      hours: language === 'en' ? 'Sunday-Friday: Morning: 8:00-8:30 AM, Evening: 4:00 PM onwards' : 'आइतवार-शुक्रबार: बिहान: ८:००-८:३० बजे, साँझ: ४:०० बजेदेखि',
      showAppointmentButton: true
    }
  ];

  return (
    <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f8fcff] via-white to-[#f0f9ff] z-0"></div>
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-50 opacity-70 blur-3xl z-0"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-blue-100 opacity-50 blur-3xl z-0"></div>

      <div className="section-container relative z-10">
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
            {language === 'en' ? "Contact Us" : "हामीलाई सम्पर्क गर्नुहोस्"}
          </motion.span>

          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-4 text-[#043c6d] ${language === 'np' ? 'nepali' : ''}`}
            variants={itemVariants}
          >
            {t('contact.section.title')}
          </motion.h2>

          <motion.p
            className={`text-xl text-gray-600 mb-4 ${language === 'np' ? 'nepali' : ''}`}
            variants={itemVariants}
          >
            {language === 'en'
              ? 'Get in touch for consultations and appointments'
              : 'परामर्श र अपोइन्टमेन्टको लागि सम्पर्कमा रहनुहोस्'}
          </motion.p>
        </motion.div>

        {/* Hospital locations */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {locations.map((location) => (
            <motion.div
              key={location.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              className="h-full"
            >
              <Card className="overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                <div className="h-48 bg-gray-100 relative">
                  {location.id === 'bluecross' && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7629654778916!2d85.31262417546692!3d27.693720076190328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ad6162bbcd%3A0x6fb6e054397de851!2sBlue%20Cross%20Hospital!5e0!3m2!1sen!2snp!4v1748157835253!5m2!1sen!2snp"
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map to Blue Cross Hospital"
                    ></iframe>
                  )}
                  {location.id === 'bir' && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3786598510765!2d85.31079752455129!3d27.70559267557057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fffc37200b%3A0xfcc471d3e99106bc!2sBir%20Hospital!5e0!3m2!1sen!2snp!4v1748157975868!5m2!1sen!2snp"
                      className="w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map to Bir Hospital"
                    ></iframe>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className={`text-xl font-bold mb-4 text-doctor-blue-dark ${language === 'np' ? 'nepali' : ''}`}>
                    {location.name}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#0096cc] mr-3 mt-0.5 flex-shrink-0" />
                      <span className={language === 'np' ? 'nepali' : ''}>
                        {location.address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#0096cc] mr-3 flex-shrink-0" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-[#0096cc] mr-3 flex-shrink-0" />
                      <span className={language === 'np' ? 'nepali' : ''}>
                        {location.hours}
                      </span>
                    </div>

                    {location.website && (
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-[#0096cc] mr-3 flex-shrink-0" />
                        <a
                          href={location.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-doctor-blue hover:text-doctor-blue-dark transition-colors"
                        >
                          {location.website.replace('https://', '')}
                        </a>
                      </div>
                    )}

                    {location.message && (
                      <div className={`bg-blue-50 p-3 rounded-lg border-l-4 border-doctor-blue ${language === 'np' ? 'nepali' : ''}`}>
                        <p className="text-sm text-doctor-blue-dark">{location.message}</p>
                      </div>
                    )}

                    {location.showAppointmentButton && (
                      <Button
                        asChild
                        className="mt-6 w-full bg-[#0096cc] hover:bg-[#007cb8] transition-all duration-300 group"
                      >
                        <Link to="/contact" className="flex items-center justify-center">
                          <span>
                            {language === 'en' ? 'Book Appointment' : 'अपोइन्टमेन्ट बुक गर्नुहोस्'}
                          </span>
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-all duration-300" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional contact options */}
        <motion.div
          className="bg-gradient-to-r from-doctor-blue-light/50 to-blue-50/50 rounded-2xl p-8 shadow-lg border border-blue-100 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className={`text-xl font-bold mb-2 text-doctor-blue-dark ${language === 'np' ? 'nepali' : ''}`}>
                {language === 'en' ? 'Have Questions?' : 'प्रश्नहरू छन्?'}
              </h3>
              <p className={`text-gray-600 ${language === 'np' ? 'nepali' : ''}`}>
                {language === 'en'
                  ? 'Contact us for more information about our services'
                  : 'हाम्रो सेवाहरूको बारेमा थप जानकारीको लागि हामीलाई सम्पर्क गर्नुहोस्'}
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-doctor-blue text-doctor-blue hover:bg-doctor-blue hover:text-white transition-all duration-300"
              >
                <Link to="/contact">
                  {language === 'en' ? 'Contact Us' : 'सम्पर्क गर्नुहोस्'}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPreview;
