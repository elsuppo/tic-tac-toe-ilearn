import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import Board from './Board';
import "./Chat.css";

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);

  const [result, setResult] = useState({
    winner: 'none',
    state: 'none'
  });

  channel.on('user.watching.start', (event) => {
    setPlayersJoined(event.watcher_count === 2);
  })

  if (!playersJoined) {
    return (
      <div>Waiting for other player to join...</div>
    )
  }

  return (
    <Stack direction="horizontal" gap={3} className="justify-content-center">
      <Board
        result={result}
        setResult={setResult}
      />
      <Window>
        <MessageList 
          disableDateSeparator
          closeReactionSelectorOnClick
          messageActions={false}
          AttachmentFileIcon={undefined}
        />
        <MessageInput 
          noFiles
          closeAttachmentPicker

        />
      </Window>
    </Stack>
  );
}

export default Game;