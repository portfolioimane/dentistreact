import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { setServices, setError } from '../slices/servicesSlice';
import axios from '../axios';

const Services = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        dispatch(setServices(response.data));
      } catch (error) {
        dispatch(setError('Failed to fetch services.'));
      }
    };

    fetchServices();
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <h2>Our Services</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {services.map((service) => (
          <Col md={4} key={service.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{service.name}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
