import Board, { IObjectBoard } from '@class/board.class';
import Box from '@class/box.class';
import Player, { IPlayer } from '@class/player.class';
import { actionClickChip } from './methods/actionClickChip.game';
import { watchChanges } from './methods/watchChanges.game';

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
    const players : Array<IPlayer> = this._players.map(
      player => player.getPlayer()
    );

    return {
      players,
      gameboard: this._gameboard.getObjectBoard(),
      room: this._room,
      turn: this._turn
    };
  }

  private watchChanges () {
    const game = this.getGame();
    watchChanges(game);
    // console.log(changes);
  }

  private nextTurn () {
    if (this._turn >= this._players.length) {
      this._turn = 1;
    } else {
      this._turn += 1;
    }
  }

  public async actionClickChip (player: Player, row: number, col: number) {
    const game : IGame = this.getGame();
    try {
      const action = await actionClickChip(game, player, row, col);
      if (action) {
        this.nextTurn();
        this.watchChanges();
      } else {
        console.log('actionClickChip promise response => ', action);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Game;
