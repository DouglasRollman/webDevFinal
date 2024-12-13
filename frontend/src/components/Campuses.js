import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Campuses = () => {
  const [campuses, setCampuses] = useState([]);
  const [newCampus, setNewCampus] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [editingCampus, setEditingCampus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5001/api/campuses")
      .then((response) => {
        setCampuses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching campuses:", error);
      });
  }, []);

  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCampus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCampus = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5001/api/campuses", newCampus)
      .then((response) => {
        setCampuses((prev) => [...prev, response.data]);
        setNewCampus({ name: "", address: "", description: "" });
      })
      .catch((error) => {
        console.error("Error adding campus:", error);
      });
  };

  const handleDeleteCampus = (id) => {
    if (window.confirm("Are you sure you want to delete this campus? This action cannot be undone.")) {
      axios
        .delete(`http://localhost:5001/api/campuses/${id}`)
        .then(() => {
          setCampuses((prevCampuses) => prevCampuses.filter((campus) => campus.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting campus:", error);
        });
    }
  };

  return (
    <div>
      <h1>Campuses</h1>

      {/* Add Campus Form */}
      <form onSubmit={handleAddCampus}>
        <input
          type="text"
          name="name"
          placeholder="Campus Name"
          value={newCampus.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newCampus.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newCampus.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Campus</button>
      </form>

      {/* Edit Campus Form */}
      {editingCampus && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            axios
              .put(`http://localhost:5001/api/campuses/${editingCampus.id}`, editingCampus)
              .then((response) => {
                setCampuses((prevCampuses) =>
                  prevCampuses.map((campus) =>
                    campus.id === editingCampus.id ? response.data : campus
                  )
                );
                setEditingCampus(null); // Reset the editing state
              })
              .catch((error) => {
                console.error("Error updating campus:", error);
              });
          }}
        >
          <h3>Edit Campus</h3>
          <input
            type="text"
            name="name"
            placeholder="Campus Name"
            value={editingCampus.name}
            onChange={(event) =>
              setEditingCampus((prev) => ({ ...prev, name: event.target.value }))
            }
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={editingCampus.address}
            onChange={(event) =>
              setEditingCampus((prev) => ({ ...prev, address: event.target.value }))
            }
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={editingCampus.description}
            onChange={(event) =>
              setEditingCampus((prev) => ({ ...prev, description: event.target.value }))
            }
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingCampus(null)}>
            Cancel
          </button>
        </form>
      )}

      {/* Display Campuses */}
      <ul>
        {campuses.map((campus) => (
          <li key={campus.id}>
            {campus.name} - {campus.address}
            <p>{campus.description}</p>
            <button onClick={() => navigate(`/campus/${campus.id}`)}>View Details</button>
            <button onClick={() => setEditingCampus(campus)}>Edit</button>
            <button onClick={() => handleDeleteCampus(campus.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campuses;