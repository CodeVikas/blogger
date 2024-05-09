import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./posts.css";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [error, setError] = useState(null); // State for validation errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate(); // Get navigate from react-router-dom

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      created: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = "Required";
      }

      if (!values.description) {
        errors.description = "Required";
      }

      if (!values.status) {
        errors.status = "Required";
      }

      if (values.status !== 0 && values.status !== 1) {
        errors.status = "Status should be 0 or 1";
      }

      if (!values.created) {
        errors.created = "Please enter created date";
      }

      return errors;
    },
    onSubmit: (values) => {
      axios.post('http://localhost:5000/insertpost', values) // Assuming insertUser is correct
        .then((response) => {
          console.log("Form submitted:", response.data);
          setSuccessMessage("Data inserted successfully!");
          formik.resetForm();
          setTimeout(() => {
            navigate("/posts");
          }, 2000);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            const serverErrors = error.response.data.errors;
            if (serverErrors && serverErrors.length > 0) {
              setError(serverErrors[0].msg);
            }
          } else {
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
              <h1>Posts</h1>
              <Stack>
                <TextField
                  sx={{ margin: 2 }}
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="description"
                  name="description"
                  label="Post Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
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
