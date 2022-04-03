import { socketgame } from '@connection/socket';
import { IError } from '@listeners/interfaces';
import { game_error, join_room } from '@listeners/list';
import { Socket } from 'socket.io';

export const joinRoom = async (socket : Socket, room: string) => {

  try {
    if(!socket.data.room){
      const room_joined = await socketgame.joinRoom(socket,room);
      if(room_joined){
        socket.emit(join_room,room_joined.room)
      }
    }
  } catch (error) {
    console.log(error);
    const error_message : IError = {type:'room', action:'create', message: 'error al unirte a la sala'};
    socket.emit(game_error,error_message);
  }
};
