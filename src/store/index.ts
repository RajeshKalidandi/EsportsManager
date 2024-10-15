import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './slices/teamSlice';
import { authReducer } from './slices/authSlice';
import tournamentReducer from './slices/tournamentSlice';
import playerReducer from './slices/playerSlice';

export const store = configureStore({
  reducer: {
    team: teamReducer,
    auth: authReducer,
    tournaments: tournamentReducer,
    players: playerReducer,
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
  tournaments: {
    // ... tournament state
  };
  players: {
    players: Player[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    performanceHistory: {
      date: Date;
      performanceRating: Number;
    }[];
  };
}

export type AppDispatch = typeof store.dispatch;

