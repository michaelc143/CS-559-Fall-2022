// removed all context.save and restores but I have 0 idea how to do rotations with glMatrix
function clock() {
        var date = new Date();
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        //used for hand movement
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        canvas.width = canvas.width;
        var stack = [ mat3.create() ];

        function setCanvasTransform(Tx) {
            context.setTransform(Tx[0], Tx[1], Tx[3], Tx[4], Tx[6], Tx[7]);
        }

        //function taken from given demos
        function moveToTx(x,y)  {
            var res=vec2.create(); vec2.transformMat3(res,[x,y],stack[0]); context.moveTo(res[0],res[1]);
        }

        //function taken from given demos
	    function lineToTx(x,y)  {
            var res=vec2.create(); vec2.transformMat3(res,[x,y],stack[0]); context.lineTo(res[0],res[1]);
        }

        //prints outer numbers
        function printNumbers() {
            stack.unshift(mat3.clone(stack[0]));
            //rotate to correctly orient 12 at top and 6 at bottom
            context.font = "bold 27px helvetica";
            //lining up numbers in correct spots
            context.textAlign = "center"; context.textBaseline = "middle";
            context.fillStyle = 'black';
            // starting x and y coordinates for numbers
            var x = 70;
            var y = -130;
            //printing each number starting at 1 ending at 12
            for(number = 1; number <= 12; number++) {
                context.fillText(number, x, y);
                // shifting x coordinate
                switch (number) {
                    case 1:
                    case 10:
                        x += 60;
                        break;
                    case 2:
                    case 9:
                        x += 20;
                        break;
                    case 3:
                    case 8:
                        x -= 20;
                        break;
                    case 4:
                    case 7:
                        x -= 60;
                        break;
                    case 5:
                    case 6:
                        x -= 70;
                        break;
                    case 11:
                        x += 70;
                }
                // shifting y coordinate
                switch (number) {
                    case 1:
                    case 4:
                        y += 60;
                        break;
                    case 2:
                    case 3:
                        y += 70;
                        break;
                    case 5:
                        y += 20;
                        break;
                    case 6:
                    case 12:
                        y -= 20;
                        break;
                    case 7:
                    case 10:
                        y -= 60;
                        break;
                    case 8:
                    case 9:
                        y -= 70;
                        break;
                    case 11:
                        y -= 20;
                }
            }
            stack.shift();
        }

        function circle() {
            context.beginPath();
            context.fillStyle = '#FFCD94'; //wrist background
            context.fillRect(-300, -200, 700, canvas.height*1.2);
            context.beginPath();
            context.fillStyle = 'black'; //watch band background
            context.fillRect(-100, -220, 200, canvas.height*1.3);
            context.beginPath();
            context.fillStyle = '#FFCD94'; //holes in watch band
            context.arc(0, 215, 10, 0, Math.PI * 2, true);
            context.fill();
            context.beginPath();
            context.fillStyle = '#FFCD94'; //holes in watch band
            context.arc(0, -200, 10, 0, Math.PI * 2, true);
            context.fill();
            context.beginPath();
            context.fillStyle = '#FFCD94'; //holes in watch band
            context.arc(0, 260, 10, 0, Math.PI * 2, true);
            context.fill();
            context.beginPath();
            context.fillStyle = '#E8DCB5'; //cream background
            context.arc(0, 0, 180, 0, Math.PI * 2, true);
            context.fill();
            context.beginPath();
            context.lineWidth = 2;
            context.fillStyle = 'black'; //black edge background
            context.arc(0, 0, 182, 0, Math.PI * 2, true);
            context.stroke();
            context.beginPath();
            context.fillStyle = '#808080'; //inner gray background
            context.arc(0, 0, 125, 0, Math.PI * 2, true);
            context.fill();
            context.beginPath();
            context.fillStyle = 'black';
            context.arc(0, 0, 10, 0, Math.PI * 2, true);
            context.fill();
        }

        function drawMinuteMarkings() {
            stack.unshift(mat3.clone(stack[0]));
            context.strokeStyle = 'black';
            //make hour marks the same size as the minute hand
            context.lineWidth = 5;
            for (k = 0; k < 60; k++) {
                //make minute marks everywhere needed and not on top of hour marks
                if (k % 5 !== 0) {
                    context.beginPath();
                    moveToTx(105, 0);
                    lineToTx(125, 0);
                    context.stroke();
                }
                context.rotate(Math.PI / 30);
            }
            stack.shift();
        }

        function drawHourMarkings() {
            stack.unshift(mat3.clone(stack[0]));
            context.strokeStyle = 'black';
            //make hour marks the same size as the hour hand
            context.lineWidth = 10;
            for (k = 1; k <= 12; k++) {
                context.beginPath();
                //1/12th of 360 deg
                context.rotate(Math.PI / 6);
                moveToTx(90, 0);
                lineToTx(125, 0);
                context.stroke();
            }
            stack.shift();
        }

        function secondHand() {
            stack.unshift(mat3.clone(stack[0]));
            context.rotate(-Math.PI / 2);
            //correctly line up hand to point at current second
            context.rotate(seconds * Math.PI / 30);
            context.beginPath();
            //make the second hand slightly smaller than minute hand and tick marks
            context.lineWidth = 3;
            //make the second hand red to stand out
            context.strokeStyle = '#DC143C';
            moveToTx(0, 0);
            lineToTx(125, 0);
            context.stroke();
            stack.shift();
        }

        function minuteHand() {
            stack.unshift(mat3.clone(stack[0]));
            context.rotate(-Math.PI / 2);
            //correctly line up hand to point at current minute
            context.rotate((Math.PI / 30) * minutes + (Math.PI / 1800) * seconds);
            //make line width same as minute tick marks
            context.beginPath();
            context.lineWidth = 5;
            context.strokeStyle = 'black';
            moveToTx(0, 0);
            lineToTx(110, 0);
            context.stroke();
            stack.shift();
        }

        function hourHand() {
            stack.unshift(mat3.clone(stack[0]));
            context.rotate(-Math.PI / 2);
            //correctly line up hand to point at current hour
            context.rotate((Math.PI / 6) * hours + (Math.PI / 360) * minutes + (Math.PI / 21600) * seconds);
            //make line width same as hour tick marks
            context.beginPath();
            context.lineWidth = 10;
            context.strokeStyle = 'navy';
            moveToTx(0, 0);
            lineToTx(80, 0);
            context.stroke();
            stack.shift();
        }

        //draws logos inside the watch face
        function drawLogo() {
            stack.unshift(mat3.clone(stack[0]));
            //drawing blue logo
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
            stack.shift();
        }

        var circleMatrix = mat3.create();
        mat3.fromTranslation(circleMatrix, [200, 160]);
        mat3.scale(circleMatrix, circleMatrix, [0.6, 0.6]);
        setCanvasTransform(circleMatrix);
        circle();

        var logoMatrix = mat3.create();
        mat3.fromTranslation(logoMatrix, [200, 160]);
        mat3.scale(logoMatrix, logoMatrix, [0.6, 0.6]);
        setCanvasTransform(logoMatrix);
        drawLogo();

        var numberMatrix = mat3.create();
        mat3.fromTranslation(numberMatrix, [200, 160]);
        mat3.scale(numberMatrix, numberMatrix, [0.6, 0.6]);
        setCanvasTransform(numberMatrix);
        printNumbers();

        var minuteMarkingsMatrix = mat3.create();
        mat3.multiply(minuteMarkingsMatrix, circleMatrix, minuteMarkingsMatrix);
        setCanvasTransform(minuteMarkingsMatrix);
        drawMinuteMarkings();

        var hourMarkingsMatrix = mat3.create();
        mat3.fromTranslation(hourMarkingsMatrix, [200, 160]);
        mat3.scale(hourMarkingsMatrix, hourMarkingsMatrix, [0.6, 0.6]);
        setCanvasTransform(hourMarkingsMatrix);
        drawHourMarkings();

        var secondHandMatrix = mat3.create();
        mat3.multiply(secondHandMatrix, circleMatrix, secondHandMatrix)
        setCanvasTransform(secondHandMatrix);
        secondHand();

        var minuteHandMatrix = mat3.create();
        mat3.multiply(minuteHandMatrix, circleMatrix, minuteHandMatrix);
        setCanvasTransform(minuteHandMatrix);
        minuteHand();

        var hourHandMatrix = mat3.create();
        mat3.multiply(hourHandMatrix, circleMatrix, hourHandMatrix);
        setCanvasTransform(hourHandMatrix);
        hourHand();
        window.requestAnimationFrame(clock);
    }
window.requestAnimationFrame(clock);