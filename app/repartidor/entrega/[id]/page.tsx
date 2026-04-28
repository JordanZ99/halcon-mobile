"use client";

import { useState, useRef } from "react";
import { 
  ChevronLeft, 
  Camera, 
  Check, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User, 
  Package,
  X,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EntregaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [notes, setNotes] = useState("Se dejó junto al portón");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!photo) return;
    setIsSubmitting(true);
    // Simulate upload
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      // Wait a bit then go back
      setTimeout(() => {
        router.push("/repartidor");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-halcon-dark px-5 pt-12 pb-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/repartidor" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex-1">
            <p className="text-halcon-grey text-[10px] font-bold uppercase tracking-widest">Confirmar Entrega</p>
            <h1 className="text-white text-lg font-bold">Factura #{id}</h1>
          </div>
          <div className="bg-halcon-orange rounded-lg px-3 py-1 text-center">
            <span className="block text-halcon-dark text-[8px] font-black uppercase leading-none">Zona</span>
            <span className="text-halcon-dark text-xs font-bold leading-none mt-1">NORTE</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Recipient Strip */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="text-halcon-grey text-[8px] font-bold uppercase">Destinatario</p>
            <p className="text-halcon-dark text-xs font-bold mt-1">Carlos M.</p>
          </div>
          <div className="w-[1px] h-8 bg-gray-100" />
          <div className="text-center flex-1">
            <p className="text-halcon-grey text-[8px] font-bold uppercase">Bultos</p>
            <p className="text-halcon-dark text-xs font-bold mt-1">3 cajas</p>
          </div>
          <div className="w-[1px] h-8 bg-gray-100" />
          <div className="text-center flex-1">
            <p className="text-halcon-grey text-[8px] font-bold uppercase">Tipo</p>
            <p className="text-halcon-dark text-xs font-bold mt-1">Prioritario</p>
          </div>
        </div>

        {/* Camera Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 px-1">
            <p className="text-halcon-dark text-xs font-bold uppercase tracking-wider">Evidencia Fotográfica</p>
            <span className="text-halcon-orange">*</span>
          </div>

          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload}
          />

          <button 
            onClick={() => !isDone && fileInputRef.current?.click()}
            className={`w-full h-56 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all overflow-hidden relative ${
              photo ? 'border-halcon-orange bg-halcon-orange/5' : 'border-gray-200 bg-white'
            }`}
          >
            {photo ? (
              <>
                <img src={photo} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 bg-halcon-orange rounded-full flex items-center justify-center">
                    <Check size={32} className="text-halcon-dark" />
                  </div>
                  <span className="text-white text-sm font-bold">Foto capturada</span>
                  <span className="text-white/60 text-[10px]">Toca para cambiar</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Camera size={32} className="text-halcon-grey" />
                </div>
                <p className="text-halcon-dark font-bold">Tomar Foto de Evidencia</p>
                <p className="text-halcon-grey text-xs mt-1 text-center max-w-[200px]">
                  Toca para abrir la cámara y fotografiar la entrega
                </p>
                <div className="mt-4 bg-halcon-dark text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <Camera size={14} /> ABRIR CÁMARA
                </div>
              </>
            )}
          </button>
          <p className="text-halcon-grey text-[10px] px-1 italic">
            La foto debe mostrar claramente el material y el punto de entrega.
          </p>
        </div>

        {/* Notes */}
        <div className="space-y-2 pt-2">
          <p className="text-halcon-dark text-xs font-bold uppercase tracking-wider px-1">Notas de Entrega</p>
          <div className="relative">
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Ej: Se dejó junto al portón..."
              className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm outline-none focus:border-halcon-orange transition-all"
            />
            <span className="absolute bottom-3 right-3 text-[10px] text-halcon-grey">{notes.length}/200</span>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-1 px-1">
            {["Entregado a titular", "En recepción", "Junto al portón", "Bajo techo"].map(note => (
              <button 
                key={note}
                onClick={() => setNotes(note)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                  notes === note ? 'bg-halcon-orange/10 border-halcon-orange text-halcon-orange' : 'bg-white border-gray-200 text-halcon-grey'
                }`}
              >
                {note}
              </button>
            ))}
          </div>
        </div>

        {/* Status Strip */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-halcon-grey" />
            <div>
              <p className="text-halcon-grey text-[8px] font-bold uppercase">Hora Registro</p>
              <p className="text-halcon-dark text-xs font-bold mt-0.5">26/04/2026 — 09:43 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-green-600">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase">GPS OK</span>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-200 safe-area-inset-bottom">
        <div className="max-w-[430px] mx-auto space-y-3">
          {!photo && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
              <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
              <p className="text-amber-800 text-[10px] font-medium leading-tight">
                Se requiere foto de evidencia para poder finalizar el registro de entrega.
              </p>
            </div>
          )}

          <button 
            disabled={!photo || isSubmitting || isDone}
            onClick={handleSubmit}
            className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-[0.98] ${
              !photo ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 
              isDone ? 'bg-green-500 text-white' : 'bg-halcon-orange text-halcon-dark'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={24} className="animate-spin" /> PROCESANDO...
              </>
            ) : isDone ? (
              <>
                <Check size={24} /> ¡ENTREGA REGISTRADA!
              </>
            ) : (
              <>
                <Check size={20} /> FINALIZAR ENTREGA
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
