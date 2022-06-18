import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = " https://wallet-app-go-it.herokuapp.com/api";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk("auth/register", async (credentials) => {
  try {
    const { data } = await axios.post("/users/auth", credentials);
    token.set(data.token);

    return data;
  } catch (error) {
    toast.error("Проверьте верность введите данных");
    return createAsyncThunk.rejectWithValue(error);
  }
});

const logIn = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const { data } = await axios.post("/users/login", credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    toast.error("Проверьте верность введите данных");
    return createAsyncThunk.rejectWithValue(error);
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

const fetchCurrentUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue();
  }

  token.set(persistedToken);
  try {
    const { data } = await axios.get("/users/current");
    return data;
  } catch (error) {
    toast.error(error.message);
  }
});

const authOperations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default authOperations;
