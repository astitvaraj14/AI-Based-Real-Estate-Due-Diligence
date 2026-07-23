import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        <Header />

        <main className="flex-1 overflow-y-auto">

          {/* Background */}
          <div className="min-h-full bg-slate-50">

            {/* Content */}
            <div className="mx-auto w-full max-w-7xl px-8 py-8 lg:px-10">
              <Outlet />
            </div>

          </div>

        </main>

      </div>

    </div>
  );
}