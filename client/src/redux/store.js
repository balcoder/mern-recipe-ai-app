import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";

// Safe storage that works well with Vite
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key, value) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

// This prevents errors during build / SSR-like behavior in Vite
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local") // real localStorage on client
    : createNoopStorage(); // dummy storage otherwise

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage, // ← use the safe storage here
  version: 1,
  // Optional: only persist the user slice
  // whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
