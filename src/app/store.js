import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import servicesReducer from '../slices/servicesSlice';
import appointmentsReducer from '../slices/appointmentsSlice';
import usersReducer from '../slices/usersSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
    appointments: appointmentsReducer,
    users: usersReducer,
  },
});
