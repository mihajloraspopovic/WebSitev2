
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

const CareerPathSection = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInUp', 0);
  const contentAnimation = useScrollAnimation('fadeInLeft', 200);

  const careerSections = [
    {
      title: t('career.web_dev.title'),
      content: t('career.web_dev.content')
    },
    {
      title: t('career.devops.title'),
      content: t('career.devops.content')
    },
    {
      title: t('career.software_dev.title'),
      content: t('career.software_dev.content')
    },
    {
      title: t('career.ui_ux.title'),
      content: t('career.ui_ux.content')
    }
  ];

  return (
    <section 
      id="career" 
      className="min-h-screen bg-palette-dark text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #061229, #01708e'
      }}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div ref={titleAnimation.ref} className="mb-12">
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-center transition-all duration-800 ${titleAnimation.animationClass}`}>
            {t('career.title')}
          </h1>
        </div>
        
        <div ref={contentAnimation.ref} className={`space-y-8 transition-all duration-800 ${contentAnimation.animationClass}`}>
          {careerSections.map((section, index) => (
            <div key={index} className="border border-palette-gold/20 rounded-lg p-6">
              <h3 className="font-poppins font-bold text-xl sm:text-2xl text-palette-gold mb-4">
                {section.title}
              </h3>
              <p className="font-poppins text-sm sm:text-base text-paragraph-color leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathSection;
