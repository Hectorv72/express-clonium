import Box from '@class/box.class';

export const createBoard = (width:number, height:number) : Array<Box[]> => {
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
};
