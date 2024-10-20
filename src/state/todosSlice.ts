import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState: unknown = {};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    test: (state, action: PayloadAction<void>) => {
      console.log('action');
    },
  },
});

export const actions = todosSlice.actions;
export const selectTest = (state: RootState) => undefined;

export default todosSlice.reducer;
