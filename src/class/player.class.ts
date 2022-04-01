import { randomString } from "@utilities/random_string.utility";
import { Socket } from "socket.io";

export interface IObjectPlayer {
  name: string,
  color: string,
  turn: number
}

export interface IAddPlayer{
  name: string,
  color: string
}

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

  constructor (name: string, color: string, socket: Socket) {
    this._id = randomString(6);
    this._name = name;
    this._color = color;
    this._socket = socket;
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
}

export default Player;
