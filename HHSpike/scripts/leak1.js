
function leak() {

 	// standard parameters     
    
	var area = 4*3.14*1e-6;		// 25 um radius converted to cm2

	var Rm = 10000;

	var Gm = 1/Rm;
	Gm = Gm*area;

	var	Erev = -90;
	
	
	var GK = 36;
	var GNa = 120;
	var ENa = 55;
	var EK = -90;
	var Io = 0;
	
	var m;
	var h;
	var n;
	var dm;
	var dh;
	var dn;
	var v;

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
  
	var current = istep.slice(0);					// makes array current of length vstep
	var potential = istep.slice(0);	
	
	// initialize
	
	v = -65.0;
	
	   m = alpha_m(v)/(alpha_m(v)+beta_m(v));
   	   n = alpha_n(v)/(alpha_n(v)+beta_n(v));
	   h = alpha_h(v)/(alpha_h(v)+beta_h(v));	

	var ina = m*m*m*h*GNa*(v-ENa);
      var ik = n*n*n*n*GK*(v-EK);
      
      
      var el = -65 + ((ina + ik)/.3);
	
	
	
	for (var i=0;i<(current.length);i=i+1){					// simulation loop 
	
	    dm = dt*( ((1.-m)*alpha_m(v)) - (m*beta_m(v))  );
        dh = dt*( ((1.-h)*alpha_h(v)) - (h*beta_h(v))  );
        dn = dt*( ((1.-n)*alpha_n(v)) - (n*beta_n(v))  );

        
        m += dm;
        h += dh;
        n += dn; 
             
        Io = -1*istep[i];
       
    	ina = m*m*m*h*GNa*(v-ENa);
        ik = n*n*n*n*GK*(v-EK);

          	  
	 		dv = -dt*( (0.3*(v-el)) + Io + ina + ik);
          	
          	v += dv;
	
		potential[i] = Math.round(v*100)/100;
	
	} 

	trace = potential.slice(0);								// duplicate current to trace
	generateNoise(trace.length, .5);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
//		trace[i] = sum;	
	}
	
}


function alpha_n(v)
{
    return 0.01*(v+55)/(1-Math.exp(-.1*(v+55)));
}

function beta_n(v)
{
    return 0.125*Math.exp(-0.125*(v+65));
}

function alpha_m(v)
{
   var vtrap;
    
    if (v == -40){
        vtrap = 0.1*(40.1+v)/(1-Math.exp(-.1*(v+40.1)));
    }
    else{
        vtrap = 0.1*(40+v)/(1-Math.exp(-.1*(v+40)));
    }
    return vtrap;
}

function beta_m(v)
{
    return 4*Math.exp(-0.0556*(v+65));
}

function alpha_h(v)
{
    return 0.07*Math.exp(-0.05*(v+65));
}

function beta_h(v)
{
    return 1/(1+Math.exp(-.1*(v+35)));
}

