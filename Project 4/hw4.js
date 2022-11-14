function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
	var slider2 = document.getElementById('slider2');
	var slider3 = document.getElementById('slider3');
	var checkbox = document.getElementById('switch');
    slider1.value = 0;
	slider3.value = 5;
	slider2.value = 10;

    function draw() {
	canvas.width = canvas.width;
	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
	var t2Param = slider2.value*0.01;
	var t3Param = slider3.value*0.01;
	//functions taken from demos, used to draw path and planes
	function moveToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.moveTo(res[0],res[1]);}
	function lineToTx(loc,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,loc,Tx); context.lineTo(res[0],res[1]);}
	//draws planes on track
	function drawPlane(color,Tx) {
	    context.beginPath();
	    context.fillStyle = color;
	    moveToTx([-.05,-.05],Tx);
	    lineToTx([-.05,.00],Tx);
      	lineToTx([-.15,.00],Tx);
      	lineToTx([-.05,.05],Tx);
      	lineToTx([0,.1],Tx);
	    lineToTx([.05,.05],Tx);
      	lineToTx([.15,.00],Tx);
      	lineToTx([.05,.00],Tx);
	    lineToTx([.05,-.05],Tx);
	    context.closePath();
	    context.fill();
	}
	//function used to create the two hermite curves used to make figure 8
	var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}
	//function used to get orientation for planes by taking the derivative
	//and using it as the tangent line of the curve
    var HermiteDerivative = function(t) {
        return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
        ];
    }
	//cubic function taken from demos
	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec2.create();
	    vec2.scale(result,P[0],b[0]);
	    vec2.scaleAndAdd(result,result,P[1],b[1]);
	    vec2.scaleAndAdd(result,result,P[2],b[2]);
	    vec2.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
	//p is positions d is direction
	//coordinates used for original figure 8 track
	var p0=[0,0];
	var d0=[7,1];
	var p1=[0,2];
	var d1=[7,-1];
	var p2=[0,0];
	var d2=[7,1];
	//coordinates and directions used for duplicate tracks
	var cp0=[0,-0.03];
	var cd0=[7,1];
	var cp1=[0,1.97];
	var cd1=[7,-1];
	var cp2=[0,-0.03];
	var cd2=[7,1];
	//first set of tracks
	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents
	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
	//second set of tracks
	var P2 = [cp0,cd0,cp1,cd1]; //copy but lower
	var P3 = [cp1,cd1,cp2,cd2]; //copy but lower
	var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
	var C3 = function(t_) {return Cubic(Hermite,P3,t_);};
	//used to get orientation for the planes to face the correct direction on the path
	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
	//taken from demos to 
	var Ccomp = function(t) {
        if (t<1){
            var u = t;
            return C0(u);
        } else {
            var u = t-1.0;
            return C1(u);
        }          
	}
	var Ccomp_tangent = function(t) {
        if (t<1){
            var u = t;
            return C0prime(u);
        } else {
            var u = t-1.0;
            return C1prime(u);
        }          
	}
	//used to draw actual tracks for planes
	function drawTrajectory(t_begin,t_end,intervals,C,Tx,color) {
	    context.strokeStyle=color;
	    context.beginPath();
        moveToTx(C(t_begin),Tx);
        for(var i=1;i<=intervals;i++){
            var t=((intervals-i)/intervals)*t_begin+(i/intervals)*t_end;
            lineToTx(C(t),Tx);
        }
        context.stroke();
	}
	//setup for placing the tracks
	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[125,300]); //move over 125 right and 300 down
	mat3.scale(Tblue_to_canvas,Tblue_to_canvas,[150,-150]); // Flip the Y-axis
	mat3.rotate(Tblue_to_canvas,Tblue_to_canvas,17.25); //rotate to make figure 8 correct orientation
	//draws path when checkbox is unchecked, erases them when checkbox is checked
	if(!checkbox.checked) {
		drawTrajectory(0.0,1.0,1000,C0,Tblue_to_canvas,"cyan");
		drawTrajectory(0.0,1.0,1000,C1,Tblue_to_canvas,"cyan");
		drawTrajectory(0.0,1.0,1000,C2,Tblue_to_canvas,"cyan"); //added for thickness / double tracking
		drawTrajectory(0.0,1.0,1000,C3,Tblue_to_canvas,"cyan"); //added for thickness / double tracking
	}
	//setup for adding the 1st green plane
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,Ccomp(tParam));
	var Tgreen_to_canvas = mat3.create();
    var tangent_1 = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent_1[1],tangent_1[0]);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,angle);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,17.2);
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	drawPlane("green",Tgreen_to_canvas);
	// setup for adding the 2nd grey plane
	// 2nd slider affects grey plane
	var Tblue_to_blue = mat3.create();
	mat3.fromTranslation(Tblue_to_blue,Ccomp(t2Param));
	var Tgrey_to_canvas = mat3.create();
    var tangent_2 = Ccomp_tangent(t2Param);
    var angle = Math.atan2(tangent_2[1],tangent_2[0]);
	mat3.rotate(Tblue_to_blue,Tblue_to_blue,angle);
	mat3.rotate(Tblue_to_blue,Tblue_to_blue,17.2);
	mat3.multiply(Tgrey_to_canvas, Tblue_to_canvas, Tblue_to_blue);
	drawPlane("grey",Tgrey_to_canvas);
	// setup for adding the 3rd red plane
	// 3rd slider affects red plane
	var Tred_to_blue = mat3.create();
	mat3.fromTranslation(Tred_to_blue,Ccomp(t3Param));
	var Tred_to_canvas = mat3.create();
    var tangent_3 = Ccomp_tangent(t3Param);
    var angle = Math.atan2(tangent_3[1],tangent_3[0]);
	mat3.rotate(Tred_to_blue,Tred_to_blue,angle);
	mat3.rotate(Tred_to_blue,Tred_to_blue,17.2);
	mat3.multiply(Tred_to_canvas, Tblue_to_canvas, Tred_to_blue);
	drawPlane("red",Tred_to_canvas);
	}
    //plane position dependent on slider input position
    slider1.addEventListener("input",draw);
	slider2.addEventListener("input",draw);
	slider3.addEventListener("input",draw);
	//allow the checkbox to erase / draw the path from user input
	checkbox.addEventListener("input", draw);
    draw();
}
window.onload = setup;
