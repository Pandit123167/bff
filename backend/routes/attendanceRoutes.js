const express = require("express");
const {
  markAttendance,
  getAllAttendance,
  getAttendanceByEmployee,
  getMonthlySummary,
  getFilteredAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

router.post("/", markAttendance);

// ✅ Filters
router.get("/", getFilteredAttendance);

// ✅ Summary
router.get("/summary", getMonthlySummary);

// Employee specific
router.get("/:employeeId", getAttendanceByEmployee);

module.exports = router;
