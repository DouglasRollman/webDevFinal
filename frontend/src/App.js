import React from "react";
import Students from "./components/Students"; // Import the Students component
import Campuses from "./components/Campuses"; // Import the Campus component
import CampusDetails from "./components/CampusDetails";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Import Link

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Campuses />
                <div style={{ marginTop: "20px" }}>
                  <Link to="/students">View Students</Link>
                </div>
              </div>
            }
          />
          <Route path="/students" element={<Students />} />
          <Route path="/campuses" element={<Campuses />} />
          <Route path="/campus/:campusId" element={<CampusDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;