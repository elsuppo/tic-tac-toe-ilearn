import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useChannelStateContext } from 'stream-chat-react';

function GameTools({ setChannel }) {
  const { channel } = useChannelStateContext();

  return (
    <Stack direction="horizontal"  className="justify-content-center">
      <Button
        variant="primary"
        onClick={async () => {
          // await channel.removeMembers([localStorage.getItem('userId')]);
          await channel.stopWatching();
          setChannel(null);
        }}>Leave Game</Button>
    </Stack>
  );
}

export default GameTools;