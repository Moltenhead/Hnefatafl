import Tile from './Tile';
export interface ITile
{
  validity: boolean;
  tile: Tile;
}

export interface ITilePosition
{
  col: number;
  row: number;
}