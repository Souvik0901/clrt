import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name:''
};

const userSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;
