import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './slices/teamSlice';
import { authReducer } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer,
    auth: authReducer,
  },
});

export interface RootState {
  team: {
    teams: Team[] | null;
    loading: boolean;
    error: string | null;
  };
  auth: {
    // ... auth state
  };
}

export type AppDispatch = typeof store.dispatch;
