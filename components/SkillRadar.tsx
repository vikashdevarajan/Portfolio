import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILLS_DATA } from '../constants.ts';

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

export default SkillRadar;