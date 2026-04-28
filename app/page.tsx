import Link from "next/link";
import { Package, Truck, User, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-halcon-dark text-white p-6 justify-center items-center">
      {/* Logo Section */}
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-halcon-orange rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-halcon-orange/20">
          <Truck size={40} className="text-halcon-dark" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">HALCÓN</h1>
        <p className="text-halcon-grey text-sm font-medium tracking-widest uppercase mt-1">Logística Inteligente</p>
      </div>

      <div className="w-full space-y-4 max-w-sm">
        <p className="text-center text-halcon-grey text-sm mb-6 uppercase tracking-wider font-semibold">
          Seleccione su perfil para continuar
        </p>

        {/* Customer Link */}
        <Link 
          href="/cliente" 
          className="group relative flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10 hover:border-halcon-orange/50"
        >
          <div className="w-12 h-12 bg-halcon-orange/10 rounded-xl flex items-center justify-center group-hover:bg-halcon-orange/20 transition-colors">
            <Package className="text-halcon-orange" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">Portal de Cliente</h2>
            <p className="text-halcon-grey text-xs">Rastree su pedido en tiempo real</p>
          </div>
          <div className="text-halcon-grey group-hover:text-halcon-orange transition-colors">
            <User size={20} />
          </div>
        </Link>

        {/* Driver Link */}
        <Link 
          href="/repartidor" 
          className="group relative flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10 hover:border-halcon-orange/50"
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-halcon-orange/20 transition-colors">
            <ShieldCheck className="text-white group-hover:text-halcon-orange transition-colors" size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">Portal de Repartidor</h2>
            <p className="text-halcon-grey text-xs">Gestione sus entregas asignadas</p>
          </div>
          <div className="text-halcon-grey group-hover:text-halcon-orange transition-colors">
            <Truck size={20} />
          </div>
        </Link>
      </div>

      <div className="mt-20 text-center">
        <p className="text-halcon-grey/40 text-[10px] uppercase tracking-widest">
          © 2026 Halcón Logística S.A.
        </p>
      </div>
    </div>
  );
}
