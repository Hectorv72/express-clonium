import Board from "./board.class";
import Game from "./game.class";
import Player, { IObjectPlayer } from "./player.class";

export interface IObjectRoom {
  players: Array<IObjectPlayer>
  room: string,
  host: Player
}
export interface IRoom {
  players : Array<Player>,
  room : string,
  game: Game,
  host: Player
}
class Room {
  private _players : Array<Player> = []
  private _room : string
  private _game : Game
  private _host : Player

  constructor(host: Player,players: Array<Player>, room: string){
    this._host = host
    this._players = players
    this._room = room
  }

  public get room () : string {
    return this._room
  }

  public get game () : Game {
    return this._game
  }

  public set host (host : Player) {
    this._host = host
  }

  public get host () : Player {
    return this._host
  }

  public addPlayerToRoom (player: Player) : Promise<boolean> {
    return new Promise((resolve,reject) => {
      try {
        const list_players = this._players
        const exists = list_players.find((element : Player) => element.name === player.name);
        if(!exists){
          list_players.push(player)
          return resolve(true)
        } else {
          return resolve(false)
        }
      } catch (error) {
        return reject(error)
      }
    })
  }

  public findPlayerInRoom (player : Player) : Player | undefined {
    const player_found = this._players.find(
      (element : Player) =>
        element.name === player.name
    )
    return player_found || undefined;
  }

  public joinPlayerToGame (host: Player, player: Player) {
    if(host.socket.id === this.host.socket.id){
      const player_added = this.findPlayerInRoom(player)
      if(player_added){
        this._game.addPlayerToGame(player_added)
      }
    }
  }

  public createGame (width: number, height:number, players: Array<Player>){
    const board = new Board(width, height);
    this._game = new Game(board, players, 1);
  }

  public async startGame () {
    try {
      await this._game.setChipsPlayes()
    } catch (error) {
      console.log(error)
    }
  }

}

export default Room