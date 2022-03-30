export interface IPlayer {
  id: number,
  name: string,
  color: string,
  turn: number
}

class Player {
  private _id : number;
  private _name : string;
  private _color : string;
  private _turn : number;

  constructor (id: number, name: string, color: string, turn: number) {
    this._id = id;
    this._name = name;
    this._color = color;
    this._turn = turn;
  }

  public getTurn = () : number => {
    return this._turn;
  }

  public getPlayer = () : IPlayer => {
    return {
      id: this._id,
      name: this._name,
      color: this._color,
      turn: this._turn
    };
  }
}

export default Player;
