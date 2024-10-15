import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Team, Player } from '../../types/team';

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

export const fetchTeams = createAsyncThunk('team/fetchTeams', async () => {
  const response = await api.get<Team[]>('/api/teams');
  return response.data;
});

export const createTeam = createAsyncThunk('team/createTeam', async (team: Omit<Team, '_id'>) => {
  const response = await api.post<Team>('/api/teams', team);
  return response.data;
});

export const updateTeam = createAsyncThunk('team/updateTeam', async (team: Team) => {
  const response = await api.put<Team>(`/api/teams/${team._id}`, team);
  return response.data;
});

export const deleteTeam = createAsyncThunk('team/deleteTeam', async (id: string) => {
  await api.delete(`/api/teams/${id}`);
  return id;
});

export const fetchTeamDetails = createAsyncThunk(
  'teams/fetchTeamDetails',
  async (teamId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/teams/${teamId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch team details');
    }
  }
);

export const addPlayerAsync = createAsyncThunk(
  'team/addPlayer',
  async ({ teamId, player }: { teamId: string; player: Omit<Player, '_id'> }) => {
    const response = await api.post<Player>(`/api/teams/${teamId}/players`, player);
    return { teamId, player: response.data };
  }
);

export const updatePlayerAsync = createAsyncThunk(
  'team/updatePlayer',
  async ({ teamId, player }: { teamId: string; player: Player }) => {
    const response = await api.put<Player>(`/api/teams/${teamId}/players/${player._id}`, player);
    return { teamId, player: response.data };
  }
);

export const deletePlayerAsync = createAsyncThunk(
  'team/deletePlayer',
  async ({ teamId, playerId }: { teamId: string; playerId: string }) => {
    await api.delete(`/api/teams/${teamId}/players/${playerId}`);
    return { teamId, playerId };
  }
);

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
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
      .addCase(fetchTeamDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeamDetails.fulfilled, (state, action: PayloadAction<Team>) => {
        state.status = 'succeeded';
        state.currentTeam = action.payload;
      })
      .addCase(fetchTeamDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addPlayerAsync.fulfilled, (state, action) => {
        const team = state.teams.find(t => t._id === action.payload.teamId);
        if (team) {
          team.players.push(action.payload.player);
        }
      })
      .addCase(updatePlayerAsync.fulfilled, (state, action) => {
        const team = state.teams.find(t => t._id === action.payload.teamId);
        if (team) {
          const playerIndex = team.players.findIndex(p => p._id === action.payload.player._id);
          if (playerIndex !== -1) {
            team.players[playerIndex] = action.payload.player;
          }
        }
      })
      .addCase(deletePlayerAsync.fulfilled, (state, action) => {
        const team = state.teams.find(t => t._id === action.payload.teamId);
        if (team) {
          team.players = team.players.filter(p => p._id !== action.payload.playerId);
        }
      });
  },
});

export const teamReducer = teamSlice.reducer;
