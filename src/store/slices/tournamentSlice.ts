import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tournament {
  id: string;
  name: string;
  // Add more tournament properties as needed
}

interface TournamentState {
  tournaments: Tournament[];
  loading: boolean;
  error: string | null;
}

const initialState: TournamentState = {
  tournaments: [],
  loading: false,
  error: null,
};

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
});

export const { setTournaments, addTournament, updateTournament, deleteTournament, setLoading, setError } = tournamentSlice.actions;

export default tournamentSlice.reducer;