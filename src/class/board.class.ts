import Box, { IObjectBox } from '@class/box.class';
import { createBoard } from './methods/createBoard.board';

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
    this._board = createBoard(width, height);
  }

  public get board () : Array<Box[]> {
    return this._board;
  }

  public getBoard () : IBoard {
    return {
      width: this._width,
      height: this._height,
      board: this._board
    };
  }

  public getObjectBoard () : IObjectBoard {
    const board = this._board.map(
      row => row.map((box : Box) => box.getObjectBox())
    );
    return {
      width: this._width,
      height: this._height,
      board
    };
  }

  public getPositionBox (row:number, col:number) : Box | undefined {
    const _row = this._board[row];
    if (_row) {
      return _row[col];
    } else {
      return undefined;
    }
  }
}

export default Board;
