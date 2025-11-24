import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, id, className = "" }) => {
  // For hero section, animate on mount; for others, animate on scroll
  const isHero = id === 'hero';
  
  return (
    <section id={id} className={`min-h-screen w-full flex flex-col justify-center py-20 px-6 md:px-20 relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        {...(isHero 
          ? { animate: { opacity: 1, y: 0, filter: 'blur(0px)' } }
          : { whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' }, viewport: { once: true, margin: "-100px" } }
        )}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full z-10"
      >
        {children}
      </motion.div>
      
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10">
         <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-ai-accent rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[20%] left-[10%] w-64 h-64 bg-ai-secondary rounded-full blur-[120px]"></div>
      </div>
    </section>
  );
};

export default Section;
