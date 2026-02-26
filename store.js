import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles/layout.css";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} />

      <div className="main-wrapper">
        {/* TOP BAR */}
        <div className="topbar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* ✅ THIS IS CRITICAL */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}