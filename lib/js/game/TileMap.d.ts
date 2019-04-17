/// <reference types="jquery" />
import { Tile } from "./Tile";
import { Matrix } from "mathjs";
import { PathFinder } from "./PathFinder";
import { ICoordinates } from '../utilities/ICoordinates';
import { ITile, ITilePosition } from './ITile';
export default class TileMap {
    name: string;
    selector: JQuery;
    tileContainer: JQuery;
    pathFinder: PathFinder;
    wrapper: JQuery;
    tileSize: number;
    columnsNb: number;
    rowsNb: number;
    width: number;
    height: number;
    grid: Matrix;
    constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number);
    appendTile(column: number, row: number, tile: Tile): void;
    coordToPos(coordinates: ICoordinates): ITilePosition;
    getTileAt(col: number, row: number): Tile;
    getNearestTile(coordinates: ICoordinates): ITile;
}
