import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './teamSlice';
import { authReducer } from './authSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
