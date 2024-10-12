import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Team {
  id: string;
  name: string;
  // Add other team properties
}

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
  const querySnapshot = await getDocs(collection(db, 'teams'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Team));
});

export const createTeam = createAsyncThunk('team/createTeam', async (team: Omit<Team, 'id'>) => {
  const docRef = await addDoc(collection(db, 'teams'), team);
  return { id: docRef.id, ...team } as Team;
});

export const updateTeam = createAsyncThunk('team/updateTeam', async (team: Team) => {
  const teamRef = doc(db, 'teams', team.id);
  await updateDoc(teamRef, team);
  return team;
});

export const deleteTeam = createAsyncThunk('team/deleteTeam', async (id: string) => {
  await deleteDoc(doc(db, 'teams', id));
  return id;
});

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
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
        const index = state.teams.findIndex(team => team.id === action.payload.id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      .addCase(deleteTeam.fulfilled, (state, action: PayloadAction<string>) => {
        state.teams = state.teams.filter(team => team.id !== action.payload);
      });
  },
});

export const teamReducer = teamSlice.reducer;
