/* ===============================
   SIDEBAR
================================ */

.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #0f172a, #1e293b);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px 14px;
  transition: width 0.25s ease;
}

/* COLLAPSED STATE */

.sidebar.collapsed {
  width: 72px;
}

/* LOGO ROW */

.logo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.logo {
  font-size: 18px;
  font-weight: 700;
}

/* COLLAPSE BUTTON */

.collapse-btn {
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 18px;
}

/* NAV */

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* NAV ITEM */

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.18s ease;
}

/* ICON SIZE */

.nav-item svg {
  font-size: 18px;
  min-width: 18px;
}

/* hover */

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

/* ACTIVE */

.nav-item.active {
  background: #2563eb;
  color: white;
  font-weight: 600;
}

/* disabled */

.nav-item.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ===============================
   LOGOUT
================================ */

.logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.18s ease;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}