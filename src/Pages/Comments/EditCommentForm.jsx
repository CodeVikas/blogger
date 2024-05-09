import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Comments.css";
import { Stack } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const EditCategroyForm = () => {
  const { id } = useParams();
  const [error, setError] = useState(null); // State for validation errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate(); // Get navigate from react-router-dom

  const [formData, setFormData] = useState({
    cat_type: "",
    description: "",
    status: "",
    created: "",
  });

  useEffect(() => {
    // Fetch data for the specified cat_type ID when component mounts
    axios
      .get(`http://localhost:5000/categoryById/${id}`)
      .then((response) => {
        setFormData(response.data[0]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/updatecategory/${id}`, formData)
      .then((response) => {
        console.log("Category updated successfully: ", response.data);
        setSuccessMessage("Category updated successfully!");
        setTimeout(() => {
          navigate("/categories"); // Navigate to desired page
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating Category: ", error);
        setError("Error updating Category. Please try again.");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Sidenav />
        <Navbar />
        <div>
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="App1">
              <h1>Edit cat_type</h1>
              <Stack>
                <TextField
                  sx={{ margin: 2 }}
                  id="cat_type"
                  name="cat_type"
                  label="cat_type"
                  value={formData.cat_type}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={Boolean(error)}
                  helperText={error}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="description"
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={Boolean(error)}
                  helperText={error}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="status"
                  name="status"
                  label="Status"
                  type="text"
                  value={formData.status}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={Boolean(error)}
                  helperText={error}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="created"
                  name="created"
                  type="date"
                  value={formData.created}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={Boolean(error)}
                  helperText={error}
                />
              </Stack>

              {successMessage && (
                <div style={{ color: "green", marginTop: 10 }}>{successMessage}</div>
              )}

              <Button type="submit" variant="contained" color="primary" sx={{ margin: 2 }}>
                Update
              </Button>

              <Button
                variant="contained"
                color="secondary"
                sx={{ margin: 2 }}
                onClick={() => navigate("/cat_types")}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default EditCategroyForm;
