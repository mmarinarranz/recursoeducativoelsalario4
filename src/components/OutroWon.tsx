import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, CheckCircle, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export function OutroWon({ timeRemaining, onRestart }: { timeRemaining: number, onRestart: () => void }) {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const hrs = Math.floor(timeRemaining / 3600);
  const mins = Math.floor((timeRemaining % 3600) / 60);
  const secs = timeRemaining % 60;
  const timeString = hrs > 0 
    ? `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    : `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto bg-slate-900"
    >
      {/* Background: Open door with light */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 max-w-4xl w-full bg-slate-900/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-emerald-500/30 shadow-[0_0_100px_-20px_rgba(16,185,129,0.4)] my-auto"
      >
        {/* Animated Stamp */}
        <motion.div 
          initial={{ scale: 5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.8 }}
          className="absolute -top-6 -right-6 md:-top-10 md:-right-10 z-20 pointer-events-none"
        >
          <div className="border-4 border-emerald-500 text-emerald-500 font-black text-2xl md:text-4xl p-4 rounded-xl uppercase tracking-widest bg-slate-900/80 backdrop-blur-sm shadow-2xl transform rotate-12">
            INFORME VALIDADO
          </div>
        </motion.div>

        <div className="text-center mb-8">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
          >
            <UserCheck className="w-12 h-12 text-emerald-400" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            🏆 ¡MISIÓN CUMPLIDA, INSPECTOR!
          </h1>
          
          <div className="inline-block bg-emerald-900/50 border border-emerald-500/50 px-6 py-2 rounded-full">
            <p className="text-emerald-300 font-mono font-bold tracking-widest uppercase">
              📂 ESTADO DEL EXPEDIENTE: CERRADO CON ÉXITO
            </p>
          </div>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <p className="text-lg text-center text-emerald-100">
            Has logrado salir de la oficina de "Sombras S.L." justo antes de que lleguen los abogados de la empresa. Tu Informe de Inspección ha sido validado gracias a la Base de Cotización (BCCC) correcta y a los 9 dígitos de la cadena de custodia que reuniste.
          </p>
          
          <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700">
            <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
              <span>👷‍♂️</span> CONSECUENCIAS DE TU ACTUACIÓN:
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">1.</span>
                <span><strong>Justicia Salarial:</strong> La empresa está obligada a pagar los salarios retrasados con un interés del 10% anual por la demora.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">2.</span>
                <span><strong>Garantías Activadas:</strong> Al demostrar la insolvencia, el FOGASA ha sido notificado para cubrir las indemnizaciones pendientes (hasta 120 días de salario).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-500 font-bold">3.</span>
                <span><strong>Derechos Protegidos:</strong> Has demostrado que el Salario Mínimo (SMI) es inembargable y que la jerarquía normativa (Contrato &gt; Convenio &gt; Ley) se ha respetado.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700">
            <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
              <span>🎓</span> COMPETENCIAS DOMINADAS:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Estructura de la nómina (Devengos y Deducciones).</span></div>
              <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Cálculo de Bases de Cotización (BCCC y BCCP).</span></div>
              <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Distinción entre salario salarial y extrasalarial.</span></div>
              <div className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Aplicación de garantías sociales y principio de solidaridad.</span></div>
            </div>
          </div>

          <div className="text-center p-6 bg-emerald-900/20 rounded-2xl border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/5 mix-blend-overlay" />
            <p className="text-sm text-emerald-400 mb-2 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
              <span>🔐</span> CÓDIGO DE ESCAPE
            </p>
            <p className="font-mono text-3xl md:text-4xl font-black text-white tracking-widest mb-2">SALARIO-JUSTO-2026</p>
            <p className="text-sm text-slate-400">(Entregar código de escape al máster)</p>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-emerald-200 font-medium mb-2">
              ¡Enhorabuena! Has demostrado que el conocimiento es la mejor herramienta para defender los derechos laborales.
            </p>
            <p className="inline-block px-4 py-1 bg-slate-800 rounded-full text-sm text-emerald-400 font-mono border border-slate-700">
              Escapaste con {timeString} de margen.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button 
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl transition-colors border border-slate-600"
          >
            <RotateCcw className="w-5 h-5" /> VOLVER AL MENÚ PRINCIPAL
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
