import Board, { IObjectBoard } from '@class/board.class';
// import Box from '@class/box.class';
import Player, { IPlayer } from '@class/player.class';
import { actionClickChip } from './methods/actionClickChip.game';
import { watchChanges } from './methods/watchChanges.game';

export interface IGame {
  players: Array<Player>,
  gameboard: Board,
  turn: number
}

export interface IObjectGame {
  players: Array<IPlayer>,
  gameboard: IObjectBoard,
  turn: number
}

class Game {
  private _players : Array<Player>
  private _gameboard : Board
  private _turn: number

  constructor (gameboard: Board, players: Array<Player>, turn?:number) {
    this._players = players;
    this._gameboard = gameboard;
    this._turn = turn || 1;
  }

  public getGame () : IGame {
    return {
      players: this._players,
      gameboard: this._gameboard,
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
      turn: this._turn
    };
  }

  private watchChanges () {
    const game = this.getGame();
    watchChanges(game);
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
    // console.log('player turn =>', player.turn);
    // console.log('game turn =>', game.turn);
    try {
      const action = await actionClickChip(game, player, row, col);
      console.log('actionClickChip promise response => ', action);
      if (action) {
        this.nextTurn();
        this.watchChanges();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Game;
