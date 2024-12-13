import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AllCampuses from './components/AllCampuses';
import SingleCampus from './components/SingleCampus';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/campuses" element={<AllCampuses />} />
      <Route path="/campus/:campusId" element={<SingleCampus />} />
    </Routes>
  </Router>
);

export default App;