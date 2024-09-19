import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/admin/dashboard">Dentist Admin</Navbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/login">Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminNavbar;
