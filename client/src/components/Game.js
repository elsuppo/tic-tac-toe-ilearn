import React, { useEffect, useState } from 'react';
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

  channel.on("user.watching.stop", (event) => {
    if (event.user.id) {
      setPlayersJoined(false);
    }
  });

  const refreshGame = async () => {
    await channel.sendEvent({
      type: 'game-refresh',
    })
  }

  if (!playersJoined) {
    return <Waiting />
  }

  return (
    <Stack gap={3}>
      <GameTools setChannel={setChannel} refreshGame={refreshGame}/>
      <ResultGame result={result} />
      <Stack direction="horizontal" gap={3} className="justify-content-center flex-wrap">
        <Board setResult={setResult} />
        <Window>
          <MessageList />
          <MessageInput />
        </Window>
      </Stack>
    </Stack>
  );
}

export default Game;