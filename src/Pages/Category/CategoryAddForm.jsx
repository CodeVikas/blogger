// RegistrationForm.js
import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Category.css";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from "@mui/material/Box";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";

const RegistrationForm = () => {
  const navigate =useNavigate();

  const formik = useFormik({
    initialValues: {
      cat_type: "",
      description: "",
      status: "",
      created: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.cat_type) {
        errors.cat_type = "Required";
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
      // Handle form submission logic
      axios
        .post("http://localhost:5000/insertcategory", values) // Change the URL to your backend endpoint
        .then((response) => {
          console.log("Response:", response);
          navigate("/categories");
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
        <Sidenav/>
        <Navbar/>
      <div>
      <Box height={10} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="App1">
          <h1>Categories</h1>

        <Stack>
          <TextField
            sx={{ margin: 2 }}
            id="cat_type"
            name="cat_type"
            label="Category Name"
            value={formik.values.cat_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cat_type && Boolean(formik.errors.cat_type)}
            helperText={formik.touched.cat_type && formik.errors.cat_type}
          />

          <TextField
            sx={{ margin: 2 }}
            id="description"
            name="description"
            label="Category Description"
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

          <Button variant="contained" color="secondary" onClick={()=>{
            navigate("/categories")
          }}>
            Cancel
          </Button>
          {/* <div>
            <label>
              <Field type="checkbox" name="agree" />
              I agree to the terms and conditions
            </label>
            {errors.agree && touched.agree && (
              <div style={{ color: 'red' }}>{errors.agree}</div>
            )}
          </div> */}

</Box>
      </Box>
      </div>
    </form>
    </div>
  );
};

export default RegistrationForm;
