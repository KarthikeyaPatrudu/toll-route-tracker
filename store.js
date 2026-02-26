/* wrapper */

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* topbar */

.topbar {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

/* toggle button */

.menu-toggle {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}

/* collapsed sidebar */

.sidebar.collapsed {
  width: 72px;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
}