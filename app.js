/* =====================================================================
   PATTERN LAB - app logic (renderer, navigation, sync)
   Storage: local cache (instant) + Supabase (cross-device).
   Reads CURRICULUM / CONTENT / data arrays from curriculum.js.
   ===================================================================== */

/* ---------- Supabase client (optional; app works locally without it) ---------- */
let sb = null;
(function(){
  const c = window.PATTERNLAB_CONFIG || {};
  const apiKey = c.key || c.anonKey;   // 'key' = new publishable key; 'anonKey' = legacy
  const ok = c.url && apiKey && c.url.indexOf('YOUR_') < 0 && window.supabase;
  if (ok) { try { sb = window.supabase.createClient(c.url, apiKey); } catch(e){ console.warn('Supabase init failed', e); } }
})();

/* ---------- sync layer: in-memory CACHE -> localStorage -> Supabase ---------- */
let PROFILE = null;
let CACHE = { practice:{}, flash:{}, guided:{} };
const LS = p => 'patternlab:state:' + p;
function persistLocal(){ try{ localStorage.setItem(LS(PROFILE), JSON.stringify(CACHE)); }catch(e){} }
async function loadProfileState(profile){
  PROFILE = profile;
  try { CACHE = JSON.parse(localStorage.getItem(LS(profile))) || {practice:{},flash:{}}; }
  catch(e){ CACHE = {practice:{},flash:{}}; }
  CACHE.practice = CACHE.practice || {}; CACHE.flash = CACHE.flash || {}; CACHE.guided = CACHE.guided || {};
  if (sb){
    try {
      const { data, error } = await sb.from('state').select('kind,item_key,data').eq('user_id', profile);
      if (!error && data){ data.forEach(r => { CACHE[r.kind] = CACHE[r.kind] || {}; CACHE[r.kind][r.item_key] = r.data; }); persistLocal(); }
    } catch(e){ console.warn('state fetch failed', e); }
  }
}
function getState(kind, key){ return (CACHE[kind] || {})[key] || null; }
async function setState(kind, key, patch){
  CACHE[kind] = CACHE[kind] || {};
  const next = Object.assign({}, CACHE[kind][key] || {}, patch);
  CACHE[kind][key] = next; persistLocal();
  if (sb){
    try { await sb.from('state').upsert({ user_id:PROFILE, kind:kind, item_key:key, data:next, updated_at:new Date().toISOString() }, { onConflict:'user_id,kind,item_key' }); }
    catch(e){ console.warn('state upsert failed', e); }
  }
  return next;
}

/* ---------- current chapter + practice helpers (keyed by global id) ---------- */
let CHAP = null;  // e.g. "maths/trig/fg" ; practice gid = CHAP + "::" + src
let FIGS={}, PRAC_DOCS=null, CUR_TIERS=null, EXPLAIN=null;
function figHTML(key){ return (key && FIGS[key]) ? `<div class="figbox">${FIGS[key]}</div>` : ''; }
function normAtt(v){ if(!v) return {a:false,r:null,f:false,ci:null}; if(typeof v==='string') return {a:true,r:v,f:false,ci:null}; return Object.assign({a:false,r:null,f:false,ci:null}, v); }
function attOf(src){ return normAtt(getState('practice', CHAP + '::' + src)); }
async function setAtt(src, patch){ return await setState('practice', CHAP + '::' + src, patch); }

/* ===== TABS ===== */
document.getElementById('tabs').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id===b.dataset.tab));
  window.scrollTo({top:0,behavior:'instant'});
  if(b.dataset.tab==='review')renderReview();
  if(b.dataset.tab==='map')renderMap();
});

/* ===== L0 COVERAGE MAP ===== */
function renderMap(){
  const cells={};TAXA.forEach(t=>cells[t.code]={1:0,2:0,3:0});
  GUIDED.forEach(g=>{if(cells[g.tax])cells[g.tax][g.tier]++;});
  PRACTICE.forEach(p=>{if(cells[p.tax])cells[p.tax][p.tier]++;});
  const totalCells=TAXA.length*3;
  let covered=0;TAXA.forEach(t=>[1,2,3].forEach(tr=>{if(cells[t.code][tr]>0)covered++;}));
  document.getElementById('cov-summary').innerHTML=`
    <div class="stat"><div class="num" style="color:var(--teal)">${PATTERNS.length}</div><div class="lab">patterns</div></div>
    <div class="stat"><div class="num">${GUIDED.length}</div><div class="lab">guided</div></div>
    <div class="stat"><div class="num">${PRACTICE.length}</div><div class="lab">practice Q</div></div>
    <div class="stat"><div class="num" style="color:var(--amber)">${covered}/${totalCells}</div><div class="lab">slots covered</div></div>`;

  const cls=n=>n===0?'z':(n<=2?'p':'g');
  let groups={};TAXA.forEach(t=>{(groups[t.group]=groups[t.group]||[]).push(t);});
  let html=`<div class="ch">Method × difficulty
    <span class="cov-legend"><span><i style="background:#fbeae6"></i>gap</span><span><i style="background:#fbf0dd"></i>1–2</span><span><i style="background:#e3f1ef"></i>3+</span></span></div>
    <div class="cov-cap">Each cell is one method × difficulty <b>slot</b> — it lights up once ≥1 guided/practice item lands in it. The tiles above count <b>items</b>; this grid counts <b>slots</b>.</div>
    <div class="cov-grid-head"><span style="text-align:left">method / pattern</span><span>Fnd</span><span>Main</span><span>Adv</span></div>`;
  Object.keys(groups).forEach(gr=>{
    html+=`<div class="cov-sub">${gr}</div>`;
    groups[gr].forEach(t=>{
      const c=cells[t.code];
      html+=`<div class="cov-row"><div class="name"><span class="pc">${t.code}</span>${t.label}</div>
        <div class="cell ${cls(c[1])}">${c[1]||'·'}</div>
        <div class="cell ${cls(c[2])}">${c[2]||'·'}</div>
        <div class="cell ${cls(c[3])}">${c[3]||'·'}</div></div>`;
    });
  });
  document.getElementById('cov-patterns').innerHTML=html;

  const types=[["SC","Single Correct"],["NV","Numerical"],["Int","Integer"],["MC","Multiple Correct"],["LC","Linked Comp"],["MM","Matrix Match"],["Arch","Archives"]];
  const tc={};PRACTICE.forEach(p=>tc[p.type]=(tc[p.type]||0)+1);
  document.getElementById('cov-types').innerHTML=`<div class="ch">Question-type coverage</div>
    <div class="typestrip">${types.map(([k,l])=>`<span class="tchip ${(tc[k]||0)===0?'z':''}"><b>${tc[k]||0}</b> ${l}</span>`).join('')}</div>`;
}

/* ===== L1 ===== */
function mountFormulae(){
  document.getElementById('bucket-list').innerHTML=FORMULAE.map((b,i)=>`
    <details class="bucket" ${i===0?'open':''}>
      <summary><span class="tag">${b.tag}</span>${b.title}<span class="chev">›</span></summary>
      <div class="body">${b.rows.map(r=>`<div class="frow"><span class="f">${r.f}</span>
        ${r.note?`<div class="meta"><span class="k ${r.k}">${r.k==='trap'?'TRAP':'WHEN'}</span><span>${r.note}</span></div>`:''}</div>`).join('')}</div>
    </details>`).join('');
}

/* ===== L2 ===== */
function mountPatterns(){
  const srcTextHTML = p => {
    if(!p.srcText) return '';
    const items = Object.entries(p.srcText).map(([label,text])=>
      `<div class="src-q"><span class="src-q-label">${label}</span><div class="src-q-text">${text}</div></div>`
    ).join('');
    return `<details class="src-details"><summary>Show source questions \u25be</summary>${items}</details>`;
  };
  document.getElementById('pattern-list').innerHTML=PATTERNS.map(p=>`
    <div class="pcard">
      <div class="top"><span class="pid">${p.id}</span><h3>${p.name}</h3></div>
      ${figHTML(p.fig)}
      <div class="trigger"><b>Trigger \u2014 the cue to spot</b>${p.trigger}</div>
      <div class="rows">
        <div class="prow"><span class="lab">Move</span><span class="val">${p.move}</span></div>
        <div class="prow"><span class="lab">Why</span><span class="val">${p.why}</span></div>
        <div class="prow mini"><span class="lab">Mini</span><span class="val">${p.mini}</span></div>
        <div class="prow fails"><span class="lab">Fails when</span><span class="val">${p.fails}</span></div>
      </div>
      <div class="src">${p.src}</div>
      ${srcTextHTML(p)}
    </div>`).join('');
}

/* ===== L3 GUIDED (grouped by tier) ===== */
function mountGuided(){
  const host=document.getElementById('guided-list');
  CACHE.guided = CACHE.guided || {};
  const gkey = id => CHAP + "::" + id;
  const guidedOf = id => CACHE.guided[gkey(id)] || {oi:null,h:0,s:false};
  const setGuidedState = async (id, patch) => {
    const k = gkey(id);
    const next = Object.assign({}, guidedOf(id), patch);
    CACHE.guided[k] = next; persistLocal();
    if(sb){ try{ await sb.from('state').upsert({user_id:PROFILE,kind:'guided',item_key:k,data:next,updated_at:new Date().toISOString()},{onConflict:'user_id,kind,item_key'}); }catch(e){ console.warn('guided state upsert failed', e); } }
  };

  let html='';
  [1,2,3].forEach(tier=>{
    const items=GUIDED.filter(g=>g.tier===tier);
    const desc={1:"clean single-pattern reps \u2014 build the reflex",2:"the workhorses you meet most",3:"multi-pattern \u2014 the rank-separators"}[tier];
    html+=`<div class="tier-head"><span class="tier-pill tp${tier}">${TIER_LABEL[tier]}</span><span class="desc">${desc}</span></div>`;
    html+=items.map(g=>{
      const gi=GUIDED.indexOf(g);
      return `<div class="gcard" data-gi="${gi}">
        <div class="ghead"><div class="gnum">${g.id}<span class="badge b${tier}">${TIER_LABEL[tier]}</span><span class="badge btype">${g.tax}</span><button class="resetbtn" data-act="reset-g" aria-label="Reset this guided" title="Clear my work on this guided">\u21bb</button></div><div class="q">${g.q}</div></div>
        <div class="gbody">
          ${figHTML(g.fig)}
          <div class="step-q">\u2460 Which pattern fits? (30 sec)</div>
          <div class="chips">${g.opts.map((o,oi)=>`<button class="chip" data-oi="${oi}">${o}</button>`).join('')}</div>
          <div class="chip-fb"></div><div class="hints"></div>
          <div class="btn-row" style="display:none">
            <button class="btn next-hint">Reveal a hint</button>
            <button class="btn ghost show-sol" style="display:none">Show solution</button>
          </div>
        </div></div>`;
    }).join('');
  });
  host.innerHTML=html;

  const bindGcard = card => {
    const gi=+card.dataset.gi, g=GUIDED[gi];
    let hintsShown=0;
    const fb=card.querySelector('.chip-fb'), hintBox=card.querySelector('.hints');
    const btnRow=card.querySelector('.btn-row'), nextHint=card.querySelector('.next-hint'), showSol=card.querySelector('.show-sol');

    const pickChip = (oi, persist=true) => {
      const ch = card.querySelector('.chip[data-oi="'+oi+'"]');
      if(!ch) return;
      if(card.querySelector('.chip.right')||card.querySelector('.chip.wrong')) return;
      if(oi===g.correct){ch.classList.add('right');fb.className='chip-fb ok';fb.textContent='Right \u2014 that\u2019s the cue. Now work it with the hints.';}
      else{ch.classList.add('wrong');fb.className='chip-fb no';fb.textContent='Not quite \u2014 re-read the trigger in L2, then take hint 1.';}
      btnRow.style.display='flex';
      if(persist) setGuidedState(g.id,{oi:oi});
    };
    const addHint = (persist=true) => {
      if(hintsShown<g.hints.length){const d=document.createElement('div');d.className='hint';
        d.innerHTML=`<span class="hn">Hint ${hintsShown+1}</span>${g.hints[hintsShown]}`;hintBox.appendChild(d);hintsShown++;}
      if(hintsShown>=g.hints.length){nextHint.style.display='none';showSol.style.display='inline-block';}
      if(persist) setGuidedState(g.id,{h:hintsShown});
    };
    const showSolution = (persist=true) => {
      if(card.querySelector('.reveal-sol'))return;
      const pat=PATTERNS.find(p=>p.id===g.pattern);
      const d=document.createElement('div');d.className='reveal-sol';
      d.innerHTML=`<span class="sl">Solution \u00b7 ${g.pattern} ${pat.name}</span>
        <div class="ans">Answer: ${g.ans}</div>
        <div class="why"><b>What told you to use it</b>${g.why}</div>`;
      card.querySelector('.gbody').appendChild(d);showSol.style.display='none';
      if(persist) setGuidedState(g.id,{s:true});
    };

    card.querySelectorAll('.chip').forEach(ch=>ch.addEventListener('click',()=>pickChip(+ch.dataset.oi)));
    nextHint.addEventListener('click',()=>addHint());
    showSol.addEventListener('click',()=>showSolution());

    const resetBtn=card.querySelector('[data-act="reset-g"]');
    if(resetBtn)resetBtn.addEventListener('click',async()=>{
      await setGuidedState(g.id,{oi:null,h:0,s:false});
      card.querySelectorAll('.chip').forEach(c=>c.classList.remove('right','wrong'));
      fb.className='chip-fb'; fb.textContent='';
      hintBox.innerHTML=''; hintsShown=0;
      btnRow.style.display='none';
      nextHint.style.display='inline-block';
      showSol.style.display='none';
      const old=card.querySelector('.reveal-sol'); if(old)old.remove();
    });

    /* Restore prior state on mount */
    const gst = guidedOf(g.id);
    if(Number.isInteger(gst.oi)) pickChip(gst.oi, false);
    for(let i=0; i<(gst.h||0); i++) addHint(false);
    if(gst.s) showSolution(false);
  };

  host.querySelectorAll('.gcard').forEach(bindGcard);
}

/* ===== L4 PRACTICE ===== */
let pracFilter="All";
function mountPractice(){
  pracFilter="All";
  document.getElementById('prac-filter').innerHTML=(CUR_TIERS||PRAC_TIERS).map((t,i)=>`<button data-f="${t.k}" class="${i===0?'on':''}">${t.l}</button>`).join('');
  renderPractice();
}
async function renderPractice(){
  const host=document.getElementById('practice-list');
  const list=PRACTICE.filter(p=>{
    if(pracFilter==="All")return true;
    if(pracFilter==="Flag")return attOf(p.src).f;
    return String(p.tier)===pracFilter;
  });
  if(!list.length){host.innerHTML=`<div class="empty"><div class="big">${pracFilter==="Flag"?"No flagged questions yet.":"Nothing here yet."}</div>Tap \u2605 on any question to bookmark it for a deeper pass later.</div>`;return;}

  const cardHTML = p => {
    const st=attOf(p.src);
    const hasChoices = Array.isArray(p.choices) && p.choices.length;
    const answered = hasChoices && Number.isInteger(st.ci);
    const revealOpen = answered || (!hasChoices && st.a);
    const optsHTML = hasChoices
      ? `<div class="mcq${answered?' answered':''}" data-correct="${p.correct}">${p.choices.map((c,ci)=>{
          let cls='opt';
          if(answered){
            if(ci===p.correct) cls+=' correct';
            else if(ci===st.ci) cls+=' wrong';
          }
          return `<button class="${cls}" data-ci="${ci}"${answered?' disabled':''}><span class="ol">${String.fromCharCode(65+ci)}</span><span class="ot">${c}</span></button>`;
        }).join('')}</div>`
      : '';
    const nudgeBtn = p.nudge?`<div class="qbtns"><button class="btn ghost show-nudge">Need one nudge?</button></div>`:'';
    const revealBtn = hasChoices?'':`<div class="qbtns"><button class="btn show-ans"${revealOpen?' style="display:none"':''}>Reveal answer &amp; pattern</button></div>`;
    return `<div class="qcard ${st.a?'done':''} ${hasChoices?'mcqcard':''}" data-id="${p.src}">
      <div class="srcline"><span class="src">${p.src}</span><span class="badge btype">${p.type}</span><span class="badge b${p.tier}">${TIER_LABEL[p.tier]}</span>
        <span class="qctrl">
          <button class="flagbtn ${st.f?'on':''}" data-act="flag" aria-label="Flag for later" title="Flag for later">\u2605</button>
          <button class="resetbtn" data-act="reset" aria-label="Reset this question" title="Clear my selection on this question">\u21bb</button>
          <button class="attbtn ${st.a?'on':''}" data-act="att">${st.a?'\u2713 Attempted':'Mark attempted'}</button>
        </span></div>
      <div class="qt">${p.q}</div>
      ${figHTML(p.fig)}
      ${nudgeBtn}
      ${p.nudge?`<div class="nudge-box" style="display:none"><span class="nl">One nudge \u00b7 first move only</span>${p.nudge}</div>`:''}
      ${optsHTML}
      ${revealBtn}
      <div class="reveal"${revealOpen?'':' style="display:none"'}>
        <div class="tagline"><span class="ptag">${p.pat}</span><span class="ans">Ans ${p.opt||''} &nbsp; <span class="b">${p.ans}</span></span></div>
        ${p.note?`<div class="note">${p.note}</div>`:''}
        <div class="log-row">
          <button data-r="got" class="${st.r==='got'?'sel':''}">Got it</button>
          <button data-r="slow" class="${st.r==='slow'?'sel':''}">Slow</button>
          <button data-r="pattern" class="${st.r==='pattern'?'sel':''}">Wrong pattern</button>
          <button data-r="concept" class="${st.r==='concept'?'sel':''}">Wrong concept</button>
          <button data-r="calc" class="${st.r==='calc'?'sel':''}">Calc slip</button>
        </div></div></div>`;
  };

  let html='';
  if(PRAC_DOCS && PRAC_DOCS.length){
    PRAC_DOCS.forEach(d=>{
      const items=list.filter(p=>p.doc===d.id);
      if(!items.length)return;
      html+=`<div class="srcgroup"><div class="sg-head"><span class="sg-label">${d.label}</span><span class="sg-meta">${items.length} Q \u00b7 added ${d.date}</span></div>${d.note?`<div class="sg-note">${d.note}</div>`:''}</div>`;
      html+=items.map(cardHTML).join('');
    });
    const known=new Set(PRAC_DOCS.map(d=>d.id));
    const orphan=list.filter(p=>!known.has(p.doc));
    if(orphan.length){ html+=`<div class="srcgroup"><div class="sg-head"><span class="sg-label">Other</span><span class="sg-meta">${orphan.length} Q</span></div></div>`+orphan.map(cardHTML).join(''); }
  } else {
    html=list.map(cardHTML).join('');
  }
  host.innerHTML=html;

  const bindCard = (card, p) => {
    const id=card.dataset.id;
    const attBtn=card.querySelector('[data-act="att"]');
    const setAttView=a=>{card.classList.toggle('done',a);attBtn.classList.toggle('on',a);attBtn.textContent=a?'\u2713 Attempted':'Mark attempted';};
    const markAtt=async()=>{await setAtt(id,{a:true});setAttView(true);};
    card.querySelector('[data-act="flag"]').addEventListener('click',async function(){
      const cur=attOf(id);const ns=await setAtt(id,{f:!cur.f});
      this.classList.toggle('on',ns.f);
      if(pracFilter==="Flag"&&!ns.f)renderPractice();});
    attBtn.addEventListener('click',async function(){
      const cur=attOf(id);
      if(cur.a){await setAtt(id,{a:false,r:null});setAttView(false);card.querySelectorAll('.log-row button').forEach(x=>x.classList.remove('sel'));}
      else{await setAtt(id,{a:true});setAttView(true);}});

    const resetBtn=card.querySelector('[data-act="reset"]');
    if(resetBtn)resetBtn.addEventListener('click',async function(){
      await setAtt(id,{a:false,r:null,ci:null});
      const fresh=cardHTML(p);
      const tmp=document.createElement('div');tmp.innerHTML=fresh;
      const newCard=tmp.firstElementChild;
      card.replaceWith(newCard);
      bindCard(newCard,p);
    });

    const mcq=card.querySelector('.mcq');
    if(mcq){
      const correct=+mcq.dataset.correct;
      mcq.querySelectorAll('.opt').forEach(btn=>btn.addEventListener('click',async function(){
        if(mcq.classList.contains('answered'))return;
        mcq.classList.add('answered');
        const ci=+this.dataset.ci;
        mcq.querySelectorAll('.opt').forEach(b=>{
          const bi=+b.dataset.ci;
          if(bi===correct)b.classList.add('correct');
          else if(bi===ci)b.classList.add('wrong');
          b.disabled=true;
        });
        card.querySelector('.reveal').style.display='block';
        await setAtt(id,{a:true,ci:ci});
        setAttView(true);
      }));
    }

    const showAns=card.querySelector('.show-ans');
    if(showAns)showAns.addEventListener('click',function(){card.querySelector('.reveal').style.display='block';this.style.display='none';markAtt();});
    const sn=card.querySelector('.show-nudge');
    if(sn)sn.addEventListener('click',function(){card.querySelector('.nudge-box').style.display='block';this.style.display='none';});

    card.querySelectorAll('.log-row button').forEach(b=>b.addEventListener('click',async()=>{
      await setAtt(id,{a:true,r:b.dataset.r});setAttView(true);
      card.querySelectorAll('.log-row button').forEach(x=>x.classList.toggle('sel',x===b));}));
  };

  host.querySelectorAll('.qcard').forEach(card=>{
    const p=PRACTICE.find(x=>x.src===card.dataset.id);
    if(p)bindCard(card,p);
  });
}

/* ===== L5 REVIEW ===== */
async function renderReview(){
  const items=PRACTICE.map(p=>({id:p.src,st:attOf(p.src),p:p})).filter(o=>o.st.a||o.st.r||o.st.f);
  const attempted=items.filter(o=>o.st.a).length;
  const solid=items.filter(o=>o.st.r==='got').length;
  const revisit=items.filter(o=>(o.st.r&&o.st.r!=='got')||o.st.f);
  document.getElementById('stat-grid').innerHTML=`
    <div class="stat"><div class="num">${attempted}</div><div class="lab">attempted</div></div>
    <div class="stat"><div class="num" style="color:var(--green)">${solid}</div><div class="lab">solid</div></div>
    <div class="stat"><div class="num" style="color:var(--coral)">${revisit.length}</div><div class="lab">to revisit</div></div>`;
  const host=document.getElementById('review-list');
  if(!revisit.length){host.innerHTML=`<div class="empty"><div class="big">Nothing queued.</div>Flag a question with \u2605, or log one as <b>slow</b> / <b>wrong</b> in Practice, and it surfaces here with the pattern to re-fix.</div>`;return;}
  host.innerHTML=revisit.map(o=>{
    const p=o.p,pat=PATTERNS.find(x=>x.id===p.tax);
    const missed=o.st.r&&o.st.r!=='got';
    const lbl=missed?({slow:'was slow',pattern:'wrong pattern',concept:'wrong concept',calc:'calc slip'}[o.st.r]||o.st.r):'';
    return `<div class="rev-item">
      <div>${o.st.f?`<span class="rtag flag">\u2605 flagged</span>`:''}${missed?`<span class="rtag miss">${lbl}</span>`:''}</div>
      <div class="ph">${p.src}</div>
      <div class="qt" style="font-size:13px;margin:4px 0 7px">${p.q}</div>
      ${pat?`<div class="why"><b style="font-family:var(--mono);font-size:10px;color:var(--teal)">${pat.id} ${pat.name}</b> \u2014 ${pat.trigger}</div><div class="move"><b>Move</b> ${pat.move}</div>`:`<div class="why">Focus: ${p.pat}</div>`}
      <div class="btn-row">
        ${missed?`<button class="btn fixed" data-id="${o.id}">Marked it fixed</button>`:''}
        ${o.st.f?`<button class="btn ghost unflag" data-id="${o.id}">Remove flag</button>`:''}
      </div></div>`;}).join('');
  host.querySelectorAll('.fixed').forEach(b=>b.addEventListener('click',async()=>{await setAtt(b.dataset.id,{r:'got',a:true});renderReview();}));
  host.querySelectorAll('.unflag').forEach(b=>b.addEventListener('click',async()=>{await setAtt(b.dataset.id,{f:false});renderReview();}));
}

/* ===== L6 FLASHCARDS ===== */
function mountFlash(){
  const mount=document.getElementById('flash-mount');
  let order=PATTERNS.map((_,i)=>i),pos=0,flipped=false;
  const card=()=>PATTERNS[order[pos]];
  function paint(){
    const p=card();
    mount.innerHTML=`
      <div class="flash-nav"><span class="count">Card ${pos+1} / ${order.length}</span><button class="btn ghost" id="shuffle">Shuffle</button></div>
      <div class="flash-wrap"><div class="flash ${flipped?'flip':''}" id="flash">
        <div class="face front"><div class="ftag">Trigger — name the pattern</div><div class="ftxt">${p.trigger}</div><div class="tap">tap to flip</div></div>
        <div class="face back"><div class="ftag">${p.id}</div><h4>${p.name}</h4><div class="mv">${p.move}</div><div class="tap">tap to flip back</div></div>
      </div></div>
      <div class="flash-rate"><button class="again" id="again">Didn\u2019t get it</button><button class="good" id="good">Knew it</button></div>`;
    document.getElementById('flash').addEventListener('click',()=>{flipped=!flipped;document.getElementById('flash').classList.toggle('flip');});
    document.getElementById('shuffle').addEventListener('click',()=>{for(let i=order.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[order[i],order[j]]=[order[j],order[i]];}pos=0;flipped=false;paint();});
    document.getElementById('again').addEventListener('click',()=>adv(false));
    document.getElementById('good').addEventListener('click',()=>adv(true));
  }
  async function adv(known){const id=card().id,k=CHAP+'::'+id,cur=getState('flash',k)||{};await setState('flash',k,{known:(cur.known||0)+(known?1:0)});pos=(pos+1)%order.length;flipped=false;paint();}
  paint();
}


function mountExplain(){
  const tabs=document.getElementById('tabs');
  let btn=document.getElementById('tab-explain');
  let panel=document.getElementById('explain');
  if(!EXPLAIN){ if(btn) btn.style.display='none'; if(panel){ panel.classList.remove('on'); panel.innerHTML=''; } return; }
  if(!panel){
    panel=document.createElement('section'); panel.className='panel'; panel.id='explain';
    const anchor=document.getElementById('map');
    if(anchor&&anchor.parentNode) anchor.parentNode.insertBefore(panel,anchor);
    else { const mn=document.querySelector('main'); if(mn) mn.appendChild(panel); }
  }
  panel.innerHTML=EXPLAIN;
  if(!btn){
    btn=document.createElement('button'); btn.id='tab-explain'; btn.dataset.tab='explain';
    btn.innerHTML='<span class="n">READ</span>Explain';
    tabs.insertBefore(btn, tabs.firstChild);
  }
  btn.style.display='';
}

/* ===== CHAPTER LOADING + MODE ===== */
function setMode(ready){
  document.getElementById('tabs').style.display = ready ? '' : 'none';
  document.querySelectorAll('main .panel').forEach(p => {
    if (p.id === 'coming') p.classList.toggle('on', !ready);
    else if (!ready) p.classList.remove('on');
  });
}
function loadChapter(path){
  const c = CONTENT[path], m = findChapter(path);
  CHAP = path;
  EXPLAIN = (c && c.explain) || null;
  if (c){ TAXA=c.taxa; FORMULAE=c.formulae; PATTERNS=c.patterns; GUIDED=c.guided; PRACTICE=c.practice; FIGS=c.figs||{}; PRAC_DOCS=c.pracDocs||null; CUR_TIERS=c.pracTiers||(typeof PRAC_TIERS!=="undefined"?PRAC_TIERS:[{k:"All",l:"All"},{k:"Flag",l:"\u2605 Flagged"}]); }
  document.getElementById('wtitle').textContent = m.chap.name;
  document.getElementById('wsub').textContent =
    m.subjName + ' \u00b7 ' + m.subName + (m.chap.grade ? ('  \u00b7  Class ' + m.chap.grade) : '');
  if (c){
    setMode(true);
    renderMap(); mountFormulae(); mountPatterns(); mountGuided(); mountPractice(); renderReview(); mountFlash(); mountExplain();
    const startTab = EXPLAIN ? 'explain' : 'map';
    document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('on', x.dataset.tab===startTab));
    document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on', p.id===startTab));
  } else {
    setMode(false);
    document.getElementById('coming-name').textContent = m.chap.name;
  }
  window.scrollTo(0,0);
}

/* ===== TOP SELECTOR (Subject -> Topic -> Chapter, cascading) ===== */
let sel = { subj:null, sub:null, chap:null };
function firstReadyChap(subj, sub){
  const r = sub.chapters.find(c => CONTENT[chapPath(subj.id, sub.id, c.id)]);
  return (r || sub.chapters[0]).id;
}
function renderSelectors(){
  const subj = CURRICULUM.find(x=>x.id===sel.subj);
  document.getElementById('sel-subjects').innerHTML = CURRICULUM.map(s =>
    `<button class="selpill ${s.id===sel.subj?'on':''}" data-subj="${s.id}">${s.name}</button>`).join('');
  document.getElementById('sel-subs').innerHTML = subj.subs.map(sb => {
    const r = subReady(subj.id, sb);
    return `<button class="selpill ${sb.id===sel.sub?'on':''} ${r?'':'dim'}" data-sub="${sb.id}">${sb.name}</button>`;
  }).join('');
  const sub = subj.subs.find(x=>x.id===sel.sub);
  document.getElementById('sel-chaps').innerHTML = sub.chapters.map(c => {
    const p = chapPath(subj.id, sub.id, c.id), ready = !!CONTENT[p];
    return `<button class="selpill chap ${c.id===sel.chap?'on':''} ${ready?'ready':'soon'}" data-chap="${c.id}">`
      + `<span class="cn">${c.name}</span>`
      + (c.grade?`<span class="gr">${c.grade}</span>`:'')
      + (ready?'':'<span class="soontag">soon</span>')
      + `</button>`;
  }).join('');
}
function applySelection(){ renderSelectors(); loadChapter(chapPath(sel.subj, sel.sub, sel.chap)); }
function pickSubject(id){
  const subj = CURRICULUM.find(x=>x.id===id);
  sel.subj = id; sel.sub = subj.subs[0].id; sel.chap = firstReadyChap(subj, subj.subs[0]); applySelection();
}
function pickSub(id){
  const subj = CURRICULUM.find(x=>x.id===sel.subj), sub = subj.subs.find(x=>x.id===id);
  sel.sub = id; sel.chap = firstReadyChap(subj, sub); applySelection();
}
function pickChap(id){ sel.chap = id; applySelection(); }

/* ===== PROFILES ===== */
const CUR_KEY = 'patternlab:current';
async function listProfiles(){
  if (!sb) return [];
  try { const { data, error } = await sb.from('profiles').select('id,name').order('created_at'); return error ? [] : (data||[]); }
  catch(e){ return []; }
}
async function createProfile(name){
  const id = name.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || ('u'+Date.now());
  if (sb){ try { await sb.from('profiles').upsert({ id:id, name:name.trim() }, { onConflict:'id' }); } catch(e){} }
  return { id, name:name.trim() };
}
function whoLabel(name){ document.getElementById('who').textContent = name ? ('\u25CF ' + name) : 'Choose profile'; }
async function openProfileModal(){
  const modal = document.getElementById('profile-modal');
  const listEl = document.getElementById('pm-list');
  const profiles = await listProfiles();
  listEl.innerHTML = profiles.length
    ? profiles.map(p=>`<button class="pm-pick" data-id="${p.id}" data-name="${p.name}">${p.name}</button>`).join('')
    : `<div class="pm-empty">${sb?'No profiles yet \u2014 add one below.':'Running in local mode (no sync). Add a name to begin; set up Supabase later for cross-device sync.'}</div>`;
  modal.hidden = false;
}
async function chooseProfile(id, name){
  localStorage.setItem(CUR_KEY, JSON.stringify({id, name}));
  whoLabel(name);
  document.getElementById('profile-modal').hidden = true;
  await loadProfileState(id);
  startApp();
}

/* ===== BOOT ===== */
function startApp(){
  // default landing selection = first ready chapter (Maths > Trigonometry > Functions & Graphs)
  sel.subj = 'maths'; sel.sub = 'trig'; sel.chap = firstReadyChap(CURRICULUM[0], CURRICULUM[0].subs[0]);
  renderSelectors();
  loadChapter(chapPath(sel.subj, sel.sub, sel.chap));
}
function bindOnce(){
  document.getElementById('prac-filter').addEventListener('click', e => {
    const b = e.target.closest('button'); if(!b) return;
    pracFilter = b.dataset.f;
    document.querySelectorAll('#prac-filter button').forEach(x=>x.classList.toggle('on', x===b));
    renderPractice();
  });
  document.getElementById('sel-subjects').addEventListener('click', e => { const b=e.target.closest('[data-subj]'); if(b) pickSubject(b.dataset.subj); });
  document.getElementById('sel-subs').addEventListener('click',     e => { const b=e.target.closest('[data-sub]');  if(b) pickSub(b.dataset.sub); });
  document.getElementById('sel-chaps').addEventListener('click',    e => { const b=e.target.closest('[data-chap]'); if(b){ pickChap(b.dataset.chap); if(window.__closeDrawer) window.__closeDrawer(); } });
  document.getElementById('who').addEventListener('click', openProfileModal);
  document.getElementById('pm-list').addEventListener('click', e => { const b=e.target.closest('.pm-pick'); if(b) chooseProfile(b.dataset.id, b.dataset.name); });
  document.getElementById('pm-create').addEventListener('click', async () => {
    const v = document.getElementById('pm-name').value;
    if (!v.trim()) return;
    const p = await createProfile(v); chooseProfile(p.id, p.name);
  });
  /* ===== Left nav drawer (opened by the ☰ menu button) ===== */
  const menuBtn = document.getElementById('menu-btn');
  const drawer  = document.getElementById('drawer');
  const scrim   = document.getElementById('scrim');
  const dclose  = document.getElementById('drawer-close');
  function openDrawer(){
    if(!drawer) return;
    drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false');
    if(menuBtn) menuBtn.setAttribute('aria-expanded','true');
    if(scrim) scrim.hidden = false;
    document.body.classList.add('drawer-open');
  }
  function closeDrawer(){
    if(!drawer) return;
    drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');
    if(menuBtn) menuBtn.setAttribute('aria-expanded','false');
    if(scrim) scrim.hidden = true;
    document.body.classList.remove('drawer-open');
  }
  window.__closeDrawer = closeDrawer;   // used by the chapter-pick handler above
  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (scrim)   scrim.addEventListener('click', closeDrawer);
  if (dclose)  dclose.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* Manifest modal — now opened from the drawer's Tools section */
  const mmodal = document.getElementById('manifest-modal');
  const mclose = document.getElementById('manifest-close');
  if (mclose && mmodal) mclose.addEventListener('click', () => { mmodal.hidden = true; });
  if (mmodal) mmodal.addEventListener('click', e => { if (e.target === mmodal) mmodal.hidden = true; });

  /* Drawer Tools: Project Manifest + Gap Analysis */
  if (drawer) drawer.addEventListener('click', e => {
    const it = e.target.closest('[data-tool]'); if (!it) return;
    const tool = it.dataset.tool;
    closeDrawer();
    if (tool === 'manifest'){
      mountManifest();
      if (mmodal) mmodal.hidden = false;
    } else if (tool === 'gaps'){
      if (window.GapLog && typeof window.GapLog.open === 'function') window.GapLog.open();
      else alert('Gap Log isn\u2019t loaded. Make sure gaplog.js is included after curriculum.js in index.html, and that the deployed curriculum.js contains the GAPLOG data.');
    }
  });
}

/* ===== Project Manifest ===== */
function mountManifest(){
  const body = document.getElementById('manifest-body');
  if(!body || typeof CHAPTER_META === 'undefined' || !Array.isArray(CHAPTER_META)) return;
  const rows = CHAPTER_META.map(meta => {
    const c = (typeof CONTENT !== 'undefined') ? CONTENT[meta.id] : null;
    if(!c){
      return `<div class="manifest-row pending"><div class="m-meta"><div class="m-when">${meta.created||''}</div><div class="m-where">${meta.grade} \u00b7 ${meta.subject} \u00b7 ${meta.topic}</div><h3>${meta.chapter}</h3><div class="m-sources">Source: ${(meta.sources||[]).join(' + ')}</div></div><div class="m-health"><div class="m-empty">Scaffolded \u2014 not yet populated</div></div></div>`;
    }
    const prac = c.practice || [];
    const t1 = prac.filter(p=>p.tier===1).length;
    const t2 = prac.filter(p=>p.tier===2).length;
    const t3 = prac.filter(p=>p.tier===3).length;
    const mcq = prac.filter(p=>Array.isArray(p.choices)).length;
    const t3Mark = t3 >= 20 ? '<span class="ok">\u2713</span>' : `<span class="warn">\u2717 short ${20-t3}</span>`;
    const pats = c.patterns || [];
    const patsWithText = pats.filter(p=>p.srcText && Object.keys(p.srcText).length).length;
    let pendingEntries = 0, filledEntries = 0;
    pats.forEach(p => {
      if(p.srcText){
        Object.values(p.srcText).forEach(v => {
          if(typeof v === 'string' && v.indexOf('(text pending') >= 0) pendingEntries++;
          else filledEntries++;
        });
      }
    });
    const pct = prac.length ? Math.round(mcq/prac.length*100) : 0;
    return `<div class="manifest-row">
      <div class="m-meta">
        <div class="m-when">${meta.created||''}</div>
        <div class="m-where">${meta.grade} \u00b7 ${meta.subject} \u00b7 ${meta.topic}</div>
        <h3>${meta.chapter}</h3>
        <div class="m-sources">Source: ${(meta.sources||[]).join(' + ')}</div>
      </div>
      <div class="m-health">
        <div class="m-stat"><span class="ml">Practice</span><span class="mv">${prac.length} \u00b7 t1: ${t1} t2: ${t2} t3: ${t3} ${t3Mark}</span></div>
        <div class="m-stat"><span class="ml">MCQ enabled</span><span class="mv">${mcq}/${prac.length} (${pct}%)</span></div>
        <div class="m-stat"><span class="ml">Patterns</span><span class="mv">${pats.length} total \u00b7 ${patsWithText} with srcText${pendingEntries?' \u00b7 '+pendingEntries+' entries pending upload':''}</span></div>
      </div>
    </div>`;
  }).join('');
  body.innerHTML = rows || '<div class="m-empty">No chapters in CHAPTER_META yet.</div>';
}
(async function boot(){
  bindOnce();
  let cur = null; try { cur = JSON.parse(localStorage.getItem(CUR_KEY)); } catch(e){}
  if (cur && cur.id){ whoLabel(cur.name); await loadProfileState(cur.id); startApp(); }
  else { whoLabel(null); openProfileModal(); }
})();
