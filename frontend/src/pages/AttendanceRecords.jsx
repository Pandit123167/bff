import React, { useEffect, useState } from "react";
import API from "../api";

export default function AttendanceRecords() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({ Present: 0, Absent: 0 });

  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // Fetch Employees List
  useEffect(() => {
    API.get("/employees").then((res) => setEmployees(res.data));
  }, []);

  // Fetch Attendance Data
  const fetchAttendance = async () => {
    const resRecords = await API.get(
      `/attendance?employeeId=${employeeId}&month=${month}&year=${year}`
    );
    setRecords(resRecords.data);

    const resSummary = await API.get(
      `/attendance/summary?employeeId=${employeeId}&month=${month}&year=${year}`
    );
    setSummary(resSummary.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Attendance Records
      </h2>

      {/* ✅ Filters */}
      <div className="flex gap-4 mb-6">
        {/* Employee Dropdown */}
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Employees</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.fullName}
            </option>
          ))}
        </select>

        {/* Month */}
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded w-24"
        />

        {/* Year */}
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded w-28"
        />

        {/* Button */}
        <button
          onClick={fetchAttendance}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* ✅ Summary */}
      <div className="flex gap-6 mb-4">
        <div className="bg-green-100 text-green-700 p-3 rounded">
          Present: <b>{summary.Present}</b> days
        </div>
        <div className="bg-red-100 text-red-700 p-3 rounded">
          Absent: <b>{summary.Absent}</b> days
        </div>
      </div>

      {/* ✅ Table */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec) => (
            <tr key={rec._id} className="border-b text-center">
              <td className="p-3">{rec.employee?.fullName}</td>
              <td>{new Date(rec.date).toLocaleDateString("en-GB")}</td>
              <td
                className={
                  rec.status === "Present"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {rec.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
