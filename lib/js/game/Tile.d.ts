/// <reference types="jquery" />
import { CSSBorders } from '../utilities/ArrayLike';
import { ITile, ITilePosition } from './ITile';
export default class Tile implements ITile {
    _validity?: boolean;
    _container: JQuery;
    _selector: JQuery;
    _color: string;
    _border: CSSBorders;
    top: number;
    left: number;
    position: ITilePosition;
    constructor(container: JQuery, size: number, columnIndex: number, rowIndex: number);
    readonly selector: JQuery<HTMLElement>;
    validity: boolean;
    col: number;
    row: number;
    color: string;
    border: CSSBorders;
    readonly container: JQuery<HTMLElement>;
    locationToString(): string;
}
