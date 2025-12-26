
function leak() {

 	// standard parameters     
    
	var area = 4*3.14*1e-6;		// 25 um radius converted to cm2

	var Rm = 10000;

	var Gm = 1/Rm;
	Gm = Gm*area;

	var	Erev = -90;

	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");
	if(checkbox.checked==true){
      		// only vary Rm  - Use switch and iseedrnd(seed, max) for more than one experiment
   		
   		var pick = iseedrnd(seed, 1);				// randomly pick the experiment
   			
   			switch (pick){
   				case 0:							// change Rm
   					Rm = 4000 + (26000*rseedrnd(seed));			// range 4000 to 30000
   					Gm = 1/Rm;					// S/cm2
   					Gm = Gm*area;				// S
   					break;
   				case 1:							// Change Erev
   					Erev = -50;
   					break;
   			}
   		
   		
   		
   				
     
         }
  
	var current = vstep.slice(0);					// makes array current of length vstep	
	
	for (var i=0;i<(current.length);i=i+1){					// simulation loop w/o integration
		current[i] = 1e12*(   ((vstep[i]-Erev)*1e-3)   *Gm);		// pA
	} 

	trace = current.slice(0);								// duplicate current to trace
	generateNoise(trace.length, .5);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
		trace[i] = sum;	
	}
	
}
