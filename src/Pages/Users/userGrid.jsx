import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fname", headerName: "First Name", width: 130 },
  { field: "lname", headerName: "Last Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "password", headerName: "Password", width: 130 },
  { field: "status", headerName: "Status", type: "boolean", width: 90 },
  { field: "date", headerName: "Created", type: "string", width: 90 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <ActionButtons id={params.row.id} onRefresh={() => {}} />
    ),
  },
];

function ActionButtons({ id, onRefresh }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edituserform/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/deleteuser/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "Your user has been deleted.", "success");
              // Trigger refresh after deletion
              onRefresh();
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error", "Failed to delete user.", "error");
          });
      }
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button startIcon={<EditIcon />} onClick={handleEdit}>
        Edit
      </Button>
      <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(id)}>
        Delete
      </Button>
    </Stack>
  );
}

export default function UserGrid() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [refreshToken, setRefreshToken] = useState(0); // State for refresh token

  useEffect(() => {
    axios
      .get("http://localhost:5000/viewuser")
      .then((response) => {
        setUser(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshToken]); // Refresh data whenever refreshToken changes

  const handleRefresh = () => {
    setRefreshToken((prevToken) => prevToken + 1); // Update refresh token
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            navigate("/UserAddForm");
          }}
        >
          Add User
        </Button>
      </Stack>
      <DataGrid
        rows={user}
        columns={columns}
        pageSize={5}
        checkboxSelection
        components={{
          Toolbar: () => (
            <div style={{ padding: "10px 0" }}>
              <Button variant="contained" onClick={handleRefresh}>
                Refresh
              </Button>
            </div>
          ),
        }}
      />
    </div>
  );
}
