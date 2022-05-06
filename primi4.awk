BEGIN {
	t=systime()

	ne = ARGC<2 ? 50 : ARGV[1]
	print 2
	ps[++pm]=2
	for(n=3; n<=ne; n+=1) {
		isPrimo=1
		pe = sqrt(n)
		for (pi=1; (p=ps[pi]) <= pe; pi+=1) {
			#print n, p, pe, pi
			if ((n % p) == 0) {
				isPrimo=0
				break
			}
		}
		if (isPrimo) {
			ps[++pm] = n
			#print n
		}
	}
	print "secondi:",systime()-t	
}
