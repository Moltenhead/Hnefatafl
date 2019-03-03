/**
 * Array like Class storing all css borders definitions as string, in css sorting order: top, right, bottom, left.
 * If only one parameter is set within construct, will apply to all properties
 * 
 * @param top the top css string definition
 * @param right the right css string definition
 * @param bottom the bottom css string definition
 * @param left the left css string definition
 * 
 * @property private _data: Array<string> = [top, right, bottom, left]
 * 
 * @method forEach(fn: (elt: string) => void) apply a function to every properties
 */
export class CSSBorders
{
  private _data: Array<string>;

  constructor(top: string, rigth?: string, bottom?: string, left?: string) {
    var _this = this;

    this._data = new Array(4);

    if (arguments.length === 1) {
      this._data.forEach(function(elt, index) {
        _this._data[index] = elt;
      });
    } else {
      for (var i: number = 0; i < arguments.length; i++) {
        this._data[i] = arguments[i];
      }
    }

    return this;
  }

  get() {
    return {
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left
    };
  }

  set top(v) { this._data[0]; }
  get top() { return this._data[0]; }
  set right(v) { this._data[1]; }
  get right() { return this._data[1]; }
  set bottom(v) { this._data[2]; }
  get bottom() { return this._data[2]; }
  set left(v) { this._data[3]; }
  get left() { return this._data[3]; }

  public forEach(fn: (elt: string) => void) {
    this._data.forEach(function(elt) {
      elt = fn.arguments[0];
    });
  }
}