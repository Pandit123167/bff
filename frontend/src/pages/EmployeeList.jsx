import React, { useEffect, useState } from "react";
import API from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Fetch Employees
  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Employee List
      </h2>

      {employees.length === 0 ? (
        <p className="text-gray-500">No Employees Found</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Employee ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b text-center">
                <td className="p-3">{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>

                <td>
                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
