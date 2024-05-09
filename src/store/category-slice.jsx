import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: [{ 
    id: '',
    cat_type: '',
    description: '',
    status: '',
    created: ''
   }],
  reducers: {
    getCategory(state) {
      
    },
    getCategorybyId(state) {
      
    },
    addCategory(state) {
      
    },
    updateCategory(state) {
      
    },
    deleteCategory(state) {

    }
  }
});

export const categoryActions = categorySlice.actions;

export default categorySlice;