import React from 'react';
import { Nav, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the auth token from localStorage
    localStorage.removeItem('user'); // Optionally remove user data
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>

        {/* User Management Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="link" className="nav-link">Users</Dropdown.Toggle>
          <Dropdown.Menu align="start"> {/* align="start" ensures the menu is aligned to the start of the button */}
            <Dropdown.Item as={Link} to="/admin/users">All Users</Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/users/create">Create User</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Services Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="link" className="nav-link">Services</Dropdown.Toggle>
          <Dropdown.Menu align="start"> {/* align="start" ensures the menu is aligned to the start of the button */}
            <Dropdown.Item as={Link} to="/admin/services">All Services</Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/services/create">Create Service</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Appointments Dropdown */}
        <Dropdown>
          <Dropdown.Toggle variant="link" className="nav-link">Appointments</Dropdown.Toggle>
          <Dropdown.Menu align="start"> {/* align="start" ensures the menu is aligned to the start of the button */}
            <Dropdown.Item as={Link} to="/admin/appointments">All Appointments</Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/appointments/create">Create Appointment</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Logout Button */}
        <Button variant="link" className="nav-link" onClick={handleLogout}>
          Logout
        </Button>
      </Nav>
    </div>
  );
};

export default Sidebar;
