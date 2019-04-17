import TileMap from "./TileMap"

export class Board extends TileMap
{
  public tileColors: string[];
  public tileBorders: Array<number|string>;

  constructor(wrapper: JQuery, tileSize: number, columnsNb: number, rowsNb: number, tileColors: Array<string>, tileBorders: Array<number|string>) {
    super(wrapper, tileSize, columnsNb, rowsNb);

    this.name = "Board:" + columnsNb + "x" + rowsNb;
    var computedWidth = this.width + tileSize * 2;
    var computedHeight = this.height + tileSize * 2;

    this.selector.css("width", computedWidth + "px");
    this.selector.css("height", computedHeight + "px");
    this.selector.css("backgroundColor", tileColors[2]);

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
    var _this = this;
    this.grid.forEach(function(tile, index) {
      var c = index[0];
      var r = index[1];
      tile.color = ((c + r) % 2 === 0) ? _this.getColor(0) : _this.getColor(1);
      if (_this.tileBorders) {
        var endString = "px " + _this.tileBorders[1] + " " + _this.getColor(3);
        var fullString = <number>_this.tileBorders[0] + endString;
        var halvedString = <number>_this.tileBorders[0] / 2 + endString;
        var borders = {
          left: undefined,
          right: undefined,
          top: undefined,
          bottom: undefined,
        };
        jQuery.each(borders, function(index) {
          borders[index] = halvedString;
        })

        if(c === 0) {
          borders['top'] = fullString;
        }
        if(c >= _this.columnsNb - 1) {
          borders['bottom'] = fullString;
        }
        if (r === 0) {
          borders['left'] = fullString;
        }
        if (r >= _this.rowsNb - 1) {
          borders['right'] = fullString;
        }

        // console.debug(borders);
        tile.border = borders;
      }
    });
  }

  getColor(index) {
      return this.tileColors[index];
  }

  append(object: Pawn) {
    
  }
}

export class TaflBoard extends Board
{
  public cToC: Path2D;

  public castles: Array<HTMLCollection>;

  public fullSizeCanvas: HTMLCanvasElement;

  constructor(
    wrapper: JQuery,
    tileSize: number,
    columnsNb: number,
    rowsNb: number,
    tileColors: Array<String>,
    tileBorders: Array<number|String>
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
    var wantedValue = tileSize - tileBorders[0];
    $(this.fullSizeCanvas).attr('width', wantedValue);
    $(this.fullSizeCanvas).attr('height', wantedValue);
    $(this.fullSizeCanvas).css({
      'position': "absolute",
      'zIndex': "10"
    })

    this.cToC = new Path2D();
    this.cToC.moveTo(0,0);
    this.cToC.lineTo(wantedValue,wantedValue);
    this.cToC.moveTo(wantedValue,0);
    this.cToC.lineTo(0,wantedValue);
  
    // this.cornerToCornerSVGTemplate.append(firstSVGLine);
    // this.cornerToCornerSVGTemplate.append(secondSVGLine);
    
    var _this = this;
    this.grid.forEach(function (tile, index) {
      if (
        index === [0,0] ||
        index === [0, rowsNb - 1] ||
        index === [columnsNb - 1, 0] ||
        [columnsNb - 1, rowsNb - 1]
      ) {
        console.debug(index);
        tile.selector.addClass('tafl-castle');
        tile.selector.append($(_this.cornerToCornerSVGTemplate).clone());
        _this.castles.push(tile);
      }
    });

    var tileTarget = this.grid.subset(
      math.index(
        Math.floor(columnsNb/2),
        Math.floor(rowsNb/2)
      )
    );

    tileTarget.selector.addClass('tafl-castle tafl-king-hill');
    tileTarget.selector.append($(this.cornerToCornerSVGTemplate).clone());
    this.castles.push(tileTarget);

    var tafleCastle = document.getElementsByClassName("tafl-castle")
    for (var i = 0; i < tafleCastle.length; i++) {
      var targetCanvas = tafleCastle[i].firstElementChild.getContext("2d");
      targetCanvas.lineWidth = tileBorders[0];
      targetCanvas.stroke(this.cToC);
    }

    return this;
  }
}
