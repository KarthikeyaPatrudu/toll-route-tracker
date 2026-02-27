<div className="logo-row">
  <div className="logo-left">
    <img src={caricon} alt="TeleMetrics" className="brand-icon" />
    {!collapsed && <div className="logo">TeleMetrics</div>}
  </div>

  <button className="collapse-btn" onClick={toggleSidebar}>
    {collapsed ? <FiMenu /> : <FiX />}
  </button>
</div>

/* ===== BRAND ROW ===== */
.logo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.logo-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* your imported image */
.brand-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

/* text */
.logo {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

/* collapse button */
.collapse-btn {
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
}