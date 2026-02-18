App.jsx:
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleDashboard from "../features/vehicle/VehicleDashboard";
import TrackerPage from "../pages/TrackerPage";
import "../styles/app.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VehicleDashboard />} />

        <Route path="/tracker" element={<TrackerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
main.jsx:
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <App />
  </LocalizationProvider>
  </Provider>
);
store.js:
import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "../features/route/routeSlice";
import vehicleReducer from "../features/vehicle/vehicleSlice";
import trackerReducer from "../features/tracker/trackerSlice"

export const store = configureStore({
  reducer: {
    route: routeReducer,
    vehicle: vehicleReducer,
    tracker: trackerReducer
  },
});

MapView.jsx:
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export default function MapView({ points, onRouteCalculated }) {
  const mapRef = useRef(null);
  const routingRef = useRef(null);
  const markersRef = useRef([]);
  const routeLayersRef = useRef([]);

  /* =========================
     INIT MAP ONLY ONCE
  ========================= */
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "© OpenStreetMap contributors" }
      ).addTo(mapRef.current);
    }
  }, []);

  /* =========================
     ROUTE DRAWING
  ========================= */
  useEffect(() => {
    if (!mapRef.current || !Array.isArray(points)) return;

    const map = mapRef.current;

    // CLEAR OLD ROUTE
    if (routingRef.current) {
      map.removeControl(routingRef.current);
      routingRef.current = null;
    }

    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    routeLayersRef.current.forEach(l => map.removeLayer(l));
    routeLayersRef.current = [];

    /* =========================
       VALID + SORTED POINTS
    ========================= */
    const sorted = points
      .filter(
        p =>
          p.lat !== undefined &&
          p.lng !== undefined &&
          p.timestamp
      )
      .map(p => ({
        ...p,
        lat: Number(p.lat),
        lng: Number(p.lng)
      }))
      .sort(
        (a, b) =>
          new Date(a.timestamp) - new Date(b.timestamp)
      );

    if (sorted.length === 0) return;

    const latlngs = sorted.map(p => [p.lat, p.lng]);

    /* =========================
       SINGLE POINT
    ========================= */
    if (latlngs.length === 1) {
      const marker = L.marker(latlngs[0])
        .addTo(map)
        .bindPopup(sorted[0].tollPlazaName);

      markersRef.current.push(marker);

      map.flyTo(latlngs[0], 13);
      onRouteCalculated?.(0, 0);
      return;
    }

    /* =========================
       GROUP SAME LOCATION TOLLS
    ========================= */
    const grouped = {};

    sorted.forEach((p, i) => {
      const key = `${p.lat.toFixed(5)},${p.lng.toFixed(5)}`;

      if (!grouped[key]) grouped[key] = [];

      grouped[key].push({ ...p, stop: i + 1 });
    });

    Object.values(grouped).forEach((group, index) => {
      const popupHtml = `
        <b>${group[0].tollPlazaName}</b><br/>
        ${group
          .map(
            g => `
            Stop: ${g.stop}<br/>
            Time: ${new Date(g.timestamp).toLocaleTimeString()}<br/>
            Date: ${new Date(g.timestamp).toLocaleDateString()}<hr/>
          `
          )
          .join("")}
      `;

      const icon = L.divIcon({
        html: `<div class="marker-number">${index + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        className: ""
      });

      const marker = L.marker(
        [group[0].lat, group[0].lng],
        { icon }
      )
        .addTo(map)
        .bindPopup(popupHtml);

      markersRef.current.push(marker);
    });

    /* =========================
       REAL ROAD ROUTE
    ========================= */
    routingRef.current = L.Routing.control({
      waypoints: latlngs.map(p => L.latLng(p[0], p[1])),
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: { styles: [{ opacity: 0 }] }
    })
      .on("routesfound", e => {
        const route = e.routes[0];
        const coords = route.coordinates;

        const totalKm =
          route.summary.totalDistance / 1000;

        const totalHours =
          (new Date(sorted.at(-1).timestamp) -
            new Date(sorted[0].timestamp)) /
          (1000 * 60 * 60);

        const totalAvg =
          totalHours > 0 ? totalKm / totalHours : 0;

        function nearestIndex(coords, lat, lng) {
          let min = Infinity;
          let idx = 0;

          coords.forEach((c, i) => {
            const d =
              (c.lat - lat) ** 2 +
              (c.lng - lng) ** 2;

            if (d < min) {
              min = d;
              idx = i;
            }
          });

          return idx;
        }

        /* SEGMENT COLORING */
        for (let i = 0; i < sorted.length - 1; i++) {
          const s = nearestIndex(
            coords,
            sorted[i].lat,
            sorted[i].lng
          );

          const eIdx = nearestIndex(
            coords,
            sorted[i + 1].lat,
            sorted[i + 1].lng
          );

          const segment = coords
            .slice(Math.min(s, eIdx), Math.max(s, eIdx))
            .map(c => [c.lat, c.lng]);

          if (segment.length < 2) continue;

          const poly = L.polyline(segment, {
            color: totalAvg > 40 ? "orange" : "#2563eb",
            weight: 5
          }).addTo(map);

          routeLayersRef.current.push(poly);
        }

        map.fitBounds(L.latLngBounds(latlngs), {
          padding: [50, 50]
        });

        onRouteCalculated?.(totalKm, totalAvg);
      })
      .addTo(map);
  }, [points, onRouteCalculated]);

  return <div id="map" className="map-container" />;
}
ExcludedPanel.jsx:
export default function ExcludedPanel({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="excluded-panel">
        <h3>Excluded Tolls</h3>
        <p>No excluded tolls</p>
      </div>
    );
  }

  const sorted = [...items].sort(
    (a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
  );

  return (
    <div className="excluded-panel">
      <h3>Excluded Tolls</h3>

      <ul>
        {sorted.map((toll, i) => (
          <li key={i} className="excluded-item">
            <b>{toll.tollPlazaName}</b>
            <br />
            {toll.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

routeService.js:
export async function getRoute({
  vehicle,
  fromDate,
  fromTime,
  toDate,
  toTime
}) {

  const params = new URLSearchParams({
    vehicle,
    fromDate,
    fromTime,
    toDate,
    toTime,
  });

  const res = await fetch(
    `http://localhost:5000/route?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch route");
  }

  return res.json();
}

routeSlice.js:
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  included: [],
  excluded: [],
  distance: 0,
  avgSpeed: 0,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRouteData: (state, action) => {
      state.included = action.payload.included;
      state.excluded = action.payload.excluded;
    },
    setRouteStats: (state, action) => {
      state.distance = action.payload.distance;
      state.avgSpeed = action.payload.avgSpeed;
    },
    clearRoute: (state) => {
      state.included = [];
      state.excluded = [];
      state.distance = 0;
      state.avgSpeed = 0;
    },
  },
});

export const { setRouteData, setRouteStats, clearRoute } =
  routeSlice.actions;

export default routeSlice.reducer;

SearchPanel.jsx:
import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function SearchPanel({ onSearch }) {

  const selectedVehicle = useSelector(
    (state) => state.tracker.selectedVehicle
  );

  const [vehicle, setVehicle] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  /* ===============================
     AUTO LOAD WHEN VEHICLE CHANGES
  =============================== */
  useEffect(() => {
    if (!selectedVehicle) return;

    const today = dayjs();

    const startDay = today.startOf("day");
    const endDay = today.endOf("day");

    setVehicle(selectedVehicle);
    setFromDate(startDay);
    setToDate(endDay);
    setFromTime(startDay);
    setToTime(endDay);

  }, [selectedVehicle]);

  /* ===============================
     AUTO SEARCH WHEN READY
  =============================== */
  useEffect(() => {
    if (
      !vehicle ||
      !fromDate ||
      !toDate ||
      !fromTime ||
      !toTime
    ) return;

    onSearch({
      vehicle: vehicle.toUpperCase(),
      fromDate: fromDate.format("YYYY-MM-DD"),
      fromTime: fromTime.format("HH:mm"),
      toDate: toDate.format("YYYY-MM-DD"),
      toTime: toTime.format("HH:mm")
    });

  }, [vehicle, fromDate, fromTime, toDate, toTime]);

  /* ===============================
     MANUAL SEARCH
  =============================== */
  const handleSearch = () => {

    if (!vehicle || !fromDate || !toDate || !fromTime || !toTime) {
      alert("Please fill all fields");
      return;
    }

    if (fromDate.isAfter(toDate)) {
      alert("To Date cannot be before From Date");
      return;
    }

    if (fromDate.isSame(toDate, "day") && toTime.isBefore(fromTime)) {
      alert("To Time must be after From Time");
      return;
    }

    onSearch({
      vehicle: vehicle.toUpperCase(),
      fromDate: fromDate.format("YYYY-MM-DD"),
      fromTime: fromTime.format("HH:mm"),
      toDate: toDate.format("YYYY-MM-DD"),
      toTime: toTime.format("HH:mm")
    });
  };

  const isSameDay =
    fromDate && toDate && fromDate.isSame(toDate, "day");

  return (
    <Box className="search-panel">

      <TextField
        label="Vehicle Number"
        size="small"
        value={vehicle}
        onChange={(e) =>
          setVehicle(e.target.value.toUpperCase())
        }
      />

      <DatePicker
        label="From Date"
        value={fromDate}
        onChange={setFromDate}
        slotProps={{ textField: { size: "small" } }}
      />

      <TimePicker
        label="From Time"
        value={fromTime}
        onChange={setFromTime}
        format="hh:mm A"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
        }}
        slotProps={{ textField: { size: "small" } }}
      />

      <DatePicker
        label="To Date"
        value={toDate}
        minDate={fromDate}
        onChange={setToDate}
        slotProps={{ textField: { size: "small" } }}
      />

      <TimePicker
        label="To Time"
        value={toTime}
        minTime={isSameDay ? fromTime : null}
        onChange={setToTime}
        format="hh:mm A"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
        }}
        slotProps={{ textField: { size: "small" } }}
      />

      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

    </Box>
  );
}
trackerSlice.js:
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedVehicle: null,

  // route data
  includedPoints: [],
  excludedPoints: [],

  // stats
  totalDistance: 0,
  avgSpeed: 0,

  // filter
  filters: {
    fromDate: null,
    fromTime: null,
    toDate: null,
    toTime: null
  },

  loading: false
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState,

  reducers: {
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },

    setRouteData: (state, action) => {
      state.includedPoints = action.payload.included;
      state.excludedPoints = action.payload.excluded;
    },

    setRouteStats: (state, action) => {
      state.totalDistance = action.payload.distance;
      state.avgSpeed = action.payload.avgSpeed;
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    clearTracker: (state) => {
      return initialState;
    }
  }
});

export const {
  setSelectedVehicle,
  setRouteData,
  setRouteStats,
  setFilters,
  setLoading,
  clearTracker
} = trackerSlice.actions;

export default trackerSlice.reducer;

VehicleDashboard.jsx:
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedVehicle } from "../tracker/trackerSlice";
import { getVehicles } from "../vehicle/vehicleService";

export default function VehicleDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (err) {
      console.error("Vehicle fetch error:", err);
    }
  };

  const handleViewRoute = (vehicle) => {
    // store only vehicle number
    dispatch(setSelectedVehicle(vehicle.vehicleRegNo));

    navigate("/tracker");
  };

  return (
    <div className="dashboard-container">
      <h2>Vehicle Dashboard</h2>

      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Vehicle No</th>
            <th>Last Toll</th>
            <th>Last Seen</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((v, i) => (
            <tr key={i}>
              <td>{v.vehicleRegNo}</td>
              <td>{v.tollPlazaName}</td>
              <td>{new Date(v.lastSeenTime).toLocaleString()}</td>
              <td>{v.latitude}</td>
              <td>{v.longitude}</td>
              <td>
                <button
                  className="view-route-btn"
                  onClick={() => handleViewRoute(v)}
                >
                  View Route
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

vehicleService.js:
export async function getVehicles() {
  const res = await fetch("http://localhost:5000/vehicles");
  return res.json();
}

vehicleSlice.js:
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: [],
  selectedVehicle: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
  },
});

export const { setVehicles, setSelectedVehicle } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;

TrackerPage.jsx:
import { useState } from "react";
import { useSelector } from "react-redux";
import MapView from "../components/Map/MapView";
import SearchPanel from "../features/route/SearchPanel";
import ExcludedPanel from "../features/route/ExcludedPanel";
import { getRoute } from "../features/route/routeService";

export default function TrackerPage() {

  const selectedVehicle = useSelector(
    (state) => state.tracker.selectedVehicle
  );

  const [included, setIncluded] = useState([]);
  const [excluded, setExcluded] = useState([]);

  const [stats, setStats] = useState({
    distance: 0,
    avgSpeed: 0
  });

  /* ==============================
     FETCH ROUTE (ONLY FROM SEARCH)
  ============================== */
  const fetchRoute = async (filters) => {

    if (!selectedVehicle) return;

    const vehicleNo =
      typeof selectedVehicle === "string"
        ? selectedVehicle
        : selectedVehicle?.vehicleRegNo;

    if (
      !filters?.fromDate ||
      !filters?.fromTime ||
      !filters?.toDate ||
      !filters?.toTime
    ) {
      console.warn("Invalid filters");
      return;
    }

    try {
      const data = await getRoute({
        vehicle: vehicleNo,
        ...filters
      });

      console.log("ROUTE DATA:", data);

      setIncluded(data.included || []);
      setExcluded(data.excluded || []);

    } catch (err) {
      console.error("Route fetch error:", err);
    }
  };

  return (
    <div className="tracker-container">
      <h2>Toll Route Tracker</h2>

      <SearchPanel onSearch={fetchRoute} />

      <div className="stats-bar">
        <span>
          Total Distance: {stats.distance.toFixed(2)} km
        </span>
        <span>
          Average Speed: {stats.avgSpeed.toFixed(2)} km/h
        </span>
      </div>

      <div className="tracker-layout">
        <MapView
          points={included}
          onRouteCalculated={(distance, avgSpeed) =>
            setStats({ distance, avgSpeed })
          }
        />

        <ExcludedPanel excluded={excluded} />
      </div>
    </div>
  );
}

inde.html:
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Route Tracker</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="src/app/main.jsx"></script>
  </body>
</html>
