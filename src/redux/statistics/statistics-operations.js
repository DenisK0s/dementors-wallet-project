import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import helpers from "../../helpers";
const { currentMonth, currentYear } = helpers.getCurrentMonthYear();

const getStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async (
    { selectedMonth = currentMonth, selectedYear = currentYear },
    { getState, rejectWithValue }
  ) => {
    const state = getState();
    const { isEnglishVersion } = state.global;

    try {
      const { data } = await axios.get(
        `/statistics?month=${selectedMonth}&year=${selectedYear}&lang=${isEnglishVersion}`
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
