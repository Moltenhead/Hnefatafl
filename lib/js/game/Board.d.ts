/// <reference types="jquery" />
import TileMap from "./TileMap";
import Tile from "./Tile";
import { Pawn } from "./Pawn";
export declare class Board extends TileMap {
    tileColors: string[];
    tileBorders: Array<number | string>;
    constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number, tileColors: Array<string>, tileBorders: Array<number | string>);
    colorize(): void;
    getColor(index: number): string;
    append(pawn: Pawn): void;
}
export declare class TaflBoard extends Board {
    cToC: Path2D;
    castles: Tile[];
    fullSizeCanvas: HTMLCanvasElement;
    constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number, tileColors: Array<string>, tileBorders: Array<number | string>);
}
