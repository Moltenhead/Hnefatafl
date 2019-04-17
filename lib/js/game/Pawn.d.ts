/// <reference types="jquery" />
import { Board } from "./Board";
export declare class Pawn {
    boardParent: Board;
    private _left;
    private _top;
    private _selector;
    private _isDownPressed;
    constructor(board: Board, color: string);
    x: any;
    y: any;
    readonly selector: JQuery<HTMLElement>;
    readonly isDownPressed: Boolean;
    trySetToNearestTile(): void;
}
