import TopNav from "./TopNav";
import SiteFooter from "./SiteFooter";
import { Outlet } from "react-router-dom";

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
