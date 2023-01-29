import React from 'react';
import './Cell.css'

function Cell({ selectCell, value }) {
  return (
    <div className="cell" onClick={selectCell}>
      <p className="fs-1 m-0 font-monospace">{value}</p>
    </div>
  );
}

export default Cell;