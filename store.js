/* ===== Vehicles Section ===== */
.vehicles-section {
  margin-top: 24px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.table-container {
  overflow-x: auto;
}

.vehicles-table {
  width: 100%;
  border-collapse: collapse;
}

.vehicles-table th {
  text-align: left;
  padding: 12px;
  font-size: 13px;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
}

.vehicles-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}

.vehicle-name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.location-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.last-update {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ===== Status badges ===== */
.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.status-moving {
  background: #dcfce7;
  color: #16a34a;
}

.status-idle {
  background: #fef3c7;
  color: #d97706;
}

.status-stopped {
  background: #fee2e2;
  color: #dc2626;
}