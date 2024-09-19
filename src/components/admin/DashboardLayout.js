import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar'; 
import './DashboardLayout.css'; // Ensure this path is correct
import { Outlet } from 'react-router-dom'; // Import Outlet

const DashboardLayout = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col xs={10} className="content-col">
          <Outlet /> {/* Render nested routes */}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
