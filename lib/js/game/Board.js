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
        var _this_1 = _super.call(this, wrapper, tileSize, columnsNb, rowsNb) || this;
        _this_1.name = "Board:" + columnsNb + "x" + rowsNb;
        var computedWidth = _this_1.width + tileSize * 2;
        var computedHeight = _this_1.height + tileSize * 2;
        _this_1.selector.css({
            width: computedWidth + "px",
            height: computedHeight + "px",
            backgroundColor: tileColors[2]
        });
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
        var _this_1 = this;
        var _a = this, columnsNb = _a.columnsNb, rowsNb = _a.rowsNb;
        this.grid.forEach(function (tile, index) {
            var c = index % columnsNb;
            var r = index / columnsNb;
            tile.color = ((c + r) % 2 === 0) ? _this_1.getColor(0) : _this_1.getColor(1);
            if (_this_1.tileBorders) {
                var endString = "px " + _this_1.tileBorders[1] + " " + _this_1.getColor(3);
                var fullString = _this_1.tileBorders[0] + endString;
                var halvedString = _this_1.tileBorders[0] / 2 + endString;
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
        var cToC = _this_1.cToC;
        cToC.moveTo(0, 0);
        cToC.lineTo(wantedValue, wantedValue);
        cToC.moveTo(wantedValue, 0);
        cToC.lineTo(0, wantedValue);
        var _this = _this_1;
        var grid = _this_1.grid;
        var corners = [
            grid.get([0, 0]),
            grid.get([0, columnsNb - 1]),
            grid.get([rowsNb - 1, 0]),
            grid.get([rowsNb - 1, columnsNb - 1])
        ];
        corners.forEach(function (tile) {
            tile.selector.addClass('tafl-castle');
            tile.selector.append($("<canvas/>").get(0));
            _this.castles.push(tile);
        });
        var tileTarget = _this_1.grid.subset(math.index(Math.floor(columnsNb / 2), Math.floor(rowsNb / 2))).get([0, 0]);
        tileTarget.selector.addClass('tafl-castle tafl-king-hill');
        tileTarget.selector.append($("<canvas/>").get(0));
        _this_1.castles.push(tileTarget);
        var $tafleCastles = $("canvas.tafl-castle");
        for (var i = 0; i < $tafleCastles.length; i++) {
            var targetCanvas = $($tafleCastles[i]).children('canvas').get(0);
            var context = targetCanvas.getContext("2d");
            if (context) {
                context.lineWidth = tileBorders[0];
                context.stroke(_this_1.cToC);
            }
            else {
                console.error("context is null or undefined", context);
            }
        }
        return _this_1;
    }
    return TaflBoard;
}(Board));
exports.TaflBoard = TaflBoard;
