import Player from "@class/player.class";
import { socketgame } from "@connection/socket";
import { IError } from "@listeners/interfaces";
import { create_player, game_error, get_player } from "@listeners/list";
import { data_undefined } from "@listeners/list_actions";
import { Socket } from "socket.io";

export const getPlayer = async (socket : Socket) => {
  try {
    const player : Player = socket.data.player
    if(player){
      return socket.emit(get_player,player.name);
    }

    const error_message : IError = {type:'player', action: data_undefined, message: 'Error al obtener el jugador'};
    socket.emit(game_error,error_message);

  } catch (error : Error | any) {
    console.log(error)
    const error_message : IError = {type:'player',action: data_undefined, message: 'Error al obtener el jugador'};
    socket.emit(game_error,error_message);
  }
}