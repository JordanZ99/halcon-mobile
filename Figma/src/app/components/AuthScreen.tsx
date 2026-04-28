import { useState } from "react";
import { useNavigate } from "react-router";
import { FileText, User, ChevronRight, HardHat } from "lucide-react";

export function AuthScreen() {
  const navigate = useNavigate();
  const [factura, setFactura] = useState("");
  const [cliente, setCliente] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!factura || !cliente) return;
    setLoading(true);
    setTimeout(() => {
      navigate("/app/pedidos");
    }, 900);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#2C3E50" }}
    >
      {/* Top decoration */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
        style={{ background: "#F39C12", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute top-20 left-0 w-40 h-40 rounded-full opacity-5"
        style={{ background: "#F39C12", transform: "translate(-40%, 0)" }}
      />

      {/* Brand Section */}
      <div className="flex flex-col items-center justify-center pt-20 pb-10 flex-shrink-0 relative z-10">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-2xl mb-5"
          style={{ background: "#F39C12" }}
        >
          <HardHat size={40} color="#2C3E50" strokeWidth={2} />
        </div>
        <h1
          className="tracking-widest uppercase"
          style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: 700, letterSpacing: "0.15em" }}
        >
          HALCON
        </h1>
        <p style={{ color: "#7F8C8D", fontSize: "13px", marginTop: "4px", letterSpacing: "0.05em" }}>
          Sistema de Gestión de Pedidos
        </p>
      </div>

      {/* Form Card */}
      <div
        className="mx-5 rounded-3xl flex-1 flex flex-col"
        style={{
          background: "#FFFFFF",
          padding: "32px 24px 28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ color: "#2C3E50", fontSize: "20px", fontWeight: 600, marginBottom: "6px" }}>
          Consultar Pedido
        </h2>
        <p style={{ color: "#95A5A6", fontSize: "13px", marginBottom: "28px" }}>
          Ingresa tus credenciales para continuar
        </p>

        {/* Input: Numero de Factura */}
        <div className="mb-5">
          <label style={{ color: "#2C3E50", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px", letterSpacing: "0.04em" }}>
            NUMERO DE FACTURA
          </label>
          <div
            className="flex items-center gap-3 rounded-xl px-4"
            style={{ background: "#F5F6FA", height: "52px", border: "1.5px solid #E0E4E9" }}
          >
            <FileText size={18} color="#F39C12" />
            <input
              type="text"
              placeholder="Ej. FAC-2024-0891"
              value={factura}
              onChange={(e) => setFactura(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#2C3E50",
                fontSize: "15px",
              }}
            />
          </div>
        </div>

        {/* Input: Numero de Cliente */}
        <div className="mb-8">
          <label style={{ color: "#2C3E50", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px", letterSpacing: "0.04em" }}>
            NUMERO DE CLIENTE
          </label>
          <div
            className="flex items-center gap-3 rounded-xl px-4"
            style={{ background: "#F5F6FA", height: "52px", border: "1.5px solid #E0E4E9" }}
          >
            <User size={18} color="#F39C12" />
            <input
              type="text"
              placeholder="Ej. CLI-00234"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#2C3E50",
                fontSize: "15px",
              }}
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!factura || !cliente || loading}
          className="flex items-center justify-center gap-2 rounded-xl w-full relative overflow-hidden"
          style={{
            background: !factura || !cliente ? "#E0E4E9" : "#F39C12",
            height: "54px",
            color: !factura || !cliente ? "#95A5A6" : "#2C3E50",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            transition: "all 0.2s",
            cursor: !factura || !cliente ? "not-allowed" : "pointer",
            border: "none",
          }}
        >
          {loading ? (
            <div
              className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "#2C3E50", borderTopColor: "transparent" }}
            />
          ) : (
            <>
              INGRESAR
              <ChevronRight size={18} />
            </>
          )}
        </button>

        {/* Bottom note */}
        <p style={{ color: "#BDC3C7", fontSize: "12px", textAlign: "center", marginTop: "20px" }}>
          Consulta el estado de tu pedido en tiempo real
        </p>
      </div>

      {/* Footer space */}
      <div className="py-6 flex items-center justify-center">
        <p style={{ color: "#4A6177", fontSize: "12px", letterSpacing: "0.04em" }}>
          HALCON ERP — Construccion v2.4
        </p>
      </div>
    </div>
  );
}
