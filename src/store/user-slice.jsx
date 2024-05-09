import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [{ 
    id: '',
    fname: '',
    lname: '',
    email: '',
    phone: '',
    status: '',
    created: ''
   }],
  reducers: {
    getUser(state) {
      
    },
    getUserbyId(state) {
      
    },
    addUser(state) {
      
    },
    updateUser(state) {
      
    },
    deleteUser(state) {

    }
  }
});

export const userActions = userSlice.actions;

export default userSlice;