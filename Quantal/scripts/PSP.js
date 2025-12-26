
function calcArea(radius){			// enter in radius in microns
	return 4.*3.14*(radius*radius*1e-8)
}


function kmg(v){
	
	return 3.03*Math.exp(v/16.6);

}

function pgen(m,g){
	var L = Math.exp(-m);
	var p = 1.;
	var k = 0.;
	
	var r;
	
	while (p > L){
		r = Math.random();
		p = p*r;
		k++;
	}

	k = k-1.;
	
	if (k > 0.){
		k += gauss(g);
		
		if (k < 0.) {
			k = 0.;
		}
	}
	
	

	return k;

}



function PSPpassive() {

 	// passive parameters     
    
	var area = calcArea(uniform(20,25));		// 20-25 um radius converted to cm2 area

	var Rm = uniform(2000,3000);			/// ohms-cm2

	var Gm = 1/Rm;			// S/cm2
		
	var	Eleak = -65.;

	var Cm = 1;

	// synapse parameters
	
	
	var tau = 2.;
	var erev = 0.;
	var gsyn = 100.;
	

	
	// initial m is 1 or 2
	// initial q is 20-40
	
	// experiment m is 3-5
	// or q is 50-100
	
	m =	iseedrnd(seed,1) + 1;
	q = uniform(20,50);
	
	
	gsyn = pgen(m,.25)*q;			// control values
	
	
	
	// find out if we are on experimental
	
	var checkbox = document.getElementById("expflag");
	if(checkbox.checked==true){
      		// only vary Rm  - Use switch and iseedrnd(seed, max) for more than one experiment
   		
   				var pick = iseedrnd(seed, 1);				// randomly pick the experiment


   			switch (pick){
   				case 0:							// increase q
   					
   					q = uniform(50, 100);
   					 
   					gsyn = pgen(m,.25)*q;
   					
   					break;
   				case 1:							// change M
   					
   					m = iseedrnd(seed, 1) + 3; 
   					gsyn = pgen(m,.25)*q;
   					break;
   				
   			}
   		
   		
   				
     
         }
  
  		
	
	
	peakvalue = gsyn;

	
	
	
}
