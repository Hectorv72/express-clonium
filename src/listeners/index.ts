import { Socket } from 'socket.io';
import { addChip } from './receivers/add_chip.receiver';
import { add_chip, create_room } from './listeners_list';
import { socketgame } from '@connection/socket';
import { createRoom } from './receivers/create_room';
import { IAddPlayer } from '@class/player.class';

export const connection = (socket : Socket) => {
  // socket.join('asdas');
  console.log('usuario conectado');
  socket.on(create_room, (player : IAddPlayer) => createRoom(socket,player))
  // socket.on(add_chip, (data) => addChip(socket, data));
  // console.log([...socket.rooms.values()][1]);
  // socket.gameroom = 'asdasd';
  // console.log(socket.gameroom);
  // const {gameroom} = socket
  // socket.on();
};
