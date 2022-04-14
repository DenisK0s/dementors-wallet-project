import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import transactionsOperations from './transaction-operations';

const items = createReducer([], {
  [transactionsOperations.fetchTransactions.fulfilled]: (state, { payload }) =>
    payload,
  [transactionsOperations.addTransaction.fulfilled]: (state, { payload }) => 
    payload,
  
});

export default combineReducers({
  items,
});
