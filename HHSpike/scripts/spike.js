
var Nao = 124;
var TEA = 0;

function setNa(x){
	Nao = x;
}

function setTEA(x){
	if (x > 30){
		x = 30;
		var c = document.getElementById('teaBlock');
    	c.value = x; 
		
	}
	if (x < 0){
		x = 0;
		var c = document.getElementById('teaBlock');
    	c.value = x; 
	}
		TEA = x;
}

function leak() {

 	// standard parameters     
    
	var area = 4*3.14*1e-6;		// 25 um radius converted to cm2

	var Rm = 10000;

	var Gm = 1/Rm;
	Gm = Gm*area;

	var	Erev = -90;
	
	
	var GK = 36*(1-(TEA/30));
	var GNa = 120;
	var ENa = -115;
	var EK = 12;
	var Io = 0;
	
	var m;
	var h;
	var n;
	var dm;
	var dh;
	var dn;
	var v;
	
	// calculate Ena based on Nao
	
	ENa = -58*Math.log(Nao/17);

	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");
	if(checkbox.checked==true){								// experimental options
   		
   		var pick = iseedrnd(seed, 3);				// randomly pick the experiment
   			// alert(pick);
   			switch (pick){
   				case 0:							// lower ENa
   					ENa = uniform(-90,-70);	
   					   					
   					break;
   				case 1:							// lower GNa
   					GNa = uniform(90,100);
   					break;
   				case 2:
					GK= uniform(15,20);			// lower GK
					break;
			 	case 3:
			 		EK = uniform(-10,-5);			// lower EK
					break;
				
   			}
   		
   		
   		
   				
     
         }
  
	var current = istep.slice(0);					// makes array current of length vstep
	var potential = istep.slice(0);	
	
	// initialize
	
	v = 0;
	
	   m = alpha_m(v)/(alpha_m(v)+beta_m(v));
   	   n = alpha_n(v)/(alpha_n(v)+beta_n(v));
	   h = alpha_h(v)/(alpha_h(v)+beta_h(v));	

	var ina = m*m*m*h*GNa*(v-ENa);
      var ik = n*n*n*n*GK*(v-EK);
      
      
      var el = -65 + ((ina + ik)/.3);
		el += 65
	
	
	for (var i=0;i<(current.length);i=i+1){					// simulation loop 
	
		var checkbox = document.getElementById("expflag");
		if(checkbox.checked==true){
				dm = 2*dt*( ((1.-m)*alpha_m(v)) - (m*beta_m(v))  );		// speed up spike
		
		}
		else
		{
	
	    	dm = dt*( ((1.-m)*alpha_m(v)) - (m*beta_m(v))  );
	    }
        dh = dt*( ((1.-h)*alpha_h(v)) - (h*beta_h(v))  );
        dn = dt*( ((1.-n)*alpha_n(v)) - (n*beta_n(v))  );

        
        m += dm;
        h += dh;
        n += dn; 
             
        Io = istep[i]+uniform(0,2);
       
    	ina = m*m*m*h*GNa*(v-ENa);
        ik = n*n*n*n*GK*(v-EK);

          	  
	 		dv = -dt*( (0.3*(v-el)) + Io + ina + ik);
          	
          	v += dv;
	
		potential[i] = -65 + (-1*Math.round(v*100)/100);
	
	} 

	trace = potential.slice(0);								// duplicate current to trace
	generateNoise(trace.length, .1);						// generate noise

	var sum = 0;											// add noise to trace
	for (i=0;i<(trace.length);i=i+1){
		sum = trace[i]+noise[i];
		trace[i] = sum;	
	}
	
}


function alpha_n(v)
{
    return 0.01*(v+10)/(Math.exp((v+10)/10)-1);
}

function beta_n(v)
{
    return 0.125*Math.exp(v/80);
}

function alpha_m(v)
{

	return 0.1*(v+25)/(Math.exp((v+25)/10)-1);   
    
}

function beta_m(v)
{
    return 4*Math.exp(v/18);
}

function alpha_h(v)
{
    return 0.07*Math.exp(v/20);
}

function beta_h(v)
{
    return 1/(Math.exp((v+30)/10)+1);
}

