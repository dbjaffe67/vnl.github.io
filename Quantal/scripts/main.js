
var ModelChoice = 0;
var ToolChoice = 0;
var istep = new Array();
var trace = new Array();
var noise = new Array();
var storedTrace = new Array();

var histodata = new Array(400);

var peakvalue = 0.;

var dt = 0.1;
var seed = 0;

var vh = 0.;
var vc = 1.e-9;
var vhdur = 10;
var vcdur = 40;

var q = 20.;
var m = 1;

var NTRIALS = 800;

function setStorage(){						// holds the current trace 
	
	storedTrace = trace.slice(0);
	showTrace();
}


function choosemodel(num){
  ModelChoice = num;
}

function setSeed(x){
	seed = x;

//	var c = document.getElementById('pick');
//    c.value = iseedrnd(seed,4).toString();  	
}

function pickit(){

  window.alert("1");

}

function runSet(){

	var avg = 0.;
	var SS = 0.;
	var variance = 0.;
	var CV;
	var MM;

	for (var i=0;i<NTRIALS;i=i+1){
		PSPpassive();
		histodata[i] = peakvalue;
		avg += peakvalue;
	}
	
	avg = avg/NTRIALS;
	
	for (var i=0;i<NTRIALS;i=i+1){
		SS = SS + ((histodata[i]-avg)*(histodata[i]-avg));
	} 
	
	variance = SS/(NTRIALS-1.);
	
	showHist();
	
	CV = Math.sqrt(variance)/avg;
	
	MM = 1/(CV*CV);
	
	document.getElementById("mean").innerHTML = "Mean: " + avg.toFixed(1) + " pA";
	document.getElementById("s2").innerHTML = "Variance: " + variance.toFixed(1) + " pA";
	document.getElementById("n").innerHTML = "N: " + NTRIALS.toFixed(0);

	
}

function runModel(){					// based on selection, run them model

	switch (ToolChoice) {				// pick protocol tool
		case 0:						
				makeIstep1(vh, vhdur, 0, 0);
				break;
		case 1:
				makeIstep1(vh, vhdur, vc, vcdur);
				break;
		case 2:
				makeIstep2(vh, vhdur, vc, vcdur);
				break;
	}
	
	
	PSPpassive();

	showTrace();
	
}

function makeIstep1(a,b,c,d) {			// single step

	var dur = parseFloat(b)+parseFloat(d);

	istep.length = (dur/dt);

	for (var i=0;i<(b/dt);i=i+1){
		istep[i] = parseFloat(vh);
	}
	for (i=(b/dt);i<(dur/dt);i=i+1){
		istep[i] = parseFloat(vc);
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

function showHist(){
    var data = new google.visualization.DataTable();
	
	data.addColumn('string', 'Point');
    data.addColumn('number', 'Peak');
	
	for (var i=0; i<NTRIALS; i=i+1){
		data.addRow([i.toString(), histodata[i]]);
	}
	
	
	var options = {
		  hAxis: { title: 'PSC Amplitude (pA)' , gridlines: {color: '#B9B9B9'} },
		  vAxis: { title: 'No. Observations' },
          colors: ['blue'],
          legend: { position: 'none' },
          histogram: { bucketSize: 1, hideBucketItems: 'true' } 
         
        };	
	
	var chart = new google.visualization.Histogram(document.getElementById('scope'));
		
	chart.draw(data, options);
}

function showTrace(){				// trace is a global variable
	var n;
	var o;
	var t;
	
	 // Create and populate the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Time');
          data.addColumn('number', 'Current');
                    
        var checkbox = document.getElementById("storage");
		  if(checkbox.checked==true){							// grab the last trace and store it
			data.addColumn('number','Stored Current');
		  }
                    
                    
                    
          for (var i = 0; i < (trace.length); i=i+1) {
	    		n = trace[i];
	    		o = storedTrace[i];
	    		t = Math.round(i*dt*100)/100;	
	    		
	    		if(checkbox.checked==true){					
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

