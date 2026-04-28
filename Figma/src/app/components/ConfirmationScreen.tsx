import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  CheckCircle2,
  ClipboardList,
  ArrowRight,
  Package,
  Calendar,
  Hash,
} from "lucide-react";

interface CartItem {
  name: string;
  unit: string;
  price: string;
}

export function ConfirmationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { orderNumber?: string; items?: CartItem[]; itemCount?: number } | null;

  // Generate order number once on mount
  const orderNumber = useRef(
    state?.orderNumber ?? `HAL-${Math.floor(Math.random() * 9000) + 1000}`
  ).current;

  const items: CartItem[] = state?.items ?? [];
  const today = new Date();
  const dateStr = today.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeStr = today.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [showRing, setShowRing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowRing(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#2C3E50", overflowY: "auto" }}
    >
      {/* Decorative background circles */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(243,156,18,0.12) 0%, transparent 70%)",
          transform: "translate(25%, -25%)",
        }}
      />
      <div
        className="absolute bottom-40 left-0 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(243,156,18,0.07) 0%, transparent 70%)",
          transform: "translate(-30%, 0)",
        }}
      />

      {/* Top section — success icon + headline */}
      <div className="flex flex-col items-center pt-16 pb-8 px-6 relative z-10">
        {/* Animated ring + check */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Outer pulse ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: showRing ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: "108px",
              height: "108px",
              border: "2px solid rgba(243,156,18,0.3)",
            }}
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: showRing ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: "90px",
              height: "90px",
              border: "2px solid rgba(243,156,18,0.5)",
            }}
          />
          {/* Icon circle */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.45, delay: 0.15, type: "spring", stiffness: 200, damping: 16 }}
            className="flex items-center justify-center rounded-full"
            style={{ width: "72px", height: "72px", background: "#F39C12" }}
          >
            <CheckCircle2 size={38} color="#2C3E50" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-center"
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "26px",
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: "6px",
            }}
          >
            Pedido Realizado
          </h1>
          <h1
            style={{
              color: "#F39C12",
              fontSize: "26px",
              fontWeight: 700,
              lineHeight: 1.25,
            }}
          >
            con Exito
          </h1>
          <p
            style={{
              color: "#7F8C8D",
              fontSize: "13px",
              marginTop: "10px",
              lineHeight: 1.5,
            }}
          >
            Tu solicitud ha sido registrada en el sistema{"\n"}y esta siendo procesada.
          </p>
        </motion.div>
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.45 }}
        className="mx-5 rounded-3xl flex flex-col"
        style={{
          background: "#FFFFFF",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Order number banner */}
        <div
          className="px-5 py-4 flex flex-col items-center"
          style={{ background: "#F8F9FA", borderBottom: "1.5px solid #F0F2F4" }}
        >
          <p style={{ color: "#95A5A6", fontSize: "12px", letterSpacing: "0.08em", marginBottom: "6px" }}>
            TU NUEVO NUMERO DE PEDIDO ES
          </p>
          <div
            className="flex items-center gap-2 rounded-2xl px-5 py-2"
            style={{ background: "#2C3E50" }}
          >
            <Hash size={16} color="#F39C12" />
            <span style={{ color: "#F39C12", fontSize: "22px", fontWeight: 800, letterSpacing: "0.06em" }}>
              {orderNumber}
            </span>
          </div>
          <p style={{ color: "#BDC3C7", fontSize: "11px", marginTop: "8px" }}>
            Guarda este numero para rastrear tu pedido
          </p>
        </div>

        {/* Order meta info */}
        <div className="px-5 py-4 flex justify-between" style={{ borderBottom: "1px solid #F0F2F4" }}>
          <div className="flex items-center gap-2">
            <Calendar size={14} color="#F39C12" />
            <div>
              <p style={{ color: "#95A5A6", fontSize: "10px", letterSpacing: "0.06em" }}>FECHA</p>
              <p style={{ color: "#2C3E50", fontSize: "12px", fontWeight: 600 }}>{dateStr}</p>
            </div>
          </div>
          <div className="w-px" style={{ background: "#F0F2F4" }} />
          <div className="flex items-center gap-2">
            <Package size={14} color="#F39C12" />
            <div>
              <p style={{ color: "#95A5A6", fontSize: "10px", letterSpacing: "0.06em" }}>HORA</p>
              <p style={{ color: "#2C3E50", fontSize: "12px", fontWeight: 600 }}>{timeStr} hrs</p>
            </div>
          </div>
          <div className="w-px" style={{ background: "#F0F2F4" }} />
          <div className="flex items-center gap-2">
            <ClipboardList size={14} color="#F39C12" />
            <div>
              <p style={{ color: "#95A5A6", fontSize: "10px", letterSpacing: "0.06em" }}>PRODUCTOS</p>
              <p style={{ color: "#2C3E50", fontSize: "12px", fontWeight: 600 }}>
                {items.length > 0 ? items.length : "—"} art.
              </p>
            </div>
          </div>
        </div>

        {/* Products list */}
        {items.length > 0 && (
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #F0F2F4" }}>
            <p style={{ color: "#2C3E50", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", marginBottom: "10px" }}>
              RESUMEN DE PRODUCTOS
            </p>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{ width: "20px", height: "20px", background: "rgba(243,156,18,0.12)" }}
                    >
                      <CheckCircle2 size={12} color="#F39C12" />
                    </div>
                    <div>
                      <span style={{ color: "#2C3E50", fontSize: "13px", fontWeight: 600 }}>{item.name}</span>
                      <span style={{ color: "#95A5A6", fontSize: "11px" }}> · {item.unit}</span>
                    </div>
                  </div>
                  <span style={{ color: "#F39C12", fontSize: "13px", fontWeight: 700 }}>{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status tag */}
        <div className="px-5 py-3 flex items-center justify-between">
          <span style={{ color: "#95A5A6", fontSize: "12px" }}>Estado actual</span>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{ background: "rgba(243,156,18,0.1)" }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#F39C12" }}
            />
            <span style={{ color: "#F39C12", fontSize: "12px", fontWeight: 600 }}>
              Pedido Recibido
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mx-5 mt-5 flex flex-col gap-3 pb-10"
      >
        {/* Primary CTA */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-3 rounded-2xl w-full"
          style={{
            height: "56px",
            background: "#F39C12",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 28px rgba(243,156,18,0.4)",
          }}
        >
          <ClipboardList size={20} color="#2C3E50" />
          <span style={{ color: "#2C3E50", fontSize: "15px", fontWeight: 700, letterSpacing: "0.03em" }}>
            Rastrear Nuevo Pedido
          </span>
          <ArrowRight size={18} color="#2C3E50" />
        </button>

        {/* Secondary link */}
        <button
          onClick={() => navigate("/app/tienda")}
          className="flex items-center justify-center gap-2 rounded-2xl w-full"
          style={{
            height: "48px",
            background: "rgba(255,255,255,0.07)",
            border: "1.5px solid rgba(255,255,255,0.12)",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#7F8C8D", fontSize: "14px", fontWeight: 500 }}>
            Volver a la Tienda
          </span>
        </button>

        <p style={{ color: "#4A6177", fontSize: "11px", textAlign: "center", marginTop: "4px" }}>
          HALCON ERP — Gestion de Pedidos de Construccion
        </p>
      </motion.div>
    </div>
  );
}
