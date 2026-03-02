import React from 'react';
import { Clock } from 'lucide-react';

export function Timer({ seconds }: { seconds: number }) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const isLow = seconds < 300; // less than 5 minutes

  return (
    <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg border ${isLow ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-slate-900/50 text-emerald-400 border-slate-700'}`}>
      <Clock className="w-5 h-5" />
      <span>
        {hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : ''}
        {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    </div>
  );
}
