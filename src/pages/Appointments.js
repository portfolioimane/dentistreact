import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import { setAppointments, addAppointment, setError, setLoading } from '../slices/appointmentsSlice';
import { setServices } from '../slices/servicesSlice';
import axios from '../axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Appointments.css'; // Create a CSS file for additional styling

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const services = useSelector((state) => state.services.services);
  const [selectedService, setSelectedService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [error, setError] = useState('');
  const [minDate, setMinDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      dispatch(setLoading()); // Set loading state
      try {
        const response = await axios.get('/appointments');
        dispatch(setAppointments(response.data));
      } catch (error) {
        dispatch(setError('Failed to fetch appointments.'));
      }
    };

    fetchAppointments();
  }, [dispatch]);

  useEffect(() => {
    const fetchServices = async () => {
      dispatch(setLoading()); // Set loading state
      try {
        const response = await axios.get('/services');
        dispatch(setServices(response.data));
      } catch (error) {
        dispatch(setError('Failed to fetch services.'));
      }
    };

    fetchServices();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = appointmentDate.toISOString().slice(0, 19).replace('T', ' '); // Convert to MySQL format
    try {
      const response = await axios.post('/appointments', {
        service_id: selectedService,
        appointment_date: formattedDate,
      });
      dispatch(addAppointment(response.data)); // Add new appointment to the state
      setSelectedService('');
      setAppointmentDate(new Date());
      setError('');
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Book an Appointment</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formService">
          <Form.Label>Select Service</Form.Label>
          <Form.Control
            as="select"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDate" className="mt-3">
          <Form.Label>Select Date</Form.Label>
          <DatePicker
            selected={appointmentDate}
            onChange={(date) => setAppointmentDate(date)}
            minDate={minDate}
            dateFormat="MMMM d, yyyy"
            className="form-control"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Book Appointment
        </Button>
      </Form>
      <h3 className="mt-5">Upcoming Appointments</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Service</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
              <td>{services.find((s) => s.id === appointment.service_id)?.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Appointments;
