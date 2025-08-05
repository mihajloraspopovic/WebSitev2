
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../contexts/TranslationContext';

const SkillsSection = () => {
  const { t } = useTranslation();
  const titleAnimation = useScrollAnimation('fadeInUp', 0);
  const codingSkillsAnimation = useScrollAnimation('fadeInLeft', 200);
  const softwareSkillsAnimation = useScrollAnimation('fadeInRight', 400);

  const codingSkills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 85 },
    { name: 'JS', level: 70 },
    { name: 'TS', level: 55 },
    { name: 'PY', level: 70 },
    { name: 'JSX', level: 65 },
    { name: 'TSX', level: 50 },
    { name: 'C', level: 75 },
    { name: 'CPP', level: 70 },
    { name: 'PHP', level: 40 },
    { name: 'JAVA', level: 20 },
    { name: 'SQL', level: 80 },
    { name: 'XLSM', level: 95 },
    { name: 'NODE.JS', level: 55 }
  ];

  const softwareSkills = [
    { name: 'Ps', level: 95 },
    { name: 'Ai', level: 85 },
    { name: 'Xd', level: 80 },
    { name: 'Dw', level: 80 },
    { name: 'An', level: 70 },
    { name: 'Figma', level: 70 }
  ];

  const SkillBar = ({ name, level, isVisible }: { name: string; level: number; isVisible: boolean }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setAnimatedLevel(level);
        }, 800);
        return () => clearTimeout(timer);
      }
    }, [isVisible, level]);

    return (
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 text-right">
          <span className="font-poppins font-bold text-sm">.{name}</span>
        </div>
        <div className="flex-1 h-6 bg-palette-gold border-2 border-palette-gold relative overflow-hidden">
          <div 
            className="h-full bg-palette-blue transition-all duration-[3500ms] ease-out"
            style={{ width: `${animatedLevel}%` }}
          />
        </div>
        <div className="w-12 text-left">
          <span className="font-poppins font-bold text-sm">{level}%</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="skills" 
      className="min-h-screen bg-[#061229] text-palette-gold flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="space-y-16">
          {/* Coding Skills */}
          <div>
            <div ref={titleAnimation.ref} className="mb-12">
              <h1 className={`font-poppins font-bold text-4xl sm:text-5xl md:text-6xl mb-4 transition-all duration-800 ${titleAnimation.animationClass}`}>
                {t('skills.title')}
              </h1>
              <h2 className={`font-poppins font-bold text-xl transition-all duration-800 ${titleAnimation.animationClass}`}>
                {t('skills.coding')}:
              </h2>
            </div>
            
            <div ref={codingSkillsAnimation.ref} className={`space-y-2 transition-all duration-800 ${codingSkillsAnimation.animationClass}`}>
              {codingSkills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} isVisible={codingSkillsAnimation.isVisible} />
              ))}
            </div>
          </div>
          
          {/* Software Skills */}
          <div>
            <div className="mb-12">
              <h2 className="font-poppins font-bold text-xl">
                {t('skills.software')}:
              </h2>
            </div>
            
            <div ref={softwareSkillsAnimation.ref} className={`space-y-2 transition-all duration-800 ${softwareSkillsAnimation.animationClass}`}>
              {softwareSkills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} level={skill.level} isVisible={softwareSkillsAnimation.isVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
