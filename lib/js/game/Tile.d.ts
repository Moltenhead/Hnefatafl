/// <reference types="jquery" />
import { CSSBorders } from '../utilities/ArrayLike';
export declare class Tile {
    private _container;
    private _selector;
    top: number;
    left: number;
    col: number;
    row: number;
    private _color;
    private _border;
    constructor(container: JQuery, size: number, columnIndex: number, rowIndex: number);
    readonly selector: JQuery<HTMLElement>;
    color: any;
    border: CSSBorders;
    readonly container: JQuery<HTMLElement>;
    locationToString(): string;
}
