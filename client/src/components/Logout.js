import { Button } from "react-bootstrap";

const Logout = ({client, setIsAuth}) => {

  const logout = () => {
    localStorage.clear();
    client.disconnectUser();
    setIsAuth(false);
  }

  return (
    <Button
      variant="light"
      onClick={logout}>LogOut</Button>
  )
}

export default Logout;