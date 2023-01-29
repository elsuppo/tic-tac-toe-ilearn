import React, { useEffect } from 'react';

function StatusGame({ result, player, changePlayer, rivalUser, board, setSelfCounter, setOppCounter }) {

  useEffect(() => {
    updateCounter();
  }, [result.winner])

  const userName = localStorage.getItem('user');

  const nextMove = () => {
    if (JSON.stringify(board) === JSON.stringify(['', '', '', '', '', '', '', '', ''])) {
      return `${userName} / ${rivalUser}`;
    }
    if (player === 'X' && changePlayer === 'O') {
      return rivalUser;
    } else if (player === 'X' && changePlayer === 'X') {
      return userName;
    } else if (player === 'O' && changePlayer === 'X') {
      return rivalUser;
    } else {
      return userName;
    }
  }

  const nameWinner = () => {
    if (result.winner === player) {
      return userName;
    } else {
      return rivalUser;
    }
  }

  const updateCounter = () => {
    if (result.winner === player) {
      setSelfCounter(prev => prev + 1);
    } else if (result.winner !== 'none') {
      setOppCounter(prev => prev + 1);
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "70px" }}>
      {result.state === 'none' ? (
        <>
          <p className="fs-4 m-0">Your figure: {player}</p>
          <p className="fs-4 m-0">Next move: <span className="fw-bolder">{nextMove()}</span></p>
        </>
      ) : (
        <>
          {result.state === "won" && <p className="fs-4 m-0"><span className="text-success fw-bolder">{nameWinner()}</span> Won The Game!</p>}
          {result.state === "draw" && <p className="fs-4 m-0">Draw!</p>}
        </>
      )}
    </div>
  );
}

export default StatusGame;