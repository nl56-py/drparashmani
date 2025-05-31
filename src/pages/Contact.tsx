
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name) {
      toast({
        title: language === 'en' ? "Name is required" : "नाम आवश्यक छ",
        variant: "destructive"
      });
      return;
    }

    if (!phone) {
      toast({
        title: language === 'en' ? "Phone number is required" : "फोन नम्बर आवश्यक छ",
        variant: "destructive"
      });
      return;
    }

    if (!message) {
      toast({
        title: language === 'en' ? "Message is required" : "सन्देश आवश्यक छ",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Submitting contact form:', { name, email, phone, message });
      
      // Send to Supabase without authentication
      const { error } = await supabase
        .from('contacts')
        .insert({
          name,
          email: email || null, // Make email optional by sending null if empty
          phone, // Phone is now required
          message
        });
      
      if (error) {
        console.error('Contact form submission error:', error);
        throw error;
      }
      
      toast({
        title: language === 'en' ? "Message Sent!" : "सन्देश पठाइयो!",
        description: language === 'en' 
          ? "We have received your message and will contact you soon." 
          : "हामीले तपाईंको सन्देश प्राप्त गरेका छौं र चाँडै सम्पर्क गर्नेछौं।",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: language === 'en' ? "Error" : "त्रुटि",
        description: language === 'en'
          ? "There was a problem sending your message. Please try again."
          : "तपाईंको सन्देश पठाउँदा समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्।",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const pageTitle = language === 'en' ? "Contact Dr. Parash Mani Shrestha" : "डा. पारस मणि श्रेष्ठलाई सम्पर्क गर्नुहोस्";
  const pageSubtitle = language === 'en' 
    ? "Get in touch for consultations and appointments" 
    : "परामर्श र अपोइन्टमेन्टको लागि सम्पर्कमा रहनुहोस्";

  const seoKeywordsEn = "contact urologist Nepal, Dr. Parash Mani Shrestha appointment, urology consultation Nepal, Bir Hospital urology, Blue Cross Hospital urology";
  const seoKeywordsNp = "नेपाल मूत्र रोग विशेषज्ञ सम्पर्क, डा. पारस मणि श्रेष्ठ अपोइन्टमेन्ट, नेपाल मूत्र रोग परामर्श, बीर अस्पताल मूत्र रोग, ब्लु क्रस अस्पताल मूत्र रोग";
  
  const seoDescription = language === 'en'
    ? "Contact Dr. Parash Mani Shrestha for urology consultations at Bir Hospital and Blue Cross Hospital in Kathmandu, Nepal. Book appointments for kidney problems, urological conditions, and specialized treatments."
    : "काठमाडौं, नेपालमा बीर अस्पताल र ब्लु क्रस अस्पतालमा मूत्र रोग परामर्शको लागि डा. पारस मणि श्रेष्ठलाई सम्पर्क गर्नुहोस्। मिर्गौला समस्याहरू, मूत्र रोग अवस्थाहरू, र विशेष उपचारहरूको लागि अपोइन्टमेन्ट बुक गर्नुहोस्।";

  // Contact page specific schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": pageTitle,
    "url": "https://drparashmani.com.np/contact",
    "description": seoDescription,
    "mainEntity": {
      "@type": "Person",
      "@id": "https://drparashmani.com.np/#person",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+977-01-4221119",
          "contactType": "customer service",
          "areaServed": "NP",
          "availableLanguage": ["English", "Nepali"]
        },
        {
          "@type": "ContactPoint", 
          "telephone": "+977-01-5319227",
          "contactType": "customer service",
          "areaServed": "NP",
          "availableLanguage": ["English", "Nepali"]
        }
      ]
    }
  };

  return (
    <>
      <SEOHead 
        title={pageTitle}
        description={seoDescription}
        keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
        canonical="/contact"
        structuredData={contactPageSchema}
      />
      <Header />
      <main>
        <section className="bg-gray-50 py-16">
          <motion.div 
            className="section-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-12"
              variants={itemVariants}
            >
              <h1 className="page-title">
                <span className={language === 'np' ? 'nepali' : ''}>{pageTitle}</span>
              </h1>
              <p className="page-subtitle">
                <span className={language === 'np' ? 'nepali' : ''}>{pageSubtitle}</span>
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-8">
                {/* Bir Hospital Info */}
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className={`text-xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('contact.bir')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="mr-3 h-5 w-5 text-doctor-blue mt-0.5" />
                      <div className={language === 'np' ? 'nepali' : ''}>
                        <p>Mahaboudha, Kathmandu</p>
                        <p>Nepal</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-doctor-blue" />
                      <p>+977-01-4221119</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-3 h-5 w-5 text-doctor-blue mt-0.5" />
                      <div className={language === 'np' ? 'nepali' : ''}>
                        <p>{language === 'en' ? 'Sunday-Thursday OT , FRIDAY OPD' : 'आइतबार- बिहीबार OT,  शुक्रबार(विरामी हेर्ने)  OPD'}</p>
                        <p>9:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-3 h-5 w-5 text-doctor-blue" />
                      <a 
                        href="https://www.birhospital.gov.np/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-doctor-blue hover:text-doctor-blue-dark transition-colors"
                      >
                        www.birhospital.com.np
                      </a>
                    </div>
                    <div className={`bg-blue-50 p-3 rounded-lg border-l-4 border-doctor-blue ${language === 'np' ? 'nepali' : ''}`}>
                      <p className="text-sm text-doctor-blue-dark">
                        {language === 'en' 
                          ? 'For OPD appointments, visit Bir Hospitals website for online booking or contact the hospital directly.'
                          : 'OPD अपोइन्टमेन्टको लागि, अनलाइन बुकिंग वीर अस्बपतालको साइटबाट गर्नुहोस् वा अस्पताललाई सीधा सम्पर्क गर्नुहोस्।'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Blue Cross Hospital Info */}
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className={`text-xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('contact.bluecross')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="mr-3 h-5 w-5 text-doctor-blue mt-0.5" />
                      <div className={language === 'np' ? 'nepali' : ''}>
                        <p>Tripureshwor, Kathmandu</p>
                        <p>Nepal</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-doctor-blue" />
                      <p>+977-01-5319227, 01-5365927, 01-5369727, 01-5362027</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mr-3 h-5 w-5 text-doctor-blue mt-0.5" />
                      <div className={language === 'np' ? 'nepali' : ''}>
                        <p>{language === 'en' ? 'Sunday-Friday ' : 'आइत-शुक्र'}</p>
                        <p> Morning:8:00-8:30 AM, Evening 4:00 PM Onwards</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Email Contact */}
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className={`text-xl font-bold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Email' : 'इमेल'}
                  </h2>
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-doctor-blue" />
                    <p>This email is for only Business Purposes</p>
                    <p>drparas.uro@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div 
                className="lg:col-span-2"
                variants={itemVariants}
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className={`text-xl font-bold mb-6 ${language === 'np' ? 'nepali' : ''}`}>
                    {language === 'en' ? 'Send us a Message' : 'हामीलाई सन्देश पठाउनुहोस्'}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className={language === 'np' ? 'nepali' : ''}>
                          {t('contact.form.name')} *
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className={`h-12 ${language === 'np' ? 'nepali' : ''}`}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className={language === 'np' ? 'nepali' : ''}>
                          {language === 'en' ? 'Email (Optional)' : 'इमेल (वैकल्पिक)'}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className={language === 'np' ? 'nepali' : ''}>
                        {language === 'en' ? 'Phone Number *' : 'फोन नम्बर *'}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="h-12"
                        placeholder={language === 'en' ? 'Your phone number' : 'तपाईंको फोन नम्बर'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className={language === 'np' ? 'nepali' : ''}>
                        {t('contact.form.message')} *
                      </Label>
                      <textarea
                        id="message"
                        className={`w-full min-h-[150px] border border-input rounded-md px-3 py-2 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${language === 'np' ? 'nepali' : ''}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12"
                    >
                      <span className={language === 'np' ? 'nepali' : ''}>
                        {isSubmitting 
                          ? (language === 'en' ? 'Sending...' : 'पठाउँदै...') 
                          : (language === 'en' ? 'Send Message' : 'सन्देश पठाउनुहोस्')
                        }
                      </span>
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Maps Section */}
            <motion.div 
              className="mt-12"
              variants={itemVariants}
            >
              <h2 className={`text-2xl font-bold mb-6 text-center ${language === 'np' ? 'nepali' : ''}`}>
                {language === 'en' ? 'Find Us' : 'हामीलाई भेट्नुहोस्'}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bir Hospital Map */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('contact.bir')}
                  </h3>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.4707773582!2d85.31162931506382!3d27.70331298280074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19086abdc3bb%3A0x5b6bb2b6b8b1b2b6!2sBir%20Hospital!5e0!3m2!1sen!2snp!4v1647895444444!5m2!1sen!2snp"
                      width="600"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
                
                {/* Blue Cross Hospital Map */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${language === 'np' ? 'nepali' : ''}`}>
                    {t('contact.bluecross')}
                  </h3>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7065.525935887239!2d85.315199!3d27.69372!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ad6162bbcd%3A0x6fb6e054397de851!2sBlue%20Cross%20Hospital!5e0!3m2!1sen!2snp!4v1747895444444!5m2!1sen!2snp"
                      width="600"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
