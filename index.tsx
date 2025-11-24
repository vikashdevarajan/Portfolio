import React, { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Database, Code, Server, Layers, Terminal, GraduationCap, Trophy, 
  Github, Linkedin, Mail, ExternalLink, Download, MapPin, Award, 
  Loader2, GitBranch, ArrowRight, X 
} from 'lucide-react';

// --- TYPES ---

export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string;
  link?: string;
  github?: string;
  architecture?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  location: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  cgpa: string;
  location: string;
  logo: string;
}

export interface Extracurricular {
  title: string;
  organization?: string;
  period?: string;
  description: string;
}

export interface Skill {
  subject: string;
  A: number;
  fullMark: number;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  phone: string;
  location: string;
}

// --- CONSTANTS ---

const CONTACT: ContactInfo = {
  email: "vikashvd2004@gmail.com",
  linkedin: "https://www.linkedin.com/in/vikash-vd2004",
  github: "https://github.com", 
  phone: "+91 6385286710",
  location: "Coimbatore, India"
};

const RESUME_PATH = "/Vikash_Resume.pdf";

const CURRENTLY_LEARNING = [
  "Tinkering with Rust & Actix Web",
  "Exploring Agentic Workflows with LangGraph",
  "Reading: Attention is All You Need",
  "Deep diving into System Design Patterns"
];

const SKILLS_DATA: Skill[] = [
  { subject: 'Python/ML', A: 95, fullMark: 100 },
  { subject: 'FastAPI/Backend', A: 85, fullMark: 100 },
  { subject: 'RAG/LLMs', A: 90, fullMark: 100 },
  { subject: 'Software Eng', A: 60, fullMark: 100 },
  { subject: 'Docker/DevOps', A: 75, fullMark: 100 },
  { subject: 'SQL/DB', A: 85, fullMark: 100 },
];

const EXPERIENCE: Experience[] = [
  {
    company: "Highonswift",
    role: "AI/ML Developer Intern",
    period: "June 2025 – Oct 2025",
    location: "Chennai, India",
    description: [
      "Architected a modular, end-to-end Speech-to-Speech chatbot framework customizable for diverse business use cases, integrating OpenAI Whisper, Gemini LLM, and Coqui-TTS.",
      "Containerized the full application pipeline using Docker, ensuring consistent deployment environments and seamless scalability.",
      "Served as a Backend Developer for an AI-based affiliate automation platform targeting social media, building robust FastAPI services to handle high-volume data processing."
    ]
  }
];

const EDUCATION_DATA: Education = {
  school: "Coimbatore Institute of Technology",
  degree: "M.Sc. Decision and Computing Sciences (Integrated)",
  period: "Graduating 2026",
  cgpa: "7.52",
  location: "Coimbatore, India",
  logo: "/cit_logo.png"  // Changed from "./cit_logo.png" to "/cit_logo.png"
};

const EXTRACURRICULARS_DATA: Extracurricular[] = [
  {
    title: "NCC 'A' Certificate",
    description: "Awarded for demonstrated leadership, discipline, and community service."
  },
  {
    title: "District Level Volleyball Player",
    description: "Represented the district team in competitive volleyball tournaments."
  },
  {
    title: "Outreach Coordinator",
    organization: "CIT Photoclub",
    period: "Nov 2023 – Nov 2024",
    description: "Managed outreach initiatives and coordinated events for the club."
  },
  {
    title: "Media Relations Coordinator",
    organization: "403Strats",
    period: "Oct 2023 – Nov 2024",
    description: "Managed public communications and social media strategies."
  }
];

const PROJECTS: Project[] = [
  {
    title: "Agentic Speech-to-Speech Chatbot",
    category: "AI/ML",
    tech: ["Python", "FastAPI", "Docker", "Gemini API", "Whisper", "Coqui-TTS"],
    description: "An end-to-end agentic chatbot designed for seamless integration into web platforms. Capable of advanced, task-oriented conversations using a modular architecture.",
    architecture: ['User Voice', 'OpenAI Whisper (STT)', 'FastAPI Agent', 'Gemini LLM', 'Coqui-TTS', 'Audio Output']
  },
  {
    title: "Stock Sentiment Analysis",
    category: "NLP & ML Fusion",
    tech: ["Python", "BeautifulSoup", "Scikit-learn", "Streamlit", "VADER"],
    description: "Real-time sentiment analysis pipeline for stock news. Features web scraping, text preprocessing, TF-IDF cosine similarity for filtering, and Random Forest trend prediction.",
    github: "https://github.com",
    architecture: ['Live News Data', 'Scraper Engine', 'Preprocessing', 'VADER & TF-IDF', 'Random Forest', 'Streamlit UI']
  },
  {
    title: "Speech Emotion Recognition",
    category: "Machine Learning",
    tech: ["Python", "Scikit-learn", "Librosa", "MFCC"],
    description: "System analyzing audio signals to extract MFCC features. Compared MLP and Random Forest classifiers to evaluate performance for mental health monitoring tools.",
    github: "https://github.com",
    architecture: ['Audio Signal', 'Librosa Processing', 'MFCC Extraction', 'MLP Classifier', 'Emotion Prediction']
  }
];

const NAV_LINKS = [
  { name: 'Start', id: 'hero', icon: Terminal },
  { name: 'Education', id: 'education', icon: GraduationCap },
  { name: 'Expertise', id: 'skills', icon: Brain },
  { name: 'Work', id: 'experience', icon: Server },
  { name: 'Projects', id: 'projects', icon: Code },
  { name: 'Activities', id: 'extracurriculars', icon: Trophy },
  { name: 'Contact', id: 'contact', icon: Layers },
];

// --- COMPONENTS ---

const Section: React.FC<{ children: ReactNode; id: string; className?: string }> = ({ children, id, className = "" }) => {
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
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10">
         <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-ai-accent rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[20%] left-[10%] w-64 h-64 bg-ai-secondary rounded-full blur-[120px]"></div>
      </div>
    </section>
  );
};

const SkillRadar: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] font-mono text-xs md:text-sm">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILLS_DATA}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
          />
          <Radar
            name="Vikash"
            dataKey="A"
            stroke="#00dc82"
            strokeWidth={3}
            fill="#00dc82"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-ai-card/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl shadow-2xl">
        {NAV_LINKS.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative group p-3 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-white/10 text-ai-accent' : 'text-ai-muted hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-mono bg-black border border-white/10 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 border border-ai-accent/30 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-ai-card border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="px-3 py-1 rounded-full text-xs font-mono bg-ai-accent/10 border border-ai-accent/20 text-ai-accent w-fit mb-3">
                  {project.category}
                </div>
                <h2 className="text-3xl font-bold text-white">{project.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-ai-muted hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              <p className="text-ai-text text-lg leading-relaxed">
                {project.description}
              </p>

              {project.architecture && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <GitBranch className="text-ai-secondary" size={20} /> System Architecture
                  </h3>
                  <div className="bg-black/40 rounded-xl p-6 border border-white/5 overflow-x-auto">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 min-w-max">
                      {project.architecture.map((step, idx) => (
                        <React.Fragment key={idx}>
                          <div className="px-4 py-3 bg-ai-card border border-white/10 rounded-lg shadow-lg text-sm font-mono text-center hover:border-ai-secondary/50 transition-colors cursor-default whitespace-nowrap">
                            {step}
                          </div>
                          {idx < project.architecture!.length - 1 && (
                            <div className="text-ai-muted/30">
                              <ArrowRight size={20} className="rotate-90 md:rotate-0" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-mono text-ai-muted mb-3 uppercase tracking-widest">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md font-mono text-sm text-ai-text/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-white/10">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-ai-accent transition-colors">
                    <Github size={20} /> View Code
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                    <ExternalLink size={20} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const LearningTicker: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CURRENTLY_LEARNING.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit mt-8">
      <Loader2 size={16} className="text-ai-accent animate-spin" />
      <div className="h-6 overflow-hidden relative min-w-[200px] md:min-w-[300px]">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full text-sm font-mono text-ai-muted whitespace-nowrap truncate"
          >
            {CURRENTLY_LEARNING[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- APP COMPONENT ---

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
              <a 
                href={RESUME_PATH} 
                download="Vikash_Resume.pdf"
                className="flex items-center gap-2 px-8 py-4 bg-black/50 text-white font-bold rounded-xl border border-white/10 hover:bg-black transition-colors cursor-pointer"
              >
                <Download size={20} /> Download Resume
              </a>
            </div>
          </div>
          
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

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);