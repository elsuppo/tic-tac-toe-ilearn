import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useChannelStateContext } from 'stream-chat-react';

function Waiting({ setChannel }) {
  const { channel } = useChannelStateContext();

  return (
    <Stack className="align-items-center" gap={3}>
      <p className="h5">Waiting for other player to join...</p>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <Button
        variant="primary"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}>Create Another Game</Button>
    </Stack>
  );
}

export default Waiting;