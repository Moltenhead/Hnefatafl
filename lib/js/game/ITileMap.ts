import { PathFinder } from "./PathFinder";
import Tile from "./Tile"
import { Matrix } from "mathjs";
import { ITilePosition } from "./ITile";
import { ICoordinates } from "../utilities/ICoordinates";

export default interface ITileMap
{
  readonly _name: string;
  readonly _selector: JQuery;
  readonly _tileContainer: JQuery;
  readonly _pathFinder: PathFinder;

  wrapper: JQuery;

  tileSize: number;

  columnsNb: number;
  rowsNb: number;

  width: number;
  height: number;

  grid: Matrix;

  appendTile(column: number, row: number, tile: Tile): void;
  coordToPos(coordinates: ICoordinates): ITilePosition;
  getTileAt(position: ITilePosition): Tile;
  getNearestTile(where: ICoordinates | ITilePosition): Tile;
}