import Tile from "./Tile";
import { Matrix } from "mathjs";
import * as math from "mathjs";
import { PathFinder } from "./PathFinder";
import { ICoordinates } from '../utilities/ICoordinates';
import { ITilePosition } from './ITile';
import ITileMap from './ITileMap';

export default class TileMap implements ITileMap
{
  _name: string;
  _selector: JQuery;
  _tileContainer: JQuery;
  _pathFinder: PathFinder;

  wrapper: JQuery;

  tileSize: number;

  columnsNb: number;
  rowsNb: number;

  width: number;
  height: number;

  grid: Matrix;

  constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number) {
    if (!wrapper) {
      console.error("TileMap needs a wrapper as first parameter.")
      return;
    }

    this._name = "TileMap";
    this.width = tileSize * columnsNb;
    this.height = tileSize * rowsNb;
    this.columnsNb = columnsNb;
    this.rowsNb = rowsNb;

    this._selector = jQuery("<div/>", {
      class: 'tile-map ' + columnsNb +  "-col " + rowsNb + "-row"
    });
    this._selector.css({
      'width': this.width + "px",
      'height': this.height + "px",
      'display': "flex",
      'justifyContent': "center",
      'alignItems': "center"
    });

    this._tileContainer = jQuery("<div/>", {
      class: 'tile-container'
    });

    this._tileContainer.css({
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

    this.grid.map((value: any, index: any, matrix: Matrix) => {
      this.appendTile(index[0], index[1], new Tile(this._selector, this.tileSize, index[0], index[1]));
    });

    for (var c = 0; c < columnsNb; c++) {
      for (var r = 0; r < rowsNb; r++) {
        
      }
    }

    this._pathFinder = new PathFinder(columnsNb, rowsNb);

    this._selector.append(this._tileContainer);
    this.wrapper.append(this._selector);

    return this;
  }

  appendTile(column: number, row: number, tile: Tile) {
    this.grid.subset(math.index(column, row), tile);
    this._tileContainer.append(tile.selector);
  }

  coordToPos(coordinates: ICoordinates) {
    var tilePosition: ITilePosition = {
      col: coordinates.x,
      row: coordinates.y
    };
    return tilePosition;
  }

  getTileAt(position: ITilePosition) {
    return <Tile>this.grid.get(<any>math.index([position.col, position.row]));
  }

  getNearestTile(where: ICoordinates | ITilePosition) {
    var position = (<ICoordinates>where) ? this.coordToPos(<ICoordinates>where) : <ITilePosition>where;
    return <Tile>this.getTileAt(position);
  }
}
