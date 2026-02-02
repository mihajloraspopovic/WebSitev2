
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaYoutube, FaArrowRight, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaBehance, FaLinkedin } from 'react-icons/fa';
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
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from Strapi and combine with existing ones
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Determine locale based on current language
        const locale = t('language') === 'sr' ? 'sr' : 'en';
        const response = await fetch(`https://smart-prize-e8d4f9d44e.strapiapp.com/api/articles?populate=*&filters[category][name][$eq]=Project&locale=${locale}`);
        const data = await response.json();
        
        // Original hardcoded projects
        const originalProjects = [
          {
            id: 'original-1',
            title: t('projects.project1.title'),
            description: t('projects.project1.description'),
            subtitle1: t('projects.project1.subtitle1'),
            subtitle2: t('projects.project1.subtitle2'),
            type: 'buttons',
            buttons: [
              { name: 'GitHub', bg: 'bg-gray-800', hover: 'hover:bg-gray-700', link: 'https://github.com/mihajloraspopovic/Python-Projekat' },
              { name: 'YouTube', bg: 'bg-palette-red', hover: 'hover:bg-palette-red/80', link: 'https://www.youtube.com/watch?v=hrvdmmHy9vs' }
            ],
            image: `${import.meta.env.BASE_URL}lovable-uploads/tablet.png`
          },
          {
            id: 'original-2',
            title: t('projects.project2.title'),
            description: t('projects.project2.description'),
            subtitle1: t('projects.project2.subtitle1'),
            subtitle2: t('projects.project2.subtitle2'),
            type: 'ip',
            serverIp: 'mc.mraspopovic.me:42357',
            image: `${import.meta.env.BASE_URL}lovable-uploads/server.png`
          }
        ];
        
        // Parse Strapi projects if they exist
        let strapiProjects = [];
        if (data.data && Array.isArray(data.data)) {
          strapiProjects = data.data.map((item: any) => {
            const attributes = item.attributes || item;
            
            // Extract image URL from the nested structure
            let imageUrl = null;
            
            // Try different possible structures
            if (attributes.cover?.formats?.large?.url) {
              imageUrl = attributes.cover.formats.large.url;
            } else if (attributes.cover?.url) {
              imageUrl = attributes.cover.url;
            } else if (attributes.cover?.data?.attributes?.formats?.large?.url) {
              imageUrl = attributes.cover.data.attributes.formats.large.url;
            } else if (attributes.cover?.data?.attributes?.url) {
              imageUrl = attributes.cover.data.attributes.url;
            }
            
            // Smart button generation based on URLs in links field (prioritize) or slug field (fallback)
            let smartButtons = [];
            const urlField = attributes.links || attributes.slug;
            if (urlField) {
              // Split by spaces to handle multiple URLs
              const urls = urlField.split(/\s+/).filter((url: string) => url.trim());
              
              urls.forEach((url: string) => {
                if (url.includes('github.com')) {
                  smartButtons.push({
                    name: 'GitHub',
                    bg: 'bg-gray-800',
                    hover: 'hover:bg-gray-700',
                    link: url
                  });
                } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
                  smartButtons.push({
                    name: 'YouTube',
                    bg: 'bg-palette-red',
                    hover: 'hover:bg-palette-red/80',
                    link: url
                  });
                } else if (url.includes('behance.net')) {
                  smartButtons.push({
                    name: 'Behance',
                    bg: 'bg-blue-600',
                    hover: 'hover:bg-blue-700',
                    link: url
                  });
                } else if (url.includes('linkedin.com')) {
                  smartButtons.push({
                    name: 'LinkedIn',
                    bg: 'bg-blue-700',
                    hover: 'hover:bg-blue-800',
                    link: url
                  });
                } else if (url.startsWith('http')) {
                  // Generic website button for other URLs
                  smartButtons.push({
                    name: 'Visit Site',
                    bg: 'bg-palette-blue',
                    hover: 'hover:bg-palette-blue/80',
                    link: url
                  });
                }
              });
            }
            
            return {
              id: `strapi-${item.id}`,
              title: attributes.title || 'Untitled Project',
              description: attributes.description || 'No description available',
              subtitle1: attributes.title || 'Untitled Project',
              subtitle2: attributes.tools || 'Project Tools',
              type: smartButtons.length > 0 ? 'buttons' : (attributes.slug && !attributes.slug.includes('http') ? 'ip' : 'buttons'),
              serverIp: (attributes.slug && !attributes.slug.includes('http') && smartButtons.length === 0) ? attributes.slug : null,
              buttons: smartButtons.length > 0 ? smartButtons : null,
              image: imageUrl || `${import.meta.env.BASE_URL}lovable-uploads/tablet.png`
            };
          });
        }
        
        // Combine original projects with Strapi projects
        setProjects([...originalProjects, ...strapiProjects]);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to original projects only
        setProjects([
          {
            id: 'original-1',
            title: t('projects.project1.title'),
            description: t('projects.project1.description'),
            subtitle1: t('projects.project1.subtitle1'),
            subtitle2: t('projects.project1.subtitle2'),
            type: 'buttons',
            buttons: [
              { name: 'GitHub', bg: 'bg-gray-800', hover: 'hover:bg-gray-700', link: 'https://github.com/mihajloraspopovic/Python-Projekat' },
              { name: 'YouTube', bg: 'bg-palette-red', hover: 'hover:bg-palette-red/80', link: 'https://www.youtube.com/watch?v=hrvdmmHy9vs' }
            ],
            image: `${import.meta.env.BASE_URL}lovable-uploads/tablet.png`
          },
          {
            id: 'original-2',
            title: t('projects.project2.title'),
            description: t('projects.project2.description'),
            subtitle1: t('projects.project2.subtitle1'),
            subtitle2: t('projects.project2.subtitle2'),
            type: 'ip',
            serverIp: 'mc.mraspopovic.me:42357',
            image: `${import.meta.env.BASE_URL}lovable-uploads/server.png`
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [t]);

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
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(6, 18, 41, 1)), url(${import.meta.env.BASE_URL}lovable-uploads/pozadina3.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <div ref={titleAnimation.ref}>
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 transition-all duration-800 ${titleAnimation.animationClass}`}>
            {t('projects.title')}
          </h1>
          <div className="flex justify-center mb-8">
            <Link 
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-palette-blue hover:bg-palette-blue/80 text-white font-poppins font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Projects
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
        
        <div ref={contentAnimation.ref}>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-palette-gold font-poppins text-lg">Loading projects...</div>
            </div>
          ) : (
            <div className="relative">
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
                              {project.buttons.map((button: any, index: number) => {
                                let IconComponent = null;
                                if (button.name === 'GitHub') IconComponent = FaGithub;
                                else if (button.name === 'YouTube') IconComponent = FaYoutube;
                                else if (button.name === 'Behance') IconComponent = FaBehance;
                                else if (button.name === 'LinkedIn') IconComponent = FaLinkedin;
                                else IconComponent = FaExternalLinkAlt;

                                return (
                                  <a
                                    key={index}
                                    href={button.link || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-16 h-16 ${button.bg} ${button.hover} rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300`}
                                    aria-label={button.name}
                                  >
                                    {IconComponent && <IconComponent className="text-white text-2xl" />}
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

              {/* Navigation Arrows - Desktop Only */}
              {count > 1 && (
                <>
                  <button
                    onClick={() => api?.scrollTo(current - 2 < 0 ? count - 1 : current - 2)}
                    className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-8 h-8 text-palette-gold hover:text-palette-blue items-center justify-center transition-all duration-300 hover:scale-125"
                    aria-label="Previous project"
                  >
                    <FaChevronLeft className="text-2xl" />
                  </button>
                  
                  <button
                    onClick={() => api?.scrollTo(current >= count ? 0 : current)}
                    className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-8 h-8 text-palette-gold hover:text-palette-blue items-center justify-center transition-all duration-300 hover:scale-125"
                    aria-label="Next project"
                  >
                    <FaChevronRight className="text-2xl" />
                  </button>
                </>
              )}
            </div>
          )}
          
          {/* Bullet indicators */}
          {!loading && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
