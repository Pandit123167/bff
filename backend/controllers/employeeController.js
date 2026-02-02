const Employee = require("../models/Employee");

// ✅ Add New Employee
const addEmployee = async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    // Validation
    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format!",
      });
    }

    // Duplicate Check
    const existingEmployee = await Employee.findOne({
      $or: [{ employeeId }, { email }],
    });

    if (existingEmployee) {
      return res.status(409).json({
        message: "Employee ID or Email already exists!",
      });
    }

    // Create Employee
    const newEmployee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    res.status(201).json({
      message: "Employee added successfully!",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ✅ Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ✅ Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found!",
      });
    }

    await employee.deleteOne();

    res.status(200).json({
      message: "Employee deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  deleteEmployee,
};
