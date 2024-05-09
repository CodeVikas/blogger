import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const EditPostForm = () => {
  const { id } = useParams();
  const [error, setError] = useState(null); // State for validation errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate(); // Get navigate from react-router-dom

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    created: "",
  });

  useEffect(() => {
    // Fetch data for the specified post ID when component mounts
    axios
      .get(`http://localhost:5000/getpostbyid/${id}`)
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
      .put(`http://localhost:5000/editpost/${id}`, formData)
      .then((response) => {
        console.log("Post updated successfully: ", response.data);
        setSuccessMessage("Post updated successfully!");
        setTimeout(() => {
          navigate("/posts"); // Navigate to desired page
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating Post: ", error);
        setError("Error updating Post. Please try again.");
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
              <h1>Edit Post</h1>
              <Stack>
                <TextField
                  sx={{ margin: 2 }}
                  id="title"
                  name="title"
                  label="Title"
                  value={formData.title}
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
                onClick={() => navigate("/posts")}
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

export default EditPostForm;
