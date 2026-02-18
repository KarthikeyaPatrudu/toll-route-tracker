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