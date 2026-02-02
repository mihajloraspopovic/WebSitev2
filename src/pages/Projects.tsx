import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaYoutube, FaArrowLeft, FaTimes, FaFilePdf, FaBehance, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Projects = () => {
    const { t } = useTranslation();
    const titleAnimation = useScrollAnimation('fadeInDown', 0);
    const contentAnimation = useScrollAnimation('fadeInUp', 300);
    const [selectedProject, setSelectedProject] = useState<any>(null);
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
                        
                        // Parse URLs from links field (prioritize) or slug field (fallback) for smart button generation
                        const buttons = [];
                        const urlField = attributes.links || attributes.slug || '';
                        
                        if (urlField) {
                            const urls = urlField.split(/\s+/).filter((url: string) => url.trim());
                            
                            urls.forEach((url: string) => {
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
                                } else if (trimmedUrl.includes(':') && !trimmedUrl.startsWith('http')) {
                                    // Server IP format - return as IP type
                                    return {
                                        id: `strapi-${item.id}`,
                                        title: attributes.title || 'Untitled Project',
                                        description: attributes.description || 'No description available',
                                        subtitle1: attributes.title || 'Untitled Project',
                                        type: 'ip',
                                        serverIp: trimmedUrl,
                                        image: imageUrl || `${import.meta.env.BASE_URL}lovable-uploads/tablet.png`
                                    };
                                }
                            });
                        }
                        
                        // Return project with buttons or as IP type
                        return {
                            id: `strapi-${item.id}`,
                            title: attributes.title || 'Untitled Project',
                            description: attributes.description || 'No description available',
                            subtitle1: attributes.title || 'Untitled Project',
                            type: buttons.length > 0 ? 'buttons' : 'ip',
                            serverIp: buttons.length === 0 ? 'No links provided' : null,
                            buttons: buttons.length > 0 ? buttons : null,
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

    // Scroll to top when component mounts and when route changes
    useEffect(() => {
        // Force scroll to top immediately
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Also set scroll position to ensure it stays at top
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    // Additional scroll to top when projects data changes
    useEffect(() => {
        if (projects.length > 0) {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [projects]);

    const handleProjectClick = (project: any) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <div className="font-poppins bg-palette-dark text-foreground min-h-screen">
            <Navigation />

            <section
                className="min-h-screen bg-palette-dark text-palette-gold px-4 sm:px-6 lg:px-8 py-16"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(6, 18, 41, 1)), url(${import.meta.env.BASE_URL}lovable-uploads/pozadina3.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="max-w-6xl mx-auto w-full">
                    {/* Title */}
                    <div ref={titleAnimation.ref} className="text-center mb-12">
                        <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight transition-all duration-800 ${titleAnimation.animationClass}`}>
                            {t('projects.title')}
                        </h1>
                        <p className="font-poppins text-lg sm:text-xl text-paragraph-color mt-6 max-w-3xl mx-auto">
                            Explore my complete collection of projects, from web applications to game servers.
                        </p>
                    </div>

                    {/* Back button */}
                    <div className="flex items-center justify-center mb-16">
                        <Link
                            to="/"
                            className="flex items-center text-palette-gold hover:text-palette-blue transition-colors duration-300 bg-palette-dark/30 backdrop-blur-sm px-6 py-3 rounded-lg border border-palette-gold/20 hover:border-palette-blue/40"
                        >
                            <FaArrowLeft className="mr-2" />
                            <span className="font-poppins">Back to Home</span>
                        </Link>
                    </div>

                    {/* Projects Grid */}
                    <div ref={contentAnimation.ref} className={`transition-all duration-800 ${contentAnimation.animationClass}`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group relative cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
                                    onClick={() => handleProjectClick(project)}
                                >
                                    {/* Project Image */}
                                    <img
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                    />

                                    {/* Hover Overlay with Title */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white text-center px-4 whitespace-pre-line">
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal for Project Details */}
            {selectedProject && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-palette-dark rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
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
                                        {selectedProject.title}
                                    </h2>

                                    <p className="font-poppins text-base sm:text-lg md:text-xl text-paragraph-color mb-8 whitespace-pre-line leading-relaxed">
                                        {selectedProject.description}
                                    </p>

                                    <h4 className="font-poppins font-bold text-xl sm:text-2xl md:text-3xl text-palette-blue">
                                        {selectedProject.subtitle2}
                                    </h4>
                                </div>

                                {/* Right side - Image and buttons */}
                                <div className="lg:w-1/2 flex flex-col items-center space-y-8">
                                    <div className="w-80 h-96 sm:w-96 sm:h-96 flex items-center justify-center overflow-hidden rounded-xl">
                                        <img
                                            src={selectedProject.image}
                                            alt={`${selectedProject.title} preview`}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {selectedProject.type === "buttons" && selectedProject.buttons && (
                                        <div className="flex justify-center space-x-8">
                                            {selectedProject.buttons.map((button: any, index: number) => {
                                                let IconComponent = null;
                                                if (button.name === 'GitHub') IconComponent = FaGithub;
                                                else if (button.name === 'YouTube') IconComponent = FaYoutube;
                                                else if (button.name === 'PDF') IconComponent = FaFilePdf;
                                                else if (button.name === 'Behance') IconComponent = FaBehance;
                                                else if (button.name === 'LinkedIn') IconComponent = FaLinkedin;
                                                else IconComponent = FaExternalLinkAlt;

                                                return (
                                                    <a
                                                        key={index}
                                                        href={button.link || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`w-20 h-20 ${button.bg} rounded-xl flex items-center justify-center ${button.hover} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                                                        aria-label={button.name}
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
                                    )}

                                    {selectedProject.type === "ip" && selectedProject.serverIp && (
                                        <div className="flex justify-center">
                                            <div className="bg-palette-gold/20 px-8 py-4 rounded-xl">
                                                <span className="text-palette-gold font-poppins font-mono text-xl">
                                                    {selectedProject.serverIp}
                                                </span>
                                            </div>
                                        </div>
                                    )}
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

export default Projects;