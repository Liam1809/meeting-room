import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { PeerServer } from 'peer';
//import Router
import userRouter from './routes/user.js';
import roomRouter from './routes/room.js';

// initial setup
dotenv.config();
const app = express();
const server = createServer(app);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// user Route
app.use('/user', userRouter);
// room Route
app.use('/room', roomRouter);

app.get('/', (req, res) => {
  res.send('Hello to Meeting Room Server');
});

// socket.io
const io = new Server(server, {
  cors: {
    cors: {
      origin: [
        'https://localhost:3000',
        'https://liam-meeting-room.netlify.app',
      ],
      methods: ['GET', 'POST'],
    },
  },
});

io.on('connection', socket => {
  socket.on('new-Guest-First-Arrive', (peerID, room, name) => {
    socket.join(room);
    io.to(room).emit('new-Guest-Arrived', peerID, room, name);
  });

  // socket.on('sendMyPeer', (room, peerID) => {
  //   io.to(room).emit('receiveMyPeer', peerID);
  // });

  socket.on('userExited', (streamID, peerID, room) => {
    io.to(room).emit('userLeft', streamID, peerID);
    socket.leave(room);
  });

  socket.on('new message', (data, room) => {
    socket.broadcast.emit('To Receiver');
    socket.emit('new message received', data);
    socket.to(room).emit('new message received', data);
  });

  socket.on('disconnect', () => {});
});

// peer server
const peerServer = PeerServer({
  port: 9000,
  path: '/peerjs',
});

peerServer.on('connection', client => {
  console.log('new PEER client: ', client.id);
});
peerServer.on('disconnect', client => {
  console.log('PEER client disconnected: ', client.id);
});

// connect to mongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`))
  )
  .catch(error => console.log(error.message));
