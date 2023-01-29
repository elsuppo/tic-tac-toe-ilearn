import React from 'react';

function Counter({ rivalUser, selfCounter, oppCounter }) {
  const userName = localStorage.getItem('user');

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "70px" }}>
      <p className="fs-4 m-0">{userName}: {selfCounter}</p>
      <p className="fs-4 m-0">{rivalUser}: {oppCounter}</p>
    </div>
  );
}

export default Counter;