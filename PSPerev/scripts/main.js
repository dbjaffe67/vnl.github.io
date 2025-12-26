
var ModelChoice = 0;
var ToolChoice = 0;
var istep = new Array();
var trace = new Array();
var noise = new Array();
var dt = 0.1;
var seed = 0;

var storedTrace = new Array();
var tempTrace = new Array();
var avgTrace = new Array();
var averageCount = 0;


var ih = 0.;
var ic = 1.e-9;
var ihdur = 40;
var icdur = 40;
var TotalDur = 40;

var avgCount = 0.;


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


function choosemodel(num){					// Select which model - remains from old version
  ModelChoice = num;
}

function choosemodel(num){
  ModelChoice = num;
}

function setSeed(x){
	seed = x;
	    
//	var c = document.getElementById('seedID');
//    c.value = iseedrnd(seed,4).toString();  	
	
}

function pickit(){

  window.alert("1");

}

function runModel(){					// based on selection, run them model

	switch (ToolChoice) {				// pick protocol tool
		case 0:						
				makeIstep1(ih, ihdur, 0, 0);
				break;
		case 1:
				makeIstep1(ih, ihdur, ic, icdur);
				break;
		case 2:
				makeIstep2(ih, ihdur, ic, icdur);
				break;
	}
	
	
	PSPerev();

	showTrace();
	
}

function makeIstep1(a,b,c,d) {			// single step

	var dur = parseFloat(b)+parseFloat(d);

	istep.length = (dur/dt);

	for (var i=0;i<(b/dt);i=i+1){
		istep[i] = parseFloat(ih);
	}
	for (i=(b/dt);i<(dur/dt);i=i+1){
		istep[i] = parseFloat(ic);
	}
	
	//trace = vstep.slice(0);			// copies trace to vstep
}

function makeIstep2(a,b,c,d) {			// single step

	var dur2 = parseFloat(b)+parseFloat(d)+parseFloat(b);
	var dur1 = parseFloat(d)+parseFloat(b);

	istep.length = (dur2/dt);
	for (var i=0;i<(b/dt);i=i+1){
		istep[i] = parseFloat(vh);
	}
	for (i=(b/dt);i<(dur1/dt);i=i+1){
		istep[i] = parseFloat(vc);
	}
	for (i=(dur1/dt);i<(dur2/dt);i=i+1){
		istep[i] = parseFloat(vh);
	}
	
	
	//trace = vstep.slice(0);			// copies trace to vstep
}



function showTrace(){				// trace is a global variable
	var n;
	var t;
	
	 // Create and populate the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Time');
          data.addColumn('number', 'Current');
                    
        var checkbox = document.getElementById("storage");
		  if(checkbox.checked){							// grab the last trace and store it
			data.addColumn('number','Stored Potential');
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
          chart.draw(data, {vAxis: {title: "Potential (mV)", titleTextStyle: {color: "green"}},
                            hAxis: {title: "Time (ms)", titleTextStyle: {color: "green"}},
                            lineWidth: 2, pointSize: 0, chartArea: {width: "80%", height: "80%"}, legend: 'none'}
                    );
                    
	
}

function saveTrace(){
		
	var istr;
	var pstr;
	var res;
	var csvRows = new Array();
	
	for (var i=0; i<trace.length; ++i) {
		istr = istep[i].toString();
		pstr = trace[i].toString();
	
		csvRows.push(istr + ',' + pstr);
		}
		
	var csvString = csvRows.join("\n");
	
	var link = document.createElement('a');
	var encodedUri = encodeURI(csvString);
	link.setAttribute("href", "data:text/csv;charset=utf-8,\uFEFF" + encodedUri);
	link.setAttribute("download","data.csv");
	link.click();

}

function showPNG(){
	grChartImg.ShowImage('scope', true);
	console.log("yes");
}


function launchGrapher(){
	console.log('yes');
	window.open("http://vnl.utsa.edu/sims/SimpleGrapher", "_blank", 'toolbar=0,location=0,menubar=0,height=600, width=800');
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