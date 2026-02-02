
import React from 'react';
import { Github, Download, Instagram, Linkedin, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const Footer = ({ customBackground }: { customBackground?: string } = {}) => {
  const { t } = useTranslation();

  const MainLogo = () => (
    <img
      src="/Logo Transparent.png"
      alt="Mihajlo Raspopovic Logo"
      className="w-80 h-40 object-contain"
    />
  );

  return (
    <footer 
      id="footer" 
      className={`text-white relative overflow-hidden ${customBackground ? '' : 'bg-gradient-to-b from-[#01708e] to-[#061229]'}`}
      style={customBackground ? { backgroundImage: customBackground } : {}}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-palette-gold/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-palette-blue/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-palette-gold/20 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Top Section - Logo and Tagline */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <MainLogo />
              </div>
              <h2 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-palette-gold mb-4">
                Mihajlo Raspopovic
              </h2>
              <p className="font-poppins text-xl text-palette-blue max-w-2xl mx-auto">
                {t('footer.motivation')}
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="font-poppins font-bold text-xl text-palette-gold mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  {t('footer.talk')}
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:hello@mraspopovic.me"
                    className="font-poppins text-white hover:text-palette-blue transition-colors flex items-center group"
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:text-palette-blue" />
                    hello@mraspopovic.me
                  </a>
                  <div className="font-poppins text-white flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-palette-gold" />
                    Podgorica / Bar, Montenegro
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-6">
                <h3 className="font-poppins font-bold text-xl text-palette-gold mb-4">
                  {t('footer.find')}
                </h3>
                <div className="space-y-3">
                  <a href="https://instagram.com/raspopovic_m" target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-palette-blue transition-colors group">
                    <Instagram className="w-4 h-4 mr-2 group-hover:text-palette-blue" /> Instagram
                  </a>
                  <a href="https://linkedin.com/in/mihajlo-raspopović-80a212301" target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-palette-blue transition-colors group">
                    <Linkedin className="w-4 h-4 mr-2 group-hover:text-palette-blue" /> LinkedIn
                  </a>
                  <a href="https://facebook.com/profile.php?id=61576389900335" target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-palette-blue transition-colors group">
                    <Facebook className="w-4 h-4 mr-2 group-hover:text-palette-blue" /> Facebook
                  </a>
                  <a href="https://youtube.com/@MihajloRaspopovic" target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-palette-blue transition-colors group">
                    <Youtube className="w-4 h-4 mr-2 group-hover:text-palette-blue" /> YouTube
                  </a>
                </div>
              </div>

              {/* Professional Links */}
              <div className="space-y-6">
                <h3 className="font-poppins font-bold text-xl text-palette-gold mb-4">
                  {t('footer.links')}
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com/mihajloraspopovic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-palette-blue transition-colors group"
                  >
                    <Github className="w-4 h-4 mr-2 group-hover:text-palette-blue" /> {t('footer.github')}
                  </a>
                  <a
                    href="https://behance.net/mihajloraspopo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-palette-blue transition-colors"
                  >
                    {t('footer.behance')}
                  </a>
                  <a
                    href="pdf/CV.pdf"
                    download
                    className="flex items-center text-white hover:text-palette-blue transition-colors group"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover:text-palette-blue" /> {t('footer.resume')}
                  </a>
                </div>
              </div>

              {/* Quick Navigation */}
              <div className="space-y-6">
                <h3 className="font-poppins font-bold text-xl text-palette-gold mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a href="#projects" className="block text-white hover:text-palette-blue transition-colors">
                    Projects
                  </a>
                  <a href="#design" className="block text-white hover:text-palette-blue transition-colors">
                    Designs
                  </a>
                  <a href="#about" className="block text-white hover:text-palette-blue transition-colors">
                    About
                  </a>
                  <a href="#skills" className="block text-white hover:text-palette-blue transition-colors">
                    Skills
                  </a>
                  <a href="#contact" className="block text-white hover:text-palette-blue transition-colors">
                    Contact
                  </a>
                </div>
              </div>

            </div>

            {/* Call to Action */}
            <div className="text-center py-12 border-t border-palette-gold/20">
              <h3 className="font-poppins font-bold text-2xl text-palette-gold mb-4">
                Ready to work together?
              </h3>
              <p className="font-poppins text-white mb-6 max-w-2xl mx-auto">
                Let's create something amazing together. Get in touch and let's discuss your next project.
              </p>
              <a
                href="https://wa.me/38269439980"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-palette-blue to-[#48aec0] text-white font-poppins font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call me
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="bg-[#061229]/90 backdrop-blur-sm py-6 border-t border-palette-gold/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="font-poppins text-white/80 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex items-center space-x-6 text-sm text-white/60">
                <span>Full Stack Developer</span>
                <span>•</span>
                <span>Graphic Designer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
