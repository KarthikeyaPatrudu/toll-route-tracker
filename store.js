/* ===============================
   GLOBAL
================================ */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #ffffff;
  color: #111827;
}

/* ===============================
   APP WRAPPER
================================ */

.app {
  text-align: center;
  background-color: #babcbf2a;
  padding: 20px;
  min-height: 100vh;
}

/* ===============================
   SEARCH PANEL
================================ */

.search-panel {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.search-panel button {
  height: 40px;
  padding: 0 16px;
  font-size: 13px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}

.search-panel button:hover {
  background: #04133a;
}

/* ===============================
   STATS BAR
================================ */

.stats-bar {
  margin: 10px;
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 10px;
  background: #ffffff;
  font-weight: 500;
}

/* ===============================
   TRACKER LAYOUT
================================ */

.tracker-layout {
  display: flex;
  gap: 12px;
  padding: 10px;
  align-items: stretch;
}

.tracker-container {
  text-align: center;
}

/* ===============================
   MAP
================================ */

.map-container {
  height: calc(100vh - 180px);
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  overflow: hidden;
}

.marker-number {
  background: #1d4ed8;
  color: #ffffff;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
}

.leaflet-div-icon {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* ===============================
   EXCLUDED PANEL
================================ */

.excluded-panel {
  text-align: center;
  width: 280px;
  min-width: 260px;
  max-height: calc(100vh - 180px);
  padding: 12px;
  border-left: 1px solid #e5e7eb;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 8px;
}

.excluded-item {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.excluded-item:hover {
  background: #f1f5f9;
}

/* ===============================
   OLD DASHBOARD (kept for safety)
================================ */

.dashboard-container {
  text-align: center;
}

/* ===============================
   🔥 NEW FLEET DASHBOARD UI
================================ */

.fleet-wrapper {
  padding: 24px;
  background: #f3f4f6;
  min-height: calc(100vh - 60px);
}

.fleet-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

/* header */

.fleet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.fleet-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

/* refresh button */

.refresh-btn {
  background: #6366f1;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
}

.refresh-btn:hover {
  background: #4f46e5;
}

/* table */

.fleet-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.fleet-table thead {
  background: #f9fafb;
}

.fleet-table th {
  text-align: left;
  padding: 12px;
  color: #6b7280;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.fleet-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #111827;
}

.vehicle-id {
  font-weight: 600;
  color: #374151;
}

/* status badges */

.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.moving {
  background: #dcfce7;
  color: #166534;
}

.status-badge.stopped {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.idle {
  background: #e5e7eb;
  color: #374151;
}

/* view route button */

.view-route-btn {
  background: #e5e7eb;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

.view-route-btn:hover {
  background: #d1d5db;
}