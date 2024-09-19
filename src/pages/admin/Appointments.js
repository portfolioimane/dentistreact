import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointments } from '../../slices/appointmentsSlice';
import axios from '../../axios';

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/admin/appointments');
        dispatch(setAppointments(response.data));
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };

    fetchAppointments();
  }, [dispatch]);

  return (
    <Container>
      <h1>Appointments</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.user.name}</td>
              <td>{appointment.service.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Appointments;
