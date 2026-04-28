import { createBrowserRouter, Navigate } from "react-router";
import { AuthScreen } from "./components/AuthScreen";
import { Layout } from "./components/Layout";
import { TrackingScreen } from "./components/TrackingScreen";
import { StoreScreen } from "./components/StoreScreen";
import { ConfirmationScreen } from "./components/ConfirmationScreen";

function RedirectToPedidos() {
  return <Navigate to="/app/pedidos" replace />;
}

function RedirectToHome() {
  return <Navigate to="/" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthScreen,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: RedirectToPedidos },
      { path: "pedidos", Component: TrackingScreen },
      { path: "tienda", Component: StoreScreen },
    ],
  },
  {
    path: "/confirmacion",
    Component: ConfirmationScreen,
  },
  {
    path: "*",
    Component: RedirectToHome,
  },
]);