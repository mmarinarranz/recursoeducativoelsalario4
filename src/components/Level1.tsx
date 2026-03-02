import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level1({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [items, setItems] = useState([
    { id: 'contrato', text: 'Salario del Contrato' },
    { id: 'smi', text: 'Salario Mínimo Interprofesional (SMI)' },
    { id: 'convenio', text: 'Salario del Convenio Colectivo' },
  ]);
  const [selectedItems, setSelectedItems] = useState<{id: string, text: string}[]>([]);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (item: {id: string, text: string}) => {
    if (feedback !== null) return;
    setItems(items.filter(i => i.id !== item.id));
    setSelectedItems([...selectedItems, item]);
  };

  const handleDeselect = (item: {id: string, text: string}) => {
    if (feedback !== null) return;
    setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    setItems([...items, item]);
  };

  const handleValidate = () => {
    if (selectedItems.length !== 3) return;
    
    const isCorrect = 
      selectedItems[0].id === 'smi' && 
      selectedItems[1].id === 'convenio' && 
      selectedItems[2].id === 'contrato';

    if (isCorrect) {
      setFeedback('success');
    } else {
      setFeedback('error');
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
            <h2 className="text-2xl font-bold text-white mb-2">Reto 1: Ordena la Jerarquía</h2>
            <p className="text-slate-400">Ordena las fuentes salariales de menor a mayor protección. Recuerda: lo mejor para el trabajador siempre prevalece.</p>
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
            <strong>Pista:</strong> Piensa en una escalera: el gobierno pone el primer escalón (SMI), el sector pone el segundo (Convenio) y tu jefe puede ponerte en el tercero (Contrato).
          </motion.div>
        )}

        <div className="flex-1 flex flex-col gap-8">
          {/* Source Items */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 min-h-[120px]">
            <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Elementos Disponibles (Haz clic para ordenar)</h3>
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  disabled={feedback !== null}
                  className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-left transition-all hover:translate-x-2 disabled:opacity-50 disabled:hover:translate-x-0"
                >
                  {item.text}
                </button>
              ))}
              {items.length === 0 && (
                <div className="text-center text-slate-500 py-4 italic">Todos los elementos seleccionados</div>
              )}
            </div>
          </div>

          {/* Target Zones */}
          <div className="p-6 bg-emerald-900/10 rounded-2xl border border-emerald-500/20 min-h-[240px] flex flex-col">
            <h3 className="text-sm font-mono text-emerald-500/70 mb-4 uppercase tracking-widest">Orden: Menor a Mayor Protección</h3>
            <div className="flex flex-col gap-3 flex-1">
              {selectedItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30">
                    {index + 1}
                  </div>
                  <button
                    onClick={() => handleDeselect(item)}
                    disabled={feedback !== null}
                    className="flex-1 p-4 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/50 rounded-xl text-left transition-all disabled:opacity-100 disabled:hover:bg-emerald-900/40"
                  >
                    {item.text}
                  </button>
                </div>
              ))}
              {selectedItems.length < 3 && (
                <div className="flex-1 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500 p-4">
                  Selecciona elementos de arriba
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Validation & Feedback */}
        <div className="mt-8">
          {feedback === null ? (
            <button
              onClick={handleValidate}
              disabled={selectedItems.length !== 3}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
            >
              VALIDAR ORDEN
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
                    {feedback === 'success' ? '¡Correcto!' : 'Incorrecto. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'El contrato puede mejorar el convenio, pero nunca empeorarlo. Has obtenido el dígito 3.'
                      : 'Recuerda: el SMI es el suelo, el convenio es el sector, y el contrato es tu acuerdo personal. ¿Cuál protege más? Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 3 : null)}
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
