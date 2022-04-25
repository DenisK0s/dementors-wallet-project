import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getStatistics = createAsyncThunk(
  'statistics/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/statistics');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const statisticsOperations = {
  getStatistics,
};

export default statisticsOperations;
