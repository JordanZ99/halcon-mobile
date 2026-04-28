import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#E8EAED" }}>
      <div
        className="relative overflow-hidden"
        style={{
          width: "390px",
          height: "844px",
          borderRadius: "40px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.15)",
          background: "#F5F6FA",
        }}
      >
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
