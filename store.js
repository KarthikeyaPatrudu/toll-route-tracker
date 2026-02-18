const from = new Date(`${fromDate}T${fromTime}`);
const to = new Date(`${toDate}T${toTime}`);

if (isNaN(from.getTime()) || isNaN(to.getTime())) {
  return res.status(400).json({
    error: "Invalid date or time format"
  });
}