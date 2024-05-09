import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const EditUserForm = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    status: "",
    created: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getbyiduser/${id}`)
      .then((response) => {
        setFormData(response.data[0]);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/edituser/${id}`, formData)
      .then((response) => {
        console.log("User updated successfully: ", response.data);
        setSuccessMessage("User updated successfully!");
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
        setError("Error updating user. Please try again.");
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
              <h1>Edit User</h1>
              <Stack>
                <TextField
                  sx={{ margin: 2 }}
                  id="fname"
                  name="fname"
                  label="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={Boolean(error)}
                  helperText={error}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="lname"
                  name="lname"
                  label="Last Name"
                  value={formData.lname}
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
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleChange}
                  error={Boolean(error)}
                  helperText={error}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="password"
                  name="password"
                  label="Enter Password"
                  type="password"
                  value={formData.password}
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
                  label=""
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
                Update User
              </Button>

              <Button
                variant="contained"
                color="secondary"
                sx={{ margin: 2 }}
                onClick={() => navigate("/users")}
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

export default EditUserForm;
