import { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import JoinGame from './components/JoinGame';
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const api_key = process.env.REACT_APP_API_KEY;
  const token = localStorage.getItem('token');
  const client = StreamChat.getInstance(api_key);

  const [isAuth, setIsAuth] = useState(false);

  if (token) {
    client.connectUser(
      {
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('user')
      },
      token
    ).then(() => {
      setIsAuth(true);
    })
  }
  return (
    <>
      {isAuth ?
        (<Chat client={client}>
          <Logout
            client={client}
            setIsAuth={setIsAuth}
          />
          <JoinGame />
        </Chat>
        ) : (
          <Login
            setIsAuth={setIsAuth}
          />
        )
      }
    </>
  );
}

export default App;
