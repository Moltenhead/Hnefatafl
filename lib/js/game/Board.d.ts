import TileMap from "./TileMap";
export declare class Board extends TileMap {
    tileColors: string[];
    tileBorders: Array<number | string>;
    constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number, tileColors: Array<string>, tileBorders: Array<number | string>);
    colorize(): void;
    getColor(index: any): string;
}
export declare class TaflBoard extends Board {
    cToC: Path2D;
    castles: Array<HTMLCollection>;
    fullSizeCanvas: HTMLCanvasElement;
    constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number, tileColors: Array<String>, tileBorders: Array<number | String>);
}
