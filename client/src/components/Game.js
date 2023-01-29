import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import Board from './Board';
import GameTools from './GameTools';
import StatusGame from './StatusGame';
import Waiting from './Waiting';
import './Chat.css';

function Game({ channel, setChannel, rivalUser }) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({
    winner: 'none',
    state: 'none'
  });
  const [player, setPlayer] = useState('X');
  const [changePlayer, setChangePlayer] = useState('X');
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);

  const userName = channel.state.membership.user.name;

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
    return <Waiting setChannel={setChannel} />
  }

  return (
    <Stack gap={3}>
      <GameTools setChannel={setChannel} refreshGame={refreshGame} />
      <StatusGame
        player={player}
        changePlayer={changePlayer}
        result={result}
        userName={userName}
        rivalUser={rivalUser}
        board={board}
      />
      <Stack direction="horizontal" gap={3} className="justify-content-center flex-wrap">
        <Board
          board={board}
          setBoard={setBoard}
          player={player}
          setPlayer={setPlayer}
          changePlayer={changePlayer}
          setChangePlayer={setChangePlayer}
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