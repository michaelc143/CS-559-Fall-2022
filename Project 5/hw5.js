function setup() {
    var observerCanvas = document.getElementById('observerCanvas');
    var cameraCanvas = document.getElementById('cameraCanvas');
    var observerContext = observerCanvas.getContext('2d');
    var cameraContext = cameraCanvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    var context = cameraContext; // default to drawing in the camera window

    function draw() {
      
    // clear both canvas instances
	observerCanvas.width = observerCanvas.width;
	cameraCanvas.width = cameraCanvas.width;

	// use the sliders to get the angles
	var tParam = slider1.value*0.01;
    var viewAngle = slider2.value*0.02*Math.PI;
    //function to move drawing line
	function moveToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.moveTo(res[0],res[1]);}
    //function to create line to
	function lineToTx(loc,Tx)
	{var res=vec3.create(); vec3.transformMat4(res,loc,Tx); context.lineTo(res[0],res[1]);}
	//draws arrow that goes acros line
	function drawObject(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        
        //use for loop to draw front face repeatedly
        //in order to add depth by modifying z-coord
        for(let i = -0.1; i<0.1; i+=0.01) {
            context.beginPath();
	        context.fillStyle = color;
            moveToTx([0,0,i],Tx);
            lineToTx([0.2,0,i],Tx);
            lineToTx([0.2,0.2,i],Tx);
            lineToTx([0,0.2,i],Tx);
            lineToTx([0,0,i],Tx);
            context.closePath();
	        context.fill();
        }
	}
	
    function drawCamera(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);
        context.beginPath();
	    context.strokeStyle = color;
        // Twelve edges of a cropped pyramid
        moveToTx([-3,-3,-2],Tx);lineToTx([3,-3,-2],Tx);
        lineToTx([3,3,-2],Tx);lineToTx([-3,3,-2],Tx);
        moveToTx([3,-3,-2],Tx);lineToTx([2,-2,0],Tx);
        lineToTx([2,2,0],Tx);lineToTx([3,3,-2],Tx);
        moveToTx([2,-2,0],Tx);lineToTx([-2,-2,0],Tx);
        lineToTx([-2,2,0],Tx);lineToTx([2,2,0],Tx);
        moveToTx([-2,-2,0],Tx);lineToTx([-3,-3,-2],Tx);
        lineToTx([-3,3,-2],Tx);lineToTx([-2,2,0],Tx);
        context.stroke();
    }
      
    function draw3DAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // X-label
	    moveToTx([1.3,-.05,0],Tx);lineToTx([1.4,.05,0],Tx);
	    moveToTx([1.3,.05,0],Tx);lineToTx([1.4,-.05,0],Tx);
        // Y-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.35,0],Tx);lineToTx([.05,1.4,0],Tx);
        moveToTx([0,1.35,0],Tx);lineToTx([0,1.28,0],Tx);
	    // Z-label
	    moveToTx([-.05,0,1.3],Tx);
	    lineToTx([.05,0,1.3],Tx);
	    lineToTx([-.05,0,1.4],Tx);
	    lineToTx([.05,0,1.4],Tx);

	    context.stroke();
	}

    function drawUVWAxes(color,TxU,scale) {
        var Tx = mat4.clone(TxU);
        mat4.scale(Tx,Tx,[scale,scale,scale]);

        context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([1.2,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,1.2,0],Tx);
        moveToTx([0,0,0],Tx);lineToTx([0,0,1.2],Tx);
	    // Arrowheads
	    moveToTx([1.1,.05,0],Tx);lineToTx([1.2,0,0],Tx);lineToTx([1.1,-.05,0],Tx);
	    moveToTx([.05,1.1,0],Tx);lineToTx([0,1.2,0],Tx);lineToTx([-.05,1.1,0],Tx);
      	moveToTx([.05,0,1.1],Tx);lineToTx([0,0,1.2],Tx);lineToTx([-.05,0,1.1],Tx);
	    // U-label
        moveToTx([1.3,.05,0],Tx);lineToTx([1.3,-.035,0],Tx);lineToTx([1.35,-.05,0],Tx);
        lineToTx([1.4,-.035,0],Tx);lineToTx([1.4,.05,0],Tx);
        // V-label
        moveToTx([-.05,1.4,0],Tx);lineToTx([0,1.3,0],Tx);lineToTx([.05,1.4,0],Tx);
	    // W-label
	    moveToTx([-.1,0,1.3],Tx);lineToTx([-.05,0,1.4],Tx);lineToTx([-0,0,1.3],Tx);
	    lineToTx([.05,0,1.4],Tx);lineToTx([.1,0,1.3],Tx);

	    context.stroke();
	}

    function draw2DAxes(color,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // Axes
	    moveToTx([120,0,0],Tx);lineToTx([0,0,0],Tx);lineToTx([0,120,0],Tx);
	    // Arrowheads
	    moveToTx([110,5,0],Tx);lineToTx([120,0,0],Tx);lineToTx([110,-5,0],Tx);
	    moveToTx([5,110,0],Tx);lineToTx([0,120,0],Tx);lineToTx([-5,110,0],Tx);
	    // X-label
	    moveToTx([130,0,0],Tx);lineToTx([140,10,0],Tx);
	    moveToTx([130,10,0],Tx);lineToTx([140,0,0],Tx);
        // Y-label
        moveToTx([0,128,0],Tx);lineToTx([5,133,0],Tx);lineToTx([10,128,0],Tx);
        moveToTx([5,133,0],Tx);lineToTx([5,140,0],Tx);
	    context.stroke();
	}

    function drawUpVector(color,vecUp,Tx) {
	    context.strokeStyle=color;
	    context.beginPath();
	    // A single line segment in the "up" direction
	    moveToTx([0,0,0],Tx);
        lineToTx(vecUp,Tx);
	    context.stroke();
    }
    var Hermite = function(t) {
	    return [
		2*t*t*t-3*t*t+1,
		t*t*t-2*t*t+t,
		-2*t*t*t+3*t*t,
		t*t*t-t*t
	    ];
	}

    var HermiteDerivative = function(t) {
        return [
        6*t*t-6*t,
        3*t*t-4*t+1,
        -6*t*t+6*t,
        3*t*t-2*t
        ];
    }

	function Cubic(basis,P,t){
	    var b = basis(t);
	    var result=vec3.create();
	    vec3.scale(result,P[0],b[0]);
	    vec3.scaleAndAdd(result,result,P[1],b[1]);
	    vec3.scaleAndAdd(result,result,P[2],b[2]);
	    vec3.scaleAndAdd(result,result,P[3],b[3]);
	    return result;
	}
    //points and directions for parametric curve
	var p0=[0,0,0];
	var d0=[100,250,40];
	var p1=[95,175,-100];
	var d1=[-100,300,-50];
	var p2=[0,0,0];
	var d2=[-100,200,30];
    //added thickness
    var p02=[1,0,0];
	var d02=[100,250,40];
	var p12=[96,175,-100];
	var d12=[-98,300,-50];
	var p22=[1,0,0];
	var d22=[-100,200,30];
    //added thickness
    var p01=[2,0,0];
	var d01=[100,250,40];
	var p11=[97,175,-100];
	var d11=[-98,300,-50];
	var p21=[2,0,0];
	var d21=[-100,200,30];

	var P0 = [p0,d0,p1,d1]; // First two points and tangents
	var P1 = [p1,d1,p2,d2]; // Last two points and tangents
    var P2 = [p01,d01,p11,d11]; // First two points and tangents
	var P3 = [p11,d11,p21,d21]; // Last two points and tangents
    var P4 = [p02,d02,p12,d12]; // First two points and tangents
	var P5 = [p12,d12,p22,d22]; // Last two points and tangents

	var C0 = function(t_) {return Cubic(Hermite,P0,t_);};
	var C1 = function(t_) {return Cubic(Hermite,P1,t_);};
    var C2 = function(t_) {return Cubic(Hermite,P2,t_);};
	var C3 = function(t_) {return Cubic(Hermite,P3,t_);};
    var C4 = function(t_) {return Cubic(Hermite,P4,t_);};
	var C5 = function(t_) {return Cubic(Hermite,P5,t_);};

	var C0prime = function(t_) {return Cubic(HermiteDerivative,P0,t_);};
	var C1prime = function(t_) {return Cubic(HermiteDerivative,P1,t_);};
    
      
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

    //curve the camera moves along as the slider moves
    var CameraCurve = function(angle) {
        var distance = 110.0;
        var eye = vec3.create();
        eye[0] = distance*Math.sin(viewAngle);
        eye[1] = 60;
        eye[2] = distance*Math.cos(viewAngle);  
        return [eye[0],eye[1],eye[2]];
    }

    //draws the parametric curve
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

    // create two lookAt transforms; one for the camera
    // and one for the "external observer"

    // Create Camera (lookAt) transform
    // camera part, right window
    var eyeCamera = CameraCurve(viewAngle);
    var targetCamera = vec3.fromValues(0,0,0); // Aim at the origin of the world coords
    var upCamera = vec3.fromValues(0,100,0); // Y-axis of world coords to be vertical
	var TlookAtCamera = mat4.create();
    mat4.lookAt(TlookAtCamera, eyeCamera, targetCamera, upCamera);
      
    // Create Camera (lookAt) transform
    //observer part, left window
    var eyeObserver = vec3.fromValues(500,300,500);
    var targetObserver = vec3.fromValues(0,50,0); // Observer still looks at origin
    var upObserver = vec3.fromValues(0,1,0); // Y-axis of world coords to be vertical
	var TlookAtObserver = mat4.create();
    mat4.lookAt(TlookAtObserver, eyeObserver, targetObserver, upObserver);
      
    // Create ViewPort transform (assumed the same for both canvas instances)
    var Tviewport = mat4.create();
	mat4.fromTranslation(Tviewport,[200,300,0]);  // Move the center of the
                                                  // "lookAt" transform (where
                                                  // the camera points) to the
                                                  // canvas coordinates (200,300)
	mat4.scale(Tviewport,Tviewport,[100,-100,1]); // Flip the Y-axis,
                                                  // scale everything by 100x

    context = cameraContext;

    // Create Camera projection transform
    // (orthographic for now)
    var TprojectionCamera = mat4.create();
    mat4.ortho(TprojectionCamera,-100,100,-100,100,-1,1);
    //mat4.perspective(TprojectionCamera,Math.PI/4,1,-1,1); // Use for perspective teaser!

    // Create Observer projection transform
    // (orthographic for now)
    var TprojectionObserver = mat4.create();
    mat4.ortho(TprojectionObserver,-120,120,-120,120,-1,1);
     
    // Create transform t_VP_PROJ_CAM that incorporates
    // Viewport, projection and camera transforms
    var tVP_PROJ_VIEW_Camera = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Camera,Tviewport,TprojectionCamera);
    mat4.multiply(tVP_PROJ_VIEW_Camera,tVP_PROJ_VIEW_Camera,TlookAtCamera);
    var tVP_PROJ_VIEW_Observer = mat4.create();
    mat4.multiply(tVP_PROJ_VIEW_Observer,Tviewport,TprojectionObserver);
    mat4.multiply(tVP_PROJ_VIEW_Observer,tVP_PROJ_VIEW_Observer,TlookAtObserver);
      
	// Create model(ing) transform
    // (from moving object to world)
    // green arrow angles and tangents
    var Tmodel = mat4.create();
	mat4.fromTranslation(Tmodel,Ccomp(tParam));
    var tangent = Ccomp_tangent(tParam);
    var angle = Math.atan2(tangent[1],tangent[0]);
    mat4.rotateZ(Tmodel,Tmodel,1.5);
	mat4.rotateZ(Tmodel,Tmodel,angle);
    mat4.rotateX(Tmodel,Tmodel,185.3);

    // Create transform t_VP_PROJ_VIEW_MOD that incorporates
    // Viewport, projection, camera, and modeling transform
    var tVP_PROJ_VIEW_MOD_Camera = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD_Camera, tVP_PROJ_VIEW_Camera, Tmodel);
    var tVP_PROJ_VIEW_MOD1_Observer = mat4.create();
	mat4.multiply(tVP_PROJ_VIEW_MOD1_Observer, tVP_PROJ_VIEW_Observer, Tmodel);
    var tVP_PROJ_VIEW_MOD2_Observer = mat4.create();
    mat4.translate(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_Observer, eyeCamera);
	var TlookFromCamera = mat4.create();
    mat4.invert(TlookFromCamera,TlookAtCamera);
    mat4.multiply(tVP_PROJ_VIEW_MOD2_Observer, tVP_PROJ_VIEW_MOD2_Observer, TlookFromCamera);

    // Draw the following in the Camera window
    context = cameraContext;
    draw2DAxes("white", mat4.create());
	draw3DAxes("grey",tVP_PROJ_VIEW_Camera,100.0);
    // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Camera,1.0);
	drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Camera,"white");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Camera,"white");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Camera,"grey");
    drawTrajectory(0.0,1.0,100,C3,tVP_PROJ_VIEW_Camera,"grey");
    drawTrajectory(0.0,1.0,100,C4,tVP_PROJ_VIEW_Camera,"white");
    drawTrajectory(0.0,1.0,100,C5,tVP_PROJ_VIEW_Camera,"white");
    // draw3DAxes("green", tVP_PROJ_VIEW_MOD_Camera,100.0); // Uncomment to see "model" coords
    drawObject("red",tVP_PROJ_VIEW_MOD_Camera,100.0);
      
    // Draw the following in the Observer window
    context = observerContext;
	draw3DAxes("grey",tVP_PROJ_VIEW_Observer,100.0);  
    // drawUpVector("orange",upCamera,tVP_PROJ_VIEW_Observer,1.0);
    drawTrajectory(0.0,1.0,100,C0,tVP_PROJ_VIEW_Observer,"white");
    drawTrajectory(0.0,1.0,100,C1,tVP_PROJ_VIEW_Observer,"white");
    drawTrajectory(0.0,1.0,100,C2,tVP_PROJ_VIEW_Observer,"grey");
    drawTrajectory(0.0,1.0,100,C3,tVP_PROJ_VIEW_Observer,"grey");
    drawTrajectory(0.0,1.0,100,C4,tVP_PROJ_VIEW_Observer,"white");
    drawTrajectory(0.0,1.0,100,C5,tVP_PROJ_VIEW_Observer,"white");
    drawObject("red",tVP_PROJ_VIEW_MOD1_Observer,100.0);     
    drawCamera("white",tVP_PROJ_VIEW_MOD2_Observer,10.0); 
	drawUVWAxes("white",tVP_PROJ_VIEW_MOD2_Observer,100.0);  
    }
  
    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
}
window.onload = setup;
