import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome to the Campus Portal</h1>
    <nav>
      <Link to="/campuses">All Campuses</Link>
    </nav>
  </div>
);

export default Home;