import { createReducer } from "@reduxjs/toolkit";
import { setPage } from "./transaction-actions";
import transactionsOperations from "./transaction-operations";

const initialState = {
  items: [],
  currentBalance: null,
  currentPage: null,
  pages: null,
};

const transactions = createReducer(initialState, {
  [setPage]: (state, { payload }) => {
    state.currentPage = payload;
  },
  [transactionsOperations.fetchTransactions.fulfilled]: (state, { payload }) => {
    state.items = payload.transactions;
    state.currentBalance = payload.currentBalance;
    state.pages = Math.ceil(payload.pages);
  },
  [transactionsOperations.addTransaction.fulfilled]: (state, { payload }) => {
    state.items = payload.transactionsList;
    state.currentBalance = payload.transactionsList[0].balance;
    state.pages = Math.ceil(payload.pages);
    state.currentPage = 1;
  },
});

export default transactions;
