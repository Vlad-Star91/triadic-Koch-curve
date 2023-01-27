var cnv, ctx, sel;
function getPoints(a, b) {
  var p, k, i, j, phi;
  var pts = new Array(2); // array with two starting points
  for (i = 0; i < pts.length; i++) {
    pts[i] = new Array(2);
  }
  //coordinate values for start points
  for (i = 0; i < 2; i++) {
    pts[0][i] = a[i];
    pts[1][i] = b[i];
  }

  var n = document.getElementById('mysel').selectedIndex;

  for (k = 1; k <= n; k++) {
    p = new Array(4 * pts.length - 3); //a new array to store the coordinates of the curve points in it
    for (i = 0; i < pts.length - 1; i++) {
      for (j = 0; j < 4; j++) {
        p[4 * i + j] = new Array(2);
      }
      for (j = 0; j < 2; j++) {
        p[4 * i][j] = pts[i][j];
        p[4 * i + 1][j] = Math.round((2 * pts[i][j]) / 3 + pts[i + 1][j] / 3);
        p[4 * i + 3][j] = Math.round(pts[i][j] / 3 + (2 * pts[i + 1][j]) / 3);
      }
      phi = Math.atan2(p[4 * i + 1][1] - p[4 * i + 3][1], p[4 * i + 3][0] - p[4 * i + 1][0]); //angle between line and coordinate axis
      L = Math.sqrt(
        Math.pow(p[4 * i + 3][0] - p[4 * i + 1][0], 2) +
          Math.pow(p[4 * i + 3][1] - p[4 * i + 1][1], 2),
      ); // segment length

      p[4 * i + 2][0] = Math.round(p[4 * i + 1][0] + L * Math.cos(phi + Math.PI / 3));
      p[4 * i + 2][1] = Math.round(p[4 * i + 1][1] - L * Math.sin(phi + Math.PI / 3));
    }
    p[4 * pts.length - 4] = new Array(2); // last element in dot array
    for (j = 0; j < 2; j++) {
      p[4 * pts.length - 4][j] = pts[pts.length - 1][j];
    }
    pts = p;
  }
  return pts;
}
// function to display the curve in the graphics area
function drawPoints(p, ct) {
  ct.beginPath();
  ct.strokeStyle = 'blue';
  ct.lineWidth = 1;
  ct.moveTo(p[0][0], p[0][1]);
  for (var k = 1; k < p.length; k++) {
    ct.lineTo(p[k][0], p[k][1]);
  }
  ct.stroke();
}
// element loading event handler
window.onload = function () {
  cnv = document.getElementById('mycanvas');
  ctx = cnv.getContext('2d');
  sel = document.getElementById('mysel');

  var k,
    Nmax = 9;
  for (k = 0; k <= Nmax; k++) {
    sel.options[k] = new Option(k, k);
    sel.selectedIndex = 0;
  }

  drawPoints(getPoints([10, cnv.height - 10], [cnv.width - 10, cnv.height - 10]), ctx); // curve display
  // event handler for the dropdown state change event
  sel.onchange = function () {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    drawPoints(getPoints([10, cnv.height - 10], [cnv.width - 10, cnv.height - 10]), ctx);
  };
};
