class TaflBoard extends Board
{
  constructor(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders) {
    super(wrapper, tileSize, columnsNb, rowsNb, tileColors, tileBorders);

    this.selector.addClass('tafle-board');

    this._castles = new Array()

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

    this.cornerToCornerSVGTemplate = document.createElement("canvas");
    var wantedValue = tileSize - tileBorders[0];
    $(this.cornerToCornerSVGTemplate).attr('width', wantedValue);
    $(this.cornerToCornerSVGTemplate).attr('height', wantedValue);
    $(this.cornerToCornerSVGTemplate).css({
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
    this._grid.forEach(function (tile, index) {
      if (
        index === [0,0] ||
        index === [0, rowsNb - 1] ||
        index === [columnsNb - 1, 0] ||
        [columnsNb - 1, rowsNb - 1]
      ) {
        console.debug(index);
        tile.selector.addClass('tafl-castle');
        tile.selector.append($(_this.cornerToCornerSVGTemplate).clone());
        _this._castles.push(tile);
      }
    });

    console.debug(this._castles);

    var tileTarget = this._grid.subset(
      math.index(
        Math.floor(columnsNb/2),
        Math.floor(rowsNb/2)
      )
    );

    tileTarget.selector.addClass('tafl-castle tafl-king-hill');
    tileTarget.selector.append($(this.cornerToCornerSVGTemplate).clone());
    this._castles.push(tileTarget);

    var tafleCastle = document.getElementsByClassName("tafl-castle")
    for (var i = 0; i < tafleCastle.length; i++) {
      var targetCanvas = tafleCastle[i].firstElementChild.getContext("2d");
      targetCanvas.lineWidth = tileBorders[0];
      targetCanvas.stroke(this.cToC);
    }

    return this;
  }
}