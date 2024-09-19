import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios'; // Ensure axios is configured correctly

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    error: null,
    status: 'idle',
  },
  reducers: {
    setAppointments(state, action) {
      state.appointments = action.payload;
      state.status = 'succeeded';
    },
    addAppointment(state, action) {
      state.appointments.push(action.payload);
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

export const { setAppointments, addAppointment, setError, setLoading } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
