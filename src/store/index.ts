import { configureStore } from '@reduxjs/toolkit';
import { teamReducer } from './slices/teamSlice';
import { authReducer } from './slices/authSlice';
import tournamentReducer from './slices/tournamentSlice';
import playerReducer from './slices/playerSlice';
import gameTitleReducer from './slices/gameTitleSlice';
import { Team } from '../types/team'; // Import the Team type

export const store = configureStore({
  reducer: {
    teams: teamReducer,
    auth: authReducer,
    tournaments: tournamentReducer,
    player: playerReducer,
    gameTitles: gameTitleReducer,
  },
});

export interface RootState {
  teams: {
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
  tournaments: ReturnType<typeof tournamentReducer>;
  player: ReturnType<typeof playerReducer>;
  gameTitles: ReturnType<typeof gameTitleReducer>;
}

export type AppDispatch = typeof store.dispatch;

export default store;
