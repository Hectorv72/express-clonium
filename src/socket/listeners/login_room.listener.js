module.exports = (socket, room) => {
  socket.join(room);
  socket.emit('login-room', room);
};
