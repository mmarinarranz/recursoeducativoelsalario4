import React from 'react';
import { GameState } from '../App';

export function ProgressBar({ current, total, gameState }: { current: number, total: number, gameState: GameState }) {
  const displayCurrent = gameState === 'code_entry' ? 9 : gameState === 'level10' ? 10 : current;
  const percentage = (displayCurrent / total) * 100;

  return (
    <div className="hidden sm:flex flex-col gap-1 w-48">
      <div className="flex justify-between text-xs font-mono text-slate-400 uppercase tracking-widest">
        <span>Progreso</span>
        <span>{displayCurrent}/{total}</span>
      </div>
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
        <div 
          className="h-full bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
