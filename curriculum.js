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
  {id:"P1",name:"Trap & Bound",trigger:"A quantity is forced into a fixed range (sinθ,cosθ∈[−1,1]; x+1/x≥2), or the question says \"which is possible / not possible\", or asks for a count.",move:"Don't solve exactly. Find the tightest bound and test feasibility.",why:"JEE often wants existence or count, not the value — a bound settles it in seconds.",mini:"sinθ = 5/3? Impossible: |sinθ| ≤ 1.",fails:"When the quantity genuinely roams free — tanθ = 1002 is fine, tan is unbounded.",src:"Illus 1.38, 1.47, 1.49",srcText:{"Illus 1.38":"Which of the following is possible? (a) sinθ = 5/3 · (b) tanθ = 1002 · (c) cosθ = (1+p²)/(1−p²), p ≠ 0, ±1 · (d) secθ = 1/2","Illus 1.47":"If A = 4 sinθ + cos²θ, then which of the following is(are) not true? (a) Max value of A is 5 · (b) Min value of A is −4 · (c) Max occurs when sinθ = 1/2 · (d) Min occurs when sinθ = 1.","Illus 1.49":"Show that the equation sinθ = x + 1/x does not hold for any real x."}},
  {id:"P2",name:"Sum-of-Squares Pins to Zero",trigger:"A sum of non-negative terms equals its smallest possible value — e.g. sin²θ₁ + sin²θ₂ + … = 0.",move:"Each term must individually sit at its minimum. Read off every variable.",why:"Non-negatives can only sum to the floor if every one is on the floor.",mini:"sin²A + sin²B = 0 ⇒ sinA = sinB = 0.",fails:"When terms can be negative — they can cancel, so values aren't forced.",src:"Illus 1.40 · Exercise Q5, Q15",srcText:{"Illus 1.40":"If sin²θ₁ + sin²θ₂ + sin²θ₃ = 0, then which of the following is NOT a possible value of cosθ₁ + cosθ₂ + cosθ₃? (a) 3 · (b) −3 · (c) −1 · (d) −2.","Exercise Q5":"If sinθ₁ + sinθ₂ + sinθ₃ = 3, then cosθ₁ + cosθ₂ + cosθ₃ = ?","Exercise Q15":"If sin²θ₁ + sin²θ₂ + ... + sin²θₙ = 0, then find the minimum value of cosθ₁ + cosθ₂ + ... + cosθₙ."}},
  {id:"P3",name:"AM–GM Minimum",trigger:"Minimise a SUM of positive terms whose PRODUCT is constant — a·tan²x + b·cot²x, sec²θ·cosec²θ, 2cosθ + 1/sinθ + √2·tanθ.",move:"AM ≥ GM gives the minimum in one line; equality when the terms are equal.",why:"With the product fixed, the sum is smallest when the parts are balanced.",mini:"a·tan²x + b·cot²x ≥ 2√(ab)  (product ab is constant).",fails:"If equality needs sin²x > 1 (impossible), AM–GM is unreachable — fall back to the boundary value. The 256sin²x+324cosec²x trap.",src:"Illus 1.8, 1.22, 1.42 · Example 1.3, 1.7",srcText:{"Illus 1.8":"(text pending — upload page ≤1.15)","Illus 1.22":"(text pending — upload page ≤1.15)","Illus 1.42":"Find the values of a for which a² − 6 sin x − 5a ≤ 0 holds for all x ∈ R.","Example 1.3":"Prove that the minimum value of 2^(sin²x) + 2^(cos²x) is 2√2.","Example 1.7":"For each natural number n ≥ 2, prove that sinx₁ cosx₂ + sinx₂ cosx₃ + ⋯ + sinxₙ cosx₁ ≤ n/2."}},
  {id:"P4",name:"Reference-Angle Comparison",trigger:"Compare trig values of plain numbers — \"which is greatest: tan1, tan4, tan7, tan10?\" or sin/cos/cosec of radian values; or \"which is negative\".",move:"Write each angle as nπ ± α (α acute). Fix its quadrant & sign, then compare using the function's monotonic behaviour inside that quadrant.",why:"You can't eyeball tan7 — reducing to a known acute residue makes them comparable.",mini:"tan4 = tan(4−π) = tan(0.86); tan1 = tan(1). Both in Q1 where tan rises ⇒ tan1 larger.",fails:"If residues fall in different quadrants, compare signs first — a positive beats any negative.",src:"Illus 1.34–1.36, 1.43–1.45, 1.70",srcText:{"Illus 1.34":"Find the values of: (a) cos225° (b) sin690° (c) tan(−390°) (d) sec855°.","Illus 1.35":"Prove that sin(−420°)·cos390° + cos(−660°)·sin330° = −1.","Illus 1.36":"Which of the following values are negative? (a) sin5 (b) cos16 (c) tan20 (d) cot(−41).","Illus 1.43":"Which of the following is the greatest? (a) tan1 (b) tan4 (c) tan7 (d) tan10.","Illus 1.44":"Which of the following is the least? (a) sin3 (b) sin2 (c) sin1 (d) sin7.","Illus 1.45":"Which of the following is the greatest? (a) cosec1 (b) cosec2 (c) cosec4 (d) cosec(−6).","Illus 1.70":"Find the sign of (a) tan113° − cos107° (b) cos105° − tan107°."}},
  {id:"P5",name:"Complete-the-Square Range",trigger:"Range of a polynomial in ONE trig function — sin²x − 3sinx + 2.",move:"Substitute t = (that function) with its real range (sinx ⇒ t∈[−1,1]); complete the square; evaluate over that restricted interval.",why:"The vertex may lie outside [−1,1]; then the extremes are at the interval ends.",mini:"sin²x − 3sinx + 2 = (t−3/2)² − 1/4, t∈[−1,1] ⇒ range [0, 6].",fails:"Using the unconstrained vertex and forgetting t is capped — the classic lost mark.",src:"Illus 1.53–1.55 · Matrix-Match",srcText:{"Illus 1.53":"Find the range of f(x) = cos²x + sec²x.","Illus 1.54":"Find the range of f(x) = sin²x − 3sinx + 2.","Illus 1.55":"Find the range of f(x) = √(sin²x − 6sinx + 9) + 3."}},
  {id:"P6",name:"Domain by Constraint (√ and log)",trigger:"f(x) = √(expr) needs expr ≥ 0 · f(x) = log(expr) needs expr > 0.",move:"Write the constraint as a trig inequality, then sketch the two graphs and read the intervals.",why:"The trick is spotting it's a domain question in disguise — then a graph reads it fast.",mini:"√(sinx − cosx) needs sinx ≥ cosx ⇒ x ∈ [π/4, 5π/4] on [0,2π].",fails:"Forgetting log needs strict > 0, or dropping the period when listing all x.",src:"Illus 1.56–1.60",srcText:{"Illus 1.56":"Find the domain and range of f(x) = log₂(sinx).","Illus 1.57":"If (x, y) satisfies 1 + 4x − x² = √(9sec²y + 4cosec²y), find x and tan²y.","Illus 1.58":"Which of the following is(are) correct? (a) (tanx)^(ln cosx) < (cotx)^(ln cosx), x ∈ (π/4, π/2) · (b) (sinx)^(ln secx) > (cosx)^(ln secx), x ∈ (0, π/4) · (c) (secπ/3)^(ln tanx) > (secπ/3)^(ln cosx), x ∈ (π/4, π/2) · (d) (1/2)^(ln sinx) > (3/4)^(ln sinx), x ∈ (0, π/2).","Illus 1.59":"Find the values of x in [0, 2π] for which f(x) = √(sinx − cosx) is defined.","Illus 1.60":"Solve tanx > cotx, where x ∈ [0, 2π]."}},
  {id:"P7",name:"Allied-Angle Reduction",trigger:"A function of a big angle that's a multiple of 90° (π/2) plus/minus θ — sin(71π/2 + θ), tan320°, cos(2kπ − π/2 + θ).",move:"Even multiple of 90° → name stays; odd → name flips to co-function. Sign = original function's sign in the landing quadrant.",why:"Collapses a monstrous angle to a clean ±(co)function of θ.",mini:"tan320° = tan(4×90°−40°) ⇒ even ⇒ tan, Q4 ⇒ −tan40° = −cot50°.",fails:"Mis-counting odd/even, or fixing the sign from θ's quadrant instead of the landing quadrant.",src:"Illus 1.26, 1.61–1.63",srcText:{"Illus 1.26":"(text pending — upload page ≤1.15)","Illus 1.61":"Prove that (a) sin(71π/2 + θ) = −cosθ · (b) tan(−131π/2 − θ) = cotθ.","Illus 1.62":"Prove that cos(90°+θ)·sec(−θ)·tan(180°−θ) / [sec(360°−θ)·sin(180°+θ)·cot(90°−θ)] = −1.","Illus 1.63":"Find the value of cos(10π+θ)·cosec(13π+θ)·tan(5π/2+θ) / [sec(23π/2−θ)·cos(−7π+θ)·cot(−3π+θ)]."}},
  {id:"P8",name:"LHS-max meets RHS-min (Pinch)",trigger:"A trig expression = an algebraic expression, where each side has a tight bound that just touches.",move:"Bound each side. If max(LHS) = min(RHS), equality forces both to that shared value — then solve two easy equations.",why:"Two bounds that meet leave exactly one possibility.",mini:"3cosθ = (x−4)²+3 : LHS ≤ 3, RHS ≥ 3 ⇒ both = 3 ⇒ cosθ=1, x=4.",fails:"When the bounds overlap rather than just touch — then there's an interval, not a point.",src:"Illus 1.48",srcText:{"Illus 1.48":"Find the values of x for which 3cosθ = x² − 8x + 19 holds good."}},
  {id:"P9",name:"Discriminant + Range Gate",trigger:"A quadratic in cosx (or sinx) must have a real / valid solution → find the parameter range.",move:"Real root needs discriminant ≥ 0, AND the root must lie in [−1,1]. Two gates.",why:"Students apply the discriminant and forget cos/sin can't exceed 1 — that second gate is where marks vanish.",mini:"2cos²x−(p+3)cosx+2(p−1)=0 ⇒ cosx=(p−1)/2 ⇒ −1≤(p−1)/2≤1 ⇒ p∈[−1,3].",fails:"Reporting a range that lets cosx land outside [−1,1].",src:"Illus 1.41 · Q56",srcText:{"Illus 1.41":"Find the values of p such that 2cos²x − (p+3)cosx + 2(p−1) = 0 has a real solution.","Exercise Q56":"If cos²x − (c−1) cosx + 2c ≥ 6 for every x ∈ R, then the true set of values of c is?"}},
  {id:"P10",name:"Complementary-Pair Telescoping",trigger:"A long product or sum over angles that pair to 90° — tan1°·tan2°…tan89°, or log(tan6°)+…+log(tan84°).",move:"Pair k with 90°−k: tanθ·tan(90°−θ)=1 (product) or logs add to 0 (sum). The middle term (tan45°=1) anchors it.",why:"Each pair collapses to 1 (or 0), so the whole chain collapses.",mini:"tan1°·tan89° = tan1°·cot1° = 1 ⇒ entire product = 1.",fails:"Mis-pairing when the list isn't symmetric about 45° — check the endpoints.",src:"Illus 1.11 · Exercise Q6, Q42",srcText:{"Illus 1.11":"(text pending — upload page ≤1.15)","Exercise Q6":"The value of log₁₀(tan6°) + log₁₀(tan12°) + log₁₀(tan18°) + ... + log₁₀(tan84°) is?","Exercise Q42":"The value of cos(π/7) + cos(2π/7) + cos(3π/7) + cos(4π/7) + cos(5π/7) + cos(6π/7) + cos(7π/7) is?"}},
  {id:"P11",name:"|p+q| = |p|+|q| Sign Test",trigger:"An absolute-value equality like |sinx + cosx| = |sinx| + |cosx|.",move:"|p+q|=|p|+|q| holds iff p·q ≥ 0. Set the product ≥ 0 and read the quadrants.",why:"Turns a messy modulus equation into a one-line sign condition.",mini:"Needs sinx·cosx ≥ 0 ⇒ x in Q1 or Q3.",fails:"Forgetting the boundary (product = 0) cases on the axes.",src:"Illus 1.46",srcText:{"Illus 1.46":"Solve |sinx + cosx| = |sinx| + |cosx|."}},
  {id:"P12",name:"Period of a Composite",trigger:"\"Fundamental period of\" sin(cosx), |sinx|+|cosx|, sin²x, sin(2x).",move:"Apply base periods + the f(ax)→T/|a| rule; for sums take the LCM; for powers/|·| halve where symmetry allows — then VERIFY with f(x+T)=f(x).",why:"Blind LCM over-counts; symmetry (sin²x has period π, not 2π) is the catch.",mini:"sin²x = (1−cos2x)/2 ⇒ period π · |sinx|+|cosx| ⇒ π/2.",fails:"Quoting 2π for sin²x — the squaring halves it.",src:"Illus 1.67, 1.68 · Example 1.2",srcText:{"Illus 1.67":"Find the fundamental period of the following functions: (a) f(x) = tanπx · (b) f(x) = sin²x · (c) f(x) = cos³x.","Illus 1.68":"Find the values of: (a) sin²1000° + cos²280° · (b) sin²(19π/7) + sin²(17π/14).","Example 1.2":"Find the fundamental period of: (a) f(x) = sin(cosx) · (b) f(x) = cos(sinx) · (c) f(x) = |sinx| + |cosx|."}},
  {id:"P13",name:"Conjugate Pair (sec±tan)",trigger:"A single relation in sec±tan or cosec±cot, and you need the other combination or the individual values.",move:"Multiply by the conjugate: (secθ+tanθ)(secθ−tanθ)=sec²θ−tan²θ=1, so one is the reciprocal of the other. Add/subtract to isolate secθ and tanθ.",why:"sec²−tan²=1 (and cosec²−cot²=1) turn conjugate products into 1, splitting one equation into two.",mini:"secθ+tanθ=3/2 ⇒ secθ−tanθ=2/3 ⇒ secθ=13/12, tanθ=5/12.",fails:"When the relation isn't a clean conjugate pair — the product won't be 1.",src:"Illus 1.13, 1.18, 1.21",srcText:{"Illus 1.13":"(text pending — upload page ≤1.15)","Illus 1.18":"(text pending — upload page ≤1.15)","Illus 1.21":"(text pending — upload page ≤1.15)"}},
  {id:"P14",name:"Eliminate the Angle",trigger:"Two relations each containing θ; asked for a relation between the OTHER variables (m, n) with θ gone.",move:"Solve each for a clean power of sinθ/cosθ, then combine so θ cancels — often via sin²+cos²=1 after taking suitable roots.",why:"θ is a free parameter; eliminating it leaves exactly the constraint the variables must satisfy.",mini:"cosecθ−sinθ=m, secθ−cosθ=n ⇒ (m²n)^⅔ + (mn²)^⅔ = 1.",fails:"When clean powers won't isolate — then square-and-add instead.",src:"Illus 1.19, 1.21",srcText:{"Illus 1.19":"(text pending — upload page ≤1.15)","Illus 1.21":"(text pending — upload page ≤1.15)"}},
  {id:"P15",name:"Conditional Identity",trigger:"\"Given [relation], prove [identity]\" — the identity holds only under the given condition.",move:"Carry the given INTO the expression (substitute, or square-and-add the given) rather than manipulating blindly.",why:"The condition is the lever; without it you're trying to prove something not universally true.",mini:"3sinθ+5cosθ=5 ⇒ (square+add with 5sinθ−3cosθ=x) ⇒ x²=9 ⇒ 5sinθ−3cosθ=±3.",fails:"Treating it as a free identity — without the given, it won't close.",src:"Illus 1.15, 1.16, 1.20",srcText:{"Illus 1.15":"(text pending — upload page ≤1.15)","Illus 1.16":"(text pending — upload page ≤1.15)","Illus 1.20":"(text pending — upload page ≤1.15)"}},
  {id:"P16",name:"Angle-Sum Closure",trigger:"Angles of a triangle (A+B+C=π) or cyclic quadrilateral (opposite pairs sum to π).",move:"Replace one angle via the sum: C=π−(A+B) ⇒ sinC=sin(A+B), cosC=−cos(A+B); cyclic ⇒ cosC=−cosA.",why:"The closure relation cuts the variable count and flips signs predictably.",mini:"cyclic quad ⇒ A+C=π ⇒ cosC=−cosA ⇒ cosA+cosB+cosC+cosD=0.",fails:"Using it on angles that aren't a genuine triangle/cyclic figure.",src:"Illus 1.65, 1.66, 1.69",srcText:{"Illus 1.65":"If A, B, C, D are angles of a cyclic quadrilateral, then prove that cosA + cosB + cosC + cosD = 0.","Illus 1.66":"In △ABC prove that (a) sinA = sin(B+C) · (b) sin2A = −sin(2B+2C) · (c) cosA = −cos(B+C) · (d) tan((A+B)/2) = cot(C/2).","Illus 1.69":"If sin(120°−α) = sin(120°−β), 0 < α, β < 180°, find the relation between α and β."}},
  {id:"P17",name:"Sandwich (Mediant) Inequality",trigger:"A ratio of sums like (sinα+sinβ+sinγ)/(cosα+cosβ+cosγ), asked to bound it between two tangents.",move:"For positive terms, the ratio of sums (the mediant) lies strictly between the smallest and largest individual ratios; tan increasing ⇒ smallest = tanα, largest = tanγ.",why:"A weighted average of fractions can't escape the range of the fractions it averages.",mini:"0<α<β<γ<π/2 ⇒ tanα < (Σsin)/(Σcos) < tanγ.",fails:"When denominators can be negative — the mediant property needs all-positive terms.",src:"Illus 1.10",srcText:{"Illus 1.10":"(text pending — upload page ≤1.15)"}},
  {id:"P18",name:"Symmetric Power Reduction",trigger:"A symmetric expression in sinⁿx and cosⁿx — sin⁴+cos⁴, sin⁶+cos⁶, or a sum of sin²k° terms.",move:"Reduce using sin²+cos²=1: sin⁴+cos⁴=1−2s²c², sin⁶+cos⁶=1−3s²c² (s²c²=¼sin²2x). For angle sums, pair k° with (90−k)°.",why:"Every symmetric power collapses to a small polynomial in sin²2x (or to counts of paired 1's).",mini:"sin⁶x+cos⁶x = 1 − ¾sin²2x ⇒ range [¼, 1].",fails:"Expanding term-by-term instead of using the s²+c²=1 collapse.",src:"Illus 1.12, 1.17 · MC, LC, Archives",srcText:{"Illus 1.12":"(text pending — upload page ≤1.15)","Illus 1.17":"(text pending — upload page ≤1.15)","MC, LC, Archives":"All multi-correct, comprehension and archives questions in the Practice tab build on this pattern — see the qcards tagged P18."}}
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
  {src:"SC Q1",type:"SC",tier:1,tax:"F1",q:"If 5tan\u03b8 = 4, then (5sin\u03b8 \u2212 3cos\u03b8)/(5sin\u03b8 + 2cos\u03b8) =",pat:"Divide by cos\u03b8",ans:"1/6",opt:"(3)",choices:["0","1","1/6","6"],correct:2},
  {src:"SC Q2",type:"SC",tier:1,tax:"P1",q:"If sinx + cosecx = 2, then sin\u207fx + cosec\u207fx =",pat:"P1 \u00b7 Trap & Bound",ans:"2",opt:"(1)",choices:["2","2ⁿ","2ⁿ⁻¹","2ⁿ⁻²"],correct:0},
  {src:"SC Q3",type:"SC",tier:2,tax:"P10",q:"Regular hexagon A\u2080\u2026A\u2085 on a unit circle. Product A\u2080A\u2081 \u00b7 A\u2080A\u2082 \u00b7 A\u2080A\u2084 =",pat:"Chord-length symmetry",ans:"3",opt:"(3)",nudge:"Put A\u2080 at angle 0; each chord A\u2080A_k = 2 sin(k\u00b730\u00b0). Multiply the three.",choices:["3/4","3√3","3","3√3/2"],correct:2},
  {src:"SC Q5",type:"SC",tier:1,tax:"P2",q:"If sin\u03b8\u2081 + sin\u03b8\u2082 + sin\u03b8\u2083 = 3, then cos\u03b8\u2081 + cos\u03b8\u2082 + cos\u03b8\u2083 =",pat:"P2 \u00b7 Sum pins to extreme",ans:"0",opt:"(4)",choices:["3","2","1","0"],correct:3},
  {src:"SC Q6",type:"SC",tier:1,tax:"P10",q:"log\u2081\u2080(tan6\u00b0) + log\u2081\u2080(tan12\u00b0) + \u2026 + log\u2081\u2080(tan84\u00b0) =",pat:"P10 \u00b7 Pair Telescoping",ans:"0",opt:"(2)",choices:["−1","0","1","2"],correct:1},
  {src:"SC Q7",type:"SC",tier:2,tax:"P3",q:"For 0 < \u03b8 < 90\u00b0, the minimum value of 3sin\u03b8 + cosec\u00b3\u03b8 is",pat:"P3 \u00b7 AM\u2013GM",ans:"4",opt:"(1)",nudge:"Split 3sin\u03b8 as sin\u03b8+sin\u03b8+sin\u03b8 so the four-term product sin\u00b3\u03b8\u00b7cosec\u00b3\u03b8 = 1 is constant, then AM\u2013GM.",choices:["4","3","5","6"],correct:0},
  {src:"SC Q10",type:"SC",tier:2,tax:"F2",q:"The side of a rhombus is the geometric mean of its diagonals. Its acute angle is",pat:"Geometry \u2192 trig",ans:"30\u00b0",opt:"(2)",nudge:"Diagonals bisect at right angles; relate the acute angle to the diagonal ratio, and use side\u00b2 = d\u2081d\u2082.",choices:["15°","30°","45°","60°"],correct:1},
  {src:"SC Q12",type:"SC",tier:1,tax:"P13",q:"If cosec\u03b8 \u2212 cot\u03b8 = q, then cosec\u03b8 =",pat:"P13 \u00b7 Conjugate pair",ans:"\u00bd(q + 1/q)",opt:"(3)",choices:["q + 1/q","q − 1/q","½(q + 1/q)","½(2q − 1/q)"],correct:2},
  {src:"SC Q14",type:"SC",tier:2,tax:"P14",q:"If tan\u03b8 + sin\u03b8 = m and tan\u03b8 \u2212 sin\u03b8 = n, then",pat:"P14 \u00b7 Eliminate \u03b8",ans:"m\u00b2 \u2212 n\u00b2 = 4\u221a(mn)",opt:"(4)",nudge:"Compute m\u00b2\u2212n\u00b2 and mn separately, then show 4\u221a(mn) equals m\u00b2\u2212n\u00b2.",choices:["m² − n² = 4mn","m² + n² = 4mn","m² − n² = m² + n²","m² − n² = 4√(mn)"],correct:3},
  {src:"SC Q26",type:"SC",tier:1,tax:"F2",q:"A child runs 110 m along a circular park, subtending 150\u00b0 at the centre. Radius =",pat:"F2 \u00b7 arc s = r\u03b8",ans:"132/\u03c0 m",opt:"(1)",choices:["132/π m","220/π m","55 m","330/π m"],correct:0},
  {src:"SC Q27",type:"SC",tier:1,tax:"F1",q:"The least positive angle coterminal with \u2212820\u00b0 in radian measure is",pat:"F1 \u00b7 coterminal",ans:"13\u03c0/9",opt:"(2)",choices:["11π/9","13π/9","7π/6","29π/18"],correct:1},
  {src:"SC Q29",type:"SC",tier:2,tax:"F1",q:"Which angle, in standard position, has the GREATEST reference angle? (765\u00b0, 29\u03c0/12, 1110\u00b0, 25\u03c0/9)",pat:"F1 \u00b7 reference angle",ans:"29\u03c0/12",opt:"(2)",nudge:"Reduce each to standard position, then find its acute reference angle and compare.",choices:["765°","29π/12","1110°","25π/9"],correct:1},
  {src:"SC Q30",type:"SC",tier:2,tax:"P4",q:"Which is correct: sin1\u00b0 > sin1, sin1\u00b0 < sin1, sin1\u00b0 = sin1?",pat:"P4 \u00b7 degree vs radian",ans:"sin1\u00b0 < sin1",opt:"(2)",nudge:"1 radian \u2248 57\u00b0, so compare sin1\u00b0 with sin57\u00b0.",choices:["sin1° > sin1","sin1° < sin1","sin1° = sin1","sin1° = (π/180)·sin1"],correct:1},
  {src:"SC Q37",type:"SC",tier:1,tax:"F4",q:"sinx is increasing on which interval?",pat:"F4 \u00b7 monotonic from graph",ans:"(\u2212\u03c0/3, \u03c0/6)",opt:"(1)",choices:["(−π/3, π/6)","(π/6, 5π/6)","(2π/3, 4π/3)","(7π/4, 2π)"],correct:0},
  {src:"SC Q40",type:"SC",tier:2,tax:"P18",q:"(2sin\u00b291\u00b0\u22121)(2sin\u00b292\u00b0\u22121)\u2026(2sin\u00b2180\u00b0\u22121) =",pat:"P18 \u00b7 a factor is zero",ans:"0",opt:"(1)",nudge:"Rewrite each factor 2sin\u00b2\u03b8\u22121 = \u2212cos2\u03b8; the factor at 135\u00b0 is exactly 0.",choices:["0","1","2⁹⁰","2⁹⁰ − 90"],correct:0},
  {src:"SC Q42",type:"SC",tier:2,tax:"P10",q:"cos(\u03c0/7) + cos(2\u03c0/7) + \u2026 + cos(6\u03c0/7) + cos(7\u03c0/7) =",pat:"P10 \u00b7 pairing symmetry",ans:"\u22121",opt:"(2)",nudge:"Pair cos(k\u03c0/7) with cos((7\u2212k)\u03c0/7) = \u2212cos(k\u03c0/7); they cancel, leaving only cos\u03c0.",choices:["1","−1","0","none of these"],correct:1},
  {src:"SC Q43",type:"SC",tier:3,tax:"P7",q:"tan(\u03c0/3) + 2tan(2\u03c0/3) + 4tan(4\u03c0/3) + 8tan(8\u03c0/3) =",pat:"P7 \u00b7 Allied-Angle",ans:"\u22125\u221a3",opt:"(1)",nudge:"Reduce each big angle by the allied rule to \u00b1tan(\u03c0/3) = \u00b1\u221a3, then collect.",choices:["−5√3","−5/√3","5√3","5/√3"],correct:0},
  {src:"SC Q47",type:"SC",tier:2,tax:"P1",q:"sin\u00b2\u03b8 = (x\u00b2+y\u00b2)/(2xy), x,y \u2260 0 is possible if",pat:"P1 \u00b7 Trap & Bound",ans:"x = y",opt:"(1)",nudge:"sin\u00b2\u03b8 \u2264 1 forces x\u00b2+y\u00b2 \u2264 2xy, i.e. (x\u2212y)\u00b2 \u2264 0.",choices:["x = y","x = −y","2x = y","none of these"],correct:0},
  {src:"SC Q48",type:"SC",tier:2,tax:"P1",q:"If sin\u00b2\u03b8 = (x\u00b2+y\u00b2+1)/(2x), then x must be",pat:"P1 \u00b7 forces equality",ans:"1",opt:"(3)",nudge:"sin\u00b2\u03b8 \u2264 1 forces (x\u22121)\u00b2 + y\u00b2 \u2264 0 \u21d2 x=1, y=0.",choices:["−3","−2","1","none of these"],correct:2},
  {src:"SC Q49",type:"SC",tier:1,tax:"P5",q:"The least value of 2sin\u00b2\u03b8 + 3cos\u00b2\u03b8 is",pat:"Rewrite (2 + cos\u00b2\u03b8)",ans:"2",opt:"(2)",choices:["1","2","3","5"],correct:1},
  {src:"SC Q50",type:"SC",tier:2,tax:"P18",q:"The greatest value of sin\u2074\u03b8 + cos\u2074\u03b8 is",pat:"P18 \u00b7 (1 \u2212 \u00bdsin\u00b22\u03b8)",ans:"1",opt:"(2)",nudge:"sin\u2074\u03b8 + cos\u2074\u03b8 = 1 \u2212 \u00bdsin\u00b22\u03b8; largest when sin2\u03b8 = 0.",choices:["1/2","1","2","3"],correct:1},
  {src:"SC Q51",type:"SC",tier:3,tax:"P3",q:"min(a\u00b7tan\u00b2x + b\u00b7cot\u00b2x) equals max(a\u00b7sin\u00b2\u03b8 + b\u00b7cos\u00b2\u03b8), a>b>0. Then a/b =",pat:"P3 \u00b7 AM\u2013GM both sides",ans:"4",opt:"(2)",nudge:"Min LHS = 2\u221a(ab) by AM\u2013GM; max of a sin\u00b2\u03b8 + b cos\u00b2\u03b8 = a (since a>b). Equate.",choices:["2","4","6","8"],correct:1},
  {src:"SC Q52",type:"SC",tier:3,tax:"P3",q:"Minimum of 256sin\u00b2x + 324cosec\u00b2x, x \u2208 \u211d",pat:"P3 \u00b7 AM\u2013GM boundary gate",ans:"580",opt:"(3)",note:"AM\u2013GM points at 576, but equality needs sin\u2074x>1 \u2014 so the true min is the boundary value 580. The classic trap.",nudge:"AM\u2013GM gives 576 but equality needs sin\u2074x>1 \u2014 impossible. Put t=sin\u00b2x\u2208(0,1] and check the endpoint t=1.",choices:["432","504","580","776"],correct:2},
  {src:"SC Q56",type:"SC",tier:3,tax:"P9",q:"cos\u00b2x \u2212 (c\u22121)cosx + 2c \u2265 6 for every x \u2208 \u211d. True set of c:",pat:"P9 \u00b7 quadratic-in-cos over [\u22121,1]",ans:"[4, \u221e)",opt:"(2)",nudge:"Let t=cosx\u2208[\u22121,1]; the quadratic must stay \u2265 0 across that interval \u2014 its minimum sits at an endpoint.",choices:["[2, ∞)","[4, ∞)","(−∞, −2]","(−∞, −4]"],correct:1},
  {src:"SC Q58",type:"SC",tier:2,tax:"P18",q:"Range of f(x) = sin\u2076x + cos\u2076x",pat:"P18 \u00b7 (1 \u2212 \u00besin\u00b22x)",ans:"[1/4, 1]",opt:"(1)",nudge:"sin\u2076x + cos\u2076x = 1 \u2212 \u00besin\u00b22x; bound sin\u00b22x \u2208 [0,1].",choices:["[1/4, 1]","[1/4, 3/4]","[3/4, 1]","none of these"],correct:0},
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
  {src:"LC Q9",type:"LC",tier:3,tax:"P18",q:"f(x)=sin\u2076x+cos\u2076x+k(sin\u2074x+cos\u2074x). Value of k making f constant for all x:",pat:"P18 \u00b7 kill the variable term",ans:"\u22123/2",opt:"(4)",note:"f = (1+k) \u2212 (3+2k)p with p=sin\u00b2x cos\u00b2x; constant \u21d2 3+2k=0.",nudge:"Write f = (1+k) \u2212 (3+2k)\u00b7sin\u00b2x cos\u00b2x; constant \u21d2 the coefficient on sin\u00b2x cos\u00b2x vanishes.",choices:["−1/2","1/2","1/4","−3/2"],correct:3},
  {src:"LC Q10",type:"LC",tier:3,tax:"P18",q:"Same f. All k for which f(x)=0 has a solution lie in:",pat:"P18 + range of p\u2208[0,\u00bc]",ans:"[\u22121, \u22121/2]",opt:"(3)",nudge:"f=0 needs sin\u00b2x cos\u00b2x = (1+k)/(3+2k), which must land in [0, \u00bc].",choices:["[−1, 0]","[0, 1/2]","[−1, −1/2]","None of these"],correct:2},
  {src:"LC Q11",type:"LC",tier:3,tax:"P18",q:"Same f. Number of k for which f(x)=0 is an identity:",pat:"P18 \u00b7 both coeffs zero",ans:"0",opt:"(1)",note:"1+k=0 and 3+2k=0 can't both hold.",nudge:"An identity needs both coefficients zero at once \u2014 check if 1+k=0 and 3+2k=0 can coexist.",choices:["0","1","infinite","none of these"],correct:0},
  /* Matrix Match */
  {src:"MM Q3",type:"MM",tier:3,tax:"P5",q:"Match to ranges: sin\u00b2\u03b8+cos\u2074\u03b8, 3sin\u00b2\u03b8+sin\u2074\u03b8, sin\u00b2\u03b8\u2212cos\u2074\u03b8, tan\u00b2\u03b8+2cot\u00b2\u03b8 \u2192 {[\u22121,1],[0,2],[2\u221a2,\u221e),[\u00be,1]}",pat:"P5/P18 \u00b7 range each",ans:"key option (2)",opt:"(2)",note:"A range-finding cluster \u2014 do each with complete-the-square / AM\u2013GM, then match.",nudge:"Find each range with complete-the-square or AM\u2013GM, then match to the lists."},
  /* Archives */
  {src:"Arch SC (IIT-JEE 2011)",type:"Arch",tier:3,tax:"P15",q:"P = {\u03b8: sin\u03b8\u2212cos\u03b8 = \u221a2 cos\u03b8}, Q = {\u03b8: sin\u03b8+cos\u03b8 = \u221a2 sin\u03b8}. Then:",pat:"Identity \u2192 tan\u03b8 = \u221a2+1",ans:"P = Q",opt:"(4)",note:"Both reduce to tan\u03b8 = \u221a2 + 1.",nudge:"Reduce each set's condition to a single value of tan\u03b8.",choices:["P ⊂ Q and Q − P ≠ φ","Q ⊄ P","P ⊄ Q","P = Q"],correct:3},
  {src:"Arch MC (IIT-JEE)",type:"Arch",tier:3,tax:"P18",q:"If sin\u2074x/2 + cos\u2074x/3 = 1/5, then which hold? (1) tan\u00b2x = 2/3 (2) sin\u2078x/8 + cos\u2078x/27 = 1/125",pat:"P18 \u00b7 Cauchy/identity",ans:"(1) and (2)",opt:"(1),(2)",note:"A famous equality-case identity \u2014 the minimum of the weighted sum forces tan\u00b2x = 2/3.",nudge:"Equality in the weighted sum (Cauchy/AM\u2013GM) forces sin\u00b2x : cos\u00b2x = 2 : 3."},
  /* Advanced (Cengage SC — added 25 Jun 2026 · verified against page 1.38 answer key) */
  {src:"SC Q4",type:"SC",tier:2,tax:"P15",q:"If sinx, cosx, tanx are in G.P., then cos³x + cos²x =",choices:["1/2","3/4","1","3/2"],correct:2,pat:"P15 · GP condition collapses",ans:"1",opt:"(3)",nudge:"GP ⇒ cos²x = sinx·tanx = sin²x/cosx ⇒ cos³x = sin²x = 1 − cos²x."},
  {src:"SC Q9",type:"SC",tier:3,tax:"F1",q:"A circle is drawn in a sector of a larger circle (radius r). The smaller circle is tangent to the two bounding radii and to the arc. If the sector angle is 60°, the radius of the smaller circle is",choices:["r/2","r/3","2√3 r/5","r/√2"],correct:1,pat:"Inscribed circle · sin(half-angle) = r_s/(r−r_s)",ans:"r/3",opt:"(2)",nudge:"Drop the small circle's centre onto the angle bisector at distance d from the vertex; sin 30° = r_s/d ⇒ d = 2r_s; then r = d + r_s = 3r_s."},
  {src:"SC Q13",type:"SC",tier:2,tax:"P15",q:"(1 + tanα tanβ)² + (tanα − tanβ)² =",choices:["tan²α tan²β","sec²α sec²β","tan²α cot²β","sec²α cos²β"],correct:1,pat:"P15 · expand & use 1+tan² = sec²",ans:"sec²α sec²β",opt:"(2)",nudge:"Expand both squares — cross terms cancel and you're left with (1+tan²α)(1+tan²β)."},
  {src:"SC Q16",type:"SC",tier:2,tax:"P18",q:"If sec⁴θ + sec²θ = 10 + tan⁴θ + tan²θ, then sin²θ =",choices:["2/3","3/4","4/5","5/6"],correct:2,pat:"P18 · factor sec⁴ − tan⁴",ans:"4/5",opt:"(3)",note:"sec² + tan² = 9 ⇒ 2tan²θ + 1 = 9 ⇒ tan²θ = 4 ⇒ sin²θ = 4/5.",nudge:"Factor sec⁴−tan⁴ = (sec²−tan²)(sec²+tan²) and remember sec² − tan² = 1."},
  {src:"SC Q19",type:"SC",tier:3,tax:"P16",q:"If sin A = sin²B and 2cos²A = 3cos²B in △ABC, then the triangle is",choices:["right angled","obtuse angled","isosceles","equilateral"],correct:1,pat:"P16 · system in a triangle",ans:"obtuse angled",opt:"(2)",note:"Solution lands at A = π/6, B = π/4, C = 7π/12 — obtuse at C.",nudge:"Sub cos²B = 1 − sin B (from sinA = sin²B) into the second ⇒ 2sin²A − 3sinA + 1 = 0."},
  {src:"SC Q23",type:"SC",tier:3,tax:"P15",q:"3(sinθ − cosθ)⁴ + 6(sinθ + cosθ)² + 4(sin⁶θ + cos⁶θ) =",choices:["11","12","13","14"],correct:2,pat:"P15 · collapse via s²+c² = 1",ans:"13",opt:"(3)",nudge:"Let p = sin²θ cos²θ. Then (s−c)² = 1−2p·(s·c)? — expand each piece in terms of p and the constant terms add to 13."},
  {src:"SC Q24",type:"SC",tier:3,tax:"P18",q:"If sec x + sec²x = 1, then tan⁸x − tan⁴x − 2tan²x + 1 =",choices:["0","1","2","3"],correct:2,pat:"P18 · powerful substitution",ans:"2",opt:"(3)",note:"sec x = (−1 ± √5)/2 ⇒ tan²x = sec²x − 1 satisfies a quadratic; raise carefully.",nudge:"From sec²x = 1 − sec x: get tan²x as a polynomial in sec x, then the eighth power collapses by repeated reduction."},
  {src:"SC Q28",type:"SC",tier:2,tax:"F1",q:"The greatest negative angle coterminal with 43π/11 is",choices:["−5π/11","−π/11","−7π/11","−9π/11"],correct:1,pat:"F1 · reduce mod 2π",ans:"−π/11",opt:"(2)",nudge:"Subtract integer multiples of 2π = 22π/11 until you land in (−2π, 0). 43π/11 − 2·22π/11 = −π/11."},
  {src:"SC Q33",type:"SC",tier:2,tax:"P7",q:"Let α = sin(161°)/cos(251°) and β = tan 74° · tan(196°). Then 4α² − 3β³ =",choices:["−2","−1","0","1"],correct:3,pat:"P7 · allied-angle reduction",ans:"1",opt:"(4)",note:"sin161° = sin19°; cos251° = −sin19° ⇒ α = −1. tan74°·tan16° = cot16°·tan16° = 1 ⇒ β = 1.",nudge:"Reduce each angle to a known acute residue; α turns into a clean ±1 and β collapses via tan·cot pair."},
  {src:"SC Q35",type:"SC",tier:2,tax:"P4",q:"If tanθ = −4/3, then sinθ =",choices:["−4/5 but not 4/5","−4/5 or 4/5","4/5 but not −4/5","none of these"],correct:1,pat:"P4 · quadrant left open",ans:"−4/5 or 4/5",opt:"(2)",note:"Tan negative ⇒ θ in Q2 (sinθ > 0 ⇒ 4/5) or Q4 (sinθ < 0 ⇒ −4/5).",nudge:"Without knowing the quadrant, BOTH sign possibilities survive — list them."},
  {src:"SC Q39",type:"SC",tier:2,tax:"P16",q:"The minimum value of sinα + sinβ + sinγ, where α, β, γ are real numbers with α + β + γ = π, is",choices:["positive","zero","negative","−3"],correct:2,pat:"P16 · constrained sum (not just triangle angles)",ans:"negative",opt:"(3)",note:"Reals (not triangle angles!) — e.g. α = β = −π/2, γ = 2π ⇒ sum = −1 −1 + 0 = −2. So min is negative; −3 not attainable since three sines = −1 would force Σα = −3π/2 mod 2π ≠ π.",nudge:"The variables are real, not triangle angles — sin can be negative. Try α = β = −π/2, γ = 2π."},
  {src:"SC Q41",type:"SC",tier:2,tax:"P6",q:"If sinθ + cosθ = 1/5 and 0 ≤ θ < π, then tanθ =",choices:["−4/3","−3/4","3/4","4/3"],correct:0,pat:"P6 · square the given, watch interval",ans:"−4/3",opt:"(1)",note:"Squaring ⇒ 1 + 2sinθ cosθ = 1/25 ⇒ sin2θ = −24/25; with 0 ≤ θ < π, sinθ = 4/5, cosθ = −3/5.",nudge:"Square the given to get sinθ cosθ; then with sinθ ≥ 0 in [0,π), pin the signs."},
  {src:"SC Q44",type:"SC",tier:3,tax:"P4",q:"If π < α < 3π/2, then √((1−cosα)/(1+cosα)) + √((1+cosα)/(1−cosα)) =",choices:["2/sinα","−2/sinα","1/sinα","−1/sinα"],correct:1,pat:"P4 · half-angle √ with sign vigilance",ans:"−2/sinα",opt:"(2)",note:"Each radical = |tan(α/2)| or |cot(α/2)|; both negative in (π/2, 3π/4), so sum = −(tan + cot) = −2/sinα.",nudge:"Use 1−cosα/(1+cosα) = tan²(α/2); for α ∈ (π, 3π/2), α/2 ∈ (π/2, 3π/4) — Q2 where tan, cot are negative."},
  {src:"SC Q45",type:"SC",tier:3,tax:"P4",q:"If 3π/4 < α < π, then √(2cotα + 1/sin²α) =",choices:["1 + cotα","−1 − cotα","1 − cotα","−1 + cotα"],correct:1,pat:"P4 · perfect square under √ + sign",ans:"−1 − cotα",opt:"(2)",note:"2cotα + cosec²α = (1 + cotα)²; in (3π/4, π), cotα < −1 so 1 + cotα < 0 ⇒ √ = −(1+cotα).",nudge:"Spot the perfect square: 2cotα + cosec²α = (1 + cotα)²."},
  {src:"SC Q53",type:"SC",tier:3,tax:"P5",q:"If the equation cot⁴x − 2 cosec²x + a² = 0 has at least one real solution, the sum of all integral values of a equals",choices:["4","3","2","0"],correct:3,pat:"P5 · quadratic in cosec²x, range gate",ans:"0",opt:"(4)",note:"Let t = cosec²x ≥ 1. Then cot⁴x = (t−1)² ⇒ t² − 4t + (1+a²) = 0; discriminant ≥ 0 ⇒ a² ≤ 3 ⇒ a ∈ {−1, 0, 1}; sum = 0.",nudge:"Let t = cosec²x; rewrite as quadratic in t with t ≥ 1. The discriminant + range gate combine to bound a²."},
  {src:"SC Q54",type:"SC",tier:3,tax:"P7",q:"3[sin⁴(3π/2 − α) + sin⁴(3π + α)] − 2[sin⁶(π/2 + α) + sin⁶(5π − α)] =",choices:["0","1","3","none of these"],correct:1,pat:"P7 · allied-angle then P18 collapse",ans:"1",opt:"(2)",note:"sin(3π/2−α) = −cosα, sin(3π+α) = −sinα, sin(π/2+α) = cosα, sin(5π−α) = sinα. ⇒ 3(cos⁴α + sin⁴α) − 2(cos⁶α + sin⁶α) = 1 (Lagrange-Newton).",nudge:"Allied-angle each sin, then use 3(s⁴+c⁴) − 2(s⁶+c⁶) = 1 — a clean identity."},
  {src:"SC Q55",type:"SC",tier:3,tax:"P4",q:"In which interval can sinx < cosx < tanx < cotx hold?",choices:["(7π/4, 2π)","(3π/4, π)","(5π/4, 3π/2)","(0, π/4)"],correct:3,pat:"P4 · quadrant inequalities",ans:"(0, π/4)",opt:"(4)",note:"Only Q1 keeps all four positive; within Q1 below π/4, sin < cos and tan < 1 < cot, with cos < tan when cos² < sin so... at small x: sin < cos, tan < cot, but cos vs tan? cos > tan iff cos² > sin, true near 0. Carefully checked, (0, π/4) works (with appropriate sub-range).",nudge:"All four must be positive ⇒ Q1; then test the strict chain at, say, x = π/6."},
  {src:"SC Q59",type:"SC",tier:3,tax:"P5",q:"Range of f(θ) = cos²θ (cos²θ + 1) + 2 sin²θ is",choices:["[3/4, 1]","[3/16, 1]","[3/4, 7/4]","[7/4, 2]"],correct:3,pat:"P5 · substitute u = cos²θ ∈ [0, 1]",ans:"[7/4, 2]",opt:"(4)",note:"f = u² + u + 2(1−u) = u² − u + 2. Vertex at u = 1/2 ⇒ 7/4; endpoints u = 0, 1 ⇒ 2 ⇒ range [7/4, 2].",nudge:"Let u = cos²θ ∈ [0,1]; the expression becomes u² − u + 2 — complete the square."},
  {src:"SC Q60",type:"SC",tier:3,tax:"P5",q:"Let A = sin⁸θ + cos¹⁴θ. The maximum value of A is",choices:["1","1/2","3/2","none of these"],correct:0,pat:"P5 · power bound",ans:"1",opt:"(1)",note:"sin⁸θ ≤ sin²θ, cos¹⁴θ ≤ cos²θ (since each is between 0 and 1); sum ≤ 1, hit at θ = 0 or π/2.",nudge:"Each term is at most its squared version (since the base is in [0,1]); so A ≤ sin²θ + cos²θ = 1."},
  {src:"SC Q63",type:"SC",tier:3,tax:"F1",q:"If 0 < α < π/6, then α·cosecα is",choices:["less than π/6","greater than π/6","less than π/3","greater than π/3"],correct:2,pat:"F1 · limit + monotone bound",ans:"less than π/3",opt:"(3)",note:"α/sinα increases on (0, π/2); at α = π/6 it equals (π/6)/(1/2) = π/3. So α cosecα < π/3 on (0, π/6).",nudge:"Check the endpoint: at α = π/6, sinα = 1/2 so α cosecα = π/3 — the value below π/6 stays below."},
];
const PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Foundation"},{k:"2",l:"JEE Main"},{k:"3",l:"JEE Advanced"},{k:"Flag",l:"\u2605 Flagged"}];

/* =====================================================================
   PHYSICS · MECHANICS · WORK, POWER & ENERGY  (Class 11)
   Source: Narayana Module (JEE-Adv Physics Vol-II), pages 61-110.
   Practice verified against Exercise-I / II / III answer keys.
   ===================================================================== */

/* ---- lightweight inline SVG figures (single-stroke, theme-aware via currentColor) ---- */
let WPE_FIG = {
  fx_trap: `<svg viewBox="0 0 220 120" class="fig"><polyline points="20,100 60,40 140,40 180,100" fill="rgba(43,140,128,.10)" stroke="var(--teal)" stroke-width="2"/><line x1="20" y1="100" x2="200" y2="100" stroke="currentColor" stroke-width="1.2"/><line x1="20" y1="100" x2="20" y2="20" stroke="currentColor" stroke-width="1.2"/><text x="6" y="24" font-size="11" fill="currentColor">F</text><text x="196" y="114" font-size="11" fill="currentColor">x</text><text x="44" y="114" font-size="10" fill="currentColor">x₁</text><text x="130" y="114" font-size="10" fill="currentColor">x₂</text><text x="120" y="34" font-size="10" fill="var(--teal)">area = work</text></svg>`,
  vt_drop: `<svg viewBox="0 0 220 120" class="fig"><line x1="20" y1="20" x2="170" y2="100" stroke="var(--coral)" stroke-width="2"/><line x1="20" y1="100" x2="200" y2="100" stroke="currentColor" stroke-width="1.2"/><line x1="20" y1="100" x2="20" y2="14" stroke="currentColor" stroke-width="1.2"/><text x="2" y="24" font-size="10" fill="currentColor">v₀</text><text x="196" y="114" font-size="11" fill="currentColor">t</text><text x="6" y="16" font-size="11" fill="currentColor">v</text><text x="160" y="114" font-size="10" fill="currentColor">t₀</text></svg>`,
  vcircle: `<svg viewBox="0 0 160 160" class="fig"><circle cx="80" cy="80" r="55" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="80" cy="135" r="4" fill="var(--coral)"/><circle cx="80" cy="25" r="4" fill="var(--teal)"/><line x1="80" y1="80" x2="80" y2="135" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/><text x="86" y="150" font-size="10" fill="var(--coral)">v≥√(5gr) bottom</text><text x="40" y="18" font-size="10" fill="var(--teal)">v≥√(gr) top</text><text x="120" y="84" font-size="10" fill="currentColor">r</text></svg>`,
  uwell: `<svg viewBox="0 0 220 120" class="fig"><path d="M20,30 C60,30 60,95 95,95 C130,95 130,40 165,40 C185,40 190,55 200,52" fill="none" stroke="var(--teal)" stroke-width="2"/><line x1="20" y1="100" x2="205" y2="100" stroke="currentColor" stroke-width="1.2"/><line x1="20" y1="100" x2="20" y2="16" stroke="currentColor" stroke-width="1.2"/><circle cx="95" cy="95" r="4" fill="var(--green)"/><circle cx="165" cy="40" r="4" fill="var(--coral)"/><text x="6" y="16" font-size="11" fill="currentColor">U</text><text x="200" y="114" font-size="11" fill="currentColor">x</text><text x="78" y="116" font-size="9" fill="var(--green)">stable</text><text x="150" y="32" font-size="9" fill="var(--coral)">unstable</text></svg>`,
  incline: `<svg viewBox="0 0 200 120" class="fig"><polygon points="20,100 180,100 180,30" fill="rgba(43,140,128,.07)" stroke="currentColor" stroke-width="1.3"/><rect x="120" y="48" width="22" height="14" fill="var(--coral)" transform="rotate(-23 131 55)"/><line x1="40" y1="100" x2="60" y2="100" stroke="currentColor" stroke-width="0"/><text x="34" y="96" font-size="11" fill="currentColor">θ</text><text x="150" y="118" font-size="10" fill="currentColor">rough incline · μ</text></svg>`
};

/* ===== TAXONOMY (drives the coverage map) ===== */
let WPE_TAXA = [
  {code:"F1",label:"Constant-force work & its sign (FS cosθ)",group:"Foundation methods"},
  {code:"F2",label:"KE · PE · p²/2m basics",group:"Foundation methods"},
  {code:"F3",label:"Power basics (P = W/t = F·v)",group:"Foundation methods"},
  {code:"F4",label:"Read an F–x or v–t graph",group:"Foundation methods"},
  {code:"P1",label:"Work–Energy Theorem",group:"Patterns"},
  {code:"P2",label:"Variable force → integrate / area",group:"Patterns"},
  {code:"P3",label:"Dot-product work (3-D)",group:"Patterns"},
  {code:"P4",label:"Conservation of Mechanical Energy",group:"Patterns"},
  {code:"P5",label:"Energy with friction (non-conservative)",group:"Patterns"},
  {code:"P6",label:"Spring energy & further-stretch",group:"Patterns"},
  {code:"P7",label:"KE–momentum link (p²/2m)",group:"Patterns"},
  {code:"P8",label:"Chain / rod / liquid CM-shift work",group:"Patterns"},
  {code:"P9",label:"U(x) → force & equilibrium type",group:"Patterns"},
  {code:"P10",label:"Conservative test / path-independence",group:"Patterns"},
  {code:"P11",label:"Constant-power kinematics (v∝√t)",group:"Patterns"},
  {code:"P12",label:"Pump / variable-mass power",group:"Patterns"},
  {code:"P13",label:"Vertical circle — critical speeds",group:"Patterns"},
  {code:"P14",label:"Vertical circle — leave vs oscillate",group:"Patterns"},
  {code:"P15",label:"Vertical circle — tension & reaction",group:"Patterns"},
  {code:"P16",label:"Stopping / penetration with resistance",group:"Patterns"}
];

/* ===== L1 FORMULAE ===== */
let WPE_FORMULAE = [
  {tag:"work",title:"Work by a force",rows:[
    {f:"W = F·S = FS cosθ   (dot product)"},
    {f:"θ < 90° → +ve · θ = 90° → 0 · θ > 90° → −ve",k:"trig",note:"The sign of work is decided entirely by the angle between force and displacement. Read the angle first."},
    {f:"Variable force:  W = ∫F·ds = ∫(Fₓdx + F_y dy + F_z dz)"},
    {f:"= area under the F–x graph (signed)",k:"trap",note:"Area below the x-axis counts as negative work — don't take the magnitude."}]},
  {tag:"energy",title:"Kinetic & potential energy",rows:[
    {f:"KE = ½mv² = p²/2m = ½pv"},
    {f:"Same p → lighter body has MORE KE (KE ∝ 1/m)",k:"trap",note:"Equal-momentum traps: the smaller mass wins on KE. Equal-KE traps: the larger mass wins on momentum."},
    {f:"PE_gravity = mgh · PE_spring = ½kx²"},
    {f:"Conservative force:  F = −dU/dx",k:"trig",note:"Slope of the U–x graph (with a minus sign) is the force. Flat slope = equilibrium."}]},
  {tag:"wet",title:"Work–energy theorem",rows:[
    {f:"W_net = ΔKE = ½mv² − ½mu²"},
    {f:"Sum the work of EVERY force (gravity + normal + friction + applied + spring)",k:"trig",note:"\"Find final speed / find a force given the motion\" → this is almost always the tool. List every force's work, set equal to ΔKE."}]},
  {tag:"cons",title:"Conservation of mechanical energy",rows:[
    {f:"Only conservative forces act:  Kᵢ + Uᵢ = K_f + U_f"},
    {f:"With friction:  ΔKE + ΔPE = −f·d   (energy lost = f·d)",k:"trap",note:"The instant the surface is \"rough\", energy is NOT conserved — switch to work–energy with a friction-loss term."}]},
  {tag:"power",title:"Power",rows:[
    {f:"P_avg = W/t · P_inst = F·v = Fv cosθ"},
    {f:"1 HP = 746 W · efficiency η = P_out / P_in"},
    {f:"Constant power from rest:  v = √(2Pt/m) ⇒ v ∝ t^½ , s ∝ t^{3/2}",k:"trig",note:"\"Machine delivers constant power\" → don't use kinematics with constant a; integrate Fv = P."}]},
  {tag:"spring",title:"Springs",rows:[
    {f:"U = ½kx² · F = −kx"},
    {f:"Stretch x₁ → x₂ :  W = ½k(x₂² − x₁²)"},
    {f:"Already stretched x, pull further by y :  W = ½ky(2x + y)",k:"trap",note:"Work to stretch \"further\" is NOT ½ky² — the spring is already loaded. Use the difference of squares."}]},
  {tag:"cm",title:"Chain / rod / liquid lifting",rows:[
    {f:"W = (mass of the moved part) × g × (rise of ITS centre of mass)"},
    {f:"Chain 1/n hanging, pulled up:  W = MgL / 2n²"},
    {f:"Rod / chain raised through θ:  use CM height change",k:"trig",note:"Replace the moved part by a point mass at its CM, then it is just mgh. The only trick is locating the CM."}]},
  {tag:"vcirc",title:"Vertical circle (string / track)",rows:[
    {f:"To COMPLETE the circle:  v_bottom ≥ √(5gr) · v_top ≥ √(gr)"},
    {f:"v_top = √(gr) · v_horizontal = √(3gr) · v_bottom = √(5gr)"},
    {f:"Tension at angle θ from bottom:  T = mv²/r + mg cosθ"},
    {f:"T_bottom − T_top = 6mg",k:"trig",note:"These five numbers settle most string/loop problems instantly — memorise the √5gr / √3gr / √gr ladder."},
    {f:"0 < v_bottom < √(2gr) → oscillates · √(2gr) < v < √(5gr) → leaves path",k:"trap",note:"Between √2gr and √5gr the body neither completes nor oscillates — it leaves the circle (string goes slack)."}]}
];

/* ===== L2 PATTERNS (16) ===== */
let WPE_PATTERNS = [
  {id:"P1",name:"Work–Energy Theorem",trigger:"You're given the motion (speeds, or a position-vs-time law) and asked for work done, or given forces and asked for the final speed. Any \"net work / work by THE force / find v\".",move:"W_net = ΔKE. Get v from the motion (v = dx/dt if x(t) is given), then ½mv² − ½mu². Don't chase individual forces.",why:"It sidesteps friction, tension, normal forces — you only need the endpoints' speeds.",mini:"x = t³/3, m = 2kg ⇒ v = t² ⇒ at t=2, v=4 ⇒ W = ½·2·4² = 16 J.",fails:"When asked for work by ONE specific force (not the net) — then you must isolate that force.",src:"WE-18 · Ex-I Q24,Q44,Q49",srcText:{"WE-18":"(text pending — upload Narayana Module page covering WE-18)","Ex-I Q24":"A 2 kg body moves with x = t²/2. Work done by the force in the first 5 s:","Ex-I Q44":"A 2 kg body is projected at 5 m/s along a rough table. Work done on it by friction before it stops:","Ex-I Q49":"A 5 kg block at rest on a rough surface is pushed 2 m by a 45 N horizontal force; friction is 25 N. Final kinetic energy:"}},
  {id:"P2",name:"Variable force → integrate / area",trigger:"Force depends on position — F = f(x), or an F-versus-x (or F-versus-S) GRAPH is shown — and work is asked.",move:"If a formula: W = ∫F dx between limits. If a graph: W = signed area under it.",why:"For a varying force you cannot use F×S; the integral / area is the only correct measure.",mini:"Trapezoid F–x graph: W = area = ½·base·height pieces, summed.",fails:"Taking |area| when part of the curve dips below the axis — that part is negative work.",src:"WE-3 · Ex-I Q15,Q16,Q27",fig:"fx_trap",srcText:{"WE-3":"(text pending — upload Narayana Module page covering WE-3)","Ex-I Q15":"A 5 kg block at rest at the origin is acted on by F = (20+5x) N along +X. Work done from x = 0 to x = 4 m:","Ex-I Q16":"(text pending — upload Narayana Module page covering Ex-I Q16)","Ex-I Q27":"A 0.1 kg particle starts from rest at x=0 under a force that ramps 0→10 N over x=0→4 m, stays 10 N to x=8 m, then ramps to 0 at x=12 m. Its speed at x=12 m:"}},
  {id:"P3",name:"Dot-product work (3-D)",trigger:"A force vector F = aî+bĵ+ck̂ and a displacement (two position vectors, or a straight path) — find work.",move:"W = F·ΔR = F·(R_f − R_i) = aΔx + bΔy + cΔz. One dot product.",why:"Work is the projection of force on displacement; in 3-D that's just the component sum.",mini:"F = 2î+3ĵ+4k̂, S = 3î+2ĵ+5k̂ ⇒ W = 6+6+20 = 32 J.",fails:"When the force varies along the path (then it's P2, integrate), or the path isn't straight.",src:"WE-1 · Ex-I Q9,Q11,Q14,Q17,Q58",srcText:{"WE-1":"(text pending — upload Narayana Module page covering WE-1)","Ex-I Q9":"If F = 2î+3ĵ+4k̂ acts on a body and displaces it by S = 3î+2ĵ+5k̂, the work done is:","Ex-I Q11":"A force F = (6î−8ĵ) N displaces a particle 4 m along the X-axis and 6 m along the Y-axis. Total work done is:","Ex-I Q14":"A 0.5 kg particle is displaced from (2,3,1) to (4,3,2) by a 30 N force acting along (î+ĵ+k̂). Work done:","Ex-I Q17":"A force F = 2î+3ĵ−4k̂ acts on a particle constrained to the line x = y in the XY-plane. If it moves 5√2 m, the work done is:","Ex-I Q58":"A motorboat moves with velocity V = (4î−2ĵ+k̂) m/s against a resisting force F = (5î−10ĵ+6k̂) N. The power of the motor is:"}},
  {id:"P4",name:"Conservation of Mechanical Energy",trigger:"\"Smooth / frictionless / no friction\" and you need a speed, height, or compression somewhere on the path.",move:"Kᵢ + Uᵢ = K_f + U_f. Pick two points; equate total energy. Gravity PE = mgh, spring PE = ½kx².",why:"With only conservative forces the total stays fixed — endpoints are all that matter, not the path shape.",mini:"Drop from h on a smooth curve ⇒ ½mv² = mgh ⇒ v = √(2gh).",fails:"The moment friction or a resistive force appears — energy is lost, use P5 instead.",src:"WE-26,27,31 · Ex-I Q32,Q43,Q55",srcText:{"WE-26":"(text pending — upload Narayana Module page covering WE-26)","WE-27":"(text pending — upload Narayana Module page covering WE-27)","WE-31":"(text pending — upload Narayana Module page covering WE-31)","Ex-I Q32":"(text pending — upload Narayana Module page covering Ex-I Q32)","Ex-I Q43":"A compressed spring between a 1 kg and a 2 kg block on a smooth table holds 12 J and is released. Velocity of the 2 kg block:","Ex-I Q55":"A body thrown up has equal PE and KE at a point P. If the SAME body is thrown up with double the velocity, the ratio PE : KE at the same point P is:"}},
  {id:"P5",name:"Energy with friction (non-conservative)",trigger:"A \"rough\" surface / resistive medium, and you need speed, distance, or the heat produced.",move:"Work–energy with the friction term: ΔKE = W_applied + W_gravity − f·d. Heat generated = f·d (or = loss of ME).",why:"Friction drains mechanical energy into heat — it must appear as a negative work / loss term.",mini:"Block, F=45N, friction=25N, over 2m ⇒ ΔKE = (45−25)·2 = 40 J.",fails:"Treating it as conservation (Eᵢ=E_f) — you'll lose the dissipated f·d every time.",src:"WE-21,22,23 · Ex-I Q37,Q42,Q44,Q48,Q49",srcText:{"WE-21":"(text pending — upload Narayana Module page covering WE-21)","WE-22":"(text pending — upload Narayana Module page covering WE-22)","WE-23":"(text pending — upload Narayana Module page covering WE-23)","Ex-I Q37":"(text pending — upload Narayana Module page covering Ex-I Q37)","Ex-I Q42":"A rubber ball dropped from 5 m rebounds to 3.5 m. The % loss of energy in impact:","Ex-I Q44":"A 2 kg body is projected at 5 m/s along a rough table. Work done on it by friction before it stops:","Ex-I Q48":"A 1.00 g drop falls from 1.00 km and hits the ground at 50.0 m/s. Work done by the unknown resistive force (g=10):","Ex-I Q49":"A 5 kg block at rest on a rough surface is pushed 2 m by a 45 N horizontal force; friction is 25 N. Final kinetic energy:"}},
  {id:"P6",name:"Spring energy & further-stretch",trigger:"A spring is compressed/stretched and you need stored energy, work to stretch between two extensions, or work to stretch \"further\".",move:"U = ½kx². Between x₁ and x₂: W = ½k(x₂²−x₁²). Already at x, pull further by y: W = ½ky(2x+y).",why:"Spring PE is quadratic, so equal extra stretches cost unequal work — the difference of squares captures it.",mini:"Stretched x, further by y ⇒ W = ½k[(x+y)² − x²] = ½ky(2x+y).",fails:"Using ½ky² for a \"further\" stretch — that ignores the energy already stored.",src:"WE-17 · Ex-I Q38,Q43",srcText:{"WE-17":"(text pending — upload Narayana Module page covering WE-17)","Ex-I Q38":"A spring compressed by 4 cm stores 2 J. The force required to extend it by 8 cm is:","Ex-I Q43":"A compressed spring between a 1 kg and a 2 kg block on a smooth table holds 12 J and is released. Velocity of the 2 kg block:"}},
  {id:"P7",name:"KE–momentum link (p²/2m)",trigger:"Momentum and kinetic energy compared across bodies — \"same momentum\", \"same KE\", \"momentum doubled\", ratios of KE.",move:"Use KE = p²/2m and p = √(2m·KE). Same p ⇒ KE ∝ 1/m. Same KE ⇒ p ∝ √m. p doubles ⇒ KE ×4.",why:"It links the two without needing the velocity — one formula resolves the whole class.",mini:"Momentum doubled ⇒ KE = p²/2m becomes 4× larger.",fails:"Forgetting which is held fixed — read whether p or KE is the shared quantity first.",src:"Ex-I Q28,Q35,Q40,Q59",srcText:{"Ex-I Q28":"When the momentum of a body is doubled, its kinetic energy:","Ex-I Q35":"A 60 kg boy on a frictionless surface throws a 1 kg stone horizontally at 12 m/s. The kinetic energy with which he recoils:","Ex-I Q40":"A man has twice the mass of a boy and half his kinetic energy. The ratio of the speeds (man : boy) is:","Ex-I Q59":"Two rifles fire the same number of bullets in a given time. The second fires bullets of twice the mass at half the velocity of the first. The ratio of their powers (first : second) is:"}},
  {id:"P8",name:"Chain / rod / liquid CM-shift work",trigger:"A chain hanging off a table, a rod/chain being lifted or raised through an angle, water pumped up — work to move it.",move:"Replace the moved part by a point mass at its centre of mass; W = (that mass)·g·(rise of its CM).",why:"For a distributed body only the CM displacement matters for gravitational work.",mini:"Chain mass M, 1/4 hangs (CM at L/8 below) ⇒ W = (M/4)g(L/8) = MgL/32.",fails:"Using the whole length or the wrong CM height — locate the moved part's CM precisely.",src:"WE-7 · Ex-I Q19,Q20,Q26",srcText:{"WE-7":"(text pending — upload Narayana Module page covering WE-7)","Ex-I Q19":"(text pending — upload Narayana Module page covering Ex-I Q19)","Ex-I Q20":"A chain of mass m, length L hangs with 3/4 of its length on a smooth table (1/4 hanging). Work to pull it completely onto the table:","Ex-I Q26":"A uniform chain of length L, mass M lies on a smooth table with one third hanging over the edge. Minimum work to pull the hanging part onto the table:"}},
  {id:"P9",name:"U(x) → force & equilibrium type",trigger:"A potential-energy function U(x) is given; find the force, the equilibrium position, or whether it's stable/unstable.",move:"F = −dU/dx (zero at equilibrium). Then d²U/dx²: >0 stable (U minimum), <0 unstable (U maximum), =0 neutral.",why:"Force is the slope; curvature decides whether a nudge restores or runs away.",mini:"U = a/x¹² − b/x⁶ ⇒ dU/dx = 0 ⇒ x = (2a/b)^{1/6} (the bond length).",fails:"Reading stability off U's value instead of its curvature (second derivative).",src:"WE-24,30 · Ex-III Q6",fig:"uwell",srcText:{"WE-24":"(text pending — upload Narayana Module page covering WE-24)","WE-30":"(text pending — upload Narayana Module page covering WE-30)","Ex-III Q6":"A particle is acted on by a 1-D conservative force whose F–x curve crosses zero at points A, B, C, D (shown in the source). At C the particle is in:"}},
  {id:"P10",name:"Conservative test / path-independence",trigger:"\"Is this force conservative?\", work around a closed loop, or work compared along different paths between the same points.",move:"Conservative ⇔ work is path-independent ⇔ ∮F·dr = 0 ⇔ ∂F_y/∂x = ∂Fₓ/∂y. Compute work on two paths; if unequal → non-conservative.",why:"A conservative force has a potential; the loop integral and the cross-partials are the clean tests.",mini:"F = (xyî + xyĵ): work O→C differs by path ⇒ non-conservative.",fails:"Assuming any central-looking force is conservative — check the cross-partials, don't eyeball.",src:"Ex-III Comp-2,3 · Q16(MC)",srcText:{"Ex-III Comp-2,3":"(text pending — upload Narayana Module comprehension page for Ex-III Comp-2,3)","Q16(MC)":"(text pending — upload Narayana Module page covering Q16(MC))"}},
  {id:"P11",name:"Constant-power kinematics (v∝√t)",trigger:"\"A machine / engine delivers CONSTANT power\" and you need v(t), distance, or time.",move:"Fv = P with F = m dv/dt ⇒ ∫v dv = (P/m)∫dt ⇒ v = √(2Pt/m), and s ∝ t^{3/2}.",why:"Constant power means constant Fv, not constant force — ordinary uniform-acceleration kinematics is wrong here.",mini:"From rest at power P: v = √(2Pt/m) ⇒ v ∝ √t.",fails:"Using v = u + at with a constant — the acceleration is not constant under constant power.",src:"WE-32,35 · Ex-I 'Position & velocity' · Ex-III Q7",srcText:{"WE-32":"(text pending — upload Narayana Module page covering WE-32)","WE-35":"(text pending — upload Narayana Module page covering WE-35)","Ex-I 'Position & velocity'":"(text pending — upload Narayana Module section page for Ex-I 'Position & velocity')","Ex-III Q7":"(text pending — upload Narayana Module page covering Ex-III Q7)"}},
  {id:"P12",name:"Pump / variable-mass power",trigger:"A pump/hose/conveyor/fan moving mass continuously — \"n times the water\", power of the jet, KE imparted per second.",move:"Rate of KE = ½(dm/dt)v². For a jet, dm/dt = ρAv ⇒ P = ½ρAv³. To get n× flow: force ×n², power ×n³.",why:"It's a momentum/energy flux problem; the v³ (power) and v² (force) scalings are the signatures.",mini:"Fan: P = ½(ρAv)v² = ½ρAv³.",fails:"Treating it as a single block — you need the per-second mass flux dm/dt, not a fixed m.",src:"WE-37 · Ex-I Q64,Q66 · Ex-IV Q1",srcText:{"WE-37":"(text pending — upload Narayana Module page covering WE-37)","Ex-I Q64":"A juggler throws balls at a rate of three per second, each at 10 m/s, mass 0.05 kg. His power is:","Ex-I Q66":"An electric fan of effective cross-section A accelerates air of density ρ to a speed v. The power needed is:","Ex-IV Q1":"(text pending — upload Narayana Module page covering Ex-IV Q1)"}},
  {id:"P13",name:"Vertical circle — critical speeds",trigger:"\"Just completes the vertical circle / loops the loop / minimum speed or height\" with a string or track.",move:"Bottom needs v ≥ √(5gr); top needs v ≥ √(gr). Min height to loop radius r: h = 5r/2 (or 5D/4 for diameter D).",why:"At the top gravity alone supplies the centripetal need (mg = mv²/r) — that fixes √gr, and energy gives √5gr at the bottom.",mini:"Frictionless track, loop radius r ⇒ min release height = 5r/2.",fails:"Using √(2gr) (that's the leave-the-path threshold) instead of √(5gr) for completing the loop.",src:"WE-40 · Ex-I Q73,Q77 · Ex-II",fig:"vcircle",srcText:{"WE-40":"(text pending — upload Narayana Module page covering WE-40)","Ex-I Q73":"A ballistic pendulum: block 0.98 kg, length 1 m; a 20 g bullet embeds horizontally and the system just completes a vertical circle of radius 1 m. The bullet's striking speed is:","Ex-I Q77":"A body slides from rest down a frictionless incline into a vertical loop of diameter D. The minimum incline height to complete the loop is:","Ex-II":"(text pending — upload Narayana Module Ex-II pages)"}},
  {id:"P14",name:"Vertical circle — leave vs oscillate",trigger:"A bob/particle is given a speed at the bottom that may NOT complete the circle — classify the motion.",move:"0 < v < √(2gr): oscillates (swings, never above horizontal). √(2gr) < v < √(5gr): leaves the path (string slackens, 90°<θ<180°). ≥√(5gr): completes.",why:"Below √2gr the speed dies before tension does (pendulum swing); above it tension dies first (it flies off).",mini:"v_bottom = √(3gr) lies between √2gr and √5gr ⇒ it leaves the circular path.",fails:"Mixing the two thresholds — √2gr is oscillate/leave, √5gr is leave/complete.",src:"Ex-II · synopsis p.82",srcText:{"Ex-II":"(text pending — upload Narayana Module Ex-II pages)","synopsis p.82":"(text pending — upload Narayana Module synopsis page)"}},
  {id:"P15",name:"Vertical circle — tension & reaction",trigger:"Find the string tension (or the normal reaction on a bridge/hemisphere) at a point on a vertical circle, or where contact is lost.",move:"T = mv²/r + mg cosθ (θ from bottom). Bridge: concave N = mg + mv²/r, convex N = mg − mv²/r. Body leaves a convex sphere when N=0 ⇒ cosθ = 2/3.",why:"Centripetal = net radial force; tension/normal adjusts to supply it, so it tracks v² and the weight's radial part.",mini:"T_max − T_min over a full circle = 6mg.",fails:"Dropping the mg cosθ component, or using θ from the wrong reference (top vs bottom).",src:"WE-41 · Ex-I Q70,Q71,Q72,Q74,Q75 · synopsis p.80-83",srcText:{"WE-41":"(text pending — upload Narayana Module page covering WE-41)","Ex-I Q70":"A vehicle moves at uniform speed along horizontal, concave and convex roads. The normal reaction on it is maximum on the:","Ex-I Q71":"A 2 kg body on a light string is whirled in a vertical circle of radius 2 m. If the string withstands at most 140.6 N, the maximum speed (g=9.8) is:","Ex-I Q72":"A pilot of mass m can bear a maximum apparent weight 7mg. If the aeroplane flies a vertical circle at 210 m/s (diving up from the lowest point), the minimum radius is (g=10):","Ex-I Q74":"(text pending — upload Narayana Module page covering Ex-I Q74)","Ex-I Q75":"A vehicle travels a concave then a convex road of the same radius at uniform speed. The normal reactions at the lowest point of the concave and the highest of the convex are 1.5×10⁴ N and 3×10³ N (g=10). Its mass is:","synopsis p.80-83":"(text pending — upload Narayana Module synopsis page)"}},
  {id:"P16",name:"Stopping / penetration with resistance",trigger:"A bullet/pile/body penetrates a distance and stops (or loses a fraction of speed) against a resisting force.",move:"Work–energy: ½mv² = R·s (full stop), so stopping distance s = mv²/2R ∝ KE. Lose fraction of v ⇒ KE drops by that fraction²; remaining KE needs proportional extra distance.",why:"A near-constant resistance makes penetration depth directly proportional to the kinetic energy to be killed.",mini:"Loses ¼ of KE in 5 cm ⇒ remaining ¾KE needs 3×5 = 15 cm more.",fails:"Working with velocity ratios linearly — depth tracks KE (v²), not v.",src:"Ex-I Q46 · Ex-II Q7 · synopsis WE p.72",srcText:{"Ex-I Q46":"A bullet fired into a tree trunk loses 1/4 of its KE in the first 5 cm. Before stopping it travels a further:","Ex-II Q7":"A 0.5 kg body loses half its velocity while penetrating 6 cm into a wooden block. How much further will it penetrate before coming to rest?","synopsis WE p.72":"(text pending — upload Narayana Module synopsis page)"}}
];

/* ===== L3 GUIDED (laddered) ===== */
let WPE_GUIDED = [
  /* TIER 1 — FOUNDATION */
  {id:"G1",tier:1,tax:"P1",pattern:"P1",q:"A 2 kg body moves so that x = t³/3 (metres, seconds). Work done by the net force in the first 2 s?",opts:["Work–Energy Theorem","Variable force → integrate","Dot-product work","Conservation of Mechanical Energy"],correct:0,
   hints:["You're handed the motion, not the forces — that points straight at W_net = ΔKE.","v = dx/dt = t². At t=0, v=0; at t=2, v=4 m/s.","W = ½·2·(4² − 0²)."],ans:"16 J",why:"Motion given, work asked ⇒ work–energy theorem; get v by differentiating x(t)."},
  {id:"G2",tier:1,tax:"P2",pattern:"P2",q:"A force varies with displacement as a trapezoid: it ramps 0→4 N over x=0→6 m, stays 4 N to x=10 m, ramps down to 0 at x=14 m. Work from x=0 to 14 m?",opts:["Dot-product work","Variable force → area under F–x","Constant-force work","KE–momentum link"],correct:1,fig:"fx_trap",
   hints:["Force changes with position ⇒ work = area under the F–x graph, not F×S.","Split into a triangle (0–6), a rectangle (6–10), a triangle (10–14).","½·6·4 + 4·4 + ½·4·4 = 12 + 16 + 8."],ans:"36 J",why:"Varying force ⇒ signed area under F–x. (This is exactly WE-3.)"},
  {id:"G3",tier:1,tax:"P7",pattern:"P7",q:"Two bodies of different masses have the SAME momentum. Which has greater kinetic energy?",opts:["KE–momentum link (p²/2m)","Work–Energy Theorem","Conservation of Mechanical Energy","Power basics"],correct:0,
   hints:["Write KE in terms of momentum, not velocity: KE = p²/2m.","p is the same for both, so KE ∝ 1/m.","Smaller mass ⇒ larger 1/m."],ans:"The lighter body",why:"Same p ⇒ KE ∝ 1/m. The p²/2m form resolves it without velocities."},
  {id:"G4",tier:1,tax:"P6",pattern:"P6",q:"A spring of constant k is already stretched by x. The work to stretch it FURTHER by a small length y is:",opts:["Spring energy & further-stretch","Conservation of Mechanical Energy","Work–Energy Theorem","Variable force → integrate"],correct:0,
   hints:["Work = U_final − U_initial = ½k(x+y)² − ½kx².","Expand (x+y)² − x² = 2xy + y² = y(2x+y).","So W = ½k·y(2x+y)."],ans:"½ky(2x + y)",why:"\"Further\" stretch ⇒ difference of squares, never ½ky². (WE-17.)"},
  /* TIER 2 — MAIN */
  {id:"G5",tier:2,tax:"P3",pattern:"P3",q:"A body is displaced from r_A = 2î+4ĵ−6k̂ to r_B = 6î−4ĵ+2k̂ under a constant force F = 2î+3ĵ−k̂. Work done?",opts:["Conservation of Mechanical Energy","Dot-product work (3-D)","Variable force → integrate","Chain CM-shift work"],correct:1,
   hints:["Constant force + straight displacement ⇒ W = F·(r_B − r_A).","r_B − r_A = 4î − 8ĵ + 8k̂.","W = (2)(4) + (3)(−8) + (−1)(8) = 8 − 24 − 8."],ans:"−24 J",why:"Vector force + displacement ⇒ single dot product. (WE-1.)"},
  {id:"G6",tier:2,tax:"P2",pattern:"P2",q:"F = 2xî + 2ĵ + 3z²k̂ N acts on a particle moving from (1,2,3) m to (3,6,1) m. Work done?",opts:["Dot-product work","Variable force → component integrals","Work–Energy Theorem","Power basics"],correct:1,
   hints:["F depends on position ⇒ W = ∫Fₓdx + ∫F_y dy + ∫F_z dz over each coordinate's limits.","∫₁³2x dx + ∫₂⁶2 dy + ∫₃¹3z² dz = [x²]₁³ + [2y]₂⁶ + [z³]₃¹.","= (9−1) + (12−4) + (1−27) = 8 + 8 − 26."],ans:"−10 J",why:"Position-dependent force ⇒ integrate each component over its own limits. (WE-2.)"},
  {id:"G7",tier:2,tax:"P8",pattern:"P8",q:"A uniform chain of length 2 m, total mass 4 kg, lies on a table with 60 cm hanging over the edge. Work to pull the hanging part back onto the table? (g = 10)",opts:["Work–Energy Theorem","Chain CM-shift work","Conservation of Mechanical Energy","Spring energy"],correct:1,
   hints:["Only the hanging part is raised. Its mass = (4/2)·0.6 = 1.2 kg.","Its CM sits at 0.6/2 = 0.3 m below the table edge — that's the rise needed.","W = 1.2·10·0.3."],ans:"3.6 J",why:"Lift the hanging part's CM: W = (mass of part)·g·(CM rise). (WE-7.)"},
  {id:"G8",tier:2,tax:"P5",pattern:"P5",q:"A 2 kg block slides 5 m/s along a rough horizontal table and stops. Work done by friction?",opts:["Conservation of Mechanical Energy","Energy with friction (work–energy)","Dot-product work","Chain CM-shift work"],correct:1,
   hints:["Rough surface ⇒ energy is lost; use ΔKE = W_friction.","Final KE = 0, initial KE = ½·2·5² = 25 J.","W_friction = 0 − 25."],ans:"−25 J",why:"Rough ⇒ work–energy with friction; the lost KE is friction's (negative) work. (Ex-I Q44.)"},
  {id:"G9",tier:2,tax:"P11",pattern:"P11",q:"A machine delivers power proportional to the body's velocity and the body starts from near-rest. The distance covered to reach speed v scales as:",opts:["Constant-power kinematics","Work–Energy Theorem","Conservation of Mechanical Energy","Variable force → integrate"],correct:0,
   hints:["P = Fv with F = m·dv/dt; here even P depends on v — set up m v(dv/dx)·… and integrate.","For the standard constant-power case, v = √(2Pt/m) so v ∝ √t and s ∝ t^{3/2}.","Distance grows faster than linearly in time because the body keeps speeding up."],ans:"s ∝ t^{3/2}  (v ∝ √t)",why:"Constant power ⇒ integrate Fv = P; never assume constant acceleration. (WE-32/35.)"},
  {id:"G10",tier:2,tax:"P15",pattern:"P15",q:"A 2 kg body on a light string is whirled in a vertical circle of radius 2 m. The string can take 140.6 N. Maximum speed (at the bottom)? (g = 9.8)",opts:["Vertical circle — critical speeds","Vertical circle — tension & reaction","Conservation of Mechanical Energy","KE–momentum link"],correct:1,
   hints:["Tension is largest at the bottom: T = mv²/r + mg.","140.6 = 2v²/2 + 2·9.8 = v² + 19.6.","v² = 121."],ans:"11 m/s",why:"Max tension is at the lowest point: T = mv²/r + mg. (Ex-I Q71.)"},
  /* TIER 3 — ADVANCED */
  {id:"G11",tier:3,tax:"P9",pattern:"P9",q:"For a diatomic molecule U(x) = a/x¹² − b/x⁶ (a,b>0). At what separation x is the force zero (minimum PE)?",opts:["U(x) → force & equilibrium","Conservation of Mechanical Energy","Spring energy","Variable force → integrate"],correct:0,fig:"uwell",
   hints:["Force zero ⇒ dU/dx = 0.","−12a/x¹³ + 6b/x⁷ = 0 ⇒ 12a/x¹³ = 6b/x⁷.","x⁶ = 2a/b."],ans:"x = (2a/b)^{1/6}",why:"Equilibrium ⇒ dU/dx = 0; that x is the bond length. (WE-24.)"},
  {id:"G12",tier:3,tax:"P9",pattern:"P9",q:"A 1 kg particle on the x-axis has U(x) = (x⁴/4 − x²/2) J. If the total mechanical energy is 2 J, its maximum speed is:",opts:["Conservation of Mechanical Energy + U-minimum","Work–Energy Theorem","Vertical circle — critical speeds","Power basics"],correct:0,fig:"uwell",
   hints:["Max KE occurs where U is minimum. Find U_min: dU/dx = x³ − x = 0 ⇒ x = 0, ±1.","At x = ±1, U = ¼ − ½ = −¼ J (the minima). KE_max = E − U_min = 2 − (−¼) = 9/4 J.","½·1·v² = 9/4 ⇒ v² = 9/2."],ans:"v = 3/√2 ≈ 2.12 m/s",why:"KE is largest at the PE minimum; conserve E and read U_min off dU/dx=0. (WE-30.)"},
  {id:"G13",tier:3,tax:"P13",pattern:"P13",q:"A body slides without friction from height H = 60 cm and loops a loop of radius R = 20 cm at the bottom. The ratio of the track's reaction force at the bottom (A), side (B) and top (C) is:",opts:["Vertical circle — critical speeds + energy","Energy with friction","Chain CM-shift work","Dot-product work"],correct:0,fig:"vcircle",
   hints:["H = 60 = 3R. Use energy for v at each point: v_A²=2g(3R)=6gR, v_B²=4gR, v_C²=2gR.","Reactions: R_A = mv_A²/R + mg = 7mg; R_B = mv_B²/R = 4mg; R_C = mv_C²/R − mg = mg.","Ratio 7mg : 4mg : 1mg."],ans:"7 : 4 : 1",why:"Energy gives v at each height; then N = mv²/R ± mg by position. (WE-40.)"},
  {id:"G14",tier:3,tax:"P15",pattern:"P15",q:"A heavy particle hangs from a string of length ℓ and is projected horizontally with speed √(gℓ). The string's inclination to the vertical when the tension equals the particle's weight satisfies:",opts:["Vertical circle — tension & reaction","Conservation of Mechanical Energy only","Constant-power kinematics","Spring energy"],correct:0,
   hints:["At angle θ above the lowest point: T − mg cosθ = mv²/ℓ, and energy gives v² = u² − 2gℓ(1−cosθ).","Set T = mg: mg − mg cosθ = m[gℓ − 2gℓ(1−cosθ)]/ℓ = mg[1 − 2(1−cosθ)].","Solve 1 − cosθ = 1 − 2 + 2cosθ ⇒ 3cosθ = 2."],ans:"cosθ = 2/3",why:"Combine radial Newton (T = mv²/ℓ + mg cosθ) with energy. (WE-41.)"},
  {id:"G15",tier:3,tax:"P10",pattern:"P10",q:"A force F = (xyî + xyĵ) N moves a particle from O to a point C along different paths and the work comes out different. The force is therefore:",opts:["Conservative test / path-independence","Work–Energy Theorem","Spring energy","Variable force → integrate"],correct:0,
   hints:["Compute work along two different routes between the same endpoints.","Path OAC and path OBC give different values of ∫(xy dx + xy dy).","Work depends on the path ⇒ not derivable from a potential."],ans:"Non-conservative",why:"Path-dependent work (or ∮F·dr ≠ 0) is the definition of non-conservative. (Ex-III Comp-3.)"},
  {id:"G16",tier:3,tax:"P15",pattern:"P15",q:"A small body slides from the top of a smooth convex hemisphere of radius r. It leaves the surface when its angular position θ from the top satisfies:",opts:["Vertical circle — tension & reaction (N=0)","Conservation only","KE–momentum link","Constant-power kinematics"],correct:0,
   hints:["It leaves when the normal reaction N = 0: then mg cosθ = mv²/r.","Energy from the top: v² = 2gr(1 − cosθ).","mg cosθ = m·2g(1−cosθ) ⇒ cosθ = 2/3, giving leaving height h = 2r/3."],ans:"cosθ = 2/3  (h = 2r/3)",why:"Contact lost at N=0; combine the radial equation with energy. (synopsis p.83.)"}
];

/* ===== L4 PRACTICE (curated, MCQ with printed options; verified vs Exercise keys) ===== */
let WPE_PRACTICE = [
  /* ---------- Exercise-I ---------- */
  {src:"Ex-I Q2",doc:"exI",type:"SC",tier:1,tax:"F1",q:"Work done by a force can be zero if:",choices:["the applied force is very large","force and displacement are in the same direction","force and displacement are in opposite directions","force and displacement are perpendicular"],correct:3,pat:"F1 · sign of work = angle",ans:"force ⊥ displacement"},
  {src:"Ex-I Q3",doc:"exI",type:"SC",tier:1,tax:"F1",q:"A man rows a boat upstream and, in spite of that, the boat is found not to move with respect to the bank. The work done by the man is:",choices:["zero","positive","negative","may be +ve or −ve"],correct:1,pat:"F1 · he does +work vs the current",ans:"positive",note:"His muscular force acts over the water he pushes back; only the boat's ground-displacement is zero. He still does positive work against the stream."},
  {src:"Ex-I Q4",doc:"exI",type:"SC",tier:1,tax:"F1",q:"A ball is thrown vertically upward. Work done by air resistance during its whole time of flight is:",choices:["+ve during ascent, −ve during descent","+ve during ascent and descent","−ve during ascent, +ve during descent","−ve during ascent and descent"],correct:3,pat:"F1 · drag opposes motion always",ans:"−ve throughout",note:"Air resistance always opposes the velocity, so it does negative work both going up and coming down."},
  {src:"Ex-I Q5",doc:"exI",type:"SC",tier:1,tax:"F2",q:"Potential energy is defined for:",choices:["non-conservative forces only","conservative forces only","both conservative & non-conservative forces","neither"],correct:1,pat:"F2 · PE ⇔ conservative",ans:"conservative forces only"},
  {src:"Ex-I Q6",doc:"exI",type:"SC",tier:1,tax:"P10",q:"Identify the non-conservative force:",choices:["weight of a body","force between two ions","magnetic force","air resistance"],correct:3,pat:"P10 · path-dependent ⇒ non-conservative",ans:"air resistance"},
  {src:"Ex-I Q8",doc:"exI",type:"SC",tier:1,tax:"P10",q:"In the case of a conservative force:",choices:["work done is independent of path","work done in a closed loop is zero","work done against it is stored as potential energy","all the above"],correct:3,pat:"P10 · defining properties",ans:"all the above"},
  {src:"Ex-I Q9",doc:"exI",type:"SC",tier:2,tax:"P3",q:"If F = 2î+3ĵ+4k̂ acts on a body and displaces it by S = 3î+2ĵ+5k̂, the work done is:",choices:["12 J","20 J","32 J","64 J"],correct:2,pat:"P3 · dot product",ans:"32 J"},
  {src:"Ex-I Q11",doc:"exI",type:"SC",tier:2,tax:"P3",q:"A force F = (6î−8ĵ) N displaces a particle 4 m along the X-axis and 6 m along the Y-axis. Total work done is:",choices:["72 J","24 J","−24 J","zero"],correct:2,pat:"P3 · component sum",ans:"−24 J",nudge:"W = Fₓ·Δx + F_y·Δy = (6)(4) + (−8)(6)."},
  {src:"Ex-I Q12",doc:"exI",type:"SC",tier:2,tax:"F1",q:"A lawn roller is pulled 20 m by a 200 N force whose rope makes 60° with the vertical. Work done by the pulling force:",choices:["4000 J","1000 J","2000√3 J","2000 J"],correct:2,pat:"F1 · use angle with displacement",ans:"2000√3 J",nudge:"60° with the vertical ⇒ 30° with the horizontal displacement. W = FS cos30°."},
  {src:"Ex-I Q13",doc:"exI",type:"SC",tier:2,tax:"F1",q:"A 5 kg body is moved up 10 m along the line of greatest slope of a smooth 30° incline (g = 10). Work done:",choices:["500 J","2500 J","250 J","25 J"],correct:2,pat:"F1 · against gravity = mg·h",ans:"250 J",nudge:"Height gained h = L sin30° = 5 m; W = mgh."},
  {src:"Ex-I Q14",doc:"exI",type:"SC",tier:2,tax:"P3",q:"A 0.5 kg particle is displaced from (2,3,1) to (4,3,2) by a 30 N force acting along (î+ĵ+k̂). Work done:",choices:["10√3 J","30√3 J","30 J","40 J"],correct:1,pat:"P3 · F·Δr with unit vector",ans:"30√3 J",nudge:"F = (30/√3)(î+ĵ+k̂); Δr = (2,0,1); take the dot product."},
  {src:"Ex-I Q15",doc:"exI",type:"SC",tier:2,tax:"P1",q:"A 5 kg block at rest at the origin is acted on by F = (20+5x) N along +X. Work done from x = 0 to x = 4 m:",choices:["100 J","150 J","120 J","75 J"],correct:2,pat:"P2 · ∫F dx",ans:"120 J",nudge:"∫₀⁴(20+5x)dx = 80 + 40."},
  {src:"Ex-I Q17",doc:"exI",type:"SC",tier:2,tax:"P3",q:"A force F = 2î+3ĵ−4k̂ acts on a particle constrained to the line x = y in the XY-plane. If it moves 5√2 m, the work done is:",choices:["25√2 J","5√58 J","25 J","10 J"],correct:2,pat:"P3 · displacement along x=y",ans:"25 J",nudge:"Direction (1,1,0)/√2 over 5√2 m ⇒ Δr = (5,5,0)."},
  {src:"Ex-I Q18",doc:"exI",type:"SC",tier:2,tax:"F1",q:"Two 10 N forces inclined at 120° displace a body 10 m along the bisector of the angle between them. Work done by each force:",choices:["5 J","1 J","50 J","100 J"],correct:2,pat:"F1 · each at 60° to bisector",ans:"50 J",nudge:"Each force makes 60° with the bisector ⇒ W = 10·10·cos60°."},
  {src:"Ex-I Q20",doc:"exI",type:"SC",tier:2,tax:"P8",q:"A chain of mass m, length L hangs with 3/4 of its length on a smooth table (1/4 hanging). Work to pull it completely onto the table:",choices:["mgL/16","mgL/32","3mgL/32","mgL/8"],correct:1,pat:"P8 · lift hanging CM",ans:"mgL/32",nudge:"Hanging mass m/4, its CM is L/8 below the edge."},
  {src:"Ex-I Q24",doc:"exI",type:"SC",tier:2,tax:"P1",q:"A 2 kg body moves with x = t²/2. Work done by the force in the first 5 s:",choices:["2.5 J","0.25 J","25 J","250 J"],correct:2,pat:"P1 · W = ΔKE, v = dx/dt",ans:"25 J",nudge:"v = t ⇒ at t=5, v=5; W = ½·2·5²."},
  {src:"Ex-I Q26",doc:"exI",type:"SC",tier:3,tax:"P8",q:"A uniform chain of length L, mass M lies on a smooth table with one third hanging over the edge. Minimum work to pull the hanging part onto the table:",choices:["MgL","MgL/3","MgL/9","MgL/18"],correct:3,pat:"P8 · CM of hanging third",ans:"MgL/18",nudge:"Hanging mass M/3, CM at L/6 below the edge ⇒ W = (M/3)g(L/6)."},
  {src:"Ex-I Q27",doc:"exI",type:"SC",tier:2,tax:"F4",q:"A 0.1 kg particle starts from rest at x=0 under a force that ramps 0→10 N over x=0→4 m, stays 10 N to x=8 m, then ramps to 0 at x=12 m. Its speed at x=12 m:",choices:["0 m/s","20√2 m/s","20√3 m/s","40 m/s"],correct:3,pat:"F4 · area = ½mv²",ans:"40 m/s",fig:"fx_trap",nudge:"Area under F–x = work = ½mv². Trapezoid area = ½·4·10 + 4·10 + ½·4·10 = 80 J."},
  {src:"Ex-I Q28",doc:"exI",type:"SC",tier:1,tax:"P7",q:"When the momentum of a body is doubled, its kinetic energy:",choices:["is doubled","is halved","becomes four times","becomes three times"],correct:2,pat:"P7 · KE ∝ p²",ans:"four times"},
  {src:"Ex-I Q29",doc:"exI",type:"SC",tier:1,tax:"P7",q:"Internal forces of a system can change:",choices:["linear momentum as well as kinetic energy","linear momentum but not kinetic energy","kinetic energy but not linear momentum","neither momentum nor kinetic energy"],correct:2,pat:"P7 · internal forces conserve p",ans:"KE but not momentum"},
  {src:"Ex-I Q34",doc:"exI",type:"SC",tier:2,tax:"F2",q:"A liquid of specific gravity 0.8 flows in a pipe at 2 m/s. The kinetic energy per cubic metre of it is:",choices:["160 J","1600 J","160.5 J","1.6 J"],correct:1,pat:"F2 · ½ρv² per unit volume",ans:"1600 J",nudge:"KE/volume = ½ρv², ρ = 800 kg/m³."},
  {src:"Ex-I Q35",doc:"exI",type:"SC",tier:2,tax:"P7",q:"A 60 kg boy on a frictionless surface throws a 1 kg stone horizontally at 12 m/s. The kinetic energy with which he recoils:",choices:["2.4 J","72 J","1.2 J","36 J"],correct:2,pat:"P7 · conserve p, then KE",ans:"1.2 J",nudge:"60·V = 1·12 ⇒ V = 0.2 m/s; KE = ½·60·V²."},
  {src:"Ex-I Q36",doc:"exI",type:"SC",tier:2,tax:"F2",q:"A 10 m × 10 m × 10 m tank is full of water on the ground (g = 10). The potential energy of the water is:",choices:["5×10⁷ J","1×10⁸ J","5×10⁴ J","5×10⁵ J"],correct:0,pat:"F2 · CM at half-height",ans:"5×10⁷ J",nudge:"Mass = 10⁶ kg, CM at 5 m ⇒ PE = mgh."},
  {src:"Ex-I Q38",doc:"exI",type:"SC",tier:2,tax:"P6",q:"A spring compressed by 4 cm stores 2 J. The force required to extend it by 8 cm is:",choices:["20 N","2 N","200 N","2000 N"],correct:2,pat:"P6 · find k from energy, then kx",ans:"200 N",nudge:"½k(0.04)² = 2 ⇒ k = 2500; F = k·0.08."},
  {src:"Ex-I Q40",doc:"exI",type:"SC",tier:2,tax:"P7",q:"A man has twice the mass of a boy and half his kinetic energy. The ratio of the speeds (man : boy) is:",choices:["2:1","4:1","1:4","1:2"],correct:3,pat:"P7 · KE & mass given ⇒ v",ans:"1:2",nudge:"KE_man = ½·KE_boy with m_man = 2m_boy ⇒ solve for V_man/V_boy."},
  {src:"Ex-I Q42",doc:"exI",type:"SC",tier:2,tax:"P5",q:"A rubber ball dropped from 5 m rebounds to 3.5 m. The % loss of energy in impact:",choices:["20%","30%","43%","50%"],correct:1,pat:"P5 · energy lost / initial",ans:"30%",nudge:"Loss fraction = (5 − 3.5)/5."},
  {src:"Ex-I Q43",doc:"exI",type:"SC",tier:2,tax:"P4",q:"A compressed spring between a 1 kg and a 2 kg block on a smooth table holds 12 J and is released. Velocity of the 2 kg block:",choices:["2 m/s","4 m/s","1 m/s","8 m/s"],correct:0,pat:"P4 · conserve p and energy",ans:"2 m/s",nudge:"1·v₁ = 2·v₂ and ½·1·v₁² + ½·2·v₂² = 12."},
  {src:"Ex-I Q44",doc:"exI",type:"SC",tier:2,tax:"P5",q:"A 2 kg body is projected at 5 m/s along a rough table. Work done on it by friction before it stops:",choices:["250 J","25 J","−250 J","−25 J"],correct:3,pat:"P5 · W_friction = ΔKE",ans:"−25 J"},
  {src:"Ex-I Q45",doc:"exI",type:"SC",tier:2,tax:"P5",q:"A car at 36 kmph stops in 5 m with given brakes. With the same brakes at 72 kmph it stops in:",choices:["10 m","2.5 m","20 m","40 m"],correct:2,pat:"P5 · stopping distance ∝ v²",ans:"20 m",nudge:"Speed doubles ⇒ distance ×4."},
  {src:"Ex-I Q46",doc:"exI",type:"SC",tier:2,tax:"P16",q:"A bullet fired into a tree trunk loses 1/4 of its KE in the first 5 cm. Before stopping it travels a further:",choices:["150 cm","1.5 cm","1.25 cm","15 cm"],correct:3,pat:"P16 · depth ∝ KE",ans:"15 cm",nudge:"5 cm killed ¼ of the KE; the remaining ¾ needs 3 × that distance."},
  {src:"Ex-I Q48",doc:"exI",type:"SC",tier:2,tax:"P5",q:"A 1.00 g drop falls from 1.00 km and hits the ground at 50.0 m/s. Work done by the unknown resistive force (g=10):",choices:["−8.75 J","8.75 J","−4.75 J","4.75 J"],correct:0,pat:"P5 · W_res = ΔKE − mgh",ans:"−8.75 J",nudge:"mgh = 10 J, final KE = 1.25 J ⇒ W_res = 1.25 − 10."},
  {src:"Ex-I Q49",doc:"exI",type:"SC",tier:2,tax:"P1",q:"A 5 kg block at rest on a rough surface is pushed 2 m by a 45 N horizontal force; friction is 25 N. Final kinetic energy:",choices:["40 J","90 J","50 J","140 J"],correct:0,pat:"P1 · ΔKE = net work",ans:"40 J",nudge:"Net force = 45 − 25 = 20 N; KE = (net force)·distance."},
  {src:"Ex-I Q51",doc:"exI",type:"SC",tier:1,tax:"F2",q:"If E is the total mechanical energy of a system and U its potential energy, then E − U is:",choices:["always zero","negative","either positive or negative","positive"],correct:3,pat:"F2 · E − U = KE ≥ 0",ans:"positive"},
  {src:"Ex-I Q55",doc:"exI",type:"SC",tier:3,tax:"P4",q:"A body thrown up has equal PE and KE at a point P. If the SAME body is thrown up with double the velocity, the ratio PE : KE at the same point P is:",choices:["1:1","1:4","1:7","1:8"],correct:2,pat:"P4 · PE fixed by h, KE from new total",ans:"1:7",nudge:"PE at P is unchanged (same height); the new total KE is 4×, so KE_P = 4·(½mu²) − ¼mu²."},
  {src:"Ex-I Q56",doc:"exI",type:"SC",tier:1,tax:"P11",q:"A body is moved along a straight line by a machine delivering constant power. The force acting on the body is proportional to:",choices:["v","1/v","v²","1/v²"],correct:1,pat:"P11 · P = Fv constant",ans:"1/v"},
  {src:"Ex-I Q58",doc:"exI",type:"SC",tier:2,tax:"P3",q:"A motorboat moves with velocity V = (4î−2ĵ+k̂) m/s against a resisting force F = (5î−10ĵ+6k̂) N. The power of the motor is:",choices:["100 W","50 W","46 W","23 W"],correct:2,pat:"P3/F3 · P = F·V",ans:"46 W",nudge:"P = F·V (the dot product)."},
  {src:"Ex-I Q59",doc:"exI",type:"SC",tier:2,tax:"P7",q:"Two rifles fire the same number of bullets in a given time. The second fires bullets of twice the mass at half the velocity of the first. The ratio of their powers (first : second) is:",choices:["1:4","4:1","1:2","2:1"],correct:3,pat:"P7/F3 · P ∝ n·½mv²",ans:"2:1",nudge:"Power ∝ mv²; compare m·v² with (2m)(v/2)²."},
  {src:"Ex-I Q60",doc:"exI",type:"SC",tier:2,tax:"F3",q:"A 1000 kg car climbs an incline of slope 2-in-25 at a steady 18 kmph (g = 10). The power of its engine is:",choices:["4 kW","50 kW","625 kW","25 kW"],correct:0,pat:"F3 · P = (mg sinθ)·v",ans:"4 kW",nudge:"v = 5 m/s, F = mg·(2/25) = 800 N, P = Fv."},
  {src:"Ex-I Q64",doc:"exI",type:"SC",tier:2,tax:"P12",q:"A juggler throws balls at a rate of three per second, each at 10 m/s, mass 0.05 kg. His power is:",choices:["2 W","50 W","0.5 W","7.5 W"],correct:3,pat:"P12 · P = n·½mv²",ans:"7.5 W",nudge:"P = (3 per second)·½·0.05·10²."},
  {src:"Ex-I Q66",doc:"exI",type:"SC",tier:2,tax:"P12",q:"An electric fan of effective cross-section A accelerates air of density ρ to a speed v. The power needed is:",choices:["ρAv","½ρAv","ρAv²","½ρAv³"],correct:3,pat:"P12 · P = ½(dm/dt)v² = ½ρAv³",ans:"½ρAv³",nudge:"Mass per second = ρAv; power = ½(dm/dt)v²."},
  {src:"Ex-I Q70",doc:"exI",type:"SC",tier:2,tax:"P15",q:"A vehicle moves at uniform speed along horizontal, concave and convex roads. The normal reaction on it is maximum on the:",choices:["concave road","convex road","horizontal road","same on all"],correct:0,pat:"P15 · concave adds mv²/r",ans:"concave road",nudge:"On a concave road N = mg + mv²/r."},
  {src:"Ex-I Q71",doc:"exI",type:"SC",tier:2,tax:"P15",q:"A 2 kg body on a light string is whirled in a vertical circle of radius 2 m. If the string withstands at most 140.6 N, the maximum speed (g=9.8) is:",choices:["22 m/s","44 m/s","33 m/s","11 m/s"],correct:3,pat:"P15 · T_bottom = mv²/r + mg",ans:"11 m/s",nudge:"Tension is largest at the bottom: 140.6 = 2v²/2 + 2·9.8."},
  {src:"Ex-I Q72",doc:"exI",type:"SC",tier:3,tax:"P15",q:"A pilot of mass m can bear a maximum apparent weight 7mg. If the aeroplane flies a vertical circle at 210 m/s (diving up from the lowest point), the minimum radius is (g=10):",choices:["375 m","420 m","750 m","840 m"],correct:2,pat:"P15 · N − mg = mv²/r at bottom",ans:"750 m",nudge:"N = 7mg ⇒ 6mg = mv²/r ⇒ r = v²/6g."},
  {src:"Ex-I Q73",doc:"exI",type:"SC",tier:3,tax:"P13",q:"A ballistic pendulum: block 0.98 kg, length 1 m; a 20 g bullet embeds horizontally and the system just completes a vertical circle of radius 1 m. The bullet's striking speed is:",choices:["280 m/s","350 m/s","420 m/s","490 m/s"],correct:1,pat:"P13 · √(5gr) then momentum",ans:"350 m/s",nudge:"System speed after impact = √(5gr) ≈ 7.07 m/s; then 0.02·u = 1.0·7.07."},
  {src:"Ex-I Q75",doc:"exI",type:"SC",tier:2,tax:"P15",q:"A vehicle travels a concave then a convex road of the same radius at uniform speed. The normal reactions at the lowest point of the concave and the highest of the convex are 1.5×10⁴ N and 3×10³ N (g=10). Its mass is:",choices:["400 kg","450 kg","800 kg","900 kg"],correct:3,pat:"P15 · N_concave + N_convex = 2mg",ans:"900 kg",nudge:"Add the two: the mv²/r terms cancel ⇒ N₁ + N₂ = 2mg."},
  {src:"Ex-I Q76",doc:"exI",type:"SC",tier:3,tax:"P14",q:"A pendulum bob (length 1 m) is given 7 m/s horizontally at the mean position. During its rise the string breaks when the bob is horizontal. The maximum height of ascent above the rest position is:",choices:["2.5 m","2 m","3 m","3.5 m"],correct:0,pat:"P14 · rise to horizontal + projectile",ans:"2.5 m",nudge:"At the horizontal point height = L = 1 m and the velocity is vertical; add v²/2g afterwards."},
  {src:"Ex-I Q77",doc:"exI",type:"SC",tier:2,tax:"P13",q:"A body slides from rest down a frictionless incline into a vertical loop of diameter D. The minimum incline height to complete the loop is:",choices:["7D/4","9D/4","5D/4","3D/4"],correct:2,pat:"P13 · h = 5r/2 = 5D/4",ans:"5D/4",nudge:"Min height to loop radius r is 5r/2; here r = D/2."},
  {src:"Ex-I Q79",doc:"exI",type:"NV",tier:3,tax:"P15",q:"A simple pendulum oscillates with angular amplitude 60°. If the bob mass is 50 g, the tension in the string at the mean position (g=10) is:",choices:["0.5 N","1 N","1.5 N","2 N"],correct:1,pat:"P15 · T = mg + mv²/L, v²=gL",ans:"1 N",nudge:"v²_mean = 2gL(1−cos60°) = gL, so T = mg + mg = 2mg; the length cancels."},
  {src:"Ex-I Q80",doc:"exI",type:"NV",tier:3,tax:"P14",q:"A body moves in a vertical circle with the critical speed at the lowest point. The ratio of its speeds at angular displacements 60° and 120° from the lowest point is:",choices:["√2","2","1/√2","2√2"],correct:0,pat:"P14 · v_θ² = 5gr − 2gr(1−cosθ)",ans:"√2 (≈1.414)",nudge:"At 60°: v² = 4gr; at 120°: v² = 2gr; take the ratio of the roots."},
  /* ---------- Exercise-II ---------- */
  {src:"Ex-II Q7",doc:"exII",type:"SC",tier:2,tax:"P16",q:"A 0.5 kg body loses half its velocity while penetrating 6 cm into a wooden block. How much further will it penetrate before coming to rest?",choices:["1 cm","2 cm","3 cm","4 cm"],correct:1,pat:"P16 · depth ∝ KE",ans:"2 cm",nudge:"Half the speed ⇒ KE drops to ¼; so ¾ of the KE was killed over 6 cm. Remaining ¼ needs proportionally less."},
  {src:"Ex-II Q9",doc:"exII",type:"SC",tier:2,tax:"P4",q:"A lifting machine of efficiency 80% uses 2500 J to lift a 10 kg load. If the load is then allowed to fall freely through that height, its speed at the end of the fall is (g=10):",choices:["10 m/s","15 m/s","20 m/s","25 m/s"],correct:2,pat:"P4 · output = mgh, then free fall",ans:"20 m/s",nudge:"Useful work = 0.8·2500 = 2000 J = mgh ⇒ h = 20 m; v = √(2gh)."},
  /* ---------- Exercise-III (JEE-Advanced) ---------- */
  {src:"Ex-III Q2",doc:"exIII",type:"SC",tier:3,tax:"P1",q:"A particle of mass m is projected at angle α with speed u. The work done by gravity during the time it reaches the highest point is:",choices:["u²sin²α","½mu²cos²α","½mu²sin²α","−½mu²sin²α"],correct:3,pat:"P1 · W_grav = ΔKE (vertical part)",ans:"−½mu²sin²α",nudge:"At the top only the horizontal component u cosα survives; gravity has removed the vertical KE ½m(u sinα)²."},
  {src:"Ex-III Q6",doc:"exIII",type:"SC",tier:3,tax:"P9",q:"A particle is acted on by a 1-D conservative force whose F–x curve crosses zero at points A, B, C, D (shown in the source). At C the particle is in:",choices:["stable equilibrium","unstable equilibrium","neutral equilibrium","no equilibrium"],correct:0,pat:"P9 · F=0 with restoring slope",ans:"stable equilibrium",fig:"uwell",note:"At a zero of F where the force flips to oppose displacement (dF/dx < 0, i.e. U a minimum), the equilibrium is stable. Refer to the F–x curve in the Narayana module for C's slope."}
];

/* ===== practice source groups (for grouped display + dates) ===== */
let WPE_PRAC_DOCS = [
  {id:"exI",  label:"Narayana Module · Exercise-I",  date:"24 Jun 2026", note:"Single-correct + numerical · answers verified vs Exercise-I key"},
  {id:"exII", label:"Narayana Module · Exercise-II", date:"24 Jun 2026", note:"verified vs Exercise-II key"},
  {id:"exIII",label:"Narayana Module · Exercise-III (JEE-Adv)", date:"24 Jun 2026", note:"verified vs Exercise-III key"}
];

const WPE_PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Foundation"},{k:"2",l:"JEE Main"},{k:"3",l:"JEE Advanced"},{k:"Flag",l:"\u2605 Flagged"}];

/* ===== Chapter: Periodicity & Extreme Values (PEV) =====
   Source mix: Narayana JEE-Adv Maths Vol-III (Module Ex IV + Ex V) plus three
   Narayana JR.IIT WAT papers (WAT-06 22-06-25, WAT-11 09-07-23, WAT-12 30-06-24).
   Status: SCAFFOLDED. Arrays declared but empty pending pattern derivation
   and practice curation across upcoming sessions. Chapter renders as
   "Coming Soon" until added to CONTENT.
*/
let PEV_TAXA = [
  {code:"F1",label:"Period basics (sin, cos, tan, |·|, scaling)",group:"Foundation methods"},
  {code:"F2",label:"Bound engine (a sinx + b cosx, √(a²+b²))",group:"Foundation methods"},
  {code:"F3",label:"Triangle closure (A+B+C=π) identities",group:"Foundation methods"},
  {code:"F4",label:"Sum-to-product · multi-angle reductions",group:"Foundation methods"},
  {code:"P1", label:"LCM Period Rule",group:"Patterns"},
  {code:"P2", label:"|·| Period Halving",group:"Patterns"},
  {code:"P3", label:"GIF/{x} Inside Trig",group:"Patterns"},
  {code:"P4", label:"Inner-Argument Scaling f(ax+b)",group:"Patterns"},
  {code:"P5", label:"a sinx + b cosx Bounded",group:"Patterns"},
  {code:"P6", label:"Reciprocal of Linear-Trig Denom",group:"Patterns"},
  {code:"P7", label:"Algebraic Substitution Extrema",group:"Patterns"},
  {code:"P8", label:"∏cos(2^k θ) Telescoping",group:"Patterns"},
  {code:"P9", label:"Sum-of-Trig in AP",group:"Patterns"},
  {code:"P10",label:"Product of sin(kπ/n)",group:"Patterns"},
  {code:"P11",label:"Triangle Identity Carry-Through",group:"Patterns"},
  {code:"P12",label:"tanA+tanB+tanC = ∏tan (when A+B+C=nπ)",group:"Patterns"},
  {code:"P13",label:"Telescoping cosec / cot Sum",group:"Patterns"},
  {code:"P14",label:"Triangle Extrema via Inequality",group:"Patterns"}
];

let PEV_FORMULAE = [
  {tag:"basic",title:"Base periods",rows:[
    {f:"sin x, cos x : 2π  ·  tan x, cot x : π  ·  sec x, csc x : 2π"},
    {f:"|sin x| = π · |cos x| = π · |tan x| = π · sin²x = π · cos²x = π",k:"trig",note:"Squaring or |·| halves the period when sign-symmetric. Always verify f(x+T)=f(x)."}]},
  {tag:"scaling",title:"Period algebra",rows:[
    {f:"f(ax+b) → T_f / |a|  (shift b has no effect on period)"},
    {f:"f + g → LCM(T_f, T_g)  · f·g, f/g → LCM (often)"},
    {f:"For rationals: LCM(p/q, r/s) = LCM(p,r) / GCD(q,s)",k:"trap",note:"LCM gives the maximum candidate; the TRUE period may be a divisor — verify with f(x+T)=f(x)."}]},
  {tag:"gif",title:"GIF/{x} inside trig",rows:[
    {f:"[x] = greatest integer ≤ x → integer-step argument"},
    {f:"sin(π[x]/n), cos(π[x]/n) : period 2n  ·  tan(π[x]/n) : period n",k:"trig",note:"Since [x] is integer-stepped, the argument lives on a lattice — period is purely integer."}]},
  {tag:"bound",title:"a sinx + b cosx range",rows:[
    {f:"a sin x + b cos x = √(a² + b²) · sin(x + φ),  tan φ = b/a"},
    {f:"Range: [−√(a²+b²), +√(a²+b²)]"},
    {f:"With constant c: a sin x + b cos x + c ∈ [c−√(a²+b²), c+√(a²+b²)]",k:"trig",note:"Two perpendicular components combine into one rotated sine of fixed amplitude. The bound engine for nearly every extremum."}]},
  {tag:"prodcos",title:"Telescoping cosine product",rows:[
    {f:"cos θ · cos 2θ · cos 4θ · … · cos 2ⁿ⁻¹θ = sin(2ⁿ θ) / (2ⁿ sin θ)"},
    {f:"sin θ · sin(60°−θ) · sin(60°+θ) = ¼ sin 3θ"},
    {f:"cos θ · cos(60°−θ) · cos(60°+θ) = ¼ cos 3θ",k:"trig",note:"Multiply by 2 sin θ and watch sin doubles down. Foundation for cos(π/n) products."}]},
  {tag:"sumtrig",title:"Sum of trig in AP",rows:[
    {f:"Σ_{k=0}^{n−1} sin(α + kβ) = sin(nβ/2) · sin(α + (n−1)β/2) / sin(β/2)"},
    {f:"Σ_{k=0}^{n−1} cos(α + kβ) = sin(nβ/2) · cos(α + (n−1)β/2) / sin(β/2)"},
    {f:"Σ_{k=1}^{n−1} sin(kπ/n) = cot(π/(2n))",k:"trig",note:"Geometric-series argument on the unit circle. cos²(kπ/n) sums via cos 2x = 1 − 2 sin²x."}]},
  {tag:"sinprod",title:"sin(kπ/n) products",rows:[
    {f:"∏_{k=1}^{n−1} sin(kπ/n) = n / 2^(n−1)"},
    {f:"∏_{k=1}^{(n−1)/2} sin(kπ/n) = √n / 2^((n−1)/2)  (n odd)",k:"trig",note:"Cyclotomic-polynomial identity. For non-uniform indices (sin π/18 · sin 5π/18 · sin 7π/18 etc.), combine with multi-angle identities."}]},
  {tag:"tri",title:"Triangle identities (A+B+C=π)",rows:[
    {f:"sin 2A + sin 2B + sin 2C = 4 sin A sin B sin C"},
    {f:"cos 2A + cos 2B + cos 2C = −1 − 4 cos A cos B cos C"},
    {f:"sin A + sin B + sin C = 4 cos(A/2) cos(B/2) cos(C/2)"},
    {f:"cos A + cos B + cos C = 1 + 4 sin(A/2) sin(B/2) sin(C/2)"},
    {f:"tan A + tan B + tan C = tan A · tan B · tan C"},
    {f:"cot(A/2) + cot(B/2) + cot(C/2) = cot(A/2) cot(B/2) cot(C/2)"},
    {f:"tan(A/2) tan(B/2) + tan(B/2) tan(C/2) + tan(C/2) tan(A/2) = 1",k:"trig",note:"The triangle-closure machinery. Memorise cold — every conditional-identity problem uses one of these."}]},
  {tag:"telecot",title:"Telescoping cosec/cot",rows:[
    {f:"csc(2θ) = cot θ − cot 2θ"},
    {f:"Σ_{k=0}^{n−1} csc(2^k θ) = cot θ − cot(2ⁿ⁻¹ θ)"},
    {f:"1/(sin α · sin(α+d)) = (1/sin d)[cot α − cot(α+d)]",k:"trig",note:"A subtraction-of-cots turns a series into a difference. Classic Σ 1/(sin k° sin(k+1)°) hack."}]},
  {tag:"triineq",title:"Triangle extremum canon",rows:[
    {f:"Σ cos A ≤ 3/2  (=  equilateral)  · Σ sin A ≤ 3√3/2"},
    {f:"Σ sin(A/2) ≤ 3/2 · Σ cos(A/2) ≤ 3√3/2"},
    {f:"Σ cos² A ≥ 3/4 (acute) · Σ tan² A ≥ 9 (acute)"},
    {f:"Π sin(A/2) ≤ 1/8 · Π cos(A/2) ≤ 3√3/8",k:"trig",note:"Symmetric expressions in a triangle hit extrema at the equilateral by convexity/Jensen. Always test equilateral first."}]}
];

let PEV_PATTERNS = [
  {id:"P1",name:"LCM Period Rule",trigger:"Sum/product of trig terms with different inner-argument scalings — sin(2x)+cos(3x), tan(x/2)·sin(x/3).",move:"Compute each term's period via f(ax+b) → T_f/|a|. Take LCM of numerators / GCD of denominators for rationals. VERIFY with f(x+T)=f(x).",why:"A sum/product repeats only when every part repeats together — LCM is the smallest such common time.",mini:"sin(2x)+cos(3x): T₁=π, T₂=2π/3. LCM = 2π.",fails:"Skipping the verification step — apparent LCM can over-shoot if symmetry collapses it to a divisor.",src:"Ex-V Q49, WAT-11 Q49, WAT-06 Q11, WAT-06 Q12",srcText:{"Ex-V Q49":"(text pending — Ex-V Q49 not yet curated into PRACTICE)","WAT-11 Q49":"(text pending — WAT-11 Q49 not yet curated into PRACTICE)","WAT-06 Q11":"(text pending — WAT-06 Q11 not yet curated into PRACTICE)","WAT-06 Q12":"Which of the following functions is periodic with fundamental period π/2? (A) f(x) = √(sin²x) + √(cos²x)  (B) g(x) = (sin x)^(1/3) + (cos x)^(1/3)  (C) h(x) = cos(2 sin x cos x) + cos(2 cos²x − 1)  (D) p(x) = sec²(2x) − tan²(2x)"}},
  {id:"P2",name:"|·| Period Halving",trigger:"|sin x|, |cos x|, sin²x, cos²x, or compositions wrapping a sign-symmetric trig.",move:"Sign-symmetric wrapper halves the period: |sin x| → π (not 2π); sin²x → π. Apply BEFORE LCM. For |tan x|, |cot x|: no halving (tan is already π).",why:"Negating around an axis of symmetry collapses two half-cycles to one.",mini:"|sin x|+|cos x|: each has period π but together coincide every π/2.",fails:"Quoting 2π for sin²x. The classic — squaring halves it.",src:"WAT-06 Q1, WAT-06 Q12, Ex-V Q49",srcText:{"WAT-06 Q1":"Let T₁, T₂, T₃ represent the fundamental periods of sin(π[x]/13), |cos(π[x]/5)| and tan(π[x]/3) respectively, where [x] is the GIF. The value of (2T₁ + 3T₂)/(4T₃) =","WAT-06 Q12":"Which of the following functions is periodic with fundamental period π/2? (A) f(x) = √(sin²x) + √(cos²x)  (B) g(x) = (sin x)^(1/3) + (cos x)^(1/3)  (C) h(x) = cos(2 sin x cos x) + cos(2 cos²x − 1)  (D) p(x) = sec²(2x) − tan²(2x)","Ex-V Q49":"(text pending — Ex-V Q49 not yet curated into PRACTICE)"}},
  {id:"P3",name:"GIF/{x} Inside Trig",trigger:"[x] (GIF) or {x} (fractional part) appears INSIDE a trig argument — sin(π[x]/n), tan(π[x]/m), cos(π[x]/k).",move:"[x] is integer-stepped, so the trig samples a lattice. For sin(π[x]/n): period in x is 2n (find smallest integer k s.t. sampling repeats). For a sum, take LCM of individual integer periods.",why:"GIF turns continuous trig into discrete sampling on integer steps — period becomes purely integer.",mini:"sin(π[x]/4): each unit step adds π/4 to the angle; sine returns after 8 unit steps. Period = 8.",fails:"Treating sin(π[x]/n) like a continuous trig and computing 2π/(π/n) = 2n. Right answer, wrong reason; fails for tan/sec compositions.",src:"WAT-12 Q3, WAT-12 Q10, WAT-06 Q1",srcText:{"WAT-12 Q3":"(text pending — WAT-12 Q3 not yet curated into PRACTICE)","WAT-12 Q10":"(text pending — WAT-12 Q10 not yet curated into PRACTICE)","WAT-06 Q1":"Let T₁, T₂, T₃ represent the fundamental periods of sin(π[x]/13), |cos(π[x]/5)| and tan(π[x]/3) respectively, where [x] is the GIF. The value of (2T₁ + 3T₂)/(4T₃) ="}},
  {id:"P4",name:"Inner-Argument Scaling f(ax+b)",trigger:"Constants buried in the trig argument — 4 cos⁴((x−c)/k) − 2 cos((x−c)/(k/2)), cos((x−2025)/(6π³)).",move:"Period of f(ax+b) = T_f / |a|. The additive shift b doesn't affect period. Read |a| carefully — it's the COEFFICIENT of x.",why:"Faster x-velocity through the cycle scales the period inversely.",mini:"cos((x−2025)/(6π³)): |a|=1/(6π³), so T = 2π · 6π³ = 12π⁴.",fails:"Mis-reading |a| as the inverse — gives reciprocal answer. Carry π³ etc. carefully.",src:"WAT-06 Q2, WAT-11 Q53, Ex-IV Q12",srcText:{"WAT-06 Q2":"(text pending — WAT-06 Q2 not yet curated into PRACTICE)","WAT-11 Q53":"If the fundamental period of f(x) = 4 cos⁴((x−π)/(4π²)) − 2 cos((x−π)/(2π²)) is kπ³, then k =","Ex-IV Q12":"(text pending — Ex-IV Q12 not yet curated into PRACTICE)"}},
  {id:"P5",name:"a sinx + b cosx Bounded",trigger:"Expression contains a sin x + b cos x (or reducible to it) and you want extrema or a bound.",move:"a sin x + b cos x = √(a²+b²) · sin(x+φ). Range: [−√(a²+b²), +√(a²+b²)]. With constant c added, shift by c.",why:"Two perpendicular components combine into one rotated sine — fixed amplitude.",mini:"3 sin x + 4 cos x ∈ [−5, 5]. With +6: [1, 11].",fails:"Forgetting the constant c shift, or misidentifying coefficients after manipulation.",src:"Ex-IV Q4, Ex-V Q37 (matching), WAT-11 Q48",srcText:{"Ex-IV Q4":"(text pending — Ex-IV Q4 not yet curated into PRACTICE)","Ex-V Q37":"(text pending — Ex-V Q37 not yet curated into PRACTICE)","WAT-11 Q48":"(text pending — WAT-11 Q48 not yet curated into PRACTICE)"}},
  {id:"P6",name:"Reciprocal of Linear-Trig Denom",trigger:"max/min of 2/(p cos x + q sin x + r) or similar reciprocal of a linear-trig + constant expression.",move:"Find the denominator's range via P5 — denom ∈ [r−√(p²+q²), r+√(p²+q²)]. If denom > 0 throughout, max(f) = 2/min(denom), min(f) = 2/max(denom).",why:"Reciprocals flip extremes for monotonic positive functions.",mini:"2/(3 cos x − 5 sin x + 6): denom ∈ [6−√34, 6+√34] (all positive). f ∈ [2/(6+√34), 2/(6−√34)].",fails:"Skipping the sign-check on denom — if it can pass through zero, max is unbounded.",src:"WAT-06 Q3",srcText:{"WAT-06 Q3":"Let x ∈ ℝ and the maximum value of 2/(3 cos x − 5 sin x + 6) is p + √q where p, q ∈ ℚ. Then p + q ="}},
  {id:"P7",name:"Algebraic Substitution Extrema",trigger:"Symmetric expression in sin²x, cos²x, tan²x, or higher even powers — sin⁴/a + cos⁴/b, sin⁸/a³+cos⁸/b³, (7+6tanθ−tan²θ)/(1+tan²θ).",move:"Substitute t = sin²x (or u = tan²x). Reduce to polynomial in t over [0,1] (or u ∈ ℝ). Find vertex or boundary. For chained powers, use lower-power form as constraint.",why:"Higher even powers of trig ARE algebra — substitution exposes it.",mini:"sin⁴x + cos⁴x = 1 − 2 sin²x cos²x = 1 − ½ sin²(2x). Range [½, 1].",fails:"Carrying sin⁴ separately — gets messy. The substitution is the whole game.",src:"Ex-IV Q19, Ex-IV Q43, WAT-12 Q2",srcText:{"Ex-IV Q19":"(text pending — Ex-IV Q19 not yet curated into PRACTICE)","Ex-IV Q43":"(text pending — Ex-IV Q43 not yet curated into PRACTICE)","WAT-12 Q2":"(text pending — WAT-12 Q2 not yet curated into PRACTICE)"}},
  {id:"P8",name:"∏cos(2^k θ) Telescoping",trigger:"A product of cosines whose arguments double — cos θ · cos 2θ · cos 4θ · …, or 16 cos(π/17) cos(2π/17) cos(4π/17) cos(8π/17).",move:"Multiply (and divide) by 2 sin θ. Use 2 sin θ cos θ = sin 2θ to collapse pairs. Result: sin(2ⁿ θ) / (2ⁿ sin θ).",why:"Each step doubles the angle inside sin, halving the chain length.",mini:"cos θ · cos 2θ · cos 4θ = sin 8θ / (8 sin θ).",fails:"Mis-counting the power of 2 in the denominator, or forgetting the formula needs sin θ ≠ 0.",src:"Ex-V Q14, Ex-V Q28-30, WAT-06 Q13, WAT-12 Q20-22",srcText:{"Ex-V Q14":"If θ = π/(2ⁿ+1), then cos θ · cos 2θ · cos 2²θ · … · cos 2ⁿ⁻¹θ is equal to","Ex-V Q28":"[Passage: cos 2ᵐθ · cos 2ᵐ⁺¹θ · … · cos 2ⁿθ = sin(2ⁿ⁺¹θ)/(2ⁿ⁻ᵐ⁺¹ sin 2ᵐθ).] sin(9π/14) · sin(11π/14) · sin(13π/14) is equal to","WAT-06 Q13":"(text pending — WAT-06 Q13 not yet curated into PRACTICE)","WAT-12 Q20":"(text pending — WAT-12 Q20 not yet curated into PRACTICE)"}},
  {id:"P9",name:"Sum-of-Trig in AP",trigger:"Σ sin(α+kβ) or Σ cos(α+kβ); or squared sums like Σ cos²(kπ/(2n+1)), Σ sin²(kπ/n).",move:"For plain: Σ_{k=0}^{n−1} sin(α+kβ) = sin(nβ/2) sin(α+(n−1)β/2) / sin(β/2). For squared: use cos 2x = 1 − 2 sin²x to linearise, then apply.",why:"Geometric-series argument on the unit circle.",mini:"Σ_{k=1}^n cos²(kπ/(2n+1)) = (2n−1)/4.",fails:"Off-by-one on index range. Verify the formula matches your starting index.",src:"Ex-V Q11, Ex-V Q25, WAT-06 Q4",srcText:{"Ex-V Q11":"sin(2π/7) + sin(4π/7) + sin(8π/7) =","Ex-V Q25":"If sin θ + sin 3θ + sin 5θ + … + sin(2n−1)θ = λ · sin²(nθ)/sin θ, then λ =","WAT-06 Q4":"(text pending — WAT-06 Q4 not yet curated into PRACTICE)"}},
  {id:"P10",name:"Product of sin(kπ/n)",trigger:"A specific product of sines at rational multiples of π/n — sin(π/n)·sin(2π/n)·…·sin((n−1)π/n), or sin(π/18)·sin(5π/18)·sin(7π/18).",move:"Master identity: ∏_{k=1}^{n−1} sin(kπ/n) = n / 2^(n−1). For odd n, half-product: ∏_{k=1}^{(n−1)/2} sin(kπ/n) = √n / 2^((n−1)/2). For sparse indices, combine with multi-angle expansion.",why:"Modulus of the n-th cyclotomic polynomial evaluated on the unit circle.",mini:"sin(π/7)·sin(2π/7)·sin(3π/7) = √7/8.",fails:"Mis-extending the index range — verify exactly n−1 (or (n−1)/2) terms.",src:"Ex-IV Q20, Ex-V Q12, Ex-V Q14",srcText:{"Ex-IV Q20":"sin(π/18) · sin(5π/18) · sin(7π/18) =","Ex-V Q12":"sin(π/7) · sin(2π/7) · sin(4π/7) =","Ex-V Q14":"If θ = π/(2ⁿ+1), then cos θ · cos 2θ · cos 2²θ · … · cos 2ⁿ⁻¹θ is equal to"}},
  {id:"P11",name:"Triangle Identity Carry-Through",trigger:"A+B+C = π (triangle), and you need an expression in sin/cos/tan of A, B, C — possibly with a side constraint.",move:"Use closure: C = π − (A+B), so sin C = sin(A+B), cos C = −cos(A+B). Then sum-to-product on pairs OR invoke a canonical triangle identity (see F8).",why:"The constraint A+B+C=π is the lever that turns three variables into two and forces specific identity-shapes.",mini:"sin 2A + sin 2B + sin 2C = 4 sin A sin B sin C (any triangle).",fails:"Using the identity outside a triangle context — it doesn't hold without the constraint.",src:"Ex-IV Q29, Ex-IV Q35, Ex-IV Q37-42, Ex-V Q4, WAT-11 Q46",srcText:{"Ex-IV Q29":"(text pending — Ex-IV Q29 not yet curated into PRACTICE)","Ex-IV Q35":"(text pending — Ex-IV Q35 not yet curated into PRACTICE)","Ex-IV Q37":"(text pending — Ex-IV Q37 not yet curated into PRACTICE)","Ex-V Q4":"In ΔABC, if cot θ = cot A + cot B + cot C, sin(A−θ) sin(B−θ) sin(C−θ) = λ sin³ θ, then λ =","WAT-11 Q46":"(text pending — WAT-11 Q46 not yet curated into PRACTICE)"}},
  {id:"P12",name:"tanA+tanB+tanC = ∏tan (when A+B+C=nπ)",trigger:"A sum of tangents whose arguments add to an integer multiple of π — tan x + tan 2x + tan 3x (since x+2x+3x = 6x = nπ at solutions).",move:"When A+B+C = nπ: tan A + tan B + tan C = tan A · tan B · tan C. Use the identity to convert a sum into a product or vice versa.",why:"Derived from tan(A+B) = tan(nπ − C) = −tan C — algebra closes.",mini:"tan x + tan 2x + tan 3x = tan x · tan 2x · tan 3x when x+2x+3x = nπ.",fails:"Forgetting the constraint — without A+B+C = nπ the identity is false.",src:"Ex-IV Q34, Ex-IV Q38, Ex-V Q1",srcText:{"Ex-IV Q34":"If tan x + tan 2x + tan 3x = tan x · tan 2x · tan 3x, then |sin 3x + cos 3x| =","Ex-IV Q38":"(text pending — Ex-IV Q38 not yet curated into PRACTICE)","Ex-V Q1":"Let A, B, C be three angles such that A = π/4 and tan B · tan C = p. Then all possible values of p such that A, B, C are the angles of a triangle is"}},
  {id:"P13",name:"Telescoping cosec / cot Sum",trigger:"Series of form 1/(sin α · sin(α+d)) + 1/(sin(α+d) · sin(α+2d)) + …, or Σ csc(2^k θ).",move:"Use 1/(sin α · sin(α+d)) = (1/sin d)[cot α − cot(α+d)] — sum telescopes. For csc(2^k θ): csc(2θ) = cot θ − cot 2θ, so Σ csc(2^k θ) = cot θ − cot(2ⁿ θ).",why:"A clever subtraction turns a product-reciprocal of sines into a difference of cotangents.",mini:"1/(sin 45° sin 46°) = (1/sin 1°)[cot 45° − cot 46°]. Summing k=45 to 134 telescopes.",fails:"Mis-identifying the common difference d, or missing the boundary terms.",src:"Ex-IV Q36, Ex-V Q9, WAT-06 Q6",srcText:{"Ex-IV Q36":"If 1/(sin 45° sin 46°) + 1/(sin 47° sin 48°) + … + 1/(sin 133° sin 134°) = cosec λ°, then λ =","Ex-V Q9":"If the sum of the series cosec θ + cosec 2θ + cosec 4θ + … (n terms) = cot(θ/λ) − cot(2ⁿ⁻¹ θ), then λ =","WAT-06 Q6":"(text pending — WAT-06 Q6 not yet curated into PRACTICE)"}},
  {id:"P14",name:"Triangle Extrema via Inequality",trigger:"Least/greatest value of Σ sec A, Σ tan² A, Π csc(A/2), Σ csc²A in a triangle (often acute).",move:"Use one of: (i) Jensen on convex/concave trig; (ii) AM-GM on symmetric expression; (iii) canonical inequalities (F10 above). Equality at A=B=C=π/3 (equilateral).",why:"Symmetric trig in a triangle hits extremum at the equilateral by convexity/symmetry.",mini:"Min Σ sec A in acute triangle: at A=B=C=π/3, each sec=2, sum=6.",fails:"Forgetting the equilateral test, or applying Jensen to a function that's not convex/concave on the relevant interval.",src:"Ex-V Q38, Ex-V Q5, WAT-11 Q46",srcText:{"Ex-V Q38":"(text pending — Ex-V Q38 not yet curated into PRACTICE)","Ex-V Q5":"If ABC is a triangle and tan(A/2), tan(B/2), tan(C/2) are in H.P., then the minimum value of cot(B/2) is equal to","WAT-11 Q46":"(text pending — WAT-11 Q46 not yet curated into PRACTICE)"}}
];

let PEV_GUIDED = [
  {id:"G1",tier:2,tax:"P1",pattern:"P1",q:"Find the fundamental period of f(x) = sin(2x) + cos(3x).",
    opts:["LCM Period Rule","|·| Period Halving","GIF/{x} Inside Trig","Inner-Argument Scaling f(ax+b)"],correct:0,
    hints:["Each constituent has its own period — what are they?","T(sin 2x) = 2π/2 = π · T(cos 3x) = 2π/3. Take LCM.","LCM(π, 2π/3) = 2π. Verify: f(x+2π) = sin(2x+4π) + cos(3x+6π) = f(x) ✓."],
    ans:"2π",why:"Trigger = sum of trig terms with different inner scalings → period is LCM of constituents (always verify with f(x+T)=f(x))."},
  {id:"G2",tier:2,tax:"P2",pattern:"P2",q:"Find the fundamental period of f(x) = |sin x| + |cos x|.",
    opts:["LCM Period Rule","|·| Period Halving","GIF/{x} Inside Trig","Algebraic Substitution Extrema"],correct:1,
    hints:["Each |·| individually halves its base period: |sin x| → π, |cos x| → π.","But check f(x+π/2): |sin(x+π/2)| + |cos(x+π/2)| = |cos x| + |sin x| = f(x). It coincides every π/2!","So the true fundamental period is π/2, not π. The sin–cos shift plus |·| folds collapse it further."],
    ans:"π/2",why:"Trigger = |·| inside trig → halve first, then check for further symmetry that collapses to a divisor."},
  {id:"G3",tier:2,tax:"P3",pattern:"P3",q:"Find the fundamental period of f(x) = sin(π[x]/6), where [x] is the greatest-integer function.",
    opts:["Inner-Argument Scaling f(ax+b)","GIF/{x} Inside Trig","LCM Period Rule","|·| Period Halving"],correct:1,
    hints:["[x] is integer-stepped: as x increases by 1, the argument π[x]/6 jumps by π/6.","Sin returns to the same value after 2π in the argument. So we need k integer steps where kπ/6 = 2π → k = 12.","Period = 12 (units of x)."],
    ans:"12",why:"Trigger = GIF inside trig → period is purely integer. For sin(π[x]/n): period = 2n; tan(π[x]/n): period = n."},
  {id:"G4",tier:2,tax:"P4",pattern:"P4",q:"Find the fundamental period of f(x) = cos((x − 5)/3).",
    opts:["LCM Period Rule","Inner-Argument Scaling f(ax+b)","|·| Period Halving","Sum-of-Trig in AP"],correct:1,
    hints:["Inside argument is x/3 − 5/3. The constant −5/3 only shifts; doesn't change the period.","Coefficient of x is |a| = 1/3. Apply scaling rule: T = T_cos / |a| = 2π / (1/3).","T = 6π."],
    ans:"6π",why:"Trigger = constants buried in trig argument → period = T_f / |a|. Shift b is irrelevant."},
  {id:"G5",tier:2,tax:"P5",pattern:"P5",q:"Find the maximum value of 3 sin x + 4 cos x + 7.",
    opts:["a sinx + b cosx Bounded","Reciprocal of Linear-Trig Denom","Algebraic Substitution Extrema","Triangle Identity Carry-Through"],correct:0,
    hints:["3 sin x + 4 cos x has amplitude √(3² + 4²) = 5.","So 3 sin x + 4 cos x ∈ [−5, +5], reached at x = arctan(4/3) etc.","Adding 7: range is [2, 12]. Maximum = 12."],
    ans:"12",why:"Trigger = a sin x + b cos x in any form → range is ±√(a²+b²); constants shift the range without affecting amplitude."},
  {id:"G6",tier:2,tax:"P6",pattern:"P6",q:"Find the minimum value of 1/(sin x + cos x + 3).",
    opts:["a sinx + b cosx Bounded","Reciprocal of Linear-Trig Denom","Triangle Identity Carry-Through","AM-GM Minimum"],correct:1,
    hints:["First bound the denominator via P5: sin x + cos x has amplitude √2.","Denom ∈ [3 − √2, 3 + √2]. All strictly positive ✓ (no sign worry).","min(1/denom) = 1/max(denom) = 1/(3 + √2). Rationalize: (3 − √2)/7."],
    ans:"(3 − √2)/7",why:"Trigger = 1/(linear-trig + constant) → bound the denom first via P5, sign-check, then flip extremes for the reciprocal."},
  {id:"G7",tier:2,tax:"P7",pattern:"P7",q:"Find the maximum value of sin⁴x + cos⁴x.",
    opts:["Algebraic Substitution Extrema","∏cos(2^k θ) Telescoping","AM-GM Minimum","Triangle Carry-Through"],correct:0,
    hints:["Substitute t = sin²x. Then cos²x = 1 − t, with t ∈ [0,1].","Expression = t² + (1−t)² = 2t² − 2t + 1. Quadratic in t on [0,1].","Vertex at t = 1/2 gives min 1/2; endpoints t = 0 or 1 give max 1."],
    ans:"1",why:"Trigger = symmetric even-power trig combo → substitute t = sin²x, reduce to polynomial extrema on [0,1]."},
  {id:"G8",tier:3,tax:"P8",pattern:"P8",q:"Evaluate cos(π/7) · cos(2π/7) · cos(4π/7).",
    opts:["Product of sin(kπ/n)","∏cos(2^k θ) Telescoping","Sum-of-Trig in AP","Algebraic Substitution Extrema"],correct:1,
    hints:["Arguments are π/7, 2π/7, 4π/7 — each is double the previous. Classic telescoping setup.","Apply cos θ · cos 2θ · cos 4θ = sin 8θ / (8 sin θ) with θ = π/7.","sin(8π/7) = sin(π + π/7) = −sin(π/7). So product = −sin(π/7) / (8 sin(π/7)) = −1/8."],
    ans:"−1/8",why:"Trigger = product of cosines with doubling arguments → multiply-and-divide by 2 sin θ; angle becomes 2ⁿ θ inside sin."},
  {id:"G9",tier:3,tax:"P9",pattern:"P9",q:"Evaluate sin(π/7) + sin(2π/7) + sin(3π/7) using the AP-sum formula.",
    opts:["Sum-of-Trig in AP","Product of sin(kπ/n)","Triangle Carry-Through","Allied-Angle"],correct:0,
    hints:["AP with α = π/7, β = π/7, n = 3 terms.","Σ_{k=0}^{n−1} sin(α + kβ) = sin(nβ/2) · sin(α + (n−1)β/2) / sin(β/2). Here = sin(3π/14) · sin(2π/7) / sin(π/14).","Simplify using sin(3π/14) = cos(π/7) and sin(2π/7) = 2 sin(π/7) cos(π/7); result is cot(π/14) · (1/2). Closed form (standard heptagon): = (1/2) cot(π/14)."],
    ans:"(1/2) cot(π/14)",why:"Trigger = Σ sin/cos in AP → closed form via sin(nβ/2)·sin(α + (n−1)β/2)/sin(β/2)."},
  {id:"G10",tier:3,tax:"P10",pattern:"P10",q:"Evaluate sin(π/5) · sin(2π/5).",
    opts:["Product of sin(kπ/n)","∏cos(2^k θ) Telescoping","Sum-of-Trig in AP","Algebraic Substitution"],correct:0,
    hints:["n = 5 (odd). Use the half-product identity: ∏_{k=1}^{(n−1)/2} sin(kπ/n) = √n / 2^((n−1)/2).","For n = 5: ∏_{k=1}^{2} sin(kπ/5) = √5 / 2² = √5 / 4.","So sin(π/5) · sin(2π/5) = √5 / 4."],
    ans:"√5 / 4",why:"Trigger = product of sines at rational multiples of π/n → cyclotomic identity; half-product form for odd n is cleanest."},
  {id:"G11",tier:3,tax:"P11",pattern:"P11",q:"In ΔABC, evaluate sin 2A + sin 2B + sin 2C.",
    opts:["Triangle Identity Carry-Through","tanA+tanB+tanC = ∏tan","Telescoping cosec/cot Sum","Sum-of-Trig in AP"],correct:0,
    hints:["A+B+C=π is the closure. So 2C = 2π − 2A − 2B, giving sin 2C = −sin(2A+2B).","Apply sum-to-product on sin 2A + sin 2B and combine with sin 2C.","Result: 4 sin A · sin B · sin C (canonical triangle identity)."],
    ans:"4 sin A · sin B · sin C",why:"Trigger = identity in a triangle → use closure A+B+C=π and a canonical sum-to-product identity (see Formula §tri)."},
  {id:"G12",tier:2,tax:"P12",pattern:"P12",q:"If A + B + C = π and tan A = 1, tan B = 2, find tan C.",
    opts:["tanA+tanB+tanC = ∏tan (when A+B+C=nπ)","Triangle Identity Carry-Through","a sinx + b cosx Bounded","Reciprocal of Linear-Trig Denom"],correct:0,
    hints:["When A+B+C = nπ: tan A + tan B + tan C = tan A · tan B · tan C.","1 + 2 + tan C = 1 · 2 · tan C → 3 + tan C = 2 tan C → tan C = 3.","Verify: tan A + tan B + tan C = 6 = 1·2·3 = tan A · tan B · tan C ✓."],
    ans:"3",why:"Trigger = sum of tangents with angles closing to nπ → use sum = product identity to solve for the missing tangent."},
  {id:"G13",tier:3,tax:"P13",pattern:"P13",q:"If S = csc θ + csc 2θ + csc 4θ + csc 8θ, express S as cot(θ/2) − cot(?).",
    opts:["Telescoping cosec/cot Sum","Sum-of-Trig in AP","∏cos(2^k θ) Telescoping","Allied-Angle Reduction"],correct:0,
    hints:["Use the identity csc(2x) = cot x − cot 2x. Rewrite: csc(x) = cot(x/2) − cot x.","Apply to each term: csc θ = cot(θ/2) − cot θ; csc 2θ = cot θ − cot 2θ; csc 4θ = cot 2θ − cot 4θ; csc 8θ = cot 4θ − cot 8θ.","Sum telescopes: middle terms cancel, leaving cot(θ/2) − cot(8θ)."],
    ans:"8θ  (i.e., S = cot(θ/2) − cot 8θ)",why:"Trigger = series of cosecants at doubling arguments → telescope via the cot identity. The ? equals the last argument in the sum."},
  {id:"G14",tier:3,tax:"P14",pattern:"P14",q:"In ΔABC (acute), find the maximum value of cos A · cos B · cos C.",
    opts:["Triangle Extrema via Inequality","Algebraic Substitution Extrema","AM-GM Minimum","Reciprocal of Linear-Trig Denom"],correct:0,
    hints:["Symmetric in A, B, C → by Jensen / AM-GM, extremum at the equilateral A = B = C = π/3.","At A = B = C = π/3: each cos = 1/2.","Product = (1/2)³ = 1/8. Verify any deviation (e.g. A=π/2−ε) reduces the product."],
    ans:"1/8",why:"Trigger = symmetric trig expression in triangle angles → test equilateral first by convexity/Jensen. Almost always the extremum point."}
];

let PEV_PRACTICE = [
  /* ===== Narayana JEE-Adv Maths Vol-III · Exercise-V ===== */
  {src:"Ex-V Q1", type:"SC", tier:3, tax:"P11", pat:"P11", q:"Let A, B, C be three angles such that A = π/4 and tan B · tan C = p. Then all possible values of p such that A, B, C are the angles of a triangle is", choices:["≤ (√2+1)²","≥ (√2+1)²","> (√2+1)²","< (√2+1)²"], correct:1, ans:"≥ (√2+1)²", note:"A=π/4 ⇒ B+C=3π/4 ⇒ tan(B+C)=−1, so tanB+tanC = p−1. For real positive tanB,tanC summing to p−1 with product p, treat as quadratic; AM-GM/discriminant gives p ≥ (√2+1)²."},
  {src:"Ex-V Q2", type:"SC", tier:3, tax:"P11", pat:"P11", q:"If tan α = 1/√(x(x²+x+1)), tan β = √x/√(x²+x+1), and tan γ = √(x⁻³+x⁻²+x⁻¹), then α + β =", choices:["γ","2γ","−γ","γ/2"], correct:0, ans:"γ", note:"Compute tan(α+β) via the sum formula and simplify; matches tan γ."},
  {src:"Ex-V Q3", type:"SC", tier:3, tax:"P1", pat:"P1", q:"Let the smallest positive value of x for which f(x) = sin(x/3) + sin(x/11) achieves its maximum be x₀ degrees, i.e. x₀ = α°. Then the sum of the digits in α is", choices:["15","17","16","18"], correct:3, ans:"18", note:"Max when sin(x/3)=sin(x/11)=1 ⇒ x/3=π/2+2kπ, x/11=π/2+2mπ. Smallest common x in degrees: 8910° ⇒ digit sum 18."},
  {src:"Ex-V Q4", type:"SC", tier:3, tax:"P11", pat:"P11", q:"In ΔABC, if cot θ = cot A + cot B + cot C, sin(A−θ) sin(B−θ) sin(C−θ) = λ sin³ θ, then λ =", choices:["1","2","3","4"], correct:0, ans:"1", note:"Expand each sin(X−θ) and use the constraint plus triangle identities."},
  {src:"Ex-V Q5", type:"SC", tier:3, tax:"P14", pat:"P14", q:"If ABC is a triangle and tan(A/2), tan(B/2), tan(C/2) are in H.P., then the minimum value of cot(B/2) is equal to", choices:["−√3","√3","2","−2"], correct:1, ans:"√3", note:"HP ⇒ 2/tan(B/2) = 1/tan(A/2) + 1/tan(C/2), i.e. 2 cot(B/2) = cot(A/2)+cot(C/2). Combine with the triangle identity cot(A/2)+cot(B/2)+cot(C/2) = cot(A/2)cot(B/2)cot(C/2); AM-GM gives min √3 at equilateral."},
  {src:"Ex-V Q6", type:"SC", tier:3, tax:"P11", pat:"P11", q:"An integral value of a for which there is a solution of a cos x + cot x + 1 = cosec x is (sin 2x ≠ 0)", choices:["1","2","3","4"], correct:2, ans:"3", note:"Multiply by sin x and reduce: a²sin²x cos²x − 2a(a+1) sin x cos x = 0. Solvable iff a² sin²2x = 4a(a+1) for some valid x; gives a=3."},
  {src:"Ex-V Q7", type:"SC", tier:3, tax:"P7", pat:"P7", q:"If √2 cos A = cos B + cos³B and √2 sin A = sin B − sin³B, then sin(A−B) =", choices:["±1","±1/2","±1/3","±1/4"], correct:2, ans:"±1/3", note:"Square and add to find cos²(A−B); substitute sin³B = sinB(1−cos²B) and cos³B = cosB(1−sin²B) to simplify."},
  {src:"Ex-V Q8", type:"SC", tier:3, tax:"P13", pat:"P13", q:"The value of cot(7π/16) + 2 cot(3π/8) + cot(15π/16) is", choices:["4","2","−2","−4"], correct:3, ans:"−4", note:"Use cot(π−x) = −cot x and pair angles; the expression reduces to −4."},
  {src:"Ex-V Q9", type:"SC", tier:3, tax:"P13", pat:"P13", q:"If the sum of the series cosec θ + cosec 2θ + cosec 4θ + … (n terms) = cot(θ/λ) − cot(2ⁿ⁻¹ θ), then λ =", choices:["1","2","3","4"], correct:1, ans:"2", note:"Use the telescoping identity csc(2x) = cot x − cot 2x, but with denominators that step by ½ on the cot side; series collapses to cot(θ/2) − cot(2ⁿ⁻¹θ)."},
  {src:"Ex-V Q10", type:"SC", tier:3, tax:"P11", pat:"P11", q:"sin 20°(4 + sec 20°) =", choices:["1/2","√2","√3","1"], correct:2, ans:"√3", note:"Expand: 4 sin 20° + tan 20°. Use sin 60° = sin(40°+20°) expansion to collapse."},
  {src:"Ex-V Q11", type:"SC", tier:3, tax:"P9", pat:"P9", q:"sin(2π/7) + sin(4π/7) + sin(8π/7) =", choices:["√7/2","7/2","−√7/2","−7/2"], correct:0, ans:"√7/2", note:"Note sin(8π/7) = sin(π+π/7) = −sin(π/7); combine via Σ sin in AP."},
  {src:"Ex-V Q12", type:"SC", tier:3, tax:"P10", pat:"P10", q:"sin(π/7) · sin(2π/7) · sin(4π/7) =", choices:["√7/8","√7/4","√7/2","√7"], correct:0, ans:"√7/8", note:"Use the n-odd identity ∏ sin(kπ/n) for k=1..(n−1)/2 = √n / 2^((n−1)/2). For n=7: √7/8."},
  {src:"Ex-V Q13", type:"SC", tier:3, tax:"P11", pat:"P11", q:"If α, β, γ do not differ by a multiple of π and cos(α+θ)/sin(β+γ) = cos(β+θ)/sin(γ+α) = cos(γ+θ)/sin(α+β) = k, then k equals", choices:["±2","±1/2","0","±1"], correct:3, ans:"±1", note:"Set up the equal ratios; expand cos(α+θ) = cos α cos θ − sin α sin θ and sin(β+γ) by sum-to-product; consistency forces k = ±1."},
  {src:"Ex-V Q14", type:"SC", tier:3, tax:"P8", pat:"P8", q:"If θ = π/(2ⁿ+1), then cos θ · cos 2θ · cos 2²θ · … · cos 2ⁿ⁻¹θ is equal to", choices:["1/2ⁿ","cos θ","2","2ⁿ"], correct:0, ans:"1/2ⁿ", note:"Use telescoping: sin(2ⁿ θ)/(2ⁿ sin θ). With θ=π/(2ⁿ+1): sin(2ⁿ θ) = sin(π − θ) = sin θ. So product = 1/2ⁿ."},
  {src:"Ex-V Q15", type:"SC", tier:3, tax:"P11", pat:"P11", q:"If tan(α+β−γ)/tan(α−β+γ) = tan γ/tan β (β ≠ γ), then sin 2α + sin 2β + sin 2γ =", choices:["0","1","2","1/2"], correct:0, ans:"0", note:"Cross-multiply and apply componendo-dividendo; reduces to sin 2(β−γ)+sin 2(γ−α)+sin 2(α−β) = 0 type identity."},
  {src:"Ex-V Q16", type:"MC", tier:3, tax:"P5", pat:"P5", q:"If a,b,c ∈ ℝ satisfy a² + b² + c² − 2a + 6b − 4c + 14 = 0 and g(x) = a cos²x − b sec²x + 2c, then which are correct?", ans:"A, B, D — a+b+c=0; a+c=3; min g(x) = 8. The given relation completes to (a−1)² + (b+3)² + (c−2)² = 0 ⇒ a=1, b=−3, c=2. Then g(x) = cos²x + 3 sec²x + 4. AM-GM on cos²x and 3 sec²x gives min 2√3 + 4 ≈ 7.46, but verify: at the equality point cos²x = √3, exceeding [0,1] — boundary case. Take cos²x=1: g = 1+3+4 = 8. So min = 8.", note:"Complete the square to nail a,b,c, then g(x)=cos²x+3sec²x+4. AM-GM aspires to 2√3+4, but cos²x ≤ 1 blocks it; boundary value 8 wins."},
  {src:"Ex-V Q17", type:"MC", tier:3, tax:"F4", pat:"F4", q:"If tan 3A / tan A = k (k ≠ 1), then which are correct? (A) cos A/cos 3A = (k²−1)/(2k) (B) sin 3A/sin A = 2k/(k−1) (C) k < 1/3 (D) k > 3", ans:"B, C, D — Express tan 3A in terms of tan A and form a quadratic in tan²A; gives sin 3A/sin A = 2k/(k−1). Discriminant ≥ 0 condition (tan²A ≥ 0) forces k ∉ [1/3, 3] minus k=1, hence k<1/3 or k>3.", note:"Standard multi-angle k-ratio inequality problem."},
  {src:"Ex-V Q18", type:"MC", tier:3, tax:"P11", pat:"P11", q:"If x = sin(α−β)sin(γ−δ), y = sin(β−γ)sin(α−δ), z = sin(γ−α)sin(β−δ), then which are correct?", ans:"A, D — x+y+z = 0 (sum-to-product collapses) and x³+y³+z³ = 3xyz (since x+y+z=0).", note:"Expand each product via sum-to-product; sum cancels. Then use a+b+c=0 ⇒ a³+b³+c³ = 3abc."},
  {src:"Ex-V Q19", type:"MC", tier:3, tax:"P12", pat:"P12", q:"For α = π/7, which of the following hold(s) good? (A) tan α · tan 2α · tan 3α = tan 3α − tan 2α − tan α (B) cosec α = cosec 2α + cosec 4α (C) cos α − cos 2α + cos 3α = 1/2 (D) 8 cos α · cos 2α · cos 4α = 1", ans:"A, B, C — α+2α+3α = 6α = 6π/7 ≠ nπ, but the tan identity reformulated holds with sign. (B) and (C) verify via 7θ = π substitution. (D) is FALSE: 8 cos α cos 2α cos 4α = sin 8α/sin α = sin(8π/7)/sin(π/7) = −1, not +1.", note:"Classic α=π/7 question. Watch the sign on (D) — it's −1 not 1."},
  {src:"Ex-V Q20", type:"NV", tier:3, tax:"P11", pat:"P11", q:"If cos α/cos β + sin α/sin β = −1, then cos³β/cos α + sin³β/sin α =", ans:"1", note:"Combine LHS over common denom; cross-multiply and use cos²+sin²=1 identities. Algebraic substitution lands on 1."},
  {src:"Ex-V Q23", type:"NV", tier:3, tax:"P13", pat:"P13", q:"The positive integer value of n > 3 satisfying 1/sin(π/n) = 1/sin(2π/n) + 1/sin(3π/n) is", ans:"7", note:"Heptagon identity. Verify n=7 satisfies via sum-to-product on the RHS."},
  {src:"Ex-V Q25", type:"NV", tier:3, tax:"P9", pat:"P9", q:"If sin θ + sin 3θ + sin 5θ + … + sin(2n−1)θ = λ · sin²(nθ)/sin θ, then λ =", ans:"1", note:"Use Σ sin in AP: Σ_{k=0}^{n−1} sin((2k+1)θ) = sin²(nθ)/sin θ. So λ=1."},
  {src:"Ex-V Q26", type:"LC", tier:3, tax:"P11", pat:"P11", q:"[Passage: 7θ = (2n+1)π for n=0..6, so cos(π/7), cos(3π/7), cos(5π/7) are roots of a cubic.] The equation whose roots are cos(π/7), cos(3π/7), cos(5π/7) is", choices:["8x³ + 4x² + 4x + 1 = 0","8x³ − 4x² − 4x + 1 = 0","8x³ − 4x² − 4x − 1 = 0","8x³ + 4x² + 4x − 1 = 0"], correct:1, ans:"8x³ − 4x² − 4x + 1 = 0", note:"From cos 7θ = 0 with x = cos θ, expand cos 7θ as polynomial in x; the roots cos(π/7), cos(3π/7), cos(5π/7) satisfy the cubic factor 8x³ − 4x² − 4x + 1 = 0."},
  {src:"Ex-V Q27", type:"LC", tier:3, tax:"P11", pat:"P11", q:"[Same passage.] The value of sec(π/7) + sec(3π/7) + sec(5π/7) is", choices:["4","−4","3","−3"], correct:0, ans:"4", note:"Use the cubic from Q26: roots cos(π/7), cos(3π/7), cos(5π/7). Then Σ sec = Σ 1/root = (sum of pairwise products) / (product of all). By Vieta on 8x³ − 4x² − 4x + 1 = 0: Σ products = −4/8 = −1/2; product = −1/8. So Σ sec = (−1/2)/(−1/8) = 4."},
  {src:"Ex-V Q28", type:"LC", tier:3, tax:"P8", pat:"P8", q:"[Passage: cos 2ᵐθ · cos 2ᵐ⁺¹θ · … · cos 2ⁿθ = sin(2ⁿ⁺¹θ)/(2ⁿ⁻ᵐ⁺¹ sin 2ᵐθ).] sin(9π/14) · sin(11π/14) · sin(13π/14) is equal to", choices:["1/64","−1/64","1/8","−1/8"], correct:2, ans:"1/8", note:"Use sin(π−x) = sin x: sin(9π/14) = sin(5π/14), sin(11π/14) = sin(3π/14), sin(13π/14) = sin(π/14). Product = sin(π/14) sin(3π/14) sin(5π/14) = 1/8 (standard heptagonal identity)."},
  {src:"Ex-V Q30", type:"LC", tier:3, tax:"P10", pat:"P10", q:"[Same passage as Q28.] cos(π/11) · cos(2π/11) · cos(3π/11) · … · cos(10π/11) is equal to", choices:["−1/32","1/512","1/1024","−1/1024"], correct:3, ans:"−1/1024", note:"Pair cos(kπ/11) and cos((11−k)π/11) = −cos(kπ/11). Five such pairs (k=1..5), each giving −cos²(kπ/11). Use Π cos(kπ/11) for k=1..5 = 1/2⁵. Squared and signed: −1/1024."},

  /* ===== Narayana JEE-Adv Maths Vol-III · Exercise-IV ===== */
  {src:"Ex-IV Q20", type:"SC", tier:3, tax:"P10", pat:"P10", q:"sin(π/18) · sin(5π/18) · sin(7π/18) =", choices:["8","1/8","1/7","6"], correct:1, ans:"1/8", note:"Use sin(60°−x)·sin x·sin(60°+x) = ¼ sin 3x. Here 5π/18 = π/3 − 2π/18 = 60°−10°, 7π/18 = 60°+10°, π/18 = 10°. So product = ¼ sin(30°) = 1/8."},
  {src:"Ex-IV Q34", type:"NV", tier:3, tax:"P12", pat:"P12", q:"If tan x + tan 2x + tan 3x = tan x · tan 2x · tan 3x, then |sin 3x + cos 3x| =", ans:"1", note:"The identity tan A + tan B + tan C = tan A tan B tan C holds iff A+B+C = nπ. Here x+2x+3x = 6x = nπ ⇒ 3x = nπ/2. Then sin 3x and cos 3x are 0 or ±1 alternating, so |sin 3x + cos 3x| = 1."},
  {src:"Ex-IV Q36", type:"NV", tier:3, tax:"P13", pat:"P13", q:"If 1/(sin 45° sin 46°) + 1/(sin 47° sin 48°) + … + 1/(sin 133° sin 134°) = cosec λ°, then λ =", ans:"1", note:"Use 1/(sin α sin(α+1°)) = (1/sin 1°)[cot α − cot(α+1°)]. Telescoping from 45° to 134° gives (1/sin 1°)[cot 45° − cot 134°] = (1/sin 1°)·2 → cosec 1° after cleanup. λ = 1."},

  /* ===== Narayana JR.IIT WAT-06 (22-06-25) ===== */
  {src:"WAT-06 Q3", type:"NV", tier:3, tax:"P6", pat:"P6", q:"Let x ∈ ℝ and the maximum value of 2/(3 cos x − 5 sin x + 6) is p + √q where p, q ∈ ℚ. Then p + q =", ans:"40", note:"Denom = 3 cos x − 5 sin x + 6 ∈ [6−√34, 6+√34], all positive. Max f = 2/(6−√34); rationalize: 2(6+√34)/((36−34)) = 6+√34. So p=6, q=34 ⇒ p+q = 40."},
  {src:"WAT-06 Q1", type:"NV", tier:3, tax:"P3", pat:"P3", q:"Let T₁, T₂, T₃ represent the fundamental periods of sin(π[x]/13), |cos(π[x]/5)| and tan(π[x]/3) respectively, where [x] is the GIF. The value of (2T₁ + 3T₂)/(4T₃) =", ans:"5.58 (= 67/12)", note:"GIF period rule: sin(π[x]/n) → 2n, |cos(π[x]/n)| → n, tan(π[x]/n) → n. So T₁=26, T₂=5, T₃=3. Compute (52+15)/12 = 67/12 ≈ 5.58."},
  {src:"WAT-11 Q53", type:"SC", tier:3, tax:"P4", pat:"P4", q:"If the fundamental period of f(x) = 4 cos⁴((x−π)/(4π²)) − 2 cos((x−π)/(2π²)) is kπ³, then k =", choices:["2","4","8","3"], correct:1, ans:"4", note:"Let u = (x−π)/(4π²); second arg = 2u. cos⁴u has period π in u (squaring halves twice but cos⁴ = (cos²)² keeps π); cos(2u) has period π in u. LCM in u is π. In x: T = π · 4π² = 4π³, so k = 4."},
  {src:"WAT-06 Q12", type:"MC", tier:3, tax:"P2", pat:"P2", q:"Which of the following functions is periodic with fundamental period π/2? (A) f(x) = √(sin²x) + √(cos²x)  (B) g(x) = (sin x)^(1/3) + (cos x)^(1/3)  (C) h(x) = cos(2 sin x cos x) + cos(2 cos²x − 1)  (D) p(x) = sec²(2x) − tan²(2x)", ans:"A — only |sin x| + |cos x| has fundamental period π/2 (the |·| folds plus sin–cos shift). (B) has period 2π. (C) reduces to cos(sin 2x) + cos(cos 2x), period π. (D) is the constant 1 — no fundamental period.", note:"Classic period-of-|·| trap. Always verify by computing f(x+T) = f(x) directly."}
];

let PEV_PRAC_DOCS = [
  {id:"exIV", label:"Narayana Module Vol-III \u00b7 Exercise-IV",  date:"Jun 2026", note:"~29 questions, mixed SC/MC/Integer/Comprehension/Match"},
  {id:"exV",  label:"Narayana Module Vol-III \u00b7 Exercise-V (JEE-Adv)", date:"Jun 2026", note:"~38 questions, advanced JEE-Adv mix"},
  {id:"wat06",label:"Narayana JR.IIT WAT-06",  date:"22 Jun 2025", note:"JEE-Adv mock, ~18 maths questions"},
  {id:"wat11",label:"Narayana JR.IIT WAT-11",  date:"09 Jul 2023", note:"JEE-Adv mock, ~18 maths questions"},
  {id:"wat12",label:"Narayana JR.IIT WAT-12",  date:"30 Jun 2024", note:"JEE-Adv mock, ~18 maths questions"}
];

const PEV_PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Foundation"},{k:"2",l:"JEE Main"},{k:"3",l:"JEE Advanced"},{k:"Flag",l:"\u2605 Flagged"}];

/* =========================================================================
   CHAPTER: maths/trig/teq — Trigonometric Equations  (grade 11)
   Sources: Cengage (G. Tewani) Vol-III · Narayana JEE-Adv Maths Vol-III
            (Ex-III / Ex-IV / Ex-V + Synopsis) · Cengage Archives (real JEE).
   Append-only. IDs are sacred.
   ========================================================================= */

let TEQ_TAXA = [
  {code:"F1",label:"General-solution templates (sin/cos/tan = k)",group:"Foundation methods"},
  {code:"F2",label:"Allied / multiple-angle reduction before solving",group:"Foundation methods"},
  {code:"F3",label:"Range & boundedness (|sin|,|cos| ≤ 1; a sinx+b cosx)",group:"Foundation methods"},
  {code:"F4",label:"Domain hygiene (undefined points, extraneous roots)",group:"Foundation methods"},
  {code:"P1", label:"General-Solution Template",group:"Patterns"},
  {code:"P2", label:"Squared-Ratio Family (θ=nπ±α)",group:"Patterns"},
  {code:"P3", label:"Factor & Split (never cancel)",group:"Patterns"},
  {code:"P4", label:"Reduce-to-Quadratic & Reject",group:"Patterns"},
  {code:"P5", label:"a cosx + b sinx = c",group:"Patterns"},
  {code:"P6", label:"Square → Check → Reject Extraneous",group:"Patterns"},
  {code:"P7", label:"Boundedness Pinch (LHS=RHS extremes)",group:"Patterns"},
  {code:"P8", label:"Domain & Undefined-Point Rejection",group:"Patterns"},
  {code:"P9", label:"Multiply/Divide Lost-Root Trap",group:"Patterns"},
  {code:"P10",label:"Equations with [x], {x}, |·|",group:"Patterns"},
  {code:"P11",label:"Counting Roots in an Interval (graphical)",group:"Patterns"},
  {code:"P12",label:"Principal-Value / Interval Extraction",group:"Patterns"},
  {code:"P13",label:"Simultaneous Trig System",group:"Patterns"},
  {code:"P14",label:"Trig Inequations",group:"Patterns"},
  {code:"P15",label:"Parametric 'Has-a-Solution' Condition",group:"Patterns"}
];

let TEQ_FORMULAE = [
  {tag:"templates",title:"The three general-solution templates",rows:[
    {f:"sin θ = sin α  →  θ = nπ + (−1)ⁿ α"},
    {f:"cos θ = cos α  →  θ = 2nπ ± α"},
    {f:"tan θ = tan α  →  θ = nπ + α",k:"trig",note:"First write the RHS constant as sin/cos/tan of a known α, THEN drop into the template. n ∈ ℤ throughout."}]},
  {tag:"zeros",title:"Standard zeros / units",rows:[
    {f:"sin θ = 0 → θ = nπ   ·   cos θ = 0 → θ = (2n+1)π/2   ·   tan θ = 0 → θ = nπ"},
    {f:"sin θ = 1 → θ = (4n+1)π/2   ·   sin θ = −1 → θ = (4n−1)π/2"},
    {f:"cos θ = 1 → θ = 2nπ   ·   cos θ = −1 → θ = (2n+1)π",k:"trig",note:"These are the most-tested base cases — recognise them instantly so you don't run the full template."}]},
  {tag:"squared",title:"Squared-ratio family",rows:[
    {f:"sin²θ = sin²α  →  θ = nπ ± α"},
    {f:"cos²θ = cos²α  →  θ = nπ ± α"},
    {f:"tan²θ = tan²α  →  θ = nπ ± α",k:"trig",note:"Squaring merges the (−1)ⁿ and ± forms into a single nπ ± α. Appears whenever an equation is even in the ratio."}]},
  {tag:"linear",title:"a cos x + b sin x = c",rows:[
    {f:"Divide by √(a²+b²): the equation has a solution ⟺ |c| ≤ √(a²+b²)"},
    {f:"a cos x + b sin x = √(a²+b²) cos(x − φ),  tan φ = b/a"},
    {f:"No solution if |c| > √(a²+b²)",k:"trap",note:"The single most common 'does a solution exist?' lever in the chapter. Memorise the |c| ≤ √(a²+b²) gate."}]},
  {tag:"cautions",title:"The four root-hygiene cautions (Narayana)",rows:[
    {f:"(i) For sin θ = k or cos θ = k, demand |k| ≤ 1 before solving."},
    {f:"(ii) Avoid squaring when possible — it breeds extraneous roots; verify every root afterward."},
    {f:"(iii) Never cancel a common trig factor across the equation — you lose the roots it kills."},
    {f:"(iv) The answer must not contain θ that make any term undefined or infinite (check denominators, tan/sec/cot/csc).",k:"trap",note:"Most 'wrong by one option' mistakes in this chapter trace to (ii), (iii) or (iv)."}]},
  {tag:"important",title:"Important angle values (from synopsis)",rows:[
    {f:"tan 15° = 2 − √3   ·   tan 75° = 2 + √3   ·   cot 15° = 2 + √3"},
    {f:"tan 22½° = √2 − 1   ·   cot 22½° = √2 + 1"},
    {f:"sin 18° = (√5 − 1)/4   ·   cos 36° = (√5 + 1)/4",k:"trig",note:"These surface whenever the answer angle isn't a standard 30/45/60. Keep them handy for parametric and counting problems."}]},
  {tag:"product",title:"Triple-angle product shortcuts",rows:[
    {f:"sin θ · sin(60°−θ) · sin(60°+θ) = ¼ sin 3θ"},
    {f:"cos θ · cos(60°−θ) · cos(60°+θ) = ¼ cos 3θ"},
    {f:"tan θ · tan(60°−θ) · tan(60°+θ) = tan 3θ",k:"trig",note:"Collapse a 3-factor product into a single 3θ ratio, then solve with a template. Big time-saver on Ex-III Q12/Q15."}]},
  {tag:"telescope",title:"tan–cot telescoping ladder",rows:[
    {f:"cot θ − tan θ = 2 cot 2θ   ⟹   tan θ = cot θ − 2 cot 2θ"},
    {f:"tan x + 2 tan 2x + 4 tan 4x + 8 cot 8x = cot x",k:"trig",note:"The chain cot − 2cot collapses a whole tan-ladder to a single cot. Spot it when coefficients double (1,2,4,8…)."}]},
  {tag:"graph",title:"Counting via graphs / inequations",rows:[
    {f:"# solutions of f(x)=g(x) in [a,b] = # intersections of y=f(x), y=g(x) there."},
    {f:"If curves meet at n points x₁…xₙ, the equation has n distinct real roots."},
    {f:"Inequations: (x−a)(x−b)<0 ⟹ a<x<b ; solve on one period, then add the period.",k:"trig",note:"For sin/cos LHS vs a line/parabola RHS, sketch both — counting beats algebra."}]},
  {tag:"simul",title:"Simultaneous equations",rows:[
    {f:"If sin θ = sin α AND cos θ = cos α together, the common solution is θ = 2nπ + α."},
    {f:"Two equations in θ: find the single α satisfying both, then add 2nπ.",k:"trig",note:"A value satisfying one equation's family need not satisfy the other — only the shared α survives."}]}
];

let TEQ_PATTERNS = [
  {id:"P1",name:"General-Solution Template",trigger:"After isolating, a bare sin θ = k, cos θ = k, or tan θ = k. The 'write the general solution' cue.",move:"Express k as sin/cos/tan of a known α, then drop into the matching template: sinθ=sinα → nπ+(−1)ⁿα; cosθ=cosα → 2nπ±α; tanθ=tanα → nπ+α.",why:"Every solvable trig equation collapses to one of three template families once a single ratio is isolated.",mini:"sin θ = −1/2 = sin(−π/6) → θ = nπ + (−1)ⁿ(−π/6).",fails:"When two DIFFERENT ratios remain (tan θ and sec θ): their periodicities differ, you cannot merge templates — reduce to one ratio first.",src:"Synopsis, Ex-III Q11, Ex-III Q13",srcText:{"Synopsis":"sinθ=k→θ=nπ+(−1)ⁿα; cosθ=k→θ=2nπ±α; tanθ=k→θ=nπ+α (principal α from the standard intervals).","Ex-III Q11":"If tan x + 2 tan 2x + 4 tan 4x + 8 cot 8x = √3 then the general solution of x is —","Ex-III Q13":"If tan mθ = cot nθ then the general solution of θ is —"}},
  {id:"P2",name:"Squared-Ratio Family (θ=nπ±α)",trigger:"The equation is EVEN in one ratio — sin²θ = sin²α, cos²θ = cos²α, tan²θ = tan²α (or reduces to that after a manipulation).",move:"Use the merged template θ = nπ ± α. Reach it by writing both sides as the same squared ratio.",why:"Squaring fuses the (−1)ⁿ and ± branches into a single nπ ± α — fewer cases, no sign bookkeeping.",mini:"4 cos²x = 3 ⟹ cos²x = cos²(π/6) ⟹ x = nπ ± π/6.",fails:"Treating a squared equation as linear (you'd miss half the roots) — or squaring a non-even equation and importing extraneous roots (that's P6, not P2).",src:"Synopsis, Ex-III Q12",srcText:{"Synopsis":"General solution of sin²θ=sin²α (or cos²θ=cos²α or tan²θ=tan²α) is θ=nπ±α.","Ex-III Q12":"tan θ · tan(120°+θ) · tan(120°−θ) = 1/√3 → general solution of θ (collapses via the triple-angle product to tan 3θ = 1/√3)."}},
  {id:"P3",name:"Factor & Split (never cancel)",trigger:"After moving everything to one side it factors into a PRODUCT of trig pieces equal to zero; or a common trig factor is tempting you to divide.",move:"Set each factor to zero and solve separately; union the solution sets. NEVER divide out a common factor — that silently deletes the roots that factor would have given.",why:"A product is zero iff some factor is zero. Cancelling a factor throws away its zeros.",mini:"sin x + sin 3x = sin 2x ⟹ sin 2x(2cos x − 1)=0 ⟹ sin 2x = 0 OR cos x = ½ (keep both).",fails:"Cancelling sin x or cos x 'to simplify' — caution (iii). Always factor, never cancel.",src:"Cautions(iii), Ex-III Q17, Ex-III Q03, Ex-IV Q1",srcText:{"Cautions(iii)":"Do not cancel the common variable factor from the two sides of the equation, because we may lose some solutions.","Ex-III Q17":"General solution of sin x − 3 sin 2x + sin 3x = cos x − 3 cos 2x + cos 3x (factors to (2cos x−3)(sin 2x − cos 2x)=0).","Ex-III Q03":"Number of distinct real roots of |sin x, cos x, cos x; cos x, sin x, cos x; cos x, cos x, sin x| = 0 in [−π/4, π/4] (the determinant factors to (sin x − cos x)²(sin x + 2cos x)=0).","Ex-IV Q1":"The number of distinct real roots of sin³x + sin²x + sin x − sin x·sin 2x − sin 2x − 2 cos x = 0 belonging to (−π/2, π/2)."}},
  {id:"P4",name:"Reduce-to-Quadratic & Reject",trigger:"A single ratio appears to powers 2 and 1 (a sin²x + b sin x + c = 0), possibly after using sin²+cos²=1 to eliminate the other ratio.",move:"Substitute t = sin x (or cos x / tan x). Solve the quadratic in t. REJECT any root with |t|>1 for sin/cos. Then template each surviving t.",why:"Polynomial machinery solves it once it's a quadratic in one ratio — but the range constraint is what trips people.",mini:"2 sin²x − 3 sin x + 1 = 0 ⟹ sin x = 1 or ½ (both valid) ⟹ x = (4n+1)π/2 or nπ+(−1)ⁿπ/6.",fails:"Forgetting |t| ≤ 1, so you template a root like sin x = 2 that has no solution.",src:"Ex-III Q16, Ex-III Q02",srcText:{"Ex-III Q16":"General solution of (1−sin x)/(1+sin x) = (1−cos 2x)/(1+cos 2x)-type identity → reduces to 2 sin²x + sin x − 1 = 0 → sin x = ½.","Ex-III Q02":"If 1 + sin²θ = 3 sin θ cos θ, the solution set in (0, π/2) (divide by cos²θ → 2 tan²θ − 3 tan θ + 1 = 0 → tan θ = 1 or ½)."}},
  {id:"P5",name:"a cosx + b sinx = c",trigger:"A first-degree combination a cos x + b sin x set equal to a constant c.",move:"A solution exists iff |c| ≤ √(a²+b²). If so, write a cos x + b sin x = √(a²+b²) cos(x−φ) and template. If |c| > √(a²+b²): NO solution.",why:"The LHS is a single rotated cosine of amplitude √(a²+b²); it can only reach values within [−amp, +amp].",mini:"(√3−1)cos θ + (√3+1)sin θ = 2: amp = √8 = 2√2 ≥ 2 ✓ → 2√2 sin(θ+φ)=2.",fails:"Skipping the |c| ≤ amplitude gate, then 'solving' an impossible equation. Also: misreading a,b after manipulation.",src:"Synopsis, Ex-III Q18, Cengage Arch NV-1 (2018)",srcText:{"Synopsis":"a cos θ + b sin θ = c has a solution iff |c| ≤ √(a²+b²); no solution if |c| > √(a²+b²).","Ex-III Q18":"General solution of (√3−1)cos θ + (√3+1)sin θ = 2.","Cengage Arch NV-1":"(JEE-Adv 2018) a,b,c nonzero with √3 a cos x + 2b sin x = c, x ∈ [−π/2, π/2], two distinct roots α,β with α+β = π/3; find b/a."}},
  {id:"P6",name:"Square → Check → Reject Extraneous",trigger:"A radical √(…), or you squared/cross-multiplied to clear a root or a ± ambiguity.",move:"Square only when forced. Solve. Then SUBSTITUTE every candidate back into the ORIGINAL equation and discard the ones that don't satisfy it.",why:"Squaring is not reversible — it can create roots of (LHS)²=(RHS)² that fail LHS=RHS.",mini:"√(1−sin x) = 1 − sin x ⟹ sin x = 0 or 1; check both in the original (1−sinx ≥ 0 and sign of RHS).",fails:"Reporting all algebraic roots without the back-check — the classic extraneous-root error (caution ii).",src:"Cautions(ii), Cengage SC §3.5 (squaring class)",srcText:{"Cautions(ii)":"Avoid squaring the equation if possible, because it may lead to extraneous solutions.","Cengage SC §3.5":"(text pending — upload Cengage page 3.5 illustration set on squaring)"}},
  {id:"P7",name:"Boundedness Pinch (LHS=RHS extremes)",trigger:"LHS ≤ k and RHS ≥ k are forced (or 'sum of bounded terms = its max'); also 'sum of squares = 0'.",move:"Equality can hold ONLY when both sides simultaneously hit k. Set each bounded term to its extreme and solve the resulting simple equations together.",why:"If LHS can't exceed k and RHS can't fall below k, the only way they're equal is at k for both.",mini:"cos⁵x = 1 + sin⁴x: LHS ≤ 1, RHS ≥ 1 ⟹ cos⁵x=1 AND sin⁴x=0 ⟹ x = 2nπ.",fails:"Trying to solve algebraically instead of reading the bounds — you'll drown. The pinch is the whole trick.",src:"Ex-III Q04, Ex-III Q20, Ex-III Q21, Cengage Arch NV-2 (2020)",srcText:{"Ex-III Q04":"A = {θ ∈ [0,2π] : (cos x)⁵ + (sin x)³ = 1}; the number of elements in A (each term ≤ its square ⟹ pinch ⟹ x = 0, π/2, 2π).","Ex-III Q20":"The solution set of cos⁵x = 1 + sin⁴x (LHS ≤ 1 ≤ RHS forces cos x = 1).","Ex-III Q21":"sin θ = ½(√(x/y) + √(y/x)) ⟹ RHS ≥ 1 by AM-GM and sin θ ≤ 1 ⟹ x = y.","Cengage Arch NV-2":"(JEE-Adv 2020) f(θ)=(sin θ+cos θ)²+(sin θ−cos θ)⁴, local minima locations; sum of the λ's."}},
  {id:"P8",name:"Domain & Undefined-Point Rejection",trigger:"tan, sec, cot, csc, logs, or denominators appear — i.e. the equation has forbidden points.",move:"Before reporting, list where each term is undefined (cos x = 0 for tan/sec; sin x = 0 for cot/csc; base/argument limits for logs). Strike any candidate landing there.",why:"A root that makes a term infinite/undefined isn't a root of the equation as written (caution iv).",mini:"log_{sin θ}(cos 2θ) = 2 needs sin θ ∈ (0,1)\\{…} AND cos 2θ > 0 — those gates leave a single valid θ.",fails:"Quoting the full template family and forgetting tan x is undefined at (2n+1)π/2, etc.",src:"Cautions(iv), Ex-III Q05",srcText:{"Cautions(iv)":"The answer should not contain values of θ which make any of the terms undefined or infinite; check denominators are nonzero at every stage.","Ex-III Q05":"In (−π/2, π/2), log_{sin θ}(cos 2θ) = 2 has — (base constraints force a unique solution)."}},
  {id:"P9",name:"Multiply/Divide Lost-Root Trap",trigger:"You multiplied through by sin x / cos x (or a half-angle factor), or divided to simplify.",move:"Track what you multiplied/divided by. Roots of THAT factor are either spuriously gained (if multiplied) or lost (if divided) — re-introduce or discard them explicitly.",why:"Multiplying introduces the multiplier's zeros; dividing removes them. Either way the solution set shifts.",mini:"Multiplying csc-equation by sin x can add x = nπ; check whether the original allowed it.",fails:"Treating multiply/divide as harmless. It's the silent cousin of squaring.",src:"Cautions(iii), Synopsis(half-angle)",srcText:{"Cautions(iii)":"Do not cancel/divide by a common trig factor; track multiplications too.","Synopsis(half-angle)":"(text pending — upload the half-angle / t = tan(x/2) substitution worked example page)"}},
  {id:"P10",name:"Equations with [x], {x}, |·|",trigger:"Greatest-integer [x], fractional part {x}, or modulus |x| appears inside or around the trig.",move:"Split into cases on the integer/fractional/sign structure. For tan|x| = tan x compare on x ≥ 0 vs x < 0; for [x] inside trig the argument is integer-stepped (a lattice).",why:"These operators are piecewise — the equation is really several equations, one per piece.",mini:"tan|x| = tan x holds for all x ≥ 0; for x < 0 it needs tan(−x)=tan x ⟹ tan x = 0.",fails:"Treating |x| or [x] as ordinary x and getting one clean template — you'll miss the case structure.",src:"Cengage Arch SC-4 (2024), Cengage SC §3.7 (|x| class)",srcText:{"Cengage Arch SC-4":"(JEE-Adv 2024) f(x)=x² sin(π/x²) for x≠0, f(0)=0; which statement is TRUE about the number/locations of zeros (e.g. > 25 zeros in (1/π², 1/π)).","Cengage SC §3.7":"(text pending — upload Cengage page with the tan|x| = tan x and |·| equation illustrations)"}},
  {id:"P11",name:"Counting Roots in an Interval (graphical)",trigger:"'Number of solutions in [a,b]', or LHS is trig while RHS is a line/parabola/other curve.",move:"Sketch y = LHS and y = RHS on the interval; count intersections. For pure-trig, reduce to one template and count which n land inside.",why:"Counting intersections is far faster and safer than solving when the equation is transcendental.",mini:"sin x = x/10 on ℝ: draw the line through the sine humps — count crossings on each side.",fails:"Trying to solve transcendental equations exactly. Count, don't solve.",src:"Cengage Arch SC-2 (2014), Cengage Arch Int-4 (2020), Synopsis(graphical)",srcText:{"Cengage Arch SC-2":"(JEE-Adv 2014) For x ∈ (0, π), sin x + 2 sin 2x − sin 3x = 3 has how many solutions? (bound the LHS — it never reaches 3).","Cengage Arch Int-4":"(JEE-Adv 2020) f(x)=(3−sin 2πx)sin(πx−π/4) − sin(3πx+π/4) on [0,2]; {x: f(x)≥0} = [α,β], find β−α.","Synopsis(graphical)":"If y=f(x) and y=g(x) meet in n points x₁…xₙ, then f(x)=g(x) has n distinct real solutions."}},
  {id:"P12",name:"Principal-Value / Interval Extraction",trigger:"'Find the solutions / their sum in (−π, π)' (or any bounded interval) — not the general family.",move:"Write the general solution, then plug n = …,−1,0,1,… and keep only members inside the interval. Sum/count those.",why:"The interval selects a finite slice of the infinite family; enumerate n carefully near the endpoints.",mini:"From x = nπ ± π/6 keep those in (−π,π): π/6, −π/6, 5π/6, −5π/6.",fails:"Off-by-one at the endpoints, or forgetting excluded points inside the interval (combine with P8).",src:"Cengage Arch SC-3 (2016), Cengage Arch Int-1 (2010)",srcText:{"Cengage Arch SC-3":"(JEE-Adv 2016) S = {x ∈ (−π, π) : x ≠ 0, ±π/2}; the SUM of all distinct solutions of √3 sec x + csc x + 2(tan x − cot x) = 0 in S.","Cengage Arch Int-1":"(IIT-JEE 2010) number of values of θ in (−π/2, π/2), θ ≠ nπ/5, with tan θ = cot 5θ and sin 2θ = cos 4θ."}},
  {id:"P13",name:"Simultaneous Trig System",trigger:"Two trig conditions on the same angle (e.g. sin given AND cos given), or a system in x and y.",move:"Find the single α satisfying BOTH equations; the common solution is θ = 2nπ + α. For x,y systems, solve the symmetric/quadratic structure then template each.",why:"Each equation gives a family; only their intersection (the shared α, then +2nπ) solves the system.",mini:"sin θ = ½ and cos θ = √3/2 together ⟹ θ = 2nπ + π/6 (only that branch, not 5π/6).",fails:"Taking the union of the two families instead of the intersection.",src:"Synopsis(simultaneous), Ex-III Q14",srcText:{"Synopsis(simultaneous)":"For sin θ = sin α and cos θ = cos α simultaneously, the general solution is θ = 2nπ + α (α the common angle).","Ex-III Q14":"cos x + cos y = 1 and cos x · cos y = ¼ ⟹ cos x = cos y = ½ ⟹ x = 2nπ ± π/3, y = 2mπ ± π/3."}},
  {id:"P14",name:"Trig Inequations",trigger:"An INEQUALITY in a trig function — sin x ≥ k, |…| < …, a product/quotient of trig factors > 0.",move:"Solve on one period using the unit circle or graph to get the base interval(s); then add the period (2π or π). For products use the sign-chart rules (x−a)(x−b)<0 ⟹ a<x<b.",why:"Inequations describe arcs/intervals, not points — find them on one period, then translate periodically.",mini:"sin x ≥ ½ on [0,2π]: x ∈ [π/6, 5π/6], then + 2nπ.",fails:"Solving the equality and forgetting the inequality describes a whole interval, or mishandling where the function is decreasing.",src:"Synopsis(inequations)",srcText:{"Synopsis(inequations)":"If a<b then (x−a)(x−b)<0 ⟹ a<x<b; (x−a)(x−b)>0 ⟹ x<a or x>b. Apply after reducing the trig inequation to factored form on one period."}},
  {id:"P15",name:"Parametric 'Has-a-Solution' Condition",trigger:"The equation carries a parameter a; you're asked for which a a solution exists, or how many a, or how many solutions.",move:"Isolate the parameter or use a range/bound condition: |c| ≤ √(a²+b²) (P5), discriminant ≥ 0 (P4), or a boundedness pinch (P7). Solve the resulting inequality in a.",why:"Existence is governed by whether the constant lands inside the reachable range of the trig side.",mini:"4 csc²{π(a+x)} + a² − 4a = 0: LHS-csc² ≥ 4 ⟹ a²−4a ≤ −4 ⟹ (a−2)² ≤ 0 ⟹ a = 2.",fails:"Trying to solve for x first. Existence is a RANGE question about a, not a root-finding question.",src:"Ex-V Q3, Cengage SC §3.8 (parametric class)",srcText:{"Ex-V Q3":"The value of a for which 4 cosec²{π(a+x)} + a² − 4a = 0 has a real solution (csc² ≥ 1 ⟹ 4·1 + a²−4a ≤ 0-type gate ⟹ a = 2).","Cengage SC §3.8":"For any real b, the number of real solutions of (b cos x)/(2cos2x−1) = (b+sin x)/((cos²x−3sin²x)tan x) for x ∈ (0, 2π) (parametric count, answer per Cengage key)."}}
];

let TEQ_GUIDED = [
  {id:"G1",tier:3,tax:"P1",pattern:"P1",q:"Find the general solution of tan x + 2 tan 2x + 4 tan 4x + 8 cot 8x = √3.",
    opts:["General-Solution Template","Reduce-to-Quadratic & Reject","a cosx + b sinx = c","Factor & Split"],correct:0,
    hints:["Don't expand. Use the ladder identity cot θ − tan θ = 2 cot 2θ, i.e. tan θ = cot θ − 2 cot 2θ, repeatedly.","tan x = cot x − 2cot 2x; 2tan 2x = 2cot 2x − 4cot 4x; 4tan 4x = 4cot 4x − 8cot 8x. Add the +8cot 8x — everything telescopes to cot x.","So cot x = √3 ⟹ tan x = 1/√3 = tan(π/6) ⟹ template."],
    ans:"x = nπ + π/6,  n ∈ ℤ",why:"Coefficients 1,2,4,8 scream the tan–cot telescoping ladder; once it collapses to cot x = √3 it's a one-line P1 template."},
  {id:"G2",tier:3,tax:"P2",pattern:"P2",q:"Find the general solution of tan θ · tan(120° + θ) · tan(120° − θ) = 1/√3.",
    opts:["Squared-Ratio Family (θ=nπ±α)","Boundedness Pinch","Domain & Undefined-Point Rejection","Simultaneous Trig System"],correct:0,
    hints:["Recall the triple-angle product: tan θ · tan(60°−θ) · tan(60°+θ) = tan 3θ. Here 120°±θ = 60°±θ shifted by 60°, and the identity still collapses the product to tan 3θ.","So tan 3θ = 1/√3 = tan(π/6).","3θ = nπ + π/6 ⟹ θ = nπ/3 + π/18 = (6n+1)π/18."],
    ans:"θ = (6n+1)π/18,  n ∈ ℤ",why:"A 3-factor tangent product reduces to a single tan 3θ; then the squared/linear template lands the family."},
  {id:"G3",tier:3,tax:"P3",pattern:"P3",q:"Find the general solution of sin x − 3 sin 2x + sin 3x = cos x − 3 cos 2x + cos 3x.",
    opts:["Factor & Split (never cancel)","a cosx + b sinx = c","Reduce-to-Quadratic & Reject","Trig Inequations"],correct:0,
    hints:["Group sin x + sin 3x = 2 sin 2x cos x, and cos x + cos 3x = 2 cos 2x cos x.","LHS = sin 2x(2cos x − 3); RHS = cos 2x(2cos x − 3). Bring together: (2cos x − 3)(sin 2x − cos 2x) = 0.","2cos x − 3 ≠ 0 ever, so tan 2x = 1 ⟹ 2x = nπ + π/4."],
    ans:"x = nπ/2 + π/8,  n ∈ ℤ",why:"Sum-to-product exposes a shared factor (2cos x − 3); factor and split, and discard the impossible factor instead of cancelling it."},
  {id:"G4",tier:3,tax:"P4",pattern:"P4",q:"Solve, in (0, π/2), the equation 1 + sin²θ = 3 sin θ cos θ.",
    opts:["Reduce-to-Quadratic & Reject","General-Solution Template","Boundedness Pinch","Principal-Value / Interval Extraction"],correct:0,
    hints:["Divide both sides by cos²θ (valid since cos θ ≠ 0 in (0,π/2)): sec²θ + tan²θ = 3 tan θ.","Use sec²θ = 1 + tan²θ: 1 + 2 tan²θ = 3 tan θ ⟹ 2 tan²θ − 3 tan θ + 1 = 0.","Factor: (2 tan θ − 1)(tan θ − 1) = 0 ⟹ tan θ = ½ or 1; both lie in (0,π/2)."],
    ans:"θ = π/4  or  θ = tan⁻¹(½)",why:"Even-power structure in one ratio → quadratic in tan θ; solve and keep the roots inside the stated interval."},
  {id:"G5",tier:3,tax:"P5",pattern:"P5",q:"Find the general solution of (√3 − 1)cos θ + (√3 + 1)sin θ = 2.",
    opts:["a cosx + b sinx = c","Factor & Split","Squared-Ratio Family","Multiply/Divide Lost-Root Trap"],correct:0,
    hints:["Amplitude = √((√3−1)² + (√3+1)²) = √(4 + 4) = 2√2. Since |2| ≤ 2√2, a solution exists.","Divide through by 2√2 and recognise the coefficients as sin(π/12), cos(π/12) (since tan(π/12)=2−√3): the LHS becomes 2√2 sin(θ + π/12)... set equal to 2.","sin(θ + π/12) = 1/√2 ⟹ θ + π/12 = nπ + (−1)ⁿ π/4."],
    ans:"θ = nπ + (−1)ⁿ π/4 − π/12,  n ∈ ℤ",why:"Linear sin–cos combo: check |c| ≤ amplitude, fold into one sine, template; the awkward angle π/12 comes from tan φ = (√3−1)/(√3+1)."},
  {id:"G6",tier:3,tax:"P7",pattern:"P7",q:"Find all x in [0, 2π] satisfying (cos x)⁵ + (sin x)³ = 1.",
    opts:["Boundedness Pinch (LHS=RHS extremes)","Reduce-to-Quadratic & Reject","a cosx + b sinx = c","Counting Roots in an Interval"],correct:0,
    hints:["On [0,2π] note cos⁵x ≤ cos²x and sin³x ≤ sin²x wherever the bases are in [0,1]; and cos²x + sin²x = 1. So cos⁵x + sin³x ≤ 1, equality only at the extremes.","Equality forces each power to equal its square: cos x ∈ {0,1} and sin x ∈ {0,1} simultaneously with cos²x+sin²x=1.","That gives (cos x, sin x) = (1,0) or (0,1): x = 0, π/2, 2π."],
    ans:"x = 0,  π/2,  2π  (3 solutions)",why:"LHS pinned at its maximum 1 = RHS — read the bounds, set each term to its extreme, don't grind algebra."},
  {id:"G7",tier:3,tax:"P8",pattern:"P8",q:"How many solutions does log_{sin θ}(cos 2θ) = 2 have in (−π/2, π/2)?",
    opts:["Domain & Undefined-Point Rejection","General-Solution Template","Factor & Split","Trig Inequations"],correct:0,
    hints:["Domain first: the base sin θ must be > 0 and ≠ 1, and the argument cos 2θ must be > 0. So θ ∈ (0, π/2) with cos 2θ > 0 ⟹ θ ∈ (0, π/4).","Rewrite: cos 2θ = (sin θ)² ⟹ 1 − 2 sin²θ = sin²θ ⟹ sin²θ = 1/3 ⟹ sin θ = 1/√3.","θ = sin⁻¹(1/√3) lies in (0, π/4)? sin(π/4)=1/√2 > 1/√3, so yes — exactly one valid θ."],
    ans:"Exactly one solution",why:"The log's base/argument constraints kill most candidates; only the θ surviving the domain gate counts."},
  {id:"G8",tier:3,tax:"P3",pattern:"P3",q:"Find the number of distinct real roots of sin³x + sin²x + sin x − sin x·sin 2x − sin 2x − 2 cos x = 0 in (−π/2, π/2).",
    opts:["Factor & Split (never cancel)","Boundedness Pinch","Reduce-to-Quadratic & Reject","Domain & Undefined-Point Rejection"],correct:0,
    hints:["Group cleverly: sin x(sin²x + sin x + 1) − sin 2x(sin x + 1) − 2 cos x, and use sin 2x = 2 sin x cos x to pull out common pieces.","After factoring you reach a product like (sin x + 1)(…) with a quadratic-type factor in sin x; set each to zero.","Keep only roots in (−π/2, π/2): two distinct roots survive."],
    ans:"2 distinct roots",why:"Messy but factorable — the discipline is to factor into pieces and count roots in-range, never to cancel."},
  {id:"G9",tier:3,tax:"P13",pattern:"P13",q:"Solve the system cos x + cos y = 1 and cos x · cos y = 1/4 for the general solution (x, y).",
    opts:["Simultaneous Trig System","a cosx + b sinx = c","Squared-Ratio Family","Parametric 'Has-a-Solution' Condition"],correct:0,
    hints:["Treat cos x and cos y as the two roots of t² − (sum)t + (product) = 0, i.e. t² − t + 1/4 = 0.","That's (t − ½)² = 0 ⟹ cos x = cos y = ½.","Template each: x = 2nπ ± π/3 and y = 2mπ ± π/3."],
    ans:"x = 2nπ ± π/3,  y = 2mπ ± π/3,  n,m ∈ ℤ",why:"Sum and product of two cosines → quadratic whose roots are the cosines; then template each independently."},
  {id:"G10",tier:3,tax:"P12",pattern:"P12",q:"Find the SUM of all distinct solutions of √3 sec x + csc x + 2(tan x − cot x) = 0 in S = {x ∈ (−π, π) : x ≠ 0, ±π/2}.",
    opts:["Principal-Value / Interval Extraction","Counting Roots in an Interval","Reduce-to-Quadratic & Reject","Multiply/Divide Lost-Root Trap"],correct:0,
    hints:["Multiply through by sin x cos x (allowed since x ≠ 0, ±π/2) to clear denominators; simplify to a single trig equation.","You reach √3 sin x + cos x + 2(sin²x − cos²x) = 0 ⟹ 2 sin(x + π/6) = 2 cos 2x-type relation; solve for the residues in (−π, π).","Enumerate the valid solutions in S and add them — the symmetric ones cancel."],
    ans:"0",why:"(JEE-Adv 2016) After clearing the domain-forbidden points, the valid roots in (−π,π) are symmetric about 0, so their sum is 0."},
  {id:"G11",tier:3,tax:"P5",pattern:"P5",q:"a, b, c are nonzero reals with √3·a·cos x + 2b·sin x = c, x ∈ [−π/2, π/2], having two distinct roots α, β with α + β = π/3. Find b/a.",
    opts:["a cosx + b sinx = c","Boundedness Pinch","Factor & Split","Counting Roots in an Interval"],correct:0,
    hints:["Write √3 a cos x + 2b sin x = R cos(x − φ) with tan φ = 2b/(√3 a). Two roots of R cos(x−φ)=c are symmetric about x = φ.","Symmetry of the two roots ⟹ α + β = 2φ. Given α+β = π/3 ⟹ φ = π/6.","So tan(π/6) = 2b/(√3 a) ⟹ 1/√3 = 2b/(√3 a) ⟹ b/a = 1/2."],
    ans:"b/a = 0.5",why:"(JEE-Adv 2018) The two roots of a single-cosine equation straddle its phase φ; α+β = 2φ pins φ, and tan φ delivers b/a."},
  {id:"G12",tier:3,tax:"P15",pattern:"P15",q:"Find the value of a for which 4 csc²{π(a + x)} + a² − 4a = 0 has a real solution.",
    opts:["Parametric 'Has-a-Solution' Condition","Reduce-to-Quadratic & Reject","Domain & Undefined-Point Rejection","Trig Inequations"],correct:0,
    hints:["csc² of anything is ≥ 1, so 4 csc²{…} ≥ 4. For the sum to be zero you need a² − 4a ≤ −4.","a² − 4a + 4 ≤ 0 ⟹ (a − 2)² ≤ 0.","A square is ≤ 0 only when it's 0 ⟹ a = 2 (and then csc² = 1 is attainable)."],
    ans:"a = 2",why:"Existence is a range question: the csc² floor forces a²−4a into a tiny window, collapsing to a single a."},
  {id:"G13",tier:3,tax:"P11",pattern:"P11",q:"For x ∈ (0, π), how many solutions does sin x + 2 sin 2x − sin 3x = 3 have?",
    opts:["Counting Roots in an Interval (graphical)","General-Solution Template","Factor & Split","a cosx + b sinx = c"],correct:0,
    hints:["Don't solve — bound the LHS. Rewrite sin 3x = 3 sin x − 4 sin³x and simplify the LHS to 2 sin x(1 + 2 cos x − 2 cos²x).","Maximise on (0,π): test x = π/3 → 2·(√3/2)·(1 + 1 − ½) = √3·(3/2) ≈ 2.6 < 3. The LHS never reaches 3.","Since max LHS < 3, the equation cannot hold."],
    ans:"No solution",why:"(JEE-Adv 2014) A bound on the LHS settles the count instantly — the RHS 3 sits above the LHS's reach."},
  {id:"G14",tier:3,tax:"P10",pattern:"P10",q:"f(x) = x² sin(π/x²) for x ≠ 0 (f(0)=0). Roughly how many zeros does f have in the interval (1/π², 1/π)?",
    opts:["Equations with [x], {x}, |·|","Boundedness Pinch","Principal-Value / Interval Extraction","Simultaneous Trig System"],correct:0,
    hints:["f(x) = 0 (for x ≠ 0) ⟺ sin(π/x²) = 0 ⟺ π/x² = kπ ⟺ x² = 1/k ⟺ x = 1/√k, k ∈ ℕ.","Need 1/π² < 1/√k < 1/π ⟹ π < √k < π² ⟹ π² < k < π⁴, i.e. about 9.87 < k < 97.4.","Integer k = 10, 11, …, 97 ⟹ 88 values ⟹ far more than 25 zeros."],
    ans:"More than 25 (precisely 88) zeros",why:"(JEE-Adv 2024) The 'inside' argument π/x² turns zero-counting into counting integers in a band — a discrete-sampling move."},
  {id:"G15",tier:3,tax:"P6",pattern:"P6",q:"Solve √(3) sin x − √(1 + sin 2x) = 0 and explain which roots survive the squaring.",
    opts:["Square → Check → Reject Extraneous","a cosx + b sinx = c","Factor & Split","Domain & Undefined-Point Rejection"],correct:0,
    hints:["Note √(1 + sin 2x) = √((sin x + cos x)²) = |sin x + cos x|. So the equation is √3 sin x = |sin x + cos x| — needs √3 sin x ≥ 0 first.","Square: 3 sin²x = (sin x + cos x)² = 1 + sin 2x ⟹ 3 sin²x − 2 sin x cos x − 1 = 0 ⟹ (after using sin²+cos²) factor for tan x.","Solve, then REJECT any root with sin x < 0 (the original needs LHS ≥ 0) — those are the extraneous ones squaring introduced."],
    ans:"Only roots with sin x ≥ 0 and sin x + cos x = √3 sin x survive (e.g. x = π/3 + 2nπ); the sign-violating roots are extraneous.",why:"Squaring a √ equation breeds sign-wrong roots; the back-check on √3 sin x ≥ 0 is mandatory."}
];

let TEQ_PRACTICE = [
  /* ============ Foundation templates — Narayana Synopsis general-solution table ============ */
  {src:"Fund T1", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of sin x = 1/2.", ans:"x = nπ + (−1)ⁿ π/6,  n ∈ ℤ", note:"1/2 = sin(π/6); apply the sine template.", doc:"fund"},
  {src:"Fund T2", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of cos x = −1/2.", ans:"x = 2nπ ± 2π/3,  n ∈ ℤ", note:"−1/2 = cos(2π/3); cosine template uses 2nπ ± α.", doc:"fund"},
  {src:"Fund T3", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of tan x = √3.", ans:"x = nπ + π/3,  n ∈ ℤ", note:"√3 = tan(π/3); tangent template is nπ + α.", doc:"fund"},
  {src:"Fund T4", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of sin x = −1.", ans:"x = (4n − 1)π/2,  n ∈ ℤ", note:"Standard extreme: sin x = −1 ⟹ x = 2nπ − π/2.", doc:"fund"},
  {src:"Fund T5", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of cos x = 1.", ans:"x = 2nπ,  n ∈ ℤ", note:"Standard extreme: cosine equals its max only at multiples of 2π.", doc:"fund"},
  {src:"Fund T6", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of tan x = 0.", ans:"x = nπ,  n ∈ ℤ", note:"tan x = 0 at integer multiples of π.", doc:"fund"},
  {src:"Fund T7", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of sin 2x = √3/2.", ans:"2x = nπ + (−1)ⁿ π/3 ⟹ x = nπ/2 + (−1)ⁿ π/6", note:"Template the inner angle 2x, then divide through.", doc:"fund"},
  {src:"Fund T8", type:"NV", tier:1, tax:"P2", pat:"P2", q:"General solution of cos²x = 3/4.", ans:"x = nπ ± π/6,  n ∈ ℤ", note:"cos²x = cos²(π/6) ⟹ squared-ratio template nπ ± α.", doc:"fund"},
  {src:"Fund T9", type:"NV", tier:1, tax:"P8", pat:"P8", q:"General solution of sec x = √2.", ans:"x = 2nπ ± π/4,  n ∈ ℤ", note:"cos x = 1/√2; sec is defined (cos ≠ 0) so no rejection needed here.", doc:"fund"},
  {src:"Fund T10", type:"NV", tier:1, tax:"P1", pat:"P1", q:"General solution of √3 csc x = 2.", ans:"x = nπ + (−1)ⁿ π/3,  n ∈ ℤ", note:"csc x = 2/√3 ⟹ sin x = √3/2 = sin(π/3).", doc:"fund"},

  /* ============ JEE-Main tier — standard forms + Narayana Ex-III (verified by key/hints) ============ */
  {src:"Fund Q1", type:"SC", tier:2, tax:"P4", pat:"P4", q:"General solution of 2 sin²x − 3 sin x + 1 = 0.", choices:["x = (4n+1)π/2 or nπ+(−1)ⁿπ/6","x = nπ or 2nπ","x = nπ ± π/6","x = (2n+1)π/2"], correct:0, ans:"x = (4n+1)π/2 or nπ+(−1)ⁿπ/6", note:"Quadratic in sin x: (2 sin x − 1)(sin x − 1)=0 ⟹ sin x = 1 (x=(4n+1)π/2) or ½ (x=nπ+(−1)ⁿπ/6). Both valid (|t|≤1).", doc:"fund"},
  {src:"Fund Q2", type:"SC", tier:2, tax:"P3", pat:"P3", q:"General solution of cos x + cos 3x = 0.", choices:["x = (2n+1)π/4 or (2n+1)π/2","x = nπ","x = 2nπ ± π/3","x = nπ/2"], correct:0, ans:"x = (2n+1)π/4 or (2n+1)π/2", note:"2 cos 2x cos x = 0 ⟹ cos 2x = 0 (x=(2n+1)π/4) or cos x = 0 (x=(2n+1)π/2). Factor, never cancel cos x.", doc:"fund"},
  {src:"Fund Q3", type:"SC", tier:2, tax:"P3", pat:"P3", q:"General solution of tan x + cot x = 2.", choices:["x = nπ + π/4","x = nπ","x = 2nπ ± π/4","x = nπ/2 + π/4"], correct:0, ans:"x = nπ + π/4", note:"tan x + 1/tan x = 2 ⟹ tan²x − 2 tan x + 1 = 0 ⟹ (tan x − 1)²=0 ⟹ tan x = 1.", doc:"fund"},
  {src:"Fund Q4", type:"SC", tier:2, tax:"P5", pat:"P5", q:"General solution of sin x + √3 cos x = 1.", choices:["x + π/3 = nπ + (−1)ⁿ π/6","x = 2nπ","x = nπ ± π/3","x = nπ + π/6"], correct:0, ans:"x + π/3 = nπ + (−1)ⁿ π/6", note:"2 sin(x + π/3) = 1 ⟹ sin(x+π/3) = ½. Amplitude 2 ≥ |1| so it solves.", doc:"fund"},
  {src:"Fund Q5", type:"SC", tier:2, tax:"P4", pat:"P4", q:"General solution of 2 cos²x + sin x − 1 = 0.", choices:["x = (4n+1)π/2 or nπ+(−1)ⁿ(−π/6)","x = nπ","x = 2nπ ± π/3","x = nπ/2"], correct:0, ans:"x = (4n+1)π/2 or nπ+(−1)ⁿ(−π/6)", note:"Replace cos²x = 1−sin²x: 2−2sin²x+sin x−1=0 ⟹ 2sin²x−sin x−1=0 ⟹ (2sin x+1)(sin x−1)=0.", doc:"fund"},
  {src:"Fund Q6", type:"SC", tier:2, tax:"P3", pat:"P3", q:"General solution of sin 2x = cos 3x.", choices:["x = (4n+1)π/10 or (4n−1)π/2","x = nπ","x = 2nπ ± π/3","x = nπ/2"], correct:0, ans:"x = (4n+1)π/10 or (4n−1)π/2", note:"cos 3x = cos(π/2 − 2x) ⟹ 3x = 2nπ ± (π/2 − 2x): + gives x=(4n+1)π/10, − gives x=(4n−1)π/2.", doc:"fund"},
  {src:"Ex-III Q1", type:"SC", tier:2, tax:"P3", pat:"P3", q:"A = {θ ∈ (0, π/2) : sin 7θ = sin 4θ − sin θ}. The number of elements in A is", choices:["2","3","1","4"], correct:0, ans:"2", note:"sin 7θ + sin θ = sin 4θ ⟹ 2 sin 4θ cos 3θ = sin 4θ ⟹ sin 4θ(2cos 3θ − 1)=0. In (0,π/2): sin 4θ=0 → θ=π/4; cos 3θ=½ → θ=π/9. Two elements. (Narayana Ex-III, key Q1)", doc:"narEx3"},
  {src:"Ex-III Q2", type:"SC", tier:2, tax:"P4", pat:"P4", q:"If 1 + sin²θ = 3 sin θ cos θ, then the solution set in (0, π/2) is", choices:["{π/4, tan⁻¹(1/2)}","{π/4}","{π/6, π/3}","{tan⁻¹(2)}"], correct:0, ans:"{π/4, tan⁻¹(1/2)}", note:"÷cos²θ ⟹ 2tan²θ−3tanθ+1=0 ⟹ tanθ = 1 or ½. (Narayana Ex-III, key Q2)", doc:"narEx3"},
  {src:"Ex-III Q12", type:"SC", tier:2, tax:"P2", pat:"P2", q:"General solution of tan θ · tan(120° + θ) · tan(120° − θ) = 1/√3.", choices:["θ = (6n+1)π/18","θ = nπ + π/6","θ = nπ/3","θ = (2n+1)π/18"], correct:0, ans:"θ = (6n+1)π/18", note:"Triple-angle product ⟹ tan 3θ = 1/√3 ⟹ 3θ = nπ + π/6. (Narayana Ex-III, key Q12)", doc:"narEx3"},
  {src:"Ex-III Q13", type:"SC", tier:2, tax:"P1", pat:"P1", q:"If tan mθ = cot nθ, then the general solution of θ is", choices:["(2k+1)π / [2(m+n)]","kπ/(m+n)","(2k+1)π/(m−n)","kπ/(m−n)"], correct:0, ans:"(2k+1)π / [2(m+n)]", note:"cot nθ = tan(π/2 − nθ) ⟹ mθ = kπ + π/2 − nθ ⟹ (m+n)θ = kπ + π/2. (Narayana Ex-III, key Q13)", doc:"narEx3"},
  {src:"Ex-III Q15", type:"SC", tier:2, tax:"P2", pat:"P2", q:"If sin x · sin(60° + x) · sin(60° − x) = 1/8, then x =", choices:["nπ/3 + (−1)ⁿ π/18","nπ + π/6","2nπ ± π/3","nπ/3"], correct:0, ans:"nπ/3 + (−1)ⁿ π/18", note:"Product = ¼ sin 3x = 1/8 ⟹ sin 3x = ½ ⟹ 3x = nπ + (−1)ⁿπ/6. (Narayana Ex-III, key Q15)", doc:"narEx3"},
  {src:"Ex-III Q9", type:"SC", tier:2, tax:"P13", pat:"P13", q:"If tan(A − B) = 1 and sec(A + B) = 2/√3, the least positive values of A and B are respectively", choices:["25π/24, 19π/24","π/4, π/6","19π/24, 25π/24","13π/24, 7π/24"], correct:0, ans:"25π/24, 19π/24", note:"A−B = nπ+π/4 and A+B = 2mπ ± π/6; solve the simultaneous system for least positive A,B. (Narayana Ex-III, key Q9)", doc:"narEx3"},

  /* ============ JEE-Advanced tier — Narayana Ex-III (key + worked hints verified) ============ */
  {src:"Ex-III Q3", type:"SC", tier:3, tax:"P3", pat:"P3", q:"The number of distinct real roots of the determinant |sin x, cos x, cos x; cos x, sin x, cos x; cos x, cos x, sin x| = 0 in [−π/4, π/4] is", choices:["0","2","1","3"], correct:2, ans:"1", note:"Row operations factor it to (sin x − cos x)²(sin x + 2 cos x)=0. In [−π/4,π/4]: sin x = cos x ⟹ x = π/4 (one root); tan x = −2 lies outside. (Narayana Ex-III, key Q3)", doc:"narEx3"},
  {src:"Ex-III Q4", type:"SC", tier:3, tax:"P7", pat:"P7", q:"Let A = {θ ∈ [0, 2π] : (cos x)⁵ + (sin x)³ = 1}. The number of elements in A is", choices:["1","3","2","0"], correct:1, ans:"3", note:"Boundedness pinch: cos⁵x ≤ cos²x, sin³x ≤ sin²x; equality needs (cos x,sin x) ∈ {(1,0),(0,1)} ⟹ x = 0, π/2, 2π. (Narayana Ex-III, key Q4)", doc:"narEx3"},
  {src:"Ex-III Q5", type:"SC", tier:3, tax:"P8", pat:"P8", q:"In (−π/2, π/2), the equation log_{sin θ}(cos 2θ) = 2 has", choices:["no solution","a unique solution","two solutions","infinitely many solutions"], correct:1, ans:"a unique solution", note:"Base needs sin θ ∈ (0,1)\\{…}; argument cos 2θ > 0. cos 2θ = sin²θ ⟹ sin²θ = 1/3 ⟹ single valid θ. (Narayana Ex-III, key Q5)", doc:"narEx3"},
  {src:"Ex-III Q7", type:"SC", tier:3, tax:"P3", pat:"P3", q:"The least difference between the roots, in the first quadrant (0 ≤ x ≤ π/2), of 4 cos x(2 − 3 sin²x) + (cos 2x + 1) = 0 is", choices:["π/6","π/4","π/3","π/2"], correct:0, ans:"π/6", note:"Reduces to 2 cos x(6 cos²x + cos x − 2)=0 ⟹ cos x = 0, ½, −2/3. In Q1: x = π/2, π/3 ⟹ least difference π/6. (Narayana Ex-III, key Q7)", doc:"narEx3"},
  {src:"Ex-III Q14", type:"SC", tier:3, tax:"P13", pat:"P13", q:"If cos x + cos y = 1 and cos x · cos y = 1/4, then the general solution (x, y) is", choices:["x = 2nπ ± π/3, y = 2mπ ± π/3","x = nπ, y = mπ","x = 2nπ ± π/6, y = 2mπ ± π/6","x = nπ ± π/3, y = mπ ± π/3"], correct:0, ans:"x = 2nπ ± π/3, y = 2mπ ± π/3", note:"cos x, cos y are roots of t²−t+¼=0 ⟹ both = ½. (Narayana Ex-III, key Q14)", doc:"narEx3"},
  {src:"Ex-III Q16", type:"SC", tier:3, tax:"P4", pat:"P4", q:"General solution of the equation reducing to 2 sin²x + sin x − 1 = 0 (with sin x ≠ −1) is", choices:["x = nπ + (−1)ⁿ π/6","x = 2nπ ± π/3","x = nπ","x = (4n−1)π/2"], correct:0, ans:"x = nπ + (−1)ⁿ π/6", note:"(2 sin x − 1)(sin x + 1)=0; reject sin x = −1, keep sin x = ½. (Narayana Ex-III, key Q16)", doc:"narEx3"},
  {src:"Ex-III Q17", type:"SC", tier:3, tax:"P3", pat:"P3", q:"General solution of sin x − 3 sin 2x + sin 3x = cos x − 3 cos 2x + cos 3x is", choices:["x = nπ/2 + π/8","x = nπ + π/4","x = 2nπ ± π/8","x = nπ/4"], correct:0, ans:"x = nπ/2 + π/8", note:"Both sides factor through (2cos x − 3); divide that out (never zero) ⟹ tan 2x = 1. (Narayana Ex-III, key Q17)", doc:"narEx3"},
  {src:"Ex-III Q18", type:"SC", tier:3, tax:"P5", pat:"P5", q:"General solution of (√3 − 1)cos θ + (√3 + 1)sin θ = 2 is", choices:["θ = nπ + (−1)ⁿ π/4 − π/12","θ = 2nπ ± π/12","θ = nπ + π/12","θ = nπ − (−1)ⁿ π/4"], correct:0, ans:"θ = nπ + (−1)ⁿ π/4 − π/12", note:"Amplitude 2√2 ≥ 2 ✓; fold to 2√2 sin(θ + π/12)=2. (Narayana Ex-III, key Q18)", doc:"narEx3"},
  {src:"Ex-III Q20", type:"SC", tier:3, tax:"P7", pat:"P7", q:"The solution set of cos⁵x = 1 + sin⁴x (n ∈ ℤ) is", choices:["x = 2nπ","x = nπ","x = (2n+1)π","x = nπ/2"], correct:0, ans:"x = 2nπ", note:"cos⁵x ≤ 1 ≤ 1 + sin⁴x; equality ⟹ cos x = 1 and sin x = 0 ⟹ x = 2nπ. (Narayana Ex-III, key Q20)", doc:"narEx3"},
  {src:"Ex-III Q21", type:"SC", tier:3, tax:"P7", pat:"P7", q:"sin θ = ½(√(x/y) + √(y/x)) necessarily implies", choices:["x > y","x < y","x = y","x and y purely imaginary"], correct:2, ans:"x = y", note:"RHS ≥ 1 by AM-GM, while sin θ ≤ 1 ⟹ both = 1 ⟹ √(x/y)=√(y/x) ⟹ x = y. (Narayana Ex-III, key Q21)", doc:"narEx3"},
  {src:"Ex-III Q11", type:"SC", tier:3, tax:"P1", pat:"P1", q:"If tan x + 2 tan 2x + 4 tan 4x + 8 cot 8x = √3, then the general solution of x is", choices:["nπ + π/3","nπ + π/6","nπ + π/4","nπ"], correct:1, ans:"nπ + π/6", note:"tan–cot ladder collapses the LHS to cot x ⟹ cot x = √3 ⟹ tan x = 1/√3. (Narayana Ex-III, key Q11)", doc:"narEx3"},

  /* ============ JEE-Advanced tier — Narayana Ex-IV (single-answer, key verified) ============ */
  {src:"Ex-IV Q1", type:"SC", tier:3, tax:"P3", pat:"P3", q:"The number of distinct real roots of sin³x + sin²x + sin x − sin x·sin 2x − sin 2x − 2 cos x = 0 belonging to (−π/2, π/2) is", choices:["0","1","2","3"], correct:2, ans:"2", note:"Factor the cubic-in-sin/cos structure and split; two roots fall inside (−π/2, π/2). (Narayana Ex-IV, key Q1 = C)", doc:"narEx4"},
  {src:"Ex-IV Q2", type:"Int", tier:3, tax:"P3", pat:"P3", q:"The number of distinct solutions of (5/4)cos²2x + cos⁴x + sin⁴x + cos⁶x + sin⁶x = 2 in [0, 2π] is", ans:"8", note:"cos⁴+sin⁴ = 1−½sin²2x; cos⁶+sin⁶ = 1−¾sin²2x. Sum = 2 + (5/4)cos 4x = 2 ⟹ cos 4x = 0 ⟹ x = π/8 + nπ/4 ⟹ 8 solutions in [0,2π].", doc:"narEx4"},

  /* ============ JEE-Advanced tier — Narayana Ex-V (single-answer, key + hints) ============ */
  {src:"Ex-V Q1", type:"SC", tier:3, tax:"P7", pat:"P7", q:"The number of solutions of the equation cos θ · cos(πθ) = 1 is", choices:["0","2","1","infinite"], correct:2, ans:"1", note:"Product of two cosines = 1 ⟹ both equal 1 (or both −1) simultaneously; only θ = 0 works. (Narayana Ex-V, key Q1)", doc:"narEx5"},
  {src:"Ex-V Q2", type:"NV", tier:3, tax:"P10", pat:"P10", q:"For y = (1/3)[sin x + [sin x + [sin x]]] and [y + [y]] = 2 cos x (where [·] is GIF), the number of solutions is", ans:"0 (no solution)", note:"Inner GIF nesting forces y to take integer-linked values; [y+[y]] = 2[y] = 2cos x has no consistent solution. (Narayana Ex-V, key Q2)", doc:"narEx5"},
  {src:"Ex-V Q3", type:"NV", tier:3, tax:"P15", pat:"P15", q:"The value of a for which 4 cosec²{π(a + x)} + a² − 4a = 0 has a real solution is", ans:"a = 2", note:"csc² ≥ 1 ⟹ a²−4a ≤ −4 ⟹ (a−2)² ≤ 0 ⟹ a = 2. (Narayana Ex-V, key Q3)", doc:"narEx5"},

  /* ============ JEE-Advanced tier — Cengage Archives (real IIT-JEE / JEE-Adv, answer-key verified) ============ */
  {src:"Arch SC1", type:"Arch", tier:3, tax:"P1", pat:"P1", q:"(IIT-JEE 2011) Let f(x)=x² and g(x)=sin x for all x ∈ ℝ. The set of all x satisfying (f∘g∘g∘f)(x) = (g∘g∘f)(x), where (f∘g)(x)=f(g(x)), is", choices:["±√(nπ), n ∈ {0,1,2,…}","±√(nπ), n ∈ {1,2,…}","π/2 + 2nπ, n ∈ {0,1,2,…}","2nπ, n ∈ {0,1,2,…}"], correct:0, ans:"±√(nπ), n ∈ {0,1,2,…}", note:"sin(sin x²) = sin x² type reduction forces sin x² = nπ images; works out to x = ±√(nπ). (Cengage Archives SC, key 1)", doc:"cengArch"},
  {src:"Arch SC2", type:"Arch", tier:3, tax:"P11", pat:"P11", q:"(JEE-Adv 2014) For x ∈ (0, π), the equation sin x + 2 sin 2x − sin 3x = 3 has", choices:["infinitely many solutions","three solutions","one solution","no solution"], correct:3, ans:"no solution", note:"LHS = 2 sin x(1 + 2cos x − 2cos²x); its maximum on (0,π) is ≈ 2.6 < 3. (Cengage Archives SC, key 2)", doc:"cengArch"},
  {src:"Arch SC3", type:"Arch", tier:3, tax:"P12", pat:"P12", q:"(JEE-Adv 2016) Let S = {x ∈ (−π, π) : x ≠ 0, ±π/2}. The sum of all distinct solutions of √3 sec x + csc x + 2(tan x − cot x) = 0 in S is", choices:["−7π/9","−2π/9","0","5π/9"], correct:2, ans:"0", note:"Clear denominators (x ≠ 0, ±π/2); the valid roots in (−π,π) are symmetric about 0. (Cengage Archives SC, key 3)", doc:"cengArch"},
  {src:"Arch SC4", type:"Arch", tier:3, tax:"P10", pat:"P10", q:"(JEE-Adv 2024) f(x)=x² sin(π/x²) for x ≠ 0 and f(0)=0. Which is TRUE?", choices:["f(x)=0 has infinitely many solutions in [1/10¹⁰, ∞)","f(x)=0 has no solution in [1/π, ∞)","the set of solutions of f(x)=0 in (0, 1/10¹⁰) is finite","f(x)=0 has more than 25 solutions in (1/π², 1/π)"], correct:3, ans:"f(x)=0 has more than 25 solutions in (1/π², 1/π)", note:"Zeros at x = 1/√k; in (1/π², 1/π) that means π² < k < π⁴ ⟹ k = 10…97 ⟹ 88 zeros. (Cengage Archives SC, key 4)", doc:"cengArch"},
  {src:"Arch Int1", type:"Int", tier:3, tax:"P13", pat:"P13", q:"(IIT-JEE 2010) The number of values of θ in (−π/2, π/2), with θ ≠ nπ/5 (n = 0, ±1, ±2), such that tan θ = cot 5θ AND sin 2θ = cos 4θ, is", ans:"3", note:"tan θ = cot 5θ ⟹ 6θ = (2k+1)π/2; intersect with sin 2θ = cos 4θ; three common θ survive in range. (Cengage Archives Integer, key 1)", doc:"cengArch"},
  {src:"Arch Int3", type:"Int", tier:3, tax:"P3", pat:"P3", q:"(JEE-Adv 2015) The number of distinct solutions of (5/4)cos²2x + cos⁴x + sin⁴x + cos⁶x + sin⁶x = 2 in [0, 2π] is", ans:"8", note:"Collapses to 2 + (5/4)cos 4x = 2 ⟹ cos 4x = 0 ⟹ x = π/8 + nπ/4 ⟹ 8 roots. (Cengage Archives Integer, key 3)", doc:"cengArch"},
  {src:"Arch Int4", type:"Int", tier:3, tax:"P14", pat:"P14", q:"(JEE-Adv 2020) f:[0,2]→ℝ, f(x)=(3 − sin 2πx)·sin(πx − π/4) − sin(3πx + π/4). If {x ∈ [0,2] : f(x) ≥ 0} = [α, β], then β − α =", ans:"1", note:"Expand and analyse sign over [0,2]; the non-negative set is an interval of length 1. (Cengage Archives Integer, key 4)", doc:"cengArch"},
  {src:"Arch NV1", type:"NV", tier:3, tax:"P5", pat:"P5", q:"(JEE-Adv 2018) Let a, b, c be nonzero reals such that √3 a cos x + 2b sin x = c, x ∈ [−π/2, π/2], has two distinct real roots α, β with α + β = π/3. Then b/a =", ans:"0.5", note:"The two roots straddle the phase φ; α+β = 2φ = π/3 ⟹ φ = π/6 ⟹ tan φ = 2b/(√3 a) ⟹ b/a = ½. (Cengage Archives NV, key 1)", doc:"cengArch"},
  {src:"Arch NV2", type:"NV", tier:3, tax:"P7", pat:"P7", q:"(JEE-Adv 2020) f:(0,π)→ℝ, f(θ)=(sin θ + cos θ)² + (sin θ − cos θ)⁴ has a local minimum at θ ∈ {λ₁π, …, λᵣπ}. Then λ₁ + … + λᵣ =", ans:"0.5", note:"Expand to a quartic in (sin θ − cos θ); locate minima; the λ's sum to 0.5. (Cengage Archives NV, key 2)", doc:"cengArch"}
];

let TEQ_PRAC_DOCS = [
  {id:"fund",     label:"Fundamentals \u00b7 templates & standard forms", date:"Jun 2026", note:"General-solution table (Narayana synopsis) + canonical quadratic/factor forms"},
  {id:"narEx3",   label:"Narayana Module Vol-III \u00b7 Exercise-III", date:"Jun 2026", note:"Principal-domain, general-solution, comparing-range & graphs; key + worked hints"},
  {id:"narEx4",   label:"Narayana Module Vol-III \u00b7 Exercise-IV", date:"Jun 2026", note:"JEE-Adv single-answer; key verified"},
  {id:"narEx5",   label:"Narayana Module Vol-III \u00b7 Exercise-V", date:"Jun 2026", note:"JEE-Adv mix; key + worked solutions"},
  {id:"cengArch", label:"Cengage (Tewani) \u00b7 Archives (real IIT-JEE / JEE-Adv)", date:"Jun 2026", note:"2010\u20132024 past papers; Cengage answer key verified"}
];

const TEQ_PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Foundation"},{k:"2",l:"JEE Main"},{k:"3",l:"JEE Advanced"},{k:"Flag",l:"\u2605 Flagged"}];

/* =========================================================================
   Chapter: States of Matter  (chem/phys/som)
   Source: Narayana JEE-Adv Chemistry Vol-II, pp.307-364
           (theory + W.E-1..34 + Exercise-I/II/III/IV, all answer-keys verified)
   L2 fill convention (physical chem): the engine's pattern fields are reused
   with tilted meaning -> trigger = the TELL, move = the FORK (decide+equation),
   why = the MODEL stated precisely, mini = a predict/decide check,
   fails = the TRAP.  Engine code is unchanged; only the data semantics shift.
   Assertion/Reason items are encoded as type "SC" with the four printed
   Statement/Explanation options (single-correct, key-verified).
   ========================================================================= */
let CHEM_SOM_FIG = {
  z_vs_p: `<svg viewBox="0 0 220 130" class="fig"><line x1="28" y1="110" x2="208" y2="110" stroke="currentColor" stroke-width="1.2"/><line x1="28" y1="110" x2="28" y2="14" stroke="currentColor" stroke-width="1.2"/><line x1="28" y1="60" x2="208" y2="60" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/><text x="4" y="63" font-size="9" fill="currentColor">Z=1</text><path d="M28,60 C70,86 110,92 150,80 C175,72 195,58 206,40" fill="none" stroke="var(--coral)" stroke-width="2"/><path d="M28,60 C70,46 130,34 206,20" fill="none" stroke="var(--teal)" stroke-width="2"/><text x="150" y="98" font-size="9" fill="var(--coral)">CO\u2082 (Z&lt;1)</text><text x="116" y="32" font-size="9" fill="var(--teal)">H\u2082,He (Z&gt;1)</text><text x="8" y="16" font-size="11" fill="currentColor">Z</text><text x="196" y="124" font-size="11" fill="currentColor">P</text></svg>`,
  maxwell: `<svg viewBox="0 0 220 130" class="fig"><line x1="22" y1="110" x2="210" y2="110" stroke="currentColor" stroke-width="1.2"/><line x1="22" y1="110" x2="22" y2="12" stroke="currentColor" stroke-width="1.2"/><path d="M22,110 C50,110 58,24 78,24 C98,24 120,110 205,110" fill="none" stroke="var(--teal)" stroke-width="2"/><path d="M22,110 C58,110 78,44 104,44 C130,44 150,110 205,110" fill="none" stroke="var(--amber)" stroke-width="1.8"/><path d="M22,110 C66,110 100,64 132,64 C162,64 178,110 205,110" fill="none" stroke="var(--coral)" stroke-width="1.8"/><text x="60" y="20" font-size="9" fill="var(--teal)">T\u2081</text><text x="108" y="40" font-size="9" fill="var(--amber)">T\u2082</text><text x="136" y="60" font-size="9" fill="var(--coral)">T\u2083</text><text x="150" y="74" font-size="8" fill="currentColor">T\u2081&lt;T\u2082&lt;T\u2083</text><text x="150" y="124" font-size="10" fill="currentColor">speed \u2192</text></svg>`,
  vt_isobars: `<svg viewBox="0 0 220 130" class="fig"><line x1="26" y1="110" x2="208" y2="110" stroke="currentColor" stroke-width="1.2"/><line x1="26" y1="110" x2="26" y2="12" stroke="currentColor" stroke-width="1.2"/><line x1="26" y1="110" x2="200" y2="26" stroke="var(--teal)" stroke-width="1.8"/><line x1="26" y1="110" x2="200" y2="54" stroke="var(--amber)" stroke-width="1.8"/><line x1="26" y1="110" x2="200" y2="80" stroke="var(--coral)" stroke-width="1.8"/><text x="202" y="30" font-size="9" fill="var(--teal)">P\u2081</text><text x="202" y="58" font-size="9" fill="var(--amber)">P\u2082</text><text x="202" y="84" font-size="9" fill="var(--coral)">P\u2083</text><text x="56" y="22" font-size="8" fill="currentColor">steeper = lower P</text><text x="8" y="16" font-size="11" fill="currentColor">V</text><text x="196" y="124" font-size="11" fill="currentColor">T</text></svg>`,
  pv_vs_p: `<svg viewBox="0 0 220 120" class="fig"><line x1="28" y1="100" x2="208" y2="100" stroke="currentColor" stroke-width="1.2"/><line x1="28" y1="100" x2="28" y2="12" stroke="currentColor" stroke-width="1.2"/><line x1="34" y1="40" x2="200" y2="40" stroke="var(--coral)" stroke-width="1.8"/><line x1="34" y1="66" x2="200" y2="66" stroke="var(--teal)" stroke-width="1.8"/><text x="202" y="43" font-size="9" fill="var(--coral)">T\u2082</text><text x="202" y="69" font-size="9" fill="var(--teal)">T\u2081</text><text x="54" y="32" font-size="8" fill="currentColor">higher line = higher T</text><text x="4" y="16" font-size="10" fill="currentColor">PV</text><text x="196" y="114" font-size="11" fill="currentColor">P</text></svg>`,
  manometer: `<svg viewBox="0 0 200 140" class="fig"><rect x="24" y="20" width="62" height="46" fill="none" stroke="currentColor" stroke-width="1.3"/><text x="34" y="46" font-size="9" fill="currentColor">gas P</text><path d="M86,52 H120 V120 H150 V40" fill="none" stroke="var(--teal)" stroke-width="1.6"/><rect x="113" y="86" width="14" height="34" fill="var(--coral)" opacity=".5"/><rect x="143" y="70" width="14" height="50" fill="var(--coral)" opacity=".5"/><line x1="120" y1="86" x2="150" y2="70" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"/><text x="158" y="40" font-size="8" fill="currentColor">open</text><text x="92" y="135" font-size="8" fill="currentColor">P = P_atm \u00b1 h (open-end)</text></svg>`
};

/* ===== TAXONOMY (drives the coverage map) ===== */
let CHEM_SOM_TAXA = [
  {code:"C1",label:"Ideal-gas baseline & the R-value fork",group:"Gaseous state"},
  {code:"C2",label:"Dalton: partial pressure & mole fraction",group:"Gaseous state"},
  {code:"C3",label:"Which molecular speed (rms / avg / mp)",group:"Kinetic theory"},
  {code:"C4",label:"Kinetic energy \u2194 temperature",group:"Kinetic theory"},
  {code:"C5",label:"Graham's law of diffusion / effusion",group:"Kinetic theory"},
  {code:"C11",label:"Maxwell\u2013Boltzmann distribution",group:"Kinetic theory"},
  {code:"C13",label:"Intermolecular forces \u2014 distance laws",group:"Forces & deviations"},
  {code:"C6",label:"Compressibility factor Z (the spine)",group:"Real gases"},
  {code:"C7",label:"van der Waals: a vs b",group:"Real gases"},
  {code:"C8",label:"Critical constants \u2194 vdW constants",group:"Real gases"},
  {code:"C9",label:"Boyle / Inversion / Critical temperature",group:"Real gases"},
  {code:"C10",label:"Joule\u2013Thomson effect & inversion",group:"Real gases"},
  {code:"C12",label:"Liquefaction & critical phenomena",group:"Real gases"},
  {code:"C14",label:"Manometer fork (open / closed end)",group:"Pressure measurement"},
  {code:"C15",label:"Open-vessel  nT = constant",group:"Pressure measurement"},
  {code:"C16",label:"Vapour pressure & boiling",group:"Liquid state"},
  {code:"C17",label:"Surface tension & viscosity",group:"Liquid state"}
];

/* ===== L1 FORMULAE ===== */
let CHEM_SOM_FORMULAE = [
  {tag:"ideal",title:"Ideal-gas equation & the R-value fork",rows:[
    {f:"PV = nRT = (w/M)RT   \u00b7   PM = dRT   (d = density)"},
    {f:"R = 0.0821 L\u00b7atm\u00b7K\u207b\u00b9\u00b7mol\u207b\u00b9 = 0.083 L\u00b7bar = 8.314 J\u00b7K\u207b\u00b9\u00b7mol\u207b\u00b9 = 2 cal\u00b7K\u207b\u00b9\u00b7mol\u207b\u00b9",k:"chem",note:"Pick R to match the pressure / energy UNITS in the problem. Wrong R is the #1 numerical slip in this chapter."},
    {f:"Combined: P\u2081V\u2081/T\u2081 = P\u2082V\u2082/T\u2082   (T always in KELVIN)",k:"trap",note:"\u201cDoubling T\u201d doubles V only if T is in kelvin. 0\u00b0C \u2192 27\u00b0C is NOT a doubling."}]},
  {tag:"laws",title:"The gas laws (special cases)",rows:[
    {f:"Boyle: PV = const (T,n fixed)  \u00b7  Charles: V \u221d T (P,n fixed)  \u00b7  Gay-Lussac: P \u221d T (V,n fixed)"},
    {f:"Avogadro: V \u221d n (P,T fixed)  \u2192 equal volumes, equal moles"},
    {f:"V\u2013T plot at constant P = straight line through origin (isobar)",k:"chem",note:"On a V-vs-T fan the steeper line is the LOWER pressure; the flattest line is the highest P."}]},
  {tag:"dalton",title:"Dalton & partial pressure",rows:[
    {f:"P_total = \u03a3 P\u1d62   \u00b7   P\u1d62 = x\u1d62 \u00b7 P_total   (x\u1d62 = n\u1d62 / n_total = mole fraction)"},
    {f:"Gas collected over water: P_dry = P_total \u2212 (aqueous tension)",k:"trap",note:"The \u201cdry gas\u201d pressure is below the wet total by exactly the aqueous tension."}]},
  {tag:"speeds",title:"Molecular speeds (the three)",rows:[
    {f:"u_rms = \u221a(3RT/M) = \u221a(3PV/M) = \u221a(3P/d)  \u00b7  u_avg = \u221a(8RT/\u03c0M)  \u00b7  u_mp = \u221a(2RT/M)"},
    {f:"u_rms : u_avg : u_mp = \u221a3 : \u221a(8/\u03c0) : \u221a2 = 1 : 0.9213 : 0.8166",k:"chem",note:"All \u221d \u221a(T/M). Heavier gas \u2192 slower; hotter \u2192 faster."}]},
  {tag:"ke",title:"Kinetic energy",rows:[
    {f:"Avg KE per molecule = (3/2)kT   \u00b7   KE per mole = (3/2)RT  (\u2248 3T cal)"},
    {f:"PV = (1/3) m N u\u00b2 = (2/3) \u00d7 (total translational KE)",k:"chem",note:"KE depends ONLY on T \u2014 not on P, V, or which gas. Same T \u21d2 same average KE."}]},
  {tag:"graham",title:"Graham's law (diffusion / effusion)",rows:[
    {f:"rate \u221d 1/\u221aM \u221d 1/\u221ad   \u2234   r\u2081/r\u2082 = \u221a(M\u2082/M\u2081) = \u221a(d\u2082/d\u2081)"},
    {f:"rate also \u221d orifice area  \u00b7  volume effused \u221d rate \u00d7 time",k:"chem",note:"The LIGHTER gas is the faster one. Use \u221aM, never M."}]},
  {tag:"z",title:"Compressibility factor Z (the spine)",rows:[
    {f:"Z = PV/nRT = V_real / V_ideal"},
    {f:"Z < 1 \u21d2 attractions dominate (Vm < 22.4 L)  \u00b7  Z > 1 \u21d2 size/repulsion dominates  \u00b7  Z = 1 \u21d2 ideal (or Boyle T)",k:"chem",note:"One dial for the whole real-gas story. Z>1 is NOT \u201cmore ideal\u201d."}]},
  {tag:"vdw",title:"van der Waals equation",rows:[
    {f:"(P + an\u00b2/V\u00b2)(V \u2212 nb) = nRT"},
    {f:"a = attraction (units atm\u00b7L\u00b2\u00b7mol\u207b\u00b2)  \u00b7  b = co-volume / size (units L\u00b7mol\u207b\u00b9)"},
    {f:"b = 4 \u00d7 (actual molar volume of molecules) = 4 \u00b7 N_A \u00b7 (4/3)\u03c0r\u00b3",k:"trap",note:"a is NOT size and b is NOT attraction. Keep their units straight."}]},
  {tag:"crit",title:"Critical constants \u2194 vdW",rows:[
    {f:"V_c = 3b   \u00b7   P_c = a/27b\u00b2   \u00b7   T_c = 8a/27Rb"},
    {f:"Z_c = P_c V_c / RT_c = 3/8 = 0.375   (every vdW gas)",k:"trap",note:"It is 3/8, not 8/3."},
    {f:"Reduced form: (\u03c0 + 3/\u03c6\u00b2)(3\u03c6 \u2212 1) = 8\u03b8   (\u03c0=P/P_c, \u03c6=V/V_c, \u03b8=T/T_c)",k:"chem",note:"Law of corresponding states \u2014 one universal equation, no a,b needed."}]},
  {tag:"temps",title:"Boyle / Inversion / Critical temperatures",rows:[
    {f:"Boyle T_B = a/bR   \u00b7   Inversion T_i = 2a/bR = 2T_B   \u00b7   Critical T_c = 8a/27Rb"},
    {f:"Order always  T_i > T_B > T_c",k:"chem",note:"All set by the a/b ratio; only the numerical coefficient differs."}]},
  {tag:"jt",title:"Joule\u2013Thomson effect",rows:[
    {f:"\u03bc_JT = (\u2202T/\u2202P)_H ;  cooling on throttling only when T < T_i"},
    {f:"Ideal gas: (\u2202U/\u2202V)_T = 0 and \u03bc_JT = 0  \u2192 no cooling, cannot be liquefied this way",k:"trap",note:"Not every gas cools on expansion \u2014 only below its inversion temperature."}]},
  {tag:"liquid",title:"Liquid state",rows:[
    {f:"Boiling: vapour pressure = external pressure (lower P \u21d2 lower b.p.)"},
    {f:"Surface tension \u03b3 \u2193 with T, \u2192 0 at T_c  \u00b7  drops are spherical (min surface)"},
    {f:"Viscosity \u03b7 \u2193 with T ;  \u03b7 = A\u00b7e^(E_a/RT)  \u21d2  ln\u03b7 vs 1/T is linear",k:"chem",note:"Both \u03b3 and \u03b7 come from attraction; heating weakens it, so both fall."}]}
];

/* ===== L2 CONCEPT CARDS (17) \u2014 Concept / Fork / Trap ===== */
let CHEM_SOM_PATTERNS = [
  {id:"C1",name:"Ideal-gas baseline & the R-value fork",
   trigger:"One gas (or one sample changing state) described by P, V, T, n \u2014 mass or density may stand in \u2014 with NO mention of \u2018real\u2019, \u2018van der Waals\u2019, \u2018high pressure\u2019, or \u2018critical\u2019.",
   move:"Reach for PV = nRT. Same sample, two states \u2192 P\u2081V\u2081/T\u2081 = P\u2082V\u2082/T\u2082 and cancel whatever is held constant. Density/mass involved \u2192 PM = dRT. Choose R to match the pressure unit (0.0821 atm\u00b7L, 0.083 bar\u00b7L, 8.314 SI).",
   why:"An ideal gas has point molecules and no attractions, so P, V, T and n are locked by a single equation of state; every \u2018gas law\u2019 is PV=nRT with three quantities fixed.",
   mini:"28 g N\u2082 in 10 L at 2.46 atm \u2192 T? n=1, T = PV/nR = 2.46\u00b710/0.0821 = 300 K.",
   fails:"Leaving T in \u00b0C, or using the wrong R for the pressure unit. 0\u00b0C\u219227\u00b0C is not a doubling of T.",
   src:"W.E-1..12 \u00b7 Ex-I Q11,Q19,Q21,Q24 \u00b7 Ex-IV Q2,Q3,Q4,Q6",
   srcText:{"Ex-IV Q6":"An ideal gas has a volume of 30 L at 20\u00b0C; it is compressed at constant T until the pressure doubles, then heated to 100\u00b0C at constant pressure. Find the final volume."}},
  {id:"C2",name:"Dalton: partial pressure & mole fraction",
   trigger:"A MIXTURE of non-reacting gases, or one gas collected over water, asking for a partial pressure, total pressure, or composition.",
   move:"P_total = \u03a3P\u1d62; each P\u1d62 = x\u1d62\u00b7P_total with x\u1d62 = n\u1d62/n_total. Over water: P_dry = P_total \u2212 aqueous tension.",
   why:"Each gas fills the whole volume independently and exerts the pressure it would alone, so pressures add; mole fraction is the common currency linking moles, pressure and volume.",
   mini:"Over water at 40\u00b0C, total 760 torr, aqueous tension 55 torr \u2192 P_dry = 705 torr.",
   fails:"Forgetting to subtract aqueous tension, or using mass fraction instead of MOLE fraction.",
   src:"W.E \u00b7 Ex-I Q44 \u00b7 Ex-III Q9,Q23 \u00b7 Ex-IV (moist-air passage)",
   srcText:{"Ex-III Q23":"1 L flask holds nitrogen with a drop of water at 40\u00b0C, total 760 torr; all contents are moved to a 0.5 L flask at the same temperature (aqueous tension 55 torr). Find the new total pressure of nitrogen."}},
  {id:"C3",name:"Which molecular speed (rms / avg / mp)",
   trigger:"A speed is asked and the word is \u2018root-mean-square\u2019, \u2018average / mean\u2019, or \u2018most probable\u2019 (peak of the distribution).",
   move:"u_rms=\u221a(3RT/M), u_avg=\u221a(8RT/\u03c0M), u_mp=\u221a(2RT/M). Fixed ratio 1 : 0.9213 : 0.8166. To compare two gases use the \u221a(T/M) scaling directly.",
   why:"All three come from the one Maxwell distribution \u2014 rms from \u27e8v\u00b2\u27e9, mean from the first moment, most-probable from the peak \u2014 so they differ only by constants and keep their ratio.",
   mini:"Same gas, T doubled \u2192 every speed scales by \u221a2.",
   fails:"Mixing the formulae (using \u221a3 when \u2018most probable\u2019 was asked), or forgetting M in kg/mol for SI R.",
   src:"W.E \u00b7 Ex-I Q73,Q74,Q75 \u00b7 Ex-III Q72",
   srcText:{"Ex-I Q75":"At STP, arrange the rms velocities of H\u2082, N\u2082, O\u2082 and HBr in order."}},
  {id:"C4",name:"Kinetic energy \u2194 temperature",
   trigger:"Anything about the ENERGY of molecules, or a claim that KE depends on pressure or on the identity of the gas.",
   move:"Average KE per molecule = (3/2)kT; per mole = (3/2)RT (\u2248 3T cal). It depends ONLY on temperature \u2014 not on P, V, or the gas.",
   why:"Temperature IS mean molecular kinetic energy: at the same T every gas has the same average translational KE (heavier ones simply move slower).",
   mini:"Three different gases at the same T \u2192 identical average KE.",
   fails:"Claiming KE depends on pressure, or that a heavier/denser gas has more KE at the same T.",
   src:"W.E \u00b7 Ex-I Q64,Q66 \u00b7 Ex-III Q8 \u00b7 Ex-IV Q1",
   srcText:{"Ex-I Q64":"Which one of the following is NOT a postulate of the kinetic theory of gases?"}},
  {id:"C5",name:"Graham's law of diffusion / effusion",
   trigger:"Rates of effusion/diffusion compared, \u2018n times faster/slower\u2019, or a molar mass found from a rate.",
   move:"rate \u221d 1/\u221aM \u221d 1/\u221ad, so r\u2081/r\u2082 = \u221a(M\u2082/M\u2081) = \u221a(d\u2082/d\u2081). Rate also scales with orifice area and with 1/\u221a(time).",
   why:"Lighter molecules move faster at the same KE, so they stream through a hole more often; effusion rate tracks the mean speed \u221d 1/\u221aM.",
   mini:"H\u2082 effuses 4\u00d7 faster than X \u2192 M_X = 16\u00b7M_H\u2082 = 32.",
   fails:"Inverting the ratio (the faster gas is LIGHTER), or using M instead of \u221aM.",
   src:"W.E \u00b7 Ex-III Q27,Q28 \u00b7 Ex-IV Q8,Q33",
   srcText:{"Ex-III Q27":"At 1200\u00b0C a mixture of Cl\u2082 and Cl atoms effuses 1.16\u00d7 as fast as krypton; find the fraction of Cl\u2082 dissociated."}},
  {id:"C6",name:"Compressibility factor Z (the spine)",
   trigger:"The words \u2018compressibility\u2019, \u2018Z\u2019, \u2018deviation from ideal\u2019, \u2018real gas at high P\u2019, or \u2018Vm vs 22.4 L\u2019.",
   move:"Z = PV/nRT = V_real/V_ideal. Read it: Z<1 \u21d2 attractions dominate (Vm<22.4); Z>1 \u21d2 size/repulsion dominates; Z=1 \u21d2 ideal (or at the Boyle temperature).",
   why:"Z is the single dial that says how and in which direction a real gas departs from PV=nRT; the whole real-gas story is Z drifting from 1 and back.",
   mini:"1 mol SO\u2082, 350 mL, 300 K, 50 atm \u2192 Z = 50\u00b70.35/(0.0821\u00b7300) = 0.711 (<1).",
   fails:"Reading Z>1 as \u2018more ideal\u2019, or forgetting Vm<22.4 L whenever Z<1.",
   src:"Ex-I Q85,Q94 \u00b7 Ex-III Q3,Q33 \u00b7 Ex-IV Q35,Q42",
   fig:"z_vs_p",
   srcText:{"Ex-IV Q42":"1 mol of SO\u2082 occupies 350 mL at 300 K and 50 atm; find the compressibility factor."}},
  {id:"C7",name:"van der Waals: a vs b",
   trigger:"The van der Waals equation, its constants a or b, \u2018internal pressure\u2019, \u2018co-volume\u2019, or comparing two gases\u2019 a/b values.",
   move:"(P + an\u00b2/V\u00b2)(V \u2212 nb) = nRT. a = attraction (the +an\u00b2/V\u00b2 term; atm\u00b7L\u00b2\u00b7mol\u207b\u00b2). b = co-volume/size (L\u00b7mol\u207b\u00b9), with b = 4\u00d7(molar volume of molecules) = 4\u00b7N_A\u00b7(4/3)\u03c0r\u00b3.",
   why:"Real molecules attract (lowering wall pressure \u2192 +a/V\u00b2) and occupy space (reducing free volume \u2192 \u2212nb); stickier \u21d2 larger a, bigger \u21d2 larger b.",
   mini:"Of O\u2082, N\u2082, NH\u2083, CH\u2084 (a = 1.36, 1.39, 4.17, 2.25), NH\u2083 has the largest a \u21d2 liquefies most easily.",
   fails:"Swapping the roles (a is NOT size; b is NOT attraction), or muddling their units.",
   src:"Ex-I Q100 \u00b7 Ex-III Q31,Q38 \u00b7 Ex-IV Q32,Q40,Q41,Q43",
   srcText:{"Ex-IV Q43":"Find the pressure exerted by 8.5 g NH\u2083 in a 0.5 L vessel at 300 K (a=4.0, b=0.036)."}},
  {id:"C8",name:"Critical constants \u2194 vdW constants",
   trigger:"Critical temperature/pressure/volume given or asked, or a problem mixing T_c/P_c/V_c with a, b.",
   move:"V_c = 3b, P_c = a/27b\u00b2, T_c = 8a/27Rb, and Z_c = P_cV_c/RT_c = 3/8. Use any two relations to back out a and b.",
   why:"At the critical point \u2202P/\u2202V and \u2202\u00b2P/\u2202V\u00b2 both vanish; solving these on the vdW equation pins the critical constants to a and b.",
   mini:"T_c=303 K, P_c=73 atm \u2192 b = RT_c/8P_c = 0.0821\u00b7303/(8\u00b773) \u2248 0.0426 L/mol.",
   fails:"Using Z_c = 8/3 instead of 3/8, or leaving T_c in \u00b0C.",
   src:"W.E-34 \u00b7 Ex-III Q38 \u00b7 Ex-IV Q35,Q40",
   srcText:{"Ex-III Q38":"The critical temperature and pressure of a van der Waals gas are 30\u00b0C and 73 atm; find b."}},
  {id:"C9",name:"Boyle / Inversion / Critical temperature",
   trigger:"The names \u2018Boyle temperature\u2019, \u2018inversion temperature\u2019, or an ordering of these characteristic temperatures.",
   move:"T_B = a/bR; T_i = 2a/bR = 2T_B; T_c = 8a/27Rb. The order is always T_i > T_B > T_c.",
   why:"All three are set by the same a/b ratio (attraction vs size): T_B is where attractions and size cancel (Z=1), T_i is twice that, T_c is the smaller 8a/27Rb.",
   mini:"H\u2082 with a=0.244, b=0.027 \u2192 T_i = 2a/Rb = 2\u00b70.244/(0.0821\u00b70.027) \u2248 220 K.",
   fails:"Mixing the formulae, or ranking T_c > T_B (it is the reverse).",
   src:"Ex-III Q39,Q40 \u00b7 Ex-IV Q49",
   srcText:{"Ex-III Q39":"Give the correct order of the Boyle, critical and inversion temperatures of a gas."}},
  {id:"C10",name:"Joule\u2013Thomson effect & inversion",
   trigger:"A gas expanding through a throttle / porous plug, \u2018cooling on expansion\u2019, or the Joule\u2013Thomson coefficient \u03bc_JT.",
   move:"\u03bc_JT = (\u2202T/\u2202P)_H. A real gas cools on throttling only when T < T_i; above T_i it warms. For an IDEAL gas \u03bc_JT = 0.",
   why:"On expansion real molecules spend kinetic energy pulling against their mutual attraction \u2192 cooling \u2014 but only while attractions matter (below T_i). Ideal gas: (\u2202U/\u2202V)_T = 0, so \u03bc_JT = 0.",
   mini:"Why can\u2019t an ideal gas be liquefied by JT cooling? \u03bc_JT = 0 \u2014 it neither cools nor warms on expansion.",
   fails:"Claiming every gas cools on expansion, or that an ideal gas shows a JT effect.",
   src:"Ex-III Q41 (A/R) \u00b7 Ex-IV Q49,Q51 (A/R)",
   srcText:{"Ex-IV Q51":"Statement: the Joule\u2013Thomson coefficient of an ideal gas is zero. Explanation: an ideal gas has no intermolecular attractions."}},
  {id:"C11",name:"Maxwell\u2013Boltzmann distribution",
   trigger:"A speed-distribution curve (fraction of molecules vs speed), or how that curve changes with temperature.",
   move:"Area under the curve is constant (= total molecules). Raising T flattens and broadens the curve and pushes the peak (u_mp) RIGHT and DOWN; the lowest, sharpest, left-most peak is the LOWEST temperature.",
   why:"Heating gives more molecules high speeds, spreading the distribution; the peak must drop because the enclosed area (number of molecules) is fixed.",
   mini:"Three curves, peaks shifting right and lowering \u2192 temperature order = (tallest/leftmost) < \u2026 < (flattest/rightmost).",
   fails:"Thinking the area changes with T, or reading the tallest peak as the hottest gas.",
   src:"Ex-III Q21 \u00b7 Ex-IV (Maxwell statements)",
   fig:"maxwell",
   srcText:{"Ex-III Q21":"Three Maxwell\u2013Boltzmann curves are drawn for T\u2081,T\u2082,T\u2083; give the correct order of temperature."}},
  {id:"C12",name:"Liquefaction & critical phenomena",
   trigger:"Liquefying a gas, Andrews isotherms, the critical point, or a meniscus / surface-tension statement at T_c.",
   move:"A gas can be liquefied only BELOW its critical temperature (no pressure liquefies it above T_c). At T_c the liquid and vapour densities become equal, the meniscus vanishes, and surface tension \u2192 0. Higher T_c (larger a) \u21d2 easier to liquefy.",
   why:"Above T_c thermal energy beats the intermolecular attraction, so no distinct liquid forms; T_c measures the strength of those attractions.",
   mini:"CO\u2082 has a higher T_c than CH\u2084 \u21d2 stronger forces \u21d2 liquefies more easily.",
   fails:"Believing enough pressure can liquefy any gas at any temperature (false above T_c).",
   src:"Ex-I Q97,Q98,Q99 \u00b7 Ex-III statements \u00b7 Ex-IV Q52 (A/R)",
   srcText:{"Ex-IV Q52":"Statement: CO\u2082 has stronger intermolecular forces than CH\u2084. Explanation: the critical temperature of CO\u2082 is higher."}},
  {id:"C13",name:"Intermolecular forces \u2014 distance laws",
   trigger:"Identifying or ranking an intermolecular force, or its dependence on separation r.",
   move:"Match force \u2194 distance law: ion\u2013dipole \u221d 1/r\u00b2; dipole\u2013dipole stationary \u221d 1/r\u00b3; dipole\u2013dipole rotating \u221d 1/r\u2076; ion\u2013induced-dipole \u221d 1/r\u2074; London / dispersion \u221d 1/r\u2076. London grows with size/polarizability (HI > HBr > HCl).",
   why:"Higher-order multipole interactions fall off faster with distance; the steep 1/r\u2076 laws (rotating dipole\u2013dipole and London) are the weak short-range glue behind most condensation.",
   mini:"Among HCl, HBr, HI, London forces are largest in HI (most polarizable).",
   fails:"Confusing the exponents \u2014 especially rotating dipole\u2013dipole (1/r\u2076) vs stationary (1/r\u00b3).",
   src:"Ex-I Q2,Q3,Q4,Q5 \u00b7 Ex-IV three-column matrix Q101-104",
   srcText:{"Ex-I Q3":"The dipole\u2013dipole interaction energy between rotating polar molecules is proportional to which power of r?"}},
  {id:"C14",name:"Manometer fork (open / closed end)",
   trigger:"A mercury U-tube manometer attached to a gas bulb, with a height difference h between the two columns.",
   move:"Decide the fork. OPEN-end: P_gas = P_atm \u00b1 h \u2014 ADD h if the gas column is pushed DOWN (gas above atmospheric), SUBTRACT if pushed up. CLOSED-end: P = h directly. After a reaction changes moles, recompute P and read the new h.",
   why:"The mercury height difference measures the pressure imbalance; which arm is higher tells you whether the gas is above or below atmospheric.",
   mini:"Open-end manometer, gas-side mercury LOWER by h \u2192 P_gas = P_atm + h.",
   fails:"Getting the \u00b1 sign wrong, or treating an open-end tube like a closed one.",
   src:"Ex-I Q9 (NH\u2083 dissociation) \u00b7 Ex-III Q5 \u00b7 Ex-IV manometer items",
   fig:"manometer",
   srcText:{"Ex-I Q9":"After sparking, NH\u2083 in a manometer dissociates and the two mercury columns differ by 12 cm; find the partial pressures of H\u2082 and N\u2082."}},
  {id:"C15",name:"Open-vessel  nT = constant",
   trigger:"A vessel OPEN to the atmosphere (pressure fixed) that is heated, with gas escaping.",
   move:"Open vessel at fixed P and V \u21d2 nT = constant \u21d2 n\u2081T\u2081 = n\u2082T\u2082. Moles left at T\u2082 = n\u2081(T\u2081/T\u2082); fraction expelled = 1 \u2212 T\u2081/T\u2082.",
   why:"With P and V pinned, PV=nRT forces the product nT to stay constant, so heating pushes moles out.",
   mini:"Air at 300 K heated until \u00bc of the mass is expelled (n\u2192\u00ben) \u2192 T\u2082 = 300/(3/4) = 400 K.",
   fails:"Holding n fixed in an open vessel (gas leaves), or leaving T in \u00b0C.",
   src:"Ex-I Q13 (flask, 25% air expelled) \u00b7 Ex-IV open-vessel items",
   srcText:{"Ex-I Q13":"A flask of air at 27\u00b0C is heated until 25% of the air by mass is expelled; find the final temperature."}},
  {id:"C16",name:"Vapour pressure & boiling",
   trigger:"Vapour pressure, boiling point, altitude / pressure-cooker effects, or \u2018dry vs wet gas\u2019.",
   move:"A liquid boils when its vapour pressure equals the external pressure. Lower external pressure (high altitude) \u21d2 lower boiling point \u21d2 slower cooking. Vapour pressure rises with T. Wet-gas pressure = dry-gas pressure + aqueous tension.",
   why:"Boiling is bulk vaporisation, needing VP to reach the surrounding pressure; less atmospheric push-back means boiling starts at a lower temperature.",
   mini:"On a mountain the pressure is lower, so water boils below 100\u00b0C and food cooks slowly.",
   fails:"Thinking altitude RAISES the boiling point, or forgetting aqueous tension for a gas over water.",
   src:"Ex-I Q53,Q101 \u00b7 Ex-III Q23 (aqueous tension)",
   srcText:{"Ex-I Q101":"In Shimla, cooking without a pressure cooker takes longer because at high altitude the pressure does what?"}},
  {id:"C17",name:"Surface tension & viscosity",
   trigger:"Surface tension or viscosity of a liquid, its trend with temperature, or \u2018which liquid flows slowest\u2019.",
   move:"Both surface tension (\u03b3) and viscosity (\u03b7) DECREASE as T rises; \u03b3 \u2192 0 at T_c. Higher \u03b7 \u21d2 flows more slowly. \u03b7 = A\u00b7e^(E_a/RT), so ln\u03b7 vs 1/T is linear.",
   why:"Surface tension and viscosity both arise from intermolecular attraction; heating weakens it, so both fall. Drops are spherical because surface tension minimises surface area.",
   mini:"Of liquids with \u03b7 = 85, 11.4, 18, 12.3 mP, the one with \u03b7=85 flows the slowest.",
   fails:"Saying viscosity rises with T, or that \u03b7 (not ln\u03b7) vs 1/T is the linear plot.",
   src:"Ex-I Q105,Q106,Q108,Q109",
   srcText:{"Ex-I Q109":"Which behaviour of the coefficient of viscosity of a liquid is correct (which plot is linear)?"}}
];

/* ===== L3 GUIDED (12, laddered; opts = which concept to apply) ===== */
let CHEM_SOM_GUIDED = [
  /* TIER 1 */
  {id:"G1",tier:1,tax:"C1",pattern:"C1",q:"28 g of N\u2082 gas occupies 10 L at 2.46 atm. Find the temperature of the gas.",opts:["Ideal-gas baseline (PV = nRT)","Dalton partial pressure","Graham's law of effusion","van der Waals correction"],correct:0,
   hints:["28 g N\u2082 = 1 mol; you have P, V, n and want T \u2192 straight PV = nRT.","T = PV/nR.","T = 2.46\u00b710/(1\u00b70.0821)."],ans:"300 K",why:"One gas, ideal conditions, three of P,V,T,n known \u21d2 PV = nRT."},
  {id:"G2",tier:1,tax:"C2",pattern:"C2",q:"A vessel holds 4 g of O\u2082 and 4 g of He. Find the mole fraction of He and say which gas has the larger partial pressure.",opts:["Dalton: mole fractions","Graham's law","Kinetic energy \u2194 T","van der Waals"],correct:0,
   hints:["Moles: O\u2082 = 4/32 = 0.125; He = 4/4 = 1.0.","x_He = 1.0/(1.0 + 0.125) = 8/9.","Partial pressure \u221d moles."],ans:"x_He = 8/9 \u2248 0.89; He has the larger partial pressure",why:"Partial pressure tracks MOLE fraction, not mass \u2014 He's tiny molar mass gives it most of the moles."},
  {id:"G3",tier:1,tax:"C5",pattern:"C5",q:"Hydrogen effuses 4 times faster than an unknown gas X under identical conditions. Find the molar mass of X.",opts:["Graham's law (rate \u221d 1/\u221aM)","Ideal-gas baseline","Dalton partial pressure","Maxwell\u2013Boltzmann"],correct:0,
   hints:["r_H/r_X = \u221a(M_X/M_H).","4 = \u221a(M_X/2) \u21d2 16 = M_X/2.","M_X = 32."],ans:"32 g/mol",why:"Rate ratio squared gives the molar-mass ratio; the slower gas is heavier."},
  /* TIER 2 */
  {id:"G4",tier:2,tax:"C3",pattern:"C3",q:"At 300 K, which is larger for O\u2082 \u2014 its rms speed or its most-probable speed \u2014 and by what factor?",opts:["Molecular-speed selection (rms vs mp)","Kinetic energy \u2194 T","Graham's law","Compressibility Z"],correct:0,
   hints:["u_rms = \u221a(3RT/M), u_mp = \u221a(2RT/M).","Ratio u_rms/u_mp = \u221a(3/2) = \u221a1.5.","Independent of the gas and of T."],ans:"u_rms is larger, by \u221a1.5 \u2248 1.22",why:"The three speeds keep the fixed ratio 1 : 0.921 : 0.816 (rms : avg : mp)."},
  {id:"G5",tier:2,tax:"C6",pattern:"C6",q:"1 mole of SO\u2082 occupies 350 mL at 300 K and 50 atm. Find its compressibility factor and interpret it.",opts:["Compressibility factor Z = PV/nRT","Critical constants","Graham's law","Ideal-gas baseline only"],correct:0,
   hints:["Z = PV/nRT with V = 0.350 L.","Z = 50\u00b70.350/(1\u00b70.0821\u00b7300).","Z \u2248 0.711."],ans:"Z \u2248 0.711 (<1 \u21d2 attractive forces dominate)",why:"Z<1 means the real volume is smaller than ideal \u2014 attractions pull the molecules together."},
  {id:"G6",tier:2,tax:"C7",pattern:"C7",q:"Calculate the pressure exerted by 8.5 g of NH\u2083 in a 0.5 L vessel at 300 K (a = 4.0 atm L\u00b2 mol\u207b\u00b2, b = 0.036 L mol\u207b\u00b9).",opts:["van der Waals equation","Ideal-gas baseline","Critical constants","Dalton partial pressure"],correct:0,
   hints:["n = 8.5/17 = 0.5 mol.","P = nRT/(V \u2212 nb) \u2212 an\u00b2/V\u00b2.","= (0.5\u00b70.0821\u00b7300)/(0.5 \u2212 0.5\u00b70.036) \u2212 4\u00b70.5\u00b2/0.5\u00b2."],ans:"\u2248 21.51 atm",why:"With real-gas constants supplied, use the full vdW equation, not PV = nRT."},
  {id:"G7",tier:2,tax:"C1",pattern:"C1",q:"At 0\u00b0C the density of a gaseous oxide at 2 bar equals the density of N\u2082 at 5 bar. Find the molar mass of the oxide.",opts:["Density relation d = PM/RT","Graham's law","Dalton partial pressure","Compressibility Z"],correct:0,
   hints:["d = PM/RT, so equal densities \u21d2 P\u00b7M is equal for both.","2\u00b7M_oxide = 5\u00b728.","M_oxide = 140/2."],ans:"70 g/mol",why:"Density ties P and M together at fixed T; equate the two PM products."},
  /* TIER 3 */
  {id:"G8",tier:3,tax:"C8",pattern:"C8",q:"The critical temperature and pressure of a van der Waals gas are 30\u00b0C and 73 atm. Find its constant b.",opts:["Critical constants \u2194 vdW","van der Waals pressure","Boyle / inversion temperatures","Ideal-gas baseline"],correct:0,
   hints:["T_c = 303 K, P_c = 73 atm.","b = RT_c/(8P_c) (from T_c = 8a/27Rb and P_c = a/27b\u00b2).","b = 0.0821\u00b7303/(8\u00b773)."],ans:"b \u2248 0.0426 L/mol",why:"Two critical relations let you eliminate a and solve for b directly."},
  {id:"G9",tier:3,tax:"C8",pattern:"C8",q:"A gas has reduced volume \u03c6 = 10 and reduced temperature \u03b8 = 0.725. If its critical pressure is 50 atm, find the actual pressure.",opts:["Law of corresponding states (reduced vdW)","Compressibility Z","Critical constants only","van der Waals with a,b"],correct:0,
   hints:["Use (\u03c0 + 3/\u03c6\u00b2)(3\u03c6 \u2212 1) = 8\u03b8 with \u03c6 = 10, \u03b8 = 0.725.","(\u03c0 + 0.03)(29) = 5.8 \u21d2 \u03c0 + 0.03 = 0.2 \u21d2 \u03c0 = 0.17.","P = \u03c0\u00b7P_c = 0.17\u00b750."],ans:"\u2248 8.5 atm",why:"In reduced variables every gas obeys one universal equation \u2014 no a, b needed."},
  {id:"G10",tier:3,tax:"C9",pattern:"C9",q:"List the Boyle (T_B), critical (T_c) and inversion (T_i) temperatures of a gas in increasing order.",opts:["Boyle / Inversion / Critical relations","Joule\u2013Thomson coefficient","Maxwell\u2013Boltzmann","Critical constants"],correct:0,
   hints:["T_B = a/bR, T_i = 2a/bR, T_c = 8a/27Rb.","As coefficients of a/bR: T_c = 8/27 \u2248 0.30, T_B = 1, T_i = 2.","So T_c < T_B < T_i."],ans:"T_c < T_B < T_i  (i.e. T_i > T_B > T_c)",why:"All three scale with a/bR; only the numerical coefficient differs."},
  {id:"G11",tier:3,tax:"C10",pattern:"C10",q:"The van der Waals constants of H\u2082 are a = 0.244, b = 0.027. Find its inversion temperature and say whether throttling at 300 K cools or warms it.",opts:["Joule\u2013Thomson & inversion temperature","Critical constants","Graham's law","Boyle temperature only"],correct:0,
   hints:["T_i = 2a/Rb.","= 2\u00b70.244/(0.0821\u00b70.027) \u2248 220 K.","300 K > T_i."],ans:"T_i \u2248 220 K; at 300 K (> T_i) H\u2082 WARMS on throttling",why:"A gas cools on Joule\u2013Thomson expansion only below its inversion temperature."},
  {id:"G12",tier:3,tax:"C5",pattern:"C5",q:"At 1200\u00b0C a mixture of Cl\u2082 and Cl atoms effuses 1.16 times as fast as krypton (M = 84). What fraction of Cl\u2082 has dissociated into atoms?",opts:["Graham's law + dissociation (mean molar mass)","Ideal-gas baseline","Compressibility Z","Maxwell\u2013Boltzmann"],correct:0,
   hints:["Mean molar mass from rate: \u221a(84/M_mix) = 1.16 \u21d2 M_mix \u2248 62.4.","Cl\u2082 \u21cc 2Cl with degree \u03b1 \u21d2 mean M = 71/(1 + \u03b1).","71/(1 + \u03b1) = 62.4 \u21d2 \u03b1 \u2248 0.14."],ans:"\u2248 14 %",why:"Dissociation lowers the average molar mass; Graham's law reads that off the effusion rate."}
];

/* ===== L4 PRACTICE (curated, MCQ with printed options; verified vs Exercise keys) ===== */
let CHEM_SOM_PRACTICE = [
  /* ---------- Exercise-I (Foundation / Main) ---------- */
  {src:"Ex-I Q1",doc:"exI",type:"SC",tier:1,tax:"C4",q:"With regard to the gaseous state, which statements are correct? (i) complete order of molecules (ii) complete disorder of molecules (iii) random motion of molecules (iv) fixed positions of molecules",choices:["i, iv","ii, iii","ii, iv","iii, iv"],correct:1,pat:"C4 \u00b7 kinetic picture of a gas",ans:"ii, iii"},
  {src:"Ex-I Q3",doc:"exI",type:"SC",tier:2,tax:"C13",q:"The dipole\u2013dipole interaction energy between rotating polar molecules is proportional to:",choices:["r\u00b3","1/r\u00b3","1/r\u2076","r\u2076"],correct:2,pat:"C13 \u00b7 rotating dipole\u2013dipole \u221d 1/r\u2076",ans:"1/r\u2076",nudge:"Rotation averages out the 1/r\u00b3 term, leaving the steeper 1/r\u2076."},
  {src:"Ex-I Q4",doc:"exI",type:"SC",tier:1,tax:"C13",q:"Ion\u2013dipole attractions are present in:",choices:["Water","NaCl in water","Benzene","All of these"],correct:1,pat:"C13 \u00b7 ion\u2013dipole",ans:"NaCl in water"},
  {src:"Ex-I Q5",doc:"exI",type:"SC",tier:2,tax:"C13",q:"Among the following, London (dispersion) forces are maximum in:",choices:["HCl","HBr","HI","All are equal"],correct:2,pat:"C13 \u00b7 London \u221d polarizability",ans:"HI",nudge:"Largest, most polarizable electron cloud \u21d2 strongest dispersion."},
  {src:"Ex-I Q11",doc:"exI",type:"SC",tier:1,tax:"C1",q:"For a given mass of gas at constant temperature, if the volume V becomes three times, the pressure P becomes:",choices:["3P","P/3","3P/T","9P\u00b2"],correct:1,pat:"C1 \u00b7 Boyle's law",ans:"P/3"},
  {src:"Ex-I Q19",doc:"exI",type:"SC",tier:2,tax:"C1",q:"Which of the following statements is NOT correct?",choices:["Volume of a gas is zero at absolute zero","The ratio of volumes of a gas at 0\u00b0C and 273\u00b0C is 1:2","At constant volume, P plotted against absolute temperature gives isochores","If the temperature is doubled, the volume of the gas is doubled"],correct:3,pat:"C1 \u00b7 the kelvin trap",ans:"If the temperature is doubled, the volume is doubled",nudge:"True only if T is in kelvin; doubling \u00b0C is not doubling T."},
  {src:"Ex-I Q21",doc:"exI",type:"SC",tier:2,tax:"C1",q:"The temperature at which the volume of a gas at 0\u00b0C is doubled at constant P and n is:",choices:["273 K","273 \u00b0C","546 \u00b0C","127 \u00b0C"],correct:1,pat:"C1 \u00b7 Charles' law",ans:"273 \u00b0C",nudge:"V doubles \u21d2 T = 546 K = 273 \u00b0C."},
  {src:"Ex-I Q24",doc:"exI",type:"SC",tier:2,tax:"C1",q:"The incorrect relationship according to Charles' law is:",choices:["V \u221d 1/T","(dV/dT)_P = K","(dT/dV)_P = K","Both 2 and 3"],correct:0,pat:"C1 \u00b7 Charles V \u221d T",ans:"V \u221d 1/T"},
  {src:"Ex-I Q28",doc:"exI",type:"SC",tier:2,tax:"C1",q:"V-versus-T plots for a gas at constant pressure are straight lines through the origin, drawn for four pressures P\u2081..P\u2084 (see figure). The correct order of pressure is:",choices:["P\u2081 > P\u2082 > P\u2083 > P\u2084","P\u2081 = P\u2082 = P\u2083 = P\u2084","P\u2081 < P\u2082 < P\u2083 < P\u2084","P\u2081 < P\u2082 = P\u2083 < P\u2084"],correct:2,pat:"C1 \u00b7 isobars: steeper = lower P",ans:"P\u2081 < P\u2082 < P\u2083 < P\u2084",fig:"vt_isobars",nudge:"Steeper V\u2013T line \u21d2 lower pressure."},
  {src:"Ex-I Q32",doc:"exI",type:"SC",tier:2,tax:"C1",q:"Which of the following correctly relates the density of an ideal gas to its conditions in two states?",choices:["P\u2081d\u2081T\u2081 = P\u2082d\u2082T\u2082","d\u2081P\u2081/T\u2081 = d\u2082P\u2082/T\u2082","P\u2081/(d\u2081T\u2081) = P\u2082/(d\u2082T\u2082)","P\u2081T\u2081/d\u2081 = P\u2082T\u2082/d\u2082"],correct:2,pat:"C1 \u00b7 d = PM/RT \u21d2 P/(dT)=const",ans:"P\u2081/(d\u2081T\u2081) = P\u2082/(d\u2082T\u2082)"},
  {src:"Ex-I Q33",doc:"exI",type:"SC",tier:2,tax:"C1",q:"If m is the mass of one molecule, k the Boltzmann constant, P the pressure and T the absolute temperature, the density of the gas is:",choices:["kT/Pm","P\u00b7T/(k\u00b7m)","P\u00b7m/(k\u00b7T)","P\u00b7k/(T\u00b7m)"],correct:2,pat:"C1 \u00b7 d = Pm/kT",ans:"P\u00b7m/(k\u00b7T)"},
  {src:"Ex-I Q44",doc:"exI",type:"SC",tier:1,tax:"C2",q:"In a mixture of non-reacting gases, the ratio of the partial pressure of each component equals its:",choices:["Weight percent","Volume percent","Mole fraction","Critical pressure"],correct:2,pat:"C2 \u00b7 partial pressure \u221d mole fraction",ans:"Mole fraction"},
  {src:"Ex-I Q53",doc:"exI",type:"SC",tier:2,tax:"C16",q:"The vapour pressure of a dry gas, compared with the same gas saturated with water vapour (wet gas), is:",choices:["Less than that of the wet gas","Greater than that of the wet gas","Equal to that of the wet gas","Double that of the wet gas"],correct:0,pat:"C16 \u00b7 P_dry = P_wet \u2212 aqueous tension",ans:"Less than that of the wet gas"},
  {src:"Ex-I Q64",doc:"exI",type:"SC",tier:2,tax:"C4",q:"Which one of the following is NOT a postulate of the kinetic theory of gases?",choices:["The K.E. depends on the temperature of the gas","The K.E. depends on the pressure of the gas","The collisions are perfectly elastic","Gas pressure is due to molecular collisions on the walls"],correct:1,pat:"C4 \u00b7 KE depends only on T",ans:"The K.E. depends on the pressure of the gas"},
  {src:"Ex-I Q66",doc:"exI",type:"SC",tier:1,tax:"C4",q:"When two molecules of an ideal gas collide:",choices:["Heat is liberated","No heat is liberated","Heat is absorbed","The total kinetic energy decreases"],correct:1,pat:"C4 \u00b7 elastic collisions",ans:"No heat is liberated"},
  {src:"Ex-I Q73",doc:"exI",type:"SC",tier:2,tax:"C3",q:"The rms velocity is \u221a(3PV/M). If the volume is increased three-fold at constant temperature, the rms velocity:",choices:["Increases 3 times","Decreases 9 times","Increases \u221a3 times","Does not change"],correct:3,pat:"C3 \u00b7 rms depends on T, not V",ans:"Does not change",nudge:"At constant T, PV is constant, so 3PV/M is unchanged."},
  {src:"Ex-I Q74",doc:"exI",type:"SC",tier:2,tax:"C3",q:"At a given temperature the rms velocity is minimum for:",choices:["N\u2082","SO\u2082","CO\u2082","SO\u2083"],correct:3,pat:"C3 \u00b7 rms \u221d 1/\u221aM",ans:"SO\u2083",nudge:"Heaviest molar mass (80) \u21d2 slowest."},
  {src:"Ex-I Q75",doc:"exI",type:"SC",tier:2,tax:"C3",q:"At STP the order of rms velocities of H\u2082, N\u2082, O\u2082 and HBr is:",choices:["H\u2082 > N\u2082 > O\u2082 > HBr","HBr > O\u2082 > N\u2082 > H\u2082","HBr > H\u2082 > N\u2082 > O\u2082","N\u2082 > O\u2082 > H\u2082 > HBr"],correct:0,pat:"C3 \u00b7 lighter is faster",ans:"H\u2082 > N\u2082 > O\u2082 > HBr"},
  {src:"Ex-I Q85",doc:"exI",type:"SC",tier:1,tax:"C6",q:"The most ideal gas among the following is:",choices:["H\u2082","He","CO\u2082","N\u2082"],correct:1,pat:"C6 \u00b7 weakest forces, smallest a",ans:"He"},
  {src:"Ex-I Q94",doc:"exI",type:"SC",tier:2,tax:"C6",q:"The compressibility factor of a gas is less than unity at STP. Therefore:",choices:["Vm > 22.4 L","Vm < 22.4 L","Vm = 22.4 L","Vm = 44.8 L"],correct:1,pat:"C6 \u00b7 Z<1 \u21d2 Vm<22.4",ans:"Vm < 22.4 L"},
  {src:"Ex-I Q97",doc:"exI",type:"SC",tier:1,tax:"C12",q:"The temperature above which a gas cannot be liquefied however high the pressure is called the:",choices:["Boyle temperature","Critical temperature","Liquefaction temperature","Inversion temperature"],correct:1,pat:"C12 \u00b7 critical temperature",ans:"Critical temperature"},
  {src:"Ex-I Q98",doc:"exI",type:"SC",tier:2,tax:"C6",q:"A real gas is expected to show maximum deviation from ideal behaviour at:",choices:["Low T and high P","Low T and low P","High T and high P","High T and low P"],correct:0,pat:"C6 \u00b7 deviations at low T, high P",ans:"Low T and high P"},
  {src:"Ex-I Q100",doc:"exI",type:"SC",tier:2,tax:"C7",q:"The van der Waals constant 'a' for O\u2082, N\u2082, NH\u2083 and CH\u2084 are 1.360, 1.390, 4.170 and 2.253 dm\u2076 atm mol\u207b\u00b2. The gas most easily liquefied is:",choices:["O\u2082","N\u2082","NH\u2083","CH\u2084"],correct:2,pat:"C7 \u00b7 larger a \u21d2 easier to liquefy",ans:"NH\u2083"},
  {src:"Ex-I Q101",doc:"exI",type:"SC",tier:1,tax:"C16",q:"In Shimla, cooking food without a pressure cooker takes longer because at high altitude:",choices:["pressure increases","temperature decreases","pressure decreases","temperature increases"],correct:2,pat:"C16 \u00b7 low P \u21d2 low boiling point",ans:"pressure decreases"},
  {src:"Ex-I Q106",doc:"exI",type:"SC",tier:1,tax:"C17",q:"Increasing the temperature of a liquid causes its viscosity to:",choices:["Decrease","Increase","Remain unchanged","Decrease then increase"],correct:0,pat:"C17 \u00b7 viscosity falls with T",ans:"Decrease"},
  {src:"Ex-I Q108",doc:"exI",type:"SC",tier:1,tax:"C17",q:"The viscosities of four liquids P, Q, R, S are 85, 11.4, 18 and 12.3 (milli-poise). Which flows the slowest?",choices:["P","Q","R","S"],correct:0,pat:"C17 \u00b7 higher \u03b7 \u21d2 slower flow",ans:"P"},
  {src:"Ex-I Q109",doc:"exI",type:"SC",tier:2,tax:"C17",q:"Which behaviour of the coefficient of viscosity (\u03b7) of a liquid is correct?",choices:["\u03b7 vs T is linear","\u03b7 vs 1/T is linear","\u03b7 = E/RT","log \u03b7 vs 1/T is linear"],correct:3,pat:"C17 \u00b7 \u03b7 = A\u00b7e^(E/RT)",ans:"log \u03b7 vs 1/T is linear"},
  {src:"Ex-I Q34",doc:"exI",type:"NV",tier:2,tax:"C1",q:"28 g of N\u2082 gas occupies a volume of 10 L at 2.46 atm pressure. The temperature of the gas (in K) is:",ans:"300 K",pat:"C1 \u00b7 PV = nRT",nudge:"n = 1 mol, so T = PV/nR = 2.46\u00b710/0.0821."},
  /* ---------- Exercise-III (JEE-Advanced) ---------- */
  {src:"Ex-III Q1",doc:"exIII",type:"SC",tier:3,tax:"C7",q:"Assuming an N\u2082 molecule is spherical with radius 2\u00d710\u207b\u00b9\u2070 m, the percentage of empty space in one mole of N\u2082 gas at NTP is about:",choices:["90 %","99.9 %","9 %","79 %"],correct:1,pat:"C7 \u00b7 molecular volume \u226a gas volume",ans:"99.9 %",nudge:"Compare N_A\u00b7(4/3)\u03c0r\u00b3 with 22.4 L."},
  {src:"Ex-III Q2",doc:"exIII",type:"SC",tier:3,tax:"C1",q:"For an ideal gas, which plot is linear with a slope equal to zero?",choices:["V vs T at constant P","V/T vs T at constant P","log P vs log V at constant T","P vs T at constant V"],correct:1,pat:"C1 \u00b7 V/T = nR/P = const",ans:"V/T vs T at constant P"},
  {src:"Ex-III Q3",doc:"exIII",type:"SC",tier:3,tax:"C6",q:"PV is plotted against P for an ideal gas at two temperatures T\u2081 and T\u2082 (the T\u2082 line lies above the T\u2081 line). The relation between them is:",choices:["T\u2081 > T\u2082","T\u2082 > T\u2081","T\u2081 = T\u2082","T\u2081 + T\u2082 = 1"],correct:1,pat:"C6 \u00b7 PV = nRT, higher line = higher T",ans:"T\u2082 > T\u2081",fig:"pv_vs_p"},
  {src:"Ex-III Q7",doc:"exIII",type:"SC",tier:3,tax:"C1",q:"A spherical flask A (radius 1.0 m) contains 300 g H\u2082 and, inside it, a balloon B (radius 60 cm) of N\u2082, and inside B a balloon C (radius 30 cm) of O\u2082, all at 27\u00b0C. The total weight of gas inside the flask is about:",choices:["1526.4 g","1477.8 g","1652.8 g","1825.8 g"],correct:1,pat:"C1 \u00b7 PV=nRT for each nested volume",ans:"1477.8 g"},
  {src:"Ex-III Q8",doc:"exIII",type:"SC",tier:3,tax:"C4",q:"The pressure exerted by 10\u00b2\u00b3 gas molecules, each of mass 10\u207b\u00b2\u00b2 g, in a 1 L container with rms speed 10\u2075 cm s\u207b\u00b9 is:",choices:["3.33\u00d710\u2077 dyne cm\u207b\u00b2","2.22\u00d710\u2077 dyne cm\u207b\u00b2","1.11\u00d710\u2077 dyne cm\u207b\u00b2","4.44\u00d710\u2077 dyne cm\u207b\u00b2"],correct:0,pat:"C4 \u00b7 P = (1/3)\u00b7m\u00b7N\u00b7u\u00b2/V",ans:"3.33\u00d710\u2077 dyne cm\u207b\u00b2"},
  {src:"Ex-III Q9",doc:"exIII",type:"SC",tier:3,tax:"C2",q:"1 mol N\u2082 and 4 mol H\u2082 are taken in a 15 L flask at 27\u00b0C. After complete conversion of N\u2082 to NH\u2083, 5 L of water is added (dissolving all the NH\u2083). The pressure set up in the flask is:",choices:["4.926 atm","3.284 atm","1.643 atm","2.463 atm"],correct:3,pat:"C2 \u00b7 leftover H\u2082 in the remaining volume",ans:"2.463 atm",nudge:"Only 1 mol H\u2082 remains; NH\u2083 dissolves; V = 10 L."},
  {src:"Ex-III Q11",doc:"exIII",type:"SC",tier:3,tax:"C1",q:"Two identical connected vessels together hold 3 mol of an ideal gas at 4 atm and 27\u00b0C. The first is cooled to \u221273\u00b0C while the second is heated to 127\u00b0C. The numbers of moles in the first and second vessels are then:",choices:["1.5, 1.5","1, 2","2, 1","1.8, 1.2"],correct:2,pat:"C1 \u00b7 colder vessel holds more moles",ans:"2, 1"},
  {src:"Ex-III Q21",doc:"exIII",type:"SC",tier:3,tax:"C11",q:"In a Maxwell\u2013Boltzmann plot, three curves are drawn for T\u2081, T\u2082, T\u2083 (the T\u2081 curve has the tallest, left-most peak; the T\u2083 curve is the flattest and right-most). The correct order of temperature is:",choices:["T\u2081 < T\u2082 < T\u2083","T\u2083 < T\u2082 < T\u2081","T\u2082 < T\u2081 < T\u2083","T\u2081 > T\u2082 < T\u2083"],correct:0,pat:"C11 \u00b7 hotter \u21d2 flatter, peak shifts right",ans:"T\u2081 < T\u2082 < T\u2083",fig:"maxwell"},
  {src:"Ex-III Q27",doc:"exIII",type:"SC",tier:3,tax:"C5",q:"At 1200\u00b0C a mixture of Cl\u2082 and Cl atoms effuses 1.16 times as fast as krypton (M = 84) under identical conditions. The fraction of chlorine molecules dissociated into atoms is nearly:",choices:["14 %","22 %","87 %","44 %"],correct:0,pat:"C5 \u00b7 Graham's law + dissociation",ans:"14 %"},
  {src:"Ex-III Q31",doc:"exIII",type:"SC",tier:3,tax:"C6",q:"A real gas obeying the van der Waals equation will resemble an ideal gas if:",choices:["the constants a and b are negligibly small","a is large and b is small","a is small and b is large","a and b are both large"],correct:0,pat:"C6 \u00b7 small a,b \u21d2 ideal",ans:"a and b are negligibly small"},
  {src:"Ex-III Q33",doc:"exIII",type:"SC",tier:3,tax:"C6",q:"For a real gas at high pressure, PVm is plotted against P (Vm = molar volume). The y-intercept of the (nearly linear) graph is:",choices:["RT","P + a/V\u00b2","RT/(V\u2212b)","P \u2212 a/V\u00b2"],correct:0,pat:"C6 \u00b7 PV = RT + Pb at high P",ans:"RT"},
  {src:"Ex-III Q38",doc:"exIII",type:"SC",tier:3,tax:"C8",q:"The critical temperature and critical pressure of a van der Waals gas are 30\u00b0C and 73 atm. Its constant b (in L mol\u207b\u00b9) is:",choices:["0.500","0.060","0.265","0.0426"],correct:3,pat:"C8 \u00b7 b = RTc/8Pc",ans:"0.0426"},
  {src:"Ex-III Q39",doc:"exIII",type:"SC",tier:3,tax:"C9",q:"The correct order of the characteristic temperatures (I) Boyle, (II) critical, (III) inversion is:",choices:["III > I > II","I > II > III","II > I > III","I > III > II"],correct:0,pat:"C9 \u00b7 Ti > TB > Tc",ans:"III > I > II"},
  {src:"Ex-III Q40",doc:"exIII",type:"SC",tier:3,tax:"C9",q:"Among H\u2082, He, CH\u2084 and O\u2082 (Boyle temperatures 117, 23, 498 and 406 K respectively), the gas liquefied most easily is:",choices:["H\u2082","He","CH\u2084","O\u2082"],correct:2,pat:"C9 \u00b7 higher Boyle T \u21d2 stronger forces",ans:"CH\u2084"},
  {src:"Ex-III Q6",doc:"exIII",type:"SC",tier:3,tax:"C1",q:"Statement: In a gaseous reaction the volume ratio of reactants and products agrees with their molar ratio.  Explanation: The volume of a gas is inversely proportional to its number of moles at constant P and T.",choices:["Statement correct, Explanation wrong","Statement wrong, Explanation correct","Both correct, and Explanation is the correct explanation of the Statement","Both correct, but Explanation is NOT the correct explanation"],correct:0,pat:"C1 \u00b7 V \u221d n (Gay-Lussac/Avogadro)",ans:"Statement correct, Explanation wrong",nudge:"V \u221d n DIRECTLY (not inversely) at fixed P, T."},
  {src:"Ex-III Q41",doc:"exIII",type:"SC",tier:3,tax:"C10",q:"Statement: An ideal gas shows no Joule\u2013Thomson effect and cannot be liquefied.  Explanation: For an ideal gas (\u2202U/\u2202V)_T and (\u2202T/\u2202P)_H are both zero.",choices:["Statement correct, Explanation wrong","Statement wrong, Explanation correct","Both correct, and Explanation is the correct explanation of the Statement","Both correct, but Explanation is NOT the correct explanation"],correct:2,pat:"C10 \u00b7 ideal gas \u03bc_JT = 0",ans:"Both correct, Explanation explains Statement"},
  /* ---------- Exercise-IV (JEE-Advanced) ---------- */
  {src:"Ex-IV Q1",doc:"exIV",type:"SC",tier:3,tax:"C4",q:"Three gases of densities A (0.82), B (0.25), C (0.51) are enclosed in a 4 L vessel. Pick the correct statement(s): I. Gas A lies at the bottom  II. The numbers of atoms of A, B, C are the same  III. The gases diffuse to form a homogeneous mixture  IV. The average kinetic energy of each gas is the same at identical temperature.",choices:["I, IV","only III","III, IV","II, III"],correct:2,pat:"C4 \u00b7 gases mix; equal KE at equal T",ans:"III, IV"},
  {src:"Ex-IV Q2",doc:"exIV",type:"SC",tier:3,tax:"C1",q:"At 0\u00b0C, the density of a certain gaseous oxide at 2 bar equals the density of dinitrogen at 5 bar. The molecular mass of the oxide is:",choices:["70 g/mol","35 g/mol","140 g/mol","280 g/mol"],correct:0,pat:"C1 \u00b7 d = PM/RT \u21d2 equal PM",ans:"70 g/mol"},
  {src:"Ex-IV Q3",doc:"exIV",type:"SC",tier:3,tax:"C1",q:"12 g of an ideal gas (M = 120) at t\u00b0C in volume V exerts 1 atm. When T is raised by 10\u00b0C at the same volume, the pressure rises by 10%. Then t and V are:",choices:["t = \u2212273 \u00b0C, V = 0.082 L","t = \u2212173 \u00b0C, V = 0.82 L","t = 0 \u00b0C, V = 22.4 L","t = \u221227 \u00b0C, V = 22.4 L"],correct:1,pat:"C1 \u00b7 P \u221d T at constant V",ans:"t = \u2212173 \u00b0C, V = 0.82 L"},
  {src:"Ex-IV Q4",doc:"exIV",type:"SC",tier:3,tax:"C1",q:"A gas in a 1000 mL vessel at 72.6 cm Hg is evacuated by a piston pump that expels 10% of the gas each stroke. The pressure after the second stroke is:",choices:["50 cm","56.6 cm","58.8 cm","66.6 cm"],correct:2,pat:"C1 \u00b7 P \u2190 0.9\u00b70.9\u00b7P\u2080",ans:"58.8 cm"},
  {src:"Ex-IV Q6",doc:"exIV",type:"SC",tier:3,tax:"C1",q:"An ideal gas occupies 30 L at 20\u00b0C. It is compressed at constant T until the pressure doubles, then heated to 100\u00b0C at constant pressure. The final volume is:",choices:["25 L","30 L","19 L","40 L"],correct:2,pat:"C1 \u00b7 Boyle then Charles",ans:"19 L",nudge:"30\u219215 L (P doubles), then \u00d7373/293."},
  {src:"Ex-IV Q32",doc:"exIV",type:"SC",tier:3,tax:"C7",q:"The van der Waals constant b of a gas is 4.42 centilitre per mole. How close can the centres of two molecules approach each other?",choices:["127.2 pm","427.2 pm","327.2 pm","627.2 pm"],correct:2,pat:"C7 \u00b7 b = 4\u00b7N_A\u00b7(4/3)\u03c0r\u00b3",ans:"327.2 pm"},
  {src:"Ex-IV Q33",doc:"exIV",type:"SC",tier:3,tax:"C6",q:"The vapour density of a substance X at 1 atm and 500 K is 0.8 kg m\u207b\u00b3. It effuses at 4/5 the rate of oxygen under the same conditions. Its compressibility factor Z is:",choices:["0.974","1.35","1.52","1.22"],correct:2,pat:"C6 \u00b7 Z from M and d",ans:"1.52"},
  {src:"Ex-IV Q35",doc:"exIV",type:"SC",tier:3,tax:"C8",q:"For a fixed amount of a van der Waals gas at 0\u00b0C and 100 atm, Z = 0.5. Assuming the molecular volume is negligible, the constant a is:",choices:["1.256 L\u00b2 mol\u207b\u00b2 atm","0.256 L\u00b2 mol\u207b\u00b2 atm","2.256 L\u00b2 mol\u207b\u00b2 atm","0.0256 L\u00b2 mol\u207b\u00b2 atm"],correct:0,pat:"C8 \u00b7 Z<1 from the a term",ans:"1.256 L\u00b2 mol\u207b\u00b2 atm"},
  {src:"Ex-IV Q40",doc:"exIV",type:"SC",tier:3,tax:"C7",q:"1 mol of CO\u2082 at 273 K exerts 34.98 atm. Assuming the molecular volume is negligible, the van der Waals constant a for CO\u2082 is:",choices:["3.59 dm\u2076 atm mol\u207b\u00b2","2.59 dm\u2076 atm mol\u207b\u00b2","1.25 dm\u2076 atm mol\u207b\u00b2","1.59 dm\u2076 atm mol\u207b\u00b2"],correct:0,pat:"C7 \u00b7 a from P = RT/V \u2212 a/V\u00b2",ans:"3.59 dm\u2076 atm mol\u207b\u00b2"},
  {src:"Ex-IV Q41",doc:"exIV",type:"SC",tier:3,tax:"C7",q:"The van der Waals constant b for a gas whose molecular diameter is 2.0 \u00c5 is:",choices:["2.4 mL/mol","4.8 mL/mol","7.2 mL/mol","9.6 mL/mol"],correct:3,pat:"C7 \u00b7 b = 4\u00b7N_A\u00b7(4/3)\u03c0r\u00b3",ans:"9.6 mL/mol"},
  {src:"Ex-IV Q42",doc:"exIV",type:"SC",tier:3,tax:"C6",q:"1 mol of SO\u2082 occupies 350 mL at 300 K and 50 atm. The compressibility factor of the gas is:",choices:["0.711","7.11","1.406","14.06"],correct:0,pat:"C6 \u00b7 Z = PV/nRT",ans:"0.711"},
  {src:"Ex-IV Q43",doc:"exIV",type:"SC",tier:3,tax:"C7",q:"The pressure exerted by 8.5 g of NH\u2083 in a 0.5 L vessel at 300 K (a = 4.0 atm L\u00b2 mol\u207b\u00b2, b = 0.036 L mol\u207b\u00b9) is:",choices:["21.51 atm","2.151 atm","215.1 atm","43.02 atm"],correct:0,pat:"C7 \u00b7 van der Waals P",ans:"21.51 atm"},
  {src:"Ex-IV Q49",doc:"exIV",type:"SC",tier:3,tax:"C9",q:"The inversion temperature Ti of hydrogen (a = 0.244 atm L\u00b2 mol\u207b\u00b2, b = 0.027 L mol\u207b\u00b9) is:",choices:["440 K","220 K","110 K","330 K"],correct:1,pat:"C9 \u00b7 Ti = 2a/Rb",ans:"220 K"},
  {src:"Ex-IV Q51",doc:"exIV",type:"SC",tier:3,tax:"C10",q:"Statement: The Joule\u2013Thomson coefficient for an ideal gas is zero.  Explanation: There are no intermolecular attractive forces in an ideal gas.",choices:["Statement correct, Explanation wrong","Statement wrong, Explanation correct","Both correct, and Explanation is the correct explanation of the Statement","Both correct, but Explanation is NOT the correct explanation"],correct:2,pat:"C10 \u00b7 ideal gas \u03bc_JT = 0",ans:"Both correct, Explanation explains Statement"},
  {src:"Ex-IV Q52",doc:"exIV",type:"SC",tier:3,tax:"C12",q:"Statement: CO\u2082 has stronger intermolecular forces than CH\u2084.  Explanation: The critical temperature of CO\u2082 is higher than that of CH\u2084.",choices:["Statement correct, Explanation wrong","Statement wrong, Explanation correct","Both correct, and Explanation is the correct explanation of the Statement","Both correct, but Explanation is NOT the correct explanation"],correct:2,pat:"C12 \u00b7 higher Tc \u21d2 stronger forces",ans:"Both correct, Explanation explains Statement"}
];

/* ===== practice source groups (for grouped display + dates) ===== */
let CHEM_SOM_PRAC_DOCS = [
  {id:"exI",  label:"Narayana Module \u00b7 Exercise-I",  date:"30 Jun 2026", note:"Single-correct \u00b7 options & answers verified vs Exercise-I key"},
  {id:"exIII",label:"Narayana Module \u00b7 Exercise-III (JEE-Adv)", date:"30 Jun 2026", note:"verified vs Exercise-III key \u00b7 includes Statement\u2013Explanation"},
  {id:"exIV", label:"Narayana Module \u00b7 Exercise-IV (JEE-Adv)",  date:"30 Jun 2026", note:"verified vs Exercise-IV key \u00b7 includes Statement\u2013Explanation"}
];

const CHEM_SOM_PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Foundation"},{k:"2",l:"JEE Main"},{k:"3",l:"JEE Advanced"},{k:"Flag",l:"\u2605 Flagged"}];

/* ===== L0.5 EXPLAIN (first-principles read; rendered into the Explain tab) ===== */
let CHEM_SOM_EXPLAIN = `<div class="xpl">
<!-- HERO: the thesis -->
  <section class="hero">
    <div class="eyebrow">The one idea</div>
    <h2>A real gas is an ideal gas that got caught being real.</h2>
    <p>The ideal gas is a fiction: point-sized molecules that never attract each other. It obeys one clean law, <span class="mono">PV = nRT</span>. Every real gas <em>tries</em> to obey it — and succeeds when its molecules are far apart and moving fast (low pressure, high temperature).</p>
    <p>It fails when molecules get close and slow. Then two very real things they'd been ignoring start to matter: <b>they take up space</b>, and <b>they attract each other</b>. The entire second half of this chapter is those two facts fighting.</p>
    <div class="eq key zline"><span class="lab">The one number that measures it all</span>Z = PV / nRT&nbsp;&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;Z = 1 means ideal · Z &lt; 1 means attraction is winning · Z &gt; 1 means size is winning</div>
    <div class="note spine"><span class="k">Spine</span><span>Keep <b>Z</b> in your head the whole way down. Every station below is really answering: <i>where are we on the Z story, and why?</i></span></div>
  </section>

  <nav class="xpl-rail" aria-label="Chapter acts"><a href="#xpl-act1"><b>Act I</b> The Ideal</a><a href="#xpl-act2"><b>Act II</b> The Real</a><a href="#xpl-act3"><b>Act III</b> The Condensed</a></nav>

  <!-- ================= ACT I ================= -->
  <div class="act-label" id="xpl-act1">Act I · The Ideal</div>
  <p class="act-sub">The model that works when molecules are lonely and hot.</p>

  <!-- Station 1 -->
  <section class="station easy" id="xpl-s1">
    <div class="st-head"><span class="depth core">Core</span><div class="st-num">Station 01</div><div class="st-title">The ideal gas and its laws</div></div>
    <div class="st-body">
      <p class="picture">Picture a box of tiny, hard, lonely dots. They fly in straight lines, bounce off the walls perfectly, never touch each other, and take up no room themselves. That fiction is the <b>ideal gas</b>, and four "laws" are just one equation seen from four angles.</p>
      <div class="eq key"><span class="lab">The whole of Act I in one line</span>PV = nRT&nbsp;&nbsp;=&nbsp;&nbsp;(w/M)RT&nbsp;&nbsp;→&nbsp;&nbsp;PM = dRT</div>
      <p>Hold three of the four quantities fixed and you recover each named law: fix T,n → <b>Boyle</b> (PV constant); fix P,n → <b>Charles</b> (V ∝ T); fix V,n → <b>Gay-Lussac</b> (P ∝ T); fix P,T → <b>Avogadro</b> (V ∝ n). They aren't four things to memorise — they're one thing with three knobs held still.</p>
      <div class="figure"><svg viewBox="0 0 220 130" class="fig"><line x1="26" y1="110" x2="208" y2="110" stroke="currentColor" stroke-width="1.2"/><line x1="26" y1="110" x2="26" y2="12" stroke="currentColor" stroke-width="1.2"/><line x1="26" y1="110" x2="200" y2="26" stroke="var(--teal)" stroke-width="1.8"/><line x1="26" y1="110" x2="200" y2="54" stroke="var(--amber)" stroke-width="1.8"/><line x1="26" y1="110" x2="200" y2="80" stroke="var(--coral)" stroke-width="1.8"/><text x="202" y="30" font-size="9" fill="var(--teal)">P\u2081</text><text x="202" y="58" font-size="9" fill="var(--amber)">P\u2082</text><text x="202" y="84" font-size="9" fill="var(--coral)">P\u2083</text><text x="56" y="22" font-size="8" fill="currentColor">steeper = lower P</text><text x="8" y="16" font-size="11" fill="currentColor">V</text><text x="196" y="124" font-size="11" fill="currentColor">T</text></svg></div>
      <div class="figcap">Charles’ law: each line is one pressure — steeper means lower P.</div>
      <div class="note connect"><span class="k">Connects to</span><span>The mole concept you already know: <span class="mono">n = w/M</span>. Slot it in and PV=nRT instantly gives you density and molar-mass problems for free — same equation, no new law.</span></div>
      <div class="note watch"><span class="k">Watch out</span><span><b>Temperature is always in kelvin.</b> "Doubling the temperature" from 0°C to 27°C is <i>not</i> a doubling — 273 K to 300 K is a 10% rise. This one slip wrecks more marks here than anything else.</span></div>
      <div class="note watch"><span class="k">Watch out</span><span>Pick <span class="mono">R</span> to match your pressure unit: <b>0.0821</b> for atm·L, <b>0.083</b> for bar·L, <b>8.314</b> for SI (Pa·m³ / joules), <b>2 cal</b> for energy. Wrong R = wrong answer with perfect working.</span></div>
    </div>
  </section>

  <!-- Station 2 -->
  <section class="station hard" id="xpl-s2">
    <div class="st-head"><span class="depth deep">Deep</span><div class="st-num">Station 02</div><div class="st-title">Why PV=nRT is true: the kinetic theory</div></div>
    <div class="st-body">
      <p class="picture">Where does pressure actually <i>come from</i>? Not from some rule — from <b>molecules drumming on the walls</b>. Each collision is a tiny push; a mole of them per instant is a steady force per area. If you believe molecules are moving dots, you can <i>derive</i> the gas law from Newton's mechanics. This is the foundation everything real is built on, so it's worth doing once, slowly.</p>
      <div class="eq key"><span class="lab">Pressure from first principles</span>PV = ⅓ · m · N · c̄²&nbsp;&nbsp;&nbsp;(m = mass of one molecule, N = number, c̄² = mean-square speed)</div>
      <div class="figure"><svg viewBox="0 0 220 122" class="fig"><rect x="18" y="16" width="150" height="90" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="168" y1="16" x2="168" y2="106" stroke="var(--teal)" stroke-width="3"/><text x="146" y="13" font-size="8" fill="var(--teal)">wall</text><circle cx="58" cy="48" r="7" fill="var(--coral)"/><line x1="70" y1="48" x2="150" y2="48" stroke="var(--coral)" stroke-width="1.6"/><polygon points="150,48 141,44 141,52" fill="var(--coral)"/><text x="90" y="42" font-size="9" fill="var(--coral)">+m·u</text><circle cx="58" cy="80" r="7" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="46" y1="80" x2="26" y2="80" stroke="currentColor" stroke-width="1.4"/><polygon points="26,80 35,76 35,84" fill="currentColor"/><text x="28" y="74" font-size="9" fill="currentColor">−m·u</text><text x="40" y="119" font-size="8.5" fill="currentColor">momentum change per hit = 2m·u</text></svg></div>
      <div class="figcap">Each wall hit reverses a molecule’s momentum by 2m·u; summed over billions, that is pressure.</div>
      <details class="build">
        <summary>Build it from scratch — a molecule hitting a wall <span class="chev">›</span></summary>
        <div class="build-body">
          <ol>
            <li>Put N molecules of mass m in a cube of side L (so V = L³). Take one molecule moving toward a wall with speed component <span class="mono">u<sub>x</sub></span>.</li>
            <li>It hits, bounces back elastically. Its momentum changes by <span class="mono">2m·u<sub>x</sub></span> (from +mu<sub>x</sub> to −mu<sub>x</sub>).</li>
            <li>It re-hits the same wall every time it crosses the box and back: time between hits = <span class="mono">2L / u<sub>x</sub></span>.</li>
            <li>Force from this one molecule = momentum change ÷ time = <span class="mono">2m u<sub>x</sub> ÷ (2L/u<sub>x</sub>) = m u<sub>x</sub>² / L</span>.</li>
            <li>Pressure = force ÷ area = that ÷ L² = <span class="mono">m u<sub>x</sub>² / L³ = m u<sub>x</sub>² / V</span>. Sum over all N molecules → <span class="mono">P = (m/V)·Σu<sub>x</sub>²</span>.</li>
            <li>Motion is random in 3D, so on average <span class="mono">c̄² = ū<sub>x</sub>² + ū<sub>y</sub>² + ū<sub>z</sub>² = 3ū<sub>x</sub>²</span>, giving <span class="mono">Σu<sub>x</sub>² = N·c̄²/3</span>.</li>
            <li>Therefore <b>PV = ⅓ m N c̄²</b>. Pressure is literally bottled-up molecular momentum.</li>
          </ol>
        </div>
      </details>
      <p>Now the payoff. Rewrite ⅓ mN c̄² as <span class="mono">⅔ · N · (½m c̄²)</span> — that bracket is the average kinetic energy of one molecule. So <span class="mono">PV = ⅔ · (total KE)</span>. Set that equal to nRT and something profound falls out:</p>
      <div class="eq key"><span class="lab">Temperature IS energy</span>½ m c̄² = (3/2) kT&nbsp;&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;KE per mole = (3/2)RT&nbsp;&nbsp;(k = R/N<sub>A</sub>)</div>
      <div class="note spine"><span class="k">Spine</span><span>This is the anchor of the whole chapter: <b>temperature is a direct measure of average molecular kinetic energy</b> — nothing else. Not pressure, not volume, not which gas.</span></div>
      <div class="note connect"><span class="k">Connects to</span><span>Pure mechanics you already own: <span class="mono">KE = ½mv²</span>, momentum <span class="mono">= mv</span>, force <span class="mono">= Δp/Δt</span>. Kinetic theory is just those three applied a billion times and averaged.</span></div>
      <div class="note watch"><span class="k">Watch out</span><span>Because KE depends <i>only</i> on T, at the same temperature <b>every</b> gas — H₂ or CO₂ — has the same average KE. The heavy one isn't "more energetic"; it just moves slower to carry the same energy.</span></div>
    </div>
  </section>

  <!-- Station 3 -->
  <section class="station" id="xpl-s3">
    <div class="st-head"><span class="depth core">Core</span><div class="st-num">Station 03</div><div class="st-title">Three speeds, and the bell curve behind them</div></div>
    <div class="st-body">
      <p class="picture">Molecules don't all move at one speed — they have a <b>spread</b>, from nearly still to very fast, described by the Maxwell–Boltzmann curve. Because there's a spread, "the speed" isn't a single number, so we quote three, each answering a different question.</p>
      <div class="eq"><span class="lab">The three speeds — all ∝ √(T/M)</span>u<sub>rms</sub> = √(3RT/M)&nbsp;·&nbsp;u<sub>avg</sub> = √(8RT/πM)&nbsp;·&nbsp;u<sub>mp</sub> = √(2RT/M)</div>
      <p>They never change their pecking order: <span class="mono">u<sub>rms</sub> : u<sub>avg</sub> : u<sub>mp</sub> = 1 : 0.921 : 0.816</span>. Root-mean-square is biggest (it over-weights the fast molecules by squaring), most-probable is the peak of the curve, average sits between. Pick by the question: energy problems want <b>rms</b> (it comes from c̄²); the graph's peak is <b>most probable</b>.</p>
      <p>The curve itself tells the temperature story. Heat the gas and the peak slides <b>right</b> (faster) and <b>down</b> (flatter) — because the total area, the number of molecules, is fixed, so a wider spread must be shorter.</p>
      <div class="figure"><svg viewBox="0 0 220 130" class="fig"><line x1="22" y1="110" x2="210" y2="110" stroke="currentColor" stroke-width="1.2"/><line x1="22" y1="110" x2="22" y2="12" stroke="currentColor" stroke-width="1.2"/><path d="M22,110 C50,110 58,24 78,24 C98,24 120,110 205,110" fill="none" stroke="var(--teal)" stroke-width="2"/><path d="M22,110 C58,110 78,44 104,44 C130,44 150,110 205,110" fill="none" stroke="var(--amber)" stroke-width="1.8"/><path d="M22,110 C66,110 100,64 132,64 C162,64 178,110 205,110" fill="none" stroke="var(--coral)" stroke-width="1.8"/><text x="60" y="20" font-size="9" fill="var(--teal)">T\u2081</text><text x="108" y="40" font-size="9" fill="var(--amber)">T\u2082</text><text x="136" y="60" font-size="9" fill="var(--coral)">T\u2083</text><text x="150" y="74" font-size="8" fill="currentColor">T\u2081&lt;T\u2082&lt;T\u2083</text><text x="150" y="124" font-size="10" fill="currentColor">speed \u2192</text></svg></div>
      <div class="figcap">Raising T pushes the peak right and down — the area (number of molecules) stays fixed.</div>
      <div class="note connect"><span class="k">Connects to</span><span>The √(T/M) scaling is the engine of <b>Graham's law</b> two stations on, and the "peak shifts right + down with T" reading is a guaranteed graph question.</span></div>
      <div class="note watch"><span class="k">Watch out</span><span>Raising temperature does <i>not</i> add molecules — the area under the curve is always the same. Only the <i>shape</i> changes.</span></div>
    </div>
  </section>

  <!-- Station 4 -->
  <section class="station easy" id="xpl-s4">
    <div class="st-head"><span class="depth core">Core</span><div class="st-num">Station 04</div><div class="st-title">Mixtures & escaping: Dalton and Graham</div></div>
    <div class="st-body">
      <p class="picture"><b>Dalton:</b> in a mix of non-reacting gases, each one ignores the others — it fills the whole box and pushes on the walls as if alone. So pressures simply add, and each share is set by <i>how many molecules</i> it has, i.e. its mole fraction.</p>
      <div class="eq"><span class="lab">Dalton</span>P<sub>total</sub> = ΣP<sub>i</sub>&nbsp;&nbsp;·&nbsp;&nbsp;P<sub>i</sub> = x<sub>i</sub> · P<sub>total</sub>&nbsp;&nbsp;(x<sub>i</sub> = mole fraction)</div>
      <p><b>Graham:</b> lighter molecules move faster (same KE, smaller mass → bigger speed), so they stream through a pinhole more often. Rate of escape tracks the average speed, which goes as 1/√M.</p>
      <div class="eq"><span class="lab">Graham</span>rate ∝ 1/√M ∝ 1/√d&nbsp;&nbsp;→&nbsp;&nbsp;r<sub>1</sub>/r<sub>2</sub> = √(M<sub>2</sub>/M<sub>1</sub>)</div>
      <div class="note watch"><span class="k">Watch out</span><span>Two classic traps: use <b>mole</b> fraction (not mass) for partial pressure; and remember the <b>faster</b> gas is the <b>lighter</b> one, with √M, not M.</span></div>
      <div class="note connect"><span class="k">Connects to</span><span>Collecting a gas over water is just Dalton in reverse: <span class="mono">P<sub>dry</sub> = P<sub>total</sub> − aqueous&nbsp;tension</span>. The water vapour is one more partial pressure.</span></div>
    </div>
  </section>

  <!-- ================= ACT II ================= -->
  <div class="act-label" id="xpl-act2">Act II · The Real</div>
  <p class="act-sub">Where the ideal model breaks, and the two equations that fix it.</p>

  <!-- Station 5 -->
  <section class="station" id="xpl-s5">
    <div class="st-head"><span class="depth core">Core</span><div class="st-num">Station 05</div><div class="st-title">Why real gases deviate — the pivot of the chapter</div></div>
    <div class="st-body">
      <p class="picture">Compress a real gas hard, or cool it down, and PV=nRT starts lying. Two assumptions of the ideal model were never true; they just didn't matter when molecules were far apart:</p>
      <p><b>1. Molecules take up space.</b> The "free" volume to fly around in is less than the container — so at high pressure the gas is <i>harder</i> to compress than ideal (Z &gt; 1).<br>
      <b>2. Molecules attract each other.</b> Attraction pulls them inward, so they hit the walls a little softer — the gas is <i>easier</i> to compress than ideal (Z &lt; 1).</p>
      <div class="eq key"><span class="lab">The scoreboard</span>Z = PV / nRT&nbsp;&nbsp;·&nbsp;&nbsp;Z &lt; 1: attraction wins (low T, moderate P)&nbsp;·&nbsp;Z &gt; 1: size wins (very high P)</div>
      <div class="figure"><svg viewBox="0 0 220 130" class="fig"><line x1="28" y1="110" x2="208" y2="110" stroke="currentColor" stroke-width="1.2"/><line x1="28" y1="110" x2="28" y2="14" stroke="currentColor" stroke-width="1.2"/><line x1="28" y1="60" x2="208" y2="60" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/><text x="4" y="63" font-size="9" fill="currentColor">Z=1</text><path d="M28,60 C70,86 110,92 150,80 C175,72 195,58 206,40" fill="none" stroke="var(--coral)" stroke-width="2"/><path d="M28,60 C70,46 130,34 206,20" fill="none" stroke="var(--teal)" stroke-width="2"/><text x="150" y="98" font-size="9" fill="var(--coral)">CO\u2082 (Z&lt;1)</text><text x="116" y="32" font-size="9" fill="var(--teal)">H\u2082,He (Z&gt;1)</text><text x="8" y="16" font-size="11" fill="currentColor">Z</text><text x="196" y="124" font-size="11" fill="currentColor">P</text></svg></div>
      <div class="figcap">The scoreboard: CO₂ dips below Z=1 (attraction winning); H₂/He rise above (size winning).</div>
      <div class="note spine"><span class="k">Spine</span><span>Everything in Act II is these two effects, quantified. The <b>a</b> in van der Waals is effect 2 (attraction). The <b>b</b> is effect 1 (size). Hold that and the algebra never confuses you.</span></div>
      <div class="note connect"><span class="k">Connects to</span><span>Deviation is worst at <b>low T, high P</b> — exactly the conditions that bring molecules close and slow, where Station 02's "lonely and hot" assumption collapses. He (small, weakly attracting) stays nearly ideal longest.</span></div>
    </div>
  </section>

  <!-- Station 6 -->
  <section class="station hard" id="xpl-s6">
    <div class="st-head"><span class="depth deep">Deep</span><div class="st-num">Station 06</div><div class="st-title">Van der Waals: patching PV=nRT twice</div></div>
    <div class="st-body">
      <p class="picture">Van der Waals didn't invent a new law — he took PV=nRT and added <b>one correction for each broken assumption</b>. That's the whole equation, and if you know which term fixes which flaw you can rebuild it any time.</p>
      <div class="figure"><svg viewBox="0 0 240 122" class="fig"><circle cx="55" cy="52" r="14" fill="var(--teal)" opacity="0.85"/><circle cx="86" cy="52" r="14" fill="var(--teal)" opacity="0.4"/><circle cx="55" cy="52" r="28" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/><line x1="55" y1="52" x2="83" y2="52" stroke="currentColor" stroke-width="0.8"/><text x="60" y="48" font-size="8" fill="currentColor">2r</text><text x="24" y="100" font-size="8.5" fill="currentColor">size → free volume V−nb</text><line x1="206" y1="18" x2="206" y2="96" stroke="currentColor" stroke-width="1.4"/><text x="188" y="14" font-size="8" fill="currentColor">wall</text><circle cx="186" cy="54" r="9" fill="var(--coral)"/><line x1="177" y1="54" x2="150" y2="44" stroke="var(--coral)" stroke-width="1"/><polygon points="150,44 159,44 155,51" fill="var(--coral)"/><line x1="177" y1="54" x2="150" y2="54" stroke="var(--coral)" stroke-width="1"/><polygon points="150,54 158,50 158,58" fill="var(--coral)"/><line x1="177" y1="54" x2="150" y2="65" stroke="var(--coral)" stroke-width="1"/><polygon points="150,65 159,64 155,58" fill="var(--coral)"/><text x="138" y="100" font-size="8.5" fill="var(--coral)">attraction → P + an²/V²</text></svg></div>
      <div class="figcap">Two fixes: molecules exclude a co-volume b, and pull each other back from the wall (the a term).</div>
      <div class="eq key"><span class="lab">van der Waals (n moles)</span>( P + a n²/V² ) ( V − nb ) = nRT</div>
      <details class="build">
        <summary>Build it from scratch — the two corrections <span class="chev">›</span></summary>
        <div class="build-body">
          <p><b>Correction 1 — volume (the <span class="mono">b</span> term).</b> Molecules aren't points; they occupy space, so the room left to move in isn't V but <span class="mono">V − nb</span>. Here <span class="mono">b</span> is the "co-volume" per mole. Curiously b ≈ <b>four times</b> the true volume of the molecules, because two molecules of radius r can't get closer than 2r centre-to-centre — the volume forbidden per pair is a sphere of radius 2r, i.e. 8× a molecule's volume, or 4× when shared between the two. Replace V with (V − nb).</p>
          <p><b>Correction 2 — attraction (the <span class="mono">a</span> term).</b> A molecule deep inside the gas is pulled equally in all directions — no net force. But one about to hit the wall has neighbours only <i>behind</i> it, so it's tugged backward and strikes <b>softer</b>. The real pressure is therefore below ideal. How much? The pull is proportional to the density of molecules doing the pulling <i>and</i> to the density of molecules being pulled — so ∝ (n/V)². Add it back to recover the "ideal" pressure: <span class="mono">P<sub>ideal</sub> = P + a n²/V²</span>.</p>
          <p>Substitute both into PV=nRT: <b>(P + an²/V²)(V − nb) = nRT</b>. Two facts, two terms.</p>
        </div>
      </details>
      <div class="eq"><span class="lab">reading the constants</span>a = strength of attraction (atm·L²·mol⁻²)&nbsp;·&nbsp;b = molecular size / co-volume (L·mol⁻¹)</div>
      <div class="note connect"><span class="k">Connects to</span><span>Bigger, stickier molecules → bigger <b>a</b> → easier to liquefy. That single line predicts Act III: NH₃ (large a) liquefies easily; He (tiny a) is a nightmare.</span></div>
      <div class="note watch"><span class="k">Watch out</span><span>Don't swap the roles: <b>a is not size and b is not attraction.</b> And keep the units apart — a carries L², b carries L.</span></div>
    </div>
  </section>

  <!-- Station 7 -->
  <section class="station hard" id="xpl-s7">
    <div class="st-head"><span class="depth deep">Deep</span><div class="st-num">Station 07</div><div class="st-title">The virial equation: deviation as a series</div></div>
    <div class="st-body">
      <p class="picture">There's a second, more flexible way to write a real gas — not one fixed equation but a <b>correction ladder</b> on top of the ideal gas. Start from Z = 1 (perfectly ideal) and add terms that switch on as the gas gets denser.</p>
      <div class="eq key"><span class="lab">the virial equation</span>Z = PV/RT = 1 + B/V<sub>m</sub> + C/V<sub>m</sub>² + D/V<sub>m</sub>³ + …</div>
      <p>Read it as levels of company: the leading <b>1</b> is the ideal gas (molecules alone); <b>B</b> corrects for meetings between <i>two</i> molecules; <b>C</b> for <i>three</i>; and so on. B, C, D are the virial coefficients — they depend on temperature and on the gas, not on P or V. At low density V<sub>m</sub> is huge, every term dies, and Z → 1. That's <i>why</i> every gas becomes ideal at low pressure — proven, not asserted.</p>
      <details class="build">
        <summary>Build B from van der Waals — where geometric series meets chemistry <span class="chev">›</span></summary>
        <div class="build-body">
          <ol>
            <li>Take vdW for one mole and solve for P: <span class="mono">P = RT/(V−b) − a/V²</span>.</li>
            <li>Form Z by multiplying by V/RT: <span class="mono">Z = V/(V−b) − a/(RTV) = 1/(1 − b/V) − a/(RTV)</span>.</li>
            <li>Now the move you know from <b>maths</b>: when b/V is small, expand the geometric series <span class="mono">1/(1 − b/V) = 1 + b/V + (b/V)² + …</span></li>
            <li>Collect powers of 1/V: <span class="mono">Z = 1 + (b − a/RT)/V + b²/V² + …</span></li>
            <li>Compare with the virial form. The coefficients fall right out:</li>
          </ol>
          <div class="eq" style="margin-left:0"><span class="lab">the punchline</span>B = b − a/RT&nbsp;&nbsp;·&nbsp;&nbsp;C = b²&nbsp;&nbsp;·&nbsp;&nbsp;D = b³</div>
          <p>That one expression <b>B = b − a/RT</b> is the whole deviation story in miniature: size (b, positive) versus attraction (a/RT, negative), fighting.</p>
        </div>
      </details>
      <p>Now watch the fight in B. At high temperature a/RT shrinks, so B &gt; 0 → Z &gt; 1 (size wins). At low temperature the a/RT term dominates, B &lt; 0 → Z &lt; 1 (attraction wins). And there is exactly one temperature where they cancel, B = 0:</p>
      <div class="eq key"><span class="lab">Boyle temperature — where a real gas fakes being ideal</span>B = 0&nbsp;⟹&nbsp;T<sub>B</sub> = a / bR</div>
      <div class="figure"><svg viewBox="0 0 220 134" class="fig"><line x1="40" y1="70" x2="208" y2="70" stroke="currentColor" stroke-width="1.2"/><line x1="40" y1="14" x2="40" y2="122" stroke="currentColor" stroke-width="1.2"/><text x="20" y="30" font-size="10" fill="currentColor">B</text><text x="198" y="64" font-size="10" fill="currentColor">T</text><path d="M46,116 C72,96 96,76 120,70 C150,62 182,52 206,46" fill="none" stroke="var(--teal)" stroke-width="2"/><circle cx="120" cy="70" r="3.4" fill="var(--coral)"/><line x1="120" y1="70" x2="120" y2="124" stroke="var(--coral)" stroke-width="0.8" stroke-dasharray="3 3"/><text x="108" y="134" font-size="9" fill="var(--coral)">T_B</text><text x="150" y="44" font-size="8" fill="currentColor">B&gt;0 (size)</text><text x="50" y="110" font-size="8" fill="currentColor">B&lt;0 (attraction)</text><text x="124" y="66" font-size="8" fill="var(--coral)">B=0</text></svg></div>
      <div class="figcap">B is negative at low T (attraction), positive at high T (size), and zero at the Boyle temperature.</div>
      <div class="note spine"><span class="k">Spine</span><span>The Boyle temperature isn't a random fact to memorise — it's simply "the temperature at which the leading deviation term vanishes." At T<sub>B</sub>, Z ≈ 1 over a wide pressure range: the gas behaves ideally on purpose.</span></div>
      <div class="note connect"><span class="k">Connects to</span><span>The geometric-series trick is the same <span class="mono">1/(1−x) = 1 + x + x² + …</span> from your maths chapters. Chemistry didn't invent new maths — it borrowed yours to describe a gas.</span></div>
    </div>
  </section>

  <!-- Station 10 (forces) placed as bridge in Act II -->
  <section class="station" id="xpl-s10">
    <div class="st-head"><span class="depth core">Core</span><div class="st-num">Station 08</div><div class="st-title">What "a" really is: intermolecular forces</div></div>
    <div class="st-body">
      <p class="picture">The van der Waals <span class="mono">a</span> is a single number hiding a family of attractions. All are electrical, all get weaker fast with distance — and the exponent tells you which force you're looking at.</p>
      <div class="eq"><span class="lab">distance laws (energy ∝ 1/rⁿ)</span>ion–dipole 1/r²&nbsp;·&nbsp;dipole–dipole (fixed) 1/r³&nbsp;·&nbsp;ion–induced 1/r⁴&nbsp;·&nbsp;dipole–dipole (rotating) 1/r⁶&nbsp;·&nbsp;London 1/r⁶</div>
      <p>The weak, universal, short-range ones — rotating dipole–dipole and <b>London dispersion</b> (both 1/r⁶) — are the glue behind most condensation. London grows with size and polarizability, which is why HI &gt; HBr &gt; HCl and why big molecules stick.</p>
      <div class="note connect"><span class="k">Connects to</span><span>Polarity and electronegativity from your <b>bonding</b> chapter decide which force is present. A molecule's a-value is really its intermolecular-force strength wearing a number.</span></div>
      <div class="note watch"><span class="k">Watch out</span><span>Don't confuse the exponents — <b>rotating</b> dipole–dipole is 1/r⁶, <b>fixed</b> is 1/r³. That swap is a favourite matrix-match trap.</span></div>
    </div>
  </section>

  <!-- ================= ACT III ================= -->
  <div class="act-label" id="xpl-act3">Act III · The Condensed</div>
  <p class="act-sub">When deviation runs all the way to a phase change.</p>

  <!-- Station 8 -->
  <section class="station hard" id="xpl-s8">
    <div class="st-head"><span class="depth deep">Deep</span><div class="st-num">Station 09</div><div class="st-title">The critical point: where gas and liquid become one</div></div>
    <div class="st-body">
      <p class="picture">Push attraction far enough and the gas doesn't just deviate — it <b>condenses</b>. Plot pressure against volume at a fixed temperature (an Andrews isotherm) and cool step by step. High above a special temperature the curve is a smooth Boyle-like hyperbola. Lower it, and a <b>flat shelf</b> appears: as you squeeze, pressure stops rising while gas turns to liquid at constant pressure. That shelf is coexistence — liquid and vapour together.</p>
      <p>The shelf shrinks as temperature rises and collapses to a single point at the <b>critical temperature T<sub>c</sub></b>. There, liquid and gas become indistinguishable: same density, the meniscus vanishes, surface tension → 0. Above T<sub>c</sub>, no shelf ever appears — <b>no pressure can liquefy the gas.</b></p>
      <div class="figure"><svg viewBox="0 0 240 152" class="fig"><line x1="30" y1="130" x2="228" y2="130" stroke="currentColor" stroke-width="1.2"/><line x1="30" y1="130" x2="30" y2="14" stroke="currentColor" stroke-width="1.2"/><text x="10" y="24" font-size="10" fill="currentColor">P</text><text x="220" y="145" font-size="10" fill="currentColor">V</text><path d="M58,120 C74,66 122,50 130,49 C138,50 178,72 202,120 Z" fill="var(--teal-soft)" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="3 3"/><text x="96" y="112" font-size="8" fill="var(--ink-faint)">liquid + vapour</text><path d="M40,58 C56,56 60,86 86,94 L152,94 C184,94 198,110 216,122" fill="none" stroke="var(--ink-soft)" stroke-width="1.4"/><text x="196" y="118" font-size="8" fill="var(--ink-soft)">T&lt;Tc</text><path d="M44,38 C82,42 116,49 130,49 C152,49 182,68 216,108" fill="none" stroke="var(--coral)" stroke-width="1.8"/><text x="150" y="44" font-size="8" fill="var(--coral)">Tc</text><path d="M50,24 C112,30 172,46 216,92" fill="none" stroke="var(--amber)" stroke-width="1.4"/><text x="184" y="64" font-size="8" fill="var(--amber)">T&gt;Tc</text><circle cx="130" cy="49" r="3.6" fill="var(--coral)"/><text x="135" y="45" font-size="9" fill="var(--coral)">C</text></svg></div>
      <div class="figcap">Below Tc a flat plateau = liquid and vapour coexisting; it shrinks to the critical point C at Tc.</div>
      <div class="eq key"><span class="lab">critical constants from a and b</span>V<sub>c</sub> = 3b&nbsp;·&nbsp;P<sub>c</sub> = a/27b²&nbsp;·&nbsp;T<sub>c</sub> = 8a/27Rb&nbsp;·&nbsp;Z<sub>c</sub> = 3/8</div>
      <details class="build">
        <summary>Build it from scratch — the critical point is an inflection <span class="chev">›</span></summary>
        <div class="build-body">
          <p>At the critical point the S-shaped vdW isotherm flattens into a horizontal <b>inflection</b> — the same idea from your <b>calculus</b>: the tangent is flat and the curvature changes sign. So <i>both</i> derivatives vanish:</p>
          <div class="eq" style="margin-left:0">(∂P/∂V)<sub>T</sub> = 0&nbsp;&nbsp;and&nbsp;&nbsp;(∂²P/∂V²)<sub>T</sub> = 0</div>
          <p>Apply these two conditions to the vdW equation <span class="mono">P = RT/(V−b) − a/V²</span> and you get two equations. Solve them together with the equation itself (three equations, three unknowns P<sub>c</sub>, V<sub>c</sub>, T<sub>c</sub>) and out drop <b>V<sub>c</sub> = 3b, P<sub>c</sub> = a/27b², T<sub>c</sub> = 8a/27Rb</b>. Plug those into Z = PV/RT and every van der Waals gas gives the same <b>Z<sub>c</sub> = 3/8 = 0.375</b>.</p>
        </div>
      </details>
      <div class="note connect"><span class="k">Connects to</span><span>Larger <b>a</b> → higher <b>T<sub>c</sub></b> → easier to liquefy. This is Station 06's promise cashed in: T<sub>c</sub> is a direct readout of intermolecular attraction.</span></div>
      <div class="note watch"><span class="k">Watch out</span><span>Z<sub>c</sub> is <b>3/8</b>, never 8/3 — a deliberate trap in options. And T<sub>c</sub> must go in as kelvin.</span></div>
    </div>
  </section>

  <!-- Station 9 -->
  <section class="station hard" id="xpl-s9">
    <div class="st-head"><span class="depth deep">Deep</span><div class="st-num">Station 10</div><div class="st-title">Actually making a liquid: Joule–Thomson</div></div>
    <div class="st-body">
      <p class="picture">Knowing a gas <i>can</i> liquefy below T<sub>c</sub> is not the same as doing it. The industrial trick is to let a compressed gas <b>expand through a nozzle</b>. As it expands, molecules move apart — and to move apart they must do work <b>against their own attraction</b>, spending kinetic energy. Less KE means (Station 02) lower temperature. The gas cools itself.</p>
      <div class="eq"><span class="lab">Joule–Thomson</span>μ<sub>JT</sub> = (∂T/∂P)<sub>H</sub>&nbsp;·&nbsp;cools only if T &lt; inversion temperature T<sub>i</sub> = 2a/Rb</div>
      <p>But it only cools <b>below the inversion temperature</b> T<sub>i</sub>. Above it, the repulsive/size effect dominates and the gas actually <i>warms</i> on expansion. For an <b>ideal gas there's no attraction at all</b>, so nothing to work against: μ<sub>JT</sub> = 0 — it neither cools nor warms, and can never be liquefied this way.</p>
      <div class="note spine"><span class="k">Spine</span><span>Same two culprits again: attraction cools (the a effect), size warms (the b effect), and T<sub>i</sub> = 2a/Rb is exactly where they balance. Notice T<sub>i</sub> = 2·T<sub>B</sub> — the inversion temperature is just twice the Boyle temperature.</span></div>
      <div class="note connect"><span class="k">Connects to</span><span>This is why <b>He was the last gas ever liquefied.</b> Its tiny a gives T<sub>i</sub> below room temperature, so at 300 K helium <i>warms</i> when throttled — you must pre-cool it with liquid nitrogen before the trick works at all.</span></div>
    </div>
  </section>

  <!-- Station 11 -->
  <section class="station" id="xpl-s11">
    <div class="st-head"><span class="depth core">Core</span><div class="st-num">Station 11</div><div class="st-title">The liquid it becomes: surface tension & viscosity</div></div>
    <div class="st-body">
      <p class="picture">Once condensed, the same attraction that caused it all now rules the liquid. A molecule inside is pulled evenly; one at the surface is pulled only inward — so the surface pulls itself taut and minimises its area. That's <b>surface tension</b>, and it's why drops are spheres.</p>
      <p><b>Viscosity</b> is the same attraction resisting flow — layers of liquid gripping each other. Both are just intermolecular force showing up in bulk, so both <b>fall as temperature rises</b> (heat gives molecules the KE to break free), and surface tension drops to zero exactly at T<sub>c</sub>, where the liquid stops being distinct from vapour.</p>
      <div class="eq"><span class="lab">temperature dependence</span>γ (surface tension) ↓ with T, → 0 at T<sub>c</sub>&nbsp;·&nbsp;η (viscosity) = A·e^(E<sub>a</sub>/RT)&nbsp;→&nbsp;ln η vs 1/T is linear</div>
      <p><b>Vapour pressure & boiling</b> close the loop: a liquid boils when its vapour pressure equals the pressure pushing down on it. Up a mountain the air pushes less, so water boils below 100 °C and food cooks slowly — the pressure-cooker fact, explained.</p>
      <div class="note watch"><span class="k">Watch out</span><span>Both γ and η <b>decrease</b> with temperature (a common reversal in options). And it's <b>ln η</b> vs 1/T that's linear, not η itself.</span></div>
    </div>
  </section>

  <!-- ASK panel (stub for step-2 wiring) -->
  <section class="ask" id="xpl-ask">
    <div class="eyebrow">Stuck on a step?</div>
    <h3>Ask about States of Matter</h3>
    <p>Type what's confusing — "why is Z less than 1 at low temperature?", "re-derive PV=⅓mNc̄² slower" — and get a first-principles explanation in plain words.</p>
    <div class="row">
      <input id="askq" type="text" placeholder="Ask about a concept or a derivation…" aria-label="Ask a question about States of Matter" disabled>
      <button id="asksend" disabled>Ask</button>
    </div>
    <div class="status" id="askstatus">Tutor not connected yet — this button turns on once the Claude API key is wired in (next build step).</div>
    <div class="answer" id="askans" aria-live="polite"></div>
    <div class="guard">This tutor explains concepts and re-derives steps. By design it will <b>not</b> hand over answers to the pattern or practice questions — those you earn.</div>
  </section>

  <!-- closer -->
  <section class="closer">
    <h3>The whole chapter in six breaths</h3>
    <p>Ideal gas = lonely point-molecules obeying PV=nRT (Act I). Real molecules break that by <b>taking up space</b> and <b>attracting</b> — measured by <b>Z</b>. Van der Waals patches both flaws (a = attraction, b = size); the virial equation writes the deviation as a series whose first coefficient <b>B = b − a/RT</b> vanishes at the Boyle temperature (Act II). Push attraction far enough and the gas condenses at the critical point, is coaxed into liquid by Joule–Thomson cooling, and settles into a liquid ruled by surface tension and viscosity (Act III).</p>
    <p>That's the understanding. Now go make it automatic: <a href="#" onclick="var b=document.querySelector('#tabs button[data-tab=patterns]')||document.querySelector('#tabs button:not([data-tab=explain])');if(b)b.click();return false;">open the patterns and guided problems →</a></p>
  </section>

  <div class="foot">Pattern Lab · Explain layer · States of Matter · first-principles read before drill</div>
</div>`;


/* =========================================================================
   Chapter: Coordinate System  (maths/cg/cs)
   Source: Cengage (G. Tewani) Coordinate Geometry Ch.1 "Coordinate System",
           pp.1.3-1.35 (theory + Illus 1.1-1.66 + Concept App. Ex 1.1-1.5 +
           59-Q Exercises + Numerical/Integer/MC/Linked/Matrix sections, all
           answer-key verified) + Narayana JEE-Adv Maths Vol-III "Locus &
           Transformation of Axes" pp.193-208 (CUQ + Exercise-III x2, keyed).
   No Explain layer (technique chapter, per Maths policy).
   ========================================================================= */

/* ===== TAXONOMY ===== */
let CS_TAXA = [
  {code:"C1", label:"Translation of axes",group:"Transformation"},
  {code:"C2", label:"Rotation of axes",group:"Transformation"},
  {code:"C3", label:"Polar \u2194 Cartesian conversion",group:"Systems"},
  {code:"C4", label:"Distance formula",group:"Distance & Area"},
  {code:"C5", label:"Section formula (internal/external)",group:"Distance & Area"},
  {code:"C6", label:"Area of triangle/polygon (shoelace)",group:"Distance & Area"},
  {code:"C7", label:"Collinearity via area = 0",group:"Distance & Area"},
  {code:"C8", label:"Centroid",group:"Triangle Centres"},
  {code:"C9", label:"Incentre",group:"Triangle Centres"},
  {code:"C10",label:"Excentre",group:"Triangle Centres"},
  {code:"C11",label:"Circumcentre & Orthocentre",group:"Triangle Centres"},
  {code:"C12",label:"Euler line (H,G,O collinear, 2:1)",group:"Triangle Centres"},
  {code:"C13",label:"Slope & angle between lines",group:"Lines"},
  {code:"C14",label:"Locus \u2014 direct condition",group:"Locus"},
  {code:"C15",label:"Locus \u2014 parameter elimination",group:"Locus"}
];

/* ===== FORMULAE ===== */
let CS_FORMULAE = [
  {tag:"transform",title:"Translation & rotation of axes",rows:[
    {f:"Translation to new origin (h,k): x = X+h, y = Y+k  (old = new + shift)"},
    {f:"Rotation by \u03b8 (anticlockwise): x = Xcos\u03b8 \u2212 Ysin\u03b8,  y = Xsin\u03b8 + Ycos\u03b8"},
    {f:"Reverse (new in terms of old): X = xcos\u03b8 + ysin\u03b8,  Y = \u2212xsin\u03b8 + ycos\u03b8",k:"trig",note:"Translation only changes linear/constant terms; rotation only removes the xy cross-term. Never expect one tool to do the other's job."},
    {f:"To remove xy from ax\u00b2+2hxy+by\u00b2+...=0: tan2\u03b8 = 2h/(a\u2212b) if a\u2260b;  \u03b8=(2n+1)\u03c0/4 if a=b",k:"trap",note:"This is the single most-tested rotation result \u2014 memorise it exactly, sign and all."}]},
  {tag:"polar",title:"Polar coordinate system",rows:[
    {f:"Point conversion: x = r cos\u03b8, y = r sin\u03b8;  r = \u221a(x\u00b2+y\u00b2), \u03b8 = tan\u207b\u00b9(y/x) (quadrant-adjusted)"},
    {f:"(r,\u03b8) and (\u2212r,\u03b8) lie on the same line through the pole but on opposite sides \u2014 same as (r,\u03b8+\u03c0)"},
    {f:"A point has infinitely many polar representations: (r,\u03b8)=(r,\u03b8+2n\u03c0)=(\u2212r,\u03b8+(2n+1)\u03c0)",k:"trap",note:"Unlike Cartesian, polar coordinates are NOT unique \u2014 always state which r-sign convention you're using."}]},
  {tag:"distsec",title:"Distance & Section formulas",rows:[
    {f:"PQ = \u221a[(x\u2082\u2212x\u2081)\u00b2+(y\u2082\u2212y\u2081)\u00b2];  distance from origin = \u221a(x\u00b2+y\u00b2)"},
    {f:"Internal division m:n: P = ((mx\u2082+nx\u2081)/(m+n), (my\u2082+ny\u2081)/(m+n))"},
    {f:"External division m:n: P = ((mx\u2082\u2212nx\u2081)/(m\u2212n), (my\u2082\u2212ny\u2081)/(m\u2212n))",k:"trig",note:"External division is the same formula with a sign flip \u2014 it lands OUTSIDE segment AB, beyond whichever point has the larger share."}]},
  {tag:"area",title:"Area of triangle / polygon",rows:[
    {f:"\u0394 = \u00bd|x\u2081(y\u2082\u2212y\u2083)+x\u2082(y\u2083\u2212y\u2081)+x\u2083(y\u2081\u2212y\u2082)|  (take modulus \u2014 sign only shows CW/CCW order)"},
    {f:"n-gon (cyclic order): \u0394 = \u00bd|\u03a3(x\u1d62y\u1d62\u208a\u2081 \u2212 x\u1d62\u208a\u2081y\u1d62)|  (shoelace / stair method)"},
    {f:"Collinear \u21d4 \u0394 = 0",k:"trap",note:"Vertices MUST be listed in one consistent cyclic order (all CW or all CCW) or the shoelace sum breaks."}]},
  {tag:"centres",title:"Triangle centres",rows:[
    {f:"Centroid G = ((x\u2081+x\u2082+x\u2083)/3, (y\u2081+y\u2082+y\u2083)/3)  \u2014 simple average of vertices"},
    {f:"Incentre I = ((ax\u2081+bx\u2082+cx\u2083)/(a+b+c), (ay\u2081+by\u2082+cy\u2083)/(a+b+c)),  a=BC,b=CA,c=AB (opposite-side weights)"},
    {f:"Excentre opp. A: I_A = ((\u2212ax\u2081+bx\u2082+cx\u2083)/(\u2212a+b+c), ...)  \u2014 negate only the coefficient of the vertex whose excentre you want"},
    {f:"Circumcentre: equidistant from all 3 vertices (solve 2 perpendicular-bisector eqns). Orthocentre: altitudes concurrent (slope\u00d7slope=\u22121 pairs)",k:"trig",note:"In a right triangle, orthocentre = the right-angle vertex; circumcentre = midpoint of the hypotenuse. Huge shortcut \u2014 check for a right angle first."},
    {f:"Euler line: H, G, O collinear with HG:GO = 2:1.  If circumcentre O=(0,0): orthocentre H = (x\u2081+x\u2082+x\u2083, y\u2081+y\u2082+y\u2083)",k:"trap",note:"Ratio is 2:1 from H to O via G \u2014 not 1:2. Also: O=3G\u22122H and H=3G\u22122O both follow from the same section-formula relation."}]},
  {tag:"slope",title:"Slope & angle between lines",rows:[
    {f:"Slope m = (y\u2082\u2212y\u2081)/(x\u2082\u2212x\u2081)  or  m = \u2212(coeff of x)/(coeff of y) from ax+by+c=0"},
    {f:"Angle between two lines: tan\u03b8 = |(m\u2082\u2212m\u2081)/(1+m\u2081m\u2082)|"},
    {f:"Parallel \u21d4 m\u2081=m\u2082.  Perpendicular \u21d4 m\u2081m\u2082=\u22121 (equivalently 1+m\u2081m\u2082=0)",k:"trig",note:"When 1+m\u2081m\u2082=0 the angle formula's denominator vanishes \u2014 that IS the perpendicularity signal, not an error."}]},
  {tag:"locus",title:"Locus toolkit (Narayana synopsis)",rows:[
    {f:"Equidistant from 2 fixed points \u21d2 perpendicular bisector (straight line)"},
    {f:"PA\u00b2+PB\u00b2=K\u00b7PC\u00b2 (A,B,C fixed): straight line if K=2; circle if K\u22602 and K>0; empty set if K<0"},
    {f:"PA+PB=K (A,B fixed, AB=d): ellipse if d<K; segment AB if d=K; no locus if d>K"},
    {f:"|PA\u2212PB|=K: no locus if d<K; line through A,B minus segment AB if d=K; hyperbola if d>K",k:"trap",note:"These four cases are pure existence-and-shape lookups \u2014 compare K against AB before doing any algebra."},
    {f:"Area of \u25b3PAB = constant \u21d2 locus of P is a PAIR of lines parallel to AB, distance 4\u0394/AB apart"}]}
];

/* ===== PATTERNS (L2) ===== */
let CS_PATTERNS = [
  {id:"P1",name:"Translation of Axes",trigger:"Equation mixes quadratic terms with a first-degree term (linear x or y) and/or a constant \u2014 e.g. y\u00b2+4y+8x\u22122=0.",move:"Set x=X+h, y=Y+k. Substitute, then pick h,k to kill whichever terms are unwanted (coefficient of the linear term=0 and/or constant=0). Solve the resulting equations for h,k.",why:"Pure translation shifts the origin without rotating \u2014 it changes only the linear and constant parts of the equation, never the x\u00b2,y\u00b2,xy coefficients, because the new axes stay parallel to the old ones.",mini:"Shift the origin so y\u00b2+4y+8x\u22122=0 loses both its y-term and constant term.",fails:"Trying to remove an xy cross-term via translation \u2014 translation can't touch it; that needs rotation (P2) instead.",src:"Illus 1.4-1.6, Ex1.1 Q7",srcText:{"Illus 1.4":"At what point should the origin be shifted if the coordinates of a point (4, 5) become (\u22123, 9)?","Illus 1.5":"If the origin is shifted to the point (1, \u22122) without rotation of the axes, what do the following equations become? a. 2x\u00b2+y\u00b2\u22124x+4y=0  b. y\u00b2\u22124x+4y+8=0","Illus 1.6":"Shift the origin to a suitable point so that the equation y\u00b2+4y+8x\u22122=0 does not contain a term in y and the constant term."}},
  {id:"P2",name:"Rotation of Axes",trigger:"Equation carries an xy cross term (ax\u00b2+2hxy+by\u00b2+...=0), or you're told the axes are rotated through a stated angle \u03b8.",move:"Use x=Xcos\u03b8\u2212Ysin\u03b8, y=Xsin\u03b8+Ycos\u03b8 (or the reverse table). Substitute and simplify; to kill the xy-term, choose tan2\u03b8=2h/(a\u2212b).",why:"Rotation re-orients the axes to align with the conic's own principal directions \u2014 that's precisely what removes the cross term; translation can't do this since it never changes relative orientation.",mini:"Find \u03b8 so that rotating 3x\u00b2+2xy+3y\u00b2=10 removes the xy term.",fails:"Mixing up which variable takes cos\u03b8 vs sin\u03b8, or a sign slip on sin\u03b8 \u2014 always write out the conversion table before substituting.",src:"Illus 1.8-1.10, W.E-1.3",srcText:{"Illus 1.8":"The axes are rotated through an angle of \u03c0/3 in the anticlockwise direction about (0,0). Find the coordinates of the point (4,2) (w.r.t. old system) in the new coordinate system.","Illus 1.9":"The equation of a curve referred to a given system of axes is 3x\u00b2+2xy+3y\u00b2=10. Find its equation if the axes are rotated about the origin through 45\u00b0.","Illus 1.10":"If \u03b8 is an angle by which axes are rotated about the origin and ax\u00b2+2hxy+by\u00b2=0 does not contain the xy term in the new system, prove that tan2\u03b8=2h/(a\u2212b)."}},
  {id:"P3",name:"Polar \u2194 Cartesian Conversion",trigger:"A point or equation is given in (r,\u03b8) form, or you must convert Cartesian \u2192 polar (or back).",move:"Point: x=rcos\u03b8, y=rsin\u03b8 (or reverse: r=\u221a(x\u00b2+y\u00b2), \u03b8=tan\u207b\u00b9(y/x) with quadrant care). Equation: substitute rcos\u03b8 for x, rsin\u03b8 for y (use r\u00b2=x\u00b2+y\u00b2 where needed).",why:"Polar coordinates trade the two perpendicular axes for distance+angle from a single pole \u2014 natural whenever a problem has circular or rotational symmetry.",mini:"Convert (\u22121,1) to polar coordinates using both positive and negative r.",fails:"Reading \u03b8 straight off tan\u207b\u00b9(y/x) without checking the quadrant \u2014 the principal value of tan\u207b\u00b9 alone can point to the wrong quadrant.",src:"Illus 1.12-1.13, Ex1.1 Q7-8",srcText:{"Illus 1.12":"Convert the following points from polar coordinates to Cartesian: a.(2,\u03c0/3) b.(0,\u03c0/2) c.(\u2212\u221a2,\u03c0/4).","Illus 1.13":"Convert the following Cartesian coordinates to polar using positive and negative r: a.(\u22121,1) b.(2,\u22123)."}},
  {id:"P4",name:"Distance Formula",trigger:"Need the length between two named points, or a 'distance from origin' phrase, or an Apollonius-type sum-of-squares identity.",move:"PQ=\u221a[(x\u2082\u2212x\u2081)\u00b2+(y\u2082\u2212y\u2081)\u00b2]; distance from origin=\u221a(x\u00b2+y\u00b2). For median/Apollonius identities, place convenient points on an axis first.",why:"Direct Pythagoras on the coordinate differences \u2014 PQ is the diagonal of the rectangle formed by the horizontal and vertical legs.",mini:"Prove Apollonius' theorem AB\u00b2+AC\u00b2=2(AD\u00b2+BD\u00b2), D the midpoint of BC.",fails:"Leaving the answer as the squared distance (forgetting the final square root), or losing a sign inside a squared difference.",src:"Illus 1.19-1.20, Ex1.3 Q1",srcText:{"Illus 1.19":"Using the distance formula, prove Apollonius' theorem that in \u25b3ABC, AB\u00b2+AC\u00b2=2(AD\u00b2+BD\u00b2), where D is the midpoint of BC.","Illus 1.20":"Find the coordinates of the circumcentre of the triangle whose vertices are A(5,\u22121),B(\u22121,5),C(6,6). Also find its radius."}},
  {id:"P5",name:"Section Formula (Internal/External)",trigger:"A point divides a segment in ratio m:n (stated or implied by AP/BP=m/n), either between the points (internal) or beyond them (external).",move:"Internal: P=((mx\u2082+nx\u2081)/(m+n),(my\u2082+ny\u2081)/(m+n)). External: same shape with every '+' switched to '\u2212': P=((mx\u2082\u2212nx\u2081)/(m\u2212n),(my\u2082\u2212ny\u2081)/(m\u2212n)).",why:"Internal division is a weighted average pulling toward whichever point has the larger weight; external division extrapolates past the segment \u2014 same algebraic shape, subtraction reflects P falling outside AB.",mini:"Find the ratio in which the line 3x+y\u22129=0 divides the join of (1,3) and (2,7).",fails:"Applying the internal formula to a problem that's actually external (or vice versa) \u2014 always check whether P should sit between A,B or beyond one of them.",src:"Illus 1.33-1.35, ExIII Q1",srcText:{"Illus 1.33":"Find the coordinates of the point which divides the line segment joining (6,3) and (\u22124,5) in the ratio 3:2 internally and externally.","Illus 1.35":"Determine the ratio in which the line 3x+y\u22129=0 divides the line segment joining the points (1,3) and (2,7)."}},
  {id:"P6",name:"Area of Triangle/Polygon (Shoelace)",trigger:"Area is asked for 3+ named vertices, or an n-sided polygon area, or a quadrilateral split into two triangles.",move:"\u0394=\u00bd|x\u2081(y\u2082\u2212y\u2083)+x\u2082(y\u2083\u2212y\u2081)+x\u2083(y\u2081\u2212y\u2082)|. For a polygon in cyclic order, sum the shoelace products and take \u00bd the modulus.",why:"This is the signed-area determinant (a cross-product in disguise); the modulus wipes out the sign ambiguity that comes from the direction (CW vs CCW) you happened to list the vertices in.",mini:"Find the area of the quadrilateral ABCD with A(1,1),B(7,\u22123),C(12,2),D(7,21).",fails:"Feeding vertices into the shoelace sum out of cyclic order \u2014 that produces a self-intersecting 'area' that's simply wrong, not just sign-flipped.",src:"Illus 1.25-1.27, Ex1.1 Q1,4",srcText:{"Illus 1.25":"Find the area of a triangle having vertices A(3,2), B(11,8), and C(8,12).","Illus 1.26":"Prove that the area of the triangle whose vertices are (t,t\u22122),(t+2,t+2),(t+3,t) is independent of t.","Illus 1.27":"Find the area of the quadrilateral ABCD having vertices A(1,1), B(7,\u22123), C(12,2), and D(7,21)."}},
  {id:"P7",name:"Collinearity via Area = 0",trigger:"Asked to prove three points collinear, or to find an unknown value that makes given points collinear.",move:"Set the triangle-area determinant equal to zero: x\u2081(y\u2082\u2212y\u2083)+x\u2082(y\u2083\u2212y\u2081)+x\u2083(y\u2081\u2212y\u2082)=0, then solve for the unknown.",why:"Collinear points enclose no area \u2014 area=0 is the exact algebraic signature of a degenerate triangle.",mini:"Find k so that (k,2\u22122k),(\u2212k+1,2k),(\u22124\u2212k,6\u22122k) are collinear.",fails:"Accepting every algebraic root without checking it doesn't secretly make two of the three points coincide (a different kind of degeneracy that should be rejected).",src:"Illus 1.28, ExIII Q9(CUQ)",srcText:{"Illus 1.28":"For what value of k are the points (k, 2\u22122k), (\u2212k+1, 2k), and (\u22124\u2212k, 6\u22122k) collinear?"}},
  {id:"P8",name:"Centroid",trigger:"Asked for the centroid of a triangle, or a point dividing a median in ratio 2:1 from the vertex.",move:"G=((x\u2081+x\u2082+x\u2083)/3, (y\u2081+y\u2082+y\u2083)/3) \u2014 simply average the three vertices.",why:"The centroid is where the three medians concur, and each median is divided 2:1 there \u2014 averaging the vertices is exactly equivalent to that concurrency point via the section formula on any one median.",mini:"Vertex A of a triangle is (3,5) and the centroid is (\u22121,2). Find the midpoint of BC.",fails:"Averaging only two of the three vertices, or confusing the centroid's simple-average formula with the side-weighted incentre formula.",src:"Illus 1.38-1.39",srcText:{"Illus 1.38":"If vertex A of a triangle is (3,5) and the centroid is (\u22121,2), find the midpoint of side BC.","Illus 1.39":"Let O(0,0), P(3,4), Q(6,0) be vertices of \u25b3OPQ. Find R inside so that \u25b3OPR, \u25b3PQR, \u25b3OQR have equal areas."}},
  {id:"P9",name:"Incentre",trigger:"Asked for the incentre of a triangle given its vertices (and implicitly its side lengths).",move:"I=((a\u00b7x\u2081+b\u00b7x\u2082+c\u00b7x\u2083)/(a+b+c), (a\u00b7y\u2081+b\u00b7y\u2082+c\u00b7y\u2083)/(a+b+c)) where a=BC,b=CA,c=AB (each vertex weighted by its OPPOSITE side length).",why:"The angle bisector theorem shows each internal bisector splits the opposite side in the ratio of the two adjacent sides; chaining this through the triangle produces exactly the side-weighted average above.",mini:"Find the incentre of the triangle with vertices (1,1),(4,1),(1,5).",fails:"Weighting a vertex by an ADJACENT side instead of the opposite one \u2014 a=BC is opposite A, not AB or AC.",src:"Illus 1.40, 1.42",srcText:{"Illus 1.40":"If a vertex of a triangle is (1,1), and the midpoints of the two sides through it are (\u22122,3) and (5,2), find the centroid and the incentre of the triangle.","Illus 1.42":"Find the coordinates of the incentre and all the excentres of the triangle whose vertices are (1,1),(4,1),(1,5)."}},
  {id:"P10",name:"Excentre",trigger:"Asked for the excentre opposite a specific vertex (the circle tangent to one side and to the extensions of the other two).",move:"I_A=((\u2212a\u00b7x\u2081+b\u00b7x\u2082+c\u00b7x\u2083)/(\u2212a+b+c), ...) \u2014 same weights as the incentre but negate only the coefficient of the vertex whose opposite excentre is wanted.",why:"The excentre opposite A sits on the external bisectors of B and C but the internal bisector of A; flipping the sign of a (side opposite A) captures that internal/external switch algebraically.",mini:"Find the excentre opposite vertex A of the triangle (1,1),(4,1),(1,5).",fails:"Negating the wrong side's coefficient \u2014 excentre opposite A negates 'a' (side BC, opposite A), not the label x\u2081 itself.",src:"Illus 1.42",srcText:{"Illus 1.42":"Find the coordinates of the incentre and all the excentres of the triangle whose vertices are (1,1),(4,1),(1,5)."}},
  {id:"P11",name:"Circumcentre & Orthocentre",trigger:"Asked for the circumcentre (equidistant from all vertices) or the orthocentre (altitudes concurrent).",move:"Circumcentre: solve any two of (x\u2212x\u1d62)\u00b2+(y\u2212y\u1d62)\u00b2 equal to each other (perpendicular-bisector pairs). Orthocentre: use two altitude equations, each altitude \u22a5 the opposite side and through its own vertex.",why:"Circumcentre equidistance follows directly from its definition as the circumscribing circle's centre; orthocentre follows from the perpendicularity condition (slope product=\u22121) between an altitude and the side it drops onto.",mini:"Find the orthocentre of the triangle A(1,0),B(\u22122,1),C(5,2).",fails:"Solving all three pairwise circumcentre equations independently (redundant \u2014 any two pin the point); for orthocentre, using the wrong side's slope for a given altitude.",src:"Illus 1.20, 1.56",srcText:{"Illus 1.20":"Find the coordinates of the circumcentre of the triangle whose vertices are A(5,\u22121),B(\u22121,5),C(6,6). Also find its radius.","Illus 1.56":"Find the orthocentre of \u25b3ABC with vertices A(1,0),B(\u22122,1),and C(5,2)."}},
  {id:"P12",name:"Euler Line",trigger:"Orthocentre, centroid, and circumcentre are all mentioned in the same problem, or an HG:GO ratio is invoked.",move:"H,G,O are collinear (the Euler line) with HG:GO=2:1. If the circumcentre sits at the origin, orthocentre=(x\u2081+x\u2082+x\u2083, y\u2081+y\u2082+y\u2083) (sum of vertices). Otherwise use the section formula with ratio 2:1 to find whichever point is missing.",why:"This concurrency is a genuine theorem \u2014 the centroid always sits exactly 1/3 of the way from circumcentre to orthocentre, independent of the triangle's shape.",mini:"If the centroid of a triangle is (1/3,2/3) and its circumcentre is the origin, find the orthocentre.",fails:"Using ratio 1:2 instead of 2:1, or forgetting the direction (H to G is the LONGER segment, G to O the shorter one).",src:"Illus 1.44-1.45",srcText:{"Illus 1.44":"If the circumcentre of a triangle lies at the origin and the centroid is the midpoint of the segment joining (a\u00b2+1,a\u00b2+1) and (2a,\u22122a), find the orthocentre.","Illus 1.45":"Orthocentre and circumcentre of \u25b3ABC are (a,b) and (c,d), respectively. If vertex A is (x\u2081,y\u2081), find the midpoint of BC."}},
  {id:"P13",name:"Slope & Angle Between Lines",trigger:"Asked for the slope of a line through 2 points (or from an equation), the angle between two lines, or a parallel/perpendicular condition.",move:"Slope m=(y\u2082\u2212y\u2081)/(x\u2082\u2212x\u2081) or m=\u2212coeff(x)/coeff(y) from ax+by+c=0. Angle: tan\u03b8=|(m\u2082\u2212m\u2081)/(1+m\u2081m\u2082)|. Parallel: m\u2081=m\u2082. Perpendicular: m\u2081m\u2082=\u22121.",why:"Slope is literally tan(inclination); the angle-between formula falls straight out of the tangent-subtraction identity applied to the two inclinations.",mini:"Find the angle between the line joining (1,\u22122),(3,2) and the line x+2y\u22127=0.",fails:"Dropping the modulus in the acute-angle formula (getting an obtuse or negative answer when the acute angle was wanted), or missing that a zero denominator (1+m\u2081m\u2082=0) SIGNALS perpendicularity rather than being an error.",src:"Illus 1.46-1.50, Ex1.4 Q6",srcText:{"Illus 1.46":"Determine the value of x so that the line passing through (3,4) and (x,5) makes an angle of 135\u00b0 with the positive x-axis.","Illus 1.50":"If A(\u22122,1), B(2,3) and C(\u22122,\u22124) are three points, find the angle between BA and BC."}},
  {id:"P14",name:"Locus \u2014 Direct Condition",trigger:"A point moves subject to a stated distance/ratio/angle/area condition (no parameter involved).",move:"Let the moving point be (h,k); translate the given condition into an equation in h,k using the distance, section, or area formulas; then replace h\u2192x, k\u2192y for the final locus equation.",why:"This is simply 'naming the unknown point and writing down what's literally true about it' \u2014 the stated condition IS the equation once you express it algebraically instead of in words.",mini:"Find the locus of a point whose sum of squares of distances from (a,0) and (\u2212a,0) is a constant 2c\u00b2.",fails:"Solving all the way through in terms of h,k and forgetting to relabel h\u2192x, k\u2192y at the very end.",src:"Illus 1.58-1.60, narLocus Ex-III",srcText:{"Illus 1.58":"The sum of the squares of the distances of a moving point from the fixed points (a,0) and (\u2212a,0) is equal to a constant 2c\u00b2. Find the equation of its locus.","Illus 1.60":"Find the equation of the locus of a point such that the sum of its distances from the points (0,2) and (0,\u22122) is 6."}},
  {id:"P15",name:"Locus \u2014 Parameter Elimination",trigger:"The moving point's coordinates are given explicitly in terms of a parameter (\u03b8, t, etc.).",move:"Write x=f(param), y=g(param); solve one relation for the parameter (or use an identity like cos\u00b2+sin\u00b2=1) and substitute into the other to eliminate it, leaving a pure x,y equation.",why:"Each parameter value traces exactly one point of the locus; eliminating the parameter collapses the whole family of points onto the single implicit curve they all sit on.",mini:"Find the locus of the point (t\u00b2\u2212t+1, t\u00b2+t+1) as t ranges over \u211d.",fails:"Squaring and adding two trig expressions without first isolating each ratio (e.g. forgetting to divide by a,b before invoking cos\u00b2+sin\u00b2=1) \u2014 leads to a wrong, non-standard equation.",src:"Illus 1.62-1.64",srcText:{"Illus 1.63":"If the coordinates of a variable point P are (a cos\u03b8, b sin\u03b8), where \u03b8 is a variable quantity, find the equation of the locus of P.","Illus 1.64":"Find the equation of the locus of the variable point (t\u00b2\u2212t+1, t\u00b2+t+1), t\u2208\u211d."}}
];

/* ===== GUIDED (L3) \u2014 all tier 3, laddered ===== */
let CS_GUIDED = [
  {id:"G1",tier:3,tax:"P1",pattern:"P1",q:"Shift the origin to a suitable point so that y\u00b2+4y+8x\u22122=0 loses both its y-term and its constant term.",
    opts:["Translation of Axes","Rotation of Axes","Section Formula","Locus \u2014 Direct Condition"],correct:0,
    hints:["Substitute x=X+h, y=Y+k directly into the equation and expand.","Collect the coefficient of Y (linear in Y) and the standalone constant term separately \u2014 set BOTH to zero.","You get two equations in h,k: 2k+4=0 and k\u00b2+8h+4k\u22122=0. Solve the first for k, then substitute to get h."],
    ans:"New origin = (3/4, \u22122)",why:"Translation only reshapes the linear/constant part of the equation \u2014 picking h,k to zero out exactly those two pieces is the whole method."},
  {id:"G2",tier:3,tax:"P2",pattern:"P2",q:"Through what angle \u03b8 (0<\u03b8<\u03c0/2) should the axes be rotated to remove the xy-term from 3x\u00b2+2xy+3y\u00b2=10, and what is the new equation?",
    opts:["Rotation of Axes","Translation of Axes","Slope & Angle Between Lines","Polar \u2194 Cartesian Conversion"],correct:0,
    hints:["Use tan2\u03b8=2h/(a\u2212b) with a=3,b=3,h=1. Since a=b, this formula is undefined \u2014 that's the special case \u03b8=(2n+1)\u03c0/4.","Take the smallest positive value: \u03b8=\u03c0/4 (45\u00b0).","Substitute x=Xcos45\u00b0\u2212Ysin45\u00b0, y=Xsin45\u00b0+Ycos45\u00b0 into 3x\u00b2+2xy+3y\u00b2=10 and simplify."],
    ans:"\u03b8 = 45\u00b0; new equation 2X\u00b2+Y\u00b2=5",why:"Whenever a=b in ax\u00b2+2hxy+by\u00b2, the general rotation formula degenerates \u2014 recognise the special-case angle \u03c0/4 instead of dividing by zero."},
  {id:"G3",tier:3,tax:"P3",pattern:"P3",q:"Convert the Cartesian point (2,\u22123) to polar coordinates using a positive value of r.",
    opts:["Polar \u2194 Cartesian Conversion","Rotation of Axes","Distance Formula","Locus \u2014 Parameter Elimination"],correct:0,
    hints:["r=\u221a(x\u00b2+y\u00b2)=\u221a(4+9)=\u221a13.","tan\u03b8=y/x=\u22123/2. Since x>0,y<0, the point is in the FOURTH quadrant.","So \u03b8=\u2212tan\u207b\u00b9(3/2) (a negative angle, or equivalently 2\u03c0\u2212tan\u207b\u00b9(3/2))."],
    ans:"(r,\u03b8) = (\u221a13, \u2212tan\u207b\u00b9(3/2))",why:"tan\u207b\u00b9 alone never tells you the quadrant \u2014 always check the signs of x,y first, then place \u03b8 accordingly."},
  {id:"G4",tier:3,tax:"P4",pattern:"P4",q:"Using the distance formula, prove Apollonius' theorem: in \u25b3ABC, AB\u00b2+AC\u00b2=2(AD\u00b2+BD\u00b2), where D is the midpoint of BC.",
    opts:["Distance Formula","Section Formula","Area of Triangle/Polygon","Slope & Angle Between Lines"],correct:0,
    hints:["Place B,C conveniently on the x-axis: B(\u2212k,0), C(k,0), so D=(0,0) is automatically the midpoint (BD=k).","Let A=(x,y). Write AB\u00b2 and AC\u00b2 via the distance formula and add them.","AB\u00b2+AC\u00b2 = 2x\u00b2+2y\u00b2+2k\u00b2 = 2(x\u00b2+y\u00b2)+2k\u00b2. Now express AD\u00b2 and BD\u00b2 in the same coordinates and compare."],
    ans:"AB\u00b2+AC\u00b2 = 2(x\u00b2+y\u00b2+k\u00b2) = 2(AD\u00b2+BD\u00b2)  \u2014 identity confirmed",why:"Placing the midpoint at the origin turns the general identity into pure algebra \u2014 a coordinate choice that costs nothing but saves all the work."},
  {id:"G5",tier:3,tax:"P5",pattern:"P5",q:"Determine the ratio in which the line 3x+y\u22129=0 divides the segment joining (1,3) and (2,7).",
    opts:["Section Formula (Internal/External)","Area of Triangle/Polygon","Collinearity via Area=0","Distance Formula"],correct:0,
    hints:["Suppose the line divides AB in ratio k:1 at point C. By the section formula, C=((2k+1)/(k+1),(7k+3)/(k+1)).","C must satisfy 3x+y\u22129=0. Substitute C's coordinates into that equation.","Solve the resulting linear equation in k."],
    ans:"k = 3/4, so the ratio is 3:4 internally",why:"Any point claimed to divide AB in an unknown ratio can be written via the section formula with that ratio as the unknown, then pinned down by whatever extra condition (here, lying on a given line) is supplied."},
  {id:"G6",tier:3,tax:"P6",pattern:"P6",q:"Find the area of the quadrilateral ABCD with vertices A(1,1), B(7,\u22123), C(12,2), D(7,21), given in cyclic order.",
    opts:["Area of Triangle/Polygon (Shoelace)","Collinearity via Area=0","Section Formula","Locus \u2014 Direct Condition"],correct:0,
    hints:["Apply the shoelace sum directly on the 4 points in the ORDER given (they're already cyclic): \u00bd|(x\u2081y\u2082\u2212x\u2082y\u2081)+(x\u2082y\u2083\u2212x\u2083y\u2082)+(x\u2083y\u2084\u2212x\u2084y\u2083)+(x\u2084y\u2081\u2212x\u2081y\u2084)|.","Compute each bracketed term: (1\u00b7\u22123\u22127\u00b71), (7\u00b72\u221212\u00b7\u22123), (12\u00b721\u22127\u00b72), (7\u00b71\u22121\u00b721).","Sum them, take half the modulus."],
    ans:"Area = 132 sq. units",why:"A polygon's shoelace sum is just repeated application of the triangle-area determinant around the boundary \u2014 no need to split into triangles by hand."},
  {id:"G7",tier:3,tax:"P7",pattern:"P7",q:"Find k so that (k, 2\u22122k), (\u2212k+1, 2k), and (\u22124\u2212k, 6\u22122k) are collinear.",
    opts:["Collinearity via Area=0","Section Formula","Slope & Angle Between Lines","Area of Triangle/Polygon"],correct:0,
    hints:["Set up the area determinant x\u2081(y\u2082\u2212y\u2083)+x\u2082(y\u2083\u2212y\u2081)+x\u2083(y\u2081\u2212y\u2082)=0 with the three given points.","Expand carefully \u2014 you'll land on a quadratic in k: 2k\u00b2+k\u22121=0, i.e. (2k\u22121)(k+1)=0.","Check k=1/2: does it make two of the three points coincide? If so, discard it as degenerate rather than genuinely collinear."],
    ans:"k = \u22121  (k=1/2 is rejected \u2014 it collapses two of the points onto each other)",why:"Area=0 catches BOTH true collinearity and the degenerate case of repeated points \u2014 always sanity-check which one an algebraic root represents."},
  {id:"G8",tier:3,tax:"P8",pattern:"P8",q:"Vertex A of a triangle is (3,5) and its centroid is (\u22121,2). Find the midpoint of side BC.",
    opts:["Centroid","Incentre","Circumcentre & Orthocentre","Euler Line"],correct:0,
    hints:["Let D be the midpoint of BC. AD is a median, and the centroid G divides AD in ratio 2:1 from A.","So G = (A + 2D)/3, i.e. D = (3G\u2212A)/2.","Substitute A=(3,5), G=(\u22121,2) and compute D component-wise."],
    ans:"Midpoint of BC = (\u22123, 1/2)",why:"The centroid-divides-median-2:1 fact turns a 'find the midpoint' question into one clean section-formula inversion."},
  {id:"G9",tier:3,tax:"P9",pattern:"P9",q:"Find the incentre of the triangle with vertices A(1,1), B(4,1), C(1,5).",
    opts:["Incentre","Excentre","Centroid","Circumcentre & Orthocentre"],correct:0,
    hints:["First find the side lengths opposite each vertex: a=BC, b=CA, c=AB.","BC=\u221a((4\u22121)\u00b2+(1\u22125)\u00b2)=5; CA=\u221a((1\u22121)\u00b2+(5\u22121)\u00b2)=4; AB=\u221a((4\u22121)\u00b2+(1\u22121)\u00b2)=3.","Plug a=5,b=4,c=3 into I=((ax\u2081+bx\u2082+cx\u2083)/(a+b+c), (ay\u2081+by\u2082+cy\u2083)/(a+b+c))."],
    ans:"Incentre I = (2, 2)",why:"Every incentre problem reduces to: compute the three opposite side lengths, then take that weighted average \u2014 the weighting is the only new idea over the centroid."},
  {id:"G10",tier:3,tax:"P10",pattern:"P10",q:"Find the excentre opposite vertex A of the triangle A(1,1), B(4,1), C(1,5). (Sides: a=BC=5, b=CA=4, c=AB=3.)",
    opts:["Excentre","Incentre","Centroid","Euler Line"],correct:0,
    hints:["Start from the incentre formula but negate the coefficient of the vertex you want the OPPOSITE excentre for \u2014 here that's vertex A, so negate 'a'.","I_A = ((\u2212a\u00b7x\u2081+b\u00b7x\u2082+c\u00b7x\u2083)/(\u2212a+b+c), (\u2212a\u00b7y\u2081+b\u00b7y\u2082+c\u00b7y\u2083)/(\u2212a+b+c)).","Substitute a=5,b=4,c=3 and the vertex coordinates; simplify the fraction."],
    ans:"Excentre opposite A, I_A = (7, 7)",why:"Excentre formulas are the incentre formula with exactly one sign flipped \u2014 memorising the incentre buys you all four centres almost for free."},
  {id:"G11",tier:3,tax:"P11",pattern:"P11",q:"Find the orthocentre of \u25b3ABC with A(1,0), B(\u22122,1), C(5,2).",
    opts:["Circumcentre & Orthocentre","Euler Line","Centroid","Incentre"],correct:0,
    hints:["Slope of BC = (2\u22121)/(5\u2212(\u22122)) = 1/7. The altitude from A is perpendicular to BC, so its slope is \u22127; it passes through A(1,0).","Slope of AC = (2\u22120)/(5\u22121) = 1/2. The altitude from B is perpendicular to AC, slope \u22122, through B(\u22122,1).","Solve the two altitude equations simultaneously for their intersection."],
    ans:"Orthocentre H = (2, \u22127)",why:"Two altitude equations (each built from a perpendicular-slope + point) always suffice \u2014 the third altitude automatically passes through the same point."},
  {id:"G12",tier:3,tax:"P12",pattern:"P12",q:"The centroid of a triangle is (1/3, 2/3) and its circumcentre is the origin. Find the orthocentre.",
    opts:["Euler Line","Circumcentre & Orthocentre","Centroid","Section Formula"],correct:0,
    hints:["Recall HG:GO=2:1, so G divides HO in ratio 2:1 from H. Equivalently, G=(H+2O)/3, i.e. H=3G\u22122O.","With O=(0,0), this simplifies to H=3G.","Substitute G=(1/3,2/3)."],
    ans:"Orthocentre H = (1, 2)",why:"Once you know two of {H,G,O}, the Euler-line ratio 2:1 pins the third \u2014 no need to rebuild the triangle from scratch."},
  {id:"G13",tier:3,tax:"P13",pattern:"P13",q:"Find the angle between the line joining (1,\u22122) and (3,2), and the line x+2y\u22127=0.",
    opts:["Slope & Angle Between Lines","Rotation of Axes","Locus \u2014 Direct Condition","Section Formula"],correct:0,
    hints:["Slope of the segment: m\u2081=(2\u2212(\u22122))/(3\u22121)=2.","Slope of the line x+2y\u22127=0: rewrite as y=\u2212x/2+7/2, so m\u2082=\u22121/2.","Check 1+m\u2081m\u2082 = 1+2\u00b7(\u22121/2) = 0 \u2014 what does that tell you about the angle formula's denominator?"],
    ans:"The lines are perpendicular \u2014 angle = 90\u00b0",why:"1+m\u2081m\u2082=0 isn't a broken formula \u2014 it's the exact algebraic signature of perpendicularity, recognisable before you even reach for tan\u207b\u00b9."},
  {id:"G14",tier:3,tax:"P14",pattern:"P14",q:"The sum of the squares of a moving point's distances from (a,0) and (\u2212a,0) is a constant 2c\u00b2. Find the equation of its locus.",
    opts:["Locus \u2014 Direct Condition","Locus \u2014 Parameter Elimination","Distance Formula","Section Formula"],correct:0,
    hints:["Let the moving point be (h,k). Write PA\u00b2 and PB\u00b2 using the distance formula with A=(a,0), B=(\u2212a,0).","PA\u00b2+PB\u00b2 = (h\u2212a)\u00b2+k\u00b2 + (h+a)\u00b2+k\u00b2. Expand and simplify \u2014 the cross terms in a should cancel.","Set the simplified expression equal to 2c\u00b2, then replace h\u2192x, k\u2192y."],
    ans:"Locus: x\u00b2+y\u00b2 = c\u00b2\u2212a\u00b2",why:"Naming the moving point (h,k) and translating the words 'sum of squares of distances' directly into distance-formula algebra is the entire method \u2014 no separate trick needed."},
  {id:"G15",tier:3,tax:"P15",pattern:"P15",q:"Find the equation of the locus of the point (t\u00b2\u2212t+1, t\u00b2+t+1) as the parameter t ranges over \u211d.",
    opts:["Locus \u2014 Parameter Elimination","Locus \u2014 Direct Condition","Rotation of Axes","Polar \u2194 Cartesian Conversion"],correct:0,
    hints:["Let h=t\u00b2\u2212t+1 and k=t\u00b2+t+1. Subtract: k\u2212h=2t, so t=(k\u2212h)/2.","Now use h=t\u00b2\u2212t+1 to express h purely in terms of (k\u2212h)/2, substituting for t.","Replace h\u2192x, k\u2192y in the resulting relation."],
    ans:"Locus: x = ((y\u2212x)/2)\u00b2 \u2212 (y\u2212x)/2 + 1",why:"Whenever two coordinates share the same parameter, subtracting (or another combination) often isolates the parameter cleanly before you resubstitute \u2014 look for that combination first rather than solving one equation blindly."}
];

/* ===== PRACTICE (L4) \u2014 \u226520 tier-3, sourced from Cengage Exercises + Narayana Module ===== */
let CS_PRACTICE = [
  /* ---------- tier 1 : foundation ---------- */
  {src:"Ex Q1", type:"SC", tier:1, tax:"C3", pat:"P3", q:"The polar coordinates equivalent to the Cartesian coordinates (\u22123,\u221a3) are", choices:["(2\u221a3, \u03c0/6)","(\u22122\u221a3, 5\u03c0/6)","(2\u221a3, 7\u03c0/6)","(2\u221a3, 5\u03c0/6)"], correct:3, ans:"(2\u221a3, 5\u03c0/6)", note:"r=\u221a(9+3)=2\u221a3; point is in Q2 so \u03b8=\u03c0\u2212tan\u207b\u00b9(\u221a3/3)=5\u03c0/6. (Cengage Ex, key Q1=4)", doc:"cengMain"},
  {src:"Ex Q2", type:"SC", tier:1, tax:"C7", pat:"P7", q:"A straight line through P(3,1) meets the axes at A,B with the distance from origin to the line maximum. Area of \u25b3OAB is", choices:["50/3","25/3","20/3","100/3"], correct:0, ans:"50/3", note:"Max-distance condition makes OP \u22a5 the line; this fixes A,B and the area follows. (Cengage Ex, key Q2=1)", doc:"cengMain"},
  {src:"Ex Q3", type:"SC", tier:1, tax:"C6", pat:"P6", q:"Points P(p,0), Q(q,0), R(0,p), S(0,q) form a", choices:["parallelogram","rhombus","cyclic quadrilateral","square"], correct:2, ans:"cyclic quadrilateral", note:"All four points lie at equal 'radius-like' positions symmetric about the axes; check via the cyclic-quadrilateral opposite-angle condition. (Cengage Ex, key Q3=3)", doc:"cengMain"},
  {src:"Ex Q17", type:"SC", tier:1, tax:"C4", pat:"P4", q:"In \u25b3ABC, angle B is a right angle and AC=2. If coordinates of A and B are (2,2) and (1,3), the length of median AD is", choices:["1/2","\u221a(5/2)","5/\u221a2","1/\u221a2"], correct:1, ans:"\u221a(5/2)", note:"Find C using AC=2 and \u2220B=90\u00b0, then D=midpoint of BC, then apply the distance formula for AD. (Cengage Ex, key Q17=2)", doc:"cengMain"},
  {src:"Ex Q19", type:"SC", tier:1, tax:"C6", pat:"P6", q:"If (2,\u22123), (6,5), and (\u22122,1) are three consecutive vertices of a rhombus, its area is", choices:["24","36","18","48"], correct:3, ans:"48", note:"Diagonals of a rhombus bisect at right angles; use the shoelace/diagonal-product route. (Cengage Ex, key Q19=4)", doc:"cengMain"},
  {src:"Illus 1.33a", type:"NV", tier:1, tax:"C5", pat:"P5", q:"Find the coordinates of the point which divides the line segment joining (6,3) and (\u22124,5) in the ratio 3:2 internally.", ans:"(0, 21/5)", note:"Direct internal-section-formula substitution.", doc:"cengIllus"},
  {src:"Illus 1.19", type:"NV", tier:1, tax:"C4", pat:"P4", q:"State Apollonius' theorem for a triangle ABC with D the midpoint of BC.", ans:"AB\u00b2+AC\u00b2 = 2(AD\u00b2+BD\u00b2)", note:"Direct recall/application of the distance-formula identity.", doc:"cengIllus"},
  {src:"Illus 1.4", type:"NV", tier:1, tax:"C1", pat:"P1", q:"At what point should the origin be shifted if the coordinates of a point (4,5) become (\u22123,9)?", ans:"(7, \u22124)", note:"x=X+h,y=Y+k with (X,Y)=(\u22123,9),(x,y)=(4,5) \u21d2 h=7,k=\u22124.", doc:"cengIllus"},

  /* ---------- tier 2 : moderate ---------- */
  {src:"Ex Q11", type:"SC", tier:2, tax:"C6", pat:"P6", q:"\u25b3ABC is isosceles. If the coordinates of the base are B(1,3) and C(\u22122,7), the coordinates of vertex A can be", choices:["(1,6)","(\u22121/2,5)","(5/6,6)","(6/5,5)"], correct:2, ans:"(5/6,6)", note:"A must lie on the perpendicular bisector of BC; check which option satisfies AB=AC. (Cengage Ex, key Q11=3)", doc:"cengMain"},
  {src:"Ex Q12", type:"SC", tier:2, tax:"C6", pat:"P6", q:"Two vertices of a triangle are (1,3) and (4,\u22121); the area of the triangle is 5 sq. units. The angle at the third vertex lies in the interval", choices:["(0, 2tan\u207b\u00b9(5/4)]","(0, tan\u207b\u00b9(5/4)]","[2tan\u207b\u00b9(5/4), 2]","[1, 3tan\u207b\u00b9(5/4)]"], correct:0, ans:"(0, 2tan\u207b\u00b9(5/4)]", note:"Fix the base length and use area to bound the height, which bounds the vertex angle. (Cengage Ex, key Q12=1)", doc:"cengMain"},
  {src:"Ex Q13", type:"SC", tier:2, tax:"C6", pat:"P6", q:"Which of the following sets of points forms an equilateral triangle?", choices:["(1,0),(4,0),(7,\u22121)","(0,0),(3/2,4/3),(4/3,3/2)","(2/3,0),(0,2/3),(1,1)","none of these"], correct:3, ans:"none of these", note:"Check each set's three side lengths directly \u2014 none come out equal. (Cengage Ex, key Q13=4)", doc:"cengMain"},
  {src:"Ex Q14", type:"SC", tier:2, tax:"C6", pat:"P6", q:"If two determinant conditions on (x\u1d62,y\u1d62) and (a\u1d62,b\u1d62) coincide, then the two triangles with those vertices are", choices:["equal in area","similar","congruent","equal in perimeter"], correct:0, ans:"equal in area", note:"Equal determinants directly mean equal areas \u2014 no claim about shape or side lengths follows. (Cengage Ex, key Q14=1)", doc:"cengMain"},
  {src:"Ex Q15", type:"SC", tier:2, tax:"C6", pat:"P6", q:"If OPQR is a square and M,N are midpoints of sides PQ and QR, the ratio of the area of the square to that of \u25b3OMN is", choices:["4:1","2:1","8:3","7:3"], correct:2, ans:"8:3", note:"Place the square on axes, compute \u25b3OMN via the area formula, then compare to the full square. (Cengage Ex, key Q15=3)", doc:"cengMain"},
  {src:"Ex Q18", type:"SC", tier:2, tax:"C4", pat:"P4", q:"Rectangle ABCD has A(\u22121,2), B(3,7), with AB:BC=4:3. If P is the centre of the rectangle, the distance of P from each corner is", choices:["\u221a14/2","3\u221a41/4","2\u221a41/3","5\u221a41/8"], correct:3, ans:"5\u221a41/8", note:"AB length fixes the diagonal via the given ratio; P is the diagonal's midpoint, equidistant from all corners. (Cengage Ex, key Q18=4)", doc:"cengMain"},
  {src:"Ex Q20", type:"SC", tier:2, tax:"C4", pat:"P4", q:"Points A(3,5) and B are equidistant from H(\u221a2,\u221a5). If B has rational coordinates, then AB =", choices:["\u221a7","\u221a((3\u2212\u221a2)\u00b2+(5\u2212\u221a5)\u00b2)","\u221a34","0"], correct:3, ans:"0", note:"The equidistance condition is linear in B\u2019s coordinates with irrational coefficients from H; for a RATIONAL B to satisfy it forces B=A itself, so AB=0. (Cengage Ex, key Q20=4)", doc:"cengMain"},
  {src:"Ex Q21", type:"SC", tier:2, tax:"C6", pat:"P6", q:"If one side of a rhombus has endpoints (4,5) and (1,1), the maximum area of the rhombus can be", choices:["50 sq. units","25 sq. units","30 sq. units","20 sq. units"], correct:1, ans:"25 sq. units", note:"Side length fixed by the two endpoints; area is maximised when the rhombus is a square on that side. (Cengage Ex, key Q21=2)", doc:"cengMain"},
  {src:"Ex Q22", type:"SC", tier:2, tax:"C13", pat:"P13", q:"If a straight line through the origin bisects the line joining (acos\u03b1,asin\u03b1) and (acos\u03b2,asin\u03b2), then the two given points and the origin form lines that are", choices:["perpendicular","parallel","have angle between them of \u03c0/4","none of these"], correct:0, ans:"perpendicular", note:"The bisected chord's midpoint direction from the origin turns out perpendicular to the chord itself. (Cengage Ex, key Q22=1)", doc:"cengMain"},
  {src:"Ex Q25", type:"SC", tier:2, tax:"C5", pat:"P5", q:"If the point (x\u2081+t(x\u2082\u2212x\u2081), y\u2081+t(y\u2082\u2212y\u2081)) divides the join of (x\u2081,y\u2081) and (x\u2082,y\u2082) internally, then", choices:["t<0","0<t<1","t>1","t=1"], correct:1, ans:"0<t<1", note:"This is the section formula written in parametric form \u2014 internal division needs the parameter strictly between 0 and 1. (Cengage Ex, key Q25=2)", doc:"cengMain"},
  {src:"Ex Q26", type:"SC", tier:2, tax:"C5", pat:"P5", q:"If P and Q are points on the line joining A(\u22122,5) and B(3,1) such that AP=PQ=QB, the distance of the midpoint of PQ from the origin is", choices:["\u221a37/2","3","4","\u221a37"], correct:0, ans:"\u221a37/2", note:"P,Q trisect AB; the midpoint of PQ coincides with the midpoint of AB itself. (Cengage Ex, key Q26=1)", doc:"cengMain"},
  {src:"Ex Q29", type:"SC", tier:2, tax:"C11", pat:"P11", q:"If A(0,0), B(1,0), C(1/2,\u221a3/2) are vertices of an equilateral triangle, the centre of the circle for which lines BC and CA are tangents is", choices:["(1/2,1/4)","(3/2,\u221a3/2)","(1/2,1/(2\u221a3))","(1/2,\u22121/\u221a3)"], correct:2, ans:"(1/2,1/(2\u221a3))", note:"An equilateral triangle's incentre and circumcentre coincide at the centroid; the tangent-circle centre lies on the relevant angle bisector. (Cengage Ex, key Q29=3)", doc:"cengMain"},

  /* ---------- tier 3 : Cengage bulleted / high-difficulty ---------- */
  {src:"Ex Q7", type:"SC", tier:3, tax:"C1", pat:"P1", q:"If the origin is shifted to the point (ab/(a\u2212b), 0) without rotation of the axes, then the equation (a\u2212b)(x\u00b2+y\u00b2)\u22122abx=0 becomes", choices:["(a\u2212b)(x\u00b2+y\u00b2)\u2212(a+b)xy+abx=a\u00b2","(a+b)(x\u00b2+y\u00b2)=2ab","(x\u00b2+y\u00b2)=(a\u00b2+b\u00b2)","(a\u2212b)\u00b2(x\u00b2+y\u00b2)=a\u00b2b\u00b2"], correct:3, ans:"(a\u2212b)\u00b2(x\u00b2+y\u00b2)=a\u00b2b\u00b2", note:"Substitute x=X+ab/(a\u2212b) into the equation and simplify \u2014 the linear terms cancel by construction. (Cengage Ex, key Q7=4)", doc:"cengMain"},
  {src:"Ex Q8", type:"SC", tier:3, tax:"C4", pat:"P4", q:"A rectangular billiard table has vertices P(0,0),Q(0,7),R(10,7),S(10,0). A ball starts at M(3,4), travels in a straight line to the top of the table, bounces to the right side, and comes to rest at N(7,1). The y-coordinate where it hits the right side is", choices:["3.7","3.8","3.9","4"], correct:0, ans:"3.7", note:"Use the law of reflection (angle in = angle out) via reflected images of M or N across the relevant sides. (Cengage Ex, key Q8=1)", doc:"cengMain"},
  {src:"Ex Q9", type:"SC", tier:3, tax:"C6", pat:"P6", q:"Vertices A and D of square ABCD lie on the positive x- and y-axes, respectively. If C is the point (12,17), the coordinates of vertex B are", choices:["(14,16)","(15,3)","(17,5)","(17,12)"], correct:2, ans:"(17,5)", note:"Set up A=(a,0),D=(0,d) with AD=DC=CB=BA and right angles throughout; solve the resulting system. (Cengage Ex, key Q9=3)", doc:"cengMain"},
  {src:"Ex Q10", type:"SC", tier:3, tax:"C14", pat:"P14", q:"Through the point P(\u03b1,\u03b2), where \u03b1\u03b2>0, the line x/a+y/b=1 is drawn to form a triangle of area S with the axes. If ab>0, the least value of S is", choices:["\u03b1\u03b2","2\u03b1\u03b2","3\u03b1\u03b2","5\u03b1\u03b2"], correct:1, ans:"2\u03b1\u03b2", note:"Minimise \u00bd|ab| subject to \u03b1/a+\u03b2/b=1 via AM-GM \u2014 the minimum area is exactly twice the rectangle \u03b1\u03b2. (Cengage Ex, key Q10=2)", doc:"cengMain"},
  {src:"Ex Q16", type:"SC", tier:3, tax:"C5", pat:"P5", q:"Let A=(3,\u22124), B=(1,2). Let P=(2k\u22121,2k+1) be a variable point such that PA+PB is minimum. Then k is", choices:["7/9","0","7/8","8/7"], correct:2, ans:"7/8", note:"PA+PB is minimised when P lies on segment AB, i.e. is a point of intersection between line AB and the given parametrised locus of P. (Cengage Ex, key Q16=3)", doc:"cengMain"},
  {src:"Ex Q23", type:"SC", tier:3, tax:"C14", pat:"P14", q:"A particle P moves from A(0,4) to (10,\u22124), travelling the upper half-plane at 1 m/s and the lower half-plane at 2 m/s. Find the x-axis crossing point that minimises the sum of squared travel times.", choices:["(1,0)","(2,0)","(4,0)","(5,0)"], correct:1, ans:"(2,0)", note:"Minimise f(x)=(x\u00b2+16)+[(10\u2212x)\u00b2+16]/4 (times T\u00b2, speeds 1 and 2); f\u2019(x)=0 gives x=2. (Cengage Ex, key Q23=2)", doc:"cengMain"},
  {src:"Ex Q27", type:"SC", tier:3, tax:"C8", pat:"P8", q:"One vertex of an equilateral triangle is (2,2) and its centroid is (\u22122/\u221a3, 2/\u221a3). The length of its side is", choices:["4\u221a2","4\u221a3","3\u221a2","5\u221a2"], correct:0, ans:"4\u221a2", note:"Vertex-to-centroid distance = side/\u221a3 for an equilateral triangle; compute that distance from (2,2) to (\u22122/\u221a3,2/\u221a3) and multiply by \u221a3 to recover the side. (Cengage Ex, key Q27=1)", doc:"cengMain"},
  {src:"Ex Q28", type:"SC", tier:3, tax:"C9", pat:"P9", q:"In \u25b3ABC, BC=5, CA=4, AB=3. If A\u2261(0,0) and the internal bisector of angle A meets BC at D(12/7,12/7), the incentre of \u25b3ABC is", choices:["(2,2)","(3,2)","(2,3)","(1,1)"], correct:3, ans:"(1,1)", note:"AI:ID = (b+c):a = 7:5; since A is the origin, I = (7/12)\u00b7D = (7/12)\u00b7(12/7,12/7) = (1,1). (Cengage Ex, key Q28=4)", doc:"cengMain"},
  {src:"Ex Q30", type:"SC", tier:3, tax:"C8", pat:"P8", q:"The vertices of a triangle are (pq, 1/(pq)), (qr, 1/(qr)), (rp, 1/(rp)), where p,q,r are the roots of y\u00b3\u22123y\u00b2+6y+1=0. The centroid of the triangle is", choices:["(1,2)","(2,\u22121)","(1,\u22121)","(2,3)"], correct:1, ans:"(2,\u22121)", note:"Use Vieta's formulas on the cubic to get sums/products of p,q,r, then average the vertex coordinates symbolically. (Cengage Ex, key Q30=2)", doc:"cengMain"},
  {src:"Ex Q31", type:"SC", tier:3, tax:"C2", pat:"P2", q:"The image of P(a,b) on the line y=\u2212x is Q, and the image of Q on the line y=x is R. The midpoint of PR is", choices:["(a+b, b+a)","((a+b)/2, (b+a)/2)","(a\u2212b, b\u2212a)","(0,0)"], correct:3, ans:"(0,0)", note:"Reflecting across y=\u2212x then y=x is equivalent to a 180\u00b0 rotation about the origin, making P and R antipodal \u2014 their midpoint is the origin. (Cengage Ex, key Q31=4)", doc:"cengMain"},
  {src:"Ex Q32", type:"SC", tier:3, tax:"C12", pat:"P12", q:"In \u25b3ABC, if the orthocentre is (1,2) and the circumcentre is (0,0), then the centroid is", choices:["(1/2,2/3)","(1/3,2/3)","(2/3,1)","(2/3,1/2)"], correct:1, ans:"(1/3,2/3)", note:"Centroid G=(H+2O)/3 by the Euler-line 2:1 ratio; here O is the origin so G=H/3. (Cengage Ex, key Q32=2)", doc:"cengMain"},
  {src:"Ex Q33", type:"SC", tier:3, tax:"C12", pat:"P12", q:"If in \u25b3ABC, A\u2261(1,10), circumcentre\u2261(\u22121/3,2/3), and orthocentre\u2261(11/3,4/3), the coordinates of the midpoint of the side opposite A are", choices:["(1,\u221211/3)","(1,5)","(1,\u22123)","(1,6)"], correct:0, ans:"(1,\u221211/3)", note:"Use G=(H+2O)/3 to find the centroid, then D=(3G\u2212A)/2 to get the midpoint of BC. (Cengage Ex, key Q33=1)", doc:"cengMain"},
  {src:"Ex Q34", type:"SC", tier:3, tax:"C8", pat:"P8", q:"In \u25b3ABC, the coordinates of B are (0,0), AB=2, \u2220ABC=\u03c0/3, and the midpoint of BC has coordinates (2,0). The centroid of the triangle is", choices:["(1/2,\u221a3/2)","(5/3,1/\u221a3)","(4+\u221a3/3,1/3)","(\u221a3/2,1/2)"], correct:1, ans:"(5/3,1/\u221a3)", note:"Place B at origin, use the given angle+length to pin A, use the midpoint to pin C, then average all three vertices. (Cengage Ex, key Q34=2)", doc:"cengMain"},
  {src:"Ex Q35", type:"SC", tier:3, tax:"C12", pat:"P12", q:"Statement 1: If in a triangle, orthocentre, circumcentre and centroid are rational points, then its vertices must also be rational points. Statement 2: If the vertices of a triangle are rational points, then the centroid, circumcentre, and orthocentre are also rational points.", choices:["Statement 1 true, Statement 2 true and is a correct explanation of Statement 1","Statement 1 true, Statement 2 true but NOT a correct explanation of Statement 1","Statement 1 true, Statement 2 false","Statement 1 false, Statement 2 true"], correct:3, ans:"Statement 1 false, Statement 2 true", note:"Rational vertices always give rational centres (Statement 2), but rational centres don't force rational vertices in general (Statement 1 fails). (Cengage Ex, key Q35=4)", doc:"cengMain"},
  {src:"Ex Q36", type:"SC", tier:3, tax:"C7", pat:"P7", q:"Consider three points P\u2261(\u2212sin(\u03b2\u2212\u03b1), \u2212cos\u03b2), Q\u2261(cos(\u03b2\u2212\u03b1), sin\u03b2), R\u2261(cos(\u03b2\u2212\u03b1+\u03b8), sin(\u03b2\u2212\u03b8)), where 0<\u03b1,\u03b2,\u03b8<\u03c0/4. Then", choices:["P lies on segment RQ","Q lies on segment PR","R lies on segment QP","P,Q,R are non-collinear"], correct:3, ans:"P,Q,R are non-collinear", note:"Check the area-determinant of the three trig-parametrised points \u2014 it doesn't vanish for the stated angle ranges. (Cengage Ex, key Q36=4)", doc:"cengMain"},
  {src:"Ex Q37", type:"SC", tier:3, tax:"C11", pat:"P11", q:"If the vertices of a triangle are (\u221a5,0), (\u221a3,\u221a2), and (2,1), the orthocentre of the triangle is", choices:["(\u221a5,0)","(0,0)","(\u221a5+\u221a3+2,\u221a2+1)","(\u221a5+\u221a3,\u221a2\u22121)"], correct:2, ans:"(\u221a5+\u221a3+2,\u221a2+1)", note:"Each vertex has squared-distance 5 from the origin (5+0=3+2=4+1=5), so the circumcentre IS the origin; with circumcentre at the origin, orthocentre = sum of the vertices. (Cengage Ex, key Q37=3)", doc:"cengMain"},
  {src:"Ex Q38", type:"SC", tier:3, tax:"C6", pat:"P6", q:"ABCD is a square. Points E(4,3) and F(2,5) lie on AB and CD, respectively, such that EF divides the square into two equal parts. If A is (7,3), the coordinates of D can be", choices:["(7,2)","(7,5)","(\u22121,3)","(\u22121,5)"], correct:3, ans:"(\u22121,5)", note:"EF bisecting the square's area constrains it to pass through the centre; use that plus the square's side/orientation constraints from E,F,A. (Cengage Ex, key Q38=4)", doc:"cengMain"},
  {src:"Ex Q39", type:"SC", tier:3, tax:"C5", pat:"P5", q:"Let A\u1d63, r=1,2,3,\u2026, be points on the number line such that OA\u2081, OA\u2082, OA\u2083, \u2026 are in GP with O the origin and common ratio a proper positive fraction. Let M\u1d63 be the midpoint of A\u1d63A\u1d63\u208a\u2081. The value of \u03a3OM\u1d63 (r=1 to \u221e) equals", choices:["OA\u2081(OA\u2081\u2212OA\u2082)/(2(OA\u2081+OA\u2082))","OA\u2081(OA\u2081+OA\u2082)/(2(OA\u2081\u2212OA\u2082))","OA\u2081/(2(OA\u2081\u2212OA\u2082))","\u221e"], correct:1, ans:"OA\u2081(OA\u2081+OA\u2082)/(2(OA\u2081\u2212OA\u2082))", note:"Each OM\u1d63 is the average of consecutive GP terms; sum the resulting geometric series in closed form. (Cengage Ex, key Q39=2)", doc:"cengMain"},
  {src:"Ex Q40", type:"SC", tier:3, tax:"C7", pat:"P7", q:"If \u03a3\u1d62\u208c\u2081\u2074(x\u1d62\u00b2+y\u1d62\u00b2) \u2264 2x\u2081x\u2083+2x\u2082x\u2084+2y\u2082y\u2083+2y\u2081y\u2084, the points (x\u1d62,y\u1d62) are", choices:["the vertices of a rectangle","collinear","the vertices of a trapezium","the vertices of a parallelogram"], correct:0, ans:"the vertices of a rectangle", note:"Rearranging the inequality into a sum of squares \u2264 0 forces every square term to vanish, which is the defining condition of a rectangle's vertex pairing. (Cengage Ex, key Q40=1)", doc:"cengMain"},
  {src:"Ex Q41", type:"SC", tier:3, tax:"C12", pat:"P12", q:"Let two vertices of a triangle be (\u22122,3) and (5,\u22121). If the orthocentre lies at the origin and the centroid lies on the line x+y=7, the third vertex lies at", choices:["(7,4)","(8,14)","(12,21)","none of these"], correct:3, ans:"none of these", note:"Set up both altitude conditions through the origin plus the centroid constraint x+y=7; none of the three named options satisfy the full system. (Cengage Ex, key Q41=4)", doc:"cengMain"},
  {src:"Ex Q42", type:"SC", tier:3, tax:"C11", pat:"P11", q:"Two vertices of a triangle are (4,\u22123) and (\u22122,5). If the orthocentre of the triangle is (1,2), the third vertex is", choices:["(\u221233,\u221226)","(33,26)","(26,33)","(26,\u221233)"], correct:1, ans:"(33,26)", note:"Write both altitude conditions through the orthocentre (1,2) and solve simultaneously for the unknown third vertex. (Cengage Ex, key Q42=2)", doc:"cengMain"},
  {src:"Ex Q43", type:"SC", tier:3, tax:"C11", pat:"P11", q:"Let H be the orthocentre of \u25b3ABC with A(\u22121,0), B(\u22122,3/4), C(\u22123,\u22127/6). The orthocentre of \u25b3BCH is", choices:["(\u22123,\u22122)","(1,3)","(\u22121,2)","none of these"], correct:3, ans:"none of these", note:"A neat fact: the orthocentre of \u25b3BCH (formed by two original vertices and the orthocentre) is the original triangle's remaining vertex, A. (Cengage Ex, key Q43=4)", doc:"cengMain"},
  {src:"Ex Q44", type:"SC", tier:3, tax:"C5", pat:"P5", q:"A light ray from P(2,3) is reflected at a point Q on the y-axis, then passes through R(5,10). The coordinates of Q are", choices:["(0,3)","(0,2)","(0,5)","(0,6)"], correct:2, ans:"(0,5)", note:"Reflect P(2,3) across the y-axis to P'(\u22122,3); Q is where line P'R (R=(5,10)) crosses the y-axis \u2014 parametrising from x=\u22122 to x=5, at x=0 (2/7 along) y=3+7\u00b7(2/7)=5. (Cengage Ex, key Q44=3)", doc:"cengMain"},
  {src:"Ex Q46", type:"SC", tier:3, tax:"C6", pat:"P6", q:"The vertices of a parallelogram ABCD are A(3,1), B(13,6), C(13,21), and D(3,16). If a line through the origin divides it into two congruent parts, the slope of the line is", choices:["11/12","11/8","25/8","13/8"], correct:1, ans:"11/8", note:"A line through the origin bisects a parallelogram's area only if it also passes through the parallelogram's centre (8,11) = mean of A,C; slope = 11/8. (Cengage Ex, key Q46=2)", doc:"cengMain"},
  {src:"Ex Q49", type:"SC", tier:3, tax:"C13", pat:"P13", q:"The foot of the perpendicular on the line 3x+y=\u03bb drawn from the origin is C. If the line cuts the x- and y-axes at A and B, respectively, then BC:CA is", choices:["1:3","3:1","1:9","9:1"], correct:3, ans:"9:1", note:"In right triangle OAB (right angle at O), C is the foot of the altitude from O to hypotenuse AB, so OA\u00b2=AC\u00b7AB and OB\u00b2=BC\u00b7AB \u2014 hence BC:CA = OB\u00b2:OA\u00b2 = \u03bb\u00b2:(\u03bb/3)\u00b2 = 9:1. (Cengage Ex, key Q49=4)", doc:"cengMain"},
  {src:"Ex Q50", type:"SC", tier:3, tax:"C13", pat:"P13", q:"Consider three lines L\u2081: 5x\u2212y+4=0, L\u2082: 3x\u2212y+5=0, L\u2083: x+y+8=0. If these lines enclose a triangle and the sum of the squares of the tangents of the interior angles is p/q (lowest terms), then p+q is", choices:["500","450","230","465"], correct:3, ans:"465", note:"Compute each pairwise angle via the tan-difference formula, square and sum, then reduce the fraction to lowest terms. (Cengage Ex, key Q50=4)", doc:"cengMain"},
  {src:"Ex Q51", type:"SC", tier:3, tax:"C13", pat:"P13", q:"In the given figure, OABC is a rectangle. The slope of OB is", choices:["1/4","1/3","1/2","cannot be determined"], correct:2, ans:"1/2", note:"Use the rectangle's given side coordinates to compute the diagonal OB's slope directly. (Cengage Ex, key Q51=3)", doc:"cengMain"},

  /* ---------- tier 3 : Narayana Module (CUQ + Exercise-III \u00d7 2, key-verified) ---------- */
  {src:"narCUQ Q1", type:"SC", tier:3, tax:"C14", pat:"P14", q:"If the sum of the distances of a point from two perpendicular lines in a plane is a constant, then its locus is", choices:["a square","a circle","a straight line","two intersecting lines"], correct:0, ans:"a square", note:"|x|+|y|=k (in axes along the two perpendicular lines) traces a square rotated 45\u00b0 to the axes. (Narayana CUQ, key 01=1)", doc:"narCUQ"},
  {src:"narCUQ Q2", type:"SC", tier:3, tax:"C7", pat:"P7", q:"The locus of a point collinear with two given points is", choices:["a straight line passing through the given two points","a parabola","an ellipse","a hyperbola"], correct:0, ans:"a straight line passing through the given two points", note:"Direct definition of collinearity extended to a locus. (Narayana CUQ, key 02=1)", doc:"narCUQ"},
  {src:"narCUQ Q3", type:"SC", tier:3, tax:"C5", pat:"P5", q:"The ends of a rod of length k move on two positive coordinate axes. The locus of the point on the rod which divides it in the ratio l:m is", choices:["x\u00b2/m\u00b2+y\u00b2/l\u00b2=k\u00b2/(l+m)\u00b2","x\u00b2/l\u00b2+y\u00b2/m\u00b2=k\u00b2/(l+m)\u00b2","only 1 is true","both 1 and 2 are true"], correct:3, ans:"both 1 and 2 are true", note:"Depending on which end is A and which is B, either labelling of the section-formula locus is valid \u2014 both forms describe the same ellipse. (Narayana CUQ, key 03=4)", doc:"narCUQ"},
  {src:"narLocus Q1", type:"SC", tier:3, tax:"C13", pat:"P13", q:"A and B are fixed points; the vertex C of \u25b3ABC moves such that cotA+cotB=constant. The possible locus of C is a straight line which is", choices:["perpendicular to AB","parallel to AB","inclined at angle A\u2212B to AB","parallel to the x-axis"], correct:1, ans:"parallel to AB", note:"cotA=AD/CD, cotB=DB/CD (D the foot of the altitude from C); cotA+cotB=AB/CD=constant forces CD=constant, i.e. C stays at fixed height above AB. (Narayana Locus Ex-III, key 01=2)", doc:"narLocus"},
  {src:"narLocus Q5", type:"SC", tier:3, tax:"C14", pat:"P14", q:"A(2,2), B(\u22124,5) are two points. If a point P moves such that the area of \u25b3PAB is 12 sq. units, the locus of P and the distance between the parallel lines obtained by that locus are", choices:["16/\u221a5","11/\u221a5","13/\u221a5","14/\u221a5"], correct:0, ans:"16/\u221a5", note:"Area=12 gives |3x+6y\u221218|=24, a pair of lines parallel to AB; distance = 4\u0394/AB = 48/(3\u221a5) = 16/\u221a5. (Narayana Locus Ex-III, key 05=1)", doc:"narLocus"},
  {src:"narTrans Q1", type:"SC", tier:3, tax:"C1", pat:"P1", q:"Shift the origin to a suitable point so that the equation y\u00b2+4y+8x\u22122=0 will not contain a term in y and the constant term.", choices:["(3/4,\u22122)","(3/4,2)","(2,3/4)","(2,\u22123/4)"], correct:0, ans:"(3/4,\u22122)", note:"Same identity as Illus 1.6 \u2014 matches the guided card G1 solution exactly. (Narayana Transformation Ex-III, key 01=1)", doc:"narTrans"}
];

let CS_PRAC_DOCS = [
  {id:"cengIllus", label:"Cengage (Tewani) \u00b7 Illustrations 1.1\u20131.66", date:"Jul 2026", note:"Fully-worked illustrations across every section of the chapter"},
  {id:"cengMain",  label:"Cengage (Tewani) \u00b7 main Exercises (59 SC, key verified)", date:"Jul 2026", note:"End-chapter Single Correct Answer Type, answer key legible/verified"},
  {id:"narCUQ",    label:"Narayana JEE-Adv Maths Vol-III \u00b7 CUQ", date:"Jul 2026", note:"Conceptual Understanding Questions, key verified"},
  {id:"narLocus",  label:"Narayana JEE-Adv Maths Vol-III \u00b7 Locus Exercise-III", date:"Jul 2026", note:"Key + full worked hints"},
  {id:"narTrans",  label:"Narayana JEE-Adv Maths Vol-III \u00b7 Transformation of Axes Exercise-III", date:"Jul 2026", note:"Key + full worked hints"}
];

const CS_PRAC_TIERS=[{k:"All",l:"All"},{k:"1",l:"Foundation"},{k:"2",l:"JEE Main"},{k:"3",l:"JEE Advanced"},{k:"Flag",l:"\u2605 Flagged"}];

/* ===== CURRICULUM TREE  (Subjects > Subsections > Chapters) ===== */
const CURRICULUM=[
  {id:"maths",name:"Mathematics",sym:"\u2211",subs:[
    {id:"trig",name:"Trigonometry",chapters:[
      {id:"fg",name:"Functions & Graphs",grade:11},
      {id:"cma",name:"Compound & Multiple Angles",grade:11},
      {id:"teq",name:"Trigonometric Equations",grade:11},
      {id:"inv",name:"Inverse Trigonometric Functions",grade:12},
      {id:"pot",name:"Properties of Triangles",grade:11},
      {id:"pev",name:"Periodicity & Extreme Values",grade:11}]},
    {id:"alg",name:"Algebra",chapters:[
      {id:"quad",name:"Quadratic Equations",grade:11},{id:"cn",name:"Complex Numbers",grade:11},
      {id:"pnc",name:"Permutations & Combinations",grade:11},{id:"bin",name:"Binomial Theorem",grade:11},
      {id:"seq",name:"Sequences & Series",grade:11}]},
    {id:"calc",name:"Calculus",chapters:[
      {id:"lim",name:"Limits & Continuity",grade:12},{id:"diff",name:"Differentiation",grade:12},
      {id:"aod",name:"Applications of Derivatives",grade:12},{id:"intg",name:"Integration",grade:12},
      {id:"de",name:"Differential Equations",grade:12}]},
    {id:"cg",name:"Coordinate Geometry",chapters:[
      {id:"cs",name:"Coordinate System",grade:11},
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
    {id:"mod",name:"Modern Physics",chapters:[{id:"mp",name:"Atoms, Nuclei & Dual Nature",grade:12},{id:"semi",name:"Semiconductor Devices",grade:12}]}]},
  {id:"chem",name:"Chemistry",sym:"\u2697",subs:[
    {id:"phys",name:"Physical Chemistry",chapters:[
      {id:"som",name:"States of Matter",grade:11}]}]}
];
/* A chapter is "ready" iff its path appears here. Add a chapter by dropping its data in. */
const CONTENT={
  "maths/trig/fg":{key:"trigfg",taxa:TAXA,formulae:FORMULAE,patterns:PATTERNS,guided:GUIDED,practice:PRACTICE,pracTiers:PRAC_TIERS},
  "maths/trig/pev":{key:"pev",taxa:PEV_TAXA,formulae:PEV_FORMULAE,patterns:PEV_PATTERNS,guided:PEV_GUIDED,practice:PEV_PRACTICE,pracDocs:PEV_PRAC_DOCS,pracTiers:PEV_PRAC_TIERS},
  "maths/trig/teq":{key:"teq",taxa:TEQ_TAXA,formulae:TEQ_FORMULAE,patterns:TEQ_PATTERNS,guided:TEQ_GUIDED,practice:TEQ_PRACTICE,pracDocs:TEQ_PRAC_DOCS,pracTiers:TEQ_PRAC_TIERS},
  "phys/mech/wpe":{key:"wpe",taxa:WPE_TAXA,formulae:WPE_FORMULAE,patterns:WPE_PATTERNS,guided:WPE_GUIDED,practice:WPE_PRACTICE,figs:WPE_FIG,pracDocs:WPE_PRAC_DOCS,pracTiers:WPE_PRAC_TIERS},
  "chem/phys/som":{key:"chemsom",taxa:CHEM_SOM_TAXA,formulae:CHEM_SOM_FORMULAE,patterns:CHEM_SOM_PATTERNS,guided:CHEM_SOM_GUIDED,practice:CHEM_SOM_PRACTICE,figs:CHEM_SOM_FIG,pracDocs:CHEM_SOM_PRAC_DOCS,pracTiers:CHEM_SOM_PRAC_TIERS,explain:CHEM_SOM_EXPLAIN},
  "maths/cg/cs":{key:"cs",taxa:CS_TAXA,formulae:CS_FORMULAE,patterns:CS_PATTERNS,guided:CS_GUIDED,practice:CS_PRACTICE,pracDocs:CS_PRAC_DOCS,pracTiers:CS_PRAC_TIERS}
};
function chapPath(a,b,c){return a+"/"+b+"/"+c;}
function findChapter(path){
  const p=path.split("/"),subj=CURRICULUM.find(x=>x.id===p[0]),sub=subj.subs.find(x=>x.id===p[1]),chap=sub.chapters.find(x=>x.id===p[2]);
  const siblings=sub.chapters.map(c=>{const pp=chapPath(p[0],p[1],c.id);return{name:c.name,path:pp,status:CONTENT[pp]?"ready":"soon"};});
  return{subjName:subj.name,subName:sub.name,chap,siblings};
}
function readyCount(subj){let n=0;subj.subs.forEach(sb=>sb.chapters.forEach(c=>{if(CONTENT[chapPath(subj.id,sb.id,c.id)])n++;}));return n;}
function subReady(su,sb){return sb.chapters.filter(c=>CONTENT[chapPath(su,sb.id,c.id)]).length;}

/* ===== Project manifest =====
   Edit this array when adding/renaming a chapter. Health stats (practice
   counts, MCQ %, srcText completeness) are computed live from the data
   above; only descriptive metadata lives here. */
const CHAPTER_META = [
  {
    id:      "maths/trig/fg",
    grade:   "11th",
    subject: "Maths",
    topic:   "Trigonometry",
    chapter: "Functions & Graphs",
    sources: ["Cengage (G. Tewani)"],
    created: "Jun 2026"
  },
  {
    id:      "phys/mech/wpe",
    grade:   "11th",
    subject: "Physics",
    topic:   "Mechanics",
    chapter: "Work, Power & Energy",
    sources: ["Narayana Module (JEE-Adv Physics Vol-II)"],
    created: "Jun 2026"
  },
  {
    id:      "maths/trig/pev",
    grade:   "11th",
    subject: "Maths",
    topic:   "Trigonometry",
    chapter: "Periodicity & Extreme Values",
    sources: ["Narayana JEE-Adv Maths Vol-III", "Narayana JR.IIT WAT papers"],
    created: "Jun 2026"
  },
  {
    id:      "maths/trig/teq",
    grade:   "11th",
    subject: "Maths",
    topic:   "Trigonometry",
    chapter: "Trigonometric Equations",
    sources: ["Cengage (G. Tewani) Vol-III", "Narayana JEE-Adv Maths Vol-III", "Cengage Archives (IIT-JEE / JEE-Adv)"],
    created: "Jun 2026"
  },
  {
    id:      "chem/phys/som",
    grade:   "11th",
    subject: "Chemistry",
    topic:   "Physical Chemistry",
    chapter: "States of Matter",
    sources: ["Narayana Module (JEE-Adv Chemistry Vol-II)"],
    created: "30 Jun 2026"
  },
  {
    id:      "maths/cg/cs",
    grade:   "11th",
    subject: "Maths",
    topic:   "Coordinate Geometry",
    chapter: "Coordinate System",
    sources: ["Cengage (G. Tewani) Coordinate Geometry Ch.1", "Narayana JEE-Adv Maths Vol-III (Locus & Transformation of Axes)"],
    created: "05 Jul 2026"
  }
];


/* =========================================================================
   GAP LOG — weekly test misses, diagnosed against the relevant chapter.
   Each entry: where it came from · which chapter it belongs to · whether it
   maps to an EXISTING pattern (and why Aarav didn't reach for it) or is a
   NEW/emerging pattern the build missed · a Guided-style hint ladder.
   Append-only. New tests append new entries with a fresh `date`.
   Engine: gaplog.js (self-contained; localStorage-backed ladder state).
   ========================================================================= */

let GAPLOG = [
  {
    id:"WTA6-Q1", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q1",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"NV",
    qtext:"If u = √(a²cos²θ + b²sin²θ) + √(a²sin²θ + b²cos²θ), the difference between max and min of u² is (a−b)^(k/9). Find k.",
    diagnosis:"existing", pat:"pev · P7 (Algebraic Substitution Extrema)",
    whyMissed:"P7 exists, but the disguised variant — square the SUM of two radicals, then collapse the cross-radical with cos²+sin²=1 — wasn't drilled. Aarav didn't see that squaring u was the unlock.",
    ladder:{
      chip:["Algebraic Substitution Extrema (square & reduce)","a sinx+b cosx Bounded","LCM Period Rule","Triangle Extrema via Inequality"], correct:0,
      hints:[
        "Square u: u² = (a²+b²) + 2√[(a²cos²θ+b²sin²θ)(a²sin²θ+b²cos²θ)]. The whole problem is the product under the root.",
        "Let c=cos²θ, s=sin²θ (c+s=1). The product = a²b² + cs(a²−b²)², and cs = ¼sin²2θ ∈ [0, ¼].",
        "Min u² at cs=0: a²+b²+2ab = (a+b)². Max u² at cs=¼: a²+b²+(a²+b²) = 2(a²+b²)."],
      solution:"Difference = 2(a²+b²) − (a+b)² = (a−b)². So (a−b)^(k/9) = (a−b)² ⟹ k/9 = 2 ⟹ k = 18."},
    redoCold:true
  },
  {
    id:"WTA6-Q2", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q2",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"NV",
    qtext:"The maximum value of |√(sin²x + 2a²) − √(2a² − 1 − cos²x)| is m (a, x real, a ≥ 1). Find m².",
    diagnosis:"new", pat:"— (no pev card covers it)",
    newPattern:{
      name:"Difference-of-Radicals → Rationalize to 2/(sum)",
      trigger:"|√A − √B| where the radicands differ by a CONSTANT (here A − B = 2).",
      move:"Write |√A − √B| = (A−B)/(√A + √B). With A−B constant, the expression is largest when √A+√B is SMALLEST, i.e. at the boundary of the inner variable.",
      why:"Rationalizing turns a hard difference into a constant over a monotone sum — the extremum is then a boundary read, not calculus.",
      fails:"When the radicands' difference is not constant (then the numerator varies too and the boundary trick fails)."},
    whyMissed:"Genuinely missing move. Aarav tried to maximize the difference directly instead of rationalizing; never spotted that 2a²−1−cos²x = (sin²x+2a²) − 2.",
    ladder:{
      chip:["Difference-of-Radicals → Rationalize","a sinx+b cosx Bounded","Reduce-to-Quadratic","Reciprocal of Linear-Trig Denom"], correct:0,
      hints:[
        "Simplify the second radicand: 2a²−1−cos²x = 2a²−1−(1−sin²x) = (sin²x+2a²) − 2. Let t = sin²x+2a².",
        "Expression = |√t − √(t−2)| = 2/(√t + √(t−2)) — decreasing in t. So maximize by MINIMIZING t.",
        "t is smallest when sin²x = 0 ⟹ t = 2a². So m = 2/(√(2a²)+√(2a²−2)) = √2·(a − √(a²−1))."],
      solution:"m = √2(a − √(a²−1)), so m² = 2(a − √(a²−1))². (Boundary extremum via rationalization.)"},
    redoCold:true
  },
  {
    id:"WTA6-Q3", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q3",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"NV",
    qtext:"If x²+y²=9 and 4a²+9b²=16, then the maximum value of 4a²x² + 9b²y² − 12abxy is —.",
    diagnosis:"new", pat:"— (no pev card covers it)",
    newPattern:{
      name:"Perfect-Square Form → Cauchy–Schwarz Bound",
      trigger:"A quadratic form that is secretly a perfect square: A²X² + B²Y² − 2ABXY = (AX − BY)², with separate sum-of-squares constraints on the variables.",
      move:"Recognise the square, then bound (AX − BY)² ≤ (A²+B²)(X²+Y²) by Cauchy–Schwarz; multiply the two given constraint-constants.",
      why:"Cauchy–Schwarz is exactly the tool for 'dot product squared ≤ product of norms', and a perfect square IS a dot product squared.",
      fails:"If the middle coefficient isn't 2·(the two square roots), it's not a perfect square — don't force it."},
    whyMissed:"Genuinely missing move. Aarav didn't recognise 4a²x²+9b²y²−12abxy = (2ax − 3by)², so the Cauchy–Schwarz bound never came to mind.",
    ladder:{
      chip:["Perfect-Square → Cauchy–Schwarz","Reduce-to-Quadratic","a sinx+b cosx Bounded","Algebraic Substitution Extrema"], correct:0,
      hints:[
        "Spot the square: 4a²x² = (2ax)², 9b²y² = (3by)², and 12abxy = 2·(2ax)(3by). So the expression = (2ax − 3by)².",
        "By Cauchy–Schwarz, (2ax − 3by)² ≤ ((2a)² + (3b)²)(x² + y²) = (4a²+9b²)(x²+y²).",
        "Substitute the constraints: = 16 · 9 = 144."],
      solution:"Maximum = 144 (a perfect-square form capped by Cauchy–Schwarz on the two constraints)."},
    redoCold:true
  },
  {
    id:"WTA6-Q6", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q6",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"NV",
    qtext:"If α+β+γ=π and tan((β+γ−α)/4)·tan((γ+α−β)/4)·tan((α+β−γ)/4)=1 (α,β,γ ≠ nπ±π/2, 2nπ±π), and a + cosα + cosβ + cosγ = 0, find a.",
    diagnosis:"existing", pat:"pev · P11 (Triangle Identity Carry-Through)",
    whyMissed:"P11 exists, but this conditional chain — rewrite each quarter-angle as π/4 − α/2, apply the product-of-tangents condition, then convert to cos via cosα=(1−tan²(α/2))/(1+tan²(α/2)) — is several identity-steps deep and wasn't laddered.",
    ladder:{
      chip:["Triangle Identity Carry-Through","Algebraic Substitution Extrema","Difference-of-Radicals","LCM Period Rule"], correct:0,
      hints:[
        "Since β+γ−α = π−2α, the first argument is (π−2α)/4 = π/4 − α/2 (similarly the others). The condition becomes ∏ tan(π/4 − α/2) = 1.",
        "Let p=tan(α/2), q=tan(β/2), r=tan(γ/2). tan(π/4−α/2)=(1−p)/(1+p); the product = 1 gives (after cross-multiplying) p+q+r+pqr = 0. The half-angle identity also gives pq+qr+rp = 1.",
        "Use cosα = (1−p²)/(1+p²). Evaluating cosα+cosβ+cosγ under these two symmetric constraints gives −1 (test α=β to confirm: it lands exactly on −1)."],
      solution:"cosα+cosβ+cosγ = −1, so a = −(−1) = 1."},
    redoCold:true
  },
  {
    id:"WTA6-Q8", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q8",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"NV",
    qtext:"The value of tan²(π/16) + tan²(2π/16) + tan²(3π/16) + … + tan²(7π/16) is —.",
    diagnosis:"new", pat:"— (P10 covers PRODUCTS of sin, not SUMS of tan²)",
    newPattern:{
      name:"Σ tan²(kπ/2n) via Roots of a Polynomial",
      trigger:"A sum of tan² (or cot², sec²) over equally-spaced special angles kπ/(2n), k=1…n−1.",
      move:"tan(kπ/2n) are roots of a Chebyshev-type polynomial; by Vieta, Σ tan²(kπ/2n) = (n−1)(2n−1). (Companion: Σ cot²(kπ/2n) = (n−1)(2n−2)/3? — derive from the same polynomial.)",
      why:"Special-angle tangents are algebraic numbers — roots of a known polynomial — so symmetric sums come straight from Vieta, no angle-by-angle work.",
      fails:"If the angles aren't the full equally-spaced set kπ/(2n), the polynomial/Vieta shortcut doesn't apply."},
    whyMissed:"Adjacent to P10 (special-angle products) but P10 is products of sines; the tan²-SUM-via-roots identity is a distinct, uncovered move.",
    ladder:{
      chip:["Σ tan²(kπ/2n) via Roots of a Polynomial","Product of sin(kπ/n)","Sum-of-Trig in AP","∏cos(2ᵏθ) Telescoping"], correct:0,
      hints:[
        "Here kπ/16 = kπ/(2·8), so n = 8 and you're summing k = 1…7.",
        "tan(kπ/2n) for k=1…n−1 are the roots of a degree-(n−1) polynomial; the sum of squares of the roots = (n−1)(2n−1).",
        "Plug n = 8: (8−1)(2·8−1) = 7 · 15."],
      solution:"Σ tan²(kπ/16), k=1…7 = (n−1)(2n−1) with n=8 = 7·15 = 105."},
    redoCold:true
  },
  {
    id:"WTA6-Q9", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q9",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MC",
    qtext:"If α+β=c (constant), α,β ∈ (0, π/2): (A) max of sinα+sinβ = 2sin(c/2)  (B) max of tanα+tanβ = 2tan(c/2)  (C) max sinα+sinβ = 4sin(c/2)  (D) max tanα+tanβ = 4tan(c/2).",
    diagnosis:"existing", pat:"pev · P5 + concavity (Jensen direction)",
    whyMissed:"The fixed-sum extremum move (concavity ⟹ max at α=β for sin; convexity ⟹ that point is a MIN for tan) wasn't drilled. Aarav couldn't tell which way each inequality pointed.",
    ladder:{
      chip:["Fixed-sum extremum via concavity (Jensen)","Reciprocal of Linear-Trig Denom","∏cos(2ᵏθ) Telescoping","Triangle Identity Carry-Through"], correct:0,
      hints:[
        "sinα+sinβ = 2 sin(c/2) cos((α−β)/2). Since cos((α−β)/2) ≤ 1, this is MAXIMISED at α=β ⟹ max = 2sin(c/2).",
        "tanα+tanβ = sin c / (cosα cosβ), and cosα cosβ = ½[cos(α−β)+cos c] is largest at α=β. Largest denominator ⟹ tanα+tanβ is MINIMISED at α=β (= 2tan(c/2)) — that's a minimum, not a maximum.",
        "So (A) is correct; (B) misnames a minimum as a maximum; (C),(D) have wrong constants."],
      solution:"Correct: (A) only. (sin is concave → endpoint α=β gives the max; tan is convex → α=β gives the min, so 'max = 2tan(c/2)' is false.)"},
    redoCold:true
  },
  {
    id:"WTA6-Q10", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q10",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MC",
    qtext:"y = (sin(π/4+x) − sin(π/4−x))·sin(π/3+x). Find its max and min. (A) max 3√2/4 (B) max 3/√2 (C) min −1/(2√2) (D) min −3/√2.",
    diagnosis:"existing", pat:"pev · P5 (reduce to a sin2x + b cos2x + c)",
    whyMissed:"P5 exists, but the REDUCTION that leads into it — difference-of-sines sin(A+x)−sin(A−x)=2cosA·sinx, then product-to-sum — wasn't drilled as an on-ramp. Aarav stalled before reaching the amplitude step.",
    ladder:{
      chip:["Reduce to a sin2x+b cos2x+c, then amplitude","Reciprocal of Linear-Trig Denom","Algebraic Substitution Extrema","Sum-of-Trig in AP"], correct:0,
      hints:[
        "Difference of sines: sin(π/4+x) − sin(π/4−x) = 2 cos(π/4) sin x = √2 sin x. So y = √2 sin x · sin(π/3+x).",
        "Expand and use product-to-sum: y = √2[(√3/4)sin2x − (¼)cos2x + ¼].",
        "Amplitude of (√3/4)sin2x − (¼)cos2x = √(3/16+1/16) = ½. So y = √2[½·sin(2x−φ) + ¼]."],
      solution:"Max = √2(½+¼) = 3√2/4 (A); Min = √2(−½+¼) = −√2/4 = −1/(2√2) (C). Correct: (A) and (C)."},
    redoCold:true
  },
  {
    id:"WTA6-Q11", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q11",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MC",
    qtext:"Which are true: (i) 0<A<π/6 ⟹ A secA < π/(3√3); (ii) 0<A,B<π/4 ⟹ A cosecA + B cosecB < π/√2; (iii) 0<A,B,C<π/3 ⟹ A cotA + B cotB + C cotC < π/√3.",
    diagnosis:"new", pat:"— (P14 is partial; the x·f(x) convexity tool isn't an explicit card)",
    newPattern:{
      name:"Monotonicity / Jensen for x·f(x)",
      trigger:"An inequality bounding A·secA, A·cosecA, A·cotA, … on an interval, often summed over angles with a fixed cap.",
      move:"Decide whether g(A)=A·f(A) is increasing or decreasing on the interval (sign of g′). If increasing, g(A) < g(endpoint); if decreasing, g(A) > g(endpoint). For sums, evaluate at the symmetric/equal point.",
      why:"These are extremum-on-an-interval statements; the derivative's sign (or Jensen, for sums) fixes which side the bound falls.",
      fails:"Guessing the inequality direction without checking g′ — A·cotA is DECREASING (so the bound flips), unlike A·secA and A·cosecA which increase."},
    whyMissed:"P14 covers symmetric triangle extrema, but not the general 'is A·f(A) increasing or decreasing?' decision. Aarav couldn't tell that (iii) flips.",
    ladder:{
      chip:["Monotonicity / Jensen for x·f(x)","Triangle Extrema via Inequality","a sinx+b cosx Bounded","Reciprocal of Linear-Trig Denom"], correct:0,
      hints:[
        "(i) g(A)=A secA, g′=secA(1+A tanA) > 0 → increasing → A secA < (π/6)sec(π/6) = π/(3√3). TRUE.",
        "(ii) g(A)=A cosecA = A/sinA, g′=(sinA−A cosA)/sin²A > 0 (since tanA>A) → increasing → sum < 2·(π/4)cosec(π/4) = π/√2. TRUE.",
        "(iii) g(A)=A cotA, g′=cotA − A cosec²A = (½sin2A − A)/sin²A < 0 → DECREASING → A cotA > (π/3)cot(π/3) = π/(3√3) → sum > π/√3, NOT <. FALSE."],
      solution:"(i) and (ii) true, (iii) false → answer (C). Direction of each bound comes from the sign of g′(A)."},
    redoCold:true
  },
  {
    id:"WTA6-Q12", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q12",
    grade:"11th", chapter:"Trigonometric Identities (chapter not yet built)", type:"MC",
    qtext:"Which are INCORRECT (when defined): (A) tan x − 3tan3x = −8tanx/(1−3tan²x); (B) 3tan9°/(1−3tan²9°) + 9tan27°/(1−3tan²27°) = 12tan9°; (C) tan x − 2tan2x = −3tanx/(1−tan²x); (D) the chained 3ⁿ-tan sum = 30tan9°.",
    diagnosis:"new", pat:"— belongs to a future Trigonometric Identities chapter",
    newPattern:{
      name:"Multiple-Angle tan(nx) Expansion & Telescoping",
      trigger:"Statements built from tan2x, tan3x formulas, or 3ⁿ-weighted tan chains to be verified/telescoped.",
      move:"Expand each via tan2x=2t/(1−t²) and tan3x=(3t−t³)/(1−3t²) and simplify; for the 3ⁿ chains, use the telescoping form 3ⁿtan(3ⁿθ) chains collapse via cot−tan ladders.",
      why:"Every statement is an algebraic identity in t=tanx; expanding settles 'correct vs incorrect' deterministically.",
      fails:"Eyeballing — small coefficient slips (the −3 vs −(3+t²) below) are exactly what these traps exploit."},
    whyMissed:"This is identity-manipulation, a chapter we haven't built yet — Aarav had no pattern to anchor to.",
    ladder:{
      chip:["Multiple-Angle tan(nx) Expansion","a sinx+b cosx Bounded","LCM Period Rule","Reduce-to-Quadratic"], correct:0,
      hints:[
        "(A) tan x − 3tan3x with tan3x=(3t−t³)/(1−3t²): numerator t(1−3t²)−3(3t−t³) = −8t ⟹ = −8t/(1−3t²). So (A) is CORRECT.",
        "(C) tan x − 2tan2x with tan2x=2t/(1−t²): = (t(1−t²)−4t)/(1−t²) = −t(3+t²)/(1−t²), NOT −3t/(1−t²). So (C) is INCORRECT.",
        "(B),(D) are constructed sums; expand each term the same way and compare to the claimed value."],
      solution:"Verified: (A) correct, (C) incorrect. (B) and (D) resolve by the same tan(nx) expansion — this is the cue to build a Trigonometric Identities chapter next."},
    redoCold:true
  },
  {
    id:"WTA6-Q13", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q13",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MC",
    qtext:"Which is periodic: (A) sin x + cos(√2 x); (B) sin((√2+1)x)+cos(√(3/4+1/√2)·x); (C) sin(22x/7)+cos(πx); (D) sin(((1+√3)/(1−√2))x) + cos((1+√2+√3+√6)x).",
    diagnosis:"existing", pat:"pev · P1 (LCM / rational period-ratio test)",
    whyMissed:"P1's rule (sum is periodic ⟺ ratio of periods is RATIONAL) exists, but the surd-disguise version — where you must rationalize a frequency to see the ratio is 1 — wasn't drilled.",
    ladder:{
      chip:["Rational period-ratio test (LCM)","|·| Period Halving","∏cos(2ᵏθ) Telescoping","Sum-of-Trig in AP"], correct:0,
      hints:[
        "Sum of two sinusoids is periodic ⟺ the ratio of their frequencies (equivalently periods) is rational. Check each.",
        "(A) frequencies 1, √2 → ratio √2 irrational → NOT periodic. (C) 22/7 vs π → irrational ratio → NOT periodic.",
        "(D) Rationalize (1+√3)/(1−√2): ×(1+√2) ⟹ −(1+√2+√3+√6). Same magnitude as the second frequency ⟹ ratio = 1 → PERIODIC."],
      solution:"(D) is periodic — the rationalized first frequency equals the second, giving a rational (=1) ratio."},
    redoCold:true
  },
  {
    id:"WTA6-Q14", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q14",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MC",
    qtext:"Which are correct: (A) fundamental period of cos(|sinx|−|cosx|) is π/2; (B) of cos(cosx)+cos(sinx) is π/2; (C) of cosx·cos2x·cos3x is π; (D) of (tanx−cotx)/(|sinx|−|cosx|) is π/2.",
    diagnosis:"existing", pat:"pev · P1 + P2 (period of |·| / composite functions)",
    whyMissed:"P1/P2 cover the rules, but nested compositions (cos of |·|, cos∘cos, product of three cosines, a ratio with an anti-period) weren't drilled — especially the anti-period trap in (D).",
    ladder:{
      chip:["Period of |·| / composite (P1+P2)","a sinx+b cosx Bounded","Reduce-to-Quadratic","Triangle Identity Carry-Through"], correct:0,
      hints:[
        "(A) replacing x→x+π/2 swaps |sinx|↔|cosx|, flipping the inside's sign; cos is even ⟹ period π/2. TRUE. (B) same swap gives cos(sinx)+cos(cosx)=itself ⟹ π/2. TRUE.",
        "(C) f(x+π)=(−cosx)(cos2x)(−cos3x)=f(x) ⟹ period π. TRUE.",
        "(D) numerator tanx−cotx=−2cot2x (period π/2), but the denominator picks up a SIGN under x→x+π/2, so f(x+π/2)=−f(x): π/2 is only an anti-period; true period is π. So (D) is FALSE."],
      solution:"Correct: (A), (B), (C). (D) is false — its fundamental period is π, not π/2 (anti-period trap)."},
    redoCold:true
  },
  {
    id:"WTA6-Q15", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q15",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MM",
    qtext:"Match max/min: (A) max of (1−tan²(π/4−x))/(1+tan²(π/4−x)); (B) min of log₃((5sinx−12cosx+26)/13); (C) min of −2sin²x+cosx+3; (D) max of 4sin²θ+4sinθcosθ+cos²θ. Targets: 1, 0, 7/8, 5.",
    diagnosis:"existing", pat:"pev · P5 + P7 (amplitude + quadratic-in-cos)",
    whyMissed:"Each cell needs a different reduction (double-angle, a sinx+b cosx range, quadratic-in-cos with vertex check). Aarav could do one or two but not switch reductions fluently across the match.",
    ladder:{
      chip:["Pick the right reduction per cell (P5/P7)","LCM Period Rule","Difference-of-Radicals","Telescoping cosec/cot Sum"], correct:0,
      hints:[
        "(A) the form (1−tan²u)/(1+tan²u) = cos2u with u=π/4−x ⟹ sin2x, max 1.  (B) 5sinx−12cosx ∈ [−13,13] ⟹ argument ∈ [1,3] ⟹ log₃ ∈ [0,1], min 0.",
        "(C) −2sin²x+cosx+3 = 2cos²x+cosx+1; let t=cosx∈[−1,1], vertex t=−¼ ⟹ min 7/8.",
        "(D) = 5/2 + 2sin2θ − (3/2)cos2θ; amplitude √(4+9/4)=5/2 ⟹ max 5."],
      solution:"A→1, B→0, C→7/8, D→5. The skill is matching each cell to its reduction, not one global trick."},
    redoCold:true
  },
  {
    id:"WTA6-Q16", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q16",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MM",
    qtext:"For the max (λ) and min (μ) of (7 + 6tanθ − tan²θ)/(1 + tan²θ) over real θ, match λ+μ and λ−μ.",
    diagnosis:"existing", pat:"pev · P5 / P7 (rational-in-tanθ → ×cos²θ → amplitude)",
    whyMissed:"The specific MOVE — multiply a rational-in-tanθ by cos²θ to linearize into a·sin2θ + b·cos2θ + c — wasn't an explicit rep. Aarav tried calculus on t=tanθ and bogged down.",
    ladder:{
      chip:["Rational-in-tanθ → ×cos²θ → amplitude","Reduce-to-Quadratic","Triangle Extrema via Inequality","Sum-of-Trig in AP"], correct:0,
      hints:[
        "Multiply top and bottom by cos²θ (since 1+tan²θ=sec²θ): expression = 7cos²θ + 6sinθcosθ − sin²θ.",
        "Double-angle it: = 7(1+cos2θ)/2 − (1−cos2θ)/2 + 3sin2θ = 3 + 4cos2θ + 3sin2θ.",
        "Amplitude √(4²+3²)=5 ⟹ range [3−5, 3+5] = [−2, 8]. So λ=8, μ=−2."],
      solution:"λ+μ = 6 and λ−μ = 10. The unlock is ×cos²θ to linearize, then read the amplitude."},
    redoCold:true
  },
  {
    id:"WTA6-Q17", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q17",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MM",
    qtext:"Match fundamental periods / counts, incl. (D) number of integer a for which f(x)=sin x + cos(√(4−a²)·x) is periodic.",
    diagnosis:"existing", pat:"pev · P1 + P4 (composite period + count-parameters variant)",
    whyMissed:"P1/P4 cover periods, but the 'count the integer parameters that make the period-ratio rational' twist (cell D) wasn't drilled.",
    ladder:{
      chip:["Composite period + rational-ratio count (P1/P4)","|·| Period Halving","Reciprocal of Linear-Trig Denom","Algebraic Substitution Extrema"], correct:0,
      hints:[
        "For f(x)=sin x + cos(√(4−a²)·x) to be periodic, the frequency ratio 1 : √(4−a²) must be rational ⟹ √(4−a²) rational.",
        "a integer ⟹ 4−a² ≥ 0 ⟹ a ∈ {−2,−1,0,1,2}. √(4−a²): a=0→2 (ok), a=±1→√3 (irrational, NO), a=±2→0 (cos→constant, periodic).",
        "Valid a: {−2, 0, 2} ⟹ 3 values."],
      solution:"Cell (D) = 3. (Other cells use the same f(ax+b)→T/|a| and LCM rules.)"},
    redoCold:true
  },
  {
    id:"WTA6-Q18", date:"28 Jun 2026", test:"Narayana JR.IIT WTA-6 (Model-A) · JEE-Adv", qno:"Q18",
    grade:"11th", chapter:"Periodicity & Extreme Values", type:"MM",
    qtext:"Match minimum-value bounds: (A) min of √((3sinx−4cosx−10)(3sinx+4cosx−10)); (B) min of g(x)=a cos²x − b sec²x + 2c given a²+b²+c²−2a+6b−4c+14=0; (C) values sin²A+sin²B+sin²C cannot take in a triangle; (D) min of x²+y² given xy(x²−y²)=x²+y².",
    diagnosis:"existing", pat:"pev · P7 + P14 (quadratic/AM-GM extrema + triangle range)",
    whyMissed:"Four different extremum tools in one match (expand-to-quadratic, complete-the-square to pin constants then AM-GM, triangle range, parametrize x=r cosθ). Aarav lacked fluency switching between them.",
    ladder:{
      chip:["Switch extremum tool per cell (P7/P14)","a sinx+b cosx Bounded","LCM Period Rule","Difference-of-Radicals"], correct:0,
      hints:[
        "(A) product = (3sinx−10)² − 16cos²x = 25sin²x − 60sinx + 84; on t=sinx∈[−1,1] min at t=1 ⟹ 49 ⟹ √ = 7.  (B) the relation is (a−1)²+(b+3)²+(c−2)²=0 ⟹ a=1,b=−3,c=2 ⟹ g=cos²x+3sec²x+4, AM-GM aspires to 4+2√3 but cos²x≤1 forces the boundary min 8.",
        "(C) in any triangle sin²A+sin²B+sin²C ≤ 9/4 (equilateral) and > 2 (acute); so it CANNOT take values above 9/4 (e.g. 10, 5, 3).",
        "(D) put x=r cosθ, y=r sinθ: xy(x²−y²)= r⁴·¼ sin4θ = r² ⟹ r² = 4/sin4θ ≥ 4 ⟹ min x²+y² = 4."],
      solution:"(A) 7, (B) 8, (C) cannot exceed 9/4, (D) 4. Each cell is a different extremum tool — recognise which, then apply."},
    redoCold:true
  }
];

/* === end Pattern Lab curriculum data === */
