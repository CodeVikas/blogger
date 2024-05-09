import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Authors.css";
import { Stack } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const EditAuthorForm = () => {
  const { id } = useParams();
  const [error, setError] = useState(null); // State for validation errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate(); // Get navigate from react-router-dom

  const [author, setAuthor] = useState({
    fname: "",
    email: "",
    status: "",
    created: "",
  });

  useEffect(() => {
    // Fetch data for the specified author ID when component mounts
    axios
      .get(`http://localhost:5000/getauthorbyid/${id}`)
      .then((response) => {
        setAuthor(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching author:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({ ...author, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/updateauthor/${id}`, author)
      .then((response) => {
        console.log("Author updated successfully: ", response.data);
        setSuccessMessage("Author updated successfully!");
        setTimeout(() => {
          navigate("/authors"); // Navigate to desired page
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating author: ", error);
        setError("Error updating author. Please try again.");
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
              <h1>Edit Author</h1>
              <Stack>
                <TextField
                  sx={{ margin: 2 }}
                  id="fname"
                  name="fname"
                  label="First Name"
                  value={author.fname}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={Boolean(error)}
                  helperText={error}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="email"
                  name="email"
                  label="Email"
                  value={author.email}
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
                  value={author.status}
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
                  value={author.created}
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
                onClick={() => navigate("/authors")}
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

export default EditAuthorForm;
