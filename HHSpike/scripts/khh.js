
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
   					GK = .036*uniform(.1,1)
   					break;
   				case 1:
   					GK = 0.036*uniform(3,5)				// increase GNa
   					break;
   				case 2:							// shift activation right
   					mshift = uniform(10,20) 
   					break;
   				case 3:							// shift activation left
   					mshift = uniform(-20,-10) 
   					break;
   				case 4:							// increase EK
   					EK = uniform(-50,-30)
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