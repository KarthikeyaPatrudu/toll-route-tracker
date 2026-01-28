const mongoose = require("mongoose");
const xlsx = require("xlsx");
require("dotenv").config();
const TollLog = require("./models/TollLog");

function normalizeVehicleNumber(v) {
  if (!v) return "";
  return v.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Import");

    const filePath = "C:\\Users\\KARTHIK\\Downloads\\Telegram Desktop\\Tollgate - Test data for Karthik.xlsx";

    const workbook = xlsx.readFile(filePath);


    await TollLog.deleteMany({});
    console.log("Old data cleared");

    let allRecords = [];
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const rows = xlsx.utils.sheet_to_json(sheet);


      const records = rows.map(row => {
        const [lat, lng] = row.tollPlazaGeocode.split(",").map(Number);

        const parsedDate = new Date(row.readerReadTime);


        return {
          vehicleRegNo: normalizeVehicleNumber(row.vehicleRegNo),
          readerReadTime: parsedDate,
          latitude: lat,
          longitude: lng,
          tollPlazaName: row.tollPlazaName,
          laneDirection: row.laneDirection,
          vehicleType: row.vehicleType,
        };
      });

      allRecords = allRecords.concat(records);
    });

    await TollLog.insertMany(allRecords);
    console.log(`Imported ${allRecords.length} records from all sheets`);

    process.exit();
  } catch (err) {
    console.error("Import Error:", err);
    process.exit(1);
  }
}

importData();
