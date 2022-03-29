const { io } = require('../../connection/socket');

module.exports = (data) => {
  io.emit('send-message', data);
};
