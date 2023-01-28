import React, { useEffect, useState } from 'react';
import { useChannelStateContext } from 'stream-chat-react';
import Cell from './Cell';
import winСombinations from '../winСombinations';

function Board({result, setResult}) {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [player, setPlayer] = useState('X');
  const [changePlayer, setChangePlayer] = useState('X');

  const { channel } = useChannelStateContext();

  useEffect(() => {
    checkWin();
    checkDraw();
  }, [board])

  const selectCell = async (cell) => {
    if (changePlayer === player && board[cell] === '') {
      setChangePlayer(player === 'X' ? '0' : 'X');

      await channel.sendEvent({
        type: 'game-move',
        data: { cell, player }
      })

      setBoard(board.map((value, index) => {
        if (index === cell && value === '') {
          return player;
        }
        return value;
      }))
    }
  }

  const checkWin = () => {
    winСombinations.forEach((currCombination) => {
      const firstPlayer = board[currCombination[0]];
      if (firstPlayer === '') return
      let foundWinCombination = true;
      currCombination.forEach((index) => {
        if (board[index] !== firstPlayer) {
          foundWinCombination = false;
        }
      })

      if (foundWinCombination) {
        alert(`Winner ${board[currCombination[0]]}`)
        setResult({
          winner: board[currCombination[0]],
          state: 'won'
        })
      }
    })
  }

  const checkDraw = () => {
    let filled = true;
    board.forEach((cell) => {
      if (cell === '') {
        filled = false;
      }
    })
    if (filled) {
      alert('Draw!')
      setResult({
        winner: 'none',
        state: 'draw'
      })
    }
  }

  channel.on((event) => {
    if (event.type === 'game-move' && event.user.id !== localStorage.getItem('userId')) {
      const currentPlayer = event.data.player === 'X' ? '0' : 'X';
      setPlayer(currentPlayer);
      setChangePlayer(currentPlayer);
      setBoard(board.map((value, index) => {
        if (index === event.data.cell && value === '') {
          return event.data.player;
        }
        return value;
      }))
    }
  })

  return (
    <div className="d-flex flex-row mx-auto">
      <div>
        <Cell
          value={board[0]}
          selectCell={() => selectCell(0)}
        />
        <Cell
          value={board[1]}
          selectCell={() => selectCell(1)}
        />
        <Cell
          value={board[2]}
          selectCell={() => selectCell(2)}
        />
      </div>
      <div>
        <Cell
          value={board[3]}
          selectCell={() => selectCell(3)}
        />
        <Cell
          value={board[4]}
          selectCell={() => selectCell(4)}
        />
        <Cell
          value={board[5]}
          selectCell={() => selectCell(5)}
        />
      </div>
      <div>
        <Cell
          value={board[6]}
          selectCell={() => selectCell(6)}
        />
        <Cell
          value={board[7]}
          selectCell={() => selectCell(7)}
        />
        <Cell
          value={board[8]}
          selectCell={() => selectCell(8)}
        />
      </div>
    </div>
  );
}

export default Board;