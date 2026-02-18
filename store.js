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