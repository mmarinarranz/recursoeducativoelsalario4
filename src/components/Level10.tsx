import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Calculator } from 'lucide-react';

export function Level10({ onSuccess, onFailure }: { onSuccess: () => void, onFailure: () => void }) {
  const [step, setStep] = useState(1);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleValidate = () => {
    if (step === 1) {
      if (parseInt(input1, 10) === 1550) {
        setStep(2);
      } else {
        setFeedback('error');
      }
    } else if (step === 2) {
      if (input2.toUpperCase() === 'NO' || input2 === '0') {
        setStep(3);
      } else {
        setFeedback('error');
      }
    } else if (step === 3) {
      if (parseInt(input3, 10) === 1550) {
        onSuccess();
      } else {
        setFeedback('error');
      }
    }
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
            <h2 className="text-2xl font-bold text-white mb-2">Reto 10 FINAL: Base Misteriosa (BCCC)</h2>
            <p className="text-slate-400">Para abrir la puerta de salida, debes generar la clave maestra: La Base de Cotización de Contingencias Comunes correcta.</p>
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
            <strong>Pista:</strong> Solo suma salario, pluses y prorrata. Excluye dietas. Verifica que no baje del mínimo del grupo.
          </motion.div>
        )}

        <div className="flex flex-col gap-8 flex-1">
          {/* Data Sheet */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50">
            <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Datos del Trabajador</h3>
            <ul className="space-y-3 text-slate-300 font-mono">
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Salario Base:</span> <span className="text-emerald-400">1.400€</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Plus Antigüedad:</span> <span className="text-emerald-400">50€</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Prorrata Pagas Extras:</span> <span className="text-emerald-400">100€</span>
              </li>
              <li className="flex justify-between border-b border-slate-700/50 pb-2">
                <span>Dieta de viaje (no cotizable):</span> <span className="text-emerald-400">50€</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Grupo Profesional:</span> <span className="text-emerald-400">Límite Mínimo 1.381,20€ | Máximo 4.909,50€</span>
              </li>
            </ul>
          </div>

          {/* Wizard Steps */}
          <div className="p-6 bg-blue-900/10 rounded-2xl border border-blue-500/20 flex flex-col items-center justify-center">
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
                <h3 className="text-lg font-bold text-blue-400 mb-4 text-center">Paso 1: Suma los conceptos cotizables.</h3>
                <div className="relative w-full">
                  <input
                    type="number"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    disabled={feedback !== null}
                    placeholder="0"
                    className="w-full px-4 py-4 bg-slate-900 border-2 border-slate-600 rounded-xl text-2xl font-mono text-white text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
                <h3 className="text-lg font-bold text-blue-400 mb-4 text-center">Paso 2: ¿La dieta de viaje suma? (Escribe SI o NO)</h3>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    disabled={feedback !== null}
                    placeholder="SI / NO"
                    className="w-full px-4 py-4 bg-slate-900 border-2 border-slate-600 rounded-xl text-2xl font-mono text-white text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50 uppercase"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
                <h3 className="text-lg font-bold text-blue-400 mb-4 text-center">Paso 3: Introduce la BCCC final (verifica límites).</h3>
                <div className="relative w-full">
                  <input
                    type="number"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value)}
                    disabled={feedback !== null}
                    placeholder="0"
                    className="w-full px-4 py-4 bg-slate-900 border-2 border-slate-600 rounded-xl text-2xl font-mono text-white text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
                  />
                </div>
              </motion.div>
            )}

          </div>
        </div>

        {/* Validation & Feedback */}
        <div className="mt-8">
          {feedback === null ? (
            <button
              onClick={handleValidate}
              disabled={(step === 1 && !input1) || (step === 2 && !input2) || (step === 3 && !input3)}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
            >
              {step === 3 ? 'GENERAR INFORME FINAL' : 'SIGUIENTE PASO'}
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl border bg-red-900/30 border-red-500/50"
            >
              <div className="flex items-start gap-4">
                <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                <div className="flex-1">
                  <h4 className="text-lg font-bold mb-2 text-red-400">
                    La base no cuadra.
                  </h4>
                  <p className="text-slate-300 mb-4">
                    Recuerda: Solo suma salario, pluses y prorrata. Excluye dietas. Verifica que no baje del mínimo del grupo.
                  </p>
                  <button
                    onClick={onFailure}
                    className="flex items-center gap-2 px-6 py-3 bg-red-800 hover:bg-red-700 text-white font-bold rounded-xl transition-colors border border-red-600"
                  >
                    ACEPTAR FRACASO <ArrowRight className="w-5 h-5" />
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
