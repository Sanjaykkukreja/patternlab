/* =========================================================================
   LESSON: tools/calc/mental  —  MENTAL MATH & QUICK CALCULATION
   A chapter-agnostic "tricks" lesson. Every entry carries three fields that
   MUST stay together: the trick, the MECHANISM (why it works), and the
   FAILURE MODE (when it breaks / when NOT to reach for it).

   Design rule enforced throughout: a shortcut with no stated failure mode is
   a liability under exam pressure, so no entry ships without one.

   Built 26 Jul 2026. Path/prefix chosen to avoid collision with subject
   chapters (maths/*, phys/*, chem/*). Splice into CONTENT as
     "tools/calc/mental":{key:"mental", taxa:MM_TAXA, formulae:MM_CARDS,
        patterns:MM_PATTERNS, guided:MM_GUIDED, practice:MM_PRACTICE,
        pracDocs:MM_PRAC_DOCS, pracTiers:MM_PRAC_TIERS}
   ========================================================================= */

let MM_TAXA = [
  {code:"M1", label:"Fraction reduction (GCD / Euclid)",           group:"Numbers & fractions"},
  {code:"M2", label:"Squaring shortcuts",                          group:"Multiplication"},
  {code:"M3", label:"Multiplication shortcuts (11, near-base, split)", group:"Multiplication"},
  {code:"M4", label:"Percentages & fraction equivalents",          group:"Estimation"},
  {code:"M5", label:"Square-root & cube-root estimation",          group:"Estimation"},
  {code:"M6", label:"Logarithm estimation",                        group:"Estimation"},
  {code:"M7", label:"Small-change / linear approximation",         group:"Estimation"},
  {code:"M8", label:"Ratios: componendo-dividendo & scaling",      group:"Numbers & fractions"},
  {code:"M9", label:"Divisibility & digit checks",                 group:"Numbers & fractions"},
  {code:"M10",label:"Binomial & (a\u00b1b)\u00b2 mental expansion",     group:"Algebra shortcuts"},
  {code:"M11",label:"Trig & angle values worth memorising",        group:"Algebra shortcuts"},
  {code:"M12",label:"Sanity checks: units, limits, orders of magnitude", group:"Verification"}
];

/* ===== CARDS (the L1 "formulae" layer, repurposed as trick cards) =====
   Each row is one trick. k:"why" rows carry the mechanism; k:"trap" rows carry
   the failure mode. Both are mandatory for every trick. */
let MM_CARDS = [
  {tag:"gcd", title:"Reduce a fraction with Euclid's algorithm", rows:[
    {f:"To reduce a/b: repeatedly replace the larger number by (larger \u2212 smaller) until the two numbers are EQUAL. That common value is the GCD. Divide top and bottom by it."},
    {f:"Faster form: replace the larger by (larger mod smaller) instead of subtracting one step at a time \u2014 same idea, fewer lines."},
    {f:"Example: 517/893. 893\u2212517=376, 517\u2212376=141, 376\u2212141=235, 235\u2212141=94, 141\u221294=47, 94\u221247=47, 47\u221247=0 \u2192 GCD 47. So 517/893 = 11/19."},
    {f:"MECHANISM: gcd(a,b) = gcd(a\u2212b, b) because any number dividing BOTH a and b also divides their difference. Subtracting shrinks the pair without changing the set of common factors, so the GCD is preserved all the way down.", k:"why"},
    {f:"FAILURE MODE: you must run it to COMPLETION \u2014 until the two numbers are equal (or one hits 0). Stopping at a pretty intermediate number (the classic 'answer is 141' error) gives nonsense. And if it bottoms out at 1, the fraction was ALREADY in lowest terms \u2014 there is no simplification to force (e.g. 4/9).", k:"trap"}
  ]},
  {tag:"sq", title:"Squaring shortcuts", rows:[
    {f:"Ends in 5: (10a+5)\u00b2 = a\u00b7(a+1) hundreds, then 25. So 35\u00b2 = (3\u00b74)|25 = 1225; 85\u00b2 = (8\u00b79)|25 = 7225."},
    {f:"Near 50: (50+d)\u00b2 = 2500 + 100d + d\u00b2. So 53\u00b2 = 2500 + 300 + 9 = 2809; 47\u00b2 = 2500 \u2212 300 + 9 = 2209."},
    {f:"Near 100: (100\u2212d)\u00b2 = (100\u22122d)|d\u00b2 (last two digits d\u00b2). So 97\u00b2 = 94|09 = 9409; 92\u00b2 = 84|64 = 8464."},
    {f:"MECHANISM: all three are just (a\u00b1b)\u00b2 = a\u00b2 \u00b1 2ab + b\u00b2 with a chosen as a round number (10a, 50, or 100) so that 2ab and b\u00b2 are trivial to compute in your head.", k:"why"},
    {f:"FAILURE MODE: the 'near 100' last-two-digits shortcut needs d\u00b2 padded to TWO digits (97\u00b2 \u2192 09, not 9). Drop the leading zero and you shift every digit \u2014 wrong by orders of magnitude. When d\u00b2 itself exceeds 99 (d \u2265 10), carry into the hundreds block.", k:"trap"}
  ]},
  {tag:"mult", title:"Multiplication shortcuts", rows:[
    {f:"\u00d711: add each pair of adjacent digits. 43\u00d711 = 4|(4+3)|3 = 473; 72\u00d711 = 7|(7+2)|2 = 792."},
    {f:"Near a base: to multiply two numbers near 100, e.g. 97\u00d796 \u2014 deficits are 3 and 4; answer = (97\u22124)|(3\u00d74) = 93|12 = 9312."},
    {f:"Split a hard factor: \u00d75 = \u00d710 then halve; \u00d725 = \u00d7100 then \u00f74; \u00d715 = \u00d710 + half of that. 68\u00d725 = 6800/4 = 1700."},
    {f:"MECHANISM: \u00d711 is the digit-by-digit form of \u00d7(10+1). The near-base trick is (100\u2212x)(100\u2212y) = 100(100\u2212x\u2212y) + xy. Splitting uses distributivity to trade one hard multiply for an easy multiply plus a shift.", k:"why"},
    {f:"FAILURE MODE: in \u00d711, when an adjacent-digit sum exceeds 9 you must CARRY (57\u00d711: 5|12|7 \u2192 627, not '5127'). In the near-base trick the cross-product block (xy) must be padded to the base's digit width, same padding trap as squaring near 100.", k:"trap"}
  ]},
  {tag:"pct", title:"Percentages & fraction equivalents", rows:[
    {f:"x% of y = y% of x. 'Find 16% of 25' is hard; '25% of 16' = 4 is instant."},
    {f:"Memorise the common ones: 1/8 = 12.5%, 1/6 \u2248 16.67%, 1/3 \u2248 33.3%, 3/8 = 37.5%, 5/8 = 62.5%, 1/12 \u2248 8.33%."},
    {f:"Build up: 15% = 10% + 5% (half of the 10%). 35% = 25% + 10%. Compound small pieces you can see."},
    {f:"MECHANISM: x% of y = xy/100, which is symmetric in x and y \u2014 that is the whole 'swap' trick. The fraction table just pre-computes the divisions you'd otherwise redo every time.", k:"why"},
    {f:"FAILURE MODE: successive percentage changes do NOT add. A 20% rise then a 20% fall is not 'net zero' \u2014 it's 0.8\u00d71.2 = 0.96, a 4% LOSS. Multiply the factors; never add the percentages.", k:"trap"}
  ]},
  {tag:"root", title:"Square-root & cube-root estimation", rows:[
    {f:"\u221aN: bracket it between two known squares, then interpolate. \u221a50: between 7\u00b2=49 and 8\u00b2=64, very close to 7 \u2192 \u2248 7.07."},
    {f:"Refinement (one Newton step): if g is a guess for \u221aN, then (g + N/g)/2 is much better. \u221a50 with g=7: (7 + 50/7)/2 = (7 + 7.14)/2 \u2248 7.07."},
    {f:"Cube roots: memorise 1\u201310 cubed (1,8,27,64,125,216,343,512,729,1000); the LAST digit of a perfect cube uniquely fixes the last digit of its root."},
    {f:"MECHANISM: the Newton step averages your guess g with N/g. If g is too small, N/g is too big by a compensating amount, so their mean brackets the true root and converges fast (error roughly squares each step).", k:"why"},
    {f:"FAILURE MODE: linear interpolation between squares OVERSHOOTS slightly because \u221a is concave \u2014 fine for 2-3 sig figs, not for exact work. The cube-root last-digit trick identifies a PERFECT cube's root; it says nothing about non-cubes.", k:"trap"}
  ]},
  {tag:"log", title:"Logarithm estimation", rows:[
    {f:"Anchor values: log\u2081\u2080 2 \u2248 0.301, log\u2081\u2080 3 \u2248 0.477, log\u2081\u2080 7 \u2248 0.845 (and log 5 = 1 \u2212 log 2 = 0.699). Almost everything factors from these."},
    {f:"log 6 = log 2 + log 3 \u2248 0.778; log 12 = 2log2 + log3 \u2248 1.079; log 1.5 = log3 \u2212 log2 \u2248 0.176."},
    {f:"Order of magnitude: log\u2081\u2080 N \u2248 (number of digits of N) \u2212 1, plus a fraction. N = 45000 has 5 digits \u2192 log \u2248 4.6."},
    {f:"MECHANISM: logs turn multiplication into addition, so any number's log is a sum of the logs of its prime factors \u2014 memorising log 2, 3, 7 (and deriving 5) covers a huge range by addition alone.", k:"why"},
    {f:"FAILURE MODE: this is base-10 (common log). For natural log multiply by ln10 \u2248 2.303. And log(a+b) is NOT log a + log b \u2014 the sum rule is for PRODUCTS only; adding logs of a sum is one of the most common silent errors.", k:"trap"}
  ]},
  {tag:"approx", title:"Small-change / linear approximation", rows:[
    {f:"For small x: (1+x)\u207f \u2248 1 + nx. So 1.02\u00b3 \u2248 1.06; 1/1.03 = (1+0.03)\u207b\u00b9 \u2248 0.97; \u221a1.04 \u2248 1.02."},
    {f:"Percentage propagation: if z = x\u00b7y, the % error in z \u2248 (% error in x) + (% error in y). If z = x/y, subtract. If z = x\u207f, multiply the % error by n."},
    {f:"Nearby function value: f(a+h) \u2248 f(a) + h\u00b7f'(a). \u221a26 \u2248 \u221a25 + 1\u00b7(1/(2\u221a25)) = 5 + 0.1 = 5.1."},
    {f:"MECHANISM: it's the first-order Taylor expansion \u2014 near a point, any smooth curve looks like its tangent line, so f(a+h) \u2248 f(a) + h\u00b7f'(a). The (1+x)\u207f \u2248 1+nx rule is this applied to the power function.", k:"why"},
    {f:"FAILURE MODE: 'small' means |x| well under ~0.1. At x = 0.5, (1+x)\u00b3 \u2248 1.5 predicts 2.5 vs the true 3.375 \u2014 badly off. The bigger the step or the higher the power, the worse the linear guess; when in doubt, keep the next term (n(n\u22121)/2)x\u00b2.", k:"trap"}
  ]},
  {tag:"ratio", title:"Ratios: componendo-dividendo & scaling", rows:[
    {f:"If a/b = c/d, then (a+b)/(a\u2212b) = (c+d)/(c\u2212d). Turns a proportion into a ready-to-solve equation in one step."},
    {f:"If a/b = c/d = e/f, then each equals (a+c+e)/(b+d+f) \u2014 the 'add all tops over all bottoms' rule."},
    {f:"Scale to convenient numbers: to compare 7/12 and 11/19, cross-multiply 7\u00d719=133 vs 11\u00d712=132 \u2192 7/12 is (just) bigger."},
    {f:"MECHANISM: componendo-dividendo is just forming (a+b)/(a\u2212b) from a/b = c/d by adding/subtracting 1 from both sides and dividing \u2014 legal algebra, packaged as one move. The equal-ratios rule follows from a=kb, c=kd, e=kf \u2192 sum = k(sum).", k:"why"},
    {f:"FAILURE MODE: componendo-dividendo needs a \u2260 b (else you divide by zero in (a\u2212b)). The cross-multiplication comparison flips direction if either denominator is NEGATIVE \u2014 check signs before trusting the inequality.", k:"trap"}
  ]},
  {tag:"div", title:"Divisibility & digit checks", rows:[
    {f:"3 or 9: digit sum divisible by 3 or 9. 7 or 11 or 13: group the number in threes from the right and alternately add/subtract (since 1001 = 7\u00b711\u00b713)."},
    {f:"11 (direct): alternating digit sum. 918082: (2\u22128+0\u22128+1\u22129) = \u221222, divisible by 11 \u2192 so is the number."},
    {f:"Casting out nines (answer check): the digit-sum of a product equals the digit-sum of the factors' digit-sums, mod 9. A fast sanity check on any multiplication."},
    {f:"MECHANISM: 10 \u2261 1 (mod 9) makes every power of 10 \u2261 1, so a number \u2261 its digit sum mod 9 (and mod 3). 10 \u2261 \u22121 (mod 11) makes powers alternate \u00b11, giving the alternating-sum test.", k:"why"},
    {f:"FAILURE MODE: casting out nines catches MOST arithmetic slips but not all \u2014 any error that is a multiple of 9 (including a digit transposition, which always changes the value by a multiple of 9) sails through undetected. Use it to catch errors, never to CONFIRM correctness.", k:"trap"}
  ]},
  {tag:"binom", title:"(a\u00b1b)\u00b2 and small binomial expansion", rows:[
    {f:"(a\u00b1b)\u00b2 = a\u00b2 \u00b1 2ab + b\u00b2 as a mental template: 103\u00b2 = 10000 + 600 + 9 = 10609; 998\u00b2 = 1000000 \u2212 4000 + 4 = 996004."},
    {f:"a\u00b2 \u2212 b\u00b2 = (a+b)(a\u2212b): 51\u00b2 \u2212 49\u00b2 = 100\u00d72 = 200; 83\u00b2 \u2212 17\u00b2 = 100\u00d766 = 6600."},
    {f:"Low binomial rows worth knowing cold: 11\u2074 = 14641, and Pascal rows 1-4-6-4-1, 1-5-10-10-5-1 for fast (a+b)\u2074, (a+b)\u2075."},
    {f:"MECHANISM: these are the identities themselves, chosen so one term is a round number. a\u00b2\u2212b\u00b2 factoring is what makes 'difference of two nearby squares' a one-line mental product.", k:"why"},
    {f:"FAILURE MODE: the middle term 2ab is the one people drop \u2014 (a+b)\u00b2 is NOT a\u00b2+b\u00b2. And Pascal's row for (a+b)\u207f has n+1 entries; miscounting the row length silently drops or adds a term.", k:"trap"}
  ]},
  {tag:"sanity", title:"Sanity checks (the meta-trick)", rows:[
    {f:"Units first: if the answer should be a length and your expression has units of length\u00b2, stop \u2014 you have a factor wrong before you even compute a number."},
    {f:"Limiting cases: check what your formula does at an extreme (angle \u2192 0, mass \u2192 \u221e, a \u2192 b). If it doesn't reduce to the obvious answer there, it's wrong in general."},
    {f:"Order of magnitude: estimate the answer to one significant figure BEFORE the full calculation, so a slipped decimal or dropped factor jumps out immediately."},
    {f:"MECHANISM: every one of these is a cheap, independent 're-derivation' of a PROPERTY the true answer must have \u2014 dimension, boundary behaviour, or scale. An answer failing any of them cannot be right, so a 5-second check screens a 3-minute mistake.", k:"why"},
    {f:"FAILURE MODE: passing a sanity check is necessary, not sufficient \u2014 it rules answers OUT, it never confirms one IN. Treat a passed check as 'not obviously wrong', then still verify the actual value.", k:"trap"}
  ]}
];

/* ===== PATTERNS (L2): when to REACH for which trick =====
   These are recognition cards: the cue that should make a student pull a
   particular shortcut, plus what typically goes wrong. */
let MM_PATTERNS = [
  {id:"Q1", name:"Ugly Fraction \u2192 Euclid", trigger:"You are handed a fraction with big, unfriendly numerator and denominator and asked to simplify, compare, or take a ratio \u2014 e.g. 517/893, or 'express in lowest terms'.",
   move:"Run Euclid on the two numbers (subtract or mod down to the GCD), then divide both by it. If the GCD comes out 1, declare it already reduced and move on \u2014 don't hunt for a simplification that isn't there.",
   why:"Repeated subtraction preserves the GCD, so the process is guaranteed to terminate at the largest shared factor. It replaces trial-factoring (which is slow when the factors aren't small primes) with a deterministic march.",
   mini:"Reduce 1064/1387 to lowest terms.",
   fails:"Stopping mid-algorithm at a tidy intermediate value and reporting THAT (the '141' error from the video). The algorithm is only done when the two numbers are equal.",
   src:"Euclid's algorithm (Elements, Book VII); the flawed 'successive subtraction' short video is the anti-example",
   srcText:{"anti-example":"A short video 'simplifies' 517/893 as 893\u2212517=376, 517\u2212376=141 and stops, presenting 141 as the answer. Correct: continue to GCD 47, giving 11/19."}},
  {id:"Q2", name:"Round-Number-Nearby \u2192 (a\u00b1b)\u00b2 / near-base", trigger:"A square or product of numbers sitting close to 10, 50, 100, 1000 \u2014 97\u00b2, 103\u00d798, 52\u00b2, 998\u00b2.",
   move:"Write each number as (base \u00b1 small) and expand with (a\u00b1b)\u00b2 or (100\u2212x)(100\u2212y). Compute the round-number part and the small correction separately, then combine.",
   why:"The algebra isolates one trivial term (the round-number square) and two small ones, so the mental load drops to a couple of tiny multiplications and an addition.",
   mini:"Compute 106\u00b2 and 108\u00d792 mentally.",
   fails:"Padding errors: the correction block (b\u00b2, or the cross-product xy) must match the base's digit width \u2014 97\u00b2 ends in 09, not 9.",
   src:"Standard (a\u00b1b)\u00b2 identity; Vedic 'Nikhilam' near-base method",
   srcText:{"identity":"(100\u2212x)(100\u2212y) = 100(100\u2212x\u2212y) + xy; e.g. 97\u00d796 = 93|12 = 9312."}},
  {id:"Q3", name:"Awkward Percentage \u2192 Swap or Build", trigger:"A percentage that's hard to take directly but whose SWAP is easy, or one that decomposes into 10%/5%/25% pieces \u2014 '16% of 25', '35% of 80'.",
   move:"Either swap (x% of y = y% of x) or build from round pieces (35% = 25% + 10%). Pick whichever lands on numbers you can see instantly.",
   why:"x% of y is symmetric (both equal xy/100), and percentages of round fractions are memorised, so decomposition turns one hard step into two trivial ones.",
   mini:"Find 18% of 50, and 45% of 60.",
   fails:"Chaining percentage CHANGES by addition \u2014 +20% then \u221220% is \u22124%, not 0. Multiply factors for successive changes.",
   src:"x% of y = y% of x symmetry; standard fraction\u2013percentage table",
   srcText:{"symmetry":"16% of 25 = 25% of 16 = 4."}},
  {id:"Q4", name:"Non-Perfect Root or Power \u2192 Linear Approx", trigger:"A root, reciprocal, or power of a number just off a nice value, in a spot where 2\u20133 sig figs suffice \u2014 \u221a26, 1/1.03, 1.02\u2075, \u221a50.",
   move:"Anchor at the nearby exact value a, then add h\u00b7f'(a): \u221a26 = \u221a25 + 1/(2\u221a25) = 5.1. For (1+x)\u207f use 1 + nx. One Newton step sharpens a root further.",
   why:"Near a point, a smooth function tracks its tangent line \u2014 first-order Taylor. The error is second-order in the step, so for small steps it's tiny.",
   mini:"Estimate \u221a99 and 1.03\u2074 to three significant figures.",
   fails:"Using it when the step is NOT small (x \u2273 0.1) or the power is large \u2014 the linear guess then drifts well off; keep the x\u00b2 term or compute directly.",
   src:"First-order Taylor / binomial approximation (1+x)\u207f \u2248 1+nx",
   srcText:{"taylor":"f(a+h) \u2248 f(a) + h f'(a); \u221a26 \u2248 5 + 0.1 = 5.1 (true 5.099)."}},
  {id:"Q5", name:"Proportion Given \u2192 Componendo-Dividendo", trigger:"A ratio equation where the UNKNOWN is tangled, and (sum)/(difference) or 'add all numerators over all denominators' would untangle it \u2014 common in ratio/mixture and some coordinate-geometry section-formula problems.",
   move:"From a/b = c/d jump straight to (a+b)/(a\u2212b) = (c+d)/(c\u2212d), or use each ratio = (\u03a3 tops)/(\u03a3 bottoms). Solve the simpler resulting equation.",
   why:"It's legal algebra (add/subtract 1 both sides, then divide) compressed into one written move, so it removes a whole line of manipulation.",
   mini:"If (x+3)/(x\u22123) = 7/1, find x using componendo-dividendo in reverse.",
   fails:"Applying it when the two quantities are equal (division by a\u2212b = 0), or forgetting a sign when a term is negative.",
   src:"Componendo-dividendo (standard ratio identity)",
   srcText:{"identity":"a/b = c/d \u21d2 (a+b)/(a\u2212b) = (c+d)/(c\u2212d)."}},
  {id:"Q6", name:"Finished a Calculation \u2192 Screen It", trigger:"You've just produced a numeric or symbolic answer under time pressure and are about to move on.",
   move:"Run one cheap screen before committing: check units/dimensions, test a limiting case, and compare against a one-sig-fig order-of-magnitude estimate. Also cast out nines on any hand multiplication.",
   why:"Each screen re-derives a property the true answer MUST have (dimension, boundary behaviour, scale, residue mod 9). Failing any one is proof of an error for the price of a few seconds.",
   mini:"You computed the range of a projectile as v\u00b2sin2\u03b8/(2g) \u2014 what limiting-case and dimension check exposes the error?",
   fails:"Treating a PASSED check as confirmation. Sanity checks rule answers out; they never rule one in. And casting out nines misses errors that are multiples of 9.",
   src:"Dimensional analysis + limiting cases + casting out nines",
   srcText:{"limit":"Projectile range must scale as v\u00b2/g and vanish at \u03b8=0; a stray factor or wrong power breaks one of those."}}
];

/* ===== GUIDED (L3): worked, one per pattern, distinct from the minis ===== */
let MM_GUIDED = [
  {id:"MG1", tier:2, tax:"M1", pattern:"Q1",
   q:"A physics answer comes out as the fraction 1064/1387. Reduce it to lowest terms before reporting.",
   opts:["Ugly Fraction \u2192 Euclid","Round-Number-Nearby \u2192 (a\u00b1b)\u00b2","Proportion \u2192 Componendo-Dividendo","Non-Perfect Root \u2192 Linear Approx"], correct:0,
   hints:["Don't try to guess the shared factor \u2014 run Euclid. Start: 1387 \u2212 1064 = 323.",
          "Continue with the smaller pair: 1064 = 3\u00d7323 + 95, so replace 1064 by 95. Then 323 = 3\u00d795 + 38 \u2192 95, 38.",
          "95 \u2212 2\u00d738 = 19; 38 = 2\u00d719 + 0 \u2192 GCD 19. Now divide both original numbers by 19."],
   ans:"1064/1387 = 56/73  (GCD 19)",
   why:"The numbers share no small obvious factor, so trial division is slow and error-prone \u2014 but Euclid marches straight to 19 in a handful of steps and is guaranteed to terminate. Note the discipline the video violated: you keep going until a remainder hits 0, then the LAST non-zero value (19) is the GCD, and you must actually divide by it to finish."},
  {id:"MG2", tier:1, tax:"M2", pattern:"Q2",
   q:"Compute 96\u00b2 and 103\u00d797 mentally.",
   opts:["Round-Number-Nearby \u2192 (a\u00b1b)\u00b2 / near-base","Ugly Fraction \u2192 Euclid","Awkward Percentage \u2192 Swap","Finished \u2192 Screen It"], correct:0,
   hints:["96 = 100 \u2212 4. Use (100\u2212d)\u00b2 = (100\u22122d)|d\u00b2, remembering to pad d\u00b2 to two digits.",
          "So 96\u00b2 = (100\u22128)|16 = 92|16 = 9216.",
          "103\u00d797 = (100+3)(100\u22123) = 100\u00b2 \u2212 3\u00b2 = 10000 \u2212 9 = 9991 \u2014 a difference of squares."],
   ans:"96\u00b2 = 9216;  103\u00d797 = 9991",
   why:"Both collapse to identities anchored at 100. The second is the cleanest case of all \u2014 (a+b)(a\u2212b) = a\u00b2\u2212b\u00b2 \u2014 which is worth spotting on sight whenever two factors are symmetric about a round number. The one thing to guard: the d\u00b2 block in 96\u00b2 is 16 (two digits); had it been 9 you'd write 09."},
  {id:"MG3", tier:1, tax:"M4", pattern:"Q3",
   q:"Find 18% of 50, then 45% of 60, mentally.",
   opts:["Awkward Percentage \u2192 Swap or Build","Non-Perfect Root \u2192 Linear Approx","Ugly Fraction \u2192 Euclid","Finished \u2192 Screen It"], correct:0,
   hints:["18% of 50: swap it. 50% of 18 = 9.",
          "45% of 60: build it. 45% = 50% \u2212 5%. 50% of 60 = 30; 5% of 60 = 3.",
          "So 45% of 60 = 30 \u2212 3 = 27."],
   ans:"18% of 50 = 9;  45% of 60 = 27",
   why:"The swap (x% of y = y% of x) turns a hard 18%-of-something into a trivial half. The build turns 45% into a round 50% minus a small 5%. Both exploit that percentages of round numbers are the ones you can see instantly \u2014 the skill is choosing WHICH reframing lands there."},
  {id:"MG4", tier:2, tax:"M7", pattern:"Q4",
   q:"Estimate \u221a99 and 1.03\u2074 to three significant figures without a calculator.",
   opts:["Non-Perfect Root/Power \u2192 Linear Approx","Round-Number-Nearby \u2192 (a\u00b1b)\u00b2","Proportion \u2192 Componendo-Dividendo","Ugly Fraction \u2192 Euclid"], correct:0,
   hints:["\u221a99 = \u221a(100\u22121). Anchor at \u221a100 = 10 and add h\u00b7f'(a) with f = \u221a, a = 100, h = \u22121.",
          "f'(100) = 1/(2\u221a100) = 1/20 = 0.05, so \u221a99 \u2248 10 + (\u22121)(0.05) = 9.95.",
          "1.03\u2074 = (1+0.03)\u2074 \u2248 1 + 4(0.03) = 1.12 to first order (true value 1.1255, so 1.13 with the x\u00b2 term)."],
   ans:"\u221a99 \u2248 9.95  (true 9.9499);  1.03\u2074 \u2248 1.12\u20131.13",
   why:"Tangent-line thinking: near a nice anchor, the function is almost linear, so one correction term nails 3 sig figs. The failure mode shows its face in the second part \u2014 at the 4th power, the dropped x\u00b2 term already matters at the third figure, so if you need 1.13 rather than 1.12 you keep n(n\u22121)/2 \u00b7 x\u00b2 = 6\u00b70.0009 \u2248 0.005."},
  {id:"MG5", tier:2, tax:"M8", pattern:"Q5",
   q:"Solve (x+3)/(x\u22123) = 7 using componendo-dividendo in reverse.",
   opts:["Proportion \u2192 Componendo-Dividendo","Awkward Percentage \u2192 Swap","Finished \u2192 Screen It","Round-Number-Nearby \u2192 (a\u00b1b)\u00b2"], correct:0,
   hints:["Write 7 as 7/1, so (x+3)/(x\u22123) = 7/1. The structure (sum)/(difference) on the left is begging for componendo-dividendo backwards.",
          "By the identity, (x+3)/(x\u22123) = 7/1 \u21d2 the ORIGINAL ratio is [(7+1)/(7\u22121)] = 8/6 = 4/3, i.e. x/3 = 4/3.",
          "So x = 4. (Reason: if a/b = 4/3 then (a+b)/(a\u2212b) = 7/1, run in reverse.)"],
   ans:"x = 4",
   why:"Recognising (x+3)/(x\u22123) as the componendo-dividendo TRANSFORM of x/3 lets you invert it in one line instead of cross-multiplying and expanding. The guard: this only works because x\u22123 \u2260 0; had the reverse produced a\u2212b = 0 you'd know the original proportion was degenerate."},
  {id:"MG6", tier:2, tax:"M12", pattern:"Q6",
   q:"A student writes the range of a projectile launched at speed v, angle \u03b8, as R = v\u00b2 sin2\u03b8 /(2g). Use sanity checks to decide if it can be right.",
   opts:["Finished \u2192 Screen It","Non-Perfect Root \u2192 Linear Approx","Ugly Fraction \u2192 Euclid","Awkward Percentage \u2192 Swap"], correct:0,
   hints:["Dimensions first: v\u00b2/g has units (m/s)\u00b2/(m/s\u00b2) = m. Good \u2014 so the ERROR, if any, is in a dimensionless factor, not the structure.",
          "Limiting case \u03b8 = 45\u00b0: sin90\u00b0 = 1, so this formula gives v\u00b2/(2g). But the known maximum range is v\u00b2/g \u2014 twice as big. The factor of 2 is misplaced.",
          "Correct form is R = v\u00b2 sin2\u03b8 / g. The '/(2g)' is the slip; the checks caught it without re-deriving anything."],
   ans:"Wrong \u2014 the correct range is v\u00b2 sin2\u03b8 / g; the extra factor of 2 fails the \u03b8 = 45\u00b0 limiting-case check.",
   why:"Two independent screens, seconds each: dimensions confirmed the SHAPE was right (so no wasted re-derivation), and a single limiting case (\u03b8 = 45\u00b0, where the answer is famously v\u00b2/g) exposed the numerical factor. This is the meta-trick \u2014 you don't re-solve the problem, you test properties the true answer is forced to have."}
];

/* ===== PRACTICE (L4) ===== */
let MM_PRACTICE = [
  /* tier 1 */
  {src:"MM-1",  type:"NV", tier:1, tax:"M2", pat:"Q2", q:"Compute 45\u00b2 mentally using the 'ends in 5' rule.", ans:"2025", note:"4\u00b75 = 20, append 25 \u2192 2025.", doc:"core"},
  {src:"MM-2",  type:"NV", tier:1, tax:"M2", pat:"Q2", q:"Compute 85\u00b2 mentally.", ans:"7225", note:"8\u00b79 = 72, append 25.", doc:"core"},
  {src:"MM-3",  type:"NV", tier:1, tax:"M3", pat:"Q2", q:"Compute 63\u00d711 mentally.", ans:"693", note:"6|(6+3)|3 = 693; no carry needed.", doc:"core"},
  {src:"MM-4",  type:"NV", tier:1, tax:"M3", pat:"Q2", q:"Compute 57\u00d711 mentally (watch the carry).", ans:"627", note:"5|(5+7)|7 = 5|12|7 \u2192 carry the 1: 627.", doc:"core"},
  {src:"MM-5",  type:"NV", tier:1, tax:"M4", pat:"Q3", q:"Find 16% of 25 mentally.", ans:"4", note:"Swap: 25% of 16 = 4.", doc:"core"},
  {src:"MM-6",  type:"NV", tier:1, tax:"M4", pat:"Q3", q:"Find 12.5% of 88 mentally.", ans:"11", note:"12.5% = 1/8; 88/8 = 11.", doc:"core"},
  {src:"MM-7",  type:"NV", tier:1, tax:"M10", pat:"Q2", q:"Compute 51\u00b2 \u2212 49\u00b2 mentally.", ans:"200", note:"(51+49)(51\u221249) = 100\u00d72.", doc:"core"},
  {src:"MM-8",  type:"NV", tier:1, tax:"M9", pat:"Q6", q:"Is 918082 divisible by 11?", ans:"Yes", note:"Alternating sum 2\u22128+0\u22128+1\u22129 = \u221222, a multiple of 11.", doc:"core"},
  {src:"MM-9",  type:"NV", tier:1, tax:"M2", pat:"Q2", q:"Compute 97\u00b2 mentally (mind the padding).", ans:"9409", note:"(100\u22126)|3\u00b2 = 94|09; pad the 9 to 09.", doc:"core"},
  {src:"MM-10", type:"NV", tier:1, tax:"M5", pat:"Q4", q:"Which last digit must the cube root of 300763 end in?", ans:"7", note:"A cube ending in 3 has a root ending in 7 (7\u00b3 = 343). (In fact \u221b300763 = 67.)", doc:"core"},

  /* tier 2 */
  {src:"MM-11", type:"NV", tier:2, tax:"M1", pat:"Q1", q:"Reduce 517/893 to lowest terms.", ans:"11/19", note:"Euclid \u2192 GCD 47. THE video's example, done correctly: not 141, but 11/19.", doc:"core"},
  {src:"MM-12", type:"NV", tier:2, tax:"M1", pat:"Q1", q:"Reduce 1064/1387 to lowest terms.", ans:"56/73", note:"Euclid \u2192 GCD 19.", doc:"core"},
  {src:"MM-13", type:"NV", tier:2, tax:"M3", pat:"Q2", q:"Compute 97\u00d796 mentally.", ans:"9312", note:"Deficits 3,4: (97\u22124)|(3\u00d74) = 93|12.", doc:"core"},
  {src:"MM-14", type:"NV", tier:2, tax:"M7", pat:"Q4", q:"Estimate \u221a26 to three significant figures.", ans:"5.10", note:"5 + 1/(2\u00b75) = 5.1 (true 5.099).", doc:"core"},
  {src:"MM-15", type:"NV", tier:2, tax:"M7", pat:"Q4", q:"Estimate 1/1.03 to three significant figures.", ans:"0.971", note:"(1+0.03)\u207b\u00b9 \u2248 1 \u2212 0.03 = 0.97 (true 0.9709).", doc:"core"},
  {src:"MM-16", type:"NV", tier:2, tax:"M6", pat:"Q4", q:"Estimate log\u2081\u2080 6 using log2 \u2248 0.301 and log3 \u2248 0.477.", ans:"0.778", note:"log6 = log2 + log3.", doc:"core"},
  {src:"MM-17", type:"NV", tier:2, tax:"M6", pat:"Q4", q:"Estimate log\u2081\u2080 12.", ans:"1.079", note:"2log2 + log3 = 0.602 + 0.477.", doc:"core"},
  {src:"MM-18", type:"NV", tier:2, tax:"M4", pat:"Q3", q:"A price rises 20% then falls 20%. Net change?", ans:"\u22124% (a 4% loss)", note:"1.2\u00d70.8 = 0.96. Successive % changes MULTIPLY, never add.", doc:"core"},
  {src:"MM-19", type:"NV", tier:2, tax:"M8", pat:"Q5", q:"Compare 7/12 and 11/19 without decimals.", ans:"7/12 is larger", note:"Cross-multiply: 7\u00d719 = 133 > 11\u00d712 = 132.", doc:"core"},
  {src:"MM-20", type:"NV", tier:2, tax:"M10", pat:"Q2", q:"Compute 998\u00b2 mentally.", ans:"996004", note:"(1000\u22122)\u00b2 = 1000000 \u2212 4000 + 4.", doc:"core"},

  /* tier 3 — applied in a JEE-flavoured spot */
  {src:"MM-21", type:"NV", tier:3, tax:"M7", pat:"Q4", q:"In an experiment a quantity is z = x\u00b2y/\u221aw. If x, y, w each carry a 1% measurement error, estimate the worst-case % error in z.", ans:"\u2248 3.5%", note:"% error propagates as 2(1%) + 1(1%) + \u00bd(1%) = 3.5%. Powers multiply the fractional error by the exponent; a square-root contributes \u00bd.", doc:"core"},
  {src:"MM-22", type:"NV", tier:3, tax:"M7", pat:"Q4", q:"Estimate (1.01)\u00b9\u2070 to three significant figures using linear approximation, and say why keeping one more term matters here.", ans:"\u2248 1.10 (linear); 1.105 with the x\u00b2 term (true 1.1046)", note:"1 + 10(0.01) = 1.10; the second term (10\u00b79/2)(0.01)\u00b2 = 0.0045 lifts the third figure. High power \u21d2 the dropped term bites sooner.", doc:"core"},
  {src:"MM-23", type:"NV", tier:3, tax:"M12", pat:"Q6", q:"A student derives the period of a simple pendulum as T = 2\u03c0\u221a(g/L). Use a dimension check and a limiting case to show it's wrong and give the correct form.", ans:"Wrong; correct is T = 2\u03c0\u221a(L/g)", note:"\u221a(g/L) has units \u221a(1/s\u00b2\u00b7... ) \u2014 in fact 1/s inside the root gives wrong dimensions; and physically a LONGER pendulum must have a LONGER period, but \u221a(g/L) DECREASES with L. Both checks point to L/g.", doc:"core"},
  {src:"MM-24", type:"NV", tier:3, tax:"M5", pat:"Q4", q:"Estimate \u221a4900 \u00d7 \u221a2 to three significant figures (a common step in RMS-speed problems).", ans:"\u2248 99.0", note:"\u221a4900 = 70; 70\u221a2 = 70\u00d71.414 = 98.99. Recognising the perfect square first avoids a hard root.", doc:"core"},
  {src:"MM-25", type:"NV", tier:3, tax:"M8", pat:"Q5", q:"In a section-formula problem a point divides a segment so that (m+n)/(m\u2212n) = 5/3. Find m:n.", ans:"m:n = 4:1", note:"Componendo-dividendo in reverse: (m+n)/(m\u2212n) = 5/3 \u21d2 m/n = (5+3)/(5\u22123) = 8/2 = 4.", doc:"core"},
  {src:"MM-26", type:"NV", tier:3, tax:"M6", pat:"Q4", q:"Roughly how many digits does 2\u2075\u2070 have? Use log2 \u2248 0.301.", ans:"16 digits", note:"log(2\u2075\u2070) = 50\u00d70.301 = 15.05 \u2192 digit count = \u230a15.05\u230b + 1 = 16.", doc:"core"},
  {src:"MM-27", type:"NV", tier:3, tax:"M1", pat:"Q1", q:"A probability comes out as 858/1122. Reduce it (fractions in probability answers should always be in lowest terms).", ans:"13/17", note:"Euclid: GCD(858,1122) = 66; 858/66 = 13, 1122/66 = 17.", doc:"core"},
  {src:"MM-28", type:"NV", tier:3, tax:"M9", pat:"Q6", q:"You multiply 347\u00d7521 by hand and get 180787. Use casting out nines to test it, and state the check's limitation.", ans:"Digit-sums: 347\u21925, 521\u21928, product residue 5\u00d78=40\u21924; 180787\u219231\u21924. Passes. Limitation: it would still pass if the true answer differed by a multiple of 9 (e.g. a digit transposition), so 'passes' means 'not obviously wrong', not 'correct'. (True value 180787 \u2014 correct.)", note:"Casting out nines is a fast screen, never a proof of correctness.", doc:"core"}
];

let MM_PRAC_DOCS = [
  {id:"core", label:"Mental-Math core set \u2014 curated quick-calculation drills", date:"26 Jul 2026", note:"Hand-built, not from a test paper; every answer verified by direct computation. Anti-example (517/893) drawn from a maths short video whose on-screen method was incorrect."}
];

const MM_PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Warm-up"},{k:"2",l:"Fluency"},{k:"3",l:"Exam-applied"},{k:"Flag",l:"\u2605 Flagged"}];
