
function setVstep2(x){


}


function setVstep(x){
	
		
	var x = document.getElementById("ChooseProtocol").value;
	
	//document.getElementById('protocols').innerHTML = '';    // clear all of params

	x = parseInt(x);
	
				
	ToolChoice = x;
		
	switch (x){					// clear everyone but the one that was clicked
		case 0:
		
			vstepaParams();
			
		
			break;
		case 1:
		
			vstepbParams();
		

			break;
		case 2:
		
			vstepcParams();
	
			break;				
		}
				
	
}

function setVh(x){
	vh = x;
	
	var c = document.getElementById('vhValue');
    c.value = vh; 
    
    c = document.getElementById('vhValue');
    c.value = vh;  
}

function setVc(x){
	vc = x;
	var c = document.getElementById('vcValue');
    c.value = x;  	
    c = document.getElementById('vcslide');
    c.value = x;
}


function sethDur(x){
	vhdur = x;
	var c = document.getElementById('durh');
    c.value = x;  
    c = document.getElementById('vhdurslide');
    c.value = x;
}


function setcDur(x){
	vcdur = x;
	var c = document.getElementById('durc');
    c.value = x;  
    c = document.getElementById('vcdurslide');
    c.value = x;	
}


function vstepaParams(){
		document.getElementById('protocolImage').innerHTML = "<img src='images/p1.png'>"
	
	
	
	setVh(-80);
	sethDur(10);


}

function vstepbParams(){
	document.getElementById('protocolImage').innerHTML = "<img src='images/p2.png'>"
	
	
	
	setVh(-80);
	setVc(20);
	
	sethDur(10);
	setcDur(10);

}

function vstepcParams(){
	document.getElementById('protocolImage').innerHTML = "<img src='images/p3.png'>"	
	
	setVh(-80);
	setVc(20);
	
	sethDur(10);
	setcDur(10);

}