import React from "react";
import { createRoot } from "react-dom/client";
import "../app/globals.css";
import { ModeBanner } from "../components/mode-banner";
import { Sidebar } from "../components/sidebar";
import { RightSidebar } from "../components/right-sidebar";
import LoginPage from "../app/page";
import SetupPage from "../app/setup/page";

const routes: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "/dashboard": React.lazy(() => import("../app/dashboard/page")),
  "/pos": React.lazy(() => import("../app/pos/page")),
  "/attendance": React.lazy(() => import("../app/attendance/page")),
  "/audit-logs": React.lazy(() => import("../app/audit-logs/page")),
  "/backups": React.lazy(() => import("../app/backups/page")),
  "/bookings": React.lazy(() => import("../app/bookings/page")),
  "/cash-drawer": React.lazy(() => import("../app/cash-drawer/page")),
  "/commissions": React.lazy(() => import("../app/commissions/page")),
  "/customer-records": React.lazy(() => import("../app/customer-records/page")),
  "/customers": React.lazy(() => import("../app/customers/page")),
  "/expenses": React.lazy(() => import("../app/expenses/page")),
  "/inventory": React.lazy(() => import("../app/inventory/page")),
  "/leave": React.lazy(() => import("../app/leave/page")),
  "/loyalty": React.lazy(() => import("../app/loyalty/page")),
  "/memberships": React.lazy(() => import("../app/memberships/page")),
  "/notifications": React.lazy(() => import("../app/notifications/page")),
  "/packages": React.lazy(() => import("../app/packages/page")),
  "/promotions": React.lazy(() => import("../app/promotions/page")),
  "/purchase-orders": React.lazy(() => import("../app/purchase-orders/page")),
  "/reports": React.lazy(() => import("../app/reports/page")),
  "/services": React.lazy(() => import("../app/services/page")),
  "/settings": React.lazy(() => import("../app/settings/page")),
  "/staff": React.lazy(() => import("../app/staff/page")),
  "/suppliers": React.lazy(() => import("../app/suppliers/page")),
  "/transactions": React.lazy(() => import("../app/transactions/page")),
  "/users": React.lazy(() => import("../app/users/page")),
  "/vouchers": React.lazy(() => import("../app/vouchers/page")),
};

function App() {
  const [pathname, setPathname] = React.useState(window.location.pathname);
  const [rightOpen, setRightOpen] = React.useState(true);
  React.useEffect(() => { const update = () => setPathname(window.location.pathname); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  const Page = routes[pathname];
  const isPublic = pathname === "/" || pathname === "/setup";
  return <div className="min-h-screen bg-slate-50">
    <ModeBanner />
    {isPublic ? <main className="min-h-screen"><React.Suspense fallback={null}>{pathname === "/setup" ? <SetupPage /> : <LoginPage />}</React.Suspense></main> : <><Sidebar /><div className="flex h-screen lg:pl-[245px]"><main className="app-scroll min-w-0 flex-1 min-h-0 overflow-y-auto"><React.Suspense fallback={<div className="p-8">Loading…</div>}>{Page ? <Page /> : <LoginPage />}</React.Suspense></main><RightSidebar open={rightOpen && pathname !== "/pos"} onClose={() => setRightOpen(false)} /></div></>}
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
