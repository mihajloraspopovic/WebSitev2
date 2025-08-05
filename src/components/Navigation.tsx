import React, { useState } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, toggleLanguage } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const navItems = [
    { href: "#home", label: t('nav.home') },
    { href: "#projects", label: t('nav.projects') },
    { href: "#design", label: t('nav.design') },
    { href: "#about", label: t('nav.about') },
    { href: "#skills", label: t('nav.skills') },
    { href: "#career", label: t('nav.career') }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#061229]/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-palette-gold font-poppins font-semibold text-lg">
              Mihajlo Raspopović
            </span>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-palette-gold hover:text-palette-blue font-poppins font-medium transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Contact Button */}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="bg-palette-gold hover:bg-palette-blue/90 text-palette-dark font-poppins font-bold py-2 px-6 transition-colors duration-300 cursor-pointer"
            >
              {t('nav.contact')}
            </a>
            
            {/* Translate Button */}
            <button
              onClick={toggleLanguage}
              className="text-palette-gold hover:text-palette-blue transition-colors duration-300 p-2"
              aria-label="Toggle language"
            >
              <Languages size={20} />
            </button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-palette-gold hover:text-palette-blue focus:outline-none focus:text-palette-blue transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu with smooth animation */}
      <div className={`md:hidden bg-palette-dark/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-palette-gold hover:text-palette-blue block px-3 py-2 font-poppins font-medium transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile Contact Button */}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, '#contact')}
            className="bg-palette-gold hover:bg-palette-gold/90 text-palette-dark font-poppins font-bold block px-3 py-2 mt-4 mx-3 text-center transition-colors duration-300 cursor-pointer"
          >
            {t('nav.contact')}
          </a>
          
          {/* Mobile Translate Button */}
          <button
            onClick={toggleLanguage}
            className="text-palette-gold hover:text-palette-blue block px-3 py-2 mx-3 text-left transition-colors duration-300"
            aria-label="Toggle language"
          >
            <Languages size={20} className="inline mr-2" />
            Translate
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
