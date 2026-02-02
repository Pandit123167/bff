const mongoose = require("mongoose");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");


// ✅ Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ message: "Invalid employeeId" });
    }

    // Find employee
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    // ✅ Save Attendance with employeeName also
    const attendance = await Attendance.create({
      employee: employeeId,
      employeeName: employee.fullName,
      date: new Date(date),
      status,
    });

    res.status(201).json({
      message: "Attendance marked successfully!",
      attendance,
    });
  } catch (error) {
    console.error("Error markAttendance:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// ✅ Get All Attendance Records (with filters)
const getAllAttendance = async (req, res) => {
  try {
    const { employeeId, month } = req.query;

    let query = {};

    // Employee filter
    if (employeeId) {
      query.employee = employeeId;
    }

    // Month filter
    if (month) {
      const selectedMonth = new Date(month);

      const startOfMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        1
      );

      const endOfMonth = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1
      );

      query.date = { $gte: startOfMonth, $lt: endOfMonth };
    }

    const records = await Attendance.find(query)
      .populate("employee")
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    console.error("Error getAllAttendance:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// ✅ Monthly Summary with Employee + Month Filter
const getMonthlySummary = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;

    // Default current month/year
    const now = new Date();
    const selectedMonth = month ? parseInt(month) - 1 : now.getMonth();
    const selectedYear = year ? parseInt(year) : now.getFullYear();

    // Month range
    const startOfMonth = new Date(selectedYear, selectedMonth, 1);
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 1);

    // Query filter
    const query = {
      date: { $gte: startOfMonth, $lt: endOfMonth },
    };

    // Employee filter
    if (employeeId) {
      query.employee = employeeId;
    }

    const records = await Attendance.find(query);

    // Summary count
    const summary = { Present: 0, Absent: 0 };

    records.forEach((rec) => {
      if (rec.status === "Present") summary.Present++;
      if (rec.status === "Absent") summary.Absent++;
    });

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ Get Attendance Records with Filters
const getFilteredAttendance = async (req, res) => {
  try {
    const { employeeId, month, year } = req.query;

    const now = new Date();
    const selectedMonth = month ? parseInt(month) - 1 : now.getMonth();
    const selectedYear = year ? parseInt(year) : now.getFullYear();

    const startOfMonth = new Date(selectedYear, selectedMonth, 1);
    const endOfMonth = new Date(selectedYear, selectedMonth + 1, 1);

    const query = {
      date: { $gte: startOfMonth, $lt: endOfMonth },
    };

    if (employeeId) query.employee = employeeId;

    const records = await Attendance.find(query)
      .populate("employee")
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};




// ✅ Get Attendance By Employee
const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const records = await Attendance.find({ employee: employeeId })
      .populate("employee")
      .sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    console.error("Error getAttendanceByEmployee:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = {
  markAttendance,
  getAllAttendance,
  getAttendanceByEmployee,
  getMonthlySummary,
  getFilteredAttendance,
};
