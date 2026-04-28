import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="relative h-full flex flex-col" style={{ background: "#F5F6FA" }}>
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "72px" }}>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
