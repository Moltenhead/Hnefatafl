import { TaflBoard } from './game/Board';
// import { Pawn } from './classes/Pawn.js';

$(document).ready(function (e) {
//export function initGame () {
  var $displayer = $('#displayer');
  new TaflBoard(
    $displayer,
    56,
    13, 13,
    ['#cc6633', '#cc9966', '#993300', '#000'],
    [2, "solid"]);
});
