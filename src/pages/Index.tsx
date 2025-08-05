
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import DesignSection from '../components/DesignSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import CareerPathSection from '../components/CareerPathSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';

const Index = () => {
  return (
    <div className="font-poppins bg-palette-dark text-foreground">
      <Navigation />
      <HeroSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider style={{backgroundColor:'#061229' }} />
      <DesignSection />
      <SectionDivider style={{backgroundColor:'#061229' }} />
      <AboutSection />
      <SectionDivider style={{backgroundColor:'#061229' }} />
      <SkillsSection />
      <SectionDivider style={{backgroundColor:'#061229' }} />
      <CareerPathSection />
      <SectionDivider />
      <ContactSection />
      <SectionDivider />
      <Footer />
    </div>
  );
};

export default Index;
