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
  { field: "cat_type", headerName: "Category Name", width: 130 },
  { field: "description", headerName: "Category Description", width: 300 },
  { field: "status", headerName: "Status", type: "boolean", width: 90 },
  { field: "date", headerName: "Created", type: "string", width: 90 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      const handleEdit = () => {
        params.handleEdit(params.row.id);
      };

      const handleDelete = () => {
        params.handleDelete(params.row.id);
      };

      return (
        <>
          <Stack direction="row" spacing={1}>
            <Button startIcon={<EditIcon />} onClick={handleEdit}>
              Edit
            </Button>
            <Button startIcon={<DeleteIcon />} onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </>
      );
    },
  },
];

export default function CategoryGrid() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const handleEdit = (id) => {
    navigate(`/editcategoryform/${id}`);
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
          .delete(`http://localhost:5000/deletecategory/${id}`)
          .then(function (response) {
            if (response.status === 200) {
              Swal.fire("Deleted!", "The category has been deleted.", "success");
              setCategory(category.filter((item) => item.id !== id));
            }
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire("Error", "Failed to delete category.", "error");
          });
      }
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then(function (response) {
        setCategory(response.data);
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const updatedColumns = columns.map((column) => {
    if (column.field === "action") {
      return {
        ...column,
        renderCell: (params) => column.renderCell({ ...params, handleEdit, handleDelete }),
      };
    }
    return column;
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<AddCircleIcon />}
          onClick={() => {
            navigate("/CatAddForm");
          }}
        >
          Add Category
        </Button>
      </Stack>

      <DataGrid
        rows={category}
        columns={updatedColumns}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
}
