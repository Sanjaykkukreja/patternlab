# PATTERN LAB — Master Handoff
*Last updated: 27 Jun 2026 · Sanjay Kukreja (for Aarav, IIT JEE 2026)*

This document is the single source of truth for resuming Pattern Lab work in a
fresh chat. **Paste the "Quick brief" section into the new chat first**, then
upload the current zip of files. Detailed conventions, deferred items, and
known gaps are in later sections.

---

## 0 · Quick brief (paste into new chat)

> I'm continuing my "Pattern Lab" JEE study app for my son Aarav. It's a 7-file
> static site (GitHub Pages + Supabase). I'm uploading the current files — build
> on THESE (they are the live versions, do not rebuild from scratch).
>
> Conventions I've already established with you (memory may already carry these):
> 1. Append-only edits to curriculum.js — never rewrite existing records or
>    rename question IDs.
> 2. Every chapter's Practice section must have ≥ 20 tier-3 (JEE Advanced) MCQ
>    records, with options verified against printed source pages. Fabricating
>    choices is a hard violation — flag and stop instead.
> 3. Pull from illustrations, in-chapter solved examples, AND end-of-chapter
>    exercises when sourcing questions — not exercises only.
> 4. Each chapter follows a 6-layer schema: L0 Coverage Map · L1 Formulae ·
>    L2 Patterns (12–18, sweet spot 15) · L3 Guided · L4 Practice · L5 Review.
> 5. Default source books: Cengage (Tewani) for Maths, Narayana Module +
>    DC Pandey for Physics, Narendra Awasthi (deferred) for Chemistry.
> 6. Per-record state (MCQ ci, Guided {oi,h,s}) is persisted; ↺ Reset button
>    clears just one card.
> 7. Each pattern card carries a `srcText` map; missing entries marked
>    "(text pending — upload page X)".
> 8. Tell me what's missing before building; don't paper over gaps.
>
> TASK for this chat: <describe>.

---

## 1 · Files & where things live

```
patternlab/
├── index.html       — shell (5 tabs: Map, Patterns, Guided, Practice, Review)
├── styles.css       — design tokens + all rendering CSS
├── app.js           — runtime: state, render, supabase sync, all 5 tabs
├── curriculum.js    — DATA: TAXA, FORMULAE, PATTERNS, GUIDED, PRACTICE per chapter; also GAPLOG
├── gaplog.js        — self-contained Gap Log engine (load after curriculum.js; see §9)
├── config.js        — Supabase URL + anon key (per-deployment)
├── schema.sql       — Supabase tables (state, profiles) — set up once
└── README.md        — env setup notes
```

**Read-only invariants** — never touch unless explicit ask:
- Question IDs (the `src` field) are stable, like commit hashes.
- `tier` and `tax` (taxonomy) assignments on existing records.
- Existing pattern IDs (P1, P2, … P18) and their (id, name) pair.

---

## 2 · Data model — all card shapes

### 2a · The 6-layer pedagogical schema per chapter

| Layer | What | curriculum.js variable |
|---|---|---|
| L0 | Coverage Map (TAXA × tier heat-map) | computed from TAXA + PRACTICE |
| L1 | Formula Arsenal | `FORMULAE` (terse formula entries) |
| L2 | Pattern Library — the named MOVES Aarav builds reflexes for | `PATTERNS` |
| L3 | Guided Problems — chip pick → hints → solution | `GUIDED` |
| L4 | Practice — full question bank | `PRACTICE` |
| L5 | Review — re-do flagged + self-rate | derived from state |

**Design intent**: 12–18 patterns per chapter (sweet spot **15**). Each
pattern is a named MOVE, not a topic. Never create a new pattern unless the
move is genuinely new — tag practice records with an existing pattern code
instead. The Pattern Library is where Aarav builds reflexes; the more
focused and stable it is, the better it works.

### 2b · Pattern record (L2)

```js
{
  id:      "P4",           // stable
  name:    "Reference-Angle Comparison",
  trigger: "…cue to spot…",
  move:    "…what to do…",
  why:     "…the reasoning…",
  mini:    "…one-line worked example…",
  fails:   "…when this pattern doesn't apply…",
  src:     "Illus 1.34–1.36, 1.43–1.45, 1.70",  // string of references
  srcText: { "Illus 1.34": "Find the values of …", … },  // see §6
  fig:     "fx_wave"       // optional figure key
}
```

### 2c · Guided record (L3)

```js
{
  id:      "G1",
  tier:    1 | 2 | 3,
  tax:     "P4",           // taxonomy code from chapter's TAXA
  q:       "Which is greater: tan 1 or tan 4?",
  opts:    ["P3 AM-GM", "P4 Ref Angle", "P5 Sq Range", "P9 Discrim"],
  correct: 1,              // 0-based index into opts
  hints:   ["Reduce 4 = π + (4 − π) …", "Both residues land in Q1 …"],
  ans:     "tan 1 is greater",
  why:     "Both 1 and 0.86 are in Q1 where tan is rising …",
  pattern: "P4",           // links to a PATTERN id
  fig:     "fx_tan_graph"  // optional
}
```

### 2d · Practice record (L4)

```js
{
  src:    "SC Q1",         // stable ID — read-only after creation
  type:   "SC",            // SC, MC, LC, NV, Int, MM, Arch (see §2e)
  tier:   1 | 2 | 3,       // Foundation · JEE Main · JEE Advanced
  tax:    "P4",            // chapter-local taxonomy code
  q:      "If 5 tan θ = 4, then …",
  pat:    "P4 · interval signs",   // short pattern hook shown on reveal
  ans:    "1/6",           // canonical answer text
  opt:    "(3)",           // option letter from the printed source
  choices: ["0","1","1/6","6"],  // if present → engine renders MCQ
  correct: 2,              // 0-based; choices[correct] must match ans
  note:   "…",             // optional after-the-fact insight
  nudge:  "…",             // optional one-line hint shown on demand
  fig:    "fx_trap",       // optional figure key into FIGS map
  doc:    "exI"            // optional — groups under pracDocs sub-source
}
```

### 2e · PRACTICE type taxonomy

| `type` | Meaning | Engine handling |
|---|---|---|
| `SC`   | Single Correct (4 options, 1 correct) | MCQ if `choices` present |
| `MC`   | Multiple Correct (4 options, 1+ correct) | Reveal-mode (engine `correct` is single-int; ~6 lines in app.js would unlock array support) |
| `LC`   | Linked Comprehension paragraph | MCQ — each Q within is single-correct |
| `NV`   | Numerical Value (decimal answer) | Reveal-mode |
| `Int`  | Integer Answer 0–9 | Reveal-mode |
| `MM`   | Matrix Match (3-column or list-list match) | Reveal-mode |
| `Arch` | Archive from past JEE papers | Typed SC or MC accordingly |

**TAXA codes (F1, F2, P1, P2, …) are chapter-local** — they may mean
different things across chapters. They are taxonomy tags, not global IDs.

**Optional `pracDocs`** groups records by sub-source within a chapter (e.g.
WPE's Exercise-I / II / III). When set, the Practice tab renders grouped
sections instead of a flat list.

**FIGS** is a map of named keys → inline SVG strings, referenced by the
`fig` field on any pattern, guided, or practice record.

---

## 3 · State persistence

Per-record state, keyed by `CHAP + "::" + src`:

```js
// Practice (kind="practice")
{ a:false, r:null, f:false, ci:null }
//  a  = attempted?
//  r  = self-rated result: "got" | "slow" | "pattern" | "concept" | "calc"
//  f  = flagged for later?
//  ci = MCQ chosen index (number 0-3, or null)

// Guided (kind="guided")
{ oi:null, h:0, s:false }
//  oi = chip option index picked for "Which pattern fits?"
//  h  = number of hints revealed
//  s  = solution shown?
```

State flow: `CACHE` (in-memory) → `localStorage` (synchronous) → Supabase upsert
(async). The synchronous local write is critical — never reverse the order.

---

## 4 · Per-chapter curation checklist

> **HARD RULE — Chapter completion:** A chapter is NOT considered complete
> until ALL six layers are populated in the same session-arc that built it.
> Specifically: PATTERNS must each have a non-empty `srcText` map, GUIDED
> must be non-empty (one laddered rep per pattern, or at minimum one per
> high-frequency pattern), and PRACTICE must hit the ≥20 tier-3 rule.
> Deferring Guided or srcText to a "next session" is NOT acceptable — that
> leaves a half-built chapter Aarav cannot drill against. If a session is
> running short on budget, ship fewer PRACTICE records but complete every
> layer's scaffolding. Re-confirm this rule at the start of any new chapter
> build.

When adding a new chapter, deliver in this order:

1. **TAXA** (the pattern taxonomy codes used on this chapter's records).
2. **FORMULAE** — terse formula sheet.
3. **PATTERNS** (12–18 typical). Each pattern must carry a `srcText` map listing
   the actual question text for every illustration/exercise referenced in its
   `src` field. Mark missing items as "(text pending — upload page X)".
4. **GUIDED** (one laddered card per pattern minimum; 12–20 cards total across
   tiers 1/2/3). Each card has: q, opts[4] (pattern-name distractors),
   correct index, hints[] (3 progressive), ans, why, pattern (back-ref).
5. **PRACTICE** with this MINIMUM:
   - ≥ 8 tier-1 (Foundation) records (for advanced chapters this floor may
     drop; tier-3 floor never does)
   - ≥ 12 tier-2 (JEE Main) records
   - **≥ 20 tier-3 (JEE Advanced) records** ← non-negotiable
   - All MCQ options verified against printed source pages.
6. **srcText backfill** — once PRACTICE is in, script-backfill srcText on
   PATTERNS by matching pattern.src refs against practice.src IDs. Unmatched
   refs get a clear "(text pending — Ex-V Q12 not yet curated into PRACTICE)"
   marker so it's obvious what's missing.
7. **Coverage map / pracDocs** if the chapter has discrete sub-sources (like
   WPE's Exercise-I / II / III).
8. **`CHAPTER_META` entry** at the bottom of curriculum.js — one row with
   id (matching the CONTENT key), grade, subject, topic, chapter, sources,
   created date. Drives the Project Manifest modal.

**Sources to mine** (in priority order):
- In-chapter solved illustrations (often the cleanest pattern reps).
- In-chapter solved examples.
- End-of-chapter exercises (single-correct, multi-correct, archives).
- Past JEE Main/Advanced papers if available in the source book.

**Default source books by subject** (per Sanjay's choices for Aarav's prep):
- **Maths** → Cengage by G. Tewani primary; Narayana JEE-Adv Vol-III for
  identity/extrema-heavy chapters (e.g. Periodicity & Extreme Values).
- **Physics** → Narayana Module (JEE-Adv Vol-II) primary + DC Pandey secondary.
  DC Pandey is preferred over SBT/HC Verma for Aarav's current phase.
- **Chemistry** → deferred (Narendra Awasthi to be added when chapter work begins).

Doubt-solving stays tied to Narayana's own modules — don't propose competing
curriculum loads. Sanjay typically uploads source pages (illustrations,
examples, exercise sections, answer keys) as phone photos; verify every MCQ
option set against those pages before adding to PRACTICE.

---

## 5 · Current chapter status

| Chapter | Patterns | Guided | Practice | tier-3 | srcText |
|---|---|---|---|---|---|
| `maths/trig/fg`   | 18 | 18 | 59 | 24 ✓ | 18/18 (~15 entries pending Cengage pages 1.6–1.15) |
| `phys/mech/wpe`   | 16 | 16 | 53 |  9 ✗ short 11 | 16/16 (33 entries pending Narayana Module pages) |
| `maths/trig/pev`  | 14 | 14 | 33 | 33 ✓ | 14/14 (25 entries pending — refs to source questions not yet curated into PRACTICE) |
| `maths/trig/teq`  | 15 | 15 | 47 | 25 ✓ | 15/15 (3 entries pending Cengage illus pages 3.5 / 3.7 / half-angle) |

### `pev` chapter — fully built across 3 sessions (June 2026)
All six layers populated: 18 TAXA, 10 Formula Arsenal entries, 14 Patterns
(every pattern has srcText with at least one filled entry), 14 Guided
laddered single-pattern reps (one per pattern, tier 2 or 3 each, with 3
progressive hints), and 33 tier-3 Practice records sourced from Narayana
Module Vol-III Ex-IV/V and three WAT papers. 21/33 MCQ-enabled. The 25
pending srcText entries reference source questions not yet curated into
PRACTICE — they'll fill automatically as more practice records are added
in future sessions.

### Pending uploads
- **Cengage Trig F&G, pages 1.6–1.15** to fill `srcText` for illustrations
  1.8, 1.10, 1.11, 1.12, 1.13, 1.15, 1.16, 1.17, 1.18, 1.19, 1.20, 1.21, 1.22, 1.26.
- **Narayana Module (JEE-Adv Physics Vol-II)** worked-example pages covering
  WE-1, WE-3, WE-7, WE-17, WE-18, WE-21–24, WE-26, WE-27, WE-30, WE-31, WE-32,
  WE-35, WE-37, WE-40, WE-41 — plus the synopsis pages (p.72, 80–83) and
  Ex-III Comp-2/Comp-3 paragraphs. Used to fill the 33 pending srcText entries
  in WPE patterns.

### `teq` chapter — Trigonometric Equations (built 28 Jun 2026)
All six layers in one arc: 19 TAXA (F1–F4 + P1–P15), 10 Formula groups,
15 Patterns (each with a non-empty srcText; 33/36 entries filled, 3 pending
Cengage illustration-body pages 3.5 / 3.7 / half-angle), 15 Guided cards —
**every one tier-3** per Aarav's feedback, one per pattern — and 47 Practice
records (10 t1, 12 t2, 25 t3). **100% of the 25 tier-3 records come from
test-paper / exercise sources** (Narayana Ex-III/IV/V + Cengage Archives),
exceeding the 60–80% target; `fund` doc holds foundation templates only.
29 MCQ records, all with `choices[correct] === ans` verified against printed
answer keys; the rest reveal-mode (answer hint-derived).

### Gap Log — first load (28 Jun 2026)
Seeded with the 15 highlighted misses from **Narayana JR.IIT WTA-6 (28-06-26)**.
Split: **10 existing-pattern** misses (all `pev` — periodicity/extrema defeated
by disguise or insufficient drill) and **5 new/emerging patterns**
(Difference-of-Radicals rationalization; Perfect-Square→Cauchy–Schwarz;
Σtan²(kπ/2n) via roots; Jensen/monotonicity of x·f(x); multiple-angle tan(nx)
identities — the last belongs to a not-yet-built **Trigonometric Identities**
chapter). **Key finding: the test was a `pev` test, not a teq test** — exactly
why the Gap Log is cross-chapter, tagging each entry to its true home chapter.

### Known retrofits to schedule
- **WPE practice** needs +11 tier-3 records. Source: Narayana Module
  (JEE-Adv Physics Vol-II) pages 61–110, Exercise-II/III, plus illustration
  examples in the body of the chapter.
- **`pev` retrofit (now evidence-backed, schedule next)** — WTA-6 proves the
  pev Guided ladder + pattern set has real gaps: add the 5 new pattern cards
  from the Gap Log, plus P5 "on-ramp" Guided (reduce-then-bound: difference-of-
  sines, half-angle, ×cos²θ), and WAT-grade tier-3. This is the highest-leverage
  next build.
- **`pev` practice expansion (optional, not a deficit)** — current 33 records
  cover roughly a third of available source material. Adding Ex-IV/V
  remaining questions and the rest of WAT-06/11/12 would push toward 60–80
  tier-3, but the chapter is shippable as-is.

### Pending uploads
- **Cengage Trig F&G, pages 1.6–1.15** to fill `srcText` for illustrations
  1.8, 1.10, 1.11, 1.12, 1.13, 1.15, 1.16, 1.17, 1.18, 1.19, 1.20, 1.21, 1.22, 1.26.
- **Narayana Module (JEE-Adv Physics Vol-II)** worked-example pages covering
  WE-1, WE-3, WE-7, WE-17, WE-18, WE-21–24, WE-26, WE-27, WE-30, WE-31, WE-32,
  WE-35, WE-37, WE-40, WE-41 — plus the synopsis pages (p.72, 80–83) and
  Ex-III Comp-2/Comp-3 paragraphs. Used to fill the 33 pending srcText entries
  in WPE patterns.
- **WAT answer keys** for WAT-06, WAT-11, WAT-12 if available — would speed
  up MCQ choice verification during pev practice curation. Not blocking; the
  Module Ex V hints already cover much of the same material.

### Known retrofits to schedule
- **WPE practice** needs +11 tier-3 records. Source: Narayana Module
  (JEE-Adv Physics Vol-II) pages 61–110, Exercise-II/III, plus illustration
  examples in the body of the chapter.

---

## 6 · Pattern card srcText

Each `PATTERN` carries:

```js
srcText: {
  "Illus 1.38": "Which of the following is possible? (a) sin θ = 5/3 …",
  "Exercise Q5": "If sin θ₁ + sin θ₂ + sin θ₃ = 3, then …",
  ...
}
```

Renders as `<details><summary>Show source questions ▾</summary>…</details>` at
the bottom of each pattern card. Aarav can read the actual question text inline
without needing the printed book.

---

## 7 · Working principles

1. **Append is the default.** Rebuild only on explicit ask, and even then,
   stable IDs are preserved.
2. **Correctness over volume.** When something can't be verified from the
   uploaded source, say so and stop. Don't fabricate MCQ choices.
3. **Plan before multi-file refactors.** Sketch the changes, get a nod, build.
4. **Per-card UX matters more than per-tab.** Aarav uses the app on a phone;
   resetting one card should never lose scroll position or other cards' state.
5. **Supabase sync can't be tested in the container.** Verify on device.
6. **Flag missing pages rather than guess.** When an illustration text isn't
   in hand, write "(text pending — upload page X)" so the gap is visible.

---

## 8 · Session changelogs

### 28 Jun 2026

**curriculum.js**
- Built and registered chapter **`maths/trig/teq` (Trigonometric Equations)**:
  TEQ_TAXA (19), TEQ_FORMULAE (10 groups), TEQ_PATTERNS (15, with srcText),
  TEQ_GUIDED (15, all tier-3), TEQ_PRACTICE (47: 10/12/25 across tiers),
  TEQ_PRAC_DOCS (fund / narEx3 / narEx4 / narEx5 / cengArch), TEQ_PRAC_TIERS.
  Added the `"maths/trig/teq"` entry to `CONTENT` and a `CHAPTER_META` row.
- Appended **`GAPLOG`** array (15 WTA-6 entries, each diagnosed existing-vs-new
  with a Guided-style hint ladder). Append-only; future tests add entries with
  a new `date`.
- Validation: `node --check` clean; 15 patterns / 15 guided (all tier-3) / 47
  practice (t1 10, t2 12, t3 25); every pattern has ≥1 filled srcText; all 29
  MCQ have `choices[correct] === ans`; no duplicate `src` ids; GAPLOG 15 (10
  existing / 5 new) with well-formed ladders.

**gaplog.js (NEW FILE)**
- Self-contained Gap Log engine (IIFE). Reads global `GAPLOG`, injects its own
  CSS, auto-adds a `⚑ Gaps` launcher, renders a modal grouped by chapter with
  filters (All / Redo-cold / New patterns / per-chapter). Each entry shows the
  question, diagnosis, (for new patterns) a proposed pattern card, and a
  chip→hints→solution ladder. Per-entry state `{oi,h,s,done}` persists in
  `localStorage` under `pl.gaplog.<id>` — **no Supabase/app.js coupling.**
- Exposes `window.GapLog.open()` / `.close()` / `.refreshLauncher()`.

**Files NOT touched**: app.js, index.html, styles.css, config.js, schema.sql,
README.md (Gap Log was deliberately built standalone — see §10).

### 25 Jun 2026

**curriculum.js**
- Added MCQ choices+correct to 29 single-correct maths records (verified
  against Cengage answer key, page 1.38).
- Appended 20 advanced practice records: Cengage SC Q4, Q9, Q13, Q16, Q19, Q23,
  Q24, Q28, Q33, Q35, Q39, Q41, Q44, Q45, Q53, Q54, Q55, Q59, Q60, Q63.
- Added `srcText` to all 18 maths patterns (P1–P18). ~15 entries pending
  upload of Cengage pages 1.6–1.15.
- Added `srcText` to all 16 WPE patterns. 35 entries filled from existing
  WPE_PRACTICE records, 33 marked pending Narayana Module worked-example /
  synopsis pages.
- Added `CHAPTER_META` array — one entry per chapter with grade/subject/topic/
  chapter/sources/created. Drives the new Manifest modal.

**index.html**
- Added a small `≡` icon button in the topbar next to "Choose profile" that
  opens the Project Manifest modal. Modal markup mirrors the profile modal
  pattern with a close button + click-outside-to-close.

**app.js**
- Added `mountManifest()` and topbar button wiring. Renders one row per
  CHAPTER_META entry with live-computed health: tier breakdown, MCQ %,
  pattern srcText coverage and pending-entry counts.

**app.js**
- `normAtt` defaults now include `ci:null`.
- `cardHTML` restores MCQ post-answer state and pre-opens reveal on mount.
- Per-card binding extracted into `bindCard(card,p)` for Practice and
  `bindGcard(card)` for Guided. Reset re-renders the affected card in place.
- Added ↺ Reset button on every Practice qcard and Guided gcard.
- Guided state `{oi, h, s}` persisted under `CACHE.guided` / Supabase
  kind="guided" and restored on mount via silent replay.
- `mountPatterns` renders the new `srcText` block as a collapsible `<details>`.

**styles.css**
- `.resetbtn` styling consistent with `.flagbtn` / `.attbtn`.
- `.pcard .src-details` and `.src-q-*` for the source-questions dropdown.

**Files unchanged**: index.html, config.js, schema.sql, README.md.

---

## 9 · Gap Log (cross-chapter test-miss loop)

**Philosophy.** Every weekly test's misses become the next week's build queue.
The Gap Log is a single cross-chapter section: each entry is date-stamped per
test and tagged to the chapter it actually belongs to (NOT the chapter in
flight). Diagnosis classifies a miss as `existing` (maps to a built pattern —
record WHY Aarav didn't reach for it) or `new` (a genuinely missing move — the
entry carries a proposed pattern card to fold into that chapter later).

**Data shape** (`GAPLOG`, appended at the bottom of curriculum.js):
```js
{
  id:"WTA6-Q3", date:"28 Jun 2026", test:"…", qno:"Q3",
  grade:"11th", chapter:"Periodicity & Extreme Values", type:"NV",
  qtext:"…", diagnosis:"existing"|"new", pat:"pev · P7 (…)",
  whyMissed:"…",
  newPattern:{ name, trigger, move, why, fails },   // only when diagnosis==="new"
  ladder:{ chip:[4 names], correct:0, hints:[3 progressive], solution:"…" },
  redoCold:true
}
```

**Engine.** `gaplog.js` is self-contained: reads `GAPLOG`, injects CSS,
persists `{oi,h,s,done}` per entry in `localStorage` (`pl.gaplog.<id>`). It does
NOT touch app.js state or Supabase by design — so it can't break the main app.

**Wiring (one line).** In `index.html`, after curriculum.js:
```html
<script src="curriculum.js"></script>
<script src="gaplog.js"></script>   <!-- add this -->
```
A floating `⚑ Gaps` button appears automatically. To use a nav button instead,
call `window.GapLog.open()` from its click handler (the auto-launcher can be
left as-is or removed by deleting the `addLauncher()` call at the bottom of the
file). **Verify on device** — localStorage persistence and the modal can't be
exercised in the build container.

**Next:** when the `pev` retrofit runs, promote the 5 `new` Gap Log pattern
cards into PEV_PATTERNS (and the identities one into a new Trig Identities
chapter); existing-pattern misses become extra tier-3 PEV_PRACTICE + P5 on-ramp
Guided.

## 10 · Future enhancement queue (not started)

1. **Multi-correct rendering.** Engine's `correct` is single-integer; the 4 MC
   records + Archive MC are stuck in reveal-mode. ~6 lines in app.js would
   make `correct` accept an array.
2. **WPE tier-3 retrofit** (see §5).
3. **WPE pattern srcText** (see §5).
4. **Per-card analytics roll-up** — currently Review tab counts attempted; a
   small chart of t1/t2/t3 attempted vs. flagged would help Sanjay see
   coverage at a glance.

---

*End of handoff. Update this doc at the end of every chat that materially
changes architecture, conventions, or chapter status.*
