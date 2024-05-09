import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Users.css";
import { Stack } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [error, setError] = useState(null); // State for validation errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate(); // Get navigate from react-router-dom

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      status: "",
      created: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.fname) {
        errors.fname = "Required";
      }
      if (!values.lname) {
        errors.lname = "Required";
      }

      if (!values.email) {
        errors.email = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      if (!values.status) {
        errors.status = "Required";
      }

      if (!values.created) {
        errors.created = "Please enter created date";
      }

      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission logic
      axios.post('http://localhost:5000/insertuser', values) // Assuming insertUser is correct
        .then((response) => {
          console.log("Form submitted:", response.data);
          // Show success message
          setSuccessMessage("Data inserted successfully!");
          // Clear the form
          formik.resetForm();
          // Navigate to another page after 2 seconds
          setTimeout(() => {
            navigate("/users"); // Navigate to desired page
          }, 2000);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            const serverErrors = error.response.data.errors;
            if (serverErrors && serverErrors.length > 0) {
              setError(serverErrors[0].msg);
            }
          } else {
            // Generic error handling
            console.error("Error:", error.message);
          }
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Sidenav />
        <Navbar />
        <div>
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="App1">
              <h1>Users</h1>
              <Stack>
                <TextField
                  sx={{ margin: 2 }}
                  id="fname"
                  name="fname"
                  label="First Name"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fname && Boolean(formik.errors.fname)}
                  helperText={formik.touched.fname && formik.errors.fname}
                />
                <TextField
                  sx={{ margin: 2 }}
                  id="lname"
                  name="lname"
                  label="Last Name"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lname && Boolean(formik.errors.lname)}
                  helperText={formik.touched.lname && formik.errors.lname}
                />
                <TextField
                  sx={{ margin: 2 }}
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  sx={{ margin: 2 }}
                  id="password"
                  name="password"
                  label="Enter Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="status"
                  name="status"
                  label="Status"
                  type="text" // Assuming status is a string
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="created"
                  name="created"
                  label=""
                  type="date"
                  value={formik.values.created}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.created && Boolean(formik.errors.created)}
                  helperText={formik.touched.created && formik.errors.created}
                />
              </Stack>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
