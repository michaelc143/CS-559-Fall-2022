function watch() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    const today = new Date();
    const seconds = today.getSeconds();
    const minutes = today.getMinutes();
    const hours  = today.getHours() % 12; //24 hour scale so mod 12 to get 12-hour scale
    context.save();
    //set frame up
    context.clearRect(0, 0, 400, 400);
    //move the axis to (200,150);
    context.translate(200, 150);
    //scale down large drawing to 70% of normal size
    context.scale(0.7, 0.7);
    //rotate to orient hands correctly
    context.rotate(-Math.PI / 2);

    //draws background skin colored wrist
    function drawWrist() {
        context.save();
        context.fillStyle = '#FFCD94';
        context.fillRect(-270,-300,460,1000);
        context.fill();
        context.restore();
    }

    //draws logos inside the watch face
    function drawLogo() {
        context.save();
        //drawing blue logo
        context.rotate(Math.PI/2);
        context.font = "bold 27px helvetica";
        context.textAlign = "center"; context.textBaseline = "middle";
        context.fillStyle = 'navy';
        context.fillText("MAC      INC",0,0);
        //up and down brick colored logo
        let letters = ['M','A','C','I','N','C'];
        var w = -78;
        for(k = 0;k < 6; k++) {
            context.font = "bold 27px helvetica";
            context.fillStyle = '#AA4A44';
            context.fillText(letters[k],0,w);
            if(k == 2)
                w+=60;
            else
                w+=23;
        }
        context.restore();
    }

    //draw black watch band with holes
    function drawWatchBand() {
        context.save()
        //creating actual band
        context.fillStyle = 'black';
        context.rect(-280,-90,480,180);
        context.fill();
        //creating holes in the watch band
        for(k = 0; k <= 15; k+=5) {
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(-230 + k, 0, 10, 0, Math.PI * 2, true);
            context.fill();
        }
        for(k = 0; k <= 15; k+=5) {
            context.beginPath();
            context.fillStyle = 'white';
            context.arc(-300 + k, 0, 10, 0, Math.PI * 2, true);
            context.fill();
        }
        context.restore();
    }

  
    //prints outer numbers
    function printNumbers() {
        context.save();
        //rotate to correctly orient 12 at top and 6 at bottom
        context.rotate(Math.PI/2);
        context.font = "bold 27px helvetica";
        //lining up numbers in correct spots
        context.textAlign = "center"; context.textBaseline = "middle";
        context.fillStyle = 'black';
        var angle;
        //printing each number starting at 1 ending at 12
        for (number = 1; number <= 12; number++) {
            angle = number * (Math.PI / 6);
            context.rotate(angle);
            context.translate(0, -150);
            context.rotate(-angle);
            context.fillText(number, 0, 0);
            context.rotate(angle);
            context.translate(0, 150);
            context.rotate(-angle);
        }
        context.restore();
    }

    //inner black hand cover circle
    function drawHandCover() {
        context.beginPath();
        context.fillStyle = 'black';
        context.arc(0, 0, 10, 0, Math.PI * 2, true);
        context.fill();
    }

    //drawing clock backround colors
    function colorBackgroundCircles() {
        context.beginPath();
        context.fillStyle = '#E8DCB5'; //outer cream background
        context.arc(0, 0, 180, 0, Math.PI * 2, true);
        context.fill();
        context.beginPath();
        context.fillStyle = '#808080'; //inner gray background
        context.arc(0, 0, 125, 0, Math.PI * 2, true);
        context.fill();
    }

    //minute hand
    function drawMinuteHand() {
        context.save();
        //correctly line up hand to point at current minute
        context.rotate((Math.PI / 30) * minutes + (Math.PI / 1800) * seconds);
        //make line width same as minute tick marks
        context.beginPath();
        context.lineWidth = 5;
        context.moveTo(0, 0);
        context.lineTo(110, 0);
        context.stroke();
        context.restore();
    }
  
    //hour hand
    function drawHourHand() {
        context.save();
        //correctly line up hand to point at current hour
        context.rotate((Math.PI / 6) * hours + (Math.PI / 360) * minutes + (Math.PI / 21600) * seconds);
        //make line width same as hour tick marks
        context.beginPath();
        context.lineWidth = 10;
        context.moveTo(0, 0);
        context.lineTo(80, 0);
        context.stroke();
        context.restore();
    }
  
    //seconds hand
    function drawSecondsHand() {
        context.save();
        //correctly line up hand to point at current second
        context.rotate(seconds * Math.PI / 30);
        context.beginPath();
        //make the second hand slightly smaller than minute hand and tick marks
        context.lineWidth = 3;
        //make the second hand red to stand out
        context.strokeStyle = '#DC143C';
        context.moveTo(0, 0);
        context.lineTo(125, 0);
        context.stroke();
        context.restore();
    }

    //hour markings
    function drawHourMarkings() {
        context.save();
        context.strokeStyle = 'black';
        //make hour marks the same size as the hour hand
        context.lineWidth = 10;
        for (k = 1; k <= 12; k++) {
            context.beginPath();
            //1/12th of 360 deg
            context.rotate(Math.PI / 6);
            context.moveTo(90, 0);
            context.lineTo(125, 0);
            context.stroke();
        }
        context.restore();
    }
  
    //minute markings
    function drawMinuteMarkings() {
        context.save();
        context.strokeStyle = 'black';
        //make hour marks the same size as the minute hand
        context.lineWidth = 5;
        for (k = 0; k < 60; k++) {
            //make minute marks everywhere needed and not on top of hour marks
            if (k % 5 !== 0) {
                context.beginPath();
                context.moveTo(105, 0);
                context.lineTo(125, 0);
                context.stroke();
            }
        context.rotate(Math.PI / 30);
        }
        context.restore();
    }
  
    //drawing black and red outside cirlces
    function drawBarriers() {
        //outer red barrier
        context.beginPath();
        context.lineWidth = 14;
        context.strokeStyle = '#AA4A44';
        context.arc(0, 0, 180, 0, Math.PI * 2, true);
        context.stroke();
        //inner black barrier
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.arc(0, 0, 125, 0, Math.PI * 2, true);
        context.stroke();
        //make clock look 3d attatched to wall
        context.beginPath();
        context.strokeStyle = '#7B7A72';
        context.lineWidth = 3;
        context.arc(0,0,185,0,Math.PI * 2, true);
        context.stroke();

    }

    //draw everything from functions in correct hierarchical order
    drawWrist();
    drawWatchBand();
    colorBackgroundCircles();
    drawLogo();
    drawHourHand();
    drawHourMarkings();
    drawMinuteHand();
    drawMinuteMarkings();
    drawSecondsHand();
    printNumbers();
    drawBarriers();
    drawHandCover();
    context.restore();
    window.requestAnimationFrame(watch);
  }
window.requestAnimationFrame(watch);
