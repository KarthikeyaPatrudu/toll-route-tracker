searchPanel.jsx:
import { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export default function SearchPanel({ onSearch }) {
  const [searchParams] = useSearchParams();

  const [vehicle, setVehicle] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  const [autoLoaded, setAutoLoaded] = useState(false);

    //  AUTO LOAD FROM DASHBOARD

  useEffect(() => {
    if (autoLoaded) return;

    const vehicleParam = searchParams.get("vehicle");
    const lastSeenParam = searchParams.get("lastSeen");

    if (!vehicleParam) return;

    // Use lastSeen date if available, otherwise today
    const baseDate = lastSeenParam
      ? dayjs(lastSeenParam)
      : dayjs();

    const startDay = baseDate.startOf("day");
    const endDay = baseDate.endOf("day");

    setVehicle(vehicleParam.toUpperCase());
    setFromDate(startDay);
    setToDate(endDay);
    setFromTime(startDay);
    setToTime(endDay);

    setAutoLoaded(true);

    // auto search after state update
    setTimeout(() => {
      onSearch(
        vehicleParam.toUpperCase(),
        startDay.format("YYYY-MM-DD"),
        "00:00",
        endDay.format("YYYY-MM-DD"),
        "23:59"
      );
    }, 150);

  }, [searchParams, autoLoaded, onSearch]);

    //  DATE HANDLING

    const handleFromDateChange = (newDate) => {
    setFromDate(newDate);

    if (!toDate || newDate.isAfter(toDate)) {
      setToDate(newDate);
    }
  };

    //  MANUAL SEARCH

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

  /* ==============================
     DEFAULT FILTERS (ALWAYS VALID)
  ============================== */
  const [filters, setFilters] = useState({
    fromDate: "2026-01-01",
    fromTime: "00:00",
    toDate: "2026-01-01",
    toTime: "23:59"
  });

  /* ==============================
     AUTO FETCH WHEN VEHICLE CHANGES
  ============================== */
  useEffect(() => {
    if (!selectedVehicle) return;

    fetchRoute(filters);

  }, [selectedVehicle]);

  /* ==============================
     FETCH ROUTE
  ============================== */
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
routeservice.js:
export async function getRoute(
  vehicle,
  fromDate,
  fromTime,
  toDate,
  toTime
) {
  const params = new URLSearchParams({
    vehicle,
    fromDate,
    fromTime,
    toDate,
    toTime,
  });

  const res = await fetch(
    `http://localhost:5000/route?${params}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch route");
  }

  return await res.json();
}
