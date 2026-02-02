import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaFilePdf, FaBehance, FaArrowLeft, FaTimes, FaYoutube, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Designs = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInLeft', 0);
  const contentAnimation = useScrollAnimation('fadeInRight', 300);
  const [selectedDesign, setSelectedDesign] = useState<any>(null);
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

            // Parse URLs from slug or links field for smart button generation
            const buttons = [];
            const urlField = attributes.links || attributes.slug || '';
            
            if (urlField) {
              const urls = urlField.split(/[\s,]+/).filter(url => url.trim());
              
              urls.forEach(url => {
                const trimmedUrl = url.trim();
                if (trimmedUrl.includes('github.com')) {
                  buttons.push({ name: 'GitHub', bg: 'bg-gray-800', hover: 'hover:bg-gray-700', link: trimmedUrl });
                } else if (trimmedUrl.includes('youtube.com') || trimmedUrl.includes('youtu.be')) {
                  buttons.push({ name: 'YouTube', bg: 'bg-red-600', hover: 'hover:bg-red-700', link: trimmedUrl });
                } else if (trimmedUrl.includes('behance.net')) {
                  buttons.push({ name: 'Behance', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', link: trimmedUrl });
                } else if (trimmedUrl.includes('linkedin.com')) {
                  buttons.push({ name: 'LinkedIn', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', link: trimmedUrl });
                } else if (trimmedUrl.includes('.pdf') || trimmedUrl.startsWith('/pdf/')) {
                  buttons.push({ name: 'PDF', bg: 'bg-red-600', hover: 'hover:bg-red-700', link: trimmedUrl });
                } else if (trimmedUrl.startsWith('http')) {
                  buttons.push({ name: 'Visit Site', bg: 'bg-blue-600', hover: 'hover:bg-blue-700', link: trimmedUrl });
                }
              });
            }
            
            // Fallback button if no URLs provided
            if (buttons.length === 0) {
              buttons.push({
                name: 'View Design',
                bg: 'bg-blue-600',
                hover: 'hover:bg-blue-700',
                link: '#'
              });
            }

            return {
              id: `strapi-${item.id}`,
              title: attributes.title || 'Untitled Design',
              description: attributes.description || 'No description available',
              subtitle1: attributes.title || 'Untitled Design',
              type: 'buttons',
              buttons: buttons,
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

  // Scroll to top when component mounts and when route changes
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Also set scroll position to ensure it stays at top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Additional scroll to top when designs data changes
  useEffect(() => {
    if (designs.length > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [designs]);

  const handleDesignClick = (design: any) => {
    setSelectedDesign(design);
  };

  const closeModal = () => {
    setSelectedDesign(null);
  };

  return (
    <div className="font-poppins bg-[#061229] text-foreground min-h-screen">
      <Navigation />

      <section className="min-h-screen bg-[#061229] text-palette-gold px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto w-full">
          {/* Title */}
          <div ref={titleAnimation.ref} className="text-center mb-12">
            <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight transition-all duration-800 ${titleAnimation.animationClass}`}>
              {t('design.title')}
            </h1>
            <p className="font-poppins text-lg sm:text-xl text-paragraph-color mt-6 max-w-3xl mx-auto">
              Discover my complete design portfolio, from web interfaces to brand identity projects.
            </p>
          </div>

          {/* Back button */}
          <div className="flex items-center justify-center mb-16">
            <Link
              to="/"
              className="flex items-center text-palette-gold hover:text-palette-blue transition-colors duration-300 bg-[#061229]/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-palette-gold/20 hover:border-palette-blue/40"
            >
              <FaArrowLeft className="mr-2" />
              <span className="font-poppins">Back to Home</span>
            </Link>
          </div>

          {/* Designs Grid */}
          <div ref={contentAnimation.ref} className={`transition-all duration-800 ${contentAnimation.animationClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className="group relative cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
                  onClick={() => handleDesignClick(design)}
                >
                  {/* Design Image */}
                  <img
                    src={design.image}
                    alt={`${design.title} preview`}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Hover Overlay with Title */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white text-center px-4 whitespace-pre-line">
                      {design.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Design Details */}
      {selectedDesign && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#061229] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-palette-gold hover:text-palette-blue transition-colors duration-300 z-10"
            >
              <FaTimes size={24} />
            </button>

            <div className="p-8">
              <div className="lg:flex lg:items-start lg:justify-between w-full">
                {/* Left side - Text content */}
                <div className="lg:w-1/2 text-left space-y-6 mb-8 lg:mb-0 lg:pr-12">
                  <h2 className="font-poppins font-bold text-3xl sm:text-4xl md:text-5xl mb-6 whitespace-pre-line text-palette-gold">
                    {selectedDesign.title}
                  </h2>

                  <p className="font-poppins text-base sm:text-lg md:text-xl text-paragraph-color mb-8 whitespace-pre-line leading-relaxed">
                    {selectedDesign.description}
                  </p>

                  <h4 className="font-poppins font-bold text-xl sm:text-2xl md:text-3xl text-palette-blue">
                    {selectedDesign.subtitle2}
                  </h4>
                </div>

                {/* Right side - Image and buttons */}
                <div className="lg:w-1/2 flex flex-col items-center space-y-8">
                  <div className="w-80 h-96 sm:w-96 sm:h-[28rem] flex items-center justify-center overflow-hidden rounded-xl">
                    <img
                      src={selectedDesign.image}
                      alt={`${selectedDesign.title} preview`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex justify-center space-x-8">
                    {selectedDesign.buttons?.map((button: any, index: number) => {
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
                          className={`w-20 h-20 ${button.bg} rounded-xl flex items-center justify-center ${button.hover} transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105`}
                        >
                          {IconComponent ? (
                            <IconComponent className="text-white text-3xl" />
                          ) : (
                            <span className="text-white font-poppins font-bold text-sm">{button.name}</span>
                          )}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer customBackground="linear-gradient(to bottom, #061229, #01708e)" />
    </div>
  );
};

export default Designs;