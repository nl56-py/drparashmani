import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'np';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Dictionary of translations
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': {
    en: 'Home',
    np: 'गृह पृष्ठ'
  },
  'nav.about': {
    en: 'About',
    np: 'परिचय'
  },
  'nav.expertise': {
    en: 'Expertise',
    np: 'विशेषज्ञता'
  },
  'nav.urology': {
    en: 'Urology Info',
    np: 'मूत्र रोग जानकारी'
  },
  'nav.contribution': {
    en: 'Contribution to NAUS',
    np: 'NAUS मा योगदान'
  },
  'nav.teacher': {
    en: 'Dr. As a Teacher',
    np: 'डाक्टर शिक्षकको रूपमा'
  },
  'nav.lectures': {
    en: 'Lectures Abroad',
    np: 'विदेशी व्याख्यानहरू'
  },
  'nav.blog': {
    en: 'Blog',
    np: 'ब्लग'
  },
  'nav.videos': {
    en: 'Video Gallery',
    np: 'भिडियो ग्यालरी'
  },
  'nav.contact': {
    en: 'Contact',
    np: 'सम्पर्क'
  },
  
  // Hero Section
  'hero.title': {
    en: 'Dr. Parash Mani Shrestha: Nepal\'s Leading Urologist',
    np: 'डा. पारस मणि श्रेष्ठ: नेपालका प्रमुख मूत्र रोग विशेषज्ञ'
  },
  'hero.subtitle': {
    en: 'Expertise in Kidney Transplant, TURP, and Urologic Cancer Treatment',
    np: 'मिर्गौला प्रत्यारोपण, TURP, र मूत्र रोगसम्बन्धी क्यान्सर उपचारमा विशेषज्ञता'
  },
  'hero.cta': {
    en: 'Book Consultation',
    np: 'परामर्श बुक गर्नुहोस्'
  },

  // Services
  'services.title': {
    en: 'Specialized Urology Services',
    np: 'विशेष मूत्र रोग सेवाहरू'
  },
  'services.transplant': {
    en: 'Kidney Transplant',
    np: 'मिर्गौला प्रत्यारोपण'
  },
  'services.transplant.desc': {
    en: 'Expert kidney transplant services with high success rates.',
    np: 'उच्च सफलता दरका साथ विशेषज्ञ मिर्गौला प्रत्यारोपण सेवाहरू।'
  },
  'services.turp': {
    en: 'TURP',
    np: 'TURP'
  },
  'services.turp.desc': {
    en: 'Transurethral Resection of the Prostate for BPH treatment.',
    np: 'BPH उपचारको लागि प्रोस्टेटको ट्रान्सयूरेथ्रल रिसेक्सन।'
  },
  'services.cancer': {
    en: 'Urologic Cancer',
    np: 'मूत्र रोग क्यान्सर'
  },
  'services.cancer.desc': {
    en: 'Comprehensive treatment for all urologic cancers.',
    np: 'सबै मूत्र रोगसम्बन्धी क्यान्सरहरूको लागि व्यापक उपचार।'
  },
  'services.consultation': {
    en: 'Consultations',
    np: 'परामर्श'
  },
  'services.consultation.desc': {
    en: 'Professional urology consultations and second opinions.',
    np: 'पेशेवर मूत्र रोग परामर्श र दोस्रो विचारहरू।'
  },

  // About summary
  'about.title': {
    en: 'About Dr. Parash Mani Shrestha',
    np: 'डा. पारस मणि श्रेष्ठको बारेमा'
  },
  'about.subtitle': {
    en: 'Leading Urologist with Over 15 Years of Experience',
    np: '१५ वर्ष भन्दा बढी अनुभव भएका अग्रणी मूत्र रोग विशेषज्ञ'
  },
  'about.education': {
    en: 'Education',
    np: 'शिक्षा'
  },
  'about.experience': {
    en: 'Professional Experience',
    np: 'व्यावसायिक अनुभव'
  },
  'about.publications': {
    en: 'Publications & Research',
    np: 'प्रकाशन र अनुसन्धान'
  },
  'about.summary.title': {
    en: 'About Dr. Parash Mani Shrestha',
    np: 'डा. पारस मणि श्रेष्ठको बारेमा'
  },
  'about.summary.text': {
    en: 'Dr. Parash Mani Shrestha is a senior urologist with over 15 years of experience. He specializes in kidney transplants, TURP, and urologic cancer treatments at Bir Hospital and Blue Cross Hospital in Kathmandu, Nepal.',
    np: 'डा. पारस मणि श्रेष्ठ १५ वर्षभन्दा बढी अनुभव भएका वरिष्ठ मूत्र रोग विशेषज्ञ हुन्। उहाँ नेपालको काठमाडौंमा बीर अस्पताल र ब्लु क्रस अस्पतालमा मिर्गौला प्रत्यारोपण, TURP, र मूत्र रोगसम्बन्धी क्यान्सर उपचारमा विशेषज्ञता राख्नुहुन्छ।'
  },
  'about.read.more': {
    en: 'Read More',
    np: 'थप पढ्नुहोस्'
  },

  // Blog Section
  'blog.title': {
    en: 'Medical Articles & Updates',
    np: 'चिकित्सा लेख तथा अपडेटहरू'
  },
  'blog.subtitle': {
    en: 'Latest insights on urological conditions and treatments',
    np: 'मूत्र रोग सम्बन्धी अवस्था र उपचारहरूमा नवीनतम अन्तरदृष्टि'
  },
  'blog.section.title': {
    en: 'Latest Medical Articles',
    np: 'नवीनतम मेडिकल लेखहरू'
  },
  'blog.section.subtitle': {
    en: 'Educational resources on urology and kidney health',
    np: 'मूत्र रोग र मिर्गौला स्वास्थ्य सम्बन्धी शैक्षिक स्रोतहरू'
  },
  'blog.read.more': {
    en: 'Read Article',
    np: 'लेख पढ्नुहोस्'
  },
  'blog.view.all': {
    en: 'View All Articles',
    np: 'सबै लेखहरू हेर्नुहोस्'
  },

  // Urology Info Section
  'urology.title': {
    en: 'Urological Conditions & Information',
    np: 'मूत्र रोग अवस्था र जानकारी'
  },
  'urology.subtitle': {
    en: 'Learn about common urological conditions and their treatments',
    np: 'सामान्य मूत्र रोग अवस्थाहरू र तिनका उपचारहरूको बारेमा जान्नुहोस्'
  },
  'urology.learnMore': {
    en: 'Learn More',
    np: 'थप जान्नुहोस्'
  },

  // Video Gallery
  'videos.title': {
    en: 'Video Gallery & Educational Resources',
    np: 'भिडियो ग्यालरी र शैक्षिक स्रोतहरू'
  },
  'videos.subtitle': {
    en: 'Watch informative videos on urological topics',
    np: 'मूत्र रोग विषयहरूमा जानकारीमूलक भिडियोहरू हेर्नुहोस्'
  },

  // Section titles in detail pages
  'section.symptoms': {
    en: 'Common Symptoms',
    np: 'सामान्य लक्षणहरू'
  },
  'section.causes': {
    en: 'Causes & Risk Factors',
    np: 'कारणहरू र जोखिम कारकहरू'
  },
  'section.diagnosis': {
    en: 'Diagnosis',
    np: 'निदान'
  },
  'section.treatment': {
    en: 'Treatment Options',
    np: 'उपचार विकल्पहरू'
  },
  'section.prevention': {
    en: 'Prevention & Lifestyle',
    np: 'रोकथाम र जीवनशैली'
  },

  // Contact Section
  'contact.section.title': {
    en: 'Schedule a Consultation',
    np: 'परामर्श तालिका बनाउनुहोस्'
  },
  'contact.bir': {
    en: 'Bir Hospital',
    np: 'वीर अस्पताल'
  },
  'contact.bluecross': {
    en: 'Blue Cross Hospital',
    np: 'ब्लु क्रस अस्पताल'
  },
  'contact.form.name': {
    en: 'Your Name',
    np: 'तपाईंको नाम'
  },
  'contact.form.email': {
    en: 'Your Email',
    np: 'तपाईंको इमेल'
  },
  'contact.form.message': {
    en: 'Your Message',
    np: 'तपाईंको सन्देश'
  },
  'contact.form.submit': {
    en: 'Send Message',
    np: 'सन्देश पठाउनुहोस्'
  },

  // Teacher Page Translations
  'teacher.hero.subtitle': {
    en: 'Dedicated educator shaping the future of urology in Nepal through 12+ years of teaching MCh Urology and mentoring the next generation of urologists',
    np: '१२+ वर्षको MCh मूत्र रोग शिक्षण र अर्को पुस्ताका मूत्र रोग विशेषज्ञहरूको मार्गदर्शन मार्फत नेपालमा मूत्र रोगको भविष्य आकार दिने समर्पित शिक्षक'
  },

  // Teaching Statistics
  'teacher.stats.years': {
    en: '12+ Years',
    np: '१२+ वर्ष'
  },
  'teacher.stats.teaching': {
    en: 'Teaching MCh Urology',
    np: 'MCh मूत्र रोग शिक्षण'
  },
  'teacher.stats.training': {
    en: 'Dedicated to training the next generation of urologists',
    np: 'अर्को पुस्ताका मूत्र रोग विशेषज्ञहरूको तालिमलाई समर्पित'
  },
  'teacher.stats.doctors': {
    en: '50+ Doctors',
    np: '५०+ डाक्टरहरू'
  },
  'teacher.stats.certified': {
    en: 'Trained & Certified',
    np: 'प्रशिक्षित र प्रमाणित'
  },
  'teacher.stats.mentored': {
    en: 'Successfully mentored numerous urologists in Nepal',
    np: 'नेपालमा धेरै मूत्र रोग विशेषज्ञहरूको सफल मार्गदर्शन'
  },
  'teacher.stats.examiner': {
    en: 'Expert Examiner',
    np: 'विशेषज्ञ परीक्षक'
  },
  'teacher.stats.certification': {
    en: 'MCh Urology Certification',
    np: 'MCh मूत्र रोग प्रमाणीकरण'
  },
  'teacher.stats.standards': {
    en: 'Ensuring high standards in urological education',
    np: 'मूत्र रोग शिक्षामा उच्च मापदण्डहरू सुनिश्चित गर्ने'
  },

  // Teaching Areas
  'teacher.areas.title': {
    en: 'Specialized Teaching Areas',
    np: 'विशेष शिक्षण क्षेत्रहरू'
  },
  'teacher.areas.laparoscopic': {
    en: 'Advanced Laparoscopic Urology',
    np: 'उन्नत ल्याप्रोस्कोपिक मूत्र रोग'
  },
  'teacher.areas.endourology': {
    en: 'Endourology Procedures',
    np: 'एन्डोयूरोलजी प्रक्रियाहरू'
  },
  'teacher.areas.open': {
    en: 'Open Urological Surgery',
    np: 'खुला मूत्र रोग शल्यक्रिया'
  },
  'teacher.areas.pediatric': {
    en: 'Pediatric Urology',
    np: 'बाल मूत्र रोग'
  },

  // Teaching Topics
  'teacher.topics.nephrectomy': {
    en: 'Laparoscopic Nephrectomy',
    np: 'ल्याप्रोस्कोपिक नेफ्रेक्टमी'
  },
  'teacher.topics.pyeloplasty': {
    en: 'Pyeloplasty',
    np: 'पाइलोप्लास्टी'
  },
  'teacher.topics.adrenalectomy': {
    en: 'Adrenalectomy',
    np: 'एड्रेनालेक्टमी'
  },
  'teacher.topics.retroperitoneal': {
    en: 'Retroperitoneal Mass Excision',
    np: 'रेट्रोपेरिटोनियल मास एक्सिजन'
  },
  'teacher.topics.pcnl': {
    en: 'PCNL (Percutaneous Nephrolithotomy)',
    np: 'PCNL (पर्क्युटेनियस नेफ्रोलिथोटमी)'
  },
  'teacher.topics.urs': {
    en: 'URS (Ureteroscopy)',
    np: 'URS (युरेटेरोस्कोपी)'
  },
  'teacher.topics.cystoscopy': {
    en: 'Cystoscopy',
    np: 'सिस्टोस्कोपी'
  },
  'teacher.topics.turp': {
    en: 'TURP/TURBT',
    np: 'TURP/TURBT'
  },
  'teacher.topics.radical.nephrectomy': {
    en: 'Radical Nephrectomy',
    np: 'र्यडिकल नेफ्रेक्टमी'
  },
  'teacher.topics.radical.prostatectomy': {
    en: 'Radical Prostatectomy',
    np: 'र्यडिकल प्रोस्टेटेक्टमी'
  },
  'teacher.topics.cystectomy': {
    en: 'Cystectomy',
    np: 'सिस्टेक्टमी'
  },
  'teacher.topics.reconstructive': {
    en: 'Reconstructive Urology',
    np: 'पुनर्निर्माणात्मक मूत्र रोग'
  },
  'teacher.topics.hypospadias': {
    en: 'Hypospadias Repair',
    np: 'हाइपोस्पाडियास मर्मत'
  },
  'teacher.topics.orchidopexy': {
    en: 'Orchidopexy',
    np: 'ऑर्किडोपेक्सी'
  },
  'teacher.topics.pediatric.pyeloplasty': {
    en: 'Pyeloplasty in Children',
    np: 'बालबालिकामा पाइलोप्लास्टी'
  },
  'teacher.topics.vur': {
    en: 'VUR Management',
    np: 'VUR व्यवस्थापन'
  },

  // Skill Levels
  'teacher.level.advanced': {
    en: 'Advanced',
    np: 'उन्नत'
  },
  'teacher.level.intermediate': {
    en: 'Intermediate to Advanced',
    np: 'मध्यमदेखि उन्नत'
  },
  'teacher.level.specialized': {
    en: 'Specialized',
    np: 'विशेषीकृत'
  },

  // Kidney Transplant Programme
  'transplant.programme.title': {
    en: 'Bir Hospital Kidney Transplant Programme Leadership',
    np: 'वीर अस्पताल मिर्गौला प्रत्यारोपण कार्यक्रम नेतृत्व'
  },
  'transplant.stats.surgeries': {
    en: '300+ Surgeries',
    np: '३००+ शल्यक्रियाहरू'
  },
  'transplant.stats.performed': {
    en: 'Successfully Performed at Bir Hospital',
    np: 'वीर अस्पतालमा सफलतापूर्वक सम्पन्न'
  },
  'transplant.stats.success': {
    en: 'Leading kidney transplant procedures with high success at Bir Hospital',
    np: 'वीर अस्पतालमा उच्च सफलता दरका साथ मिर्गौला प्रत्यारोपण प्रक्रियाहरूको नेतृत्व'
  },
  'transplant.stats.rate': {
    en: '92% Success Rate',
    np: '९२% सफलता दर'
  },
  'transplant.stats.patient': {
    en: 'Patient Survival at Bir Hospital',
    np: 'वीर अस्पतालमा बिरामी बाँच्ने दर'
  },
  'transplant.stats.outcomes': {
    en: 'Consistently excellent outcomes in kidney transplantation',
    np: 'मिर्गौला प्रत्यारोपणमा लगातार उत्कृष्ट परिणामहरू'
  },
  'transplant.stats.training': {
    en: 'Specialized Training',
    np: 'विशेषीकृत तालिम'
  },
  'transplant.stats.programme': {
    en: 'Bir Hospital Transplant Program',
    np: 'वीर अस्पताल प्रत्यारोपण कार्यक्रम'
  },
  'transplant.stats.leading': {
    en: 'Training specialists for Bir Hospital\'s transplant initiatives',
    np: 'वीर अस्पतालको प्रत्यारोपण पहलहरूको लागि विशेषज्ञहरूको तालिम'
  },

  // Transplant Overview
  'transplant.overview.title': {
    en: 'Bir Hospital Kidney Transplant Programme Overview',
    np: 'वीर अस्पताल मिर्गौला प्रत्यारोपण कार्यक्रम सिंहावलोकन'
  },
  'transplant.overview.description': {
    en: 'Dr. Parash Mani Shrestha has been a key figure in establishing and advancing the kidney transplant programme at Bir Hospital, Nepal\'s oldest and most prominent public hospital. His leadership has transformed the hospital into a center of excellence for kidney transplantation, training medical professionals and ensuring high standards of care tailored to the local context.',
    np: 'डा. पारस मणि श्रेष्ठले नेपालको सबैभन्दा पुरानो र प्रमुख सार्वजनिक अस्पताल, वीर अस्पतालमा मिर्गौला प्रत्यारोपण कार्यक्रम स्थापना र विकासमा महत्वपूर्ण भूमिका खेल्नुभएको छ। उहाँको नेतृत्वले अस्पताललाई मिर्गौला प्रत्यारोपणको उत्कृष्ट केन्द्रमा परिणत गरेको छ, चिकित्सा पेशेवरहरूलाई तालिम प्रदान गर्दै र स्थानीय सन्दर्भमा अनुकूलित उच्च मापदण्डको हेरचाह सुनिश्चित गर्दै।'
  },
  'transplant.overview.experience': {
    en: 'Programme Experience',
    np: 'कार्यक्रम अनुभव'
  },
  'transplant.overview.experience.years': {
    en: '10+ Years in Transplant Medicine at Bir Hospital',
    np: 'वीर अस्पतालमा प्रत्यारोपण चिकित्सामा १०+ वर्ष'
  },
  'transplant.overview.impact': {
    en: 'Programme Impact',
    np: 'कार्यक्रम प्रभाव'
  },
  'transplant.overview.impact.desc': {
    en: 'Transformed kidney care at Bir Hospital',
    np: 'वीर अस्पतालमा मिर्गौला हेरचाह परिवर्तन'
  },

  // Transplant Contributions
  'transplant.contrib.title': {
    en: 'Contributions to Bir Hospital\'s Kidney Transplant Programme',
    np: 'वीर अस्पतालको मिर्गौला प्रत्यारोपण कार्यक्रममा योगदानहरू'
  },
  'transplant.contrib.establishment': {
    en: 'Bir Hospital Program Establishment',
    np: 'वीर अस्पताल कार्यक्रम स्थापना'
  },
  'transplant.contrib.establishment.desc': {
    en: 'Played a pivotal role in initiating Bir Hospital\'s kidney transplant program, establishing protocols, securing infrastructure, and ensuring compliance with national health standards.',
    np: 'वीर अस्पतालको मिर्गौला प्रत्यारोपण कार्यक्रम शुरू गर्न, प्रोटोकलहरू स्थापना गर्न, पूर्वाधार सुरक्षित गर्न, र राष्ट्रिय स्वास्थ्य मापदण्डहरूको पालना सुनिश्चित गर्नमा महत्वपूर्ण भूमिका।'
  },
  'transplant.contrib.establishment.impact': {
    en: 'Made kidney transplants accessible at Nepal\'s oldest public hospital',
    np: 'नेपालको सबैभन्दा पुरानो सार्वजनिक अस्पतालमा मिर्गौला प्रत्यारोपण पहुँचयोग्य बनायो'
  },
  'transplant.contrib.team': {
    en: 'Training Bir Hospital\'s Transplant Team',
    np: 'वीर अस्पतालको प्रत्यारोपण टोली तालिम'
  },
  'transplant.contrib.team.desc': {
    en: 'Developed specialized training modules for Bir Hospital\'s surgeons, nephrologists, and support staff, enhancing the hospital\'s capacity for transplant surgeries.',
    np: 'वीर अस्पतालको शल्यचिकित्सकहरू, नेफ्रोलोजिस्टहरू, र सहयोगी कर्मचारीहरूका लागि विशेष तालिम मोड्युलहरू विकास, अस्पतालको प्रत्यारोपण शल्यक्रियाको क्षमता वृद्धि।'
  },
  'transplant.contrib.team.impact': {
    en: 'Built a skilled transplant team at Bir Hospital',
    np: 'वीर अस्पतालमा दक्ष प्रत्यारोपण टोली निर्माण'
  },
  'transplant.contrib.protocols': {
    en: 'Bir Hospital Protocol Development',
    np: 'वीर अस्पताल प्रोटोकल विकास'
  },
  'transplant.contrib.protocols.desc': {
    en: 'Created tailored protocols for donor evaluation, surgical procedures, and post-operative care specific to Bir Hospital\'s resources and patient demographics.',
    np: 'वीर अस्पतालको स्रोत र बिरामी जनसांख्यिकी अनुसार दाता मूल्याङ्कन, शल्यक्रिया प्रक्रिया, र शल्यक्रिया पछिको हेरचाहका लागि अनुकूलित प्रोटोकलहरू सिर्जना।'
  },
  'transplant.contrib.protocols.impact': {
    en: 'Improved patient safety and transplant success rates',
    np: 'बिरामी सुरक्षा र प्रत्यारोपण सफलता दरहरूमा सुधार'
  },
  'transplant.contrib.community': {
    en: 'Community Outreach & Education',
    np: 'समुदाय सम्पर्क र शिक्षा'
  },
  'transplant.contrib.community.desc': {
    en: 'Led initiatives to educate patients and families about kidney transplantation at Bir Hospital, increasing awareness and donor participation.',
    np: 'वीर अस्पतालमा मिर्गौला प्रत्यारोपणको बारेमा बिरामी र परिवारहरूलाई शिक्षित गर्न पहलहरूको नेतृत्व, जागरूकता र दाता सहभागिता बढाउँदै।'
  },
  'transplant.contrib.community.impact': {
    en: 'Enhanced public trust and engagement in transplant programs',
    np: 'प्रत्यारोपण कार्यक्रमहरूमा सार्वजनिक विश्वास र संलग्नता वृद्धि'
  },
  'transplant.impact': {
    en: 'Impact',
    np: 'प्रभाव'
  },

  // MCh Urology Program
  'teacher.mch.title': {
    en: 'MCh Urology Program Overview',
    np: 'MCh मूत्र रोग कार्यक्रम सिंहावलोकन'
  },
  'teacher.mch.description': {
    en: 'The Master of Chirurgiae (MCh) in Urology is a 3-year super-specialty program designed to train highly skilled urological surgeons. Dr. Parash Mani Shrestha has been instrumental in developing and delivering this program for over 12 years, ensuring that graduates meet international standards while being equipped to handle Nepal-specific urological challenges.',
    np: 'मूत्र रोगमा मास्टर अफ चिरुर्गी (MCh) एक ३ वर्षको सुपर-स्पेशलिटी कार्यक्रम हो जुन उच्च दक्ष मूत्र रोग शल्यचिकित्सकहरूलाई तालिम दिन डिजाइन गरिएको छ। डा. पारस मणि श्रेष्ठले १२ वर्षभन्दा बढी समयदेखि यो कार्यक्रम विकास र प्रदान गर्नमा महत्वपूर्ण भूमिका खेल्नुभएको छ, स्नातकहरूले अन्तर्राष्ट्रिय मापदण्डहरू पूरा गर्ने र नेपाल-विशिष्ट मूत्र रोग चुनौतीहरू सम्हाल्न सक्ने सुनिश्चित गर्दै।'
  },
  'teacher.mch.duration': {
    en: 'Program Duration',
    np: 'कार्यक्रम अवधि'
  },
  'teacher.mch.duration.desc': {
    en: '3 Years (6 Semesters)',
    np: '३ वर्ष (६ सेमेस्टर)'
  },
  'teacher.mch.components': {
    en: 'Training Components',
    np: 'तालिम घटकहरू'
  },
  'teacher.mch.components.desc': {
    en: 'Theory, Clinical Practice, Surgery, Research',
    np: 'सिद्धान्त, क्लिनिकल अभ्यास, शल्यक्रिया, अनुसन्धान'
  },

  // Training Process
  'teacher.process.title': {
    en: 'Training Process & Methodology',
    np: 'तालिम प्रक्रिया र पद्धति'
  },
  'teacher.process.theoretical': {
    en: 'Theoretical Foundation',
    np: 'सैद्धान्तिक आधार'
  },
  'teacher.process.theoretical.desc': {
    en: 'Comprehensive lectures covering urological anatomy, physiology, pathology, and pharmacology',
    np: 'मूत्र रोग शरीर रचना, फिजियोलोजी, रोगविज्ञान, र फार्माकोलोजी समेट्ने व्यापक व्याख्यानहरू'
  },
  'teacher.process.clinical': {
    en: 'Clinical Exposure',
    np: 'क्लिनिकल एक्सपोजर'
  },
  'teacher.process.clinical.desc': {
    en: 'Hands-on patient interaction, case discussions, and clinical decision-making training',
    np: 'प्रत्यक्ष बिरामी अन्तरक्रिया, केस छलफल, र क्लिनिकल निर्णय लिने तालिम'
  },
  'teacher.process.surgical': {
    en: 'Surgical Training',
    np: 'शल्यक्रिया तालिम'
  },
  'teacher.process.surgical.desc': {
    en: 'Progressive surgical training from basic to complex procedures under expert supervision',
    np: 'विशेषज्ञ पर्यवेक्षण अन्तर्गत आधारभूतदेखि जटिल प्रक्रियाहरूसम्मको प्रगतिशील शल्यक्रिया तालिम'
  },
  'teacher.process.research': {
    en: 'Research Guidance',
    np: 'अनुसन्धान मार्गदर्शन'
  },
  'teacher.process.research.desc': {
    en: 'Supervision of thesis work, research methodology, and publication guidance',
    np: 'थेसिस कार्य, अनुसन्धान पद्धति, र प्रकाशन मार्गदर्शनको पर्यवेक्षण'
  },
  'teacher.process.assessment': {
    en: 'Assessment & Certification',
    np: 'मूल्याङ्कन र प्रमाणीकरण'
  },
  'teacher.process.assessment.desc': {
    en: 'Comprehensive evaluation through written exams, practical assessments, and viva voce',
    np: 'लिखित परीक्षा, व्यावहारिक मूल्याङ्कन, र मौखिक परीक्षा मार्फत व्यापक मूल्याङ्कन'
  },

  // Contributions to Education
  'teacher.contrib.title': {
    en: 'Contributions to Urological Education in Nepal',
    np: 'नेपालमा मूत्र रोग शिक्षामा योगदानहरू'
  },
  'teacher.contrib.curriculum': {
    en: 'Curriculum Development',
    np: 'पाठ्यक्रम विकास'
  },
  'teacher.contrib.curriculum.desc': {
    en: 'Developed comprehensive MCh Urology curriculum aligned with international standards while addressing Nepal-specific urological challenges.',
    np: 'नेपाल-विशिष्ट मूत्र रोग चुनौतीहरूलाई सम्बोधन गर्दै अन्तर्राष्ट्रिय मापदण्डहरूसँग मेल खाने व्यापक MCh मूत्र रोग पाठ्यक्रम विकास।'
  },
  'teacher.contrib.curriculum.impact': {
    en: 'Standardized urological education across Nepal',
    np: 'नेपालभर मानकीकृत मूत्र रोग शिक्षा'
  },
  'teacher.contrib.methodology': {
    en: 'Hands-on Training Methodology',
    np: 'प्रयोगात्मक तालिम पद्धति'
  },
  'teacher.contrib.methodology.desc': {
    en: 'Introduced innovative teaching methods combining traditional mentorship with modern simulation-based learning.',
    np: 'परम्परागत मेन्टरशिपलाई आधुनिक सिमुलेशन-आधारित सिकाइसँग मिलाएर नवाचारपूर्ण शिक्षण विधिहरू प्रस्तुत।'
  },
  'teacher.contrib.methodology.impact': {
    en: 'Improved surgical skills and confidence among trainees',
    np: 'प्रशिक्षार्थीहरूमा सुधारिएको शल्यक्रिया सीप र आत्मविश्वास'
  },
  'teacher.contrib.supervision': {
    en: 'Research Supervision',
    np: 'अनुसन्धान पर्यवेक्षण'
  },
  'teacher.contrib.supervision.desc': {
    en: 'Guided numerous research projects and thesis works, promoting evidence-based urological practice in Nepal.',
    np: 'नेपालमा प्रमाणमा आधारित मूत्र रोग अभ्यासलाई बढावा दिँदै धेरै अनुसन्धान परियोजनाहरू र थेसिस कार्यहरूको मार्गदर्शन।'
  },
  'teacher.contrib.supervision.impact': {
    en: 'Enhanced research culture in Nepali urology',
    np: 'नेपाली मूत्र रोगमा बढाइएको अनुसन्धान संस्कृति'
  },
  'teacher.contrib.exposure': {
    en: 'International Exposure',
    np: 'अन्तर्राष्ट्रिय एक्सपोजर'
  },
  'teacher.contrib.exposure.desc': {
    en: 'Facilitated international training opportunities and exchanges for deserving students and junior faculty.',
    np: 'योग्य विद्यार्थीहरू र कनिष्ठ संकायका लागि अन्तर्राष्ट्रिय तालिम अवसरहरू र आदानप्रदानको सुविधा।'
  },
  'teacher.contrib.exposure.impact': {
    en: 'Global perspective in local practice',
    np: 'स्थानीय अभ्यासमा विश्वव्यापी दृष्टिकोण'
  },
  'teacher.impact': {
    en: 'Impact',
    np: 'प्रभाव'
  },

  // Teaching Philosophy
  'teacher.philosophy.title': {
    en: 'Teaching Philosophy',
    np: 'शिक्षण दर्शन'
  },
  'teacher.philosophy.quote': {
    en: '"Education is not just about imparting knowledge, but about inspiring confidence, fostering critical thinking, and nurturing compassionate healers who will serve Nepal with dedication and excellence."',
    np: '"शिक्षा भनेको केवल ज्ञान प्रदान गर्नु मात्र होइन, बल्कि आत्मविश्वास प्रेरणा गर्नु, आलोचनात्मक सोच विकास गर्नु, र नेपालको समर्पण र उत्कृष्टताका साथ सेवा गर्ने दयालु निको पालनपोषण गर्नु हो।"'
  },
  'teacher.philosophy.excellence': {
    en: 'Clinical Excellence',
    np: 'क्लिनिकल उत्कृष्टता'
  },
  'teacher.philosophy.precision': {
    en: 'Precision & Care',
    np: 'परिशुद्धता र हेरचाह'
  },
  'teacher.philosophy.mentorship': {
    en: 'Mentorship',
    np: 'मेन्टरशिप'
  },

  // Page titles for new pages
  'page.contribution.title': {
    en: 'Contribution to NAUS',
    np: 'NAUS मा योगदान'
  },
  'page.teacher.title': {
    en: 'Dr. As a Teacher',
    np: 'डाक्टर शिक्षकको रूपमा'
  },
  'page.lectures.title': {
    en: 'Lectures and Talks Abroad',
    np: 'विदेशी व्याख्यान र भाषणहरू'
  },

  // SEO Keywords (for meta tags)
  'seo.keywords': {
    en: 'urologist nepal, best urologist, kidney transplant nepal, urology hospital, TURP nepal',
    np: 'मूत्र रोग विशेषज्ञ नेपाल, उत्तम मूत्र रोग विशेषज्ञ, मिर्गौला प्रत्यारोपण नेपाल, मूत्र रोग अस्पताल, TURP नेपाल'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
