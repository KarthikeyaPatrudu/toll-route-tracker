// searchpanel.jsx:
import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function SearchPanel({ onSearch }) {

  /* ===============================
     GET SELECTED VEHICLE FROM REDUX
  =============================== */
  const selectedVehicle = useSelector(
    (state) => state.tracker.selectedVehicle
  );

  /* ===============================
     LOCAL STATE
  =============================== */
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
     AUTO SEARCH AFTER AUTO LOAD
  =============================== */
  useEffect(() => {
    if (!vehicle || !fromDate || !toDate || !fromTime || !toTime) return;

    onSearch({
      vehicle: vehicle.toUpperCase(),
      fromDate: fromDate.format("YYYY-MM-DD"),
      fromTime: fromTime.format("HH:mm"),
      toDate: toDate.format("YYYY-MM-DD"),
      toTime: toTime.format("HH:mm")
    });

  }, [vehicle]);

  /* ===============================
     DATE HANDLING
  =============================== */
  const handleFromDateChange = (newDate) => {
    setFromDate(newDate);

    if (!toDate || newDate.isAfter(toDate)) {
      setToDate(newDate);
    }
  };

  /* ===============================
     MANUAL SEARCH BUTTON
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

  /* ===============================
     UI
  =============================== */
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
        onChange={handleFromDateChange}
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
// mapview.jsx:
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
// server.js:
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const TollLog = require("./models/TollLog");

const app = express();

app.use(cors());
app.use(express.json());

/* ==============================
   MONGODB CONNECTION
============================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/* ==============================
   HELPERS
============================== */
function normalizeVehicleNumber(v) {
  if (!v) return "";
  return v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

/* ==============================
   ROUTE API
============================== */
app.get("/route", async (req, res) => {
  try {
    let { vehicle, fromDate, fromTime, toDate, toTime } = req.query;

    // VALIDATION
    if (!vehicle || !fromDate || !fromTime || !toDate || !toTime) {
      return res.status(400).json({
        error: "All fields required",
      });
    }

    vehicle = normalizeVehicleNumber(vehicle);

    // DATE RANGE
    const rangeStart = new Date(`${fromDate}T00:00:00`);
    const rangeEnd = new Date(`${toDate}T23:59:59`);

    const from = new Date(`${fromDate}T${fromTime}`);
    const to = new Date(`${toDate}T${toTime}`);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return res.status(400).json({
        error: "Invalid date or time format",
      });
    }

    // FETCH LOGS
    const logs = await TollLog.find({
      vehicleRegNo: { $regex: `^${vehicle}$`, $options: "i" },
      readerReadTime: { $gte: rangeStart, $lte: rangeEnd },
    }).sort({ readerReadTime: 1 });

    const included = [];
    const excluded = [];

    logs.forEach((l) => {
      const t = l.readerReadTime;

      const item = {
        lat: Number(l.latitude),
        lng: Number(l.longitude),
        tollPlazaName: l.tollPlazaName,
        time: t.toLocaleTimeString("en-IN"),
        date: t.toLocaleDateString("en-GB"),

        // ✅ CRITICAL FIX (MapView needs valid date string)
        timestamp: t.toISOString(),
      };

      if (t >= from && t <= to) {
        included.push(item);
      } else {
        excluded.push(item);
      }
    });

    res.json({ included, excluded });

  } catch (err) {
    console.error("Route API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ==============================
   VEHICLES DASHBOARD API
============================== */
app.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await TollLog.aggregate([
      { $sort: { readerReadTime: -1 } },
      {
        $group: {
          _id: "$vehicleRegNo",
          vehicleRegNo: { $first: "$vehicleRegNo" },
          lastSeenTime: { $first: "$readerReadTime" },
          latitude: { $first: "$latitude" },
          longitude: { $first: "$longitude" },
          tollPlazaName: { $first: "$tollPlazaName" },
        },
      },
      {
        $project: {
          _id: 0,
          vehicleRegNo: 1,
          lastSeenTime: 1,
          latitude: 1,
          longitude: 1,
          tollPlazaName: 1,
        },
      },
      { $sort: { lastSeenTime: -1 } },
    ]);

    res.json(vehicles);

  } catch (err) {
    console.error("Vehicles API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ==============================
   SERVER START
============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// store.js:
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
trackerpage.jsx:
import { useEffect, useState } from "react";
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

    //  DEFAULT FILTERS 
  const [filters, setFilters] = useState({
    fromDate: "2026-01-01",
    fromTime: "00:00",
    toDate: "2026-01-01",
    toTime: "23:59"
  });


    //  AUTO FETCH WHEN VEHICLE CHANGES
  useEffect(() => {
    if (!selectedVehicle) return;

    fetchRoute(filters);

  }, [selectedVehicle]);

    //  FETCH ROUTE
  const fetchRoute = async (newFilters = filters) => {

    if (!selectedVehicle) return;

    const vehicleNo =
      typeof selectedVehicle === "string"
        ? selectedVehicle
        : selectedVehicle?.vehicleRegNo;

    if (
      !vehicleNo ||
      !newFilters.fromDate ||
      !newFilters.fromTime ||
      !newFilters.toDate ||
      !newFilters.toTime
    ) {
      console.warn("Invalid route params");
      return;
    }

    try {
      setFilters(newFilters);

      const data = await getRoute({
        vehicle: vehicleNo,
        ...newFilters
      });

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
        <span>Total Distance: {stats.distance.toFixed(2)} km</span>
        <span>Average Speed: {stats.avgSpeed.toFixed(2)} km/h</span>
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
trackerslice.js
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
