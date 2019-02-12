/*  Base pawn object
*
*   declaration:
*       new Pawn($Board, pawnType, pawnColor)
*/
class Pawn
{
  boardParent;

  _left;
  _right;

  _selector;
  _isDownPressed;

  constructor(board, type, color) {
    if (boardParent.constructor.name != "Board") {
      console.error("Object must have a Board object as 1st parameter");
      return;
    }
    this.boardParent = board

    this.x = 0;
    this.y = 0;
    this._isDownPressed = false;

    var $this = $(this);

//  HTMLElt creation
    this._selector = jQuery('<div/>', {
      class: 'pawn'
    });

//      Events
    $this.selector.mousedown(function(e) {
      $this.isDownPressed = true;
    });
    $this.selector.mousemove(function(e) {
      if ($this.isDownPressed == false) {
        console.debug("Object isn't mouse down pressed.");
        return;
      }
      let mouse__top = e.top;
      let mouse__left = e.left;
      this.css({
        top: mouse__top,
        left: mouse__left 
      });
    });
    $this.selector.mouseup(function(e) {
      $this.isDownPressed = false;
      $this.trySetToNearestCell();
    });

    this.boardParent.append(this.selector);
  }

//  GET / SET
  set x(v) { this._left = v; }                                                // x axys
  get x() { return this._left; }
  set y(v) { this._top = v; }                                                 // y axys
  get y() { return this._top; }
//  read only
  get selector() { return this._selector; }                                   // jQuery elt
  get isDownPressed() { return this._isDownPressed; }                         // down pressed state

  trySetToNearestCell() {
    var board = this.boardParent;

    if (!board) {
      console.error("Can't place pawn to undefined board.");
      return;
    }

    var cell__target = board.getNearestCell(this.x, this.y);                //requesting the nearest cell object
    if (cell__target.validity === false) {
      console.error("Can't place on cell " + cell__target.locationToString())
    }
  }
}
