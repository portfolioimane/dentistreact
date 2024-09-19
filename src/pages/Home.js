import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container fluid className="text-center bg-light py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1>Welcome to Dentist Booking</h1>
          <p>Your one-stop solution for managing dental appointments.</p>
          <Button as={Link} to="/services" variant="primary">
            View Services
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

