
/* 
 * Current injection tookit
 * 
 * Copyright (c) 2014 David Jaffe
 * 
 * 
 * 
 */


function setIstep(x){					// darkens the appropriate stimulus tool
	
		
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


function setTdur(x){				// Holding potential duration
	TotalDur = x;
	var c = document.getElementById('durT');
    c.value = x;  
    c = document.getElementById('Tdurslide');
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

	document.getElementById('protocolImage').innerHTML = "<img src='images/p1.png'>"
	
	setIh(0);
	sethDur(40);


}

function istepbParams(){
	
	document.getElementById('protocolImage').innerHTML = "<img src='images/p2.png'>"
	
	setIh(0);
	setIc(3);
	
	sethDur(10);
	setcDur(20);

}

function istepcParams(){
	document.getElementById('protocolImage').innerHTML = "<img src='images/p3.png'>"

	setIh(0);
	setIc(3);
	
	sethDur(10);
	setcDur(20);
	

}