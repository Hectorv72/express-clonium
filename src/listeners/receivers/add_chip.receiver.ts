import { Socket } from 'socket.io';

interface Position {
  row: number,
  col: number
}

export const addChip = (socket : Socket, data : Position) => {
  console.log('socket =>', socket);
  console.log(data);
  console.log('gameroom =>', socket.data.gameroom);
};
