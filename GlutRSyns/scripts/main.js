
var ModelChoice = 0;
var ToolChoice = 0;
var vstep = new Array();
var trace = new Array();
var trace2 = new Array();
var noise = new Array();
var storedTrace = new Array();
var storedTrace2 = new Array();
var dt = 0.1;
var seed = 0;

var vh = -80;
var vc = 20;
var vhdur = 10;
var vcdur = 40;

var storeflag = 0;


//////////////////////////////////
//
// 			Hold trace function
//
//////////////////////////////////


function setStorage(){						// holds the current trace 
	
	storedTrace = trace.slice(0);
	storedTrace2 = trace2.slice(0);
	showTrace();
}


function choosemodel(num){
  ModelChoice = num;
}

function setSeed(x){
	seed = x;

	
//	var c = document.getElementById('seedID');
//	c.value = iseedrnd(seed,4).toString();  	
}

function pickit(){

  window.alert("1");

}

function runModel(){					// based on selection, run them model



	switch (ToolChoice) {				// pick protocol tool
		case 0:						
				makeVstep1(vh, vhdur, 0, 0);
				break;
		case 1:
				makeVstep1(vh, vhdur, vc, vcdur);
				break;
		case 2:
				makeVstep2(vh, vhdur, vc, vcdur);
				break;
	}
	
	switch (ModelChoice){
		case 0:
			vclamp();
			break;
		case 1:
			vclamp();
			break;
		case 2:
			vclamp();
			break;
	}
	showTrace();
	
}

function makeVstep1(a,b,c,d) {			// single step

	var dur = parseFloat(b)+parseFloat(d);

	vstep.length = (dur/dt);
	for (var i=0;i<(b/dt);i=i+1){
		vstep[i] = parseFloat(vh);
	}
	for (i=(b/dt);i<(dur/dt);i=i+1){
		vstep[i] = parseFloat(vc);
	}
	
	//trace = vstep.slice(0);			// copies trace to vstep
}

function makeVstep2(a,b,c,d) {			// single step

	var dur2 = parseFloat(b)+parseFloat(d)+parseFloat(b);
	var dur1 = parseFloat(d)+parseFloat(b);

	vstep.length = (dur2/dt);
	for (var i=0;i<(b/dt);i=i+1){
		vstep[i] = parseFloat(vh);
	}
	for (i=(b/dt);i<(dur1/dt);i=i+1){
		vstep[i] = parseFloat(vc);
	}
	for (i=(dur1/dt);i<(dur2/dt);i=i+1){
		vstep[i] = parseFloat(vh);
	}
	
	
	//trace = vstep.slice(0);			// copies trace to vstep
}



function showTrace(){				// trace is a global variable
	var n;
	var n2;
	var o;
	var o2;
	var t;
	
	 // Create and populate the data table.
          var data = new google.visualization.DataTable();
          var data2 = new google.visualization.DataTable();
          data.addColumn('number', 'Time');
          data.addColumn('number', 'Current');
          
         data2.addColumn('number', 'Time');
          data2.addColumn('number', 'Potential');
                    
          var checkbox = document.getElementById("storage");
		  if(checkbox.checked){							// grab the last trace and store it
			data.addColumn('number','Stored Current');
			data2.addColumn('number','Stored Potential');
		  }          
                    
                            
          for (var i = 0; i < (trace.length); i=i+1) {
	    		n = trace[i];
	    		n2 = trace2[i];
	    		o = storedTrace[i];
	    		o2 = storedTrace2[i];
	    		t = Math.round(i*dt*100)/100;	
	    		
	    		if(checkbox.checked){					
     				data.addRow([t, n, o]);
     				data2.addRow([t,n2,o2]);
     				}
     				else
     				{
     				     	data.addRow([t, n]);
     					     data2.addRow([t, n2]);	     	
     				}
            }

    
  	var chart = new google.visualization.ScatterChart(
    document.getElementById('scope'));
    
    var clamp = document.getElementById("clamptype");
    
    if (clamp.value == 1){
    
          chart.draw(data, {vAxis: {title: "Current (pA)", titleTextStyle: {color: "green"}},
                            hAxis: {title: "Time (ms)", titleTextStyle: {color: "green"}},
                            lineWidth: 2, pointSize: 0, chartArea: {width: "80%", height: "80%"}, legend: 'none'}
                    );
                    
    }
    
    if (clamp.value == 0){
       chart.draw(data2, {vAxis: {title: "Potential (mV)", titleTextStyle: {color: "green"}},
                            hAxis: {title: "Time (ms)", titleTextStyle: {color: "green"}},
                            lineWidth: 2, pointSize: 0, chartArea: {width: "80%", height: "80%"}, legend: 'none'}
                    );               
    
    }
                    
                    
                    
                       
	
}

