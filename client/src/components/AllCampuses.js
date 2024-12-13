import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllCampuses = () => {
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/campuses')
      .then((response) => response.json())
      .then((data) => setCampuses(data));
  }, []);

  return (
    <div>
      <h2>All Campuses</h2>
      <ul>
        {campuses.map((campus) => (
          <li key={campus.id}>
            <Link to={`/campus/${campus.id}`}>{campus.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCampuses;