import React from 'react';
import Logout from './Logout';

function Header({ client, setIsAuth }) {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <p className="fs-6 m-0 me-3">You entered as <span className="text-success">{localStorage.getItem('user')}</span></p>
      <Logout
        client={client}
        setIsAuth={setIsAuth}
      />
    </div>

  );
}

export default Header;