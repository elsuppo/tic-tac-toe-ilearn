import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useChannelStateContext } from 'stream-chat-react';

function GameTools({ setChannel, refreshGame }) {
  const { channel } = useChannelStateContext();

  return (
    <Stack direction="horizontal" gap={3} className="justify-content-center">
      <Button
        variant="primary"
        onClick={() => refreshGame()}>Refresh Game</Button>
      <Button
        variant="primary"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}>Leave Game</Button>
    </Stack>
  );
}

export default GameTools;