"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var math = __importStar(require("mathjs"));
var TileMap_1 = __importDefault(require("./TileMap"));
var Board = (function (_super) {
    __extends(Board, _super);
    function Board(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) {
        var _this = _super.call(this, wrapper, tileSize, columnsNb, rowsNb) || this;
        _this.name = "Board:" + columnsNb + "x" + rowsNb;
        var computedWidth = _this.width + tileSize * 2;
        var computedHeight = _this.height + tileSize * 2;
        _this.selector.css({
            width: computedWidth + "px",
            height: computedHeight + "px",
            backgroundColor: tileColors[2]
        });
        _this.selector.addClass("board");
        _this.tileColors = tileColors;
        _this.tileBorders = tileBorders;
        _this.colorize();
        return _this;
    }
    Board.prototype.colorize = function () {
        var _this = this;
        var _a = this, columnsNb = _a.columnsNb, rowsNb = _a.rowsNb;
        this.grid.forEach(function (tile, index) {
            var c = index[0];
            var r = index[1];
            tile.color = ((c + r) % 2 === 0) ? _this.getColor(0) : _this.getColor(1);
            if (_this.tileBorders) {
                var endString = "px " + _this.tileBorders[1] + " " + _this.getColor(3);
                var fullString = _this.tileBorders[0] + endString;
                var halvedString = _this.tileBorders[0] / 2 + endString;
                var borders_1 = {
                    left: halvedString,
                    right: halvedString,
                    top: halvedString,
                    bottom: halvedString,
                };
                jQuery.each(borders_1, function (key) {
                    borders_1[key] = halvedString;
                });
                if (c === 0) {
                    borders_1.top = fullString;
                }
                if (c >= columnsNb - 1) {
                    borders_1.bottom = fullString;
                }
                if (r === 0) {
                    borders_1.left = fullString;
                }
                if (r >= rowsNb - 1) {
                    borders_1.right = fullString;
                }
                tile.border = borders_1;
            }
        });
    };
    Board.prototype.getColor = function (index) {
        return this.tileColors[index];
    };
    Board.prototype.append = function (pawn) {
    };
    return Board;
}(TileMap_1.default));
exports.Board = Board;
var TaflBoard = (function (_super) {
    __extends(TaflBoard, _super);
    function TaflBoard(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) {
        var _this = _super.call(this, wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) || this;
        _this.selector.addClass('tafle-board');
        _this.castles = new Array();
        _this.fullSizeCanvas = document.createElement("canvas");
        var wantedValue = tileSize - tileBorders[0];
        $(_this.fullSizeCanvas).attr('width', wantedValue);
        $(_this.fullSizeCanvas).attr('height', wantedValue);
        $(_this.fullSizeCanvas).css({
            'position': "absolute",
            'zIndex': "10"
        });
        _this.cToC = new Path2D();
        var cToC = _this.cToC;
        cToC.moveTo(0, 0);
        cToC.lineTo(wantedValue, wantedValue);
        cToC.moveTo(wantedValue, 0);
        cToC.lineTo(0, wantedValue);
        var grid = _this.grid;
        var corners = [
            grid.get([0, 0]),
            grid.get([0, columnsNb - 1]),
            grid.get([rowsNb - 1, 0]),
            grid.get([rowsNb - 1, columnsNb - 1])
        ];
        corners.forEach(function (tile) {
            tile.selector.addClass('tafl-castle');
            tile.selector.append($(_this.fullSizeCanvas).clone());
            _this.castles.push(tile);
        });
        var tileTarget = _this.grid.subset(math.index(Math.floor(columnsNb / 2), Math.floor(rowsNb / 2)));
        tileTarget.selector.addClass('tafl-castle tafl-king-hill');
        tileTarget.selector.append($(_this.fullSizeCanvas).clone());
        _this.castles.push(tileTarget);
        _this.castles.forEach(function (castle) {
            var targetCanvas = castle.selector.children('canvas').get(0);
            var context = targetCanvas.getContext("2d");
            if (context) {
                context.lineWidth = tileBorders[0];
                context.stroke(_this.cToC);
            }
            else {
                console.error("context is null or undefined", context);
            }
        });
        return _this;
    }
    return TaflBoard;
}(Board));
exports.TaflBoard = TaflBoard;
