import { useNavigate, useLocation } from "react-router";
import { ClipboardList, ShoppingCart } from "lucide-react";

const navItems = [
  {
    label: "Mis Pedidos",
    icon: ClipboardList,
    path: "/app/pedidos",
  },
  {
    label: "Tienda",
    icon: ShoppingCart,
    path: "/app/tienda",
  },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex"
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #E8EAED",
        height: "72px",
        paddingBottom: "8px",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex-1 flex flex-col items-center justify-center gap-1"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full transition-all"
              style={{
                width: "40px",
                height: "32px",
                background: isActive ? "rgba(243, 156, 18, 0.12)" : "transparent",
              }}
            >
              <Icon
                size={20}
                color={isActive ? "#F39C12" : "#95A5A6"}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#F39C12" : "#95A5A6",
                letterSpacing: "0.02em",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
