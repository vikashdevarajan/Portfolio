
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
    { type: 'output', content: 'Vikash OS [Version 1.0.0]' },
    { type: 'output', content: 'Type "help" for available commands.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, string> = {
    help: 'Available commands: about, skills, contact, clear, whoami',
    whoami: 'Vikash V.D. | AI/ML Engineer | M.Sc. Student',
    about: 'I build robust applications by bridging Software Engineering with Data Science.',
    skills: 'Python, FastAPI, Docker, RAG, LLMs, SQL',
    contact: 'Email: vikashvd2004@gmail.com',
    clear: 'CLEAR_ACTION'
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input } as const];

      if (cmd === 'clear') {
        setHistory([]);
      } else if (commands[cmd]) {
        newHistory.push({ type: 'output', content: commands[cmd] });
        setHistory(newHistory);
      } else if (cmd !== '') {
        newHistory.push({ type: 'output', content: `Command not found: ${cmd}` });
        setHistory(newHistory);
      }

      setInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div 
      className="w-full max-w-lg bg-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden font-mono text-sm shadow-2xl mt-8 md:mt-0"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="ml-2 text-xs text-ai-muted flex items-center gap-1">
          <TerminalIcon size={12} /> guest@vikash-portfolio:~
        </div>
      </div>
      
      <div className="p-4 h-64 overflow-y-auto space-y-2 cursor-text" style={{ scrollbarWidth: 'none' }}>
        {history.map((line, i) => (
          <div key={i} className={`${line.type === 'input' ? 'text-ai-accent' : 'text-ai-text'}`}>
            {line.type === 'input' ? '> ' : ''}{line.content}
          </div>
        ))}
        
        <div className="flex items-center text-ai-accent">
          <span className="mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-grow text-ai-accent placeholder-ai-accent/30"
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
