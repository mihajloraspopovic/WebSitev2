import React, { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

const SkillsSection = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInUp', 0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Use a more reliable intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback: Force visibility after 2 seconds
    const fallbackTimer = setTimeout(() => {
      setSectionVisible(true);
    }, 2000);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  const programmingLanguages = [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'TypeScript ', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'Python', level: 75 },
    { name: 'C', level: 70 },
    { name: 'C++', level: 65 },
    { name: 'JSON', level: 90 },
    { name: 'Git', level: 100 }
  ];

  const designSoftware = [
    { name: 'Photoshop', level: 100 },
    { name: 'Illustrator', level: 85 },
    { name: 'XD', level: 100 },
    { name: 'Animate', level: 70 },
    { name: 'DreamWeaver', level: 75 },
    { name: 'Figma', level: 90 },
    { name: 'Framer', level: 65 },
    { name: 'Aseprite', level: 100 },
    { name: 'Canva', level: 90 }
  ];

  const networkingServices = [
    { name: 'Docker', level: 90 },
    { name: 'Linux Admin', level: 90 },
    { name: 'Mail Servers', level: 75 },
    { name: 'Port Config', level: 80 },
    { name: 'Dovecot', level: 70 },
    { name: 'Postfix', level: 70 },
    { name: 'SSL Scripts', level: 75 },
    { name: 'OpenDKIM', level: 65 },
    { name: 'Cronjobs', level: 85 },
    { name: 'Server Config', level: 80 },
    { name: 'N8N', level: 80 }
  ];

  const operatingSystems = [
    { name: 'Windows', level: 100 },
    { name: 'Linux', level: 95 },
    { name: 'ProxMox', level: 70 }
  ];

  const databases = [
    { name: 'MySQL', level: 80 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'MariaDB', level: 75 }
  ];

  const SkillBar = ({ name, level, categoryVisible, delay = 0 }: { name: string; level: number; categoryVisible: boolean; delay?: number }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (categoryVisible && !hasAnimated) {
        const timer = setTimeout(() => {
          setAnimatedLevel(level);
          setHasAnimated(true);
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [categoryVisible, level, delay, hasAnimated]);

    // Fallback: Force animation after 3 seconds regardless of visibility
    useEffect(() => {
      const fallbackTimer = setTimeout(() => {
        if (!hasAnimated) {
          setAnimatedLevel(level);
          setHasAnimated(true);
        }
      }, 3000 + delay);

      return () => clearTimeout(fallbackTimer);
    }, [level, delay, hasAnimated]);

    return (
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-24 text-right">
          <span className="font-poppins font-bold text-sm text-palette-gold">{name}</span>
        </div>
        <div className="flex-1 h-6 bg-palette-gold/20 border border-palette-gold/40 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-palette-blue to-[#48aec0] transition-all duration-[3500ms] ease-out"
            style={{ width: `${animatedLevel}%` }}
          />
        </div>
        <div className="w-12 text-left">
          <span className="font-poppins font-bold text-sm text-palette-gold">{level}%</span>
        </div>
      </div>
    );
  };

  const SkillCategory = ({ 
    title, 
    skills, 
    categoryVisible,
    baseDelay = 0
  }: { 
    title: string; 
    skills: Array<{name: string; level: number}>; 
    categoryVisible: boolean;
    baseDelay?: number;
  }) => (
    <div className="mb-16">
      <h3 className="font-poppins font-bold text-xl sm:text-2xl text-palette-gold mb-8 border-b border-palette-gold/30 pb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <SkillBar 
            key={index} 
            name={skill.name} 
            level={skill.level} 
            categoryVisible={categoryVisible}
            delay={baseDelay + (index * 100)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="min-h-screen bg-[#061229] text-palette-gold px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div ref={titleAnimation.ref} className="text-center mb-16">
          <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 transition-all duration-800 ${titleAnimation.animationClass}`}>
            {t('skills.title')}
          </h1>
          <p className="font-poppins text-lg sm:text-xl text-paragraph-color max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across programming, design, and system administration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* First Row */}
          <SkillCategory
            title="Programming Languages & Frameworks"
            skills={programmingLanguages}
            categoryVisible={sectionVisible}
            baseDelay={0}
          />

          <SkillCategory
            title="Design Software"
            skills={designSoftware}
            categoryVisible={sectionVisible}
            baseDelay={200}
          />

          {/* Second Row */}
          <SkillCategory
            title="Networking & Services"
            skills={networkingServices}
            categoryVisible={sectionVisible}
            baseDelay={400}
          />

          <div className="space-y-8">
            <SkillCategory
              title="Operating Systems"
              skills={operatingSystems}
              categoryVisible={sectionVisible}
              baseDelay={600}
            />

            <SkillCategory
              title="Databases"
              skills={databases}
              categoryVisible={sectionVisible}
              baseDelay={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;