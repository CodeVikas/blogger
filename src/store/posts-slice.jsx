import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: [{ 
    id : '',
    title :'',
    description :'',
    status: '',
    created: ''
   }],
  reducers: {
    getpost(state) {
      
    },
    getpostbyId(state) {
      
    },
    addPost(state) {
      
    },
    updatePost(state) {
      
    },
    deletePost(state) {

    }
  }
});

export const postActions = postSlice.actions;

export default postSlice;