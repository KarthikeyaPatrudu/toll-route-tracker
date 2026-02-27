/* ========================================
   LIVE MAP SECTION (ENTERPRISE)
======================================== */

.map-section {
  margin-top: 28px;
  background: white;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

/* header */

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
}

/* legend */

.map-legend {
  display: flex;
  gap: 18px;
  font-size: 13px;
  color: #64748b;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* ========================================
   MAP CARD
======================================== */

.map-container {
  background: #eef2ff;
  border-radius: 12px;
  height: 260px;
  position: relative;
  overflow: hidden;
}

/* placeholder center */

.map-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
}

.map-icon {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  color: #6366f1;
}

.map-text {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translateX(-50%);
  font-weight: 600;
  color: #6366f1;
}

.map-subtext {
  position: absolute;
  left: 50%;
  top: 65%;
  transform: translateX(-50%);
  font-size: 13px;
  color: #94a3b8;
}

/* ========================================
   VEHICLE DOTS
======================================== */

.vehicle-markers {
  position: absolute;
  inset: 0;
}

.vehicle-marker {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
}

/* states */

.vehicle-marker.moving {
  background: #48bb78;
}

.vehicle-marker.stopped {
  background: #ed8936;
}

.vehicle-marker.idle {
  background: #cbd5e0;
}