import Board, { IObjectBoard } from './board.class';
// import Box from './box.class';
import Player, { IPlayer } from './player.class';

export interface IGame {
  players: Array<Player>,
  gameboard: Board,
  room: string,
  turn: number
}

export interface IObjectGame {
  players: Array<IPlayer>,
  gameboard: IObjectBoard,
  room: string,
  turn: number
}

class Game {
  private _players : Array<Player>
  private _gameboard : Board
  private _room : string
  private _turn: number

  constructor (players: Array<Player>, gameboard: Board, room: string, turn?:number) {
    this._players = players;
    this._gameboard = gameboard;
    this._room = room;
    this._turn = turn || 1;
  }

  public getGame () : IGame {
    return {
      players: this._players,
      gameboard: this._gameboard,
      room: this._room,
      turn: this._turn
    };
  }

  public getObjectGame () : IObjectGame {
    const players = this._players.map(
      player => player.getPlayer()
    );

    return {
      players,
      gameboard: this._gameboard.getObjectBoard(),
      room: this._room,
      turn: this._turn
    };
  }

  // private watchChanges () {
  //   const board = this._gameboard.getBoard();
  //   board.map()
  // }

  private nextTurn () {
    if (this._turn >= this._players.length) {
      this._turn = 1;
    } else {
      this._turn += 1;
    }
  }

  // public actionAddPoint (player:Player, row:number) {
  //   if (this._turn.getTurn() === player.getTurn()) {

  //   }
  // }
}

export default Game;
