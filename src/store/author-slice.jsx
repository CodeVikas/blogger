import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define thunk for fetching authors from the server
export const getAuthor = createAsyncThunk("author/getAuthor", async () => {
  const response = await axios.get("http://localhost:5000/author");
  return response.data;
});

const initialState = {
  item: [],
  status: "idle",
  error: null,
};

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(getAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authorSlice.reducer;
