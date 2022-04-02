import Game from '@class/game.class';
import Player from '@class/player.class';
import { Socket } from 'socket.io';

interface Position {
  row: number,
  col: number
}

export const addChip = (socket : Socket, data : Position) => {
  const game : Game = socket.data.game;
  const player : Player = socket.data.player;
  const {row,col} = data
  if(game){
    if(player){
      game.actionClickChip(player,row,col)
    }
  }
};
