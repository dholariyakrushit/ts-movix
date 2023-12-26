import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "../homeSlice/HomeSlice";

export const store = configureStore({
  reducer: { home: homeSlice },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;