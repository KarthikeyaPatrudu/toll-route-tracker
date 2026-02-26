
.app-shell {
  display: flex;
  height: 100vh;
  background: #f5f7fb;
}

/* SIDEBAR */
.sidebar {
  width: 240px;
  background: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.sidebar-logo {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.nav-item {
  padding: 10px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: #cbd5e1;
  font-size: 14px;
  cursor: pointer;
}

.nav-item:hover {
  background: #1e293b;
  color: white;
}

.nav-item.active {
  background: #1e293b;
  color: white;
}

.nav-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* LOGOUT */
.logout-btn {
  margin-top: auto;
  background: transparent;
  border: 1px solid #334155;
  color: white;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}

/* MAIN */
.main-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}