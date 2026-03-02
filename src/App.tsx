import React, { useState, useEffect } from 'react';
import { Intro } from './components/Intro';
import { Level1 } from './components/Level1';
import { Level2 } from './components/Level2';
import { Level3 } from './components/Level3';
import { Level4 } from './components/Level4';
import { Level5 } from './components/Level5';
import { Level6 } from './components/Level6';
import { Level7 } from './components/Level7';
import { Level8 } from './components/Level8';
import { Level9 } from './components/Level9';
import { CodeEntry } from './components/CodeEntry';
import { Level10 } from './components/Level10';
import { OutroWon } from './components/OutroWon';
import { OutroLost } from './components/OutroLost';
import { Timer } from './components/Timer';
import { ProgressBar } from './components/ProgressBar';

export type GameState = 'intro' | 'playing' | 'code_entry' | 'level10' | 'won' | 'lost';

export const TARGET_DIGITS = [3, 7, 1, 9, 4, 2, 8, 5, 6];

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [digits, setDigits] = useState<(number | null)[]>(Array(9).fill(null));
  const [timeRemaining, setTimeRemaining] = useState<number>(75 * 60); // 75 minutes

  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' || gameState === 'code_entry' || gameState === 'level10') {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameState('lost');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  const handleStart = () => {
    setGameState('playing');
  };

  const handleLevelComplete = (digit: number | null) => {
    const newDigits = [...digits];
    newDigits[currentLevel - 1] = digit;
    setDigits(newDigits);

    if (currentLevel < 9) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setGameState('code_entry');
    }
  };

  const handleCodeSuccess = () => {
    setGameState('level10');
  };

  const handleCodeFailure = () => {
    setGameState('lost');
  };

  const handleLevel10Success = () => {
    setGameState('won');
  };

  const handleLevel10Failure = () => {
    setGameState('lost');
  };

  const handleRestart = () => {
    setGameState('intro');
    setCurrentLevel(1);
    setDigits(Array(9).fill(null));
    setTimeRemaining(75 * 60);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Background Image Overlay */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop")' }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        {gameState !== 'intro' && gameState !== 'won' && gameState !== 'lost' && (
          <div className="mb-8 space-y-4">
            <header className="flex justify-between items-center bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                  <span className="text-2xl">🕵️‍♂️</span>
                </div>
                <div>
                  <h1 className="font-bold text-lg tracking-tight">Sombras S.L.</h1>
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Expediente Activo</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <ProgressBar current={currentLevel} total={10} gameState={gameState} />
                <Timer seconds={timeRemaining} />
              </div>
            </header>
            
            <div className="flex items-center justify-center gap-2 bg-slate-800/50 backdrop-blur-md p-3 rounded-xl border border-slate-700/50">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-widest mr-2 hidden sm:inline">Código:</span>
              <div className="flex gap-1 sm:gap-2">
                {digits.map((d, i) => (
                  <div key={i} className={`w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center font-mono text-lg sm:text-xl font-bold rounded-lg border ${d !== null ? 'bg-emerald-900/50 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_-2px_rgba(16,185,129,0.3)]' : 'bg-slate-900/80 border-slate-700 text-slate-600'}`}>
                    {d !== null ? d : '_'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 flex flex-col">
          {gameState === 'intro' && <Intro onStart={handleStart} />}
          {gameState === 'playing' && currentLevel === 1 && <Level1 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 2 && <Level2 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 3 && <Level3 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 4 && <Level4 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 5 && <Level5 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 6 && <Level6 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 7 && <Level7 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 8 && <Level8 onComplete={handleLevelComplete} />}
          {gameState === 'playing' && currentLevel === 9 && <Level9 onComplete={handleLevelComplete} />}
          
          {gameState === 'code_entry' && (
            <CodeEntry 
              collectedDigits={digits} 
              targetDigits={TARGET_DIGITS}
              onSuccess={handleCodeSuccess}
              onFailure={handleCodeFailure}
            />
          )}
          
          {gameState === 'level10' && (
            <Level10 
              onSuccess={handleLevel10Success}
              onFailure={handleLevel10Failure}
            />
          )}
          
          {gameState === 'won' && <OutroWon timeRemaining={timeRemaining} onRestart={handleRestart} />}
          {gameState === 'lost' && <OutroLost onRestart={handleRestart} />}
        </main>
      </div>
    </div>
  );
}
