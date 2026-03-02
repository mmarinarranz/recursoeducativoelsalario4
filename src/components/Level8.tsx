import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Calculator } from 'lucide-react';

export function Level8({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleValidate = () => {
    if (!inputValue) return;
    
    const value = parseFloat(inputValue.replace(',', '.'));
    
    // Target is 1604, margin of error +/- 5
    const isCorrect = value >= 1599 && value <= 1609;

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
            <h2 className="text-2xl font-bold text-white mb-2">Reto 8: Finiquito Express</h2>
            <p className="text-slate-400">Calcula los conceptos básicos de un finiquito.</p>
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
            <strong>Pista:</strong> Revisa la fórmula: (Salario/30días * días trabajados) + (Pagas/12meses * meses devengados) + (Vacaciones/12*meses * valor día).
          </motion.div>
        )}

        <div className="flex flex-col gap-8 flex-1">
          {/* Data Sheet */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Datos del Trabajador</h3>
            <ul className="space-y-3 text-slate-300 font-mono">
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Salario mensual:</span> <span className="text-emerald-400">1.500€</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Pagas extras:</span> <span className="text-emerald-400">2 al año (1.500€ c/u), NO prorrateadas</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Vacaciones:</span> <span className="text-emerald-400">22 días/año</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Fecha baja:</span> <span className="text-emerald-400">15 de marzo</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Días trabajados en marzo:</span> <span className="text-emerald-400">15</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Vacaciones disfrutadas:</span> <span className="text-emerald-400">0 días</span>
              </li>
            </ul>
          </div>

          {/* Calculator Input */}
          <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-500/20 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-blue-400 mb-2 text-center">Introduce el importe total del Finiquito</h3>
            <p className="text-sm text-slate-400 mb-6 text-center">(Suma de: Salario pendiente + Pagas extras pendientes + Vacaciones)</p>
            
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Calculator className="h-6 w-6 text-slate-500" />
              </div>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={feedback !== null}
                placeholder="0.00"
                className="w-full pl-12 pr-12 py-4 bg-slate-900 border-2 border-slate-600 rounded-xl text-2xl font-mono text-white text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-2xl font-mono text-slate-500">€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Validation & Feedback */}
        <div className="mt-8">
          {feedback === null ? (
            <button
              onClick={handleValidate}
              disabled={!inputValue}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
            >
              CALCULAR FINIQUITO
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
                    {feedback === 'success' ? '¡Finiquito calculado!' : 'Error de cálculo. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'Tienes derecho a esos 1.604€. Has obtenido el dígito 5.'
                      : 'Revisa la fórmula: (Salario/30días) + (Pagas/12meses) + (Vacaciones/12*meses * valor día). Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 5 : null)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors border border-slate-600"
                  >
                    Siguiente Expediente <ArrowRight className="w-5 h-5" />
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
