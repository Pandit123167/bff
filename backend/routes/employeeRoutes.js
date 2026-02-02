const express = require("express");
const {
  addEmployee,
  getEmployees,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/", addEmployee);
router.get("/", getEmployees);
router.delete("/:id", deleteEmployee);

module.exports = router;
