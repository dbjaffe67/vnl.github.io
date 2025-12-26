
function calcArea(radius){			// enter in radius in microns
	return 4.*3.14*(radius*radius*1e-8)
}


function kmg(v){
	
	return 3.03*Math.exp(v/16.6);

}

function vclamp() {

 	// set passive parameters     
    
	var area = calcArea(uniform(20,25));		// 20-25 um radius converted to cm2 area

	var Rm = uniform(20000,30000);			/// ohms-cm2

	var Gm = 1/Rm;			// S/cm2
		
	var	Eleak = vstep[0];

	var Cm = 1;
	
	// set channel parameters
	
	var tau = 2;		// AMPA-like
	var erev = 0;
	
	var Gbar = uniform(10,20);
	
	var gsyn = 1;
	var gAMPA = .2*Gbar;		// nS
	
	var cnqx = document.getElementById("cnqxflag");
	if (cnqx.checked) {
		gAMPA = 0;
	}
	
	
	var apv = document.getElementById("apvflag");
    var gNMDA = Gbar; 		// nS
	if (apv.checked) {
		gNMDA = 0;
	}
	
	
	
	
	switch (ModelChoice) {
		case 0:					// AMPA-like
			tau = 2;
			erev = 0;
			gsyn = 1;
	
	
	}


	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");

	if(checkbox.checked){
      		// only vary Rm  - Use switch and iseedrnd(seed, max) for more than one experiment
   		
   		var pick = iseedrnd(seed, 2);				// randomly pick the experiment

   			switch (pick){
   				case 0:							// increase NMDA
   					gNMDA = uniform(20,30);
   					break;
   				case 1:							// increase AMPA
   					gAMPA = 0.2*uniform(20,30);
   					break;
   				case 2:							// increase Both
   					gAMPA = 0.2*uniform(20,30);
   					gNMDA = uniform(20,30);
   					break;	
   					
   					
   			}
   		
   		
   		
   				
     
         }
  
  	var v = vstep[0];

  	var dv = 0.;
  	var current;
  	var syn = 0;
  	var syn2 = 0;
  	
  	var ar = 0;
  	var ara = 0;
  	var aro = 0;
  	var aro2 = 0;
  	
  	var alpha=0.00986  
	var beta=0.286     
	var kp1=0.0063     
	var km1=0.306     
	var mgo = 1.2;
	
	var inmda; 
	var inmda2;  	
  	
	var current = vstep.slice(0);					// makes array current of length vstep	
	var potential = vstep.slice(0);
	
	var stimdel = 20;
	
	for (var i=0;i<(current.length);i=i+1){					// simulation loop w/o integration
	

		inmda = 0;
		syn = 0;
		
		inmda2 = 0;
		syn2 = 0;
	
		
	
		if (i>=(stimdel/dt)){
			
			syn = 1*dt*(i-(stimdel/dt))*Math.exp(1-(1*dt*(i-(stimdel/dt))));
			syn2 = syn*gAMPA*v;
			syn = syn*gAMPA*vstep[i];
			
				
			aro = .1*dt*(i-(stimdel/dt))*Math.exp(1-(.1*dt*(i-(stimdel/dt))));
			aro2 = (kmg(v)*aro)/(kmg(v)+mgo);
			aro = (kmg(vstep[i])*aro)/(kmg(vstep[i])+mgo);
			
			inmda = aro*gNMDA*vstep[i]; // 100*aro*(vstep[i]-0);
			inmda2 = aro2*gNMDA*v; // 100*aro*(vstep[i]-0);

		}
		
		dv = (-1.e-12*(syn2+inmda2)/area) - (Gm*1e-3*(v-Eleak));			// amps/cm2
		dv = dv/Cm;
		dv = dv/1.e-6;										// volts/sec
		dv  = dt*dv;										// millivolts
		
		v += dv;
		
	  	
		current[i] = inmda + syn;
		potential[i] = v;	
	
	} 

	trace = current.slice(0);								// duplicate current to trace
	trace2 = potential.slice(0);								// duplicate current to trace
	generateNoise(trace.length, 1);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
		trace[i] = sum;	
	}
	
	
}
