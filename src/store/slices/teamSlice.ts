import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Team, Player } from '../../types/team';

// Update this line to point to your actual API endpoint
const API_URL = 'http://localhost:5000/api/teams';

interface TeamState {
  teams: Team[];
  currentTeam: Team | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  currentTeam: null,
  status: 'idle',
  error: null,
};

// Async thunks for API calls
export const fetchTeams = createAsyncThunk('team/fetchTeams', async () => {
  const response = await axios.get<Team[]>(API_URL);
  return response.data;
});

export const createTeam = createAsyncThunk('team/createTeam', async (team: Omit<Team, '_id'>) => {
  const response = await axios.post<Team>(API_URL, team);
  return response.data;
});

export const updateTeam = createAsyncThunk('team/updateTeam', async (team: Team) => {
  const response = await axios.put<Team>(`${API_URL}/${team._id}`, team);
  return response.data;
});

export const deleteTeam = createAsyncThunk('team/deleteTeam', async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const addPlayerAsync = createAsyncThunk(
  'team/addPlayer',
  async ({ teamId, player }: { teamId: string; player: Omit<Player, '_id'> }) => {
    const response = await axios.post<Player>(`${API_URL}/${teamId}/players`, player);
    return { teamId, player: response.data };
  }
);

export const updatePlayerAsync = createAsyncThunk(
  'team/updatePlayer',
  async ({ teamId, player }: { teamId: string; player: Player }) => {
    const response = await axios.put<Player>(`${API_URL}/${teamId}/players/${player._id}`, player);
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

export const fetchTeamDetails = createAsyncThunk(
  'teams/fetchTeamDetails',
  async (teamId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${teamId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue('An error occurred while fetching team details')
      }
    }
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
        state.status = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
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
      })
      .addCase(fetchTeamDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeamDetails.fulfilled, (state, action: PayloadAction<Team>) => {
        state.status = 'succeeded';
        state.currentTeam = action.payload;
      })
      .addCase(fetchTeamDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { addPlayer, updatePlayer, deletePlayer } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
