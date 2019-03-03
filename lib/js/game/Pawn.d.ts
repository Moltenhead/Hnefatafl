import { Board } from "./Board";
export declare class Pawn {
    boardParent: Board;
    private _left;
    private _right;
    private _selector;
    private _isDownPressed;
    constructor(board: Board, color: String);
    x: any;
    y: any;
    readonly selector: JQuery<HTMLElement>;
    readonly isDownPressed: JQuery<HTMLElement>;
    trySetToNearestTile(): void;
}
