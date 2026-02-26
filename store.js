import { useState } from "react";
import Sidebar from "./Sidebar";
import "../../styles/app.css";

export default function AppShell({ children }) {
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

        {/* PAGE CONTENT */}
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}