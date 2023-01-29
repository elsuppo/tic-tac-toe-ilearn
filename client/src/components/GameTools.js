import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useChannelStateContext } from 'stream-chat-react';

function GameTools({ setChannel }) {
  const { channel } = useChannelStateContext();
  console.log(channel);
  return (
    <Stack direction="horizontal">
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