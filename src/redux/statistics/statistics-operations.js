import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
import helpers from "../../helpers";
const { currentMonth, currentYear } = helpers.getCurrentMonthYear();

const getStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ selectedMonth = currentMonth, selectedYear = currentYear }, { rejectWithValue }) => {
    console.log(selectedMonth);
    console.log(selectedYear);
    try {
      const { data } = await axios.get(`/statistics?month=${selectedMonth}&year=${selectedYear}`);
      console.log(data);
      return data;
    } catch (error) {
      if (error.message === "Request failed with status code 500") {
        console.log(error);
      }
      return rejectWithValue(error);
    }
  }
);
const statisticsOperations = {
  getStatistics,
};

export default statisticsOperations;
