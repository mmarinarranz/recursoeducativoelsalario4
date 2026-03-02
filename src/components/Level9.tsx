import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level9({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const options = [
    { id: '1', text: 'La empresa no quiere pagarme el mes porque ha vendido poco.' },
    { id: '2', text: 'La empresa ha declarado Concurso de Acreedores (Insolvencia).' },
    { id: '3', text: 'La empresa me ha despedido disciplinariamente y no estoy de acuerdo.' }
  ];

  const handleValidate = () => {
    if (!selectedOption || !inputValue) return;
    
    const isCorrect = 
      selectedOption === '2' && 
      parseInt(inputValue, 10) === 120;

    setFeedback(isCorrect ? 'success' : 'error');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col max-w-3xl mx-auto w-full"
    >
      <div className="bg-slate-800/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Reto 9: Cuándo Indemniza el FOGASA</h2>
            <p className="text-slate-400">Entiende los límites y condiciones del FOGASA.</p>
          </div>
          <button 
            onClick={() => setShowHint(!showHint)}
            className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
            title="Ver Pista"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>

        {showHint && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm">
            <strong>Pista:</strong> FOGASA no es un seguro de despido normal, es para insolvencia. Y el límite de salario son 120 días.
          </motion.div>
        )}

        <div className="flex flex-col gap-8 flex-1">
          {/* Scenario Choice */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Selecciona el único caso en el que el FOGASA pagaría la indemnización:</h3>
            <div className="flex flex-col gap-3">
              {options.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    selectedOption === option.id 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]' 
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-300'
                  } disabled:opacity-50`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Question */}
          <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-500/20 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-blue-400 mb-6 text-center">¿Cuántos días máximos de salario paga el FOGASA?</h3>
            
            <div className="relative w-full max-w-xs flex items-center gap-4">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={feedback !== null}
                placeholder="0"
                className="w-full px-4 py-4 bg-slate-900 border-2 border-slate-600 rounded-xl text-2xl font-mono text-white text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
              />
              <span className="text-xl font-bold text-slate-400">Días</span>
            </div>
          </div>
        </div>

        {/* Validation & Feedback */}
        <div className="mt-8">
          {feedback === null ? (
            <button
              onClick={handleValidate}
              disabled={!selectedOption || !inputValue}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
            >
              VALIDAR ESCENARIO
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border ${feedback === 'success' ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-red-900/30 border-red-500/50'}`}
            >
              <div className="flex items-start gap-4">
                {feedback === 'success' ? (
                  <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                )}
                <div className="flex-1">
                  <h4 className={`text-lg font-bold mb-2 ${feedback === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {feedback === 'success' ? '¡Seguridad activada!' : 'Error. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'FOGASA solo entra con insolvencia y hasta 120 días. Has obtenido el dígito 6.'
                      : 'FOGASA no es un seguro de despido normal, es para insolvencia. Y el límite de salario son 120 días. Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 6 : null)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors border border-slate-600"
                  >
                    Ir a la Puerta Final <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
