/*

Generate Gauss numbers

*/

var current = 0;
var stdev = 30;


function generateNoise(len){					// generates array called noise
	alert("here");
}

generateNoise(5);

function drawVis(){

		var gausstable = new Array(200);
		var exptable = new Array(200);
		var realout = new Array(200);
		
		var alpha = 15;
		var stdev = 10;
		
		for (var i=0;i<200;i=i+1){
			
			gausstable[i] = gauss(stdev);  // gauss of stdev=30
			exptable[i] = Math.exp(-1*(i)/alpha);
			
		}

		convolveReal(gausstable, exptable, realout);

 // Create and populate the data table.
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Time');
          data.addColumn('number', 'noise');
          
          
          for (var i = 0; i < 200; i=i+1) {
	    current = realout[i];				
     			data.addRow([i, current]);
            }

    
  	var chart = new google.visualization.ScatterChart(
    document.getElementById('Testplot'));
          chart.draw(data, {vAxis: {title: "Current (nA)", titleTextStyle: {color: "green"}},
                            hAxis: {title: "Time (ms)", titleTextStyle: {color: "green"}},
                            lineWidth: 2, pointSize: 0,
                            chartArea: {width: "80%", height: "80%"}, legend: 'none'
                            }
                    );
                    
	
}

function gauss(num){					// makes gnoise with stdev of num
	var m1 = Math.random()*2-1;
	var m2 =  Math.random()*2-1;
	var m3 = Math.random()*2-1;
	
	var answer = m1+m2+m3;
	
	return answer*num;
}



function seedrnd(seed){          // Generates number from 0 to 4 based on seed

  var answer = Math.round(4*('0.'+Math.sin(seed).toString().substr(6)));

  return answer;
}
