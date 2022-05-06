
(define (sieve s)
   (let* (
      (s (+ 1 s))
      (c (create-array #0at #f s))
      (setMultiple 
         (lambda (c n s)
            (let loop ((i (+ n n)))
               (if (>= i s) c
                  (begin
                     (array-set! c #t i)
                     (loop (+ i n)) ))))) )
      (setMultiple c 2 s)
      (let ((e (floor (sqrt s))))
         (let loop ((i 3))
            (if (> i e) c
               (begin
                  (if (not(array-ref c i)) 
                     (setMultiple c i s))
                  (loop (+ i 2)) )))) ))

;(transcript-on "Xxx.html")
(display (sieve 32))
;(transcript-off)
;(exit)