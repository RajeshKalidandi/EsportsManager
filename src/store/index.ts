import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './slices/teamSlice';
import { authReducer } from './slices/authSlice';
import tournamentReducer from './slices/tournamentSlice';
import { Team } from '../types/team'; // Import the Team type

export const store = configureStore({
  reducer: {
    team: teamReducer,
    auth: authReducer,
    tournament: tournamentReducer,
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
  tournament: ReturnType<typeof tournamentReducer>;
}

export type AppDispatch = typeof store.dispatch;
