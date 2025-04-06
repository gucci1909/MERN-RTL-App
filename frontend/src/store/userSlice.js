import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.profile = action.payload.profile;
    },
    logout: (state) => {
      state.token = null;
      state.profile = null;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
