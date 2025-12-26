
function nahh() {

 	// standard parameters     
        
	var area = 4*3.14*1e-6;		// 25 um radius converted to cm2

	var mshift = 0;
	var hshift = 0;
	var tshift = 1;
	
	var	ENa = -30;
	var GNa = .120*5;

	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");

	if(checkbox.checked==true){				// experimental
      		// only vary Rm  - Use switch and iseedrnd(seed, max) for more than one experiment
   		
   		var pick = iseedrnd(seed, 4);				// randomly pick the experiment
   			
   			switch (pick){
   				case 0:							// decrease GNa
   					GNa = .120*uniform(1,3);
   					break;
   				case 1:							// shift activation
   					mshift = uniform(8,10);
   					break;
   				case 2:							// shift inactivation
   					hshift = uniform(8,10);
   					break;
   				case 3:							// shift ENa
   					ENa = uniform(-30,0);
   					break;
   				case 4:							// increase GNa
   					GNa = .120*uniform(8,10);
   					break;	
   			}

     
         }
  
  
    // initialize
    
     var v = parseFloat(vh);
    
     var m = alpha_m(v)/(alpha_m(v)+beta_m(v));
     var h = alpha_h(v+hshift)/(alpha_h(v+hshift)+beta_h(v+hshift));
          
     var dm;
     var dh;
     
     var ina = m*GNa*(v-ENa);
     
  
	var current = vstep.slice(0);					// makes array current of length vstep	
	
	for (var i=0;i<(current.length);i=i+1){					// simulation loop 
	
		v = vstep[i];

		minf = alpha_m(v)/(alpha_m(v)+beta_m(v));
		dm = dt*( 0.015*(minf-m)  );
        dh = dt*tshift*( ((1.-h)*alpha_h(v+hshift)) - (h*beta_h(v+hshift))  );
            
        m += dm;
        h += dh;
      
      	ina = m*GNa*(v-ENa);
		current[i] = 1e6*ina*area;		// pA
	} 

	trace = current.slice(0);								// duplicate current to trace
	generateNoise(trace.length, .3);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
		trace[i] = sum;	
	}
	
}

// HH Equations

function alpha_m(v)
{
	return .004*Math.exp(-1*v/162);
}

function beta_m(v)
{
    return 1/(Math.exp(((-1*v)-44)/7.38)+1);
}

function alpha_h(v)
{
    return 0.07*Math.exp(-0.05*(v+65));
}

function beta_h(v)
{
    return 1/(1+Math.exp(-.1*(v+35)));
}

