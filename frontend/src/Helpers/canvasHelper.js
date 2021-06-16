const drawAxes = (context, canvas) => {
  const x0 = 0.5 * canvas.width;
  const y0 = 0.5 * canvas.height;
  const width = context.canvas.width;
  const height = context.canvas.height;
  const xmin = 0;
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 2;
  //----Y axis----
  context.moveTo(xmin, y0);
  context.lineTo(width, y0);
  //----X axis-----
  context.moveTo(x0, 0);
  context.lineTo(x0, height);

  //X - signs
  for (let i = x0, j = 0; i < width; i += 50, j++) {
    context.moveTo(i, height / 2 - 7);
    context.lineTo(i, height / 2 + 7);
    j != 0 && context.fillText(j, i - 2, height / 2 + 7 + 10);
  }
  for (let i = x0, j = 0; i > 0; i -= 50, j++) {
    context.moveTo(i, height / 2 - 7);
    context.lineTo(i, height / 2 + 7);
    j != 0 && context.fillText(-j, i - 2, height / 2 + 7 + 10);
  }

  //Y - signs
  for (let i = y0, j = 0; i < height; i += 50, j++) {
    context.moveTo(width / 2 - 7, i);
    context.lineTo(width / 2 + 7, i);
    j != 0 && context.fillText(j, height / 2 + 10, i + 3);
  }
  for (let i = y0, j = 0; i > 0; i -= 50, j++) {
    context.moveTo(width / 2 - 7, i);
    context.lineTo(width / 2 + 7, i);
    j != 0 && context.fillText(-j, height / 2 + 10, i + 3);
  }

  context.stroke();
};

const drawLine = (lineColor, context, canvas, a, b) => {
  // context.clearRect(0, 0, canvas.width, canvas.height);

  var x0 = 0.5 * canvas.width;
  var y0 = 0.5 * canvas.height;
  var scale = 1; //40px per 1 unit

  var dx = 4;
  var xMax = Math.round((canvas.width - x0) / dx);
  var xMin = Math.round(-x0 / dx);

  context.beginPath();
  context.strokeStyle = lineColor;
  context.lineWidth = 2;

  for (let i = xMin; i < xMax; i++) {
    let x = dx * i;
    let y = a * x + b;

    x /= scale;
    y /= scale;
    if (i == xMin) {
      context.moveTo(x0 + x, y0 - y);
    } else {
      context.lineTo(x0 + x, y0 - y);
    }
  }

  context.stroke();
};

export const draw = ({ canvasRef, numeradorM, denominadorM, b }) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  drawLine("green", context, canvas, numeradorM / denominadorM, b * 60);

  drawAxes(context, canvas);
};

export const drawUserLine = ({ canvasRef, formNumM, formDenomM, formB }) => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
  drawLine("orange", context, canvas, formNumM / formDenomM, formB * 60);
};
