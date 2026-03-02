import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level4({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [answers, setAnswers] = useState<{ [key: number]: boolean | null }>({
    1: null,
    2: null,
    3: null
  });
  
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (qId: number, answer: boolean) => {
    if (feedback !== null) return;
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const handleValidate = () => {
    if (answers[1] === null || answers[2] === null || answers[3] === null) return;
    
    const isCorrect = 
      answers[1] === false && 
      answers[2] === false && 
      answers[3] === true;

    setFeedback(isCorrect ? 'success' : 'error');
  };

  const handleRetry = () => {
    setAnswers({ 1: null, 2: null, 3: null });
    setFeedback(null);
  };

  const isComplete = answers[1] !== null && answers[2] !== null && answers[3] !== null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col max-w-3xl mx-auto w-full"
    >
      <div className="bg-slate-800/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 mt-2">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Reto 4: Verdadero o Falso</h2>
            <p className="text-slate-400">Responde a estas preguntas sobre garantías salariales.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-full text-slate-300 transition-colors"
              title="Ver Pista"
            >
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {showHint && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm">
            <strong>Pista:</strong> El SMI protege tu mínimo, el FOGASA protege la insolvencia y la solidaridad es la base del sistema.
          </motion.div>
        )}

        <div className="flex flex-col gap-6 flex-1">
          {/* Question 1 */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <p className="text-lg text-slate-200 mb-4">1. El Salario Mínimo Interprofesional (SMI) es embargable por deudas.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(1, true)}
                disabled={feedback !== null}
                className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                  answers[1] === true 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
                } disabled:opacity-50`}
              >
                VERDADERO
              </button>
              <button
                onClick={() => handleAnswer(1, false)}
                disabled={feedback !== null}
                className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                  answers[1] === false 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
                } disabled:opacity-50`}
              >
                FALSO
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <p className="text-lg text-slate-200 mb-4">2. El FOGASA paga siempre que la empresa no quiera pagarte el salario.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(2, true)}
                disabled={feedback !== null}
                className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                  answers[2] === true 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
                } disabled:opacity-50`}
              >
                VERDADERO
              </button>
              <button
                onClick={() => handleAnswer(2, false)}
                disabled={feedback !== null}
                className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                  answers[2] === false 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
                } disabled:opacity-50`}
              >
                FALSO
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <p className="text-lg text-slate-200 mb-4">3. El principio de solidaridad implica que los que más cotizan ayudan a los que más lo necesitan.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(3, true)}
                disabled={feedback !== null}
                className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                  answers[3] === true 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
                } disabled:opacity-50`}
              >
                VERDADERO
              </button>
              <button
                onClick={() => handleAnswer(3, false)}
                disabled={feedback !== null}
                className={`flex-1 py-3 rounded-xl font-bold transition-all border ${
                  answers[3] === false 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
                } disabled:opacity-50`}
              >
                FALSO
              </button>
            </div>
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
              VALIDAR RESPUESTAS
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
                    {feedback === 'success' ? '¡Garantías aseguradas!' : 'Error. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'Conoces tus derechos de protección. Has obtenido el dígito 9.'
                      : 'Repasa las garantías: el SMI protege tu mínimo, el FOGASA protege la insolvencia y la solidaridad es la base del sistema. Pierdes este dígito.'}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => onComplete(feedback === 'success' ? 9 : null)}
                      className="flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl transition-colors border bg-slate-800 hover:bg-slate-700 text-white border-slate-600 flex-1"
                    >
                      Siguiente Expediente <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
