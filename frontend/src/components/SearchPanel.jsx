import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

export default function SearchPanel({ onSearch }) {
  const [vehicle, setVehicle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  const handleSearch = () => {
    if (!vehicle || !fromDate || !toDate || !fromTime || !toTime) {
      alert("Enter vehicle, from date/time and to date/time");
      return;
    }

    onSearch(
      vehicle,
      fromDate,
      fromTime.format("HH:mm"),
      toDate,
      toTime.format("HH:mm")
    );
  };

  return (
    <Box className="search-panel">
      <TextField
        label="Vehicle Number"
        size="small"
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value.toUpperCase())}
      />

      <TextField
        type="date"
        label="From Date"
        size="small"
        InputLabelProps={{ shrink: true }}
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />

      <TimePicker
        label="From Time"
        value={fromTime}
        onChange={(newValue) => setFromTime(newValue)}
        format="hh:mm A"
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
        }}
        slotProps={{ textField: { size: "small" } }}
      />

      <TextField
        type="date"
        label="To Date"
        size="small"
        InputLabelProps={{ shrink: true }}
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      <TimePicker
        label="To Time"
        value={toTime}
        onChange={(newValue) => setToTime(newValue)}
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
