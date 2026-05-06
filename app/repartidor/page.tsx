"use client";

import { useState, useEffect } from "react";
import { 
  Truck, 
  ChevronLeft, 
  ShieldCheck, 
  Package, 
  MapPin, 
  ChevronRight,
  LogOut,
  User
} from "lucide-react";
import Link from "next/link";
import { loginAction, logoutAction } from "@/app/actions/auth";
import { fetchOrdersAction } from "@/app/actions/orders";

const MOCK_ORDERS = [
  { id: "12345", customer: "Carlos M.", zone: "Sector Norte", items: "3 cajas", status: "Pendiente" },
  { id: "12346", customer: "Elena R.", zone: "Santa Catarina", items: "1 palet", status: "Pendiente" },
  { id: "12347", customer: "Ind. Ramos", zone: "Parque Industrial", items: "5 bultos", status: "Pendiente" },
];

export default function RepartidorPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const result = await fetchOrdersAction();
      if (result.success) {
        setOrders(result.data);
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && pass) {
      setIsLoading(true);
      setErrorMsg("");
      const result = await loginAction(user, pass);
      
      if (result.success) {
        setIsLoggedIn(true);
        const ordersResult = await fetchOrdersAction();
        if (ordersResult.success) {
          setOrders(ordersResult.data);
        }
      } else {
        setErrorMsg(result.message || "Error al iniciar sesión");
      }
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col flex-1 bg-white">
        <div className="bg-halcon-dark px-6 pt-16 pb-12 flex flex-col items-center">
          <Link href="/" className="self-start inline-flex items-center text-halcon-grey text-xs font-bold mb-8 hover:text-white transition-colors">
            <ChevronLeft size={14} className="mr-1" /> SALIR
          </Link>
          <div className="w-16 h-16 bg-halcon-orange rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck size={32} className="text-halcon-dark" />
          </div>
          <h1 className="text-white text-xl font-bold">Portal Repartidor</h1>
          <p className="text-halcon-grey text-xs mt-1 uppercase tracking-widest">Acceso Restringido</p>
        </div>

        <div className="flex-1 px-8 pt-10">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-halcon-grey uppercase tracking-widest ml-1">Usuario</label>
              <input 
                type="text" 
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="repartidor_01"
                className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 outline-none focus:border-halcon-orange transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-halcon-grey uppercase tracking-widest ml-1">Contraseña</label>
              <input 
                type="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl py-4 px-5 outline-none focus:border-halcon-orange transition-all"
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-halcon-dark text-white font-bold py-4 rounded-xl mt-6 shadow-lg shadow-black/10 active:scale-95 transition-transform disabled:opacity-50"
            >
              {isLoading ? "INGRESANDO..." : "INGRESAR AL SISTEMA"}
            </button>
            {errorMsg && <p className="text-red-500 text-xs text-center mt-3 font-medium">{errorMsg}</p>}
          </form>
          <p className="text-center text-halcon-grey text-[10px] mt-10">
            Halcón Logística - Dispositivo Autorizado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      {/* Header Driver */}
      <div className="bg-halcon-dark px-5 pt-12 pb-6 flex justify-between items-end">
        <div>
          <p className="text-halcon-orange text-[10px] font-bold uppercase tracking-widest">En línea</p>
          <h1 className="text-white text-xl font-bold mt-1">Mis Entregas</h1>
          <p className="text-halcon-grey text-xs tracking-wider">Juan Pérez · ID: 4421</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>

      <div className="p-5 flex-1 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-halcon-dark text-xs font-bold uppercase tracking-wider">Pendientes de hoy</p>
          <span className="bg-halcon-orange text-halcon-dark text-[10px] font-bold px-2 py-0.5 rounded-full">
            {orders.length} PEDIDOS
          </span>
        </div>

        {orders.map((order: any) => (
          <Link 
            key={order.id}
            href={`/repartidor/entrega/${order.id}`}
            className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package size={16} className="text-halcon-grey" />
                </div>
                <div>
                  <p className="text-halcon-dark text-sm font-bold">FAC-{order.id}</p>
                  <p className="text-halcon-grey text-[10px] uppercase font-medium">{order.items}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <User size={14} className="text-halcon-orange" />
                <span className="text-halcon-dark text-xs font-medium">{order.customer}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <MapPin size={14} className="text-halcon-orange" />
                <span className="text-halcon-dark text-xs font-medium">{order.zone}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-5">
        <div className="bg-halcon-dark/5 border border-dashed border-halcon-grey/30 rounded-2xl p-4 text-center">
          <p className="text-halcon-grey text-xs">No hay más entregas programadas</p>
        </div>
      </div>
    </div>
  );
}
