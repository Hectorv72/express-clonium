import { socketgame } from "@connection/socket";
import { IError } from "@listeners/interfaces";
import { create_player, game_error } from "@listeners/list";
import { error_action, invalid_data } from "@listeners/list_actions";
import { Socket } from "socket.io";

export const createPlayer = async (socket : Socket,name : string) => {
  try {
    if(name){
      socketgame.createPlayer(socket,name);
      socket.emit(create_player,name);
      return
    }
    const error_message : IError = { type: 'player', action: invalid_data, message: 'Debe ingresar un nombre'};
    socket.emit(game_error,error_message);
  } catch (error : Error | any) {
    console.log(error)
    const error_message : IError = {type: 'player', action: error_action, message: (error || 'Error al crear el jugador')};
    socket.emit(game_error,error_message);
  }
}