import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Import and use useNavigate hook

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    console.log('Token removed from localStorage.');

    // Close the dialog after logout
    setOpen(false);

    // Redirect the user to the login page
    navigate("/");
  };

  const handleClose = () => {
    navigate("/home");
    setOpen(false);
  };

  // Opens the dialog on component mount (initial render)
  useEffect(() => {
    setOpen(true); // This opens the dialog immediately
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutButton;
