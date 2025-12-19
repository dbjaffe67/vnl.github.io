
/* 
 * Current injection tookit
 * 
 * Copyright (c) 2014 David Jaffe
 * 
 * 
 * 
 */


function setIstep(){					// darkens the appropriate stimulus tool
	
	var x = document.getElementById("ChooseProtocol").value;
	
	//document.getElementById('protocols').innerHTML = '';    // clear all of params

	x = parseInt(x);
	
				
	ToolChoice = x;
	
	
			
	switch (x){					// clear everyone but the one that was clicked
		case 0:
			
			istepaParams();
			
		
			break;
		case 1:
			istepbParams();
		

			break;
		case 2:
			
			istepcParams();
	
			break;				
		}
				
	
}

function setIh(x){					// holding potential
	ih = x;
	
	var c = document.getElementById('ihValue');
    c.value = ih; 
    
    c = document.getElementById('ihslide');
    c.value = ih;  
}

function setIc(x){					// command potential
	ic = x;
	var c = document.getElementById('icValue');
    c.value = x;  	
    c = document.getElementById('icslide');
    c.value = x;
}


function sethDur(x){				// Holding potential duration
	ihdur = x;
	var c = document.getElementById('durh');
    c.value = x;  
    c = document.getElementById('ihdurslide');
    c.value = x;
}


function setcDur(x){				// command potential duration
	icdur = x;
	var c = document.getElementById('durc');
    c.value = x;  
    c = document.getElementById('icdurslide');
    c.value = x;	
}


///////////////////////////
//
//    Next three functions write the html for the ISTEP protocols
//
///////////////////////////

function istepaParams(){
//	document.getElementById('protocols').innerHTML = document.getElementById('protocolA').innerHTML;    // clear all of params
		document.getElementById('protocolImage').innerHTML = "<img src='images/p1.png'>"

	
	setIh(0);
	sethDur(10);


}

function istepbParams(){
//	document.getElementById('protocols').innerHTML = document.getElementById('protocolB').innerHTML; 
	document.getElementById('protocolImage').innerHTML = "<img src='images/p2.png'>"
	

	
	setIh(0);
	setIc(100);
	
	sethDur(10);
	setcDur(50);

}

function istepcParams(){
//	document.getElementById('protocols').innerHTML = document.getElementById('protocolC').innerHTML; 
		document.getElementById('protocolImage').innerHTML = "<img src='images/p3.png'>"

	setIh(0);
	setIc(100);
	
	sethDur(10);
	setcDur(50);
	

}