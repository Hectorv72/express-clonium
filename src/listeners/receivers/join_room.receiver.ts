import Game, { IObjectGame } from '@class/game.class';
import { IAddPlayer } from '@class/player.class';
import Room from '@class/room.class';
import { socketgame } from '@connection/socket';
import { Socket } from 'socket.io';

export const joinRoom = async (socket : Socket, player: IAddPlayer, room: string) => {
  await socketgame.joinRoom(socket,player,room);
  // if (find_game) {
  //   const game : IObjectGame = find_game.getObjectGame();
  //   socket.emit('join-room', game);
  // }
};
