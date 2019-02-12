class Tile
{
  // _container;

  // _selector;

  // _top;
  // _left;

  // _colName;
  // _rowName;

  // _color;

  constructor(container, size, columnIndex, rowIndex) {
    if (!container) {
      console.error("Tile needs a parent as 1st argument.")
    }
    this._container = container;

    this._selector = jQuery("<div/>", {
      class: "tile"
    })

    this._col = columnIndex;
    this._row = rowIndex;

    this._border = 'none';

    this.selector.css({
      'width': size + "px",
      'height': size + "px",
      'position': "absolute",
      'gridArea': (this._col + 1) + " / " + (this._row +1)
    });

    return this
  }

//  GET / SET
    get selector() { return this._selector; }

    // set y(v) { this._top = v; }
    // get y() { return this._top; }
    // set x(v) { this._left = v; }
    // get x() { return this._left; }

    set col(v) { this._colName = v; }
    get col() { return this._colName; }
    set row(v) { this._rowName = v; }
    get row() { return this._rowName; }
    set color(v) {
      this._color = v;
      this.selector.css({
        'backgroundColor': v
      });
    }
    set border(v) {
      this._border = v;
      this.selector.css({
        'borderTop': v.top,
        'borderRight': v.right,
        'borderBottom': v.bottom,
        'borderLeft': v.left
      });
    }
//  read only
    get container() { return this._container; }
    get color() { return this._color; }
}
