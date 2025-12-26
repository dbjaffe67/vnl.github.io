/*

Generate Gauss numbers for random seeds

*/

var current = 0;
var stdev = 30;

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
    document.getElementById('scope'));
          chart.draw(data, {vAxis: {title: "Current (pA)", titleTextStyle: {color: "green"}},
                            hAxis: {title: "Time (ms)", titleTextStyle: {color: "green"}},
                            lineWidth: 2, pointSize: 0,
                            chartArea: {width: "80%", height: "80%"}, legend: 'none'
                            }
                    );
                    
	
}

function generateNoise(len, amp){

		var gausstable = new Array(len);
		var exptable = new Array(len);
		var realout = new Array(len);
		
		var alpha = 15;
		var stdev = amp;
		
		for (var i=0;i<len;i=i+1){
			
			gausstable[i] = gauss(stdev);  // gauss of stdev=30
			exptable[i] = Math.exp(-1*dt*(i)/alpha);
			
		}

		convolveReal(gausstable, exptable, realout);
		
		noise = realout.slice(0);
}


function gauss(num){					// makes gnoise with stdev of num
	var m1 = Math.random()*2-1;
	var m2 =  Math.random()*2-1;
	var m3 = Math.random()*2-1;
	
	var answer = m1+m2+m3;
	
	return answer*num;


}

function uniform(first,last){
	var diff = last-first;
	
	var pick = rseedrnd(seed)*diff;
	
	return pick+first;
	
}

function rseedrnd(seed){          // Generates integer from 0 to max based on seed

  var answer = ('0.'+Math.sin(seed).toString().substr(6));

  return answer;
}

function iseedrnd(seed,max){          // Generates integer from 0 to max based on seed

  var answer = Math.round(max*('0.'+Math.sin(seed).toString().substr(6)));

  return answer;
}
