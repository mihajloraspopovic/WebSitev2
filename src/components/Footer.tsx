
import React from 'react';
import { Github, Download, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer id="footer" className="bg-palette-dark text-white">
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl text-palette-gold">
            {t('footer.motivation')}
          </h2>

          {/* Let's talk section */}
          <section>
            <h3 className="font-poppins font-semibold text-2xl text-palette-gold mb-4">
              {t('footer.talk')}
            </h3>
            <div className="w-20 h-0.5 bg-palette-gold mx-auto mb-6"></div>
            <a 
              href="mailto:hello@mraspopovic.me" 
              className="font-poppins text-palette-blue hover:text-palette-blue/80 transition-colors text-lg"
            >
              {t('footer.email')}
            </a>
          </section>

          {/* Find me online section */}
          <section>
            <h3 className="font-poppins font-semibold text-2xl text-palette-gold mb-4">
              {t('footer.find')}
            </h3>
            <div className="w-20 h-0.5 bg-palette-gold mx-auto mb-6"></div>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-8 text-palette-blue">
              <a href="https://instagram.com/raspopovic_m" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-palette-blue/80 transition-colors text-lg">
                <Instagram className="w-5 h-5" /> Instagram
              </a>
              <a href="https://linkedin.com/in/mihajlo-raspopović-80a212301" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-palette-blue/80 transition-colors text-lg">
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a href="https://facebook.com/profile.php?id=61576389900335" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-palette-blue/80 transition-colors text-lg">
                <Facebook className="w-5 h-5" /> Facebook
              </a>
              <a href="https://youtube.com/@MihajloRaspopovic" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-palette-blue/80 transition-colors text-lg">
                <Youtube className="w-5 h-5" /> YouTube
              </a>
            </div>
          </section>

          {/* My links section */}
          <section>
            <h3 className="font-poppins font-semibold text-2xl text-palette-gold mb-4">
              {t('footer.links')}
            </h3>
            <div className="w-20 h-0.5 bg-palette-gold mx-auto mb-6"></div>
            <div className="space-y-4">
              <a 
                href="https://github.com/mihajloraspopovic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-poppins text-palette-blue hover:text-palette-blue/80 transition-colors text-lg flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" /> {t('footer.github')}
              </a>
              <a 
                href="https://behance.net/mihajloraspopo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-poppins text-palette-blue hover:text-palette-blue/80 transition-colors text-lg"
              >
                {t('footer.behance')}
              </a>
              <a 
                href="pdf/CV.pdf" 
                download
                className="font-poppins text-palette-blue hover:text-palette-blue/80 transition-colors text-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> {t('footer.resume')}
              </a>
            </div>
          </section>

          {/* Motivational heading at bottom */}

        </div>
      </div>

      {/* Copyright - Full width section */}
      <div className="bg-palette-darkblue py-4 w-full">
        <p className="font-poppins text-white text-sm text-center">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
