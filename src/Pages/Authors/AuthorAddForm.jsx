// Import necessary packages and components
import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Authors.css";
import { Stack } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from 'axios'

const AuthorAddForm = () => {
  const navigate = useNavigate(); // Get navigate from react-router-dom

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      fname: "",
      last_name: "",
      email: "",
      phone: "",
      status: "",
      created: "",
    },
    validate: (values) => {
      const errors = {};

      // Validation logic for form fields
      if (!values.fname) {
        errors.fname = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.status) {
        errors.status = "Required";
      }
      if (values.status !== "0" && values.status !== "1") {
        errors.status = "Please enter only 0 or 1";
      }
      if (!values.created) {
        errors.created = "Please enter created date";
      }

      return errors;
    },
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/insertauthor", values) // Change the URL to your backend endpoint
        .then((response) => {
          console.log("Response:", response);
          navigate("/authors");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      console.log("Form submitted:", values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Sidenav />
        <Navbar />
        <div>
          <Box height={10} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" className="App1" sx={{ flexGrow: 1, p: 3 }}>
              <h1>Authors</h1>
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
                  id="status"
                  name="status"
                  label="Status"
                  type="Boolean"
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
                  // label="Created Date"
                  type="Date"
                  value={formik.values.created}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.created && Boolean(formik.errors.created)}
                  helperText={formik.touched.created && formik.errors.created}
                />
              </Stack>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
              <Button variant="contained" color="secondary" onClick={() => navigate("/authors")}>
                Cancel
              </Button>
            </Box>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default AuthorAddForm;
