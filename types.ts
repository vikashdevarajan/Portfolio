
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
