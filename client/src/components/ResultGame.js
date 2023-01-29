import React from 'react';

function ResultGame({result}) {
  
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "50px"}}>
      {result.state === "won" && <div>{result.winner} Won The Game!</div>}
      {result.state === "draw" && <div>Draw!</div>}
    </div>
  );
}

export default ResultGame;