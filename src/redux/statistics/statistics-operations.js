import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ selectedMonth, selectedYear }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/statistics?month=${selectedMonth}&year=${selectedYear}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const statisticsOperations = {
  getStatistics,
};

export default statisticsOperations;
