import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import PostGrid from "./PostGrid";
import '../Posts/posts.css'
export default function Posts() {
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
          <h1>Posts</h1>
          <PostGrid/>
        </Box>
      </Box>
      </>
      ) : (
        <h2 id="error">Ooop's - 404 NOT FOUND</h2>
      )}
    </React.Fragment>
  );
}
