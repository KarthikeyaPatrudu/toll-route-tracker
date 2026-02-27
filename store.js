now forget about the realmaptestdata.jsx task now we will come back to our main project .
if you see the imgs i want   vehicle fleet table below live location Map div in Dashboard Overview page .
  help me in doing it . and i am pasting the img code also. and this is a sample table for UI testing so add more exaple values

   {/* Vehicles Table */}
          <div className="vehicles-section">
            <div className="section-header">
              <h2 className="section-title">Vehicle Fleet</h2>
              <button className="refresh-btn">
                <Activity size={16} />
                Refresh
              </button>
            </div>

            <div className="table-container">
              <table className="vehicles-table">
                <thead>
                  <tr>
                    <th>Vehicle ID</th>
                    <th>Name</th>
                    <th>Driver</th>
                    <th>Location</th>
                    <th>Speed</th>
                    <th>Status</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclesData.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="vehicle-id">{vehicle.id}</td>
                      <td className="vehicle-name">
                        <Car size={16} className="table-icon" />
                        {vehicle.name}
                      </td>
                      <td>{vehicle.driver}</td>
                      <td className="location-cell">
                        <Navigation size={14} className="table-icon" />
                        {vehicle.lat.toFixed(4)}, {vehicle.lng.toFixed(4)}
                      </td>
                      <td>{vehicle.speed} km/h</td>
                      <td>
                        <span
                          className={`status-badge status-${vehicle.status}`}
                        >
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="last-update">
                        <Clock size={14} className="table-icon" />
                        {vehicle.lastUpdate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
