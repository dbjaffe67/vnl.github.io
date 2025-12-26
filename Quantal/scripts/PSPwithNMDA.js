
function calcArea(radius){			// enter in radius in microns
	return 4.*3.14*(radius*radius*1e-8)
}


function kmg(v){
	
	return 3.03*Math.exp(v/16.6);

}

function leak() {

 	// set passive parameters     
    
	var area = calcArea(uniform(20,25));		// 20-25 um radius converted to cm2 area

	var Rm = uniform(2000,3000);			/// ohms-cm2

	var Gm = 1/Rm;			// S/cm2
		
	var	Eleak = -65.;

	var Cm = 1;
	
	// set channel parameters
	
	var tau = 2;		// AMPA-like
	var erev = 0;
	var gsyn = 1;
	
	switch (ModelChoice) {
		case 0:					// AMPA-like
			tau = 2;
			erev = 0;
			gsyn = 1;
	
	
	}


	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");
	if(checkbox.checked==true){
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
   					Cm = uniform(1.5,3.);
   					break;
   				case 5:							// decrease cm
   					Cm = uniform(0.5,0.75);
   					break;		
   			}
   		
   		
   		
   				
     
         }
  
  	var v = -65.;
  	var dv = 0.;
  	var current;
  	var syn = 0;
  	
  	var ar = 0;
  	var ara = 0;
  	var aro = 0;
  	
  	var alpha=0.00986  
	var beta=0.286     
	var kp1=0.0063     
	var km1=0.306     
	var mgo = 1.2;
	
	var inmda;   	
  	
	var potential = istep.slice(0);					// makes array current of length vstep	
	
	for (var i=0;i<(potential.length);i=i+1){					// simulation loop w/o integration
	
		
		
		
		aro = (kmg(v)*ara)/(kmg(v)+mgo);
		inmda = aro*0.0000000001*49*(v-0);
	
		if (i>=500){
			syn = 10e-9*2*dt*(i-500)*Math.exp(1-(2*dt*(i-500)));
			syn = syn*-1e-3*(v+20.);
			
			aro = .2*dt*(i-500)*Math.exp(1-(.2*dt*(i-500)));
			aro = (kmg(v)*aro)/(kmg(v)+mgo);
			inmda = 10e-9*aro*-1e-3*(v-0);
			
		}
	  	
		current = syn + inmda + (istep[i]*1e-12);
		
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
