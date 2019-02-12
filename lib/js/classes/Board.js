// import { TileMap } from "./TileMap"

class Board extends TileMap
{
  // _tileColors;

  constructor(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) {
    super(wrapper, tileSize, columnsNb, rowsNb);

    this._name = "Board:" + columnsNb + "x" + rowsNb;

    this._selector.css({
      'width': (this._width + tileSize * 2) + "px",
      'height': (this._height + tileSize * 2) + "px",
      'backgroundColor': tileColors[2]
    });

    this.selector.addClass("board");

    this._tileColors = tileColors;
    this._tileBorders = tileBorders

    var _this = this
    tileColors.forEach(function(color, i) {
      _this._tileColors[i] = color;
    });
    this.colorize();

    return this;
  }

  colorize() {
    var _this = this;
    this._grid.forEach(function(col, c) {
      col.forEach( function(tile, r) {
        tile.color = ((c + r) % 2 === 0) ? _this.getColor(0) : _this.getColor(1);
        if (_this._tileBorders) {
          var endString = "px " + _this._tileBorders[1] + " " + _this.getColor(3);
          var fullString =_this._tileBorders[0] + endString;
          var halvedString =_this._tileBorders[0] / 2 + endString;
          var borders = {
            left: undefined,
            right: undefined,
            top: undefined,
            bottom: undefined,
          };
          jQuery.each(borders, function(index) {
            borders[index] = halvedString;
          })

          if(c === 0) {
            borders.top = fullString;
          }
          if(c >= _this._columnsNb - 1) {
            borders.bottom = fullString;
          }
          if (r === 0) {
            borders.left = fullString;
          }
          if (r >= _this._rowsNb - 1) {
            borders.right = fullString;
          }

          // console.debug(borders);
          tile.border = borders;
        }
      });
    });
  }

  getColor(index) {
      return this._tileColors[index];
  }
}
