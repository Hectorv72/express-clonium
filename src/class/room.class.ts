import Board from "./board.class";
import Game from "./game.class";
import Player from "./player.class";

class Room {
  private _players : Array<Player>
  private _room : string
  private _game : Game

  constructor(players: Array<Player>, room: string){
    this._players = players
    this._room = room
  }

  get room () : string {
    return this._room
  }

  get game () : Game {
    return this._game
  }

  public createGame (width: number, height:number, players: Array<Player>){
    const board = new Board(width, height);
    this._game = new Game(board, players, 1);
  }

}

export default Room