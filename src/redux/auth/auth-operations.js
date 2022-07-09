import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://wallet-app-go-it.herokuapp.com/api";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const getInvalidDataMessage = (lang) => {
  return lang
    ? "Check the correctness of the entered data !"
    : "Проверьте верность введённых данных !";
};

const register = createAsyncThunk(
  "auth/register",
  async (credentials, { getState, rejectWithValue }) => {
    const state = getState();
    const { isEnglishVersion } = state.global;
    const checkEnteredDataMessage = getInvalidDataMessage(isEnglishVersion);
    try {
      const { data } = await axios.post("/users/auth", credentials);
      token.set(data.token);

      return data;
    } catch (error) {
      toast.error(checkEnteredDataMessage);
      return rejectWithValue(error);
    }
  }
);

const logIn = createAsyncThunk("auth/login", async (credentials, { getState, rejectWithValue }) => {
  const state = getState();
  const { isEnglishVersion } = state.global;
  const checkEnteredDataMessage = getInvalidDataMessage(isEnglishVersion);
  try {
    const { data } = await axios.post("/users/login", credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    toast.error(checkEnteredDataMessage);
    return rejectWithValue(error);
  }
});

const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.get("/users/logout");
    token.unset();
  } catch (error) {
    toast.error(error.message);
  }
});

const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

const authOperations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default authOperations;
