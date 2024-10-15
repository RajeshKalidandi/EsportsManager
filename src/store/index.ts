import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './slices/teamSlice';
import { authReducer } from './slices/authSlice';
import tournamentReducer from './slices/tournamentSlice';
import playerReducer from './slices/playerSlice';
import { Team } from '../types/team'; // Import the Team type

export const store = configureStore({
  reducer: {
    team: teamReducer,
    auth: authReducer,
    tournament: tournamentReducer,
    player: playerReducer,
  },
});

export interface RootState {
  team: {
    teams: Team[] | null;
    loading: boolean;
    error: string | null;
  };
  auth: {
    user: any | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  };
  tournament: ReturnType<typeof tournamentReducer>;
  player: ReturnType<typeof playerReducer>;
}

export type AppDispatch = typeof store.dispatch;
