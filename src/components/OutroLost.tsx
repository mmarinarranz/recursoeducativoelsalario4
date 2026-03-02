import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, AlertOctagon } from 'lucide-react';

export function OutroLost({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto mt-12 bg-red-900/90 backdrop-blur-xl p-8 rounded-3xl border border-red-500 shadow-[0_0_50px_-10px_rgba(239,68,68,0.5)] text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
        className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-red-300 shadow-2xl relative z-10"
      >
        <AlertOctagon className="w-16 h-16 text-white" />
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight relative z-10">
        CASO ARCHIVADO
      </h1>
      
      <div className="inline-block bg-red-800/50 border border-red-400/50 px-6 py-2 rounded-full mb-8 relative z-10">
        <p className="text-red-200 font-mono font-bold tracking-widest uppercase">
          INFORME RECHAZADO
        </p>
      </div>

      <div className="text-left space-y-6 text-red-100/90 leading-relaxed mb-10 relative z-10">
        <div className="bg-red-950/50 p-6 rounded-2xl border border-red-800/50">
          <h3 className="text-red-400 font-bold mb-2 uppercase tracking-wider text-sm">Motivo:</h3>
          <p className="text-white font-mono mb-4">Cadena de custodia incompleta o tiempo agotado.</p>
          
          <h3 className="text-red-400 font-bold mb-2 uppercase tracking-wider text-sm">Informe del Sistema:</h3>
          <p className="italic text-red-200 border-l-4 border-red-500 pl-4 py-2 bg-red-900/20">
            "El inspector ha perdido evidencias críticas durante la investigación. Sin los 9 dígitos de validación, el informe técnico no tiene validez legal. Los abogados de Sombras S.L. han logrado desestimar el caso por falta de pruebas."
          </p>
        </div>

        <div className="bg-red-950/50 p-6 rounded-2xl border border-red-800/50">
          <h3 className="text-red-400 font-bold mb-4 uppercase tracking-wider text-sm">Consecuencia:</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-red-500">❌</span>
              <span>Los trabajadores no recuperarán su salario.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500">❌</span>
              <span>La empresa evade sus responsabilidades.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-500">❌</span>
              <span>No se ha logrado escapar.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center relative z-10">
        <button 
          onClick={onRestart}
          className="flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-red-900 font-bold py-4 px-8 rounded-xl transition-colors w-full sm:w-auto"
        >
          <RotateCcw className="w-5 h-5" /> VOLVER A INTENTARLO
        </button>
      </div>
    </motion.div>
  );
}
