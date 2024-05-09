import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import AuthorGrid from "./AuthorGrid";


import "../Authors/Authors.css";

export default function Authors() {
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
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Authors</h1>
          <AuthorGrid />
        </Box>
      </Box>
      </>
      ) : (
        <h2 id="error">Ooop's - 404 NOT FOUND</h2>
      )}
    </React.Fragment>
  );
}
