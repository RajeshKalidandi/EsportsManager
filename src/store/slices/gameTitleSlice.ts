import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '..';

interface GameTitle {
  id: string;
  name: string;
  genre: string;
  // Add more game-specific fields as needed
}

interface GameTitleState {
  gameTitles: GameTitle[];
  loading: boolean;
  error: string | null;
}

const initialState: GameTitleState = {
  gameTitles: [],
  loading: false,
  error: null,
};

const gameTitleSlice = createSlice({
  name: 'gameTitles',
  initialState,
  reducers: {
    setGameTitles: (state, action: PayloadAction<GameTitle[]>) => {
      state.gameTitles = action.payload;
    },
    addGameTitle: (state, action: PayloadAction<GameTitle>) => {
      state.gameTitles.push(action.payload);
    },
    // Add more reducers as needed
  },
});

export const { setGameTitles, addGameTitle } = gameTitleSlice.actions;

export const fetchGameTitles = (): AppThunk => async (dispatch) => {
  try {
    // Implement API call to fetch game titles
    const response = await fetch('/api/game-titles');
    const data = await response.json();
    dispatch(setGameTitles(data));
  } catch (error) {
    console.error('Error fetching game titles:', error);
  }
};

export default gameTitleSlice.reducer;
