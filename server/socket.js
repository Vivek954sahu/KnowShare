let io;

export const setupSocket = (serverIO) => {
  io = serverIO;

  io.on('connection', (socket) => {
    console.log('🟢 New client connected');

    socket.on('newComment', (data) => {
      socket.broadcast.emit('newComment', data); // Real-time comment sharing
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected');
    });
  });
};

// Export getter for io to use in controllers
export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};