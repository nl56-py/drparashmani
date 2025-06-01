import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEOHead from '@/components/SEOHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle, Briefcase, GraduationCap, Users, BookOpen } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();
  
  const seoKeywordsEn = "urologist biography, Dr. Parash Mani Shrestha, Nepal urologist, urology specialist, kidney transplant surgeon, endourology, laparoscopic urosurgery";
  const seoKeywordsNp = "मूत्र रोग विशेषज्ञ जीवनी, डा. पारस मणि श्रेष्ठ, नेपाली मूत्र रोग विशेषज्ञ, मूत्र रोग विशेषज्ञ, मिर्गौला प्रत्यारोपण शल्यचिकित्सक";
  
  const seoDescription = language === 'en'
    ? "Dr. Parash Mani Shrestha is a senior consultant urosurgeon and professor of urology at National Academy of Medical Sciences, Bir Hospital specializing in endourology, kidney transplants, and urologic cancer treatments."
    : "डा. पारस मणि श्रेष्ठ राष्ट्रिय चिकित्सा विज्ञान प्रतिष्ठान, बीर अस्पतालका वरिष्ठ परामर्शदाता यूरोसर्जन र युरोलोजी प्रोफेसर हुन् जसले एन्डोयुरोलोजी, मिर्गौला प्रत्यारोपण, र मूत्र रोग क्यान्सर उपचारमा विशेषज्ञता राख्छन्।";

  // About page specific schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Dr. Parash Mani Shrestha",
    "url": "https://drparashmani.com.np/about",
    "description": seoDescription,
    "mainEntity": {
      "@type": "Person",
      "@id": "https://drparashmani.com.np/#person",
      "name": "Dr. Parash Mani Shrestha",
      "jobTitle": "Senior Consultant Urosurgeon and Professor of Urology",
      "worksFor": {
        "@type": "Hospital",
        "name": "National Academy of Medical Sciences, Bir Hospital"
      }
    }
  };

  const membershipsTitle = language === 'en' ? 'Professional Memberships' : 'व्यावसायिक सदस्यताहरू';
  const educationTitle = language === 'en' ? 'Education & Training' : 'शिक्षा र प्रशिक्षण';
  const experienceTitle = language === 'en' ? 'Professional Experience' : 'व्यावसायिक अनुभव';
  const publicationsTitle = language === 'en' ? 'Publications & Research' : 'प्रकाशन र अनुसन्धान';

  return (
    <>
      <SEOHead 
        title={language === 'en' ? 'About Dr. Parash Mani Shrestha' : 'डा. पारस मणि श्रेष्ठको बारेमा'}
        description={seoDescription}
        keywords={language === 'en' ? seoKeywordsEn : seoKeywordsNp}
        canonical="/about"
        structuredData={aboutPageSchema}
      />
      <Header />
      
      <main className="font-poppins">
        {/* Hero Section with Gradient Background */}
        <section className="bg-gradient-to-b from-doctor-blue/20 via-doctor-blue/10 to-white py-16 lg:py-24">
          <div className="section-container max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className={language === 'np' ? 'font-nepali' : 'font-poppins'}>
                  {language === 'en' ? 'About Dr. Parash' : 'डा. पारसको बारेमा'}
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                <span className={language === 'np' ? 'font-nepali' : 'font-poppins'}>
                  {language === 'en' 
                    ? 'Senior Consultant Urologist & Professor at NAMS, Bir Hospital' 
                    : 'नामस, बीर अस्पतालका वरिष्ठ परामर्शदाता मूत्ररोग विशेषज्ञ र प्रोफेसर'}
                </span>
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Profile Section with Enhanced Design */}
        <section className="py-16 bg-white">
          <div className="section-container max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div 
              className="flex flex-col md:flex-row gap-12 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Doctor Image with Decorative Elements */}
              <motion.div 
                className="md:w-1/3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img 
                    src="/lovable-uploads/5c81b557-5e86-4894-8135-0496808d13cf.png" 
                    alt="Dr. Parash Mani Shrestha" 
                    className="rounded-2xl shadow-xl w-full object-cover"
                  />
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-8 border-doctor-blue/20 z-0"></div>
                  <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-doctor-blue/10 z-0"></div>
                </div>
              </motion.div>
              
              {/* Biography Text */}
              <motion.div 
                className="md:w-2/3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-doctor-blue ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                  {language === 'en' ? (
                    <>
                      <p className="text-lg mb-4">
                        Dr. Parash Mani Shrestha is a Senior Consultant Urosurgeon and Professor of Urology at the National Academy of Medical Sciences, Bir Hospital. With over 20 years of experience in the field of urology, he specializes in Endourology, Laparoscopic Urosurgery, and Kidney transplantation.
                      </p>
                      <p className="text-lg mb-4">
                        Currently serving as the President of the Nepal Association of Urological Surgeons (NAUS), Dr. Shrestha has been an influential figure in advancing urological care in Nepal. His expertise spans across kidney stones, prostate diseases, bladder diseases, and the treatment of kidney, bladder, and prostate cancers.
                      </p>
                      <p className="text-lg">
                        Dr. Shrestha completed his medical education at Tongji Medical University, China, followed by a Master of Surgery in Urology from Bangabandhu Sheikh Mujib Medical University, Bangladesh. He further enhanced his skills through specialized training in Renal Transplantation and Advanced Urology at Singapore General Hospital.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg mb-4">
                        डा. पारस मणि श्रेष्ठ राष्ट्रिय चिकित्सा विज्ञान प्रतिष्ठान, बीर अस्पतालका वरिष्ठ परामर्शदाता यूरोसर्जन र युरोलोजी प्रोफेसर हुन्। मूत्र रोगको क्षेत्रमा २० वर्षभन्दा बढीको अनुभवका साथ, उनी एन्डोयुरोलोजी, ल्यापारोस्कोपिक यूरोसर्जरी, र मिर्गौला प्रत्यारोपणमा विशेषज्ञता राख्छन्।
                      </p>
                      <p className="text-lg mb-4">
                        हालै नेपाल एसोसिएशन अफ युरोलजिकल सर्जन्स (NAUS) का अध्यक्षका रूपमा सेवारत, डा. श्रेष्ठ नेपालमा मूत्र रोग हेरचाहको उन्नतिमा प्रभावशाली व्यक्ति हुन्। उनको विशेषज्ञता मिर्गौला पथरी, प्रोस्टेट रोगहरू, मूत्राशय रोगहरू, र मिर्गौला, मूत्राशय, र प्रोस्टेट क्यान्सरको उपचारमा फैलिएको छ।
                      </p>
                      <p className="text-lg">
                        डा. श्रेष्ठले तोंगजी मेडिकल युनिभर्सिटी, चीनबाट चिकित्सा शिक्षा पूरा गरे, त्यसपछि बंगबन्धु शेख मुजिब मेडिकल युनिभर्सिटी, बंगलादेशबाट मूत्र रोगमा सर्जरी मास्टर हासिल गरे। उनले सिंगापुर जनरल अस्पतालमा मिर्गौला प्रत्यारोपण र उन्नत मूत्र रोगमा विशेष प्रशिक्षण मार्फत आफ्नो सीप थप बढाए।
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Qualifications Section with Cards */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="section-container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Education Card */}
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-doctor-blue"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-doctor-blue/10 p-3 rounded-full mr-4">
                    <GraduationCap className="h-8 w-8 text-doctor-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <span className={language === 'np' ? 'font-nepali' : 'font-poppins'}>
                      {educationTitle}
                    </span>
                  </h2>
                </div>
                <ul className={`space-y-4 ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                  {language === 'en' ? (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>MBBS - Tongji Medical University, China (1988-1993)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Master of Surgery (Urology) - Bangabandhu Sheikh Mujib Medical University, Bangladesh (1999-2003)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Training in Renal Transplantation and Advanced Urology - Singapore General Hospital (2004-2006)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Diploma in Chinese Language - Beijing Language Institute, China (1987-1988)</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>एमबिबिएस - तोंगजी मेडिकल युनिभर्सिटी, चीन (१९८८-१९९३)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>मूत्र रोगमा सर्जरी मास्टर - बंगबन्धु शेख मुजिब मेडिकल युनिभर्सिटी, बंगलादेश (१९९९-२००३)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>मिर्गौला प्रत्यारोपण र उन्नत मूत्र रोगमा प्रशिक्षण - सिंगापुर जनरल अस्पताल (२००४-२००६)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>चिनियाँ भाषामा डिप्लोमा - बेइजिङ भाषा संस्थान, चीन (१९८७-१९८८)</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
              
              {/* Experience Card */}
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-doctor-blue"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-doctor-blue/10 p-3 rounded-full mr-4">
                    <Briefcase className="h-8 w-8 text-doctor-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <span className={language === 'np' ? 'font-nepali' : 'font-poppins'}>
                      {experienceTitle}
                    </span>
                  </h2>
                </div>
                <ul className={`space-y-4 ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                  {language === 'en' ? (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Professor of Urology, Department of Urology - NAMS, Bir Hospital (July 2016-Present)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Head of Department, Department of Urology - NAMS, Bir Hospital (September 2015-November 2020)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Associate Professor of Urology - NAMS, Bir Hospital (February 2013-July 2016)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Assistant Professor of Urology - NAMS, Bir Hospital (March 2008-February 2013)</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>युरोलोजी प्रोफेसर, युरोलोजी विभाग - नामस, बीर अस्पताल (जुलाई २०१६-हालसम्म)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>विभाग प्रमुख, युरोलोजी विभाग - नामस, बीर अस्पताल (सेप्टेम्बर २०१५-नोभेम्बर २०२०)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>एसोसिएट प्रोफेसर अफ युरोलोजी - नामस, बीर अस्पताल (फेब्रुअरी २०१३-जुलाई २०१६)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>सहायक प्रोफेसर अफ युरोलोजी - नामस, बीर अस्पताल (मार्च २००८-फेब्रुअरी २०१३)</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Memberships Card */}
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-doctor-blue"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-doctor-blue/10 p-3 rounded-full mr-4">
                    <Users className="h-8 w-8 text-doctor-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <span className={language === 'np' ? 'font-nepali' : 'font-poppins'}>
                      {membershipsTitle}
                    </span>
                  </h2>
                </div>
                <ul className={`space-y-4 ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                  {language === 'en' ? (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Nepal Medical Council - Permanent membership (1994-Present)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Nepal Medical Council - Registration as Urosurgeon Specialist (2003-Present)</span>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                          <span>Nepal Association of Urological Surgeons (NAUS)</span>
                        </div>
                        <ul className="ml-8 mt-2 space-y-1">
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>President (April 2025-Present)</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>Vice President </span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>General Secretary</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>Treasurer </span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>Founder member (2005)</span>
                          </li>
                        </ul>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Singapore Medical Council - Temporary Medical Registration (2004-2006)</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>नेपाल मेडिकल काउन्सिल - स्थायी सदस्यता (१९९४-हालसम्म)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>नेपाल मेडिकल काउन्सिल - यूरोसर्जन विशेषज्ञका रूपमा दर्ता (२००३-हालसम्म)</span>
                      </li>
                      <li>
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                          <span>नेपाल एसोसिएशन अफ युरोलजिकल सर्जन्स (NAUS)</span>
                        </div>
                        <ul className="ml-8 mt-2 space-y-1">
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>अध्यक्ष (अप्रिल २०२५-हालसम्म)</span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>उपाध्यक्ष </span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>महासचिव </span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>कोषाध्यक्ष </span>
                          </li>
                          <li className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-doctor-blue mr-2"></div>
                            <span>संस्थापक सदस्य (२००५)</span>
                          </li>
                        </ul>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>सिंगापुर मेडिकल काउन्सिल - अस्थायी मेडिकल दर्ता (२००४-२००६)</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
              
              {/* Publications Card */}
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-doctor-blue"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-doctor-blue/10 p-3 rounded-full mr-4">
                    <BookOpen className="h-8 w-8 text-doctor-blue" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <span className={language === 'np' ? 'font-nepali' : 'font-poppins'}>
                      {publicationsTitle}
                    </span>
                  </h2>
                </div>
                <ul className={`space-y-4 ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                  {language === 'en' ? (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>More than 25 national and international journal publications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Author of multiple research papers on kidney transplantation in Nepal</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Published research on Endourology and Laparoscopic Urosurgery</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Regular contributor to national medical journals on urological conditions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>Research focuses on kidney stones, prostate diseases, and urological cancers</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>२५ भन्दा बढी राष्ट्रिय र अन्तर्राष्ट्रिय जर्नल प्रकाशनहरू</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>नेपालमा मिर्गौला प्रत्यारोपणमा बहु अनुसन्धान पत्रहरूका लेखक</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>एन्डोयुरोलोजी र ल्यापारोस्कोपिक यूरोसर्जरीमा प्रकाशित अनुसन्धान</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>मूत्र रोग अवस्थाहरूमा राष्ट्रिय चिकित्सा पत्रिकाहरूमा नियमित योगदानकर्ता</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 mt-0.5 flex-shrink-0" />
                        <span>अनुसन्धान मिर्गौला पथरी, प्रोस्टेट रोगहरू, र मूत्र रोगसम्बन्धी क्यान्सरहरूमा केन्द्रित</span>
                      </li>
                    </>
                  )}
                </ul>
              </motion.div>
            </div>

            {/* Expertise Areas Card */}
            <motion.div 
              className="mt-12 bg-white p-8 rounded-2xl shadow-lg border-t-4 border-doctor-blue"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <h2 className={`text-2xl font-bold mb-6 text-gray-900 ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                {language === 'en' ? 'Main Fields of Interest & Expertise' : 'रुचि र विशेषज्ञताका मुख्य क्षेत्रहरू'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`font-semibold text-lg mb-3 text-doctor-blue ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                    {language === 'en' ? 'Fields of Interest:' : 'रुचिका क्षेत्रहरू:'}
                  </h3>
                  <ul className={`space-y-3 ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                    {language === 'en' ? (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>Endourology</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>Laparoscopic Urosurgery</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>Kidney Transplantation</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>एन्डोयुरोलोजी</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>ल्यापारोस्कोपिक यूरोसर्जरी</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>मिर्गौला प्रत्यारोपण</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className={`font-semibold text-lg mb-3 text-doctor-blue ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                    {language === 'en' ? 'Fields of Expertise:' : 'विशेषज्ञताका क्षेत्रहरू:'}
                  </h3>
                  <ul className={`space-y-3 ${language === 'np' ? 'font-nepali' : 'font-poppins'}`}>
                    {language === 'en' ? (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>Kidney Stones, Prostate diseases, Bladder diseases</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>Kidney/Bladder/Prostate Cancers</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>Kidney Transplantation</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>मिर्गौला पथरी, प्रोस्टेट रोगहरू, मूत्राशय रोगहरू</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>मिर्गौला/मूत्राशय/प्रोस्टेट क्यान्सरहरू</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-doctor-blue mr-3 flex-shrink-0" />
                          <span>मिर्गौला प्रत्यारोपण</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
