import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level7({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [items, setItems] = useState([
    { id: 'salario', text: 'Salario Base (1.500€)' },
    { id: 'dieta', text: 'Dieta de viaje justificada (50€)' },
    { id: 'plus', text: 'Plus de peligrosidad (100€)' },
  ]);
  
  const [zones, setZones] = useState<{ [key: string]: { id: string, text: string }[] }>({
    'cotizacion': [],
    'irpf': [],
    'ambas': [],
    'ninguna': []
  });
  
  const [selectedItem, setSelectedItem] = useState<{ id: string, text: string } | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleZoneClick = (zoneId: string) => {
    if (feedback !== null || !selectedItem) return;
    
    setZones(prev => ({
      ...prev,
      [zoneId]: [...prev[zoneId], selectedItem]
    }));
    
    setItems(prev => prev.filter(i => i.id !== selectedItem.id));
    setSelectedItem(null);
  };

  const handleRemoveFromZone = (item: { id: string, text: string }, zoneId: string) => {
    if (feedback !== null) return;
    
    setZones(prev => ({
      ...prev,
      [zoneId]: prev[zoneId].filter(i => i.id !== item.id)
    }));
    
    setItems(prev => [...prev, item]);
  };

  const handleValidate = () => {
    if (items.length > 0) return;
    
    const isCorrect = 
      zones['ambas'].some(i => i.id === 'salario') &&
      zones['ambas'].some(i => i.id === 'plus') &&
      zones['ninguna'].some(i => i.id === 'dieta') &&
      zones['cotizacion'].length === 0 &&
      zones['irpf'].length === 0;

    setFeedback(isCorrect ? 'success' : 'error');
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
            <h2 className="text-2xl font-bold text-white mb-2">Reto 7: Base IRPF vs Base Cotización</h2>
            <p className="text-slate-400">Selecciona un concepto y haz clic en la base a la que pertenece.</p>
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
            <strong>Pista:</strong> Ojo: Las dietas justificadas dentro de límite no cotizan ni tributan. El salario y los pluses sí van a ambas bases.
          </motion.div>
        )}

        <div className="flex flex-col gap-8 flex-1">
          {/* Source Items */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 min-h-[120px]">
            <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-widest">Conceptos Flotantes</h3>
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

          {/* Target Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {/* Zona A: Base Cotización */}
            <div 
              onClick={() => handleZoneClick('cotizacion')}
              className={`p-4 rounded-2xl border-2 border-dashed transition-colors flex flex-col ${
                selectedItem ? 'bg-indigo-900/20 border-indigo-500/50 cursor-pointer hover:bg-indigo-900/40' : 'bg-slate-900/30 border-slate-700'
              }`}
            >
              <h3 className="text-sm font-bold text-indigo-400 mb-4 text-center">SOLO BASE COTIZACIÓN (SS)</h3>
              <div className="flex flex-col gap-2 flex-1">
                {zones['cotizacion'].map(item => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); handleRemoveFromZone(item, 'cotizacion'); }}
                    disabled={feedback !== null}
                    className="p-2 bg-indigo-900/40 hover:bg-indigo-800/60 border border-indigo-500/50 rounded-lg text-xs text-left transition-all"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Zona B: Base IRPF */}
            <div 
              onClick={() => handleZoneClick('irpf')}
              className={`p-4 rounded-2xl border-2 border-dashed transition-colors flex flex-col ${
                selectedItem ? 'bg-fuchsia-900/20 border-fuchsia-500/50 cursor-pointer hover:bg-fuchsia-900/40' : 'bg-slate-900/30 border-slate-700'
              }`}
            >
              <h3 className="text-sm font-bold text-fuchsia-400 mb-4 text-center">SOLO BASE IRPF (Hacienda)</h3>
              <div className="flex flex-col gap-2 flex-1">
                {zones['irpf'].map(item => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); handleRemoveFromZone(item, 'irpf'); }}
                    disabled={feedback !== null}
                    className="p-2 bg-fuchsia-900/40 hover:bg-fuchsia-800/60 border border-fuchsia-500/50 rounded-lg text-xs text-left transition-all"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Zona C: Ambas */}
            <div 
              onClick={() => handleZoneClick('ambas')}
              className={`p-4 rounded-2xl border-2 border-dashed transition-colors flex flex-col ${
                selectedItem ? 'bg-emerald-900/20 border-emerald-500/50 cursor-pointer hover:bg-emerald-900/40' : 'bg-slate-900/30 border-slate-700'
              }`}
            >
              <h3 className="text-sm font-bold text-emerald-400 mb-4 text-center">AMBAS BASES</h3>
              <div className="flex flex-col gap-2 flex-1">
                {zones['ambas'].map(item => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); handleRemoveFromZone(item, 'ambas'); }}
                    disabled={feedback !== null}
                    className="p-2 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/50 rounded-lg text-xs text-left transition-all"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Zona D: Ninguna */}
            <div 
              onClick={() => handleZoneClick('ninguna')}
              className={`p-4 rounded-2xl border-2 border-dashed transition-colors flex flex-col ${
                selectedItem ? 'bg-slate-700/50 border-slate-500/50 cursor-pointer hover:bg-slate-700/70' : 'bg-slate-900/30 border-slate-700'
              }`}
            >
              <h3 className="text-sm font-bold text-slate-400 mb-4 text-center">NINGUNA (Exento)</h3>
              <div className="flex flex-col gap-2 flex-1">
                {zones['ninguna'].map(item => (
                  <button
                    key={item.id}
                    onClick={(e) => { e.stopPropagation(); handleRemoveFromZone(item, 'ninguna'); }}
                    disabled={feedback !== null}
                    className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs text-left transition-all"
                  >
                    {item.text}
                  </button>
                ))}
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
              VALIDAR ZONAS
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
                    {feedback === 'success' ? '¡Fiscalmente perfecto!' : 'Error de clasificación. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'Las dietas justificadas no cotizan ni tributan, el salario sí. Has obtenido el dígito 8.'
                      : 'Ojo: Las dietas justificadas dentro de límite no cotizan ni tributan. El salario y los pluses sí van a ambas bases. Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 8 : null)}
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
