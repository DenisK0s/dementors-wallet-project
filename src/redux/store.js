import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";



import categoryReducer from "./categoties/categories-operations";


import authReducer from './auth/auth-slice';
import { transactionsReducer } from './transactions';
import loadingReducer from './global/global-reducer';


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),

    categories: categoryReducer,


    transactions: transactionsReducer,
    global: loadingReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
