import React, { useEffect, useState } from "react";
import api from "../api";
import EditStudent from "./EditStudent";




const Students = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [addingStudent, setAddingStudent] = useState(false); // New state for adding student
  const [newStudent, setNewStudent] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gpa: "",
  });

  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch students
        const studentResponse = await api.get("/students");
        setStudents(studentResponse.data);
  
        // Fetch campuses
        const campusResponse = await api.get("/campuses");
        setCampuses(campusResponse.data); // This updates the campuses state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleAddStudent = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/students", newStudent);
      setStudents((prevStudents) => [...prevStudents, response.data]);
      setAddingStudent(false);
      setNewStudent({ firstname: "", lastname: "", email: "", gpa: "" });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`/students/${studentId}`);
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== studentId)
        );
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleViewDetails = async (studentId) => {
    try {
      const response = await api.get(`/students/${studentId}`);
      setViewingStudent(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  return (
    <div>
      <h1>Students</h1>
      {addingStudent ? (
        <form onSubmit={handleAddStudent}>
        <h2>Add Student</h2>
        <input
          type="text"
          placeholder="First Name"
          value={newStudent.firstname}
          onChange={(e) => setNewStudent({ ...newStudent, firstname: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newStudent.lastname}
          onChange={(e) => setNewStudent({ ...newStudent, lastname: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          required
        />
        <input
            type="number"
            placeholder="GPA"
            step="0.1" // Added this line to change increment/decrement behavior
            value={newStudent.gpa}
            onChange={(e) => setNewStudent({ ...newStudent, gpa: e.target.value })}
        />
    <select
            value={newStudent.campusId || ""}
            onChange={(e) => setNewStudent({ ...newStudent, campusId: e.target.value })}
        >
        <option value="">Select Campus</option>
            {campuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
            {campus.name}
        </option>
        ))}
    </select>
        <button type="submit">Add</button>
        <button onClick={() => setAddingStudent(false)}>Cancel</button>
        </form>
      ) : editingStudent ? (
        <EditStudent
            student={editingStudent}
            campuses={campuses} // Pass the list of campuses as a prop
            onStudentUpdated={(updatedStudent) =>
                setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === updatedStudent.id ? updatedStudent : student
                )
                )
            }
            onCancel={() => setEditingStudent(null)}
        />
      ) : viewingStudent ? (
        <div>
          <h2>Student Details</h2>
          <p>
            Name: {viewingStudent.firstname} {viewingStudent.lastname}
          </p>
          <p>Email: {viewingStudent.email}</p>
          <p>GPA: {viewingStudent.gpa}</p>
          {viewingStudent.campus ? (
            <>
                <h3>Campus Details</h3>
             <p><strong>Name:</strong> {viewingStudent.campus.name}</p>
                <p><strong>Address:</strong> {viewingStudent.campus.address}</p>
                <p><strong>Description:</strong> {viewingStudent.campus.description}</p>
            </>
            ) : (
            <p>No campus assigned</p>
    )}
          <button onClick={() => setViewingStudent(null)}>Back</button>
        </div>
      ) : (
        <>
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                {student.firstname} {student.lastname} - {student.email}
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
                <button onClick={() => handleViewDetails(student.id)}>View Details</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setAddingStudent(true)}>Add Student</button>
        </>
      )}
    </div>
  );
};

export default Students;