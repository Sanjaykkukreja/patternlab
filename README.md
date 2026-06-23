# Pattern Lab

A JEE pattern-recognition trainer. Subject → Topic → Chapter, each chapter with
six layers (Coverage Map, Formulae, Patterns, Guided, Practice, Review, Flashcards).
Progress syncs across devices via Supabase; new questions append without ever
disturbing earlier progress, because every question has a stable global id.

## What's in the repo
| File            | What it is                                                        |
|-----------------|-------------------------------------------------------------------|
| `index.html`    | The app shell (header, selectors, panels).                        |
| `styles.css`    | All styling.                                                      |
| `app.js`        | Renderer, navigation, sync layer. You rarely touch this.          |
| `curriculum.js` | **Data only.** The curriculum tree + every chapter's questions. This is the file you and I keep appending to. |
| `config.js`     | Your Supabase URL + key. Edit once.                               |
| `schema.sql`    | Run once in Supabase to create the tables.                        |

## One-time setup (~15 min)
1. **Supabase project** — go to supabase.com, create a free project.
2. **Tables** — open SQL Editor, paste all of `schema.sql`, Run.
3. **Keys** — click **Connect** (top bar) or Settings → API Keys. Copy the *Project URL*
   and the *publishable* key (`sb_publishable_...`) into `config.js`.
4. **Host it** — push these files to a GitHub repo, then Settings → Pages →
   deploy from the `main` branch root. (Or drop them on any static host / your URL.)
5. Open the URL, add a profile (e.g. "Aarav"), and you're live.

Before step 3 the app still works locally (single device, no sync) — handy for previewing.

## Profiles
On first open you pick or create a profile; progress is saved against it and
follows that profile to any device. Use one for Aarav and a separate one for
your own test/analysis runs. The "● Name" button (top-right) switches profiles.

## How we add questions (the whole point)
You send module + Cengage photos → I return an updated `curriculum.js` with the
new questions curated into the right chapter, tier, type and pattern. You commit
the file. New questions appear; every previously-answered question keeps its
attempt/flag state, because ids never change. No replanning, ever.

To make a "soon" chapter live, its content is added to the `CONTENT` map in
`curriculum.js` — that single line flips it from greyed to ready.

## Structure notes (for the long haul — 11th & 12th)
- Every chapter carries a `grade` (11 or 12).
- Question ids are `chapterPath::src` (e.g. `maths/trig/fg::SC Q1`) — globally unique and permanent.
- The six-layer schema is the same for every chapter; only the data differs.
