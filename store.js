
export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard Overview</h1>
      <p className="page-subtitle">
        Real-time vehicle tracking and fleet analytics
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Vehicles</span>
          <h2>24</h2>
        </div>

        <div className="stat-card">
          <span>Active Now</span>
          <h2>18</h2>
        </div>

        <div className="stat-card">
          <span>Stopped</span>
          <h2>4</h2>
        </div>

        <div className="stat-card">
          <span>Idle</span>
          <h2>2</h2>
        </div>
      </div>
    </div>
  );
}