
var ModelChoice = 0;
var ToolChoice = 0;
var vstep = new Array();
var trace = new Array();
var storedTrace = new Array();
var tempTrace = new Array();
var avgTrace = new Array();
var noise = new Array();
var dt = 0.025;
var seed = 0;

var avgCount = 0.;

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
	document.getElementById("avgtraces").checked = false;

	storedTrace = trace.slice(0);
	showTrace();
}


function choosemodel(num){
  ModelChoice = num;
}

function setSeed(x){
	seed = x;

	var c = document.getElementById('pick');
    c.value = iseedrnd(seed,4).toString();  	
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
			leak();
			break;
		case 1:
			nahh();
			break;
		case 2:
			khh();
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

//////////////////////////////////
//
// 			Display trace
//
//////////////////////////////////



function showTrace(){				// trace is a global variable
	var n;
	var t;
	
	 // Create and populate the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Time');
          data.addColumn('number', 'Current');
          
          var checkbox = document.getElementById("storage");
		  if(checkbox.checked){							// grab the last trace and store it
					data.addColumn('number','Stored Current');
		  }
		  
		  var avgbox = document.getElementById("avgtraces");
          if(avgbox.checked){							// grab the last trace and store it
        			data.addColumn('number','Average Current');
		  }
                   
                   
          if (storage.checked){
                    
         	 for (var i = 0; i < (trace.length); i=i+1) 
         	 	{
	    			n = trace[i];
	    			o = storedTrace[i];
	    			p = tempTrace[i];
	    			t = Math.round(i*dt*100)/100;				
     			
     					data.addRow([t, n, o]); 							
     			}
     		}
			else if(avgtraces.checked)
			{
				avgCount += 1.;
				for (var i = 0; i < (trace.length); i=i+1) 
         	 	{
	    			n = trace[i];
	    			o = storedTrace[i];
	    			
	    			t = Math.round(i*dt*100)/100;
	    			tempTrace[i] += trace[i];	
	    			avgTrace[i] = tempTrace[i]/avgCount;			
     				p = avgTrace[i];
     					data.addRow([t, n, p]); 							
     			}
		
			
			}
			else if(!storage.checked && !avgtraces.checked)
			{
				for (var i = 0; i < (trace.length); i=i+1) 
         	 	{
	    			n = trace[i];
	    			o = storedTrace[i];
	    			p = tempTrace[i];
	    			t = Math.round(i*dt*100)/100;				
     			
     					data.addRow([t, n]); 							
     			}
			
			
			}			
			
			
			
			
	

    
  	var chart = new google.visualization.ScatterChart(
    document.getElementById('scope'));
          chart.draw(data, {vAxis: {title: "Current (pA)", titleTextStyle: {color: "green"}},
                            hAxis: {title: "Time (ms)", titleTextStyle: {color: "green"}},
                            lineWidth: 2, pointSize: 0, chartArea: {width: "80%", height: "80%"}, legend: 'none'}
                    );
                    
	
}

function showPNG(){
	grChartImg.ShowImage('scope', true);
	console.log("yes");
}

function setAvg(){
	document.getElementById("storage").checked = false;
	tempTrace = trace.slice(0);
	avgTrace = trace.slice(0);
	for (var i=0;i<trace.length;i++){			// zero out temp trace for accumulation
		tempTrace[i] = 0;
	}
	avgCount = 0.;
	showTrace();
}


function launchGrapher(){
	console.log('yes');
	window.open("http://vnl.utsa.edu/sims/SimpleGrapher", "_blank", 'toolbar=0,location=0,menubar=0,height=600, width=800');
}




