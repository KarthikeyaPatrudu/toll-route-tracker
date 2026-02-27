<div className="logo-row">
  <div className="logo-left">
    <img src={caricon} alt="TeleMetrics" className="brand-icon" />
    {!collapsed && <div className="logo">TeleMetrics</div>}
  </div>

  <button className="collapse-btn" onClick={toggleSidebar}>
    {collapsed ? <FiMenu /> : <FiX />}
  </button>
</div>