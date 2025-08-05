
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SectionDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = '', style }) => {
  return (
    <div className={`flex justify-center py-4 ${className}`} style={style}>
      <div className="animate-bounce">
        <ChevronDown 
          size={32} 
          className="text-palette-gold/60 hover:text-palette-blue transition-colors duration-300" 
        />
      </div>
    </div>
  );
};

export default SectionDivider;
