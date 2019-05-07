import { Board } from "./Board";
// import { ICoordinates } from '../utilities/ICoordinates';

/*  Base pawn object
*
*   declaration:
*       new Pawn(Board, pawnType, pawnColor)
*/
export class Pawn
{
  public boardParent: Board;

  private _left: number;
  private _top: number;
  // private _right: number;
  // private _bottom: number;

  private _selector: JQuery;
  private _isDownPressed: Boolean;

  constructor(board: Board, /*type: PawnType,*/ color: string) {
    const _this = this;

    this.boardParent = board

    this.x = 0;
    this.y = 0;
    this._isDownPressed = false;

    // HTMLElt creation
    this._selector = jQuery('<div/>', {
      class: 'pawn'
    });

    // Events
    const $this = this._selector
    $this.mousedown(this, function(e: JQuery.Event) {
      _this._isDownPressed = true;
      let mouse__top: string = `${e.pageY}`;
      let mouse__left: string = `${e.pageX}`;
      $this.css({
        position: "absolute",
        top: mouse__top,
        left: mouse__left
      })
    });
    $this.mousemove(this, function(e: JQuery.Event) {
      if (_this._isDownPressed == false) {
        console.debug("Object isn't mouse down pressed.");
        return;
      }
      let mouse__top: string = `${e.pageY}`;
      let mouse__left: string = `${e.pageX}`;
      $this.css({
        top: mouse__top,
        left: mouse__left 
      });
    });
    $this.mouseup($this, function(e: JQuery.Event) {
      _this._isDownPressed = false;
      _this.trySetToNearestTile();
    });

    this.boardParent.append(this);
  }

//  GET / SET
  set x(v) { this._left = v; }                                                // x axys
  get x() { return this._left; }
  set y(v) { this._top = v; }                                                 // y axys
  get y() { return this._top; }
//  read only
  get selector() { return this._selector; }                                   // jQuery elt
  get isDownPressed() { return this._isDownPressed; }                         // down pressed state

  trySetToNearestTile() {
    let board = this.boardParent;

    if (!board) {
      console.error("Can't place pawn to undefined board.");
      return;
    }

    let tile__target = board.getNearestTile({ x: 0, y: 0 });                //requesting the nearest tile object
    if (tile__target.validity === false) {
      console.error("Can't place on tile " + tile__target.locationToString())
    }
  }
}
