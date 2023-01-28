import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const api_key = process.env.API_KEY;
const api_secret = process.env.SECRET_KEY;
const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post('/login', async (req, res) => {
  try {
    const { user } = req.body;
    const {users} = await serverClient.queryUsers({name: user});
    if (users.length === 0) {
      const userId = uuidv4();
      const token = serverClient.createToken(userId);
      res.json({ token, userId, user });
    } else {
      const token = serverClient.createToken(users[0].id);
      res.json({ token, userId: users[0].id, user: users[0].name });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
})