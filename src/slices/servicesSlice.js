import { createSlice } from '@reduxjs/toolkit';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    error: null,
  },
  reducers: {
    setServices(state, action) {
      state.services = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setServices, setError } = servicesSlice.actions;
export default servicesSlice.reducer;
