import { useState } from "react";
import Sidebar from "./Sidebar";
import "../../styles/layout.css";

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className={`app-shell ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
      
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} />

      {/* RIGHT SIDE */}
      <div className="main-wrapper">
        
        {/* ✅ ONLY TOGGLE BUTTON (single source) */}
        <div className="topbar">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* PAGE CONTENT */}
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}