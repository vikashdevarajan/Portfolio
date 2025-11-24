import React, { useState } from 'react';
import Section from './components/Section.tsx';
import Navbar from './components/Navbar.tsx';
import SkillRadar from './components/SkillRadar.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import LearningTicker from './components/LearningTicker.tsx';
import { PROJECTS, EXPERIENCE, CONTACT, EDUCATION_DATA, EXTRACURRICULARS_DATA, RESUME_PATH } from './constants.ts';
import { Github, Linkedin, Mail, ExternalLink, Download, MapPin, GraduationCap, Award } from 'lucide-react';
import { Project } from './types.ts';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-ai-dark text-ai-text font-sans selection:bg-ai-accent selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <Section id="hero" className="border-b border-white/5">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-accent/10 border border-ai-accent/20 text-ai-accent w-fit font-mono text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ai-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ai-accent"></span>
            </span>
            Graduating 2026
          </div>
          
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter">
            Vikash <span className="text-ai-muted">V.D</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-ai-muted max-w-2xl font-light leading-relaxed">
            M.Sc. Student (2026). I build to understand, bridging Software Engineering with AI/ML through hands-on projects. From modular chatbots to backend APIs, I love turning concepts into code. Enthusiastic about data-driven roles where I can build, learn, and contribute.
          </p>
          
          <LearningTicker />

          <div className="flex gap-4 mt-4">
            <a href={CONTACT.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-ai-accent transition-colors">
              <Github size={20} /> GitHub
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>
      </Section>

      {/* Education Section */}
      <Section id="education" className="bg-ai-dark/50">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center md:text-left">Academic <span className="text-ai-accent">Background</span></h2>
        
        <div className="bg-ai-card border border-white/10 rounded-2xl p-8 hover:border-ai-accent/30 transition-all flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Logo Container - Designed for local file 'cit_logo.png' */}
          <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-xl p-3 flex items-center justify-center overflow-hidden shadow-lg shadow-white/5">
            <img 
              src={EDUCATION_DATA.logo} 
              alt={EDUCATION_DATA.school} 
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback if image isn't found
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerText = "Add cit_logo.png";
                (e.target as HTMLImageElement).parentElement!.classList.add('text-black', 'text-center', 'text-xs', 'font-mono');
              }}
            />
          </div>
          
          <div className="flex-grow pt-2 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <h3 className="text-2xl font-bold text-white">{EDUCATION_DATA.school}</h3>
              <span className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-ai-accent/10 text-ai-accent text-sm font-mono border border-ai-accent/20 mt-2 md:mt-0 w-fit mx-auto md:mx-0">
                 {EDUCATION_DATA.period}
              </span>
            </div>
            
            <p className="text-xl text-ai-secondary mb-2">{EDUCATION_DATA.degree}</p>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-ai-muted text-sm font-mono mt-4">
               <span className="flex items-center gap-1"><MapPin size={14}/> {EDUCATION_DATA.location}</span>
               <span className="flex items-center gap-1 px-2 py-0.5 bg-white/5 rounded">CGPA: {EDUCATION_DATA.cgpa}</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills / Expertise */}
      <Section id="skills" className="bg-gradient-to-b from-ai-dark to-ai-card">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical <span className="text-ai-secondary">Arsenal</span></h2>
            <p className="text-ai-muted mb-8 leading-relaxed">
              I specialize in the intersection of backend engineering and machine learning. 
              My focus is not just on training models, but on deploying them into production environments 
              using robust DevOps practices.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               {['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'FastAPI', 'Docker', 'RAG', 'SQL'].map(tech => (
                 <div key={tech} className="p-4 bg-white/5 border border-white/5 rounded-lg font-mono text-sm hover:border-ai-accent/50 transition-colors cursor-default">
                   {tech}
                 </div>
               ))}
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
             <div className="text-center font-mono text-xs text-ai-muted mb-4 uppercase tracking-widest">Skill Proficiency Matrix</div>
             <SkillRadar />
          </div>
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section id="experience">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Professional <span className="text-ai-accent">Journey</span></h2>
        
        <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full bg-ai-card border border-white/20 group-hover:border-ai-accent group-hover:bg-ai-accent transition-colors"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-ai-accent transition-colors">{exp.role}</h3>
                <span className="font-mono text-sm text-ai-muted">{exp.period}</span>
              </div>
              
              <div className="text-lg text-ai-secondary mb-4 flex items-center gap-2">
                {exp.company} <span className="text-ai-muted text-sm flex items-center gap-1"><MapPin size={12}/> {exp.location}</span>
              </div>
              
              <ul className="space-y-2 text-ai-muted">
                {exp.description.map((point, i) => (
                  <li key={i} className="leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-white/20"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects Grid */}
      <Section id="projects" className="bg-ai-card/30">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">Featured <span className="text-white">Projects</span></h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedProject(project)}
              className="group relative bg-ai-card border border-white/10 rounded-2xl p-6 hover:border-ai-accent/50 transition-all duration-300 hover:-translate-y-2 flex flex-col cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-ai-secondary">
                  {project.category}
                </div>
                
                {/* Visual indicator for external link - Only show if github or link exists */}
                {(project.github || project.link) && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github || project.link, '_blank');
                    }}
                    className="text-ai-muted hover:text-white transition-colors cursor-pointer p-1 hover:bg-white/10 rounded"
                  >
                    <ExternalLink size={18} />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-ai-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-ai-muted text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="text-xs font-mono text-ai-muted/80">#{t}</span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs font-mono text-ai-muted/50">+{project.tech.length - 3}</span>
                )}
              </div>
              
              {/* Hover hint */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Extracurriculars & Achievements */}
      <Section id="extracurriculars">
         <h2 className="text-4xl md:text-5xl font-bold mb-12">Beyond the <span className="text-ai-accent">Code</span></h2>
         
         <div className="grid md:grid-cols-2 gap-6">
            {EXTRACURRICULARS_DATA.map((item, idx) => (
               <div key={idx} className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="mt-1 text-ai-accent">
                    {item.organization ? <GraduationCap size={24} /> : <Award size={24} />}
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-white">{item.title}</h3>
                     {item.organization && (
                        <div className="text-ai-secondary text-sm font-mono mb-1">
                           {item.organization} • {item.period}
                        </div>
                     )}
                     <p className="text-ai-muted text-sm mt-2">{item.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <div className="bg-gradient-to-r from-ai-accent/10 to-ai-secondary/10 rounded-3xl p-10 md:p-20 text-center border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Collaborate?</h2>
            <p className="text-xl text-ai-muted mb-10 max-w-2xl mx-auto">
              I am currently seeking New Grad opportunities for 2026. Let's build intelligent solutions together.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a 
                href={`mailto:${CONTACT.email}`} 
                className="flex items-center gap-2 px-8 py-4 bg-ai-accent text-black font-bold rounded-xl hover:bg-white transition-colors"
                rel="noopener noreferrer"
              >
                <Mail size={20} /> Send Email
              </a>
              {/* Updated Resume Download Button */}
              <a 
                href={RESUME_PATH} 
                download="Vikash_Resume.pdf"
                className="flex items-center gap-2 px-8 py-4 bg-black/50 text-white font-bold rounded-xl border border-white/10 hover:bg-black transition-colors cursor-pointer"
              >
                <Download size={20} /> Download Resume
              </a>
            </div>
          </div>
          
          {/* Decorative background blur */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ai-accent/20 blur-[150px] rounded-full pointer-events-none"></div>
        </div>

        <footer className="mt-20 text-center text-ai-muted text-sm font-mono">
          <p>© {new Date().getFullYear()} Vikash V.D. Built with React & Tailwind.</p>
        </footer>
      </Section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default App;