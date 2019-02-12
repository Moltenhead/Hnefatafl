// import { Tile } from "./Tile"

class TileMap
{
    // _name;
    // _selector;
    // _tileContainer;

    // _wrapper;

    // _tileSize;

    // _columnsNb;
    // _rowsNb;

    // _width;
    // _height;

    // _grid;

  constructor(wrapper, tileSize, columnsNb, rowsNb) {
    if (!wrapper) {
      console.error("TileMap needs a wrapper as first parameter.")
      return;
    }

    this._name = "TileMap";
    this._width = tileSize * columnsNb;
    this._height = tileSize * rowsNb;
    this._columnsNb = columnsNb;
    this._rowsNb = rowsNb;

    this._selector = jQuery("<div/>", {
      class: 'tile-map ' + columnsNb +  "-col " + rowsNb + "-row"
    });
    this._selector.css({
      'width': this._width + "px",
      'height': this._height + "px",
      'display': "flex",
      'justifyContent': "center",
      'alignItems': "center"
    });

    this._tileContainer = jQuery("<div/>", {
      class: 'tile-container'
    });

    this._tileContainer.css({
      'width': this._width + "px",
      'height': this._height + "px",
      'display': "grid",
      'position': "relative",
      'grid-template-columns': "repeat(" + columnsNb + ", " + tileSize + "px)",
      'grid-template-rows': "repeat(" + rowsNb + ", " + tileSize + "px)"
    });

    this._wrapper = wrapper;
    this._tileSize = tileSize;

    this._grid = math.zeros(columnsNb, rowsNb);

    var _this = this;
    this._grid.forEach(function (value, index) {
      var c = index[0];
      var r = index[1];
      _this.appendTile(c, r, new Tile(_this.selector, _this._tileSize, c, r));
    });

    for (var c = 0; c < columnsNb; c++) {
      for (var r = 0; r < rowsNb; r++) {
        
      }
    }

    this._pathFinder = new PathFinder(columnsNb, rowsNb);

    this._selector.append(this._tileContainer);
    this._wrapper.append(this._selector);

    return this;
  }

  get selector() { return this._selector; }
  get grid() { return this._grid; }

  appendTile(column, row, tile) {
    console.debug(this._grid.subset(math.index(column, row)));
    this._grid.subset(math.index(column, row), tile);
    this._tileContainer.append(tile._selector);
  }

  getTileAt(col, row) {
    return this.grid[col][row];
  }
}
