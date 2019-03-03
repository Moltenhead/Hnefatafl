"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CSSBorders = (function () {
    function CSSBorders(top, rigth, bottom, left) {
        var _this = this;
        this._data = new Array(4);
        if (arguments.length === 1) {
            this._data.forEach(function (elt, index) {
                _this._data[index] = elt;
            });
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                this._data[i] = arguments[i];
            }
        }
        return this;
    }
    CSSBorders.prototype.get = function () {
        return {
            top: this.top,
            right: this.right,
            bottom: this.bottom,
            left: this.left
        };
    };
    Object.defineProperty(CSSBorders.prototype, "top", {
        get: function () { return this._data[0]; },
        set: function (v) { this._data[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSBorders.prototype, "right", {
        get: function () { return this._data[1]; },
        set: function (v) { this._data[1]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSBorders.prototype, "bottom", {
        get: function () { return this._data[2]; },
        set: function (v) { this._data[2]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSBorders.prototype, "left", {
        get: function () { return this._data[3]; },
        set: function (v) { this._data[3]; },
        enumerable: true,
        configurable: true
    });
    CSSBorders.prototype.forEach = function (fn) {
        this._data.forEach(function (elt) {
            elt = fn.arguments[0];
        });
    };
    return CSSBorders;
}());
exports.CSSBorders = CSSBorders;
