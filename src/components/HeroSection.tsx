
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

const HeroSection = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInLeft', 0);
  const subtitleAnimation = useScrollAnimation('fadeInRight', 200);
  const descriptionAnimation = useScrollAnimation('fadeInUp', 400);
  const buttonAnimation = useScrollAnimation('fadeInUp', 600);
  const scrollToFooter = () => {
  const footer = document.getElementById('footer');
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' });
  }
};


  return (
    <section
  id="home"
  className="min-h-screen bg-palette-dark text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
  style={{
    backgroundImage: 'linear-gradient(to top, #01708e, rgba(0, 0, 0, 0)), url(/lovable-uploads/pozadina.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
      <div className="max-w-4xl mx-auto text-left lg:flex lg:items-center lg:justify-between w-full">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div ref={titleAnimation.ref}>
            <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-8 transition-all duration-800 ${titleAnimation.animationClass}`}>
              {t('hero.greeting').split('&').map((part, index) => 
                index === 0 ? part : <><span style={{color: '#49AEC0'}}>&</span>{part}</>
              )}
            </h1>
          </div>
          
          <div className="space-y-4">
            <div ref={subtitleAnimation.ref}>
              <h2 className={`font-poppins font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight transition-all duration-800 ${subtitleAnimation.animationClass}`}>
                {t('hero.name')}
              </h2>
              <h3 className={`font-poppins font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight transition-all duration-800 ${subtitleAnimation.animationClass} mt-2`}>
                {t('hero.title')}
              </h3>
            </div>
            
            <div ref={descriptionAnimation.ref}>
              <p className={`font-poppins font-light text-sm sm:text-base md:text-lg text-paragraph-color max-w-md lg:mx-0 transition-all duration-800 ${descriptionAnimation.animationClass}`}>
                {t('hero.description')}
              </p>
            </div>
          </div>
        </div>
        
          <div className="lg:w-1/2 lg:pl-8 flex flex-col items-center lg:items-end justify-between h-full">
              <div className="w-64 h-80 sm:w-80 sm:h-96 flex items-end justify-center mb-0 mt-auto">
                <img src="/lovable-uploads/Ja.png" alt="Ja" className="w-full h-auto object-contain mix-blend-hard-light opacity-90" />
              </div>

              <div ref={buttonAnimation.ref}>
                <button
                  onClick={scrollToFooter}
                  className={`w-64 sm:w-80 bg-palette-gold text-palette-dark font-poppins font-semibold py-4 px-8 hover:bg-palette-blue/90 transition-colors duration-300 text-lg ${buttonAnimation.animationClass}`}
                >
                  {t('hero.cta')}
                </button>
              </div>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;
