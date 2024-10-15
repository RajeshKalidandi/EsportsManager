import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Tournament, Match } from '../../types/tournament';

interface TournamentState {
  tournaments: Tournament[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TournamentState = {
  tournaments: [],
  status: 'idle',
  error: null,
};

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async () => {
    const response = await api.get('/api/tournaments');
    return response.data;
  }
);

export const createTournament = createAsyncThunk(
  'tournaments/createTournament',
  async (tournamentData: Partial<Tournament>) => {
    const response = await api.post('/api/tournaments', tournamentData);
    return response.data;
  }
);

export const updateMatchResult = createAsyncThunk(
  'tournaments/updateMatchResult',
  async ({ tournamentId, matchId, winner, score }: { tournamentId: string; matchId: string; winner: string; score: string }) => {
    const response = await api.put(`/api/tournaments/${tournamentId}/matches/${matchId}`, { winner, score });
    return response.data;
  }
);

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setTournaments: (state, action: PayloadAction<Tournament[]>) => {
      state.tournaments = action.payload;
    },
    addTournament: (state, action: PayloadAction<Tournament>) => {
      state.tournaments.push(action.payload);
    },
    updateTournament: (state, action: PayloadAction<Tournament>) => {
      const index = state.tournaments.findIndex(tournament => tournament._id === action.payload._id);
      if (index !== -1) {
        state.tournaments[index] = action.payload;
      }
    },
    deleteTournament: (state, action: PayloadAction<string>) => {
      state.tournaments = state.tournaments.filter(tournament => tournament._id !== action.payload);
    },
    updateMatch: (state, action: PayloadAction<Match>) => {
      const tournament = state.tournaments.find(t => t.matches.some(m => m._id === action.payload._id));
      if (tournament) {
        const matchIndex = tournament.matches.findIndex(m => m._id === action.payload._id);
        if (matchIndex !== -1) {
          tournament.matches[matchIndex] = action.payload;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTournaments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tournaments = action.payload;
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createTournament.fulfilled, (state, action) => {
        state.tournaments.push(action.payload);
      })
      .addCase(updateMatchResult.fulfilled, (state, action) => {
        const tournament = state.tournaments.find(t => t._id === action.payload._id);
        if (tournament) {
          tournament.matches = action.payload.matches;
        }
      });
  },
});

export const { setTournaments, addTournament, updateTournament, deleteTournament, updateMatch } = tournamentSlice.actions;

export default tournamentSlice.reducer;
