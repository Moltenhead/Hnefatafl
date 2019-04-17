"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayLike_1 = require("../utilities/ArrayLike");
var Tile = (function () {
    function Tile(container, size, columnIndex, rowIndex) {
        if (!container) {
            console.error("Tile needs a JQuery parent as 1st argument.");
        }
        this._container = container;
        this._selector = jQuery("<div/>", {
            class: "tile"
        });
        this.col = columnIndex;
        this.row = rowIndex;
        this.border = new ArrayLike_1.CSSBorders("none");
        this.selector.css({
            'width': size + "px",
            'height': size + "px",
            'position': "absolute",
            'gridArea': (this.col + 1) + " / " + (this.row + 1)
        });
        return this;
    }
    Object.defineProperty(Tile.prototype, "selector", {
        get: function () { return this._selector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "color", {
        get: function () { return this._color; },
        set: function (v) {
            this._color = v;
            this.selector.css('backgroundColor', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "border", {
        get: function () {
            return this._border;
        },
        set: function (v) {
            this._border = v;
            this.selector.css({
                'borderTop': v.top,
                'borderRight': v.right,
                'borderBottom': v.bottom,
                'borderLeft': v.left
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tile.prototype, "container", {
        get: function () { return this._container; },
        enumerable: true,
        configurable: true
    });
    Tile.prototype.locationToString = function () {
        return this.col + ":" + this.row;
    };
    return Tile;
}());
exports.Tile = Tile;
