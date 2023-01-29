import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import Board from './Board';
import GameTools from './GameTools';
import ResultGame from './ResultGame';
import Waiting from './Waiting';
import './Chat.css';

function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

  const [result, setResult] = useState({
    winner: 'none',
    state: 'none'
  });

  channel.on('user.watching.start', (event) => {
    setPlayersJoined(event.watcher_count === 2);
  })

  if (!playersJoined) {
    return <Waiting />
  }

  return (
    <Stack gap={3}>
      <GameTools setChannel={setChannel} />
      <ResultGame result={result} />
      <Stack direction="horizontal" gap={3} className="justify-content-center flex-wrap">
        <Board
          result={result}
          setResult={setResult}
        />
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Stack>
    </Stack>
  );
}

export default Game;