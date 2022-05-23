import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export default configureStore({
  reducer: {
    root: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
