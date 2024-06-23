import User from "../components/auth/user";
import Sidebar from "../components/sidebar";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const path = location.pathname.split("/");
  const pageTitle = path[path.length - 1] || "Dashboard";

  return (
    <main className="flex h-screen overflow-hidden items-start bg-primary-foreground">
      <Sidebar />
      <div className="flex-1 p-5 mx-5 overflow-y-auto">
        <div className="flex items-center justify-between py-5">
          <h1 className="text-2xl capitalize">{pageTitle}</h1>
          <User />
        </div>
        <div className=" h-full">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Layout;
