import React from 'react';

function ResultGame({result}) {
  
  return (
    <div className="d-flex align-items-center justify-content-center" style={{height: "50px"}}>
      {result.state === "won" && <p className="fs-4 m-0">{result.winner} Won The Game!</p>}
      {result.state === "draw" && <p className="fs-4 m-0">Draw!</p>}
    </div>
  );
}

export default ResultGame;