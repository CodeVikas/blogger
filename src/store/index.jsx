import { configureStore } from "@reduxjs/toolkit";
import authorReducer from "./author-slice";

const store = configureStore({
  reducer: {
    author: authorReducer,
  },
});

export default store;
