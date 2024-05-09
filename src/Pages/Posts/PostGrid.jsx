import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Post Description", width: 300 },
  { field: "status", headerName: "Status", type: "boolean", width: 90 },
  { field: "date", headerName: "Created", type: "string", width: 90 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      const { id } = params.row;
      return (
        <ActionButtons id={id} />
      );
    },
  },
];

const ActionButtons = ({ id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/EditPostForm/${id}`);
  };

  const handleDelete = () => {
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
          .delete(`http://localhost:5000/deletepost/${id}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "Your post has been deleted.", "success");
              // Trigger refresh after deletion
              // Assuming you have a function to refresh the post data
            }
          })
          .catch((error) => {
            console.error("Error deleting post:", error);
            Swal.fire("Error", "Failed to delete post.", "error");
          });
      }
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        startIcon={<EditIcon />}
        onClick={handleEdit}
      >
        Edit
      </Button>
      <Button
        startIcon={<DeleteIcon />}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </Stack>
  );
};

const PostGrid = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/post")
      .then(function (response) {
        setPosts(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <div style={{ height: 400, width: "100%" }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            navigate("/PostAddForm");
          }}
        >
          Add Posts
        </Button>
      </Stack>
      <DataGrid
        rows={posts}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default PostGrid;
