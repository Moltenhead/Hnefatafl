import { Tile } from "./Tile";
import { Matrix } from "mathjs";
import * as math from "mathjs";
import { PathFinder } from "./PathFinder";
import { ICoordinates } from '../utilities/ICoordinates';
import { ITile } from './ITile';

export default class TileMap
{
  public name: String;
  public selector: JQuery;
  public tileContainer: JQuery;
  public pathFinder: PathFinder;

  public wrapper: JQuery;

  public tileSize: number;

  public columnsNb: number;
  public rowsNb: number;

  public width: number;
  public height: number;

  public grid: Matrix;

  constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number) {
    if (!wrapper) {
      console.error("TileMap needs a wrapper as first parameter.")
      return;
    }

    this.name = "TileMap";
    this.width = tileSize * columnsNb;
    this.height = tileSize * rowsNb;
    this.columnsNb = columnsNb;
    this.rowsNb = rowsNb;

    this.selector = jQuery("<div/>", {
      class: 'tile-map ' + columnsNb +  "-col " + rowsNb + "-row"
    });
    this.selector.css({
      'width': this.width + "px",
      'height': this.height + "px",
      'display': "flex",
      'justifyContent': "center",
      'alignItems': "center"
    });

    this.tileContainer = jQuery("<div/>", {
      class: 'tile-container'
    });

    this.tileContainer.css({
      'width': this.width + "px",
      'height': this.height + "px",
      'display': "grid",
      'position': "relative",
      'grid-template-columns': "repeat(" + columnsNb + ", " + tileSize + "px)",
      'grid-template-rows': "repeat(" + rowsNb + ", " + tileSize + "px)"
    });

    this.wrapper = wrapper;
    this.tileSize = tileSize;

    this.grid = <Matrix>math.zeros(columnsNb, rowsNb, "dense");

    var _this = this;
    this.grid.map(function (value: any, index: number, matrix: Matrix) {
      var row: number = 0;
      var i: number = 0;
      while (i <= index) {
        for (var j: number = 0; j < _this.columnsNb; j++) {
          if (i < _this.columnsNb) {
            i++
          } else { return; }
        }
        row ++;
      }
      var c = index / row;
      var r = row;
      _this.appendTile(c, r, new Tile(_this.selector, _this.tileSize, c, r));
    });

    for (var c = 0; c < columnsNb; c++) {
      for (var r = 0; r < rowsNb; r++) {
        
      }
    }

    this.pathFinder = new PathFinder(columnsNb, rowsNb);

    this.selector.append(this.tileContainer);
    this.wrapper.append(this.selector);

    return this;
  }

  // get selector() { return this.selector; }
  // get grid() { return this.grid; }

  appendTile(column: number, row: number, tile: Tile) {
    console.debug(this.grid.subset(math.index(column, row)));
    this.grid.subset(math.index(column, row), tile);
    this.tileContainer.append(tile.selector);
  }

  coordToPos(coordinates: ICoordinates) {
    var tilePosition: ITilePosition = {
      col: coordinates.x,
      row: coordinates.y
    };
    return tilePosition;
  }

  getTileAt(col: number, row: number) {
    return <Tile>this.grid.get([col, row]);
  }

  getNearestTile(coordinates: ICoordinates) {
    var position = this.coordToPos(coordinates);
    var tile: ITile = {
      validity: false,
      tile: this.getTileAt(position.col, position. row);
    };

    return tile;
  }
}
