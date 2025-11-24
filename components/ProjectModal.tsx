import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitBranch, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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
            {/* Header */}
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

            {/* Content */}
            <div className="space-y-8">
              <p className="text-ai-text text-lg leading-relaxed">
                {project.description}
              </p>

              {/* Architecture Diagram */}
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

              {/* Tech Stack */}
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

              {/* Actions */}
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

export default ProjectModal;