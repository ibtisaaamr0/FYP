import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      // It doesn't actually mutate the state because it uses the Immer library.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      // Use action.payload to pass data into the reducer
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export the actions so you can dispatch them in your screens
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export the reducer to add it to your store.js
export default counterSlice.reducer;