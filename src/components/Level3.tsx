import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level3({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [items, setItems] = useState([
    { id: 'salario', text: 'Salario Base' },
    { id: 'nocturnidad', text: 'Plus de Nocturnidad' },
    { id: 'dieta', text: 'Dieta de viaje (justificada con factura)' },
    { id: 'indemnizacion', text: 'Indemnización por despido (dentro de límites legales)' },
    { id: 'prorrata', text: 'Prorrata de Pagas Extras' },
  ]);
  
  const [cotiza, setCotiza] = useState<{ id: string, text: string }[]>([]);
  const [noCotiza, setNoCotiza] = useState<{ id: string, text: string }[]>([]);
  
  const [selectedItem, setSelectedItem] = useState<{ id: string, text: string } | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleColumnClick = (column: 'cotiza' | 'noCotiza') => {
    if (feedback !== null || !selectedItem) return;
    
    if (column === 'cotiza') {
      setCotiza(prev => [...prev, selectedItem]);
    } else {
      setNoCotiza(prev => [...prev, selectedItem]);
    }
    
    setItems(prev => prev.filter(i => i.id !== selectedItem.id));
    setSelectedItem(null);
  };

  const handleRemoveFromColumn = (item: { id: string, text: string }, column: 'cotiza' | 'noCotiza') => {
    if (feedback !== null) return;
    
    if (column === 'cotiza') {
      setCotiza(prev => prev.filter(i => i.id !== item.id));
    } else {
      setNoCotiza(prev => prev.filter(i => i.id !== item.id));
    }
    
    setItems(prev => [...prev, item]);
  };

  const handleValidate = () => {
    if (items.length > 0) return;
    
    const correctCotiza = ['salario', 'nocturnidad', 'prorrata'];
    const correctNoCotiza = ['dieta', 'indemnizacion'];
    
    const isCotizaCorrect = cotiza.every(item => correctCotiza.includes(item.id)) && cotiza.length === correctCotiza.length;
    const isNoCotizaCorrect = noCotiza.every(item => correctNoCotiza.includes(item.id)) && noCotiza.length === correctNoCotiza.length;

    setFeedback(isCotizaCorrect && isNoCotizaCorrect ? 'success' : 'error');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col max-w-4xl mx-auto w-full"
    >
      <div className="bg-slate-800/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Reto 3: ¿Cotiza o no cotiza?</h2>
            <p className="text-slate-400">Clasifica estos conceptos. Solo lo que cotiza cuenta para tu pensión futura. Selecciona un elemento y luego haz clic en la columna correspondiente.</p>
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
            <strong>Pista:</strong> Lo que compensa gastos (dietas) o indemniza (despido legal) suele estar exento de cotización.
          </motion.div>
        )}

        <div className="flex flex-col gap-8 flex-1">
          {/* Source Items */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 min-h-[120px]">
            <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Conceptos a Clasificar</h3>
            <div className="flex flex-wrap gap-3">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                  disabled={feedback !== null}
                  className={`px-4 py-3 rounded-xl text-sm transition-all border ${
                    selectedItem?.id === item.id 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]' 
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-300'
                  } disabled:opacity-50`}
                >
                  {item.text}
                </button>
              ))}
              {items.length === 0 && (
                <div className="w-full text-center text-slate-500 py-4 italic text-sm">Todos los conceptos clasificados</div>
              )}
            </div>
          </div>

          {/* Target Columns */}
          <div className="flex flex-col md:flex-row gap-6 flex-1">
            {/* SÍ COTIZA */}
            <div 
              onClick={() => handleColumnClick('cotiza')}
              className={`flex-1 p-6 rounded-2xl border-2 border-dashed transition-colors flex flex-col ${
                selectedItem ? 'bg-emerald-900/20 border-emerald-500/50 cursor-pointer hover:bg-emerald-900/40' : 'bg-slate-900/30 border-slate-700'
              }`}
            >
              <h3 className="text-lg font-bold text-emerald-400 mb-4 text-center">SÍ COTIZA</h3>
              <div className="flex flex-col gap-3 flex-1">
                {cotiza.map(item => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); handleRemoveFromColumn(item, 'cotiza'); }}
                    disabled={feedback !== null}
                    className="p-3 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/50 rounded-xl text-sm text-left transition-all disabled:opacity-100 disabled:hover:bg-emerald-900/40"
                  >
                    {item.text}
                  </button>
                ))}
                {cotiza.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-slate-500 text-sm italic">
                    {selectedItem ? 'Haz clic aquí para añadir' : 'Vacío'}
                  </div>
                )}
              </div>
            </div>

            {/* NO COTIZA */}
            <div 
              onClick={() => handleColumnClick('noCotiza')}
              className={`flex-1 p-6 rounded-2xl border-2 border-dashed transition-colors flex flex-col ${
                selectedItem ? 'bg-red-900/20 border-red-500/50 cursor-pointer hover:bg-red-900/40' : 'bg-slate-900/30 border-slate-700'
              }`}
            >
              <h3 className="text-lg font-bold text-red-400 mb-4 text-center">NO COTIZA</h3>
              <div className="flex flex-col gap-3 flex-1">
                {noCotiza.map(item => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); handleRemoveFromColumn(item, 'noCotiza'); }}
                    disabled={feedback !== null}
                    className="p-3 bg-red-900/40 hover:bg-red-800/60 border border-red-500/50 rounded-xl text-sm text-left transition-all disabled:opacity-100 disabled:hover:bg-red-900/40"
                  >
                    {item.text}
                  </button>
                ))}
                {noCotiza.length === 0 && (
                  <div className="flex-1 flex items-center justify-center text-slate-500 text-sm italic">
                    {selectedItem ? 'Haz clic aquí para añadir' : 'Vacío'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Validation & Feedback */}
        <div className="mt-8">
          {feedback === null ? (
            <button
              onClick={handleValidate}
              disabled={items.length > 0}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
            >
              VALIDAR CLASIFICACIÓN
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
                    {feedback === 'success' ? '¡Bien!' : 'Cuidado. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'Las dietas justificadas y las indemnizaciones legales no cotizan, pero el salario y los pluses sí. Has obtenido el dígito 1.'
                      : 'Recuerda: lo que compensa gastos (dietas) o indemniza (despido legal) suele estar exento de cotización. Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 1 : null)}
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
