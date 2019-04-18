"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var math = __importStar(require("mathjs"));
var PathFinder = (function () {
    function PathFinder(columnsNb, rowsNb) {
        this._matrix = math.zeros([columnsNb, rowsNb]);
    }
    Object.defineProperty(PathFinder.prototype, "matrix", {
        get: function () { return this._matrix; },
        enumerable: true,
        configurable: true
    });
    return PathFinder;
}());
exports.PathFinder = PathFinder;
