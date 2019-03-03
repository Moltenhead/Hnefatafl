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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TileMap_1 = __importDefault(require("./TileMap"));
var Board = (function (_super) {
    __extends(Board, _super);
    function Board(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) {
        var _this_1 = _super.call(this, wrapper, tileSize, columnsNb, rowsNb) || this;
        _this_1.name = "Board:" + columnsNb + "x" + rowsNb;
        var computedWidth = _this_1.width + tileSize * 2;
        var computedHeight = _this_1.height + tileSize * 2;
        _this_1.selector.css("width", computedWidth + "px");
        _this_1.selector.css("height", computedHeight + "px");
        _this_1.selector.css("backgroundColor", tileColors[2]);
        _this_1.selector.addClass("board");
        _this_1.tileColors = tileColors;
        _this_1.tileBorders = tileBorders;
        var _this = _this_1;
        tileColors.forEach(function (color, i) {
            _this.tileColors[i] = color;
        });
        _this_1.colorize();
        return _this_1;
    }
    Board.prototype.colorize = function () {
        var _this = this;
        this.grid.forEach(function (tile, index) {
            var c = index[0];
            var r = index[1];
            tile.color = ((c + r) % 2 === 0) ? _this.getColor(0) : _this.getColor(1);
            if (_this.tileBorders) {
                var endString = "px " + _this.tileBorders[1] + " " + _this.getColor(3);
                var fullString = _this.tileBorders[0] + endString;
                var halvedString = _this.tileBorders[0] / 2 + endString;
                var borders = {
                    left: undefined,
                    right: undefined,
                    top: undefined,
                    bottom: undefined,
                };
                jQuery.each(borders, function (index) {
                    borders[index] = halvedString;
                });
                if (c === 0) {
                    borders['top'] = fullString;
                }
                if (c >= _this.columnsNb - 1) {
                    borders['bottom'] = fullString;
                }
                if (r === 0) {
                    borders['left'] = fullString;
                }
                if (r >= _this.rowsNb - 1) {
                    borders['right'] = fullString;
                }
                tile.border = borders;
            }
        });
    };
    Board.prototype.getColor = function (index) {
        return this.tileColors[index];
    };
    return Board;
}(TileMap_1.default));
exports.Board = Board;
var TaflBoard = (function (_super) {
    __extends(TaflBoard, _super);
    function TaflBoard(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) {
        var _this_1 = _super.call(this, wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) || this;
        _this_1.selector.addClass('tafle-board');
        _this_1.castles = new Array();
        _this_1.fullSizeCanvas = document.createElement("canvas");
        var wantedValue = tileSize - tileBorders[0];
        $(_this_1.fullSizeCanvas).attr('width', wantedValue);
        $(_this_1.fullSizeCanvas).attr('height', wantedValue);
        $(_this_1.fullSizeCanvas).css({
            'position': "absolute",
            'zIndex': "10"
        });
        _this_1.cToC = new Path2D();
        _this_1.cToC.moveTo(0, 0);
        _this_1.cToC.lineTo(wantedValue, wantedValue);
        _this_1.cToC.moveTo(wantedValue, 0);
        _this_1.cToC.lineTo(0, wantedValue);
        var _this = _this_1;
        _this_1.grid.forEach(function (tile, index) {
            if (index === [0, 0] ||
                index === [0, rowsNb - 1] ||
                index === [columnsNb - 1, 0] ||
                [columnsNb - 1, rowsNb - 1]) {
                console.debug(index);
                tile.selector.addClass('tafl-castle');
                tile.selector.append($(_this.cornerToCornerSVGTemplate).clone());
                _this.castles.push(tile);
            }
        });
        console.debug(_this_1.castles);
        var tileTarget = _this_1.grid.subset(math.index(Math.floor(columnsNb / 2), Math.floor(rowsNb / 2)));
        tileTarget.selector.addClass('tafl-castle tafl-king-hill');
        tileTarget.selector.append($(_this_1.cornerToCornerSVGTemplate).clone());
        _this_1.castles.push(tileTarget);
        var tafleCastle = document.getElementsByClassName("tafl-castle");
        for (var i = 0; i < tafleCastle.length; i++) {
            var targetCanvas = tafleCastle[i].firstElementChild.getContext("2d");
            targetCanvas.lineWidth = tileBorders[0];
            targetCanvas.stroke(_this_1.cToC);
        }
        return _this_1;
    }
    return TaflBoard;
}(Board));
exports.TaflBoard = TaflBoard;
