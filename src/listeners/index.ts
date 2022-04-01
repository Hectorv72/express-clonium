import { Socket } from 'socket.io';
import { addChip } from './receivers/add_chip.receiver';

export const connection = (socket : Socket) => {
  // socket.join('asdas');
  console.log('usuario conectado');
  socket.on('add-chip', (data) => addChip(socket, data));
  // console.log([...socket.rooms.values()][1]);
  // socket.gameroom = 'asdasd';
  // console.log(socket.gameroom);
  // const {gameroom} = socket
  // socket.on();
};
