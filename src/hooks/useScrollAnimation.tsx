
import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (animationType: string = 'fadeIn', delay: number = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animationType) {
      case 'fadeInUp':
        return 'animate-fade-in-up';
      case 'fadeInLeft':
        return 'animate-fade-in-left';
      case 'fadeInRight':
        return 'animate-fade-in-right';
      case 'fadeInDown':
        return 'animate-fade-in-down';
      default:
        return 'animate-fade-in';
    }
  };

  return { ref, isVisible, animationClass: getAnimationClass() };
};
