import { socketgame } from "@connection/socket"
import { create_room, game_error } from "@listeners/list"
import { Socket } from "socket.io"
import { IError } from "@listeners/interfaces"

export const createRoom = async (socket : Socket) => {
  console.log('aaa')
  try {
    if(!socket.data.room){
      const room = await socketgame.createRoom(socket);
      socket.emit(create_room,room);
    } else {
      console.log(socketgame.rooms)
      const error_message : IError = {type:'room', action:'create', message: 'El usuario ya tiene una sala'};
      socket.emit(game_error, error_message)
    }
  } catch (error: Error | any) {
    console.log(error)
    const error_message : IError = {type:'room', action:'create', message: (error?.message || 'error al crear la sala')};
    socket.emit(game_error,error_message);
  }
}