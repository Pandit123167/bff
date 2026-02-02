import React, { useEffect, useState } from "react";
import API from "../api";

export default function MarkAttendance() {
  const [employees, setEmployees] = useState([]);

  const [data, setData] = useState({
    employeeId: "",
    date: "",
    status: "Present",
  });

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/employees");
        setEmployees(res.data);
      } catch (err) {
        alert("Error fetching employees");
      }
    };
    fetchEmployees();
  }, []);

  // Submit Attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.employeeId || !data.date || !data.status) {
      return alert("⚠️ All fields are required!");
    }

    try {
      await API.post("/attendance", data);
      alert("✅ Attendance Marked Successfully!");
      setData({ employeeId: "", date: "", status: "Present" });
    } catch (err) {
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Mark Attendance</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee Select */}
        <select
          value={data.employeeId}
          onChange={(e) => setData({ ...data, employeeId: e.target.value })}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.fullName}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        {/* Status */}
        <select
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
          className="w-full border p-2 rounded"
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Submit Attendance
        </button>
      </form>
    </div>
  );
}
