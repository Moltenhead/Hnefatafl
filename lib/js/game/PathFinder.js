"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathFinder = (function () {
    function PathFinder(columnsNb, rowsNb) {
        this._matrix = math.zeros([columnsNb, rowsNb]);
        console.debug(this._matrix);
    }
    return PathFinder;
}());
exports.PathFinder = PathFinder;
