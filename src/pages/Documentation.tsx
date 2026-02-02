import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaFilePdf, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Documentation = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInDown', 0);
  const contentAnimation = useScrollAnimation('fadeInUp', 300);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  // Fetch documents from Strapi and combine with existing ones
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Determine locale based on current language
        const locale = t('language') === 'sr' ? 'sr' : 'en';
        const response = await fetch(`https://smart-prize-e8d4f9d44e.strapiapp.com/api/articles?populate=*&filters[category][name][$eq]=Documents&locale=${locale}`);
        const data = await response.json();
        
        // Debug logging
        console.log('API Response:', data);
        console.log('Articles found:', data.data?.length || 0);
        
        // Original hardcoded documents (if any)
        const originalDocuments = [
          // Add any default documents here if needed
        ];
        
        // Parse Strapi documents if they exist
        let strapiDocuments = [];
        if (data.data && Array.isArray(data.data)) {
          strapiDocuments = data.data.map((item: any) => {
            const attributes = item.attributes || item;
            
            // Extract image URL from cover (thumbnail)
            let imageUrl = null;
            if (attributes.cover?.formats?.large?.url) {
              imageUrl = attributes.cover.formats.large.url;
            } else if (attributes.cover?.url) {
              imageUrl = attributes.cover.url;
            } else if (attributes.cover?.data?.attributes?.formats?.large?.url) {
              imageUrl = attributes.cover.data.attributes.formats.large.url;
            } else if (attributes.cover?.data?.attributes?.url) {
              imageUrl = attributes.cover.data.attributes.url;
            }
            
            // Extract PDF URL from multiple possible sources
            let pdfUrl = null;
            
            // Method 1: Check links field for PDF URLs
            const urlField = attributes.links || attributes.slug || '';
            if (urlField) {
              const urls = urlField.split(/\s+/).filter((url: string) => url.trim());
              const pdfLink = urls.find((url: string) => 
                url.includes('.pdf') || url.startsWith('/pdf/') || url.includes('pdf')
              );
              if (pdfLink) {
                pdfUrl = pdfLink;
              }
            }
            
            // Method 2: Check common media field names for direct file uploads
            if (!pdfUrl) {
              // Try different possible field names for media uploads
              const mediaFields = ['file', 'document', 'pdf', 'media', 'attachment'];
              
              for (const fieldName of mediaFields) {
                if (attributes[fieldName]?.data?.attributes?.url) {
                  pdfUrl = attributes[fieldName].data.attributes.url;
                  break;
                } else if (attributes[fieldName]?.url) {
                  pdfUrl = attributes[fieldName].url;
                  break;
                }
              }
            }
            
            // Method 3: Check if cover image is actually a PDF
            if (!pdfUrl && imageUrl && imageUrl.includes('.pdf')) {
              pdfUrl = imageUrl;
              imageUrl = null; // Clear image since it's a PDF
            }
            
            // Debug logging
            console.log('Document attributes:', attributes);
            console.log('Found PDF URL:', pdfUrl);
            
            return {
              id: `strapi-${item.id}`,
              title: attributes.title || 'Untitled Document',
              description: attributes.description || '',
              image: imageUrl || null,
              pdfUrl: pdfUrl,
              type: 'pdf'
            };
          });
        }
        
        // Combine original documents with Strapi documents
        setDocuments([...originalDocuments, ...strapiDocuments]);
      } catch (error) {
        console.error('Error fetching documents:', error);
        // Fallback to original documents only
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [t]);

  // Scroll to top when component mounts and when route changes
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Also set scroll position to ensure it stays at top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Additional scroll to top when documents data changes
  useEffect(() => {
    if (documents.length > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [documents]);

  const handleDocumentClick = (document: any) => {
    setSelectedDocument(document);
  };

  const closeModal = () => {
    setSelectedDocument(null);
  };

  const openPdfInNewTab = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
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
            <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 transition-all duration-800 ${titleAnimation.animationClass}`}>
              Documentation
            </h1>
            <p className="font-poppins text-lg sm:text-xl text-paragraph-color max-w-3xl mx-auto">
              Official documents, certificates, and professional credentials.
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
          
          {/* Documents Grid */}
          <div ref={contentAnimation.ref} className={`transition-all duration-800 ${contentAnimation.animationClass}`}>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-palette-gold font-poppins text-lg">Loading documents...</div>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-palette-gold font-poppins text-xl mb-4">No documents available</div>
                <p className="text-paragraph-color">Documents will appear here when added to the system.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="group relative cursor-pointer overflow-hidden rounded-xl aspect-[3/4] bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => handleDocumentClick(document)}
                  >
                    {/* Document Preview */}
                    {document.image ? (
                      <img 
                        src={document.image} 
                        alt={`${document.title} preview`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center p-4">
                        <h3 className="font-poppins font-bold text-white text-center text-lg sm:text-xl leading-tight">
                          {document.title}
                        </h3>
                      </div>
                    )}
                    
                    {/* PDF Indicator */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg">
                      <FaFilePdf className="text-sm" />
                    </div>
                    
                    {/* Hover Overlay with Title and Action */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="font-poppins font-bold text-lg text-white mb-2">
                          {document.title}
                        </h3>
                        {document.description && (
                          <p className="font-poppins text-sm text-gray-200 mb-4">
                            {document.description}
                          </p>
                        )}
                        <div className="flex items-center justify-center text-white">
                          <FaFilePdf className="mr-2" />
                          <span className="font-poppins text-sm">Preview PDF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal for PDF Preview */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-palette-dark rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-palette-gold hover:text-palette-blue transition-colors duration-300 z-10 bg-black/50 rounded-full p-2"
            >
              <FaTimes size={24} />
            </button>

            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left side - Document Info */}
                <div className="lg:w-1/3 space-y-4">
                  <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-palette-gold">
                    {selectedDocument.title}
                  </h2>
                  
                  {selectedDocument.description && (
                    <p className="font-poppins text-base text-paragraph-color leading-relaxed">
                      {selectedDocument.description}
                    </p>
                  )}
                </div>

                {/* Right side - PDF Preview */}
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    {selectedDocument.pdfUrl ? (
                      <iframe
                        src={`${selectedDocument.pdfUrl}#page=1&view=Fit&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0&zoom=page-fit`}
                        className="w-full h-[60vh] lg:h-[70vh]"
                        title={`${selectedDocument.title} Preview`}
                        style={{ border: 'none' }}
                      />
                    ) : (
                      <div className="w-full h-[60vh] lg:h-[70vh] flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                          <FaFilePdf className="text-gray-400 text-6xl mb-4 mx-auto" />
                          <p className="text-gray-600 font-poppins">PDF preview not available</p>
                        </div>
                      </div>
                    )}
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

export default Documentation;