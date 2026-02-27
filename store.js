import "../../styles/app.css";

export default function DashboardPage() {
  return (
    <div>
      {/* ===== PAGE HEADER ===== */}
      <h1 className="page-title">Dashboard Overview</h1>
      <p className="page-subtitle">
        Real-time vehicle tracking and fleet analytics
      </p>

      {/* ===== STATS GRID ===== */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Vehicles</div>
          <div className="stat-value">24</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Now</div>
          <div className="stat-value success">18</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Stopped</div>
          <div className="stat-value danger">4</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Idle</div>
          <div className="stat-value muted">2</div>
        </div>
      </div>

      {/* ✅ ===== LIVE LOCATION MAP SECTION ===== */}
      <div className="map-section">
        <div className="section-header">
          <h2 className="section-title">Live Location Map</h2>

          <div className="map-legend">
            <span className="legend-item">
              <span
                className="legend-dot"
                style={{ background: "#48bb78" }}
              ></span>
              Moving
            </span>

            <span className="legend-item">
              <span
                className="legend-dot"
                style={{ background: "#ed8936" }}
              ></span>
              Stopped
            </span>

            <span className="legend-item">
              <span
                className="legend-dot"
                style={{ background: "#cbd5e0" }}
              ></span>
              Idle
            </span>
          </div>
        </div>

        {/* MAP CARD */}
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-icon">📍</div>
            <p className="map-text">Interactive Map View</p>
            <p className="map-subtext">Showing 5 vehicle locations</p>

            {/* Fake vehicle dots */}
            <div className="vehicle-markers">
              <div
                className="vehicle-marker moving"
                style={{ left: "20%", top: "30%" }}
              />
              <div
                className="vehicle-marker stopped"
                style={{ left: "35%", top: "50%" }}
              />
              <div
                className="vehicle-marker moving"
                style={{ left: "50%", top: "70%" }}
              />
              <div
                className="vehicle-marker moving"
                style={{ left: "65%", top: "30%" }}
              />
              <div
                className="vehicle-marker idle"
                style={{ left: "80%", top: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}