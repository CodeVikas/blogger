import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    handleLogin(formData.email, formData.password);
  };

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        console.log(response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle network or server errors
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="bgcolor1">
        <Box height={40} width={100} />
        <p id="heading">ARD SOFT Technology</p>
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid item xs={8}>
              <Card>
                <CardContent>
                  <div>
                    <h2>Login</h2>

                    <form onSubmit={handleSubmit}>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {error && <div className="error-message">{error}</div>}

                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {error && <div className="error-message">{error}</div>}

                      <button type="submit">Login</button>

                      <Link
                        onClick={() => {
                          navigate("/signup");
                        }}
                      >
                        Sign Up
                      </Link>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Login;
