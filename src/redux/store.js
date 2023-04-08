import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from "./user";
import { transactionsSlice } from "./transactions";
import { categoriesSlice } from "./categories";

import modalReduser from "./modal/modalReduser";
import modalLogoutReduser from "./modalLogout/modalLogoutReduser";
import modalFooterReduser from "./modalFooter/modalFooterReduser";
import { teamSlice } from "./team";

const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const userPersistConfig = {
  key: "session",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    session: persistReducer(userPersistConfig, userSlice),
    transactions: transactionsSlice,
    categories: categoriesSlice,
    modal: modalReduser,
    isModalLogoutOpen: modalLogoutReduser,
    developers: teamSlice,
    isModalFooterOpen: modalFooterReduser,
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
