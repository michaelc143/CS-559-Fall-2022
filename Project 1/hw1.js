function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    var dx = slider1.value;
    var dy = slider2.value;
    
    function DrawHouse(color) {
        //main house drawing
        context.beginPath();
        context.rect(50, 140, 150, 110);
        context.lineWidth = 4;
        context.stroke();

        //windowLeft
        context.strokeRect(70,150,30,30);
        context.beginPath();
        context.moveTo(70,165);
        context.lineTo(100,165);
        context.stroke();
        context.beginPath();
        context.moveTo(85,150);
        context.lineTo(85,180);
        context.stroke();

        //windowRight
        context.strokeRect(150,150,30,30);
        context.beginPath();
        context.moveTo(150,165);
        context.lineTo(180,165);
        context.stroke();
        context.beginPath();
        context.moveTo(165,150);
        context.lineTo(165,180);
        context.stroke();

        //chimney
        context.beginPath();
        context.rect(155,60,40,80)
        context.fillStyle = 'gray';
        context.fill();

        //door
        context.beginPath();
        context.rect(105, 190, 40, 60);
        context.fillStyle = 'brown';
        context.fill();

        //doorknob
        context.beginPath();
        context.arc(115, 220, 5, 0, Math.PI * 2);
        context.fillStyle = 'gold';
        context.fill();
       
        //roof drawing
        context.beginPath();
        context.fillStyle = "#800";
        context.moveTo(25, 140);
        context.lineTo(125, 60);
        context.lineTo(225, 140);
        context.closePath();
        context.fill();
    }
 
    context.save();
    context.translate(dx,dy);
    DrawHouse("black");
    context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup; 
