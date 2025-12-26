
function calcArea(radius){			// enter in radius in microns
	return 4.*3.14*(radius*radius*1e-8)
}


function kmg(v){
	
	return 3.03*Math.exp(v/16.6);

}

function PSPerev() {

 	// passive parameters   
    
	var area = calcArea(uniform(20,25));		// 20-25 um radius converted to cm2 area

	var Rm = uniform(2000,3000);			/// ohms-cm2

	var Gm = 1/Rm;			// S/cm2
		
	var	Eleak = -65.;

	var Cm = 1;

	// synapse parameters
	
	
	var tau = 2.;
	var erev = 0.;
	var gsyn = 10.;
	
	switch (ModelChoice) {
		case 0: 				// AMPA
			tau = uniform(1,3);
			erev = uniform(-5,5);
			gsyn = uniform(5,20);
			break;
		case 1:					// GABA-A
			tau = uniform(3,5);
			erev = uniform(-65,-55);
			gsyn = uniform(30,50);
			break;
		case 2:					// GABA-B
			tau = uniform(.005,.015);
			erev = uniform(-95,-85);
			gsyn = uniform(10,30);
			break; 
	}


	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");
	if(checkbox.checked==true){
      		// only vary Rm  - Use switch and iseedrnd(seed, max) for more than one experiment
   		
   			erev = uniform(-90,40);
   		
   				
     
         }
  
  	var v = -65.;
  	var dv = 0.;
  	var current;
  	var syn = 0;
  	
    	
	var potential = istep.slice(0);					// makes array current of length vstep	
	
	for (var i=0;i<(potential.length);i=i+1){					// simulation loop w/o integration
			
		if (i>=200){
			syn = gsyn*1e-9*tau*dt*(i-200)*Math.exp(1-(tau*dt*(i-200)));
			syn = syn*-1e-3*(v-erev);
					
		}
	  	
		current = syn  + (istep[i]*1e-9);
		
		dv = (current/area) - (Gm*1e-3*(v-Eleak));			// amps/cm2
		dv = dv/Cm;
		dv = dv/1.e-6;										// volts/sec
		dv  = dt*dv;										// millivolts
		
		v += dv;
	
		potential[i] = v;	// pA
	
	
	} 

	trace = potential.slice(0);								// duplicate current to trace
	generateNoise(trace.length, .025);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
		trace[i] = sum;	
	}
	
	
}
