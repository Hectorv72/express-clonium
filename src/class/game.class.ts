import Board, { IObjectBoard } from '@class/board.class';
// import Box from '@class/box.class';
import Player, { IObjectPlayer } from '@class/player.class';
import { actionClickChip } from './methods/actionClickChip.game';
import { watchChanges } from './methods/watchChanges.game';

export interface IGame {
  players: Array<Player>,
  gameboard: Board,
  room: string,
  turn: number
}

export interface IObjectGame {
  players: Array<IObjectPlayer>,
  gameboard: IObjectBoard,
  room: string,
  turn: number
}

class Game {
  private _players : Array<Player>
  private _gameboard : Board
  private _room : string
  private _turn: number
  private _limit_players : number = 4

  constructor (gameboard: Board, players: Array<Player>, turn?:number) {
    this._players = players;
    this._gameboard = gameboard;
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
    const players : Array<IObjectPlayer> = this._players.map(
      player => player.getObjectPlayer()
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

  public addPlayerToGame (player : Player) {
    if(this._players.length < this._limit_players){
      this._players.push(player)
    }
  }

  public setChipsPlayes () : Promise<boolean> {
    return new Promise((resolve,reject) => {
      try {
        const gameboard = this._gameboard.getBoard();
        const players = this._players;

        const { width,height } = gameboard;
        const positions = [[1,1],[height-2,width-2],[1,width-2],[height-2,1]]; //[row,col]
        
        players.forEach(
          (player : Player, key : number) => {
            const [row,col] = positions[key]
            const box = this._gameboard.getPositionBox(row,col);
            if(box){
              box.addChip(player)
            }
          }
        );
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default Game;
