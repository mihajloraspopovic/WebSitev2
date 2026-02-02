import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaFilePdf, FaBehance, FaArrowRight, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaYoutube, FaLinkedin } from 'react-icons/fa';
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
  const [designs, setDesigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch designs from Strapi and combine with existing ones
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        // Determine locale based on current language
        const locale = t('language') === 'sr' ? 'sr' : 'en';
        const response = await fetch(`https://smart-prize-e8d4f9d44e.strapiapp.com/api/articles?populate=*&filters[category][name][$eq]=Design&locale=${locale}`);
        const data = await response.json();
        
        // Original hardcoded designs
        const originalDesigns = [
          {
            id: 'original-1',
            title: t('design.project1.title'),
            description: t('design.project1.description'),
            subtitle1: t('design.project1.subtitle1'),
            subtitle2: t('design.project1.subtitle2'),
            type: 'buttons',
            buttons: [
              { name: 'PDF', bg: 'bg-red-600', hover: 'hover:bg-red-700', link: '/pdf/WebsiteDesign.pdf' },
              { name: 'Behance', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', link: 'https://www.behance.net/gallery/223385049/Web-Design' }
            ],
            image: `${import.meta.env.BASE_URL}lovable-uploads/lapsajt.png`
          },
          {
            id: 'original-2',
            title: t('design.project2.title'),
            description: t('design.project2.description'),
            subtitle1: t('design.project2.subtitle1'),
            subtitle2: t('design.project2.subtitle2'),
            type: 'buttons',
            buttons: [
              { name: 'PDF', bg: 'bg-red-600', hover: 'hover:bg-red-700', link: '/pdf/VisitCard.pdf' },
              { name: 'Behance', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', link: 'https://www.behance.net/gallery/231925431/Tennis-Coach-Visit-Card' }
            ],
            image: `${import.meta.env.BASE_URL}lovable-uploads/mockup.png`
          }
        ];
        
        // Parse Strapi designs if they exist
        let strapiDesigns = [];
        if (data.data && Array.isArray(data.data)) {
          strapiDesigns = data.data.map((item: any) => {
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
                } else if (url.endsWith('.pdf')) {
                  smartButtons.push({
                    name: 'PDF',
                    bg: 'bg-red-600',
                    hover: 'hover:bg-red-700',
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
              title: attributes.title || 'Untitled Design',
              description: attributes.description || 'No description available',
              subtitle1: attributes.title || 'Untitled Design',
              subtitle2: attributes.tools || 'Design Tools',
              type: 'buttons',
              buttons: smartButtons.length > 0 ? smartButtons : [
                { 
                  name: 'View Design', 
                  bg: 'bg-white', 
                  hover: 'hover:bg-gray-100', 
                  link: urlField || '#'
                }
              ],
              image: imageUrl || `${import.meta.env.BASE_URL}lovable-uploads/lapsajt.png`
            };
          });
        }
        
        // Combine original designs with Strapi designs
        setDesigns([...originalDesigns, ...strapiDesigns]);
      } catch (error) {
        console.error('Error fetching designs:', error);
        // Fallback to original designs only
        setDesigns([
          {
            id: 'original-1',
            title: t('design.project1.title'),
            description: t('design.project1.description'),
            subtitle1: t('design.project1.subtitle1'),
            subtitle2: t('design.project1.subtitle2'),
            type: 'buttons',
            buttons: [
              { name: 'PDF', bg: 'bg-red-600', hover: 'hover:bg-red-700', link: '/pdf/WebsiteDesign.pdf' },
              { name: 'Behance', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', link: 'https://www.behance.net/gallery/223385049/Web-Design' }
            ],
            image: `${import.meta.env.BASE_URL}lovable-uploads/lapsajt.png`
          },
          {
            id: 'original-2',
            title: t('design.project2.title'),
            description: t('design.project2.description'),
            subtitle1: t('design.project2.subtitle1'),
            subtitle2: t('design.project2.subtitle2'),
            type: 'buttons',
            buttons: [
              { name: 'PDF', bg: 'bg-red-600', hover: 'hover:bg-red-700', link: '/pdf/VisitCard.pdf' },
              { name: 'Behance', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', link: 'https://www.behance.net/gallery/231925431/Tennis-Coach-Visit-Card' }
            ],
            image: `${import.meta.env.BASE_URL}lovable-uploads/mockup.png`
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [t]);

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

  // Force arrows to show when designs are loaded
  useEffect(() => {
    if (designs.length > 1 && api) {
      setCount(designs.length);
    }
  }, [designs, api]);

  return (
    <section
      id="design"
      className="min-h-screen bg-[#061229] text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-4xl mx-auto text-center w-full">
        <div ref={titleAnimation.ref}>
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 transition-all duration-800 ${titleAnimation.animationClass}`}>
            {t('design.title')}
          </h1>
          <div className="flex justify-center mb-8">
            <Link
              to="/designs"
              className="inline-flex items-center px-6 py-3 bg-palette-blue hover:bg-palette-blue/80 text-white font-poppins font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              View All Designs
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <div ref={contentAnimation.ref}>
          <div className="relative">
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
                            else if (button.name === 'Behance') IconComponent = FaBehance;
                            else if (button.name === 'YouTube') IconComponent = FaYoutube;
                            else if (button.name === 'LinkedIn') IconComponent = FaLinkedin;
                            else IconComponent = FaExternalLinkAlt;

                            return (
                              <a
                                key={index}
                                href={button.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-16 h-16 ${button.bg} rounded-lg flex items-center justify-center ${button.hover} transition-colors duration-300`}
                              >
                                {IconComponent ? (
                                  <IconComponent className={`text-3xl ${
                                    button.name === 'PDF' || button.name === 'Behance' || button.name === 'GitHub' || button.name === 'YouTube' || button.name === 'LinkedIn' 
                                      ? 'text-white' 
                                      : 'text-white'
                                  }`} />
                                ) : (
                                  <span className="text-white font-poppins font-bold text-sm">{button.name}</span>
                                )}
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
            {/* Navigation Arrows - Desktop Only */}
            {(count > 1 || designs.length > 1) && (
              <>
                <button
                  onClick={() => api?.scrollTo(current - 2 < 0 ? (count || designs.length) - 1 : current - 2)}
                  className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-8 h-8 text-palette-gold hover:text-palette-blue items-center justify-center transition-all duration-300 hover:scale-125"
                  aria-label="Previous design"
                >
                  <FaChevronLeft className="text-2xl" />
                </button>

                <button
                  onClick={() => api?.scrollTo(current >= (count || designs.length) ? 0 : current)}
                  className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-8 h-8 text-palette-gold hover:text-palette-blue items-center justify-center transition-all duration-300 hover:scale-125"
                  aria-label="Next design"
                >
                  <FaChevronRight className="text-2xl" />
                </button>
              </>
            )}
          </div>

          {/* Bullet indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: count }, (_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${index + 1 === current ? 'bg-palette-blue' : 'bg-palette-gold/30'
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