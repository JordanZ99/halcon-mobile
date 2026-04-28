import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Package,
  Truck,
  Home,
  ClipboardCheck,
  Camera,
  Eye,
  ChevronDown,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const DELIVERY_EVIDENCE_IMAGE =
  "https://images.unsplash.com/photo-1760045788252-d8d386ea1d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMGNvbnN0cnVjdGlvbiUyMHNpdGUlMjB3b3JrZXJ8ZW58MXx8fHwxNzc2NzQzMDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

type OrderStatus = "Pedido Recibido" | "En Proceso" | "En Ruta" | "Entregado";

const steps: { id: OrderStatus; label: string; sublabel: string; icon: React.ElementType }[] = [
  {
    id: "Pedido Recibido",
    label: "Pedido Recibido",
    sublabel: "Confirmado en sistema",
    icon: ClipboardCheck,
  },
  {
    id: "En Proceso",
    label: "En Proceso",
    sublabel: "Preparando tu pedido",
    icon: Package,
  },
  {
    id: "En Ruta",
    label: "En Ruta",
    sublabel: "Camino a tu destino",
    icon: Truck,
  },
  {
    id: "Entregado",
    label: "Entregado",
    sublabel: "Entrega completada",
    icon: Home,
  },
];

const statusOrder: OrderStatus[] = [
  "Pedido Recibido",
  "En Proceso",
  "En Ruta",
  "Entregado",
];

export function TrackingScreen() {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("Entregado");
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const currentIndex = statusOrder.indexOf(currentStatus);

  const getStepState = (stepId: OrderStatus): "completed" | "active" | "pending" => {
    const stepIndex = statusOrder.indexOf(stepId);
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  const isEntregado = currentStatus === "Entregado";

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(844px - 72px)" }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-5"
        style={{ background: "#2C3E50" }}
      >
        <p style={{ color: "#7F8C8D", fontSize: "12px", letterSpacing: "0.08em", marginBottom: "4px" }}>
          MIS PEDIDOS
        </p>
        <h1 style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: 700 }}>
          Seguimiento de Pedido
        </h1>

        {/* Order Info Card */}
        <div
          className="mt-4 rounded-2xl p-4 flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <p style={{ color: "#95A5A6", fontSize: "11px", letterSpacing: "0.06em" }}>FACTURA</p>
            <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 600 }}>FAC-2024-0891</p>
            <p style={{ color: "#7F8C8D", fontSize: "12px", marginTop: "2px" }}>Cliente: CLI-00234</p>
          </div>
          {/* Status Simulator */}
          <div className="relative">
            <button
              onClick={() => setShowStatusPicker(!showStatusPicker)}
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{
                background: "#F39C12",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ color: "#2C3E50", fontSize: "11px", fontWeight: 700 }}>
                {currentStatus === "Pedido Recibido" ? "RECIBIDO" :
                 currentStatus === "En Proceso" ? "PROCESO" :
                 currentStatus === "En Ruta" ? "EN RUTA" : "ENTREGADO"}
              </span>
              <ChevronDown size={12} color="#2C3E50" />
            </button>
            {showStatusPicker && (
              <div
                className="absolute right-0 top-full mt-1 rounded-xl overflow-hidden z-50"
                style={{ background: "#FFFFFF", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", minWidth: "160px" }}
              >
                {statusOrder.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setCurrentStatus(s);
                      setShowStatusPicker(false);
                    }}
                    className="w-full flex items-center px-4 py-3"
                    style={{
                      background: currentStatus === s ? "rgba(243,156,18,0.1)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: currentStatus === s ? "#F39C12" : "#2C3E50",
                      fontSize: "13px",
                      fontWeight: currentStatus === s ? 600 : 400,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-5 py-5 flex flex-col gap-4">

        {/* Stepper Card */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <p style={{ color: "#2C3E50", fontSize: "14px", fontWeight: 700, marginBottom: "20px", letterSpacing: "0.04em" }}>
            ESTADO DEL PEDIDO
          </p>

          <div className="flex flex-col">
            {steps.map((step, index) => {
              const state = getStepState(step.id);
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="flex gap-4">
                  {/* Left: Circle + Line */}
                  <div className="flex flex-col items-center" style={{ width: "36px" }}>
                    {/* Circle */}
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                      style={{
                        width: "36px",
                        height: "36px",
                        background:
                          state === "completed"
                            ? "#F39C12"
                            : state === "active"
                            ? "#2C3E50"
                            : "#F0F2F4",
                        border:
                          state === "active"
                            ? "3px solid #F39C12"
                            : "none",
                      }}
                    >
                      {state === "completed" ? (
                        <CheckCircle2 size={18} color="#FFFFFF" />
                      ) : state === "active" ? (
                        <Icon size={16} color="#F39C12" />
                      ) : (
                        <Circle size={16} color="#BDC3C7" />
                      )}
                    </div>
                    {/* Connector line */}
                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 my-1"
                        style={{
                          minHeight: "32px",
                          background:
                            state === "completed"
                              ? "#F39C12"
                              : "#E0E4E9",
                          transition: "background 0.3s",
                        }}
                      />
                    )}
                  </div>

                  {/* Right: Labels */}
                  <div className="flex-1 pb-5">
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: state === "pending" ? 400 : 600,
                        color:
                          state === "pending"
                            ? "#BDC3C7"
                            : state === "active"
                            ? "#2C3E50"
                            : "#2C3E50",
                        marginBottom: "2px",
                      }}
                    >
                      {step.label}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: state === "pending" ? "#D5D8DC" : "#95A5A6",
                      }}
                    >
                      {state === "completed"
                        ? "Completado"
                        : state === "active"
                        ? step.sublabel
                        : "Pendiente"}
                    </p>
                    {state === "active" && (
                      <div
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mt-1"
                        style={{ background: "rgba(243,156,18,0.12)" }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: "#F39C12" }}
                        />
                        <span style={{ color: "#F39C12", fontSize: "11px", fontWeight: 600 }}>
                          En curso
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence Section — only when Entregado */}
        {isEntregado && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            {/* Section header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid #F0F2F4" }}
            >
              <div className="flex items-center gap-2">
                <Camera size={16} color="#F39C12" />
                <p style={{ color: "#2C3E50", fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em" }}>
                  EVIDENCIA DE ENTREGA
                </p>
              </div>
              <div
                className="rounded-full px-2 py-0.5"
                style={{ background: "rgba(39, 174, 96, 0.1)" }}
              >
                <span style={{ color: "#27AE60", fontSize: "11px", fontWeight: 600 }}>Verificado</span>
              </div>
            </div>

            {/* Photo placeholder */}
            <div className="relative" style={{ height: "180px", overflow: "hidden" }}>
              <ImageWithFallback
                src={DELIVERY_EVIDENCE_IMAGE}
                alt="Evidencia de entrega"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex flex-col items-center justify-end pb-4"
                style={{ background: "linear-gradient(to top, rgba(44,62,80,0.7) 0%, transparent 60%)" }}
              >
              </div>
            </div>

            {/* Ver Evidencia button */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p style={{ color: "#2C3E50", fontSize: "13px", fontWeight: 600 }}>
                  Foto de entrega registrada
                </p>
                <p style={{ color: "#95A5A6", fontSize: "12px" }}>21 Abr 2026 · 14:32 hrs</p>
              </div>
              <button
                className="flex items-center gap-2 rounded-xl px-4 py-2"
                style={{ background: "#2C3E50", border: "none", cursor: "pointer" }}
              >
                <Eye size={14} color="#F39C12" />
                <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600 }}>
                  Ver Evidencia
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Delivery info */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <p style={{ color: "#2C3E50", fontSize: "14px", fontWeight: 700, marginBottom: "12px", letterSpacing: "0.04em" }}>
            INFORMACION DE ENTREGA
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "Destino", value: "Av. Industrial 4520, Monterrey" },
              { label: "Transportista", value: "Logistica Halcon S.A." },
              { label: "Fecha estimada", value: "21 Abr 2026" },
            ].map((info) => (
              <div key={info.label} className="flex justify-between items-start">
                <span style={{ color: "#95A5A6", fontSize: "13px" }}>{info.label}</span>
                <span style={{ color: "#2C3E50", fontSize: "13px", fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
