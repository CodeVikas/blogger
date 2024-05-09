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
import { useDispatch, useSelector } from "react-redux";
import { getAuthor } from "../../store/author-slice";

const columns = [
  { field: "auth_id", headerName: "Auth_id", width: 70 },
  { field: "fname", headerName: "First Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "status", headerName: "Status", type: "boolean", width: 90 },
  { field: "date", headerName: "Date", type: "string", width: 90 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 150,
    renderCell: RenderActionButtons,
  },
];

function RenderActionButtons(params) {
  const navigate = useNavigate();
  const [author, setAuthor] = useState([]);

  const handleEdit = (id) => {
    navigate(`/editauthorform/${id}`);
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
          .delete(`http://localhost:5000/deleteauthor/${id}`)
          .then(function (response) {
            if (response.status === 200) {
              Swal.fire("Deleted!", "The author has been deleted.", "success");
              setAuthor(author.filter((item) => item.auth_id !== id));
            }
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire("Error", "Failed to delete author.", "error");
          });
      }
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button startIcon={<EditIcon />} onClick={() => handleEdit(params.row.auth_id)}>
        Edit
      </Button>
      <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(params.row.auth_id)}>
        Delete
      </Button>
    </Stack>
  );
}

export default function AuthorGrid() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.author.item);

  useEffect(() => {
    dispatch(getAuthor());
  }, [dispatch]);


  const authorItem=useSelector((state)=>state.author.item)
  console.log(authorItem);

  

  return (
    <div style={{ height: "400", width: "100%" }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            navigate("/AuthorAddForm");
          }}
        >
          Add Authors
        </Button>
      </Stack>
      <DataGrid
        rows={authors}
        columns={columns}
        getRowId={(row) => row.auth_id}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
