/* =====================================================================
   PATTERN LAB - curriculum & content (DATA ONLY, append-only)
   Add questions by adding records; never renumber existing ones.
   A chapter becomes "ready" the moment its path appears in CONTENT below.
   ===================================================================== */


/* ===== TAXONOMY (drives the coverage map) ===== */
let TAXA=[
  {code:"F1",label:"Evaluate any angle (ref + ASTC + allied)",group:"Foundation methods"},
  {code:"F2",label:"Convert · arc · clock · two-circle",group:"Foundation methods"},
  {code:"F3",label:"Domain · range · period basics",group:"Foundation methods"},
  {code:"F4",label:"Graph transform & reading",group:"Foundation methods"},
  {code:"P1",label:"Trap & Bound",group:"Patterns"},
  {code:"P2",label:"Sum-of-Squares Pins to Zero",group:"Patterns"},
  {code:"P3",label:"AM–GM Minimum (+ boundary gate)",group:"Patterns"},
  {code:"P4",label:"Reference-Angle Comparison",group:"Patterns"},
  {code:"P5",label:"Complete-the-Square Range",group:"Patterns"},
  {code:"P6",label:"Domain by Constraint (√/log)",group:"Patterns"},
  {code:"P7",label:"Allied-Angle Reduction",group:"Patterns"},
  {code:"P8",label:"LHS-max meets RHS-min (Pinch)",group:"Patterns"},
  {code:"P9",label:"Discriminant + Range Gate",group:"Patterns"},
  {code:"P10",label:"Complementary-Pair Telescoping",group:"Patterns"},
  {code:"P11",label:"|p+q|=|p|+|q| Sign Test",group:"Patterns"},
  {code:"P12",label:"Period of a Composite",group:"Patterns"},
  {code:"P13",label:"Conjugate Pair (sec±tan)",group:"Patterns"},
  {code:"P14",label:"Eliminate the Angle",group:"Patterns"},
  {code:"P15",label:"Conditional Identity",group:"Patterns"},
  {code:"P16",label:"Angle-Sum Closure",group:"Patterns"},
  {code:"P17",label:"Sandwich (Mediant) Inequality",group:"Patterns"},
  {code:"P18",label:"Symmetric Power Reduction",group:"Patterns"}
];
const TIER_LABEL={1:"Foundation",2:"JEE Main",3:"JEE Advanced"};

/* ===== L1 FORMULAE ===== */
let FORMULAE=[
  {tag:"ratios",title:"Ratios & reciprocals",rows:[
    {f:"sinθ = opp/hyp · cosθ = adj/hyp · tanθ = sinθ/cosθ"},
    {f:"cosecθ = 1/sinθ · secθ = 1/cosθ · cotθ = cosθ/sinθ",k:"trig",note:"See a reciprocal function? Convert to sin/cos first — it almost always simplifies."}]},
  {tag:"identities",title:"Pythagorean identities",rows:[
    {f:"sin²θ + cos²θ = 1"},
    {f:"sec²θ − tan²θ = 1  →  sec²θ = 1 + tan²θ"},
    {f:"cosec²θ − cot²θ = 1  →  cosec²θ = 1 + cot²θ",k:"trig",note:"Mixed squares of a function and its co-function? Use these to get everything in ONE function."},
    {f:"√(1 − sin²θ) = |cosθ|",k:"trap",note:"Root of a square gives the modulus, not the bare function. Fix the sign by quadrant."}]},
  {tag:"table",title:"Standard-angle values",rows:[
    {f:"sin: 0 · ½ · 1/√2 · √3/2 · 1   (0°,30°,45°,60°,90°)"},
    {f:"cos: 1 · √3/2 · 1/√2 · ½ · 0"},
    {f:"tan: 0 · 1/√3 · 1 · √3 · ∞",k:"trig",note:"Memorise cold. Every reduction lands back here."}]},
  {tag:"signs",title:"Sign rule — ASTC",rows:[
    {f:"Q1 All +  ·  Q2 Sin,cosec +  ·  Q3 Tan,cot +  ·  Q4 Cos,sec +"},
    {f:"\"Add Sugar To Coffee\"",k:"trig",note:"Big/negative angle? Find the quadrant → fix the sign → then use the reference angle for size."}]},
  {tag:"allied",title:"Allied / co-ratio reductions",rows:[
    {f:"90°−θ → co-ratio (sin↔cos, tan↔cot, sec↔cosec), all +"},
    {f:"n×90° ± θ : n EVEN → name stays · n ODD → name flips to co-function",k:"trig",note:"Sign = the original function's sign in the quadrant where the angle lands. The master allied rule."},
    {f:"e.g. tan320° = tan(4×90°−40°) = −tan40° = −cot50°"}]},
  {tag:"domain",title:"Domains",rows:[
    {f:"sin, cos : ℝ"},
    {f:"tan, sec : ℝ − {(2n+1)π/2}"},
    {f:"cot, cosec : ℝ − {nπ}",k:"trig",note:"Undefined wherever the denominator (cos or sin) hits zero."}]},
  {tag:"range",title:"Ranges (the bound engine)",rows:[
    {f:"sin, cos ∈ [−1, 1]"},
    {f:"cosec, sec ∈ (−∞,−1] ∪ [1, ∞)"},
    {f:"tan, cot ∈ ℝ"},
    {f:"⇒ |sinθ|,|cosθ| ≤ 1 · sin²θ,cos²θ ∈ [0,1] · sec²θ,cosec²θ ≥ 1",k:"trap",note:"Most \"is it possible / find the range\" questions are won right here."}]},
  {tag:"period",title:"Periods",rows:[
    {f:"sin, cos, sec, cosec : 2π   ·   tan, cot : π"},
    {f:"period of f(ax) = T / |a|   e.g. sin(2x)→π · cos(x/3)→6π",k:"trig",note:"Horizontal scaling changes the PERIOD; vertical scaling changes the RANGE."},
    {f:"|sinx|, |cosx|, |tanx| → period π · sin²x → period π",k:"trap",note:"Symmetry can halve the period — blind LCM over-counts."}]},
  {tag:"parity",title:"Even / odd",rows:[
    {f:"cos, sec EVEN : f(−x)=f(x), symmetric about y-axis"},
    {f:"sin, tan, cot, cosec ODD : f(−x)=−f(x), symmetric about origin",k:"trig",note:"Lets you strip a minus sign out of the angle instantly."}]},
  {tag:"graphs",title:"Graph transforms",rows:[
    {f:"y = −f(x) : flip in x-axis (period unchanged)"},
    {f:"y = a·f(x) : vertical stretch/compress → affects RANGE"},
    {f:"y = f(ax) : horizontal squeeze by 1/|a| → affects PERIOD"},
    {f:"y = |f(x)| : reflect the below-axis part upward",k:"trig",note:"Sketch fast to read domains/inequalities like √(sinx−cosx)."}]},
  {tag:"radian",title:"Radian & arc",rows:[
    {f:"π rad = 180° · 1 rad = (180/π)° · 1° = (π/180) rad"},
    {f:"arc s = rθ (θ in rad) · θ = s/r",k:"trig",note:"DMS, clock-hand angle, two-circle ratio → convert to one consistent unit first."}]},
  {tag:"bounds",title:"Acute bounds & helpers",rows:[
    {f:"For acute θ :  sinθ < θ < tanθ"},
    {f:"x + 1/x ≥ 2 for x > 0 (equality at x=1)",k:"trig",note:"Instant impossibility check, e.g. sinθ + 1/sinθ can never be < 2."}]}
];

/* ===== L2 PATTERNS (18) ===== */
let PATTERNS=[
  {id:"P1",name:"Trap & Bound",trigger:"A quantity is forced into a fixed range (sinθ,cosθ∈[−1,1]; x+1/x≥2), or the question says \"which is possible / not possible\", or asks for a count.",move:"Don't solve exactly. Find the tightest bound and test feasibility.",why:"JEE often wants existence or count, not the value — a bound settles it in seconds.",mini:"sinθ = 5/3? Impossible: |sinθ| ≤ 1.",fails:"When the quantity genuinely roams free — tanθ = 1002 is fine, tan is unbounded.",src:"Illus 1.38, 1.47, 1.49"},
  {id:"P2",name:"Sum-of-Squares Pins to Zero",trigger:"A sum of non-negative terms equals its smallest possible value — e.g. sin²θ₁ + sin²θ₂ + … = 0.",move:"Each term must individually sit at its minimum. Read off every variable.",why:"Non-negatives can only sum to the floor if every one is on the floor.",mini:"sin²A + sin²B = 0 ⇒ sinA = sinB = 0.",fails:"When terms can be negative — they can cancel, so values aren't forced.",src:"Illus 1.40 · Exercise Q5, Q15"},
  {id:"P3",name:"AM–GM Minimum",trigger:"Minimise a SUM of positive terms whose PRODUCT is constant — a·tan²x + b·cot²x, sec²θ·cosec²θ, 2cosθ + 1/sinθ + √2·tanθ.",move:"AM ≥ GM gives the minimum in one line; equality when the terms are equal.",why:"With the product fixed, the sum is smallest when the parts are balanced.",mini:"a·tan²x + b·cot²x ≥ 2√(ab)  (product ab is constant).",fails:"If equality needs sin²x > 1 (impossible), AM–GM is unreachable — fall back to the boundary value. The 256sin²x+324cosec²x trap.",src:"Illus 1.8, 1.22, 1.42 · Example 1.3, 1.7"},
  {id:"P4",name:"Reference-Angle Comparison",trigger:"Compare trig values of plain numbers — \"which is greatest: tan1, tan4, tan7, tan10?\" or sin/cos/cosec of radian values; or \"which is negative\".",move:"Write each angle as nπ ± α (α acute). Fix its quadrant & sign, then compare using the function's monotonic behaviour inside that quadrant.",why:"You can't eyeball tan7 — reducing to a known acute residue makes them comparable.",mini:"tan4 = tan(4−π) = tan(0.86); tan1 = tan(1). Both in Q1 where tan rises ⇒ tan1 larger.",fails:"If residues fall in different quadrants, compare signs first — a positive beats any negative.",src:"Illus 1.34–1.36, 1.43–1.45, 1.70"},
  {id:"P5",name:"Complete-the-Square Range",trigger:"Range of a polynomial in ONE trig function — sin²x − 3sinx + 2.",move:"Substitute t = (that function) with its real range (sinx ⇒ t∈[−1,1]); complete the square; evaluate over that restricted interval.",why:"The vertex may lie outside [−1,1]; then the extremes are at the interval ends.",mini:"sin²x − 3sinx + 2 = (t−3/2)² − 1/4, t∈[−1,1] ⇒ range [0, 6].",fails:"Using the unconstrained vertex and forgetting t is capped — the classic lost mark.",src:"Illus 1.53–1.55 · Matrix-Match"},
  {id:"P6",name:"Domain by Constraint (√ and log)",trigger:"f(x) = √(expr) needs expr ≥ 0 · f(x) = log(expr) needs expr > 0.",move:"Write the constraint as a trig inequality, then sketch the two graphs and read the intervals.",why:"The trick is spotting it's a domain question in disguise — then a graph reads it fast.",mini:"√(sinx − cosx) needs sinx ≥ cosx ⇒ x ∈ [π/4, 5π/4] on [0,2π].",fails:"Forgetting log needs strict > 0, or dropping the period when listing all x.",src:"Illus 1.56–1.60"},
  {id:"P7",name:"Allied-Angle Reduction",trigger:"A function of a big angle that's a multiple of 90° (π/2) plus/minus θ — sin(71π/2 + θ), tan320°, cos(2kπ − π/2 + θ).",move:"Even multiple of 90° → name stays; odd → name flips to co-function. Sign = original function's sign in the landing quadrant.",why:"Collapses a monstrous angle to a clean ±(co)function of θ.",mini:"tan320° = tan(4×90°−40°) ⇒ even ⇒ tan, Q4 ⇒ −tan40° = −cot50°.",fails:"Mis-counting odd/even, or fixing the sign from θ's quadrant instead of the landing quadrant.",src:"Illus 1.26, 1.61–1.63"},
  {id:"P8",name:"LHS-max meets RHS-min (Pinch)",trigger:"A trig expression = an algebraic expression, where each side has a tight bound that just touches.",move:"Bound each side. If max(LHS) = min(RHS), equality forces both to that shared value — then solve two easy equations.",why:"Two bounds that meet leave exactly one possibility.",mini:"3cosθ = (x−4)²+3 : LHS ≤ 3, RHS ≥ 3 ⇒ both = 3 ⇒ cosθ=1, x=4.",fails:"When the bounds overlap rather than just touch — then there's an interval, not a point.",src:"Illus 1.48"},
  {id:"P9",name:"Discriminant + Range Gate",trigger:"A quadratic in cosx (or sinx) must have a real / valid solution → find the parameter range.",move:"Real root needs discriminant ≥ 0, AND the root must lie in [−1,1]. Two gates.",why:"Students apply the discriminant and forget cos/sin can't exceed 1 — that second gate is where marks vanish.",mini:"2cos²x−(p+3)cosx+2(p−1)=0 ⇒ cosx=(p−1)/2 ⇒ −1≤(p−1)/2≤1 ⇒ p∈[−1,3].",fails:"Reporting a range that lets cosx land outside [−1,1].",src:"Illus 1.41 · Q56"},
  {id:"P10",name:"Complementary-Pair Telescoping",trigger:"A long product or sum over angles that pair to 90° — tan1°·tan2°…tan89°, or log(tan6°)+…+log(tan84°).",move:"Pair k with 90°−k: tanθ·tan(90°−θ)=1 (product) or logs add to 0 (sum). The middle term (tan45°=1) anchors it.",why:"Each pair collapses to 1 (or 0), so the whole chain collapses.",mini:"tan1°·tan89° = tan1°·cot1° = 1 ⇒ entire product = 1.",fails:"Mis-pairing when the list isn't symmetric about 45° — check the endpoints.",src:"Illus 1.11 · Exercise Q6, Q42"},
  {id:"P11",name:"|p+q| = |p|+|q| Sign Test",trigger:"An absolute-value equality like |sinx + cosx| = |sinx| + |cosx|.",move:"|p+q|=|p|+|q| holds iff p·q ≥ 0. Set the product ≥ 0 and read the quadrants.",why:"Turns a messy modulus equation into a one-line sign condition.",mini:"Needs sinx·cosx ≥ 0 ⇒ x in Q1 or Q3.",fails:"Forgetting the boundary (product = 0) cases on the axes.",src:"Illus 1.46"},
  {id:"P12",name:"Period of a Composite",trigger:"\"Fundamental period of\" sin(cosx), |sinx|+|cosx|, sin²x, sin(2x).",move:"Apply base periods + the f(ax)→T/|a| rule; for sums take the LCM; for powers/|·| halve where symmetry allows — then VERIFY with f(x+T)=f(x).",why:"Blind LCM over-counts; symmetry (sin²x has period π, not 2π) is the catch.",mini:"sin²x = (1−cos2x)/2 ⇒ period π · |sinx|+|cosx| ⇒ π/2.",fails:"Quoting 2π for sin²x — the squaring halves it.",src:"Illus 1.67, 1.68 · Example 1.2"},
  {id:"P13",name:"Conjugate Pair (sec±tan)",trigger:"A single relation in sec±tan or cosec±cot, and you need the other combination or the individual values.",move:"Multiply by the conjugate: (secθ+tanθ)(secθ−tanθ)=sec²θ−tan²θ=1, so one is the reciprocal of the other. Add/subtract to isolate secθ and tanθ.",why:"sec²−tan²=1 (and cosec²−cot²=1) turn conjugate products into 1, splitting one equation into two.",mini:"secθ+tanθ=3/2 ⇒ secθ−tanθ=2/3 ⇒ secθ=13/12, tanθ=5/12.",fails:"When the relation isn't a clean conjugate pair — the product won't be 1.",src:"Illus 1.13, 1.18, 1.21"},
  {id:"P14",name:"Eliminate the Angle",trigger:"Two relations each containing θ; asked for a relation between the OTHER variables (m, n) with θ gone.",move:"Solve each for a clean power of sinθ/cosθ, then combine so θ cancels — often via sin²+cos²=1 after taking suitable roots.",why:"θ is a free parameter; eliminating it leaves exactly the constraint the variables must satisfy.",mini:"cosecθ−sinθ=m, secθ−cosθ=n ⇒ (m²n)^⅔ + (mn²)^⅔ = 1.",fails:"When clean powers won't isolate — then square-and-add instead.",src:"Illus 1.19, 1.21"},
  {id:"P15",name:"Conditional Identity",trigger:"\"Given [relation], prove [identity]\" — the identity holds only under the given condition.",move:"Carry the given INTO the expression (substitute, or square-and-add the given) rather than manipulating blindly.",why:"The condition is the lever; without it you're trying to prove something not universally true.",mini:"3sinθ+5cosθ=5 ⇒ (square+add with 5sinθ−3cosθ=x) ⇒ x²=9 ⇒ 5sinθ−3cosθ=±3.",fails:"Treating it as a free identity — without the given, it won't close.",src:"Illus 1.15, 1.16, 1.20"},
  {id:"P16",name:"Angle-Sum Closure",trigger:"Angles of a triangle (A+B+C=π) or cyclic quadrilateral (opposite pairs sum to π).",move:"Replace one angle via the sum: C=π−(A+B) ⇒ sinC=sin(A+B), cosC=−cos(A+B); cyclic ⇒ cosC=−cosA.",why:"The closure relation cuts the variable count and flips signs predictably.",mini:"cyclic quad ⇒ A+C=π ⇒ cosC=−cosA ⇒ cosA+cosB+cosC+cosD=0.",fails:"Using it on angles that aren't a genuine triangle/cyclic figure.",src:"Illus 1.65, 1.66, 1.69"},
  {id:"P17",name:"Sandwich (Mediant) Inequality",trigger:"A ratio of sums like (sinα+sinβ+sinγ)/(cosα+cosβ+cosγ), asked to bound it between two tangents.",move:"For positive terms, the ratio of sums (the mediant) lies strictly between the smallest and largest individual ratios; tan increasing ⇒ smallest = tanα, largest = tanγ.",why:"A weighted average of fractions can't escape the range of the fractions it averages.",mini:"0<α<β<γ<π/2 ⇒ tanα < (Σsin)/(Σcos) < tanγ.",fails:"When denominators can be negative — the mediant property needs all-positive terms.",src:"Illus 1.10"},
  {id:"P18",name:"Symmetric Power Reduction",trigger:"A symmetric expression in sinⁿx and cosⁿx — sin⁴+cos⁴, sin⁶+cos⁶, or a sum of sin²k° terms.",move:"Reduce using sin²+cos²=1: sin⁴+cos⁴=1−2s²c², sin⁶+cos⁶=1−3s²c² (s²c²=¼sin²2x). For angle sums, pair k° with (90−k)°.",why:"Every symmetric power collapses to a small polynomial in sin²2x (or to counts of paired 1's).",mini:"sin⁶x+cos⁶x = 1 − ¾sin²2x ⇒ range [¼, 1].",fails:"Expanding term-by-term instead of using the s²+c²=1 collapse.",src:"Illus 1.12, 1.17 · MC, LC, Archives"}
];

/* ===== L3 GUIDED (18, laddered) ===== */
let GUIDED=[
  /* TIER 1 — FOUNDATION */
  {id:"G1",tier:1,tax:"P4",pattern:"P4",q:"Which is the greatest: tan1, tan4, tan7, tan10? (radians)",opts:["Trap & Bound","Reference-Angle Comparison","AM–GM Minimum","Complete-the-Square Range"],correct:1,
   hints:["These exceed tan's period (π ≈ 3.14). Reduce each to an acute residue in (0, π/2).","tan4 = tan(4−π) = tan(0.86) · tan7 = tan(0.72) · tan10 = tan(0.58) · tan1 = tan(1). All sit in Q1, where tan increases.","Order the residues: 1 > 0.86 > 0.72 > 0.58, and tan rises across Q1."],ans:"tan1",why:"Trigger = compare tan of plain numbers → don't compute four tangents, reduce to Q1 residues and use monotonicity."},
  {id:"G2",tier:1,tax:"P3",pattern:"P3",q:"Find the minimum value of 9tan²θ + 4cot²θ.",opts:["Sum-of-Squares Pins to Zero","Complete-the-Square Range","AM–GM Minimum","Allied-Angle Reduction"],correct:2,
   hints:["Two positive terms — is the product constant? 9tan²θ·4cot²θ = 36, since tanθ·cotθ = 1.","AM ≥ GM : (9tan²θ + 4cot²θ)/2 ≥ √36 = 6.","So the sum ≥ 12, equality when 9tan²θ = 4cot²θ (achievable, since that needs tan²θ = 2/3 < ∞)."],ans:"12",why:"Trigger = minimise a sum with constant product. AM–GM is one line."},
  {id:"G3",tier:1,tax:"P5",pattern:"P5",q:"Find the range of f(x) = sin²x − 3sinx + 2.",opts:["Complete-the-Square Range","Trap & Bound","Domain by Constraint","Period of a Composite"],correct:0,
   hints:["Quadratic in sinx. Substitute t = sinx with t ∈ [−1, 1].","f = (t − 3/2)² − 1/4. Vertex t = 3/2 lies OUTSIDE [−1,1] ⇒ extremes at the ends.","On [−1,1], max at t = −1 (gives 6), min at t = 1 (gives 0)."],ans:"[0, 6]",why:"Vertex outside [−1,1] ⇒ evaluate at the endpoints, not the vertex."},
  {id:"G4",tier:1,tax:"P1",pattern:"P1",q:"Which is possible? (a) sinθ = 5/3 (b) tanθ = 1002 (c) cosθ = (1+p²)/(1−p²), p≠0,±1 (d) secθ = 1/2",opts:["Trap & Bound","Discriminant + Range Gate","Complete-the-Square Range","AM–GM Minimum"],correct:0,
   hints:["Check each against its range. sin,cos∈[−1,1]; tan∈ℝ; sec never lies in (−1,1).","(a) 5/3>1 ✗ · (d) 1/2∈(−1,1), forbidden for sec ✗ · (c) |value|>1 for p≠0 ✗.","(b) tan is unbounded ⇒ fine ✓."],ans:"(b) tanθ = 1002",why:"\"Which is possible\" → Trap & Bound. Check ranges, never solve."},
  {id:"G5",tier:1,tax:"P7",pattern:"P7",q:"Evaluate sin690°.",opts:["Allied-Angle Reduction","Trap & Bound","Conjugate Pair","Period of a Composite"],correct:0,
   hints:["690° is a multiple of 90° minus a bit: 690° = 4×180° − 30° = 8×90° − 30°.","8×90° is an even number of 90° ⇒ name stays sin. The angle lands in Q4.","In Q4 sine is negative, reference angle 30° ⇒ sin690° = −sin30°."],ans:"−1/2",why:"Even multiple of 90° keeps the name; the quadrant (Q4) fixes the sign."},
  {id:"G6",tier:1,tax:"P13",pattern:"P13",q:"If secθ + tanθ = 3/2, find secθ and tanθ.",opts:["Conditional Identity","Conjugate Pair","Eliminate the Angle","AM–GM Minimum"],correct:1,
   hints:["(secθ+tanθ)(secθ−tanθ) = sec²θ−tan²θ = 1, so secθ−tanθ = 1/(3/2) = 2/3.","Add the two: 2secθ = 3/2 + 2/3 = 13/6.","Subtract: 2tanθ = 3/2 − 2/3 = 5/6."],ans:"secθ = 13/12 , tanθ = 5/12",why:"The conjugate product is 1, so one relation becomes two — then add/subtract."},
  /* TIER 2 — MAIN */
  {id:"G7",tier:2,tax:"P9",pattern:"P9",q:"Find all p for which 2cos²x − (p+3)cosx + 2(p−1) = 0 has a real solution.",opts:["Trap & Bound","Discriminant + Range Gate","LHS-max meets RHS-min","AM–GM Minimum"],correct:1,
   hints:["Quadratic in cosx. Its discriminant simplifies to (p−5)² ≥ 0 — always real, so realness alone gives nothing.","Roots: cosx = (p−1)/2 and cosx = 2. The root 2 is impossible — the Range Gate kills it.","So the surviving root needs −1 ≤ (p−1)/2 ≤ 1."],ans:"p ∈ [−1, 3]",why:"Two gates: discriminant for realness, then |cosx| ≤ 1. The second is where marks get lost."},
  {id:"G8",tier:2,tax:"P6",pattern:"P6",q:"For which x in [0, 2π] is f(x) = √(sinx − cosx) defined?",opts:["Period of a Composite","Allied-Angle Reduction","Domain by Constraint","Sum-of-Squares Pins to Zero"],correct:2,
   hints:["A square root needs its inside ≥ 0 : sinx ≥ cosx.","Sketch y = sinx and y = cosx on [0, 2π]; find where sine is on/above cosine.","They cross at π/4 and 5π/4; sine ≥ cosine between them."],ans:"x ∈ [π/4, 5π/4]",why:"√(…) defined → a domain inequality; the graph reads the interval fastest."},
  {id:"G9",tier:2,tax:"P2",pattern:"P2",q:"If sin²θ₁ + sin²θ₂ + sin²θ₃ = 0, which CANNOT be cosθ₁ + cosθ₂ + cosθ₃?  (3, −3, −1, −2)",opts:["Trap & Bound","Sum-of-Squares Pins to Zero","Conditional Identity","Angle-Sum Closure"],correct:1,
   hints:["A sum of three squares = 0 forces each sinθ = 0.","So each cosθ = ±1; the sum is an odd count of ±1's ⇒ ∈ {−3, −1, 1, 3}.","−2 is even — unreachable from three ±1's."],ans:"−2 cannot occur",why:"Squares summing to zero pin each term to zero — then the cosines are locked to ±1."},
  {id:"G10",tier:2,tax:"P8",pattern:"P8",q:"Find all x, θ with 3cosθ = x² − 8x + 19.",opts:["Discriminant + Range Gate","LHS-max meets RHS-min","Complete-the-Square Range","Conjugate Pair"],correct:1,
   hints:["Bound each side. LHS = 3cosθ ≤ 3. RHS = (x−4)² + 3 ≥ 3.","Max(LHS) = min(RHS) = 3 — they only meet at 3.","So cosθ = 1 and (x−4)² = 0."],ans:"cosθ = 1 (θ = 2nπ), x = 4",why:"Two bounds that just touch leave exactly one possibility on each side."},
  {id:"G11",tier:2,tax:"P18",pattern:"P18",q:"Prove 2(sin⁶x + cos⁶x) − 3(sin⁴x + cos⁴x) + 1 = 0.",opts:["Symmetric Power Reduction","Conditional Identity","AM–GM Minimum","Period of a Composite"],correct:0,
   hints:["Reduce the symmetric powers. Let p = sin²x·cos²x. Then sin⁶+cos⁶ = 1 − 3p and sin⁴+cos⁴ = 1 − 2p.","Substitute: 2(1 − 3p) − 3(1 − 2p) + 1.","= 2 − 6p − 3 + 6p + 1 — the p-terms cancel."],ans:"= 0  (identity holds)",why:"Symmetric powers collapse via sin²+cos²=1; expanding term-by-term is the slow trap."},
  {id:"G12",tier:2,tax:"P10",pattern:"P10",q:"Show that tan1° · tan2° · tan3° ⋯ tan89° = 1.",opts:["Symmetric Power Reduction","Complementary-Pair Telescoping","Allied-Angle Reduction","Conditional Identity"],correct:1,
   hints:["Pair each k° with (90°−k)°: tanθ · tan(90°−θ) = tanθ · cotθ = 1.","1°↔89°, 2°↔88°, … each pair multiplies to 1.","The unpaired middle term is tan45° = 1."],ans:"product = 1",why:"Complementary pairs each collapse to 1; the centre anchors it."},
  {id:"G13",tier:2,tax:"P15",pattern:"P15",q:"If 3sinθ + 5cosθ = 5, prove that 5sinθ − 3cosθ = ±3.",opts:["Conditional Identity","Conjugate Pair","Sum-of-Squares Pins to Zero","Sandwich Inequality"],correct:0,
   hints:["Let the target be x = 5sinθ − 3cosθ. You're given 3sinθ + 5cosθ = 5.","Square and add both: (3sinθ+5cosθ)² + (5sinθ−3cosθ)² = (9+25)(sin²θ+cos²θ) = 34.","So 5² + x² = 34 ⇒ x² = 9."],ans:"5sinθ − 3cosθ = ±3",why:"Carry the given in via square-and-add; the cross terms cancel and sin²+cos²=1 closes it."},
  /* TIER 3 — ADVANCED */
  {id:"G14",tier:3,tax:"P14",pattern:"P14",q:"If cosecθ − sinθ = m and secθ − cosθ = n, eliminate θ to relate m and n.",opts:["Conjugate Pair","Eliminate the Angle","Conditional Identity","Symmetric Power Reduction"],correct:1,
   hints:["Simplify each: cosecθ − sinθ = (1−sin²θ)/sinθ = cos²θ/sinθ = m, and secθ − cosθ = sin²θ/cosθ = n.","Form m²n = (cos⁴θ/sin²θ)(sin²θ/cosθ) = cos³θ ⇒ (m²n)^⅓ = cosθ. Likewise (mn²)^⅓ = sinθ.","Now use cos²θ + sin²θ = 1 on those cube-roots squared."],ans:"(m²n)^⅔ + (mn²)^⅔ = 1",why:"Isolate clean powers of sinθ, cosθ, then sin²+cos²=1 eliminates θ. A multi-step Advanced classic."},
  {id:"G15",tier:3,tax:"P5",pattern:"P5",q:"Find the range of f(x) = √(sin²x − 6sinx + 9) + 3.",opts:["Domain by Constraint","Complete-the-Square Range then bound","Discriminant + Range Gate","AM–GM Minimum"],correct:1,
   hints:["The radicand is a perfect square: sin²x − 6sinx + 9 = (sinx − 3)². So √(…) = |sinx − 3|.","Since sinx ≤ 1 < 3, sinx − 3 is always negative ⇒ |sinx − 3| = 3 − sinx.","sinx ∈ [−1,1] ⇒ 3 − sinx ∈ [2,4] ⇒ add 3."],ans:"[5, 7]",why:"Two patterns: first collapse the √ to a modulus, THEN bound it. Skipping the simplification is the trap."},
  {id:"G16",tier:3,tax:"P17",pattern:"P17",q:"For 0 < α < β < γ < π/2, prove tanα < (sinα+sinβ+sinγ)/(cosα+cosβ+cosγ) < tanγ.",opts:["Sandwich (Mediant) Inequality","Complete-the-Square Range","Sum-of-Squares Pins to Zero","Conjugate Pair"],correct:0,
   hints:["All denominators are positive (cos > 0 on (0,π/2)). The middle expression is a mediant of the fractions sinα/cosα, sinβ/cosβ, sinγ/cosγ.","A mediant of positive fractions lies strictly between the smallest and largest of them.","tan is increasing on (0,π/2), so smallest = tanα, largest = tanγ."],ans:"tanα < ratio < tanγ",why:"A ratio of sums is a weighted average of the individual ratios — it can't escape their range."},
  {id:"G17",tier:3,tax:"P3",pattern:"P3",q:"Find the minimum value of 256sin²x + 324cosec²x, x ∈ ℝ.",opts:["Complete-the-Square Range","AM–GM Minimum (with boundary gate)","Sum-of-Squares Pins to Zero","Domain by Constraint"],correct:1,
   hints:["Product is constant: 256sin²x · 324cosec²x = 256·324. AM–GM suggests min = 2√(256·324) = 576.","But equality needs 256sin²x = 324cosec²x ⇒ sin⁴x = 324/256 > 1 — impossible. AM–GM is UNREACHABLE here.","Let t = sin²x ∈ (0,1]. f = 256t + 324/t is decreasing on (0,1] (its turning point is at t = 18/16 > 1). So the minimum is at t = 1."],ans:"580  (at sin²x = 1, not 576)",why:"The headline AM–GM trap: when equality demands an impossible value, slide to the nearest feasible boundary. This single instinct saves a wrong answer on a whole class of problems."},
  {id:"G18",tier:3,tax:"P16",pattern:"P16",q:"If A, B, C, D are the angles of a cyclic quadrilateral (in order), prove cosA + cosB + cosC + cosD = 0.",opts:["Angle-Sum Closure","Symmetric Power Reduction","Sandwich Inequality","Conditional Identity"],correct:0,
   hints:["In a cyclic quadrilateral opposite angles are supplementary: A + C = π and B + D = π.","So C = π − A ⇒ cosC = −cosA, and D = π − B ⇒ cosD = −cosB.","Add all four."],ans:"= 0",why:"The closure relation (opposite angles sum to π) flips signs in pairs, cancelling the sum."}
];

/* ===== L4 PRACTICE (39 items, verified vs Cengage answer key) ===== */
let PRACTICE=[
  /* Single Correct */
  {src:"SC Q1",type:"SC",tier:1,tax:"F1",q:"If 5tan\u03b8 = 4, then (5sin\u03b8 \u2212 3cos\u03b8)/(5sin\u03b8 + 2cos\u03b8) =",pat:"Divide by cos\u03b8",ans:"1/6",opt:"(3)"},
  {src:"SC Q2",type:"SC",tier:1,tax:"P1",q:"If sinx + cosecx = 2, then sin\u207fx + cosec\u207fx =",pat:"P1 \u00b7 Trap & Bound",ans:"2",opt:"(1)"},
  {src:"SC Q3",type:"SC",tier:2,tax:"P10",q:"Regular hexagon A\u2080\u2026A\u2085 on a unit circle. Product A\u2080A\u2081 \u00b7 A\u2080A\u2082 \u00b7 A\u2080A\u2084 =",pat:"Chord-length symmetry",ans:"3",opt:"(3)",nudge:"Put A\u2080 at angle 0; each chord A\u2080A_k = 2 sin(k\u00b730\u00b0). Multiply the three."},
  {src:"SC Q5",type:"SC",tier:1,tax:"P2",q:"If sin\u03b8\u2081 + sin\u03b8\u2082 + sin\u03b8\u2083 = 3, then cos\u03b8\u2081 + cos\u03b8\u2082 + cos\u03b8\u2083 =",pat:"P2 \u00b7 Sum pins to extreme",ans:"0",opt:"(4)"},
  {src:"SC Q6",type:"SC",tier:1,tax:"P10",q:"log\u2081\u2080(tan6\u00b0) + log\u2081\u2080(tan12\u00b0) + \u2026 + log\u2081\u2080(tan84\u00b0) =",pat:"P10 \u00b7 Pair Telescoping",ans:"0",opt:"(2)"},
  {src:"SC Q7",type:"SC",tier:2,tax:"P3",q:"For 0 < \u03b8 < 90\u00b0, the minimum value of 3sin\u03b8 + cosec\u00b3\u03b8 is",pat:"P3 \u00b7 AM\u2013GM",ans:"4",opt:"(1)",nudge:"Split 3sin\u03b8 as sin\u03b8+sin\u03b8+sin\u03b8 so the four-term product sin\u00b3\u03b8\u00b7cosec\u00b3\u03b8 = 1 is constant, then AM\u2013GM."},
  {src:"SC Q10",type:"SC",tier:2,tax:"F2",q:"The side of a rhombus is the geometric mean of its diagonals. Its acute angle is",pat:"Geometry \u2192 trig",ans:"30\u00b0",opt:"(2)",nudge:"Diagonals bisect at right angles; relate the acute angle to the diagonal ratio, and use side\u00b2 = d\u2081d\u2082."},
  {src:"SC Q12",type:"SC",tier:1,tax:"P13",q:"If cosec\u03b8 \u2212 cot\u03b8 = q, then cosec\u03b8 =",pat:"P13 \u00b7 Conjugate pair",ans:"\u00bd(q + 1/q)",opt:"(3)"},
  {src:"SC Q14",type:"SC",tier:2,tax:"P14",q:"If tan\u03b8 + sin\u03b8 = m and tan\u03b8 \u2212 sin\u03b8 = n, then",pat:"P14 \u00b7 Eliminate \u03b8",ans:"m\u00b2 \u2212 n\u00b2 = 4\u221a(mn)",opt:"(4)",nudge:"Compute m\u00b2\u2212n\u00b2 and mn separately, then show 4\u221a(mn) equals m\u00b2\u2212n\u00b2."},
  {src:"SC Q26",type:"SC",tier:1,tax:"F2",q:"A child runs 110 m along a circular park, subtending 150\u00b0 at the centre. Radius =",pat:"F2 \u00b7 arc s = r\u03b8",ans:"132/\u03c0 m",opt:"(1)"},
  {src:"SC Q27",type:"SC",tier:1,tax:"F1",q:"The least positive angle coterminal with \u2212820\u00b0 in radian measure is",pat:"F1 \u00b7 coterminal",ans:"13\u03c0/9",opt:"(2)"},
  {src:"SC Q29",type:"SC",tier:2,tax:"F1",q:"Which angle, in standard position, has the GREATEST reference angle? (765\u00b0, 29\u03c0/12, 1110\u00b0, 25\u03c0/9)",pat:"F1 \u00b7 reference angle",ans:"29\u03c0/12",opt:"(2)",nudge:"Reduce each to standard position, then find its acute reference angle and compare."},
  {src:"SC Q30",type:"SC",tier:2,tax:"P4",q:"Which is correct: sin1\u00b0 > sin1, sin1\u00b0 < sin1, sin1\u00b0 = sin1?",pat:"P4 \u00b7 degree vs radian",ans:"sin1\u00b0 < sin1",opt:"(2)",nudge:"1 radian \u2248 57\u00b0, so compare sin1\u00b0 with sin57\u00b0."},
  {src:"SC Q37",type:"SC",tier:1,tax:"F4",q:"sinx is increasing on which interval?",pat:"F4 \u00b7 monotonic from graph",ans:"(\u2212\u03c0/3, \u03c0/6)",opt:"(1)"},
  {src:"SC Q40",type:"SC",tier:2,tax:"P18",q:"(2sin\u00b291\u00b0\u22121)(2sin\u00b292\u00b0\u22121)\u2026(2sin\u00b2180\u00b0\u22121) =",pat:"P18 \u00b7 a factor is zero",ans:"0",opt:"(1)",nudge:"Rewrite each factor 2sin\u00b2\u03b8\u22121 = \u2212cos2\u03b8; the factor at 135\u00b0 is exactly 0."},
  {src:"SC Q42",type:"SC",tier:2,tax:"P10",q:"cos(\u03c0/7) + cos(2\u03c0/7) + \u2026 + cos(6\u03c0/7) + cos(7\u03c0/7) =",pat:"P10 \u00b7 pairing symmetry",ans:"\u22121",opt:"(2)",nudge:"Pair cos(k\u03c0/7) with cos((7\u2212k)\u03c0/7) = \u2212cos(k\u03c0/7); they cancel, leaving only cos\u03c0."},
  {src:"SC Q43",type:"SC",tier:3,tax:"P7",q:"tan(\u03c0/3) + 2tan(2\u03c0/3) + 4tan(4\u03c0/3) + 8tan(8\u03c0/3) =",pat:"P7 \u00b7 Allied-Angle",ans:"\u22125\u221a3",opt:"(1)",nudge:"Reduce each big angle by the allied rule to \u00b1tan(\u03c0/3) = \u00b1\u221a3, then collect."},
  {src:"SC Q47",type:"SC",tier:2,tax:"P1",q:"sin\u00b2\u03b8 = (x\u00b2+y\u00b2)/(2xy), x,y \u2260 0 is possible if",pat:"P1 \u00b7 Trap & Bound",ans:"x = y",opt:"(1)",nudge:"sin\u00b2\u03b8 \u2264 1 forces x\u00b2+y\u00b2 \u2264 2xy, i.e. (x\u2212y)\u00b2 \u2264 0."},
  {src:"SC Q48",type:"SC",tier:2,tax:"P1",q:"If sin\u00b2\u03b8 = (x\u00b2+y\u00b2+1)/(2x), then x must be",pat:"P1 \u00b7 forces equality",ans:"1",opt:"(3)",nudge:"sin\u00b2\u03b8 \u2264 1 forces (x\u22121)\u00b2 + y\u00b2 \u2264 0 \u21d2 x=1, y=0."},
  {src:"SC Q49",type:"SC",tier:1,tax:"P5",q:"The least value of 2sin\u00b2\u03b8 + 3cos\u00b2\u03b8 is",pat:"Rewrite (2 + cos\u00b2\u03b8)",ans:"2",opt:"(2)"},
  {src:"SC Q50",type:"SC",tier:2,tax:"P18",q:"The greatest value of sin\u2074\u03b8 + cos\u2074\u03b8 is",pat:"P18 \u00b7 (1 \u2212 \u00bdsin\u00b22\u03b8)",ans:"1",opt:"(2)",nudge:"sin\u2074\u03b8 + cos\u2074\u03b8 = 1 \u2212 \u00bdsin\u00b22\u03b8; largest when sin2\u03b8 = 0."},
  {src:"SC Q51",type:"SC",tier:3,tax:"P3",q:"min(a\u00b7tan\u00b2x + b\u00b7cot\u00b2x) equals max(a\u00b7sin\u00b2\u03b8 + b\u00b7cos\u00b2\u03b8), a>b>0. Then a/b =",pat:"P3 \u00b7 AM\u2013GM both sides",ans:"4",opt:"(2)",nudge:"Min LHS = 2\u221a(ab) by AM\u2013GM; max of a sin\u00b2\u03b8 + b cos\u00b2\u03b8 = a (since a>b). Equate."},
  {src:"SC Q52",type:"SC",tier:3,tax:"P3",q:"Minimum of 256sin\u00b2x + 324cosec\u00b2x, x \u2208 \u211d",pat:"P3 \u00b7 AM\u2013GM boundary gate",ans:"580",opt:"(3)",note:"AM\u2013GM points at 576, but equality needs sin\u2074x>1 \u2014 so the true min is the boundary value 580. The classic trap.",nudge:"AM\u2013GM gives 576 but equality needs sin\u2074x>1 \u2014 impossible. Put t=sin\u00b2x\u2208(0,1] and check the endpoint t=1."},
  {src:"SC Q56",type:"SC",tier:3,tax:"P9",q:"cos\u00b2x \u2212 (c\u22121)cosx + 2c \u2265 6 for every x \u2208 \u211d. True set of c:",pat:"P9 \u00b7 quadratic-in-cos over [\u22121,1]",ans:"[4, \u221e)",opt:"(2)",nudge:"Let t=cosx\u2208[\u22121,1]; the quadratic must stay \u2265 0 across that interval \u2014 its minimum sits at an endpoint."},
  {src:"SC Q58",type:"SC",tier:2,tax:"P18",q:"Range of f(x) = sin\u2076x + cos\u2076x",pat:"P18 \u00b7 (1 \u2212 \u00besin\u00b22x)",ans:"[1/4, 1]",opt:"(1)",nudge:"sin\u2076x + cos\u2076x = 1 \u2212 \u00besin\u00b22x; bound sin\u00b22x \u2208 [0,1]."},
  /* Numerical Value */
  {src:"NV Q1",type:"NV",tier:1,tax:"P12",q:"The fundamental period of f(x) = sin(4\u03c0x/3) is",pat:"P12 \u00b7 period scaling T/|a|",ans:"1.5",opt:"= 2\u03c0 \u00f7 (4\u03c0/3)"},
  {src:"NV Q3",type:"NV",tier:2,tax:"P15",q:"If 0<x<\u03c0/4 and cosx + sinx = 5/4, then 8(cosx \u2212 sinx)\u00b2 is",pat:"P15 \u00b7 square the given",ans:"3.5",opt:"",nudge:"Use (cosx+sinx)\u00b2 + (cosx\u2212sinx)\u00b2 = 2."},
  {src:"NV Q6",type:"NV",tier:2,tax:"F1",q:"Sum of all x \u2208 [\u22123,10] for which sin\u00b2(\u03c0x)+cos\u00b2(\u03c0x) = sec\u00b2(\u03c0x)\u2212tan\u00b2(\u03c0x) does NOT hold",pat:"F1 \u00b7 undefined points",ans:"45.5",opt:"",nudge:"Both sides equal 1 wherever defined; it fails only where sec/tan are undefined (the half-integers)."},
  /* Integer */
  {src:"Int Q2",type:"Int",tier:2,tax:"P1",q:"Maximum value of sinx\u2081 \u2212 2cosx\u2082 + 3sinx\u2083 (independent angles)",pat:"Sum of independent bounds",ans:"6",opt:"= 1+2+3",nudge:"Maximise each term independently: sin=1, \u2212cos=+1, sin=1 \u2014 then weight and add."},
  /* Multiple Correct */
  {src:"MC Q1",type:"MC",tier:2,tax:"P4",q:"Which is NOT positive: (1) sin3 (2) cos6 (3) tan4 (4) sec2 ?",pat:"P4 \u00b7 quadrant signs",ans:"(4) sec2",opt:"(4)",note:"2 rad is in Q2, so cos2<0 \u21d2 sec2<0.",nudge:"Find the quadrant of each angle (2,3,4,6 rad); the sign of cos/sin there decides."},
  {src:"MC Q2",type:"MC",tier:1,tax:"P4",q:"For \u03b8 \u2208 (0, \u03c0/4): (1) cos\u03b8>sin\u03b8 (2) sin\u03b8>cos\u03b8 (3) tan\u03b8>cot\u03b8 (4) tan\u03b8<cot\u03b8",pat:"P4 \u00b7 interval signs",ans:"(1) and (4)",opt:"(1),(4)"},
  {src:"MC Q11",type:"MC",tier:3,tax:"P16",q:"Possible in \u25b3ABC: (1) cosA+cosB+cosC = 3/2 (2) cosA\u00b7cosB\u00b7cosC = 0 (3) sinA+sinB+sinC = \u221a2+1 (4) sinA\u00b7sinB\u00b7sinC = \u22123/8",pat:"P16 \u00b7 triangle bounds",ans:"(1), (2), (3)",opt:"(1),(2),(3)",note:"Product of three sines can't be negative \u21d2 (4) impossible.",nudge:"Each sine in a triangle is positive \u21d2 their product can't be negative; test the rest against equilateral bounds."},
  {src:"MC Q5",type:"MC",tier:3,tax:"P18",q:"If 81^{sin\u00b2\u03b8} + 81^{cos\u00b2\u03b8} = 30, then \u03b8 \u2208 (30\u00b0, 60\u00b0, 120\u00b0, 150\u00b0)?",pat:"P18 \u00b7 substitute & solve",ans:"all four",opt:"(1),(2),(3),(4)",note:"Let y=81^{sin\u00b2\u03b8}; y + 81/y = 30 \u21d2 y=3 or 27 \u21d2 sin\u00b2\u03b8 = 1/4 or 3/4.",nudge:"Let y = 81^{sin\u00b2\u03b8}; then 81^{cos\u00b2\u03b8} = 81/y, so y + 81/y = 30."},
  /* Linked Comprehension : f(x)=sin\u2076x+cos\u2076x+k(sin\u2074x+cos\u2074x) */
  {src:"LC Q9",type:"LC",tier:3,tax:"P18",q:"f(x)=sin\u2076x+cos\u2076x+k(sin\u2074x+cos\u2074x). Value of k making f constant for all x:",pat:"P18 \u00b7 kill the variable term",ans:"\u22123/2",opt:"(4)",note:"f = (1+k) \u2212 (3+2k)p with p=sin\u00b2x cos\u00b2x; constant \u21d2 3+2k=0.",nudge:"Write f = (1+k) \u2212 (3+2k)\u00b7sin\u00b2x cos\u00b2x; constant \u21d2 the coefficient on sin\u00b2x cos\u00b2x vanishes."},
  {src:"LC Q10",type:"LC",tier:3,tax:"P18",q:"Same f. All k for which f(x)=0 has a solution lie in:",pat:"P18 + range of p\u2208[0,\u00bc]",ans:"[\u22121, \u22121/2]",opt:"(3)",nudge:"f=0 needs sin\u00b2x cos\u00b2x = (1+k)/(3+2k), which must land in [0, \u00bc]."},
  {src:"LC Q11",type:"LC",tier:3,tax:"P18",q:"Same f. Number of k for which f(x)=0 is an identity:",pat:"P18 \u00b7 both coeffs zero",ans:"0",opt:"(1)",note:"1+k=0 and 3+2k=0 can't both hold.",nudge:"An identity needs both coefficients zero at once \u2014 check if 1+k=0 and 3+2k=0 can coexist."},
  /* Matrix Match */
  {src:"MM Q3",type:"MM",tier:3,tax:"P5",q:"Match to ranges: sin\u00b2\u03b8+cos\u2074\u03b8, 3sin\u00b2\u03b8+sin\u2074\u03b8, sin\u00b2\u03b8\u2212cos\u2074\u03b8, tan\u00b2\u03b8+2cot\u00b2\u03b8 \u2192 {[\u22121,1],[0,2],[2\u221a2,\u221e),[\u00be,1]}",pat:"P5/P18 \u00b7 range each",ans:"key option (2)",opt:"(2)",note:"A range-finding cluster \u2014 do each with complete-the-square / AM\u2013GM, then match.",nudge:"Find each range with complete-the-square or AM\u2013GM, then match to the lists."},
  /* Archives */
  {src:"Arch SC (IIT-JEE 2011)",type:"Arch",tier:3,tax:"P15",q:"P = {\u03b8: sin\u03b8\u2212cos\u03b8 = \u221a2 cos\u03b8}, Q = {\u03b8: sin\u03b8+cos\u03b8 = \u221a2 sin\u03b8}. Then:",pat:"Identity \u2192 tan\u03b8 = \u221a2+1",ans:"P = Q",opt:"(4)",note:"Both reduce to tan\u03b8 = \u221a2 + 1.",nudge:"Reduce each set's condition to a single value of tan\u03b8."},
  {src:"Arch MC (IIT-JEE)",type:"Arch",tier:3,tax:"P18",q:"If sin\u2074x/2 + cos\u2074x/3 = 1/5, then which hold? (1) tan\u00b2x = 2/3 (2) sin\u2078x/8 + cos\u2078x/27 = 1/125",pat:"P18 \u00b7 Cauchy/identity",ans:"(1) and (2)",opt:"(1),(2)",note:"A famous equality-case identity \u2014 the minimum of the weighted sum forces tan\u00b2x = 2/3.",nudge:"Equality in the weighted sum (Cauchy/AM\u2013GM) forces sin\u00b2x : cos\u00b2x = 2 : 3."}
];
const PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Foundation"},{k:"2",l:"JEE Main"},{k:"3",l:"JEE Advanced"},{k:"Flag",l:"\u2605 Flagged"}];

/* ===== CURRICULUM TREE  (Subjects > Subsections > Chapters) ===== */
const CURRICULUM=[
  {id:"maths",name:"Mathematics",sym:"\u2211",subs:[
    {id:"trig",name:"Trigonometry",chapters:[
      {id:"fg",name:"Functions & Graphs",grade:11},
      {id:"cma",name:"Compound & Multiple Angles",grade:11},
      {id:"teq",name:"Trigonometric Equations",grade:11},
      {id:"inv",name:"Inverse Trigonometric Functions",grade:12},
      {id:"pot",name:"Properties of Triangles",grade:11}]},
    {id:"alg",name:"Algebra",chapters:[
      {id:"quad",name:"Quadratic Equations",grade:11},{id:"cn",name:"Complex Numbers",grade:11},
      {id:"pnc",name:"Permutations & Combinations",grade:11},{id:"bin",name:"Binomial Theorem",grade:11},
      {id:"seq",name:"Sequences & Series",grade:11}]},
    {id:"calc",name:"Calculus",chapters:[
      {id:"lim",name:"Limits & Continuity",grade:12},{id:"diff",name:"Differentiation",grade:12},
      {id:"aod",name:"Applications of Derivatives",grade:12},{id:"intg",name:"Integration",grade:12},
      {id:"de",name:"Differential Equations",grade:12}]},
    {id:"cg",name:"Coordinate Geometry",chapters:[
      {id:"line",name:"Straight Lines",grade:11},{id:"circ",name:"Circles",grade:11},{id:"conic",name:"Conic Sections",grade:11}]},
    {id:"v3d",name:"Vectors & 3D",chapters:[{id:"vec",name:"Vectors",grade:12},{id:"g3d",name:"3D Geometry",grade:12}]},
    {id:"prob",name:"Probability",chapters:[{id:"prob",name:"Probability",grade:12}]}]},
  {id:"phys",name:"Physics",sym:"\u269b",subs:[
    {id:"mech",name:"Mechanics",chapters:[
      {id:"kin",name:"Kinematics",grade:11},{id:"nlm",name:"Laws of Motion",grade:11},
      {id:"wpe",name:"Work, Power & Energy",grade:11},{id:"rot",name:"Rotational Motion",grade:11},
      {id:"grav",name:"Gravitation",grade:11},{id:"shm",name:"SHM & Waves",grade:11}]},
    {id:"heat",name:"Heat & Thermodynamics",chapters:[{id:"thermo",name:"Thermodynamics & Kinetic Theory",grade:11}]},
    {id:"em",name:"Electricity & Magnetism",chapters:[
      {id:"es",name:"Electrostatics",grade:12},{id:"cur",name:"Current Electricity",grade:12},
      {id:"mag",name:"Magnetism & EMI",grade:12},{id:"ac",name:"Alternating Current",grade:12}]},
    {id:"opt",name:"Optics",chapters:[{id:"ray",name:"Ray Optics",grade:12},{id:"wav",name:"Wave Optics",grade:12}]},
    {id:"mod",name:"Modern Physics",chapters:[{id:"mp",name:"Atoms, Nuclei & Dual Nature",grade:12},{id:"semi",name:"Semiconductor Devices",grade:12}]}]}
];
/* A chapter is "ready" iff its path appears here. Add a chapter by dropping its data in. */
const CONTENT={
  "maths/trig/fg":{key:"trigfg",taxa:TAXA,formulae:FORMULAE,patterns:PATTERNS,guided:GUIDED,practice:PRACTICE}
};
function chapPath(a,b,c){return a+"/"+b+"/"+c;}
function findChapter(path){
  const p=path.split("/"),subj=CURRICULUM.find(x=>x.id===p[0]),sub=subj.subs.find(x=>x.id===p[1]),chap=sub.chapters.find(x=>x.id===p[2]);
  const siblings=sub.chapters.map(c=>{const pp=chapPath(p[0],p[1],c.id);return{name:c.name,path:pp,status:CONTENT[pp]?"ready":"soon"};});
  return{subjName:subj.name,subName:sub.name,chap,siblings};
}
function readyCount(subj){let n=0;subj.subs.forEach(sb=>sb.chapters.forEach(c=>{if(CONTENT[chapPath(subj.id,sb.id,c.id)])n++;}));return n;}
function subReady(su,sb){return sb.chapters.filter(c=>CONTENT[chapPath(su,sb.id,c.id)]).length;}

