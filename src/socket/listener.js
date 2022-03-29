// const { io } = require('../connection/socket');
// const login_room = require('./listeners/login_room.listener');
const send_message = require('./listeners/send_message.listener');
const clear_messages = require('./listeners/clear_messages.listener');

const listener = (socket) => {
  // socket.on('login-room', (data) => login_room(socket, data));
  socket.on('send-message', send_message);
  socket.on('clear-messages', clear_messages);
};

module.exports = listener;
