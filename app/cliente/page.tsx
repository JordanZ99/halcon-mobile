"use client";

import { useState } from "react";
import { 
  HardHat, 
  FileText, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  Package,
  CheckCircle2,
  Truck,
  Home,
  ClipboardCheck,
  Camera,
  Eye,
  Circle
} from "lucide-react";
import Link from "next/link";

const DELIVERY_EVIDENCE_IMAGE = "https://images.unsplash.com/photo-1760045788252-d8d386ea1d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMGNvbnN0cnVjdGlvbiUyMHNpdGUlMjB3b3JrZXJ8ZW58MXx8fHwxNzc2NzQzMDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080";

type OrderStatus = "Pedido Recibido" | "En Proceso" | "En Ruta" | "Entregado";

const steps: { id: OrderStatus; label: string; sublabel: string; icon: any }[] = [
  { id: "Pedido Recibido", label: "Pedido Recibido", sublabel: "Confirmado en sistema", icon: ClipboardCheck },
  { id: "En Proceso", label: "En Proceso", sublabel: "Preparando tu pedido", icon: Package },
  { id: "En Ruta", label: "En Ruta", sublabel: "Camino a tu destino", icon: Truck },
  { id: "Entregado", label: "Entregado", sublabel: "Entrega completada", icon: Home },
];

const statusOrder: OrderStatus[] = ["Pedido Recibido", "En Proceso", "En Ruta", "Entregado"];

export default function ClientePage() {
  const [invoice, setInvoice] = useState("");
  const [clientId, setClientId] = useState("");
  const [searching, setSearching] = useState(false);
  const [order, setOrder] = useState<{ id: string; status: OrderStatus; customer: string } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoice || !clientId) return;

    setSearching(true);
    setOrder(null);

    // Simulation
    setTimeout(() => {
      if (invoice === "123") {
        setOrder({ id: "FAC-2024-0891", status: "Entregado", customer: clientId });
      } else {
        setOrder({ id: invoice.startsWith("FAC") ? invoice : `FAC-2024-${Math.floor(1000 + Math.random() * 9000)}`, status: "En Proceso", customer: clientId });
      }
      setSearching(false);
    }, 800);
  };

  const currentIndex = order ? statusOrder.indexOf(order.status) : -1;

  if (order) {
    return (
      <div className="flex flex-col flex-1 bg-[#F0F2F4]">
        {/* Header Results */}
        <div className="bg-[#2C3E50] px-5 pt-12 pb-6">
          <button 
            onClick={() => setOrder(null)}
            className="inline-flex items-center text-[#95A5A6] text-xs font-bold mb-4 hover:text-white transition-colors"
          >
            <ChevronLeft size={14} className="mr-1" /> NUEVA CONSULTA
          </button>
          <h1 className="text-white text-2xl font-bold">Seguimiento de Pedido</h1>
          <p className="text-[#95A5A6] text-xs tracking-wider mt-1 uppercase">HALCON ERP</p>
        </div>

        <div className="flex-1 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Order Info Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="text-[#95A5A6] text-[10px] font-bold tracking-widest uppercase">Factura</p>
              <p className="text-[#2C3E50] text-lg font-bold">{order.id}</p>
              <p className="text-[#95A5A6] text-xs mt-1">Cliente: {order.customer}</p>
            </div>
            <div className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
              order.status === 'Entregado' ? 'bg-green-100 text-green-700' : 'bg-[#F39C12]/10 text-[#F39C12]'
            }`}>
              {order.status}
            </div>
          </div>

          {/* Stepper Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-[#2C3E50] text-sm font-bold mb-6 tracking-wide">ESTADO DEL PEDIDO</p>
            <div className="flex flex-col">
              {steps.map((step, index) => {
                const stepIndex = statusOrder.indexOf(step.id);
                const isCompleted = stepIndex < currentIndex;
                const isActive = stepIndex === currentIndex;
                const isPending = stepIndex > currentIndex;
                const isLast = index === steps.length - 1;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center w-9">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted ? 'bg-[#F39C12]' : 
                        isActive ? 'bg-[#2C3E50] border-2 border-[#F39C12]' : 'bg-gray-100'
                      }`}>
                        {isCompleted ? <CheckCircle2 size={18} className="text-white" /> : 
                         isActive ? <Icon size={16} className="text-[#F39C12]" /> : 
                         <Circle size={16} className="text-gray-300" />}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 my-1 ${isCompleted ? 'bg-[#F39C12]' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className={`text-sm font-bold ${isPending ? 'text-gray-300' : 'text-[#2C3E50]'}`}>
                        {step.label}
                      </p>
                      <p className={`text-xs ${isPending ? 'text-gray-200' : 'text-[#95A5A6]'}`}>
                        {isCompleted ? "Completado" : isActive ? step.sublabel : "Pendiente"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evidence Section */}
          {order.status === "Entregado" && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <Camera size={16} className="text-[#F39C12]" />
                  <p className="text-[#2C3E50] text-sm font-bold uppercase tracking-wider">Evidencia de Entrega</p>
                </div>
              </div>
              <div className="h-48 relative">
                <img src={DELIVERY_EVIDENCE_IMAGE} alt="Evidencia" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-[#2C3E50] min-h-screen">
      {/* Brand Header */}
      <div className="flex flex-col items-center pt-16 pb-12">
        <div className="w-20 h-20 bg-[#F39C12] rounded-2xl flex items-center justify-center shadow-lg shadow-black/20 mb-6">
          <HardHat size={44} className="text-[#2C3E50]" />
        </div>
        <h1 className="text-white text-3xl font-bold tracking-widest">HALCON</h1>
        <p className="text-[#95A5A6] text-xs font-medium mt-1">Sistema de Gestión de Pedidos</p>
      </div>

      {/* Login Card */}
      <div className="flex-1 px-6 pb-10">
        <div className="bg-white rounded-[40px] p-8 shadow-2xl flex flex-col items-center">
          <div className="w-full text-left mb-8">
            <h2 className="text-[#2C3E50] text-2xl font-bold">Consultar Pedido</h2>
            <p className="text-gray-400 text-sm mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSearch} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[#2C3E50] text-[10px] font-bold uppercase tracking-widest px-1">
                Numero de Factura
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F39C12]">
                  <FileText size={18} />
                </div>
                <input 
                  type="text" 
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  placeholder="Ej. FAC-2024-0891"
                  className="w-full bg-[#F3F5F9] border-none rounded-2xl py-4 pl-12 pr-5 text-[#2C3E50] placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#F39C12]/20 transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[#2C3E50] text-[10px] font-bold uppercase tracking-widest px-1">
                Numero de Cliente
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F39C12]">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Ej. CLI-00234"
                  className="w-full bg-[#F3F5F9] border-none rounded-2xl py-4 pl-12 pr-5 text-[#2C3E50] placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#F39C12]/20 transition-all font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={searching || !invoice || !clientId}
              className="w-full bg-[#DDE2E9] hover:bg-[#D1D8E2] disabled:opacity-50 text-[#95A5A6] font-bold py-5 rounded-2xl mt-4 flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-sm"
            >
              {searching ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>INGRESAR <ChevronRight size={18} /></>
              )}
            </button>
          </form>

          <p className="text-gray-300 text-[10px] font-medium mt-8 text-center">
            Consulta el estado de tu pedido en tiempo real
          </p>
        </div>
      </div>

      {/* Footer Label */}
      <div className="pb-8 text-center">
        <p className="text-[#95A5A6] text-[10px] font-bold tracking-widest opacity-40">
          HALCON ERP — Construccion v2.4
        </p>
      </div>
    </div>
  );
}
