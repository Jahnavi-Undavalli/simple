const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { connectDB } = require('./config');
const routes = require('./routes');
const { setupCronJobs } = require('./cronJobs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
connectDB();
setupCronJobs(io);

app.use('/api', routes);

io.on('connection', (socket) => {
  console.log('User connected for real-time updates');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
