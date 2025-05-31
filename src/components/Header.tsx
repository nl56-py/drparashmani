
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'np' : 'en');
  };

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.expertise'), href: '/expertise' },
    { label: t('nav.urology'), href: '/urology-info' },
    { label: t('nav.contribution'), href: '/contribution-to-naus' },
    { label: t('nav.teacher'), href: '/dr-as-teacher' },
    { label: t('nav.lectures'), href: '/lectures-abroad' },
    { label: t('nav.blog'), href: '/blog' },
    { label: t('nav.videos'), href: '/videos' },
    { label: t('nav.contact'), href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo with doctor's photo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <LazyImage 
                src="/lovable-uploads/5c81b557-5e86-4894-8135-0496808d13cf.png" 
                alt="Dr. Parash Mani Shrestha"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm lg:text-base xl:text-lg font-bold text-doctor-blue-dark whitespace-nowrap">
              Dr. Parash Mani Shrestha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-gray-700 hover:text-doctor-blue transition-colors font-medium text-xs whitespace-nowrap px-1 py-1 rounded-md hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={toggleLanguage}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-doctor-blue hover:bg-gray-100 flex items-center gap-1 text-xs ml-1"
            >
              <Globe size={12} />
              {language === 'en' ? 'नेपाली' : 'English'}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="sm"
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="max-h-96 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                variant="ghost"
                size="sm"
                className="text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100 w-full justify-start transition-colors flex items-center gap-2 text-sm"
              >
                <Globe size={16} />
                {language === 'en' ? 'नेपाली' : 'English'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
