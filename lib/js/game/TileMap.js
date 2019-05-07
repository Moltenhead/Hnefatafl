"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tile_1 = __importDefault(require("./Tile"));
var math = __importStar(require("mathjs"));
var PathFinder_1 = require("./PathFinder");
var TileMap = (function () {
    function TileMap(wrapper, tileSize, columnsNb, rowsNb) {
        var _this = this;
        if (!wrapper) {
            console.error("TileMap needs a wrapper as first parameter.");
            return;
        }
        this._name = "TileMap";
        this.width = tileSize * columnsNb;
        this.height = tileSize * rowsNb;
        this.columnsNb = columnsNb;
        this.rowsNb = rowsNb;
        this._selector = jQuery("<div/>", {
            class: 'tile-map ' + columnsNb + "-col " + rowsNb + "-row"
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
        this.grid = math.zeros(columnsNb, rowsNb, "dense");
        this.grid.map(function (value, index, matrix) {
            _this.appendTile(index[0], index[1], new Tile_1.default(_this._selector, _this.tileSize, index[0], index[1]));
        });
        for (var c = 0; c < columnsNb; c++) {
            for (var r = 0; r < rowsNb; r++) {
            }
        }
        this._pathFinder = new PathFinder_1.PathFinder(columnsNb, rowsNb);
        this._selector.append(this._tileContainer);
        this.wrapper.append(this._selector);
        return this;
    }
    TileMap.prototype.appendTile = function (column, row, tile) {
        this.grid.subset(math.index(column, row), tile);
        this._tileContainer.append(tile.selector);
    };
    TileMap.prototype.coordToPos = function (coordinates) {
        var tilePosition = {
            col: coordinates.x,
            row: coordinates.y
        };
        return tilePosition;
    };
    TileMap.prototype.getTileAt = function (position) {
        return this.grid.get(math.index([position.col, position.row]));
    };
    TileMap.prototype.getNearestTile = function (where) {
        var position = where ? this.coordToPos(where) : where;
        return this.getTileAt(position);
    };
    return TileMap;
}());
exports.default = TileMap;
