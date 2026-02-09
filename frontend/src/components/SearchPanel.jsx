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

  /* ======================================
     AUTO LOAD FROM DASHBOARD
     /tracker?vehicle=TN05BB1234&lastSeen=ISO_DATE
  ====================================== */
  useEffect(() => {
    if (autoLoaded) return;

    const vehicleParam = searchParams.get("vehicle");
    const lastSeenParam = searchParams.get("lastSeen");

    if (!vehicleParam) return;

    // ✅ Use lastSeen date if available, otherwise today
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

  /* ======================================
     DATE HANDLING
  ====================================== */
  const handleFromDateChange = (newDate) => {
    setFromDate(newDate);

    if (!toDate || newDate.isAfter(toDate)) {
      setToDate(newDate);
    }
  };

  /* ======================================
     MANUAL SEARCH
  ====================================== */
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

    onSearch(
      vehicle.toUpperCase(),
      fromDate.format("YYYY-MM-DD"),
      fromTime.format("HH:mm"),
      toDate.format("YYYY-MM-DD"),
      toTime.format("HH:mm")
    );
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
