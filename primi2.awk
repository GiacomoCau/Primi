BEGIN {
	t=systime()
	e=50
	if (ARGC>=2) e=ARGV[1]
	#print e, ARGC, ARGV[1]
	for(x=2; x<=e; x+=1) {
		isPrimo=1
		l = x/2
		for (y=2; y<l; y+=1) {
			#print x,  y, x%y 
			if ((x % y) == 0) {
				isPrimo=0
				break
			}
		}
		#if (isPrimo) print x
	}
	print "secondi:",systime()-t	
}
