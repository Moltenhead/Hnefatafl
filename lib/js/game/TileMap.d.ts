/// <reference types="jquery" />
import Tile from "./Tile";
import { Matrix } from "mathjs";
import { PathFinder } from "./PathFinder";
import { ICoordinates } from '../utilities/ICoordinates';
import { ITilePosition } from './ITile';
import ITileMap from './ITileMap';
export default class TileMap implements ITileMap {
    _name: string;
    _selector: JQuery;
    _tileContainer: JQuery;
    _pathFinder: PathFinder;
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
    getTileAt(position: ITilePosition): Tile;
    getNearestTile(where: ICoordinates | ITilePosition): Tile;
}
