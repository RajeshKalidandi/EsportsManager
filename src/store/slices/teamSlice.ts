import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Team, Player } from '../../types/team';

// Update this line to point to your actual API endpoint
const API_URL = 'http://localhost:YOUR_CORRECT_PORT/api/teams'; // or whatever your actual API URL is

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchTeams = createAsyncThunk('team/fetchTeams', async () => {
  // Simulating API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { _id: '1', name: 'Team 1', players: [] },
    { _id: '2', name: 'Team 2', players: [] },
    // Add more mock teams as needed
  ];
});

export const createTeam = createAsyncThunk('team/createTeam', async (team: Omit<Team, '_id'>) => {
  const response = await axios.post(API_URL, team);
  return response.data;
});

export const updateTeam = createAsyncThunk('team/updateTeam', async (team: Team) => {
  const response = await axios.put(`${API_URL}/${team._id}`, team);
  return response.data;
});

export const deleteTeam = createAsyncThunk('team/deleteTeam', async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const addPlayerAsync = createAsyncThunk(
  'team/addPlayer',
  async ({ teamId, player }: { teamId: string; player: Omit<Player, '_id'> }) => {
    const response = await axios.post(`${API_URL}/${teamId}/players`, player);
    return { teamId, player: response.data };
  }
);

export const updatePlayerAsync = createAsyncThunk(
  'team/updatePlayer',
  async ({ teamId, player }: { teamId: string; player: Player }) => {
    const response = await axios.put(`${API_URL}/${teamId}/players/${player._id}`, player);
    return { teamId, player: response.data };
  }
);

export const deletePlayerAsync = createAsyncThunk(
  'team/deletePlayer',
  async ({ teamId, playerId }: { teamId: string; playerId: string }) => {
    await axios.delete(`${API_URL}/${teamId}/players/${playerId}`);
    return { teamId, playerId };
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    // These are synchronous actions, different from the async thunks above
    addPlayer: (state, action: PayloadAction<{ teamId: string; player: Player }>) => {
      const team = state.teams.find(t => t._id === action.payload.teamId);
      if (team) {
        team.players = team.players || [];
        team.players.push(action.payload.player);
      }
    },
    updatePlayer: (state, action: PayloadAction<{ teamId: string; player: Player }>) => {
      const team = state.teams.find(t => t._id === action.payload.teamId);
      if (team && team.players) {
        const playerIndex = team.players.findIndex(p => p._id === action.payload.player._id);
        if (playerIndex !== -1) {
          team.players[playerIndex] = action.payload.player;
        }
      }
    },
    deletePlayer: (state, action: PayloadAction<{ teamId: string; playerId: string }>) => {
      const team = state.teams.find(t => t._id === action.payload.teamId);
      if (team && team.players) {
        team.players = team.players.filter(p => p._id !== action.payload.playerId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teams';
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        state.teams.push(action.payload);
      })
      .addCase(updateTeam.fulfilled, (state, action: PayloadAction<Team>) => {
        const index = state.teams.findIndex(team => team._id === action.payload._id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(deleteTeam.fulfilled, (state, action: PayloadAction<string>) => {
        state.teams = state.teams.filter(team => team._id !== action.payload);
      })
      .addCase(addPlayerAsync.fulfilled, (state, action) => {
        const { teamId, player } = action.payload;
        const team = state.teams.find(t => t._id === teamId);
        if (team) {
          team.players = team.players || [];
          team.players.push(player);
        }
      })
      .addCase(updatePlayerAsync.fulfilled, (state, action) => {
        const { teamId, player } = action.payload;
        const team = state.teams.find(t => t._id === teamId);
        if (team && team.players) {
          const playerIndex = team.players.findIndex(p => p._id === player._id);
          if (playerIndex !== -1) {
            team.players[playerIndex] = player;
          }
        }
      })
      .addCase(deletePlayerAsync.fulfilled, (state, action) => {
        const { teamId, playerId } = action.payload;
        const team = state.teams.find(t => t._id === teamId);
        if (team && team.players) {
          team.players = team.players.filter(p => p._id !== playerId);
        }
      });
  },
});

export const { addPlayer, updatePlayer, deletePlayer } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
