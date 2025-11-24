import { Project, Experience, Skill, ContactInfo, Education, Extracurricular } from './types.ts';
import { Brain, Database, Code, Server, Layers, Terminal, GraduationCap, Trophy } from 'lucide-react';

export const CONTACT: ContactInfo = {
  email: "vikashvd2004@gmail.com",
  linkedin: "https://www.linkedin.com/in/vikash-vd2004",
  github: "https://github.com", 
  phone: "+91 6385286710",
  location: "Coimbatore, India"
};

// Place your resume file in the public/ folder with this name
export const RESUME_PATH = "./Vikash_Resume.pdf";

export const CURRENTLY_LEARNING = [
  "Tinkering with Rust & Actix Web",
  "Exploring Agentic Workflows with LangGraph",
  "Reading: Attention is All You Need",
  "Deep diving into System Design Patterns"
];

export const SKILLS_DATA: Skill[] = [
  { subject: 'Python/ML', A: 95, fullMark: 100 },
  { subject: 'FastAPI/Backend', A: 85, fullMark: 100 },
  { subject: 'RAG/LLMs', A: 90, fullMark: 100 },
  { subject: 'Software Eng', A: 60, fullMark: 100 },
  { subject: 'Docker/DevOps', A: 75, fullMark: 100 },
  { subject: 'SQL/DB', A: 85, fullMark: 100 },
];

export const EXPERIENCE: Experience[] = [
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

export const EDUCATION_DATA: Education = {
  school: "Coimbatore Institute of Technology",
  degree: "M.Sc. Decision and Computing Sciences (Integrated)",
  period: "Graduating 2026",
  cgpa: "7.52",
  location: "Coimbatore, India",
  // Place your logo image in the public/ folder with this name
  logo: "./cit_logo.png"
};

export const EXTRACURRICULARS_DATA: Extracurricular[] = [
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

export const PROJECTS: Project[] = [
  {
    title: "Agentic Speech-to-Speech Chatbot",
    category: "AI/ML",
    tech: ["Python", "FastAPI", "Docker", "Gemini API", "Whisper", "Coqui-TTS"],
    description: "An end-to-end agentic chatbot designed for seamless integration into web platforms. Capable of advanced, task-oriented conversations using a modular architecture.",
    architecture: ['User Voice', 'OpenAI Whisper (STT)', 'FastAPI Agent', 'Gemini LLM', 'Coqui-TTS', 'Audio Output']
    // No github link for this project as requested
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

export const NAV_LINKS = [
  { name: 'Start', id: 'hero', icon: Terminal },
  { name: 'Education', id: 'education', icon: GraduationCap },
  { name: 'Expertise', id: 'skills', icon: Brain },
  { name: 'Work', id: 'experience', icon: Server },
  { name: 'Projects', id: 'projects', icon: Code },
  { name: 'Activities', id: 'extracurriculars', icon: Trophy },
  { name: 'Contact', id: 'contact', icon: Layers },
];