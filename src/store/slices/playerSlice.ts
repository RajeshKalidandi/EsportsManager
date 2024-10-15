import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PlayerStatistics {
  gamesPlayed: number;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  averageDamagePerRound: number;
}

interface Player {
  _id: string;
  name: string;
  age: number;
  position: string;
  statistics: PlayerStatistics;
  performanceRating: number;
}

interface PlayerState {
  players: Player[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlayerState = {
  players: [],
  status: 'idle',
  error: null,
};

export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await axios.get('/api/players');
  return response.data;
});

export const addPlayer = createAsyncThunk('players/addPlayer', async (playerData: Omit<Player, '_id'>) => {
  const response = await axios.post('/api/players', playerData);
  return response.data;
});

export const updatePlayer = createAsyncThunk('players/updatePlayer', async ({ id, updates }: { id: string, updates: Partial<Player> }) => {
  const response = await axios.patch(`/api/players/${id}`, updates);
  return response.data;
});

export const deletePlayer = createAsyncThunk('players/deletePlayer', async (id: string) => {
  await axios.delete(`/api/players/${id}`);
  return id;
});

export const updatePlayerStats = createAsyncThunk(
  'players/updatePlayerStats',
  async (updatedPlayer: Player) => {
    // You might want to make an API call here to persist the changes
    return updatedPlayer;
  }
);

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<Player[]>) => {
        state.status = 'succeeded';
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addPlayer.fulfilled, (state, action: PayloadAction<Player>) => {
        state.players.push(action.payload);
      })
      .addCase(updatePlayer.fulfilled, (state, action: PayloadAction<Player>) => {
        const index = state.players.findIndex(player => player._id === action.payload._id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
      })
      .addCase(deletePlayer.fulfilled, (state, action: PayloadAction<string>) => {
        state.players = state.players.filter(player => player._id !== action.payload);
      })
      .addCase(updatePlayerStats.fulfilled, (state, action) => {
        const index = state.players.findIndex(player => player._id === action.payload._id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
      });
  },
});

export default playerSlice.reducer;
