import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './slices/teamSlice';
import { authReducer } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
