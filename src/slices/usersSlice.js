import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios'; // Ensure axios is configured correctly

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    error: null,
    status: 'idle',
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.status = 'succeeded';
    },
    setError(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
  },
});

export const { setUsers, setError, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
