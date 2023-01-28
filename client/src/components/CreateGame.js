import React, { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';
import { Form, Button, Stack } from 'react-bootstrap';
import Game from './Game';

function CreateGame() {
  const [rivalUser, setRivalUser] = useState('');
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();

  const createGame = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUser } });

    if (response.users.length === 0) {
      alert('User not found');
      return;
    }

    const newChannel = await client.channel('messaging', {
      members: [localStorage.getItem('userId'), response.users[0].id]
    });

    await newChannel.watch();
    setChannel(newChannel);
  }

  return (
    <Stack className="col-md-5 mx-auto mt-5" gap={3}>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <>
          <Form.Label className="h5">Create Game</Form.Label>
          <Form.Control
            type="text"
            placeholder="username of rival..."
            onChange={(event) => setRivalUser(event.target.value)}
          />
          <Button onClick={createGame}>Join or Start Game</Button>
        </>
      )}
    </Stack>
  );
}

export default CreateGame;