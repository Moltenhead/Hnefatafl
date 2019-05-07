import ITileMap from "./ITileMap";
import { Pawn } from "./Pawn";
export interface IBoard extends ITileMap {
    tileColors: string[];
    tileBorders: Array<number | string>;
    colorize(): void;
    getColor(index: number): string;
    append(object: Pawn): void;
}
