import { add_chip } from "@listeners/list";
import { randomString } from "@utilities/random_string.utility";
import { Socket } from "socket.io";

export interface IObjectPlayer {
  name: string,
  color: string,
  turn: number
}

// export interface IAddPlayer{
//   name: string,
//   color?: string
// }

export interface IPlayer {
  id: string,
  name: string,
  color: string,
  turn: number,
  socket: Socket
}

class Player {
  private _id : string;
  private _name : string;
  private _color : string;
  private _socket: Socket
  private _turn : number;
  private _address: string;

  constructor (socket: Socket, name: string) {
    this._id = randomString(6);
    this._name = name;
    this._socket = socket;
    this._socket.data.player = this;
    this._address = socket.handshake.address;
    this.listenActions()
  }

  public get name () : string {
    return this._name;
  }

  public set name (name: string) {
    this._name = name;
  }

  public get turn () : number {
    return this._turn;
  }

  public set turn (turn : number) {
    this._turn = turn;
  }

  public get socket () : Socket {
    return this._socket;
  }

  public set socket (socket : Socket) {
    this._socket = socket;
  }

  public get address () : string {
    return this._address;
  }

  public set color (color: string) {
    this._color = color;
  }

  public get color () : string {
    return this._color;
  }

  public getPlayer = () : IPlayer => {
    return {
      id: this._id,
      name: this._name,
      color: this._color,
      turn: this._turn,
      socket: this._socket
    };
  }

  public getObjectPlayer = () : IObjectPlayer => {
    return {
      name: this._name,
      color: this._color,
      turn: this._turn,
    };
  }

  private listenActions() {
    const socket = this._socket
    socket.on(add_chip,(data)=>console.log(data));
  }

  public updateGameValues (name: string, color: string) {
    this._name = name;
    this._color = color;
  }
}

export default Player;
