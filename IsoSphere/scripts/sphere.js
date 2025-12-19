function calcArea(radius){			// enter in radius in microns
	return 4*3.14*(radius*radius*1e-8);
}

function passiveSphere() {

 	// standard parameters     
    
    var area = 1;
    
    if (ModelChoice === 0) {
		 area = calcArea(uniform(20,25));		// 20-25 um radius converted to cm2 area
	}
	
	if (ModelChoice == 1) {
		 area = calcArea(uniform(30,35));		// 20-25 um radius converted to cm2 area
	}

	var Rm = uniform(15000,20000);			/// ohms-cm2

	var Gm = 1/Rm;			// S/cm2
		
	var	Eleak = -65;

	var Cm = 1;


	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");
	if(checkbox.checked){
      		// only vary Rm  - Use switch and iseedrnd(seed, max) for more than one experiment
   		
   		var pick = iseedrnd(seed, 5);				// randomly pick the experiment

   			switch (pick){
   				case 0:							// increase Rm
   					Rm = uniform(25000,50000);
   					Gm = 1/Rm;					// S/cm2
   					break;
   				case 1:							// decrease Rm
   					Rm = uniform(5000,10000);
   					Gm = 1/Rm;					// S/cm2
   					break;
   				case 2:							// increase diameter
   					area = calcArea(uniform(30,50));
   					break;
   				case 3: 						// decrease diameter
   				   	area = calcArea(uniform(5,15));
   					break;
   				case 4:							// increase cm
   					Cm = uniform(1.5,3);
   					break;
   				case 5:							// decrease cm
   					Cm = uniform(0.5,0.75);
   					break;		
   			}
   		
   		
   		
   				
     
         }
  
  	var v = -65;
  	var dv = 0;
  	var current;
	var potential = istep.slice(0);					// makes array current of length vstep	
	
	for (var i=0;i<(potential.length);i=i+1){					// simulation loop w/o integration
	
	  	
		current = istep[i]*1e-12;
		
		dv = (current/area) - (Gm*1e-3*(v-Eleak));			// amps/cm2
		dv = dv/Cm;
		dv = dv/1.e-6;										// volts/sec
		dv  = dt*dv;										// millivolts
		
		v += dv;
	
		potential[i] = v;	// pA
	
	
	} 

	trace = potential.slice(0);								// duplicate current to trace
	generateNoise(trace.length, 0.025);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
		trace[i] = sum;	
	}
	
	
}
