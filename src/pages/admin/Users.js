import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setError, setLoading } from '../../slices/usersSlice'; // Import actions
import axios from '../../axios'; // Ensure axios is configured correctly

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading()); // Set loading state
      try {
        const response = await axios.get('/admin/users');
        dispatch(setUsers(response.data)); // Set users data
      } catch (err) {
        dispatch(setError(err.response?.data?.message || 'Failed to fetch users.')); // Set error
      }
    };

    if (status === 'idle') {
      fetchUsers();
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <Container>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Users;
