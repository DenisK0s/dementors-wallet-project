import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import helpers from "../../helpers";
const { currentMonth, currentYear } = helpers.getCurrentMonthYear();

const getStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ selectedMonth = currentMonth, selectedYear = currentYear }, { rejectWithValue }) => {
    try {
      console.log(selectedMonth);
      console.log(selectedYear);
      const { data } = await axios.get(`/statistics?month=${selectedMonth}&year=${selectedYear}`);
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
