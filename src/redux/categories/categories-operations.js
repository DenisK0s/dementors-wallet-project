import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/categories');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const categoriesOperations = {
  getCategories,
};

export default categoriesOperations;
