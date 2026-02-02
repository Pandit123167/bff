import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [openEmp, setOpenEmp] = useState(false);
  const [openAtt, setOpenAtt] = useState(false);

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        HRMS Lite
      </Link>

      {/* Menu */}
      <div className="flex gap-8 items-center">

        {/* Employees Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setOpenEmp(true)}
          onMouseLeave={() => setOpenEmp(false)}
        >
          {/* Default Click */}
          <Link
            to="/employees"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Employees ▼
          </Link>

          {openEmp && (
            <div className="absolute top-8 left-0 bg-white border shadow-lg rounded-lg w-48">
              <Link
                to="/add-employee"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                ➕ Add Employee
              </Link>

              <Link
                to="/employees"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                📋 Employee List
              </Link>
            </div>
          )}
        </div>

        {/* Attendance Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setOpenAtt(true)}
          onMouseLeave={() => setOpenAtt(false)}
        >
          {/* Default Click */}
          <Link
            to="/attendance"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Attendance ▼
          </Link>

          {openAtt && (
            <div className="absolute top-8 left-0 bg-white border shadow-lg rounded-lg w-56">
              <Link
                to="/mark-attendance"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                📝 Mark Attendance
              </Link>

              <Link
                to="/attendance"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                📑 Attendance Records
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
