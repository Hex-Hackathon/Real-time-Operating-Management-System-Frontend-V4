import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import materialRequestApi from '../api/materialRequestApiSlice';
import stockRequestApiSlice from '../api/stockRequestApiSlice';

export const AdminStore = configureStore({
  reducer: {
    [materialRequestApi.reducerPath]: materialRequestApi.reducer,
    [stockRequestApiSlice.reducerPath]: stockRequestApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      materialRequestApi.middleware,
      stockRequestApiSlice.middleware,
    ),
});

// setupListeners(AdminStore.dispatch);
