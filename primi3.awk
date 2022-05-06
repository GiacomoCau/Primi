BEGIN {
	t=systime()

	ne = ARGC<2 ? 50: ARGV[1]
	for(n=2; n<=ne; n+=1) {
		isPrimo=1
		de = sqrt(n)
		for (d=2; d<=de; d+=1) {
			if ((n % d) == 0) {
				isPrimo=0
				break
			}
		}
		if (isPrimo) {
			print n
		}
	}
	
	print "secondi:",systime()-t	
}
