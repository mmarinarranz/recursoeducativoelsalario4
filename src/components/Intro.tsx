import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, FileText, ChevronRight, Download, Loader2 } from 'lucide-react';

export function Intro({ onStart }: { onStart: () => void }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Trigger the download endpoint
      window.location.href = '/api/download';
    } catch (error) {
      console.error('Error downloading:', error);
      alert('Hubo un error al generar el archivo.');
    } finally {
      setTimeout(() => setIsDownloading(false), 3000); // Reset after 3 seconds
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-12 bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-700 shadow-2xl"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center border border-red-500/30">
          <ShieldAlert className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Inspección Sorpresa</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">El Caso de "Sombras S.L."</p>
        </div>
      </div>

      <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
        <p>
          <strong className="text-white">Bienvenido, Inspector.</strong> Soy la Subdirectora de la Inspección de Trabajo. Tenemos un problema grave.
        </p>
        <p>
          La empresa <em>"Sombras S.L."</em> está bajo sospecha. Los trabajadores denuncian que no cobran lo que dice el convenio, que las nóminas están incompletas y que la empresa podría estar en quiebra encubierta.
        </p>
        <p>
          Tu misión es revisar los 10 expedientes que hay sobre mi mesa. Necesito que verifiques la jerarquía salarial, reconstruyas las nóminas borradas, calcules las bases de cotización y determines qué paga el FOGASA si la empresa cierra.
        </p>
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-200">
          <p className="font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            ATENCIÓN: PROTOCOLO DE ACTUACIÓN
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Los abogados de la empresa llegarán en <strong>1 hora y 15 minutos</strong>.</li>
            <li>Tienes 9 pruebas clave. Cada prueba validada te entregará un <strong>DÍGITO DE SEGURIDAD</strong>.</li>
            <li><strong>No hay segunda oportunidad.</strong> Si fallas, la evidencia se contamina y pierdes el dígito.</li>
            <li>Necesitas los 9 dígitos para emitir el Informe Final (Reto 10).</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={onStart}
          className="w-full group relative flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg py-4 px-8 rounded-2xl transition-all duration-200 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <FileText className="w-6 h-6 relative z-10" />
          <span className="relative z-10">INICIAR INSPECCIÓN</span>
          <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>

        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-sm py-3 px-8 rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {isDownloading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          <span>{isDownloading ? 'GENERANDO ARCHIVO...' : 'DESCARGAR JUEGO (HTML ÚNICO)'}</span>
        </button>
      </div>
    </motion.div>
  );
}
