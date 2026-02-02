import React, { useState } from "react";
import API from "../api";

export default function AddEmployee() {
  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/employees", form);

      alert("✅ Employee Added Successfully!");

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error adding employee");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee ID */}
        <input
          type="text"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) =>
            setForm({ ...form, employeeId: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />

        {/* Department */}
        <input
          type="text"
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Add Employee
        </button>
      </form>
    </div>
  );
}
