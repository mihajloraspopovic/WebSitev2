
import React, { useState, useEffect } from 'react';
import { FaGithub, FaFilePdf, FaBehance } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

const DesignSection = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInLeft', 0);
  const contentAnimation = useScrollAnimation('fadeInRight', 300);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const designs = [
    {
      id: 1,
      title: t('design.project1.title'),
      description: t('design.project1.description'),
      subtitle1: t('design.project1.subtitle1'),
      subtitle2: t('design.project1.subtitle2'),
      type: 'buttons',
      buttons: [
        { name: 'PDF', bg: 'bg-white', hover: 'hover:bg-gray-100', link: '/pdf/WebsiteDesign.pdf' }, // Add link property
        { name: 'Behance', bg: 'bg-white', hover: 'hover:bg-gray-100', link: 'https://www.behance.net/gallery/223385049/Web-Design' } // Add Behance button
      ],
      image: '/lovable-uploads/lapsajt.png'
    },
    {
      id: 2,
      title: t('design.project2.title'),
      description: t('design.project2.description'),
      subtitle1: t('design.project2.subtitle1'),
      subtitle2: t('design.project2.subtitle2'),
      type: 'buttons',
      buttons: [
        { name: 'PDF', bg: 'bg-white', hover: 'hover:bg-gray-100', link: '/pdf/VisitCard.pdf' }, // Add link property
        { name: 'Behance', bg: 'bg-white', hover: 'hover:bg-gray-100', link: 'https://www.behance.net/gallery/231925431/Tennis-Coach-Visit-Card' } // Add Behance button
      ],
      image: '/lovable-uploads/mockup.png'
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section 
      id="design" 
      className="min-h-screen bg-[#061229] text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <div ref={titleAnimation.ref}>
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-12 transition-all duration-800 ${titleAnimation.animationClass}`}>
            {t('design.title')}
          </h1>
        </div>
        
        <div ref={contentAnimation.ref}>
          <Carousel 
            setApi={setApi}
            className={`w-full max-w-3xl mx-auto transition-all duration-800 ${contentAnimation.animationClass}`}
          >
            <CarouselContent>
              {designs.map((design) => (
                <CarouselItem key={design.id}>
                  <div className="lg:flex lg:items-start lg:justify-between w-full">
                    {/* Left side - Text content */}
                    <div className="lg:w-1/2 text-left space-y-4 mb-8 lg:mb-0">
                      <h2 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl mb-4 whitespace-pre-line">
                        {design.title}
                      </h2>
                      
                      <p className="font-poppins text-sm sm:text-base md:text-lg text-paragraph-color mb-6 whitespace-pre-line">
                        {design.description}
                      </p>
                      
                      <h4 className="font-poppins font-bold text-lg sm:text-xl md:text-2xl">
                        {design.subtitle2}
                      </h4>
                    </div>
                    
                    {/* Right side - Image and buttons */}
                    <div className="lg:w-1/1 lg:pl-8 flex flex-col items-center space-y-0">
                      <div className="w-64 h-80 sm:w-80 sm:h-96 flex items-center justify-center overflow-hidden">
                        {design.image ? (
                          <img 
                            src={design.image} 
                            alt={`${design.title} preview`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-palette-gold/60">
                            <div className="w-16 h-16 bg-palette-gold/30 rounded-full mx-auto mb-4"></div>
                            <p className="font-poppins">Design Image Placeholder</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-center space-x-6">
                        {design.buttons?.map((button, index) => {
                          let IconComponent = null;
                          if (button.name === 'GitHub') IconComponent = FaGithub;
                          else if (button.name === 'PDF') IconComponent = FaFilePdf;
                          else if (button.name === 'Behance') IconComponent = FaBehance; // Add Behance icon condition

                          return (
                            <a 
                              key={index}
                              href={button.link} // Use the link property here
                              target="_blank" // Open in new tab
                              rel="noopener noreferrer" // Security best practice
                              className={`w-16 h-16 ${button.bg} rounded-lg flex items-center justify-center ${button.hover} transition-colors duration-300`}
                            >
                              {IconComponent ? <IconComponent className="text-palette-blue text-3xl" /> : <span className="text-palette-gold font-poppins font-bold text-sm">{button.name}</span>}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Bullet indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index + 1 === current ? 'bg-palette-blue' : 'bg-palette-gold/30'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSection;
