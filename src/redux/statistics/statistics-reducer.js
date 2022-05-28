import { createReducer } from "@reduxjs/toolkit";
import statisticsOperations from "./statistics-operations";
const { getStatistics } = statisticsOperations;

const initialState = {
  statsData: {},
  isNoData: false
};

const statistics = createReducer(
  initialState,
  {
    [getStatistics.fulfilled]: (state, { payload }) => {
      state.isNoData = false;
      state.statsData = payload;
    },
    [getStatistics.rejected]: (state) => {
      state.isNoData = true;
      state.statsData = {};
    },
  }
);

export default statistics;
