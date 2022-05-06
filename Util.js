
function checkFormNumAndExecute( main ) {
   var form = document.forms[0];
   cpyForm( form, getArgv() );
   if ( form.n.value != '' ) {
      var n = parseInt( form.n.value );
      if ( isNaN( n )) {
         alert( 'Non numerico' );
         form.n.focus();
      } 
      else if ( n < 2 ) {
         alert( 'Minore a 2' );
         form.n.focus();
      }
      else {
         main( n );
      }
   } 
}

function checkFormToAndExecute( main ) {
   var form = document.forms[0];
   cpyForm( form, getArgv() );
   if ( form.t.value != '' ) {
      var t = parseInt( form.t.value );
      if ( isNaN( t )) {
         alert( 'Non numerico' );
         form.t.focus();
      } 
      else if ( t <= 2 ) {
         alert( 'Minore o uguale a 2' );
         form.t.focus();
      }
      else {
         main( t, form.s.checked );
      }
   }
}

function checkFormFromToAndExecute( main ) {
   var form = document.forms[0];
   cpyForm( form, getArgv() );
   if ( form.f.value != '' 
   ||  form.t.value != '' ) {
      var f = parseInt( form.f.value );
      var t = parseInt( form.t.value );
      if ( isNaN( f )) {
         alert( 'Non numerico' );
         form.f.focus();
      } 
      else if ( f < 2 ) {
         alert( 'Minore di 2' );
         form.f.focus();
      }
      else if ( isNaN( t )) {
         alert( 'Non numerico' );
         form.t.focus();
      }
      else if ( f > t ) {
         alert( 'Maggiore di ' + t );
         form.f.focus();
      }
      else {
         main( f, t, form.s.checked );
      }
   }
}

function Timer() {
    var ts = new Date();
    var tp = ts;
    function write ( s, m ) {
        s = ( s ) ? s + ': durata' : 'Durata';
        writenl( s , ' ', m, ' millisecondi');
    }
    this.parzial = function (s) {
       var t = new Date() ;  
       write( s, t - tp );
       tp = t;
    }
    this.total = function (s) {
       var t = new Date() ;  
       write( s, t - ts );
    }
}


function inS(n, pv) {
  for ( e in pv ) if ( pv[e] == n) return true;
  return false; 
}

function inD(n, pv) {
   // Ha bisogno di un array ordinato.
   // Considera gli elementi finali vuoti
   // come contenenti infinito grazie alla
   // disposizione dei test in relazione al
   // fatto che falliscono con undefined
   var f = 0;
   var t = pv.length - 1;
   //writenl(n,' - ', pv);
   while ( f <= t ) {  
      i = Math.floor((f + t) / 2);
      //writenl(f,' - ', t, ', ', i, ', ',pv[i]);
	  var pvi = pv[i]
      if (pvi == n) return true;
      if (pvi < n) 
         f = i + 1;
      else
         t = i - 1;
   }
   return false;
}

var undefined
function setMultiples(n, t, cs, v) {
   t -= n
   if ( v === undefined ) v = true
   for ( var i=n; i<=t; ) cs[i+=n] = v;
}

function setThisAndMultiples(n, t, cs, v) {
	t -= n;
	if ( v === undefined ) v = true
	for ( var i=n-n; i<=t; ) cs[i+=n] = v;
}

function cpyForm( t, f ) {
	for ( var e in f )  {
		if ( !f[e] ) continue
		if (t[e].type == 'text') 
			t[e].value = f[e];
		if (t[e].type == 'checkbox') 
			t[e].checked = true;
	}
}

function cpyObj( t, f ) {
	for ( var e in f ) t[e] = f[e]
}

function cpyArr( t, f ) {
	for ( var i in f ) t[f[i]] = true
}

function getArgv() {
   var r = {}
   var a = document.location.search.substr(1).split('&')
   for ( e in a ) {
      var i = a[e].indexOf('=')
      r[a[e].substring(0,i)] = a[e].substr(i+1)
   }
   return r
}

function incExp( fs, p ) {
	//alert('incExp:' + {fs:fs, p:p})
	if ( fs[p] )
		fs[p] ++
	else
		fs[p] = 1
	//fs[p] = ++fs[p] || 1
}


function cpyFactors( ts, fs, p) {
	//alert('cpyFactors:' + {ts:ts, fs:fs, p:p})
   for ( var e in fs ) ts[e] = fs[e] + (e==p ? 1 : 0)
}

function cpyFactors( ts, fs, p) {
	//alert('cpyFactors:' + {ts:ts, fs:fs, p:p})
   for ( var e in fs ) ts[e] = e==p ? fs[e]+1 : fs[e]
}

function cpyFactors( ts, fs, p) {
	//alert('cpyFactors:' + {ts:ts, fs:fs, p:p})
   for ( var e in fs ) ts[e] = fs[e] //equivale a cpyObj(ts, fs)
   if ( fs[p] ) ts[p]++ //copiati i fattori se p è in fs (verrebbe sovrascritto) ts[p] viene incrementato
}


function factors(n, ps, cs) {
   // Fattori crescenti.
	//alert('factors:' + {n:n, ps:ps, cs:cs})
   for ( var p in ps ) {
      if ( n % p ) continue
      break
   }
   var ts = cs[n] = {}
   ts[p] = 1; // inserisce l'esponente del fattore più piccolo 
	if ( ps[n /= p] ) { // se n=n/p è un primo (n è = a p1 * p2 dove p1 e p2 potrebbere essere anche uguali)
		incExp(ts, n)
	}
	else { // n = p * composto (cs[n])
		var fs = cs[n]
		if ( !fs ) fs = factors(n, ps, cs) // se n non è già fra i composti va fattorizzato
		cpyFactors(ts, fs, p)
	}
	return ts
}

function isPrime( n, ps ) {
    var s = sqrt( n )
    for ( var p in ps ) {
       if ( p > s ) return true
       if ( n % p ) continue
       return false
    }
    return true
}

function isComposite(n, ps) {
   return !ps[n]
}

function writeKey( o, nm, nl ) {
   var wr = nl ? writenl : write;
   if ( nm ) wr( nm, ': ' );
   for ( var e in o ) wr( e, ' ' );
   writenl();
}

function writeKeyValue( o, nm, nl ) {
   var wr = nl ? writenl : write;
   if ( nm ) wrl( nm, ': ' );
   for ( var e in o ) wr( e, ': ', o[e] );
   writenl();
}

function test(n, fv, a, b, c) {
	//alert ('test: ' + {n:n, 'fv.length':fv.length, a:a})
	for (var i=0; i<fv.length; i++) {
		var name = getName(fv[i])
		var tm = new Timer()
		for (var j=n; j--; ) fv[i](a, b, c)
		tm.total( name )
	}
}

function getName (f) {
   var s = f.toString();
   return s.substring(9, s.indexOf('(')); 
}

function min(a,b) {
   return a<b ? a : b;
}

function sqrt(n) {
   return Math.floor(Math.sqrt(n));
}

function write() {
   for (var i=0; i<arguments.length; i++) {
      document.write(arguments[i]);
   }
}

function writenl() {
   for (var i=0; i<arguments.length; i++) {
      document.write(arguments[i]);
   }
   document.write("<br>");   
}

function writeStat( i, t, cs ) {
	var n=0
   while ( i<=t ) {
      if (!cs[i++]) n+=1;
   }
   writenl('Trovati ', n,' numeri primi');
}

function writeTable( i, t, cs, v ) {
	//alert('writeTable:' + {i:i, t:t, 'cs.length':cs.length} )
	writenl();
	for (; i<=t; i++ ) {
		write( i );
		//writeFactors( cs[i], v ); // ovvero
		writeFactors( i in cs ? cs[i] : undefined, v );
		writenl();
	}
}

function writeFactors( fs, v ) {
	if ( fs ) {
		//alert(fs.constructor)
		if (fs.constructor != Object && fs.constructor != Array) {
			write( ' = composto', !v ? '' : ' (' + fs + ')')
		}
		else {
			write( ' = ' )
			var n = 0;
			for ( var f in fs ) {	
				if ( n++ ) write( '&middot;' ) // dal secondo ...
				write( f )
				writeExponent( fs[f] )
			}
		}
	}
	function writeExponent( e ) {
		if ( e > 1 ) write( '<sup>',  e, '</sup>' )
	}
}


function show( o ){
  var u; 
   if (o != null){
      writenl('value: ',o)
      writenl('typeof: ',typeof(o))
      writenl('costructor: ',o.constructor)
   }
   else if( typeof( o) == 'undefined' ) {
      writenl('value: ','undefined')
      writenl('typeof: ',typeof(o))
   }
   else if( typeof( o) == 'object' ) {
      writenl('value: ','null')
      writenl('typeof: ',typeof(o))  }
   else {
      writenl('value: ','?')
   }

   writenl('if: ',o ? true: false)
   writenl('=null: ',o==null? true: false)
   writenl('=undefined: ',o==u? true: false)
   // istanceof non funziona
   //writenl('instanceof: ',o instanceof Object? true: false)
   writenl()
}

Object.prototype.toString = function() {
	var s=''
	for (var p in this) {
		s += (s ? ', ' : '') + p + ':' + this[p]
	}
	return '{' + s + '}'
}

Array.prototype.toString = function() {
	var s=''
	for (var p in this) {
		s += (s ? ', ' : '') + this[p]
	}
	return '[' + s + ']'
}

//   wheel increments	
//   [2,3] = 6
//   1  2  3   4  5   6   7
//       8  9 10 11 12 13
//       ...
//   5 7 11 13 ...
//   [4,2]
//   1+4 +2 +4 +2 ...

function wheelIncrements( pv, c ) {
   var n = 1
   for ( var i in pv ) n *= pv[i]
   n += 1
   var tv = []
   for ( var i in pv )
      setThisAndMultiples(pv[i], n, tv)
   var ts = {}, ls = ts 
   for ( var i=1, j=2 ; ; j++ ) {
      if ( tv[j] )
			i+=1
      else {
         ts.i = i
         if ( j==n ) break
         ts = ts.n = {}
         i = 1
      }
   }
   ts.n = ls
   if ( !c ) return ls
   n = ls.i + 1
   ls = ls.n
   i = pv.length
   while (i--) {  
      ls = {n:ls}
      ls.i = n - pv[i]
      n = pv[i]
   }
   ls = {n:ls}
   ls.i = pv[0]
   return ls
}

function writeList( ls, l, s ) {
   if (s) write(s, ' ')
   for (var n=0; l--; ls=ls.n) {
      write(n++ ? ' ': '', ls.i)
   }
   writenl()
}

function WheelIncrements( pv, c ) {
   var lt, ls
   var ln = 0
   increments( pv, c )
   this.length = function () {
      return ln
   }
   this.start = function () {
      lt = ls
      return lt.i + c ? 0 : 1
   }
   this.next = function () {
      lt = lt.n
      return lt.i
   }
   this.toString = function () {
       var s=''
       for ( var l=ln, lt=ls; l--; lt=lt.n ) {
          s += lt.i + ' ' ;     
       }
       return s;   
   }
   this.write = function () {
      writenl(this);
   }
   function increments( pv, c ) {
      var i, n = 1
      for ( i in pv ) n *= pv[i]
      n += 1
      var tv = [] //, ls, ts
      for ( i in pv )
         setThisAndMultiples(pv[i], n, tv)

      // ls, ts, ln sono definiti in WheelIncrements!
      ls = ts = {}
      for ( i=1, j=2;; j++ ) {
         if ( tv[j] )
				i+=1
         else {
            ln++
            ts.i = i
            if ( j == n ) break
            ts = ts.n = {}
            i = 1
         }
      }
      ts.n = ls
      if ( !c ) return
      n = ls.i +1
      ls = ls.n
      ln += (i = pv.length)
      while (i--) {  
         ls = {n:ls}
         ls.i = n - pv[i]
         n = pv[i]
      }
      ls = {n:ls}
      ls.i = pv[0]
      return
   }
}

