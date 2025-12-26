
function setVstep2(x){


}


function setVstep(x){
	
		
	ToolChoice = x;
	
	document.getElementById('protocols').innerHTML = '';    // clear all of params
		
	switch (x){					// clear everyone but the one that was clicked
		case 0:
			document.images["vstepa"].src = "images/VstepTool0.jpg";
			document.images["vstepb"].src = "images/VstepTool1off.jpg";
			document.images["vstepc"].src = "images/VstepTool2off.jpg";
			vstepaParams();
			
		
			break;
		case 1:
			document.images["vstepa"].src = "images/VstepTool0off.jpg";
			document.images["vstepb"].src = "images/VstepTool1.jpg";
			document.images["vstepc"].src = "images/VstepTool2off.jpg";
			vstepbParams();
		

			break;
		case 2:
			document.images["vstepa"].src = "images/VstepTool0off.jpg";
			document.images["vstepb"].src = "images/VstepTool1off.jpg";
			document.images["vstepc"].src = "images/VstepTool2.jpg";
			vstepbParams();
	
			break;				
		}
				
	
}

function setVh(x){
	vh = x;
	
	var c = document.getElementById('vhValue');
    c.value = vh; 
    
    c = document.getElementById('vhslide');
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
	document.getElementById('protocols').innerHTML = '';    // clear all of params
	
	// test add forms
	var element = document.createElement('div');

		
	var st1 = "V<sub>h</sub>  <input class='rangeH' min='-120' max='100' step='5' value='-80' onchange='setVh(this.value)' autofocus='' type='range'>";
	var st2 = "<input id='vhValue' type='text' value='-80' class='inform'>mV &nbsp; &nbsp;&nbsp;";
	var st3 = "Duration <input class='rangeH' min='5' max='100' step='5' value='20' onchange='sethDur(this.value)'  autofocus='' type='range'>";
	var st4 = "<input id='durh' type='text' value='10' class='inform' onChange='sethDur(this.value)'>ms";
	var res = st1.concat(st2,st3,st4);
	
	element.innerHTML = res;
	document.getElementById('protocols').appendChild(element);
	
	setVh(-80);
	sethDur(10);


}

function vstepbParams(){
	document.getElementById('protocols').innerHTML = '';    // clear all of params
	
	// test add forms
	var element = document.createElement('div');

	var st1 = "V<sub>h</sub>  <input class='rangeH' min='-120' max='100' step='5' value='-80' onchange='setVh(this.value)' autofocus='' id='vhslide' type='range'>";
	var st2 = "<input id='vhValue' onchange='setVh(this.value)' type='text' value='-80' class='inform'>mV &nbsp; &nbsp;&nbsp;";
	var st3 = "Duration <input class='rangeH' min='5' max='100' step='5' value='20' onchange='sethDur(this.value)' id='vhdurslide' autofocus='' type='range'>";
	var st4 = "<input id='durh' type='text' value='10' class='inform' onChange='sethDur(this.value)'>ms";
	var res = st1.concat(st2,st3,st4);

		
	element.innerHTML = res;
	document.getElementById('protocols').appendChild(element);
	
	element = document.createElement('div');
	
	st1 = "V<sub>c</sub>  <input class='rangeH' min='-120' max='100' step='5' value='20' onchange='setVc(this.value)' id='vcslide' autofocus='' type='range'>";
	st2 = "<input id='vcValue' type='text' value='-80' onchange='setVc(this.value)' class='inform'>mV &nbsp; &nbsp;&nbsp;";
	st3 = "Duration <input class='rangeH' min='5' max='100' step='5' value='20' onchange='setcDur(this.value)' id='vcdurslide' autofocus='' type='range'>";
	st4 = "<input id='durc' type='text' value='10' class='inform' onChange='setcDur(this.value)'>ms";
	res = st1.concat(st2,st3,st4);
		
	element.innerHTML = res;
	document.getElementById('protocols').appendChild(element);
	
	setVh(-80);
	setVc(20);
	
	sethDur(10);
	setcDur(10);

}

function vstepcParams(){
	document.getElementById('protocols').innerHTML = '';    // clear all of params
	
	// test add forms
	var element = document.createElement('div');
		
	element.innerHTML = "V<sub>h</sub> <input type='text' value='-80' onChange='setVh(this.value)' class='inform' name='myinputs[]'> mV &nbsp; Duration <input type='text' class='inform' value='10' onChange='sethDur(this.value)' name='myinputs[]'>ms";
	document.getElementById('protocols').appendChild(element);
	
	element = document.createElement('div');
	
	element.innerHTML = "V<sub>c</sub> <input type='text' value='20' onChange='setVc(this.value)' class='inform' name='myinputs[]'> mV &nbsp; Duration <input type='text' class='inform' value='40' onChange='setcDur(this.value)' name='myinputs[]'>ms";
	document.getElementById('protocols').appendChild(element);
	

}