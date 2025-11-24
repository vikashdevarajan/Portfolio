import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { CURRENTLY_LEARNING } from '../constants.ts';

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

export default LearningTicker;