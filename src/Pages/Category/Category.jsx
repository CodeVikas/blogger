import React ,{useState,useEffect}from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../components/Navbar";
// import DataGridCRUD from "../../components/DataGridCRUD";
import '../Category/Category.css'
import CategoryGrid from "./CategoryGrid";


export default function Categories() {
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
          <h1>Categories</h1>
          {/* <DataGridCRUD/> */}
          <CategoryGrid/>
        </Box>
      </Box>
    </>
     ):(
      <h2 id="error">Ooop's - 404 NOT FOUND</h2>
     )}
    </React.Fragment>
  );
}
