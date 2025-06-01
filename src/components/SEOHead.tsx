import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  author?: string;
  publishedTime?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage = 'https://drparashmani.com.np/lovable-uploads/ec142a21-cb09-4e88-baf2-e729d0027613.png',
  canonical,
  author = 'Dr. Parash Mani Shrestha',
  publishedTime,
  structuredData,
}) => {
  const { language } = useLanguage();

  // Enhanced keywords with local intent and medical specialties
  const defaultKeywordsEn = 'urologist in Kathmandu, best urologist in Kathmandu, top urologist Kathmandu, kidney specialist Kathmandu, urology doctor Kathmandu, Dr Parash Mani Shrestha, Blue Cross Hospital urologist, kidney transplant Nepal, prostate treatment Kathmandu, TURP surgery Kathmandu, urologic cancer treatment Nepal';
  const defaultKeywordsNp = 'काठमाडौंमा युरोलोजिस्ट, काठमाडौंमा उत्तम मूत्ररोग विशेषज्ञ, डा पारस मणि श्रेष्ठ, ब्लु क्रस अस्पताल मूत्ररोग विशेषज्ञ, नेपालमा मिर्गौला प्रत्यारोपण, काठमाडौंमा प्रोस्टेट उपचार, TURP शल्यक्रिया नेपाल';

  const defaultKeywords = language === 'en' ? defaultKeywordsEn : defaultKeywordsNp;

  const siteTitle = 'Best Urologist in Kathmandu - Dr. Parash Mani Shrestha';
  const fullTitle = title.includes('Dr. Parash Mani Shrestha') ? title : `${title} | ${siteTitle}`;

  // Fallback image for social sharing
  const fallbackImage = 'https://drparashmani.com.np/lovable-uploads/5c81b557-5e86-4894-8135-0496808d13cf.png';

  // Generate dynamic breadcrumbs based on canonical path
  const generateBreadcrumbs = (canonicalPath: string) => {
    if (!canonicalPath || canonicalPath === '/') return null;

    const pathSegments = canonicalPath.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drparashmani.com.np"
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `https://drparashmani.com.np${currentPath}`
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
  };

  // Only apply comprehensive schemas on homepage
  const isHomepage = canonical === '/' || !canonical;

  // Enhanced medical schema with local SEO for homepage
  const enhancedMedicalSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": ["Physician", "Person", "LocalBusiness"],
    "name": "Dr. Parash Mani Shrestha",
    "alternateName": [
      "Dr Parash Mani Shrestha",
      "Parash Mani Shrestha",
      "Dr. Parash Shrestha",
      "डा. पारस मणि श्रेष्ठ"
    ],
    "jobTitle": "Senior Consultant Urosurgeon and Professor of Urology",
    "medicalSpecialty": [
      {
        "@type": "MedicalSpecialty",
        "name": "Urology"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Urosurgery"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Kidney Transplantation"
      },
      {
        "@type": "MedicalSpecialty",
        "name": "Urologic Oncology"
      }
    ],
    "description": "Dr. Parash Mani Shrestha, the best urologist in Kathmandu, provides expert urology services at Blue Cross Hospital and Bir Hospital, specializing in kidney transplants, TURP surgery, and urologic cancer treatments.",
    "url": "https://drparashmani.com.np",
    "image": {
      "@type": "ImageObject",
      "url": "https://drparashmani.com.np/lovable-uploads/ec142a21-cb09-4e88-baf2-e729d0027613.png",
      "width": 1200,
      "height": 630
    },
    "telephone": "+977-1-4262331",
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Blue Cross Hospital",
        "streetAddress": "Tripureshwor",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati Province",
        "postalCode": "44600",
        "addressCountry": "Nepal"
      },
      {
        "@type": "PostalAddress",
        "name": "Bir Hospital",
        "streetAddress": "Mahabouddha",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati Province",
        "addressCountry": "Nepal"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.7172,
      "longitude": 85.3240
    },
    "openingHours": [
      "Mo-Fr 09:00-17:00",
      "Sa 09:00-13:00"
    ],
    "worksFor": [
      {
        "@type": "Hospital",
        "name": "Blue Cross Hospital",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Tripureshwor",
          "addressLocality": "Kathmandu",
          "addressRegion": "Bagmati Province",
          "addressCountry": "Nepal"
        }
      },
      {
        "@type": "Hospital",
        "name": "Bir Hospital",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Mahabouddha",
          "addressLocality": "Kathmandu",
          "addressRegion": "Bagmati Province",
          "addressCountry": "Nepal"
        }
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Kathmandu"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Medical Degree",
        "name": "MBBS"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Medical Specialization",
        "name": "MS Urology"
      }
    ],
    "memberOf": {
      "@type": "MedicalOrganization",
      "name": "Nepal Medical Association"
    },
    "sameAs": [
      "https://drparashmani.com.np"
    ],
    "keywords": ["urologist in Kathmandu", "best urologist Kathmandu", "kidney specialist Kathmandu"]
  } : null;

  // Website schema only for homepage
  const websiteSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dr. Parash Mani Shrestha - Urologist in Kathmandu",
    "alternateName": "Dr Parash Mani Shrestha",
    "url": "https://drparashmani.com.np",
    "description": "Official website of Dr. Parash Mani Shrestha, the best urologist in Kathmandu, specializing in kidney transplants, TURP surgery, and urologic cancer treatments.",
    "publisher": {
      "@type": "Person",
      "name": "Dr. Parash Mani Shrestha"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://drparashmani.com.np/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  } : null;

  // Medical Organization schema only for homepage
  const medicalOrganizationSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Dr. Parash Mani Shrestha Urology Practice",
    "url": "https://drparashmani.com.np",
    "logo": {
      "@type": "ImageObject",
      "url": "https://drparashmani.com.np/lovable-uploads/ec142a21-cb09-4e88-baf2-e729d0027613.png"
    },
    "description": "Leading urology practice in Kathmandu providing comprehensive urological care including kidney transplants, cancer treatment, and minimally invasive procedures.",
    "address": [
      {
        "@type": "PostalAddress",
        "name": "Blue Cross Hospital",
        "streetAddress": "Tripureshwor",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati Province",
        "addressCountry": "Nepal"
      },
      {
        "@type": "PostalAddress",
        "name": "Bir Hospital",
        "streetAddress": "Mahabouddha",
        "addressLocality": "Kathmandu",
        "addressRegion": "Bagmati Province",
        "addressCountry": "Nepal"
      }
    ],
    "telephone": "+977-1-4262331",
    "medicalSpecialty": "Urology",
    "founder": {
      "@type": "Person",
      "name": "Dr. Parash Mani Shrestha"
    },
    "priceRange": "$$"
  } : null;

  // FAQ Schema only for homepage
  const faqSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Dr. Parash Mani Shrestha?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Parash Mani Shrestha is the best urologist in Kathmandu with over 20 years of experience, specializing in kidney transplants, TURP surgery, and urologic cancer treatments at Blue Cross Hospital and Bir Hospital."
        }
      },
      {
        "@type": "Question",
        "name": "What urological conditions does Dr. Parash Mani Shrestha treat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Parash Mani Shrestha treats kidney stones, prostate diseases, urologic cancers, bladder conditions, performs kidney transplants, TURP surgeries, and provides comprehensive urological care in Kathmandu."
        }
      },
      {
        "@type": "Question",
        "name": "Where does Dr. Parash Mani Shrestha practice in Kathmandu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dr. Parash Mani Shrestha practices at Blue Cross Hospital in Tripureshwor and Bir Hospital in Kathmandu, Nepal, as a Senior Consultant Urosurgeon."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book an appointment with Dr. Parash Mani Shrestha?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book an appointment with Dr. Parash Mani Shrestha by contacting Blue Cross Hospital at +977-1-4262331 or visiting the hospitals directly in Kathmandu."
        }
      }
    ]
  } : null;

  // Dynamic breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbs(canonical || '');

  // Safe JSON stringify function to prevent errors
  const safeStringify = (obj: any) => {
    try {
      return JSON.stringify(obj, null, 0);
    } catch (error) {
      console.error('Schema JSON stringify error:', error);
      return '{}';
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description || 'Dr. Parash Mani Shrestha, the best urologist in Kathmandu, offers expert care at Blue Cross Hospital. Book your appointment for kidney, prostate, and cancer treatments!'} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="last-modified" content={publishedTime || '2025-06-01'} />

      {/* Enhanced Open Graph / Facebook with fallback */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || 'Dr. Parash Mani Shrestha, the best urologist in Kathmandu, provides expert urology services at Blue Cross Hospital and Bir Hospital. Book your appointment today!'} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:fallback" content={fallbackImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Dr. Parash Mani Shrestha - Best Urologist in Kathmandu" />
      <meta property="og:site_name" content="Dr. Parash Mani Shrestha" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : 'ne_NP'} />
      <meta property="profile:first_name" content="Parash Mani" />
      <meta property="profile:last_name" content="Shrestha" />
      <meta property="profile:username" content="Dr. Parash Mani Shrestha" />
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Enhanced Twitter with improved alt text */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || 'Dr. Parash Mani Shrestha, the best urologist in Kathmandu, offers expert care at Blue Cross Hospital. Book your appointment for urology treatments!'} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Dr. Parash Mani Shrestha - Best Urologist in Kathmandu providing expert medical care" />

      {/* Additional meta tags for better indexing */}
      <meta name="geo.region" content="NP-3" />
      <meta name="geo.placename" content="Kathmandu" />
      <meta name="geo.position" content="27.7172;85.3240" />
      <meta name="ICBM" content="27.7172, 85.3240" />

      {/* Medical specific meta tags */}
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.creator" content="Dr. Parash Mani Shrestha" />
      <meta name="DC.subject" content="Urology, Medical Services, Healthcare, Kidney Transplant, TURP Surgery" />
      <meta name="DC.description" content={description || 'Leading urologist in Kathmandu specializing in kidney transplants, TURP surgery, and urologic cancer treatments.'} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`https://drparashmani.com.np${canonical}`} />}

      {/* Hreflang tags for language alternatives (no query parameters) */}
      <link rel="alternate" hrefLang="en" href={`https://drparashmani.com.np${canonical || ''}`} />
      <link rel="alternate" hrefLang="ne" href={`https://drparashmani.com.np${canonical || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://drparashmani.com.np${canonical || ''}`} />

      {/* Page-specific structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {safeStringify(structuredData)}
        </script>
      )}

      {/* Homepage-only schemas to prevent duplication */}
      {enhancedMedicalSchema && (
        <script type="application/ld+json">
          {safeStringify(enhancedMedicalSchema)}
        </script>
      )}

      {websiteSchema && (
        <script type="application/ld+json">
          {safeStringify(websiteSchema)}
        </script>
      )}

      {medicalOrganizationSchema && (
        <script type="application/ld+json">
          {safeStringify(medicalOrganizationSchema)}
        </script>
      )}

      {faqSchema && (
        <script type="application/ld+json">
          {safeStringify(faqSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {safeStringify(breadcrumbSchema)}
        </script>
      )}

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {/* Blog content styling */}
      <style>{`
        .blog-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1.5rem auto;
          border-radius: 0.375rem;
        }

        .blog-content h1, .blog-content h2, .blog-content h3,
        .blog-content h4, .blog-content h5, .blog-content h6 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          line-height: 1.2;
        }

        .blog-content p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }

        .blog-content ul, .blog-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
        }

        .blog-content blockquote {
          border-left: 4px solid #0096cc;
          padding-left: 1rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #4b5563;
        }

        .blog-content pre {
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin-bottom: 1rem;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1rem;
        }

        .blog-content th, .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.5rem;
          text-align: left;
        }

        .blog-content th {
          background-color: #f9fafb;
        }
      `}</style>
    </Helmet>
  );
};

export default SEOHead;
