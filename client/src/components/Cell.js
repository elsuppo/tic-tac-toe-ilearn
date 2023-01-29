import React from 'react';

function Cell({ selectCell, value }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center border h1 m-0" 
      role="button"
      style={{ width: "100px", height: "100px" }}
      onClick={selectCell}
    >
      {value}
    </div>
  );
}

export default Cell;