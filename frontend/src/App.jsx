import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";

import MarkAttendance from "./pages/MarkAttendance";
import AttendanceRecords from "./pages/AttendanceRecords";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Employees */}
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeeList />} />

        {/* Attendance */}
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/attendance" element={<AttendanceRecords />} />

        {/* Default Home */}
        <Route path="/" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}
