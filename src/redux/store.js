import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import authReducer from "./auth/auth-slice";
import categoryReducer from "./categories/categories-slice";
import globalReducer from "./global/global-reducer";
import statisticsReducer from "./statistics/statistics-reducer";
import transactionsReducer from "./transactions/transaction-reducer";

const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  whitelist: ["token"],
};
// const transactionsPersistConfig = {
//   key: "transactions",
//   storage: storageSession,
// };
const globalPersistConfig = {
  key: "lang",
  storage: storage,
  whitelist: ["isEnglishVersion"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    categories: categoryReducer,
    transactions: transactionsReducer,
    global: persistReducer(globalPersistConfig, globalReducer),
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
