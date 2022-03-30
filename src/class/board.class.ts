import Box, { IObjectBox } from './box.class';

export interface IBoard {
  width: number,
  height: number,
  board: Array<Box[]>
}

export interface IObjectBoard {
  width: number,
  height: number,
  board: Array<IObjectBox[]>
}

class Board {
  private _width : number;
  private _height: number;
  private _board : Array<Box[]>;

  constructor (width:number, height:number) {
    this._width = width;
    this._height = height;
    this._board = this.createBoard();
  }

  private createBoard () : Array<Box[]> {
    const [width, height] = [this._width, this._height];
    const rows : Array<Box[]> = [];

    for (let row = 0; row < width; row++) {
      const cols : Array<Box> = [];

      for (let col = 0; col < height; col++) {
        const id = (col + 1) + (height * row);
        const box = new Box(id, row, col);
        cols.push(box);
      }

      rows.push(cols);
    }

    return rows;
  }

  public getBoard () : Array<Box[]> {
    return this._board;
  }

  public getObjectBoard () : IObjectBoard {
    const board = this._board.map(
      row => row.map(
        box => box.getObjectBox()
      )
    );
    return {
      width: this._width,
      height: this._height,
      board
    };
  }

  public getRow (row:number) : Array<Box> {
    return this._board[row];
  }

  public getPositionBox (row:number, col:number) : Box | undefined {
    const _row = this.getRow(row);
    if (_row) {
      return _row[col];
    } else {
      return undefined;
    }
  }
}

export default Board;
