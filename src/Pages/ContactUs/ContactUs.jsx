import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Navbar from "../../components/Navbar";
import './ContactUs.css'
import { Card, Grid } from "@mui/material";


export default function ContactUsCom() {
  const [islogin, setIslogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setIslogin(false);
    }
  }, []);

  return (
    <React.Fragment>
      {islogin ? (
        <>
          <Navbar />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Box height={20} />
              <Grid container spacing={100}>
                <Grid item xs={15}>
                  <Card sx={{ height: 60 + "vh" }}>
                    <CardContent>
                      <div className="contact-us-container">
                        <h2>Contact Us</h2>
                        <form>
                          <label htmlFor="name">Name:</label>
                          <input type="text" id="name" name="name" required />

                          <label htmlFor="email">Email:</label>
                          <input type="email" id="email" name="email" required />

                          <label htmlFor="message">Message:</label>
                          <textarea id="message" name="message" rows="4" required></textarea>

                          <button type="submit">Submit</button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      ) : (
        <h2 id="error">Ooop's - 404 NOT FOUND</h2>
      )}
    </React.Fragment>
  );
}
