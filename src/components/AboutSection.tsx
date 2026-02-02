
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

const AboutSection = () => {
  const { t } = useTranslation();


  const educationTimeline = [
    {
      id: 1,
      title: t('about.university'),
      period: t('about.university_period')
    },
    {
      id: 2,
      title: t('about.developer_lab'),
      period: t('about.developer_lab_period')
    }
  ];

  const experienceTimeline = [
    {
      id: 1,
      title: t('about.graphic_designer'),
      period: t('about.graphic_designer_period')
    },
    {
      id: 2,
      title: t('about.endcode'),
      period: t('about.endcode_period')
    }
  ];



  return (
    <section 
  id="about" 
  className="min-h-screen text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16" 
  style={{
    backgroundImage: `linear-gradient(to bottom, #061229 0%,rgba(0,0,0,0.0),rgba(0,0,0,0.0) , rgba(6, 18, 41, 1)), url(${import.meta.env.BASE_URL}lovable-uploads/pozadina2.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
      <div className="max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About Section */}
          <div className="space-y-8">
            <div>
              <h1 className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl mb-8">
                {t('about.title')}
              </h1>
              
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-palette-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src={`${import.meta.env.BASE_URL}lovable-uploads/me.jpg`} alt="Me" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-palette-gold/60">
                    {t('about.employee')}
                  </div>
                  <div className="text-xs text-palette-gold/60">
                    {t('about.location')}
                  </div>
                  <div className="text-xs text-palette-gold/60">
                    {t('about.language')}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-poppins font-bold text-xl whitespace-pre-line">
                  {t('about.greeting')}
                </h2>
                
                <p className="font-poppins text-sm leading-relaxed text-paragraph-color">
                  {t('about.description')}
                </p>
                
                <div className="flex justify-start mt-6">
                  <Link 
                    to="/documentation"
                    className="inline-flex items-center px-6 py-3 bg-palette-blue hover:bg-palette-blue/80 text-white font-poppins font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    View Documentation
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline Section */}
          <div className="space-y-12">
            {/* Timeline Header */}
            <div>
              <h2 className="font-poppins font-bold text-4xl sm:text-5xl mb-8">
                {t('about.timeline')}
              </h2>
            </div>
            
            {/* Education Timeline */}
            <div>
              <h3 className="font-poppins font-bold text-2xl mb-6">{t('about.education')}</h3>
              
              <div className="relative border-l-2 border-palette-gold pl-8">
                {educationTimeline.map((item, index) => (
                  <div key={item.id} className="mb-8 last:mb-0">
                    <div className="absolute w-4 h-4 bg-palette-gold rounded-full -left-2 top-0 transform -translate-y-1/2"></div>
                    <div className="bg-palette-blue p-4 rounded-lg shadow-lg">
                      <h4 className="font-poppins font-bold text-lg text-palette-gold">{item.title}</h4>
                      <p className="font-poppins text-sm text-paragraph-color">{item.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Experience Timeline */}
            <div>
              <h3 className="font-poppins font-bold text-2xl mb-6">{t('about.experience')}</h3>
              
              <div className="relative border-l-2 border-palette-gold pl-8">
                {experienceTimeline.map((item, index) => (
                  <div key={item.id} className="mb-8 last:mb-0">
                    <div className="absolute w-4 h-4 bg-palette-gold rounded-full -left-2 top-0 transform -translate-y-1/2"></div>
                    <div className="bg-palette-tamna p-4 rounded-lg shadow-lg">
                      <h4 className="font-poppins font-bold text-lg text-palette-gold">{item.title}</h4>
                      <p className="font-poppins text-sm text-paragraph-color">{item.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
