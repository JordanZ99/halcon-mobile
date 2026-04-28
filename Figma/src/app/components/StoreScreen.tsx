import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingCart, Plus, CheckCircle2, Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const BLOCK_IMG =
  "https://images.unsplash.com/photo-1762608675319-6f2116b4c8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBjb25jcmV0ZSUyMGJsb2Nrc3xlbnwxfHx8fDE3NzY3NDMwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const BRICK_IMG =
  "https://images.unsplash.com/photo-1744540728562-86db0f7439af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBicmljayUyMHdhbGwlMjBjb25zdHJ1Y3Rpb24lMjBidWlsZGluZ3xlbnwxfHx8fDE3NzY3NDMwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CEMENT_IMG =
  "https://images.unsplash.com/photo-1763479168547-40aa39986687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW1lbnQlMjBiYWclMjBjb25zdHJ1Y3Rpb24lMjBpbmR1c3RyaWFsfGVufDF8fHx8MTc3Njc0MzA3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const REBAR_IMG =
  "https://images.unsplash.com/photo-1763771420551-18bc44399f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHJlYmFyJTIwY29uc3RydWN0aW9uJTIwbWV0YWx8ZW58MXx8fHwxNzc2NzQzMDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface Product {
  id: string;
  name: string;
  unit: string;
  price: string;
  image: string;
  sku: string;
}

const products: Product[] = [
  {
    id: "block",
    name: "Block",
    unit: "por millar",
    price: "$1,850.00",
    image: BLOCK_IMG,
    sku: "MAT-BLK-001",
  },
  {
    id: "ladrillo",
    name: "Ladrillo",
    unit: "por millar",
    price: "$2,100.00",
    image: BRICK_IMG,
    sku: "MAT-LDR-002",
  },
  {
    id: "cemento",
    name: "Cemento",
    unit: "por saco 50kg",
    price: "$245.00",
    image: CEMENT_IMG,
    sku: "MAT-CEM-003",
  },
  {
    id: "varilla",
    name: "Varilla",
    unit: "por tonelada",
    price: "$18,500.00",
    image: REBAR_IMG,
    sku: "MAT-VAR-004",
  },
];

export function StoreScreen() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Set<string>>(new Set());
  const cartCount = cartItems.size;

  const handleAgregar = (productId: string) => {
    setCartItems((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleSolicitar = () => {
    const selectedProducts = products.filter((p) => cartItems.has(p.id));
    const orderNumber = `HAL-${Math.floor(Math.random() * 9000) + 1000}`;
    navigate("/confirmacion", {
      state: {
        orderNumber,
        items: selectedProducts.map((p) => ({
          name: p.name,
          unit: p.unit,
          price: p.price,
        })),
        itemCount: selectedProducts.length,
      },
    });
  };

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(844px - 72px)" }}>
      {/* Header */}
      <div
        className="px-5 pt-14 pb-5"
        style={{ background: "#2C3E50" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p style={{ color: "#7F8C8D", fontSize: "12px", letterSpacing: "0.08em", marginBottom: "4px" }}>
              TIENDA
            </p>
            <h1 style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: 700 }}>
              Compra Rapida
            </h1>
          </div>
          {/* Cart Badge */}
          <div className="relative">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: "44px", height: "44px", background: "rgba(255,255,255,0.1)" }}
            >
              <ShoppingCart size={20} color="#F39C12" />
            </div>
            {cartCount > 0 && (
              <div
                className="absolute -top-1 -right-1 flex items-center justify-center rounded-full"
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#F39C12",
                  border: "2px solid #2C3E50",
                }}
              >
                <span style={{ color: "#2C3E50", fontSize: "10px", fontWeight: 700 }}>
                  {cartCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div
          className="mt-4 flex items-center gap-3 rounded-xl px-4"
          style={{ background: "rgba(255,255,255,0.1)", height: "44px" }}
        >
          <Search size={16} color="#7F8C8D" />
          <span style={{ color: "#7F8C8D", fontSize: "14px" }}>Buscar material...</span>
        </div>
      </div>

      {/* Products grid */}
      <div className="px-5 py-5 flex-1">
        <div className="flex items-center justify-between mb-4">
          <p style={{ color: "#2C3E50", fontSize: "14px", fontWeight: 700, letterSpacing: "0.04em" }}>
            MATERIALES DESTACADOS
          </p>
          <span style={{ color: "#95A5A6", fontSize: "12px" }}>4 productos</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => {
            const isAdded = cartItems.has(product.id);
            return (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                  transition: "transform 0.15s",
                }}
              >
                {/* Product image */}
                <div className="relative" style={{ height: "110px", overflow: "hidden" }}>
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* SKU overlay */}
                  <div
                    className="absolute top-2 left-2 rounded-full px-2 py-0.5"
                    style={{ background: "rgba(44,62,80,0.75)" }}
                  >
                    <span style={{ color: "#FFFFFF", fontSize: "9px", letterSpacing: "0.05em" }}>
                      {product.sku}
                    </span>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-3 flex flex-col flex-1">
                  <p style={{ color: "#2C3E50", fontSize: "15px", fontWeight: 700 }}>
                    {product.name}
                  </p>
                  <p style={{ color: "#95A5A6", fontSize: "11px", marginTop: "2px" }}>
                    {product.unit}
                  </p>

                  {/* Price */}
                  <p
                    style={{
                      color: "#F39C12",
                      fontSize: "16px",
                      fontWeight: 700,
                      marginTop: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    {product.price}
                  </p>

                  {/* Agregar button */}
                  <button
                    onClick={() => handleAgregar(product.id)}
                    className="flex items-center justify-center gap-1.5 rounded-xl w-full"
                    style={{
                      height: "36px",
                      background: isAdded ? "#27AE60" : "#2C3E50",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 size={14} color="#FFFFFF" />
                        <span style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: 600 }}>
                          Agregado
                        </span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} color="#F39C12" />
                        <span style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: 600 }}>
                          Agregar
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {cartCount > 0 && (
          <button
            className="mt-5 w-full flex items-center justify-between rounded-2xl px-5"
            style={{
              height: "56px",
              background: "#F39C12",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(243,156,18,0.35)",
            }}
            onClick={handleSolicitar}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center rounded-lg"
                style={{ width: "32px", height: "32px", background: "rgba(44,62,80,0.15)" }}
              >
                <ShoppingCart size={16} color="#2C3E50" />
              </div>
              <span style={{ color: "#2C3E50", fontSize: "14px", fontWeight: 700 }}>
                {cartCount} {cartCount === 1 ? "producto" : "productos"} en carrito
              </span>
            </div>
            <span style={{ color: "#2C3E50", fontSize: "14px", fontWeight: 700 }}>
              Solicitar
            </span>
          </button>
        )}
      </div>
    </div>
  );
}