why the .stat-card transition animation not working solve the issue
.app-shell {
  display: flex;
  height: 100vh;
  background: #f5f7fb;
}

/* SIDEBAR */
/* .sidebar {
  width: 240px;
  background: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
} */
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

.sidebar.collapsed {
  width: 72px;
}
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

.collapse-btn {
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 18px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
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

/* .nav-item {
  padding: 10px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: #cbd5e1;
  font-size: 14px;
  cursor: pointer;
} */
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

.nav-item svg {
  font-size: 18px;
  min-width: 18px;
}

/* .nav-item:hover {
  background: #1e293b;
  color: white;
} */
 .nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

/* .nav-item.active {
  background: #1e293b;
  color: white;
} */
 .nav-item.active {
  background: #2563eb;
  color: white;
  font-weight: 600;
}

/* .nav-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
} */
 .nav-item.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* LOGOUT */
/* .logout-btn {
  margin-top: auto;
  background: transparent;
  border: 1px solid #334155;
  color: white;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
} */
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

/* MAIN */
.main-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}


.page-title {
  font-size: 32px;
  font-weight: 600;
}

h1.page-title{
  font-size: 32px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 8px 0;
}

h2{
  font-size: 32px;
  font-weight: 700;
}
.stat-label{
  font-size: 14px;
  color: #718096;
    font-weight: 500;
}

.page-subtitle {
  /* color: #64748b; */
  color: #718096;
  margin-bottom: 20px;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  /* transition: transform 0.2s, box-shadow 0.2s; */
  transition: transform 0.2s, box-shadow 0.2s;
    transition-behavior: normal, normal;
    transition-duration: 0.2s, 0.2s;
    transition-timing-function: ease, ease;
    transition-delay: 0s, 0s;
    transition-property: transform, box-shadow
}

.fleet-card {
  background: rgb(131, 64, 64);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.fleet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.refresh-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
}

