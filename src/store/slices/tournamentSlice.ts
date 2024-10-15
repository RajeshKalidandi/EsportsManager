import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Tournament {
  id: string;
  name: string;
  // Add more tournament properties as needed
}

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
  async (tournamentData) => {
    const response = await api.post('/api/tournaments', tournamentData);
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
      const index = state.tournaments.findIndex(tournament => tournament.id === action.payload.id);
      if (index !== -1) {
        state.tournaments[index] = action.payload;
      }
    },
    deleteTournament: (state, action: PayloadAction<string>) => {
      state.tournaments = state.tournaments.filter(tournament => tournament.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
        state.error = action.error.message;
      })
      .addCase(createTournament.fulfilled, (state, action) => {
        state.tournaments.push(action.payload);
      });
  },
});

export const { setTournaments, addTournament, updateTournament, deleteTournament, setLoading, setError } = tournamentSlice.actions;

export default tournamentSlice.reducer;
