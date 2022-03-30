import Chip, { IObjectChip } from './chip.class';
import Player from './player.class';

export interface IBox {
  id: number,
  row:number,
  col:number,
  chip: Chip,
}

export interface IObjectBox{
  id: number,
  row:number,
  col:number,
  chip: IObjectChip,
}

class Box {
  private _id : number;
  private _row : number;
  private _col : number;
  private _chip : Chip;

  constructor (id:number, row:number, col:number) {
    this._id = id;
    this._row = row;
    this._col = col;
  }

  public set chip (chip:Chip) {
    this._chip = chip;
  }

  public get chip () : Chip {
    return this._chip;
  }

  public getBox () : IBox {
    return {
      id: this._id,
      row: this._row,
      col: this._col,
      chip: this._chip
    };
  }

  public getObjectBox () : IObjectBox {
    return {
      id: this._id,
      row: this._row,
      col: this._col,
      chip: this._chip?.getObjectChip() || undefined
    };
  }

  public addChip (player: Player) {
    if (!this._chip) {
      this._chip = new Chip(player);
    } else {
      if (this._chip.player === player) {
        this._chip.player = player;
      }
      this._chip.addPoint();
    }
  }
}

export default Box;
