/* ===============================
   APP SHELL
================================ */

.app-shell {
  display: flex;
  height: 100vh;
  background: #f8fafc;
}

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
  padding: 20px 16px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
}

/* NAV */

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  padding: 10px 14px;
  border-radius: 8px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.18s ease;
}

/* hover */

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

/* ACTIVE LINK */

.nav-item.active {
  background: #2563eb;
  color: white;
  font-weight: 600;
}

/* disabled items */

.nav-item.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ===============================
   LOGOUT
================================ */

.logout-btn {
  width: 100%;
  padding: 10px;
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

/* ===============================
   MAIN CONTENT
================================ */

.main-content {
  flex: 1;
  padding: 24px 28px;
  overflow: auto;
}