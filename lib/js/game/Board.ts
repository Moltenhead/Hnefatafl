import * as math from "mathjs";
import TileMap from "./TileMap";
import Tile from "./Tile";
import { Pawn } from "./Pawn";

export class Board extends TileMap
{
  public tileColors: string[];
  public tileBorders: Array<number|string>;

  constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number, tileColors: Array<string>, tileBorders: Array<number|string>) {
    super(wrapper, tileSize, columnsNb, rowsNb);

    this.name = "Board:" + columnsNb + "x" + rowsNb;
    var computedWidth = this.width + tileSize * 2;
    var computedHeight = this.height + tileSize * 2;

    this.selector.css({
      width: computedWidth + "px",
      height: computedHeight + "px",
      backgroundColor: tileColors[2]
    });

    this.selector.addClass("board");

    this.tileColors = tileColors;
    this.tileBorders = tileBorders

    var _this = this;
    tileColors.forEach(function(color, i) {
      _this.tileColors[i] = color;
    });
    this.colorize();

    return this;
  }

  colorize() {
    const { columnsNb, rowsNb } = this
    this.grid.forEach((tile: Tile, index: number) => {
      var c = index%columnsNb;
      var r = index/columnsNb;
      tile.color = ((c + r) % 2 === 0) ? this.getColor(0) : this.getColor(1);
      if (this.tileBorders) {
        var endString = "px " + this.tileBorders[1] + " " + this.getColor(3);
        var fullString = <number>this.tileBorders[0] + endString;
        var halvedString = <number>this.tileBorders[0] / 2 + endString;
        let borders: any = {
          left: <undefined | string>halvedString,
          right: <undefined | string>halvedString,
          top: <undefined | string>halvedString,
          bottom: <undefined | string>halvedString,
        };
        jQuery.each(borders, (key: string) => {
          borders[key] = halvedString;
        })

        if(c === 0) {
          borders.top = fullString;
        }
        if(c >= columnsNb - 1) {
          borders.bottom = fullString;
        }
        if (r === 0) {
          borders.left = fullString;
        }
        if (r >= rowsNb - 1) {
          borders.right = fullString;
        }

        // console.debug(borders);
        tile.border = borders;
      }
    });
  }

  getColor(index: number) {
      return this.tileColors[index];
  }

  append(pawn: Pawn) {
    
  }
}

export class TaflBoard extends Board
{
  public cToC: Path2D;

  public castles: Tile[];

  public fullSizeCanvas: HTMLCanvasElement;

  constructor(
    wrapper: JQuery,
    tileSize: number,
    columnsNb: number,
    rowsNb: number,
    tileColors: Array<string>,
    tileBorders: Array<number|string>
  ) {
    super(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders);

    this.selector.addClass('tafle-board');

    this.castles = new Array();

    // var firstSVGLine = jQuery("<line/>", {
    //   'x1': '0',
    //   'y1': '100%',
    //   'x2': '100%',
    //   'y2': '0'
    // });
    // firstSVGLine.css({
    //   'stroke': tileColors[3],
    //   'strokeWidth': tileBorders[0]
    // });
    // var secondSVGLine = jQuery("<line/>", {
    //   'x1': '0',
    //   'y1': '0',
    //   'x2': '100%',
    //   'y2': '100%'
    // });
    // secondSVGLine.css({
    //   'stroke': tileColors[3],
    //   'strokeWidth': tileBorders[0]
    // });

    // this.cornerToCornerSVGTemplate = jQuery("<canvas/>", {
    //   'class': 'corner-to-corner-svg',
    // });

    this.fullSizeCanvas = document.createElement("canvas");
    let wantedValue = tileSize - <number>tileBorders[0];
    $(this.fullSizeCanvas).attr('width', wantedValue);
    $(this.fullSizeCanvas).attr('height', wantedValue);
    $(this.fullSizeCanvas).css({
      'position': "absolute",
      'zIndex': "10"
    })

    this.cToC = new Path2D();
    const {cToC} = this;
    cToC.moveTo(0,0);
    cToC.lineTo(wantedValue,wantedValue);
    cToC.moveTo(wantedValue,0);
    cToC.lineTo(0,wantedValue);
  
    // this.cornerToCornerSVGTemplate.append(firstSVGLine);
    // this.cornerToCornerSVGTemplate.append(secondSVGLine);
    
    var _this = this;
    const { grid } = this
    const corners = [
      grid.get([0,0]),
      grid.get([0,columnsNb-1]),
      grid.get([rowsNb-1,0]),
      grid.get([rowsNb-1,columnsNb-1])
    ]
    corners.forEach(function (tile: Tile) {
      tile.selector.addClass('tafl-castle');
      tile.selector.append(<HTMLCanvasElement>$("<canvas/>").get(0));
      _this.castles.push(tile);
    });

    const tileTarget = <Tile>this.grid.subset(
      math.index(
        Math.floor(columnsNb/2),
        Math.floor(rowsNb/2)
      )
    ).get([0,0]);

    tileTarget.selector.addClass('tafl-castle tafl-king-hill');
    tileTarget.selector.append(<HTMLCanvasElement>$("<canvas/>").get(0));
    this.castles.push(tileTarget);

    const $tafleCastles: JQuery = $("canvas.tafl-castle")
    for (let i = 0; i < $tafleCastles.length; i++) {
      const targetCanvas = <HTMLCanvasElement>$($tafleCastles[i]).children('canvas').get(0)
      const context = targetCanvas.getContext("2d");
      if (context) {
        context.lineWidth = <number>tileBorders[0];
        context.stroke(this.cToC);
      } else {
        console.error("context is null or undefined", context)
      }
    }

    return this;
  }
}
