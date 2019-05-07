import { CSSBorders } from '../utilities/ArrayLike';
import { Board } from './Board';

export interface ITile
{
  readonly _validity?: boolean;
  readonly _container: IBoard;

  readonly _selector: JQuery;

  color: string;
  border: CSSBorders;

  top: number;
  left: number;

  position: ITilePosition;

  locationToString(): string;
}

export interface ITilePosition
{
  col: number;
  row: number;
}