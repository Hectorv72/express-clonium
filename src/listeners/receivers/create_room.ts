import { IAddPlayer } from "@class/player.class"
import { io, socketgame } from "@connection/socket"
import { create_room, game_error } from "@listeners/listeners_list"
import { Socket } from "socket.io"

export const createRoom = async (socket : Socket,player : IAddPlayer) => {
  try {
    if(!socket.data.room){
      const result = await socketgame.createRoom(socket,player);
      if(result){
        socket.emit(create_room,'se creó el room');
        // console.log(socket.data)
        console.log(socketgame.rooms);
        // console.log(io.sockets.adapter.rooms)
      } else {
        socket.emit(create_room,'no se creo el room');
      }
    } else {
      socket.emit(create_room, 'el usuario ya tiene una room')
    }
    
  } catch (error) {
    socket.emit(game_error,'ocurrió un problemita')
  }
  
}