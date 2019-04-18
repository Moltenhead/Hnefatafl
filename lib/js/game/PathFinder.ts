import * as math from "mathjs";
import { Matrix } from "mathjs";
export class PathFinder
{
  private _matrix: Matrix;
  constructor(columnsNb: number, rowsNb: number) {
    this._matrix = <Matrix>math.zeros([columnsNb, rowsNb]);
  }

  get matrix() { return <Matrix>this._matrix }
}