import Player, { IObjectPlayer, IPlayer } from '@class/player.class';

export interface IChip{
  player : Player,
  value : number
}

export interface IObjectChip{
  player : IObjectPlayer,
  value: number
}

export class Chip {
  private _player : Player
  private _value : number

  constructor (player: Player, value?: number) {
    this._player = player;
    this._value = value || 1;
  }

  public set value (value : number) {
    this._value = value;
  }

  public get value () : number {
    return this._value;
  }

  public get player () {
    return this._player;
  }

  public set player (player : Player) {
    this._player = player;
  }

  public addPoint (aument?:number) {
    this._value += aument || 1;
  }

  public getChip () : IChip {
    return {
      player: this._player,
      value: this._value
    };
  }

  public getObjectChip () : IObjectChip {
    return {
      player: this._player.getObjectPlayer(),
      value: this._value
    };
  }
}

export default Chip;
