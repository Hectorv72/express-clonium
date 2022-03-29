const { io } = require('../../connection/socket');

module.exports = () => {
  io.emit('clear-messages');
};
