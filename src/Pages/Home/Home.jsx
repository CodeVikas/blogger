import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import AccordionDash from "../../components/AccordionDash";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import "../Home/Home.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function Home() {
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
          <Box height={70} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Stack direction="row" spacing={2}>
                    <Card
                      sx={{ minWidth: "49%", height: 150 }}
                      className="gradient"
                    >
                      <CardContent>
                        <div>
                          <CreditCardIcon />
                        </div>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ color: "#ffffff" }}
                        >
                          $500.00
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          sx={{ color: "#ffffff" }}
                        >
                          Today's Earnings
                        </Typography>
                      </CardContent>
                    </Card>

                    <Card
                      sx={{ minWidth: "49%", height: 150 }}
                      className="gradientlight"
                    >
                      <CardContent>
                        <div>
                          <ShoppingBagIcon />
                        </div>
                        <Typography gutterBottom variant="h5" component="div">
                          $1000.00
                        </Typography>
                        <Typography gutterBottom variant="body2" component="div">
                          Total
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  <Stack spacing={2}>
                    <Card sx={{ maxWidth: 345 }} className="gradientdark">
                      <Stack spacing={2} direction={"row"}>
                        <div className="iconstyle">
                          <StorefrontIcon />
                        </div>
                        <div className="paddingall">
                          <span className="pricetitle">$203K</span>
                          <br />
                          <span className="pricesubtitle">Total Income</span>
                        </div>
                      </Stack>
                    </Card>
                    <Card sx={{ maxWidth: 345 }} className="gradientdark1">
                      <Stack spacing={2} direction={"row"}>
                        <div className="iconstyle">
                          <StorefrontIcon />
                        </div>
                        <div className="paddingall">
                          <span className="pricetitle">$203K</span>
                          <br />
                          <span className="pricesubtitle">Total Income</span>
                        </div>
                      </Stack>
                    </Card>
                  </Stack>
                </Grid>
              </Grid>
              <Box height={20} />
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Card sx={{ height: "60vh" }}>
                    <CardContent></CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ height: "60vh" }}>
                    <CardContent>
                      <div className="paddingall">
                        <span className="pricetitle">Popular Products</span>
                      </div>
                      <AccordionDash />
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
