import { createReducer } from "@reduxjs/toolkit";
import statisticsOperations from "./statistics-operations";
const { getStatistics } = statisticsOperations;

const initialState = {
  statsData: { plus: [], minus: [], totalPlus: null, totalMinus: null, firstTransactionYear: null },
};

const statistics = createReducer(initialState, {
  [getStatistics.fulfilled]: (state, { payload }) => {
    state.statsData = payload;
  },
  [getStatistics.rejected]: (state) => {
    state.statsData = initialState.statsData;
  },
});

export default statistics;
