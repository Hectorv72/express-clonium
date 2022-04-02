import { IAddPlayer } from "@class/player.class"
import { io, socketgame } from "@connection/socket"
import { create_room, game_error } from "@listeners/list"
import { Socket } from "socket.io"
import { IError } from "@listeners/interfaces"

export const createRoom = async (socket : Socket,player : IAddPlayer) => {
  try {
    if(!socket.data.room){
      const room = await socketgame.createRoom(socket,player);
      socket.emit(create_room,room);
    } else {
      console.log(socketgame.rooms)
      socket.emit(create_room, 'el usuario ya tiene una room')
    }
  } catch (error) {
    console.log(error);
    const error_message : IError = {type:'room', action:'create', message: 'error al crear la sala'};
    socket.emit(game_error,error_message);
  }
}