var boxes;
var canvas = document.getElementById("image-canvas");
var output_console = document.getElementById("output")
var detections_list = document.getElementById("detections")
var samples_list = document.getElementById("samples")

function init() {
    canvas.width = imageCanvasWidth;
    canvas.height = imageCanvasHeight;
    update_samples_list();
}

function failed() {
  window.alert("The provided file couldn't be loaded as an Image media");
}

function uploadedEventHandler(e) {
  var img = new Image();
  img.onload = drawSourceImage;
  img.onerror = failed;
  img.src = URL.createObjectURL(this.files[0]);

  var formData = new FormData();
  formData.append("file", this.files[0]);

  var url = "/image";
  var request = new XMLHttpRequest();
  request.responseType = "json";
  request.open("POST", url, true);
  request.onload = function () {
    boxes = request.response["detections"];
    var imgWidth = request.response["width"];
    var imgHeight = request.response["height"];
    var transform = getImageCanvasTransform(imgWidth, imgHeight);
    output_console.textContent = JSON.stringify(boxes);
    drawDetections(boxes, [imgWidth, imgHeight], transform);
    update_detections_list(boxes);
    update_samples_list();
  };
  request.send(formData);
  output_console.textContent = "Waiting for server's response...";
}

document.addEventListener('DOMContentLoaded', init);
document.getElementById("uploaded-file").onchange = uploadedEventHandler;
