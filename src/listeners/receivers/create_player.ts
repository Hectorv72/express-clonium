import { socketgame } from "@connection/socket";
import { IError } from "@listeners/interfaces";
import { create_player, game_error } from "@listeners/list";
import { Socket } from "socket.io";

export const createPlayer = async (socket : Socket,name : string) => {
  try {
    let message = ''
    if(name){
      if(!socket.data.player){
        socketgame.createPlayer(socket,name);
        socket.emit(create_player,name);
        return
      } else {
        message = 'Ya cuenta con un usuario'
      }
    } else {
      message = 'Debe ingresar un nombre'
    }
    const error_message : IError = {type:'player', action:'create', message};
    socket.emit(game_error,error_message);
  } catch (error : Error | any) {
    console.log(error)
    const error_message : IError = {type:'player', action:'create', message: (error || 'Error al crear el jugador')};
    socket.emit(game_error,error_message);
  }
}