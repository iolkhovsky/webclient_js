const imageCanvasAspectRatio = 16. / 9.;
const imageCanvasShare = 0.75;
const imageCanvasWidth = window.innerWidth * imageCanvasShare;
const imageCanvasHeight = imageCanvasWidth / imageCanvasAspectRatio;


function drawBox(context, box, color="#ff0000", lineWidth=1) {
  x1 = box[0]
  y1 = box[1]
  x2 = x1 + box[2]
  y2 = y1 + box[3]

  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y1);
  context.lineTo(x2, y2);
  context.lineTo(x1, y2);
  context.lineTo(x1, y1);
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.stroke();
}

function drawDetections(boxes, imgSize, transform) {
  var [imgWidth, imgHeight] = imgSize;
  var [x, y, w, h] = transform;
  var ctx = canvas.getContext('2d');
  var arrayLength = boxes.length;
  for (var i = 0; i < arrayLength; i++) {
    var [boxX, boxY, boxW, boxH] = boxes[i];
    var xScale = w / imgWidth;
    var yScale = h / imgHeight;
    boxX = x + boxX * xScale;
    boxY = y + boxY * yScale;
    boxW = boxW * xScale;
    boxH = boxH * yScale;
    drawBox(ctx, [boxX, boxY, boxW, boxH]);
  }
}

function getImageCanvasTransform(imageWidth, imageHeight) {
    currScaleX = canvas.width / imageWidth;
    currScaleY = canvas.height / imageHeight;
    scale = Math.min(currScaleX, currScaleY);
    targetImgWidth = imageWidth * scale;
    targetImgHeight = imageHeight * scale;
    offsetX = (imageCanvasWidth - targetImgWidth) / 2.;
    offsetY = (imageCanvasHeight - targetImgHeight) / 2.;
    return [offsetX, offsetY, targetImgWidth, targetImgHeight];
}

function drawSourceImage() {
  canvas.width = imageCanvasWidth;
  canvas.height = imageCanvasHeight;
  var [x, y, w, h] = getImageCanvasTransform(this.width, this.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(this, x, y, w, h);
}
