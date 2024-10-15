import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface PlayerStatistics {
  kills: number;
  deaths: number;
  assists: number;
  // Add more statistics as needed
}

interface PlayerState {
  statistics: PlayerStatistics | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlayerState = {
  statistics: null,
  status: 'idle',
  error: null,
};

export const fetchPlayerStatistics = createAsyncThunk(
  'player/fetchStatistics',
  async ({ playerId, tournamentId }: { playerId: string; tournamentId: string }) => {
    const response = await api.get(`/api/player-stats/${playerId}/tournament/${tournamentId}`);
    return response.data;
  }
);

export const updatePlayerStatistics = createAsyncThunk(
  'player/updateStatistics',
  async ({ playerId, tournamentId, statistics }: { playerId: string; tournamentId: string; statistics: Partial<PlayerStatistics> }) => {
    const response = await api.put(`/api/player-stats/${playerId}/tournament/${tournamentId}`, statistics);
    return response.data;
  }
);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerStatistics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayerStatistics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.statistics = action.payload;
      })
      .addCase(fetchPlayerStatistics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch player statistics';
      })
      .addCase(updatePlayerStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      });
  },
});

export default playerSlice.reducer;
