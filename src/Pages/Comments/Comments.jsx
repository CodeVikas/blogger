import React, { useState, useEffect } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
import CommentGrid from "./CommentGrid";
import '../Comments/Comments.css';

export default function Comments() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setIsLogin(false);
    }
  }, []);

  return (
    <React.Fragment>
      {isLogin ? (
        <>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <h1>Comments</h1>
              <CommentGrid />
            </Box>
          </Box>
        </>
      ) : (
        <h2 id="error">Oops - 404 NOT FOUND</h2>
      )}
    </React.Fragment>
  );
}
