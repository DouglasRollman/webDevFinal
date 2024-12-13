import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const CampusDetails = () => {
  const { campusId } = useParams();
  const [campus, setCampus] = useState(null);

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/campuses/${campusId}`);
        setCampus(response.data);
      } catch (error) {
        console.error("Error fetching campus details:", error);
      }
    };

    fetchCampus();
  }, [campusId]);

  if (!campus) {
    return <p>Loading campus details...</p>;
  }

  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h2>Enrolled Students:</h2>
      {campus.students.length > 0 ? (
        <ul>
          {campus.students.map((student) => (
            <li key={student.id}>
              {student.firstname} {student.lastname} - {student.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No students are currently enrolled in this campus.</p>
      )}
    </div>
  );
};

export default CampusDetails;