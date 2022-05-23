import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";


const getStatistics = createAsyncThunk(
  "statistics/fetchStatistics",
  async ({ selectedMonth, selectedYear }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/statistics?month=${selectedMonth}&year=${selectedYear}`
      );
      return data;
    } catch (error) {
      if (error.message === "Request failed with status code 500") {
        console.log(error)
      }
      return rejectWithValue(error);
    }
  }
);
const statisticsOperations = {
  getStatistics,
};

export default statisticsOperations;
