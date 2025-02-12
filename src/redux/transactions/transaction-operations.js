import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import statisticsOperations from "../statistics/statistics-operations";
import { toast } from "react-toastify";

const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (page = 1, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`/transactions?page=${page}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const { isEnglishVersion } = state.global;
    const insufficientFundsMessage = isEnglishVersion
      ? "Insufficient funds! Make deposit first to have a positive balance."
      : "Недостаточный баланс !!! Сначала внесите транзакцию в доходы";
    const { newCategory, date, type, comment, amount } = transaction;
    try {
      if (newCategory) {
        const newCategoryObj = {
          value: newCategory,
          isEnglishVersion,
          type,
        };

        const response = await axios.post("/categories", newCategoryObj);

        const newTransaction = {
          date,
          type,
          category: response.data.newCategory.value,
          comment,
          amount,
        };

        const { data } = await axios.post("/transactions", newTransaction);
        dispatch(statisticsOperations.getStatistics({}));
        return data;
      }

      const response = await axios.post("/transactions", transaction);
      dispatch(statisticsOperations.getStatistics({}));
      return response.data;
    } catch (error) {
      toast.error(insufficientFundsMessage);
      return rejectWithValue(error);
    }
  }
);

const transactionsOperations = { fetchTransactions, addTransaction };

export default transactionsOperations;
