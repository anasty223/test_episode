import { testApi } from "@/services/apiService";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import contentSlice from "./content/content.slice";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const contentConfig = {
  key: "content",
  storage,
  whitelist: ["messageReject"],
};

const rootReducers = combineReducers({
  content: persistReducer(contentConfig, contentSlice.reducer),

  [testApi.reducerPath]: testApi.reducer,
});

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      testApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export default store;
