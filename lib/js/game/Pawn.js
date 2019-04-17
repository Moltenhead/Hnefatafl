"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pawn = (function () {
    function Pawn(board, color) {
        var _this = this;
        this.boardParent = board;
        this.x = 0;
        this.y = 0;
        this._isDownPressed = false;
        this._selector = jQuery('<div/>', {
            class: 'pawn'
        });
        var $this = this._selector;
        $this.mousedown($this, function (e) {
            _this._isDownPressed = true;
        });
        $this.mousemove($this, function (e) {
            if (this._isDownPressed == false) {
                console.debug("Object isn't mouse down pressed.");
                return;
            }
            var mouse__top = e.top;
            var mouse__left = e.left;
            _this.css({
                top: mouse__top,
                left: mouse__left
            });
        });
        $this.mouseup($this, function (e) {
            _this._isDownPressed = false;
            _this.trySetToNearestTile();
        });
        this.boardParent.append(this.selector);
    }
    Object.defineProperty(Pawn.prototype, "x", {
        get: function () { return this._left; },
        set: function (v) { this._left = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pawn.prototype, "y", {
        get: function () { return this._top; },
        set: function (v) { this._top = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pawn.prototype, "selector", {
        get: function () { return this._selector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pawn.prototype, "isDownPressed", {
        get: function () { return this._isDownPressed; },
        enumerable: true,
        configurable: true
    });
    Pawn.prototype.trySetToNearestTile = function () {
        var board = this.boardParent;
        if (!board) {
            console.error("Can't place pawn to undefined board.");
            return;
        }
        var tile__target = board.getNearestTile({ x: 0, y: 0 });
        if (tile__target.validity === false) {
            console.error("Can't place on tile " + tile__target.tile.locationToString());
        }
    };
    return Pawn;
}());
exports.Pawn = Pawn;
