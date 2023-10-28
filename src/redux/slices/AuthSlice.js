import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userSession: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
        state.user = null;
      },
  },
})

export const { userSession, logout } = AuthSlice.actions

export default AuthSlice.reducer