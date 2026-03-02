import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export function Level2({ onComplete }: { onComplete: (digit: number | null) => void }) {
  const [options, setOptions] = useState([
    { id: 'deducciones', text: 'Deducciones' },
    { id: 'devengos', text: 'Devengos' },
    { id: 'liquido', text: 'Líquido a Percibir' },
  ]);
  
  const [zones, setZones] = useState<{ [key: number]: { id: string, text: string } | null }>({
    1: null,
    2: null,
    3: null
  });
  
  const [selectedOption, setSelectedOption] = useState<{ id: string, text: string } | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleZoneClick = (zoneId: number) => {
    if (feedback !== null) return;
    
    if (selectedOption) {
      // If zone already has an item, put it back in options
      if (zones[zoneId]) {
        setOptions(prev => [...prev, zones[zoneId]!]);
      }
      
      setZones(prev => ({ ...prev, [zoneId]: selectedOption }));
      setOptions(prev => prev.filter(o => o.id !== selectedOption.id));
      setSelectedOption(null);
    } else if (zones[zoneId]) {
      // Remove item from zone
      setOptions(prev => [...prev, zones[zoneId]!]);
      setZones(prev => ({ ...prev, [zoneId]: null }));
    }
  };

  const handleValidate = () => {
    if (!zones[1] || !zones[2] || !zones[3]) return;
    
    const isCorrect = 
      zones[1].id === 'devengos' && 
      zones[2].id === 'deducciones' && 
      zones[3].id === 'liquido';

    setFeedback(isCorrect ? 'success' : 'error');
  };

  const isComplete = zones[1] && zones[2] && zones[3];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col max-w-4xl mx-auto w-full"
    >
      <div className="bg-slate-800/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Reto 2: Nómina Incompleta</h2>
            <p className="text-slate-400">Esta nómina ha perdido sus etiquetas. Selecciona una etiqueta y luego haz clic en la zona correspondiente (1, 2 o 3).</p>
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
            <strong>Pista:</strong> Arriba lo que ganas, en medio lo que te quitan, y abajo lo que realmente cobras.
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {/* Options */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <h3 className="text-sm font-mono text-slate-500 uppercase tracking-widest">Etiquetas</h3>
            <div className="flex flex-col gap-3">
              {options.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(selectedOption?.id === option.id ? null : option)}
                  disabled={feedback !== null}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    selectedOption?.id === option.id 
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]' 
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-300'
                  } disabled:opacity-50`}
                >
                  {option.text}
                </button>
              ))}
              {options.length === 0 && (
                <div className="text-center text-slate-500 py-4 italic text-sm">Todas las etiquetas asignadas</div>
              )}
            </div>
          </div>

          {/* Payroll Document */}
          <div className="w-full md:w-2/3 bg-white rounded-lg p-6 text-slate-800 font-mono text-sm shadow-inner border border-slate-300 relative">
            <div className="text-center font-bold text-lg mb-6 pb-4 border-b-2 border-slate-800">RECIBO INDIVIDUAL DE SALARIOS</div>
            
            <div className="space-y-6">
              {/* Zone 1 */}
              <div 
                onClick={() => handleZoneClick(1)}
                className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  zones[1] ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-400">ZONA 1</span>
                  {zones[1] && <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">{zones[1].text}</span>}
                </div>
                <div className="pl-4 space-y-1 text-slate-600">
                  <div className="flex justify-between"><span>Salario Base</span><span>1.500,00 €</span></div>
                  <div className="flex justify-between"><span>Plus Antigüedad</span><span>150,00 €</span></div>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200"><span>TOTAL A</span><span>1.650,00 €</span></div>
                </div>
              </div>

              {/* Zone 2 */}
              <div 
                onClick={() => handleZoneClick(2)}
                className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  zones[2] ? 'bg-red-50 border-red-300' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-400">ZONA 2</span>
                  {zones[2] && <span className="font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">{zones[2].text}</span>}
                </div>
                <div className="pl-4 space-y-1 text-slate-600">
                  <div className="flex justify-between"><span>Contingencias Comunes (4.7%)</span><span>77,55 €</span></div>
                  <div className="flex justify-between"><span>IRPF (12%)</span><span>198,00 €</span></div>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200"><span>TOTAL B</span><span>275,55 €</span></div>
                </div>
              </div>

              {/* Zone 3 */}
              <div 
                onClick={() => handleZoneClick(3)}
                className={`p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  zones[3] ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-slate-400">ZONA 3</span>
                  {zones[3] && <span className="font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">{zones[3].text}</span>}
                </div>
                <div className="pl-4 space-y-1 text-slate-800 text-lg font-bold">
                  <div className="flex justify-between"><span>TOTAL (A - B)</span><span>1.374,45 €</span></div>
                </div>
              </div>
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
              VALIDAR NÓMINA
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
                    {feedback === 'success' ? '¡Nómina descifrada!' : 'Fallo. Evidencia Contaminada.'}
                  </h4>
                  <p className="text-slate-300 mb-4">
                    {feedback === 'success' 
                      ? 'Devengos menos Deducciones es igual a tu dinero real. Has obtenido el dígito 7.'
                      : 'Recuerda: arriba lo que ganas (Devengos), medio lo que quitas (Deducciones), abajo lo que cobras (Líquido). Pierdes este dígito.'}
                  </p>
                  <button
                    onClick={() => onComplete(feedback === 'success' ? 7 : null)}
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
