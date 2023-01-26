import React, { useState } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';

function Login(props) {
  const [user, setUser] = useState(null);

  const login = () => {

  }

  return (
    <Stack className="col-md-5 mx-auto mt-5" gap={3}>
      <Form.Label className="h5">Login</Form.Label>
      <Form.Control
        type="text"
        placeholder="username"
        onChange={(event) => setUser({ ...user, user: event.target.value })}
      />
      <Button onClick={login}>Submit</Button>
    </Stack>
  );
}

export default Login;