import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level6({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const options = [
    { id: 'A', text: 'El salario en especie supera el 30%.' },
    { id: 'B', text: 'El salario total es inferior al Convenio.' },
    { id: 'C', text: 'El pago no es puntual (retraso habitual).' },
    { id: 'D', text: 'Todo es legal.' }
  ];

  const handleToggle = (id: string) => {
    if (feedback !== null) return;
    
    if (id === 'D') {
      setSelectedOptions(['D']);
    } else {
      setSelectedOptions(prev => {
        const newSelection = prev.includes(id) 
          ? prev.filter(opt => opt !== id)
          : [...prev.filter(opt => opt !== 'D'), id];
        return newSelection;
      });
    }
  };

  const handleValidate = () => {
    if (selectedOptions.length === 0) return;
    
    const isCorrect = 
      selectedOptions.includes('A') && 
      selectedOptions.includes('B') && 
      selectedOptions.includes('C') && 
      !selectedOptions.includes('D') &&
      selectedOptions.length === 3;

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
            <h2 className="text-2xl font-bold text-white mb-2">Reto 6: Caso Laura: ¿Es legal?</h2>
            <p className="text-slate-400">Lee el caso y selecciona TODAS las infracciones legales que encuentres.</p>
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
            <strong>Pista:</strong> Hay más de una infracción. Revisa el porcentaje del alojamiento, compara con el convenio y mira la fecha de pago.
          </motion.div>
        )}

        <div className="flex flex-col gap-8 flex-1">
          {/* Story */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <h3 className="text-sm font-mono text-blue-400 mb-2 uppercase tracking-widest">Hechos Probados</h3>
            <p className="text-slate-200 text-lg leading-relaxed">
              "Laura cobra <strong>1.000€ en efectivo</strong> y <strong>600€ en alojamiento</strong> (valorado). Su convenio dice que debe cobrar <strong>1.800€ mínimos</strong>. Además, la empresa le paga siempre el <strong>día 10</strong> del mes siguiente (debería ser el día 5)."
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-mono text-slate-500 mb-2 uppercase tracking-widest">Selecciona las infracciones:</h3>
            {options.map(option => (
              <button
                key={option.id}
                onClick={() => handleToggle(option.id)}
                disabled={feedback !== null}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all border ${
                  selectedOptions.includes(option.id)
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-300'
                } disabled:opacity-50`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center border ${
                  selectedOptions.includes(option.id) ? 'bg-blue-500 border-blue-400 text-white' : 'bg-slate-900 border-slate-500'
                }`}>
                  {selectedOptions.includes(option.id) && <CheckCircle className="w-4 h-4" />}
                </div>
                <span className="font-bold w-6">{option.id})</span>
                <span className="flex-1">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Validation & Feedback */}
        <div className="mt-8">
          {feedback === null ? (
            <button
              onClick={handleValidate}
              disabled={selectedOptions.length === 0}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
            >
              EMITIR DICTAMEN
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
                    {feedback === 'success' ? '¡Inspector experto!' : 'Error de análisis. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'Has detectado el exceso de especie (37.5% > 30%), el incumplimiento del convenio (1600 < 1800) y el retraso. Has obtenido el dígito 2.'
                      : 'Hay más de una infracción. Revisa el porcentaje del alojamiento, compara con el convenio y mira la fecha de pago. Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 2 : null)}
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
