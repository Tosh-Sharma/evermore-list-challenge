import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: unknown = {};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    test: (state, action: PayloadAction<void>) => {
      console.log('action is ', action);
      console.log('state before', state);
    },
  },
});

export const actions = todosSlice.actions;
export const selectTest = () => undefined;

export default todosSlice.reducer;
