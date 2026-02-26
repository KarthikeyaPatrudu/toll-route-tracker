/* wrapper beside sidebar */

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ===============================
   TOP BAR
================================ */

.topbar {
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

/* toggle button */

.menu-toggle {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

/* ===============================
   SIDEBAR COLLAPSE
================================ */

.sidebar {
  width: 240px;
  transition: width 0.25s ease;
}

.sidebar.collapsed {
  width: 72px;
}

/* hide text when collapsed */

.sidebar.collapsed .logo,
.sidebar.collapsed .nav-item {
  font-size: 0;
}

.sidebar.collapsed .nav-item::before {
  font-size: 18px;
}