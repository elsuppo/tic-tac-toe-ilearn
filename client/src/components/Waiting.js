import React from 'react';
import { Stack } from 'react-bootstrap';

function Waiting() {
  return (
    <Stack className="align-items-center" gap={3}>
      <p className="h5">Waiting for other player to join...</p>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Stack>
  );
}

export default Waiting;