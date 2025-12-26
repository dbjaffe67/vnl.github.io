
function khh() {

 	// standard parameters     
        
	var area = 4*3.14*1e-6;		// 25 um radius converted to cm2

	var mshift = 0;
	var hshift = 0;
	var tshift = 1;
	
	var	EK = -90;
	var GK = .036*2;

	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");

	if(checkbox.checked==true){
   		
   		var pick = iseedrnd(seed, 4);				// randomly pick the experiment
   			
   			switch (pick){
   				case 0:							// decrease GNa
   					GK = .01 + (0.04*rseedrnd(seed));
   					break;
   				case 1:
   					GK = (0.036*5) + (.1*rseedrnd(seed));				// increase GNa
   					break;
   				case 2:							// shift activation right
   					mshift = 15 + (5*rseedrnd(seed));
   					break;
   				case 3:							// shift activation left
   					mshift = -15 + (5*rseedrnd(seed));
   					break;
   				case 4:							// increase EK
   					EK = -30;
   					break;
   				case 5:							// change tau
   					tshift = .4;
   					break;	
   			}

     
         }
  
  
    // initialize
    
     var v = parseFloat(vh);
    
     var n = alpha_n(v+mshift)/(alpha_n(v+mshift)+beta_n(v+mshift));
          
     var dn;
 
     
     var ik = n*n*n*n*GK*(v-EK);
     
  
	var current = vstep.slice(0);					// makes array current of length vstep	
	
	for (var i=0;i<(current.length);i=i+1){					// simulation loop 
	
		v = vstep[i];
		dn = dt*tshift*( ((1.-n)*alpha_n(v+mshift)) - (n*beta_n(v+mshift))  );

            
        n += dn;
       
      
      	 ik = n*n*n*n*GK*(v-EK);
		current[i] = 1e6*ik*area;		// pA
	} 

	trace = current.slice(0);								// duplicate current to trace
	generateNoise(trace.length, .5);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
		trace[i] = sum;	
	}
	
}

// HH Equations

function alpha_n(v)
{
    return 0.01*(v+55)/(1-Math.exp(-.1*(v+55)));
}

function beta_n(v)
{
    return 0.125*Math.exp(-0.125*(v+65));
}