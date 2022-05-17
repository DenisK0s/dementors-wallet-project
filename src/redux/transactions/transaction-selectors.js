export const getTransactions = (state) => state.transactions.items;
export const getCurrentPage = (state) => state.transactions.currentPage;
export const getBalance = (state) => state.transactions.currentBalance;
export const getIsLoading = (state) => state.transactions.isLoading;
export const getPagesQuantity = (state) => state.transactions.pages;
export const yearLimit = (state) => state.transactions.items;
export const getTransactionsExistingStatus = (state) =>
  state.transactions.areTransactionsExist;
