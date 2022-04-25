import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import statisticsOperations from './statistics-operations';
const { getStatistics } = statisticsOperations;

const statistics = createReducer([], {
  [getStatistics.fulfilled]: (_, { payload }) => payload,
});

export default combineReducers({
  statistics,
});
