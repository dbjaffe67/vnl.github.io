var ModelChoice = 0;
var ToolChoice = 0;
var istep = new Array();
var trace = new Array();
var storedTrace = new Array();
var averageCount = 0;
var noise = new Array();
var dt = 0.1;
var seed = 0;

var ih = 0.;
var ic = 1.e-9;
var ihdur = 10;
var icdur = 40;

var storeflag = 0;


//////////////////////////////////
//
// 			Hold trace function
//
//////////////////////////////////


function setStorage(){						// holds the current trace 
	
	storedTrace = trace.slice(0);
	showTrace();
}


function choosemodel(num){					// Select which model - remains from old version
  ModelChoice = num;
}


//////////////////////////////////
//
// 			Seed function
//
//////////////////////////////////

function setSeed(x){					
	seed = x;
}

//////////////////////////////////
//
// 			Run the simulation
//
//////////////////////////////////


function runModel(){					
	console.log(ic);
	switch (ToolChoice) {						// pick protocol tool
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
	
	
	switch (ModelChoice){						// save for future apps
		case 0:
			passiveSphere();
			break;
		case 1:
			passiveSphere();
			break;
	}
	showTrace();
	
}


//////////////////////////////////
//
// 			Generate the Isteps 
//
//////////////////////////////////


function makeIstep1(a,b,c,d) {			// constant

	var dur = parseFloat(b)+parseFloat(d);

	istep.length = (dur/dt);

	for (var i=0;i<(b/dt);i=i+1){
		istep[i] = parseFloat(ih);
	}
	for (i=(b/dt);i<(dur/dt);i=i+1){
		istep[i] = parseFloat(ic);
	}
	
}

function makeIstep2(a,b,c,d) {			// single step

	var dur2 = parseFloat(b)+parseFloat(d)+parseFloat(b);
	var dur1 = parseFloat(d)+parseFloat(b);

	istep.length = (dur2/dt);
	for (var i=0;i<(b/dt);i=i+1){
		istep[i] = parseFloat(ih);
	}
	for (i=(b/dt);i<(dur1/dt);i=i+1){
		istep[i] = parseFloat(ic);
	}
	for (i=(dur1/dt);i<(dur2/dt);i=i+1){
		istep[i] = parseFloat(ih);
	}
	
}

//////////////////////////////////
//
// 			Display trace
//
//////////////////////////////////

function showTrace(){				
        var n;
	var o;
	var t;
	
	 // Create and populate the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Time');
          data.addColumn('number', 'Potential');
          
          var checkbox = document.getElementById("storage");
		  if(checkbox.checked){							// grab the last trace and store it
			data.addColumn('number','Stored Current');
		  }
          
          
                    
          for (var i = 0; i < (trace.length); i=i+1) {
	    		n = trace[i];
	    		o = storedTrace[i];
	    		t = Math.round(i*dt*100)/100;	
	    		
	    		if(checkbox.checked){					
     				data.addRow([t, n, o]);
     				}
     				else
     				{
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

//////////////////////////////////
//
// 			Save trace as CSV file 
//
//////////////////////////////////


function saveTrace(){
		
	var time;
	var tstr;	
	var istr;
	var pstr;
	var res;
	var csvRows = new Array();

	csvRows.push("Time, Current, Potential");

	for (var i=0; i<trace.length; ++i) {
		time = i*dt;
		tstr = time.toString();
		istr = istep[i].toString();
		pstr = trace[i].toString();
	
		csvRows.push(tstr + ',' + istr + ',' + pstr);
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



