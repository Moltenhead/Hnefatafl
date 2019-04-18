import { CSSBorders } from '../utilities/ArrayLike';
// import { ITile } from './ITile';

export default class Tile
{
  private _container: JQuery;

  private _selector: JQuery;

  public top: number;
  public left: number;

  public col: number;
  public row: number;

  private _color: string;
  private _border: CSSBorders;

  constructor(container: JQuery, size: number, columnIndex: number, rowIndex: number) {
    if (!container) {
      console.error("Tile needs a JQuery parent as 1st argument.")
      return
    }
    this._container = container;

    this._selector = jQuery("<div/>", {
      class: "tile"
    })

    this.col = columnIndex;
    this.row = rowIndex;

    this.border = new CSSBorders("none");

    this.selector.css({
      width: size + "px",
      height: size + "px",
      position: "absolute",
      gridArea: (this.col + 1) + " / " + (this.row +1)
    });

    return this
  }

  // GET / SET
  get selector() { return this._selector; }

  // set y(v) { this._top = v; }
  // get y() { return this._top; }
  // set x(v) { this._left = v; }
  // get x() { return this._left; }

  set color(v) {
    this._color = v;
    this.selector.css('backgroundColor', v);
  }
  set border(v: CSSBorders) {
    this._border = v;
    this.selector.css({
      'borderTop': v.top,
      'borderRight': v.right,
      'borderBottom': v.bottom,
      'borderLeft': v.left
    });
  }
  get border() {
    return this._border;
  }
  //  read only
  get container() { return this._container; }
  get color() { return this._color; }

  // METHODS
  locationToString() {
    return `${this.col}:${this.row}`
  }
}
