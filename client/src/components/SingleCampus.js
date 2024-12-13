import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleCampus = () => {
  const { campusId } = useParams();
  const [campus, setCampus] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/campus/${campusId}`)
      .then((response) => response.json())
      .then((data) => setCampus(data));
  }, [campusId]);

  if (!campus) return <div>Loading...</div>;

  return (
    <div>
      <h2>{campus.name}</h2>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h3>Students:</h3>
      <ul>
        {campus.students.map((student) => (
          <li key={student.id}>
            {student.firstname} {student.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleCampus;