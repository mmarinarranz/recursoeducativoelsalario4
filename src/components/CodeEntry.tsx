import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock, AlertTriangle } from 'lucide-react';

export function CodeEntry({ 
  collectedDigits, 
  targetDigits, 
  onSuccess, 
  onFailure 
}: { 
  collectedDigits: (number | null)[], 
  targetDigits: number[],
  onSuccess: () => void,
  onFailure: () => void
}) {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);

  const isMissingDigits = collectedDigits.some(d => d === null);
  const collectedCode = collectedDigits.map(d => d === null ? '_' : d).join('');

  const handleValidate = () => {
    if (isMissingDigits) {
      onFailure();
      return;
    }

    if (inputCode === targetDigits.join('')) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full"
    >
      <div className="bg-slate-800/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl w-full text-center">
        
        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-slate-700 shadow-inner">
          {isMissingDigits ? (
            <Lock className="w-10 h-10 text-red-500" />
          ) : (
            <Unlock className="w-10 h-10 text-emerald-500" />
          )}
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">ACCESO AL INFORME FINAL</h2>
        
        {isMissingDigits ? (
          <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-2xl mb-8">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-400 mb-2">CADENA DE CUSTODIA INCOMPLETA</h3>
            <p className="text-slate-300 mb-4">
              Te faltan dígitos de seguridad. El sistema ha bloqueado el acceso al informe final.
            </p>
            <div className="font-mono text-2xl tracking-[0.5em] text-slate-500 bg-slate-900/50 p-4 rounded-xl">
              {collectedCode}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-slate-300 mb-6">
              Introduce manualmente los 9 dígitos que has recopilado durante la inspección para desbloquear el expediente final.
            </p>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="_________"
              className={`w-full text-center text-4xl tracking-[0.5em] font-mono bg-slate-900 border-2 rounded-xl py-4 outline-none transition-colors ${
                error ? 'border-red-500 text-red-500' : 'border-slate-600 text-white focus:border-emerald-500'
              }`}
            />
            {error && <p className="text-red-400 mt-2 font-bold animate-pulse">CÓDIGO INCORRECTO</p>}
          </div>
        )}

        <button
          onClick={handleValidate}
          disabled={!isMissingDigits && inputCode.length !== 9}
          className={`w-full py-4 font-bold rounded-xl transition-colors text-lg ${
            isMissingDigits 
              ? 'bg-red-600 hover:bg-red-500 text-white' 
              : 'bg-emerald-600 hover:bg-emerald-500 text-white disabled:bg-slate-700 disabled:text-slate-500'
          }`}
        >
          {isMissingDigits ? 'ACEPTAR FRACASO' : 'DESBLOQUEAR INFORME'}
        </button>
      </div>
    </motion.div>
  );
}
