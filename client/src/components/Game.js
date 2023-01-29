import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import Board from './Board';
import GameTools from './GameTools';
import StatusGame from './StatusGame';
import Waiting from './Waiting';
import './Chat.css';
import Counter from './Counter';

function Game({ channel, setChannel, rivalUser }) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({
    winner: 'none',
    state: 'none'
  });
  const [player, setPlayer] = useState('X');
  const [changePlayer, setChangePlayer] = useState('X');
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [selfCounter, setSelfCounter] = useState(0);
  const [oppCounter, setOppCounter] = useState(0);

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
      <GameTools 
        setChannel={setChannel} 
        refreshGame={refreshGame}
      />
      <Counter
        rivalUser={rivalUser} 
        selfCounter={selfCounter}
        oppCounter={oppCounter}
      />
      <StatusGame
        player={player}
        changePlayer={changePlayer}
        result={result}
        rivalUser={rivalUser}
        board={board}
        setSelfCounter={setSelfCounter}
        setOppCounter={setOppCounter}
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
          result={result}
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