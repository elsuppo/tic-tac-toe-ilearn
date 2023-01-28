import {StreamChat} from 'stream-chat';
import Login from "./components/Login";

function App() {
  const api_key = process.env.REACT_APP_API_KEY;
  const token = localStorage.getItem('token');
  const client = StreamChat.getInstance(api_key);

  if (token) {
    client.connectUser(
      {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('user')
    },
    token
    ).then((user) => {
      console.log(user);
    })
  }
  return (
    <Login />
  );
}

export default App;
