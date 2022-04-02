import { IAddPlayer } from '@class/player.class';
import Room from '@class/room.class';
import { socketgame } from '@connection/socket';
import { IError } from '@listeners/interfaces';
import { game_error, join_room } from '@listeners/list';
import { Socket } from 'socket.io';

export const joinRoom = async (socket : Socket, player: IAddPlayer, room: string) => {

  try {
    if(!socket.data.room){
      await socketgame.joinRoom(socket,player,room);
      socket.emit(join_room,'logeado')
    }
  } catch (error) {
    console.log(error);
    const error_message : IError = {type:'room', action:'create', message: 'error al unirte a la sala'};
    socket.emit(game_error,error_message);
  }
};
