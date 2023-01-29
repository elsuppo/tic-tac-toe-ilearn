import React from 'react';
import { Stack } from 'react-bootstrap';

function Counter({ rivalUser, selfCounter, oppCounter }) {
  const userName = localStorage.getItem('user');

  return (
    <Stack className="align-items-center justify-content-center" direction="horizontal" gap={3}>
      <p className="fs-4 m-0">{userName}: {selfCounter}</p>
      <span className="fs-4 text-light">|</span>
      <p className="fs-4 m-0">{rivalUser}: {oppCounter}</p>
    </Stack>
  );
}

export default Counter;