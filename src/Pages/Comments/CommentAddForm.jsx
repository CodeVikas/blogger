import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from 'axios';
import "./Comments.css";
import { Stack } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const RegistrationForm = () => {
  const [error, setError] = useState(null); // State for validation errors
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const navigate = useNavigate(); // Get navigate from react-router-dom

  const formik = useFormik({
    initialValues: {
      comment: "",
      subject: "",
      status: "", // Initialize with 0
      created: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.comment) {
        errors.comment = "Required";
      }

      if (!values.subject) {
        errors.subject = "Required";
      }

      // Validate status
      if (values.status !== 0 && values.status !== 1) {
        errors.status = "Status should be 0 or 1";
      }

      if (!values.created) {
        errors.created = "Please enter created date";
      }

      return errors;
    },
    onSubmit: (values) => {
      axios.post('http://localhost:5000/insertComment', values)
        .then((response) => {
          console.log("Form submitted:", response.data);
          // Show success message
          setSuccessMessage("Data inserted successfully!");
          // Clear the form
          formik.resetForm();
          // Navigate to another page after 2 seconds
          setTimeout(() => {
            navigate("/comments"); // Navigate to desired page
          }, 2000);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.show) {
            // If the error response has the specific "comment" field validation error
            const commentError = error.response.data.show.find(error => error.path[0] === 'comment');
            if (commentError) {
              setError(commentError.message);
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
              <h1>Comments</h1>

              <Stack>
                <TextField
                  sx={{ margin: 2 }}
                  id="comment"
                  name="comment"
                  label="Category Name"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.comment && Boolean(formik.errors.comment)}
                  helperText={formik.touched.comment && formik.errors.comment}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="subject"
                  name="subject"
                  label="Category Description"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />

                <TextField
                  sx={{ margin: 2 }}
                  id="status"
                  name="status"
                  label="Status"
                  type="number" // Set input type to number
                  inputProps={{ min: 0, max: 1, step: 1 }} // Set min, max, and step
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
                  type="Date"
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
