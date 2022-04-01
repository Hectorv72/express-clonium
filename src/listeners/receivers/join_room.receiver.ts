import Game, { IObjectGame } from '@class/game.class';
import Room from '@class/room.class';
import { socketgame } from '@connection/socket';
import { Socket } from 'socket.io';

export const joinRoom = async (socket : Socket, room: string) => {
  await socketgame.joinRoom(socket,room);
  // if (find_game) {
  //   const game : IObjectGame = find_game.getObjectGame();
  //   socket.emit('join-room', game);
  // }
};
