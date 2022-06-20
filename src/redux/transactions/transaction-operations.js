import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import globalActions from "../global/global-actions";

const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (page = 1, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`/transactions?page=${page}`);
      return data;
    } catch (error) {
      if (error.message === "Request failed with status code 500") {
        dispatch(globalActions.checkDataStatus(true));
      }
      return rejectWithValue(error);
    }
  }
);

const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, { getState, rejectWithValue }) => {
    const state = getState();
    const { isEnglishVersion } = state.global;
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

        return data;
      }

      const response = await axios.post("/transactions", transaction);
      return response.data;
    } catch (error) {
      toast.error("Недостаточный баланс !!! Сначала внесите транзакцию в доходы");
      return rejectWithValue(error);
    }
  }
);

const transactionsOperations = { fetchTransactions, addTransaction };

export default transactionsOperations;
