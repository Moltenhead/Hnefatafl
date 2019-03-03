"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("./game/Board");
$(document).ready(function (e) {
    var $displayer = $('#displayer');
    new Board_1.TaflBoard($displayer, 56, 13, 13, ['#cc6633', '#cc9966', '#993300', '#000'], [2, "solid"]);
});
