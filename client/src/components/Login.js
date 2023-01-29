import React, { useState } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';
import Axios from 'axios';

function Login({ setIsAuth }) {
  const [user, setUser] = useState(null);

  const login = () => {
    Axios.post(`${process.env.REACT_APP_SERVER}/login`, user).then(res => {
      if (res.data === 'Enter your name!') {
        alert('Enter your name!');
      } else {
        const { token, userId, user } = res.data;
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('user', user);
          setIsAuth(true);
        }
      }
    })
  }

  return (
    <Stack className="col-5 mx-auto mt-5" gap={3}>
      <Form.Label className="h5">Login</Form.Label>
      <Form.Control
        type="text"
        placeholder="username"
        onChange={(event) => setUser({ ...user, user: event.target.value })}
      />
      <Button onClick={login}>LogIn</Button>
    </Stack>
  );
}

export default Login;