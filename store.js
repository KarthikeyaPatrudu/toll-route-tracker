i want change the truck logo beside the Telemetrics i want add a icon which i alrady imported i comment outed it you can check in the code help me in removing the truck icon and adding this img and collapse feature should work also

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";
// import caricon from "../../assets/CHOLAFIN.NS.png";

import {
  FiGrid,
  FiTruck,
  FiMapPin,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* ===== TOP ===== */}
      <div>
        <div className="logo-row">
          {/* <img src={caricon} alt="Car Icon" className="car-icon" /> */}
          {!collapsed && <div className="logo"> TeleMetrics</div>}

          <button className="collapse-btn" onClick={toggleSidebar}>
            {collapsed ? <FiMenu /> : <FiX />}
          </button>
        </div>

        {/* NAV */}
        <nav className="nav-menu">
          <NavLink to="/dashboard" className="nav-item">
            <FiGrid />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          <NavLink to="/vehicles" className="nav-item">
            <FiTruck />
            {!collapsed && <span>Vehicles</span>}
          </NavLink>

          <div className="nav-item disabled">
            <FiMapPin />
            {!collapsed && <span>Live Tracking</span>}
          </div>

          <div className="nav-item disabled">
            <FiFileText />
            {!collapsed && <span>Reports</span>}
          </div>

          <div className="nav-item disabled">
            <FiBarChart2 />
            {!collapsed && <span>Analytics</span>}
          </div>

          <div className="nav-item disabled">
            <FiSettings />
            {!collapsed && <span>Settings</span>}
          </div>
        </nav>
      </div>

      {/* ===== LOGOUT ===== */}
      <button className="logout-btn" onClick={handleLogout}>
        <FiLogOut />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}
