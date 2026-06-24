# Pattern Lab — patch: hidden example questions + faster Cards

Two small `app.js` swaps and one `styles.css` addition. **Neither touches `mountGuided`**, so this is safe to apply on top of your current `app.js` (with last turn's Guided fix already in it) — nothing there is disturbed.

---

## 1 · app.js — replace `mountPatterns(...)` (adds the hidden "exact questions")

Each pattern card now ends with a collapsed line — *"See the exact questions that train this · N"* — that, when tapped, reveals the real questions from the **Guided + Practice** banks tagged with that pattern. No duplicated data: as the bank grows (e.g. the new Narayana batch), each pattern's examples grow automatically.

Find your current `function mountPatterns(){ ... }` and replace the whole function with:

```js
function mountPatterns(){
  document.getElementById('pattern-list').innerHTML=PATTERNS.map(p=>{
    // the actual bank questions that train this pattern (guided + practice), hidden by default
    const ex=[
      ...GUIDED.filter(g=>g.tax===p.id).map(g=>({tag:g.id,q:g.q})),
      ...PRACTICE.filter(q=>q.tax===p.id).map(q=>({tag:q.src,q:q.q}))
    ];
    const exBlock = ex.length ? `
      <details class="pex">
        <summary>See the exact questions that train this \u00b7 ${ex.length}<span class="chev">\u203a</span></summary>
        <div class="pex-body">${ex.map(e=>`<div class="pex-q"><span class="pex-tag">${e.tag}</span>${e.q}</div>`).join('')}</div>
      </details>` : '';
    return `
    <div class="pcard">
      <div class="top"><span class="pid">${p.id}</span><h3>${p.name}</h3></div>
      <div class="trigger"><b>Trigger \u2014 the cue to spot</b>${p.trigger}</div>
      <div class="rows">
        <div class="prow"><span class="lab">Move</span><span class="val">${p.move}</span></div>
        <div class="prow"><span class="lab">Why</span><span class="val">${p.why}</span></div>
        <div class="prow mini"><span class="lab">Mini</span><span class="val">${p.mini}</span></div>
        <div class="prow fails"><span class="lab">Fails when</span><span class="val">${p.fails}</span></div>
      </div>
      <div class="src">${p.src}</div>
      ${exBlock}
    </div>`;}).join('');
}
```

---

## 2 · app.js — replace `mountFlash(...)` (fixes the slow Cards)

The slowness was that each *Knew it / Didn't get it* tap **awaited the Supabase write before showing the next card**. The fix: advance and repaint instantly, then persist in the background. The local save is synchronous inside `setState`, so progress is still saved on every tap — only the network round-trip stops blocking the UI.

Replace the whole `function mountFlash(){ ... }` with:

```js
function mountFlash(){
  const mount=document.getElementById('flash-mount');
  let order=PATTERNS.map((_,i)=>i),pos=0,flipped=false;
  const card=()=>PATTERNS[order[pos]];
  function paint(){
    const p=card();
    mount.innerHTML=`
      <div class="flash-nav"><span class="count">Card ${pos+1} / ${order.length}</span><button class="btn ghost" id="shuffle">Shuffle</button></div>
      <div class="flash-wrap"><div class="flash ${flipped?'flip':''}" id="flash">
        <div class="face front"><div class="ftag">Trigger \u2014 name the pattern</div><div class="ftxt">${p.trigger}</div><div class="tap">tap to flip</div></div>
        <div class="face back"><div class="ftag">${p.id}</div><h4>${p.name}</h4><div class="mv">${p.move}</div><div class="tap">tap to flip back</div></div>
      </div></div>
      <div class="flash-rate"><button class="again" id="again">Didn\u2019t get it</button><button class="good" id="good">Knew it</button></div>`;
    document.getElementById('flash').addEventListener('click',()=>{flipped=!flipped;document.getElementById('flash').classList.toggle('flip');});
    document.getElementById('shuffle').addEventListener('click',()=>{for(let i=order.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[order[i],order[j]]=[order[j],order[i]];}pos=0;flipped=false;paint();});
    document.getElementById('again').addEventListener('click',()=>adv(false));
    document.getElementById('good').addEventListener('click',()=>adv(true));
  }
  function adv(known){
    const id=card().id,k=CHAP+'::'+id,cur=getState('flash',k)||{};
    pos=(pos+1)%order.length;flipped=false;paint();          // advance the UI instantly
    setState('flash',k,{known:(cur.known||0)+(known?1:0)});  // persist in the background (no await)
  }
  paint();
}
```

---

## 3 · styles.css — add this block (styles the hidden examples)

Paste anywhere near your `.pcard` rules. Uses your existing theme variables.

```css
/* hidden "exact questions" under each pattern card */
.pcard .pex{margin-top:14px;border-top:1px solid var(--line);padding-top:12px}
.pcard .pex>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:6px;font:600 13px/1.3 var(--disp);color:var(--teal)}
.pcard .pex>summary::-webkit-details-marker{display:none}
.pcard .pex .chev{margin-left:auto;transition:transform var(--t,.2s)}
.pcard .pex[open] .chev{transform:rotate(90deg)}
.pcard .pex-body{margin-top:10px;display:flex;flex-direction:column;gap:8px}
.pcard .pex-q{font-size:13.5px;line-height:1.55;color:var(--ink);background:var(--mist);border:1px solid var(--line);border-radius:var(--r-sm,8px);padding:9px 11px}
.pcard .pex-tag{display:inline-block;font:600 11px var(--mono);color:var(--ink-soft);margin-right:7px}
```

---

*Prefer one merged `app.js` instead of these swaps? Paste me your current committed `app.js` and I'll hand it back complete.*
