import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@modules/auth/store/authSlice';
import cartReducer from '@modules/cart/store/cartSlice';
import uiReducer from '@store/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
