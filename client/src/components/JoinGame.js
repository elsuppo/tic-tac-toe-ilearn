import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { Form, Button } from 'react-bootstrap';

function JoinGame() {
  const [rivalUser, setRivalUser] = useState('');
  const [game, setGame] = useState(null);
  const { client } = useChatContext();

  const createGame = async () => {
    const response = await client.queryUsers({name: {$eq: rivalUser}});
    console.log(response);

    if (response.users.length === 0) {
      alert('User not found');
      return;
    }

    const newGame = await client.channel('messaging', {
      members: [localStorage.getItem('userId'), response.users[0].id]
    });

    await newGame.watch();
    setGame(newGame);

  }

  return (
    <>
        {game ? (
          <h1>Game started</h1>
        ) : (
          <div>
          <h4>Create Game</h4>
          <Form.Control
            type="text"
            placeholder="username of rival..."
            onChange={(event) => setRivalUser(event.target.value)}
          />
          <Button onClick={createGame}>Join/Start Game</Button>
        </div>
        )}

    </>


  );
}

export default JoinGame;