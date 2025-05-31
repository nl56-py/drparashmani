
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-6xl font-bold text-doctor-blue-dark mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            {language === 'en'
              ? 'Oops! The page you are looking for could not be found.'
              : 'उफ्! तपाईंले खोज्नुभएको पृष्ठ फेला पार्न सकिएन।'}
          </p>
          <Button asChild size="lg">
            <Link to="/">
              {language === 'en' ? 'Return to Home' : 'गृह पृष्ठमा फर्कनुहोस्'}
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
