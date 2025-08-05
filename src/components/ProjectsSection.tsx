
import React, { useState, useEffect } from 'react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

const ProjectsSection = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInDown', 0);
  const contentAnimation = useScrollAnimation('fadeInUp', 300);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const projects = [
    {
      id: 1,
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      subtitle1: t('projects.project1.subtitle1'),
      subtitle2: t('projects.project1.subtitle2'),
      type: 'buttons',
      buttons: [
        { name: 'GitHub', bg: 'bg-gray-800', hover: 'hover:bg-gray-700', link: 'https://github.com/mihajloraspopovic/Python-Projekat' },
      { name: 'YouTube', bg: 'bg-palette-red', hover: 'hover:bg-palette-red/80', link: 'https://www.youtube.com/watch?v=hrvdmmHy9vs' }
      ],
      image: '/lovable-uploads/tablet.png'
    },
    {
      id: 2,
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      subtitle1: t('projects.project2.subtitle1'),
      subtitle2: t('projects.project2.subtitle2'),
      type: 'ip',
      serverIp: 'mc.mraspopovic.me:42357',
      image: '/lovable-uploads/server.png'
    }
  ];

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section 
      id="projects" 
      className="min-h-screen bg-palette-dark text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
      style={{
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(6, 18, 41, 1)), url(/lovable-uploads/pozadina3.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <div ref={titleAnimation.ref}>
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-12 transition-all duration-800 ${titleAnimation.animationClass}`}>
            {t('projects.title')}
          </h1>
        </div>
        
        <div ref={contentAnimation.ref}>
          <Carousel 
            setApi={setApi}
            className={`w-full max-w-4xl mx-auto transition-all duration-800 ${contentAnimation.animationClass}`}
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id}>
                  <div className="lg:flex lg:items-start lg:justify-between w-full">
                    {/* Left side - Text content */}
                    <div className="lg:w-1/2 text-left space-y-4 mb-8 lg:mb-0 lg:pr-12">
                      <h2 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl mb-4 whitespace-pre-line">
                        {project.title}
                      </h2>
                      
                      <p className="font-poppins text-sm sm:text-base md:text-lg text-paragraph-color mb-6 whitespace-pre-line">
                        {project.description}
                      </p>
                      
                      <h4 className="font-poppins font-bold text-lg sm:text-xl md:text-2xl">
                        {project.subtitle2}
                      </h4>
                    </div>
                    
                    {/* Right side - Image and buttons */}
                    <div className="lg:w-1/2 flex flex-col items-center space-y-6">
                      <div className="w-64 h-80 sm:w-80 sm:h-80 flex items-center justify-center overflow-hidden">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={`${project.title} preview`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-center text-palette-gold/60">
                            <div className="w-16 h-16 bg-palette-gold/30 rounded-full mx-auto mb-4"></div>
                            <p className="font-poppins">Project Image Placeholder</p>
                          </div>
                        )}
                      </div>
                      
                      {project.type === "buttons" && project.buttons && (
                        <div className="flex justify-center space-x-6">
                          {project.buttons.map((button, index) => {
                            let IconComponent = null;
                            if (button.name === 'GitHub') IconComponent = FaGithub;
                            else if (button.name === 'YouTube') IconComponent = FaYoutube;

                            return (
                              <a
                                key={index}
                                href={button.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                                aria-label={button.name}
                              >
                                {IconComponent && <IconComponent className="text-palette-blue text-2xl" />}
                              </a>
                            );
                          })}
                        </div>
                      )}
                      
                      {project.type === "ip" && project.serverIp && (
                        <div className="flex justify-center">
                          <div className="bg-palette-gold/20 px-6 py-3 rounded-lg">
                            <span className="text-palette-gold font-poppins font-mono text-lg">
                              {project.serverIp}
                            </span>
                          </div>
                        </div>
                      )}
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

export default ProjectsSection;
