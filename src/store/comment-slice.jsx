import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'category',
  initialState: [{ 
    id: '',
    comment: '',
    subject: '',
    status: '',
    created: ''
   }],
  reducers: {
    getComment(state) {
      
    },
    getCommentbyId(state) {
      
    },
    addComment(state) {
      
    },
    updateComment(state) {
      
    },
    deleteComment(state) {

    }
  }
});

export const commentActions = commentSlice.actions;

export default commentSlice;