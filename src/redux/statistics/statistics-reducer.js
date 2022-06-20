import { createReducer } from "@reduxjs/toolkit";
import statisticsOperations from "./statistics-operations";
const { getStatistics } = statisticsOperations;

const initialState = {
  statsData: { plus: [], minus: [], totalPlus: null, totalMinus: null, firstTransactionYear: null },
  isNoData: false,
};

const statistics = createReducer(initialState, {
  [getStatistics.fulfilled]: (state, { payload }) => {
    state.isNoData = false;
    state.statsData = payload;
  },
  [getStatistics.rejected]: (state) => {
    state.isNoData = true;
    state.statsData = {
      plus: [],
      minus: [],
      totalPlus: null,
      totalMinus: null,
      firstTransactionYear: null,
    };
  },
});

export default statistics;
