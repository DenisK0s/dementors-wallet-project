import { createSlice } from '@reduxjs/toolkit';
import categoriesOperations from './categories-operations';
const { getCategories } = categoriesOperations;
const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'categoties',
  initialState,
  extraReducers: {
    [getCategories.fulfilled](state, action) {
      state.categories = action.payload;
    },
  },
});

export default categorySlice.reducer;
