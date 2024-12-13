import React, { useState } from "react";
import api from "../api";

const EditStudent = ({ student, campuses, onStudentUpdated, onCancel }) => {
  const [updatedStudent, setUpdatedStudent] = useState({ ...student });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/students/${updatedStudent.id}`, updatedStudent);
      onStudentUpdated(response.data);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Student</h2>
      <input
        type="text"
        value={updatedStudent.firstname}
        onChange={(e) => setUpdatedStudent({ ...updatedStudent, firstname: e.target.value })}
        required
      />
      <input
        type="text"
        value={updatedStudent.lastname}
        onChange={(e) => setUpdatedStudent({ ...updatedStudent, lastname: e.target.value })}
        required
      />
      <input
        type="email"
        value={updatedStudent.email}
        onChange={(e) => setUpdatedStudent({ ...updatedStudent, email: e.target.value })}
        required
      />
      <input
        type="number"
        step="0.1" // Ensure GPA increments/decrements by 0.1
        value={updatedStudent.gpa || ""}
        onChange={(e) => setUpdatedStudent({ ...updatedStudent, gpa: e.target.value })}
      />
      <select
        value={updatedStudent.campusId || ""}
        onChange={(e) => setUpdatedStudent({ ...updatedStudent, campusId: e.target.value })}
      >
        <option value="">Select Campus</option>
        {campuses.map((campus) => (
          <option key={campus.id} value={campus.id}>
            {campus.name}
          </option>
        ))}
      </select>
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditStudent;