i am sharing my app.css so give me updated one by incluing step 2 ,
  and also resolve if any errors are there
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #ffffff;
  color: black;
}

.app {
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #babcbf2a;
  padding: 20px;
  min-height: 100vh;
}

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

.stats-bar {
  margin: 10px;
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 10px;
  background: #ffffff;
  font-weight: 500;
}

.tracker-layout {
  display: flex;
  gap: 12px;
  padding: 10px;
  align-items: stretch;
}

.tracker-container{
  text-align: center;
}

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

/* .dashboard-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: #244258;
  margin-bottom: 30px;
} */

.dashboard-container{
  text-align: center;
}

.vehicle-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  border-radius: 6px;
  overflow: hidden;
}

.vehicle-table th,
.vehicle-table td {
  padding: 12px 16px;
  text-align: left;
}

.vehicle-table thead {
  background-color: #244258;
  color: #ffff;
}

.vehicle-table tr:nth-child(even) {
  background-color: #f2f6fa;
}


.vehicle-table button {
  background-color: #ded6d6fc;
  color: #244258;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.vehicle-table button:hover {
  background-color: #244258;
  color: white;
}
