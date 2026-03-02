import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level5({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [selections, setSelections] = useState<{ [key: string]: string | null }>({
    '1-3': null,
    '4-15': null,
    '21+': null
  });
  
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const options = [
    { id: '0', text: '0%' },
    { id: 'empresa-60', text: 'Empresa (60%)' },
    { id: 'ss-60', text: 'Seguridad Social (60%)' },
    { id: 'ss-75', text: 'Seguridad Social (75%)' }
  ];

  const handleSelect = (row: string, optionId: string) => {
    if (feedback !== null) return;
    setSelections(prev => ({ ...prev, [row]: optionId }));
  };

  const handleValidate = () => {
    if (!selections['1-3'] || !selections['4-15'] || !selections['21+']) return;
    
    const isCorrect = 
      selections['1-3'] === '0' && 
      selections['4-15'] === 'empresa-60' && 
      selections['21+'] === 'ss-75';

    setFeedback(isCorrect ? 'success' : 'error');
  };

  const isComplete = selections['1-3'] !== null && selections['4-15'] !== null && selections['21+'] !== null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col max-w-4xl mx-auto w-full"
    >
      <div className="bg-slate-800/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Reto 5: Baja Médica: ¿Quién paga?</h2>
            <p className="text-slate-400">Selecciona la casilla que indica correctamente quién paga y cuánto en una baja por enfermedad común.</p>
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
            <strong>Pista:</strong> Los primeros 3 días no cobra. Del 4 al 15 es el 60%, y del 21 en adelante el 75%.
          </motion.div>
        )}

        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[600px] bg-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700">
                  <th className="p-4 text-slate-400 font-mono text-sm uppercase tracking-widest w-1/5">Días de Baja</th>
                  {options.map(opt => (
                    <th key={opt.id} className="p-4 text-slate-400 font-mono text-sm uppercase tracking-widest text-center w-1/5">
                      {opt.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-200">Días 1-3</td>
                  {options.map(opt => (
                    <td key={opt.id} className="p-2 text-center">
                      <button
                        onClick={() => handleSelect('1-3', opt.id)}
                        disabled={feedback !== null}
                        className={`w-full h-12 rounded-lg border transition-all ${
                          selections['1-3'] === opt.id
                            ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-[0_0_10px_-2px_rgba(59,130,246,0.5)]'
                            : 'bg-slate-800 border-slate-600 hover:bg-slate-700 text-transparent hover:text-slate-500'
                        } disabled:opacity-50`}
                      >
                        {selections['1-3'] === opt.id ? '✓' : 'Seleccionar'}
                      </button>
                    </td>
                  ))}
                </tr>
                {/* Row 2 */}
                <tr className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-200">Días 4-15</td>
                  {options.map(opt => (
                    <td key={opt.id} className="p-2 text-center">
                      <button
                        onClick={() => handleSelect('4-15', opt.id)}
                        disabled={feedback !== null}
                        className={`w-full h-12 rounded-lg border transition-all ${
                          selections['4-15'] === opt.id
                            ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-[0_0_10px_-2px_rgba(59,130,246,0.5)]'
                            : 'bg-slate-800 border-slate-600 hover:bg-slate-700 text-transparent hover:text-slate-500'
                        } disabled:opacity-50`}
                      >
                        {selections['4-15'] === opt.id ? '✓' : 'Seleccionar'}
                      </button>
                    </td>
                  ))}
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-bold text-slate-200">Días 21+</td>
                  {options.map(opt => (
                    <td key={opt.id} className="p-2 text-center">
                      <button
                        onClick={() => handleSelect('21+', opt.id)}
                        disabled={feedback !== null}
                        className={`w-full h-12 rounded-lg border transition-all ${
                          selections['21+'] === opt.id
                            ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-[0_0_10px_-2px_rgba(59,130,246,0.5)]'
                            : 'bg-slate-800 border-slate-600 hover:bg-slate-700 text-transparent hover:text-slate-500'
                        } disabled:opacity-50`}
                      >
                        {selections['21+'] === opt.id ? '✓' : 'Seleccionar'}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Validation & Feedback */}
        <div className="mt-8">
          {feedback === null ? (
            <button
              onClick={handleValidate}
              disabled={!isComplete}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
            >
              VALIDAR TABLA
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
                    {feedback === 'success' ? '¡Correcto!' : 'Error. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'Los primeros 3 días los asume la empresa (o no se cobra según convenio, pero legalmente es 0%), luego la empresa asume del 4 al 15, y la SS sube el porcentaje. Has obtenido el dígito 4.'
                      : 'Recuerda: los primeros 3 días no cobra. Del 4 al 15 es el 60%, y del 21 en adelante el 75%. Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 4 : null)}
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
