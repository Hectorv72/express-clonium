const { server, port, io } = require('./connection/socket');
const listener = require('./socket/listener');

const run = () => {
  server.listen(port, function () {
    console.log('Servidor corriendo en http://localhost:' + port);
  });
  io.on('connection', listener);
};

run();
