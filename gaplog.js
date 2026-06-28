/* =========================================================================
   gaplog.js — Pattern Lab "Gap Log" (weekly test-miss loop closer)
   SELF-CONTAINED. Load AFTER curriculum.js (which defines `GAPLOG`):
       <script src="curriculum.js"></script>
       <script src="gaplog.js"></script>
       <script src="app.js"></script>
   Launched from the left drawer's "Gap Analysis" item via window.GapLog.open().
   (No floating button.) Styling matches the app's light theme via CSS tokens.
   Per-entry ladder state {oi,h,s,done} persists in localStorage under
   "pl.gaplog.<id>" — no Supabase / app.js coupling.
   ========================================================================= */
(function () {
  "use strict";
  function gaplogReady(){ try { return typeof GAPLOG !== "undefined" && Array.isArray(GAPLOG); } catch(e){ return false; } }
  var LS = "pl.gaplog.";
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function getState(id){ try{return JSON.parse(localStorage.getItem(LS+id))||{};}catch(e){return{};} }
  function setState(id,st){ try{localStorage.setItem(LS+id,JSON.stringify(st));}catch(e){} }

  var FILTER = "all";        // all | new | unresolved | <chapter name>
  var styleInjected = false, overlay = null;

  function injectStyle(){
    if(styleInjected) return; styleInjected = true;
    var css = ""
    + ".gl-ov{position:fixed;inset:0;z-index:9000;background:rgba(22,36,46,.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);display:none;overflow:auto;-webkit-overflow-scrolling:touch;}"
    + ".gl-ov.show{display:block;}"
    + ".gl-wrap{max-width:760px;margin:0 auto;padding:16px 14px 64px;font-family:var(--body,'Inter',system-ui,sans-serif);}"
    + ".gl-top{position:sticky;top:0;z-index:2;background:var(--paper,#fff);border:1px solid var(--line,#dde4e2);border-radius:16px;padding:14px 16px;margin-bottom:14px;box-shadow:0 10px 30px rgba(22,36,46,.18);}"
    + ".gl-top h2{margin:0 0 2px;font-family:var(--disp,'Space Grotesk',sans-serif);font-weight:600;font-size:19px;color:var(--ink,#16242e);}"
    + ".gl-sub{font-size:12px;line-height:1.45;color:var(--ink-soft,#42525d);}"
    + ".gl-x{position:absolute;top:12px;right:14px;width:30px;height:30px;border:none;border-radius:8px;background:none;color:var(--ink-faint,#7d8c95);font-size:23px;line-height:1;cursor:pointer;}"
    + ".gl-x:hover{color:var(--ink,#16242e);background:#f0f4f3;}"
    + ".gl-filters{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px;}"
    + ".gl-f{font-family:var(--body,sans-serif);font-size:12px;font-weight:500;border:1px solid var(--line,#dde4e2);background:var(--mist,#e8edeb);color:var(--ink-soft,#42525d);padding:5px 11px;border-radius:20px;cursor:pointer;}"
    + ".gl-f:hover{border-color:var(--teal,#0f766e);color:var(--teal,#0f766e);}"
    + ".gl-f.on{background:var(--teal,#0f766e);border-color:var(--teal,#0f766e);color:#fff;}"
    + ".gl-grp{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-faint,#7d8c95);margin:18px 4px 9px;font-weight:600;}"
    + ".gl-card{background:var(--paper,#fff);border:1px solid var(--line,#dde4e2);border-radius:16px;padding:15px;margin-bottom:13px;box-shadow:0 1px 2px rgba(22,36,46,.05),0 6px 18px rgba(22,36,46,.05);}"
    + ".gl-h{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:9px;}"
    + ".gl-badge{font-family:var(--mono,monospace);font-size:9.5px;font-weight:600;letter-spacing:.03em;padding:3px 8px;border-radius:20px;text-transform:uppercase;}"
    + ".gl-b-new{background:var(--coral-soft,#fbe9e4);color:var(--coral,#bf4d36);border:1px solid #efc9bf;}"
    + ".gl-b-exist{background:var(--teal-soft,#e3f1ef);color:var(--teal,#0f766e);border:1px solid #bfe0db;}"
    + ".gl-b-type{background:var(--mist,#e8edeb);color:var(--ink-soft,#42525d);border:1px solid var(--line,#dde4e2);}"
    + ".gl-b-done{background:#eaf6ef;color:var(--green,#2f8f63);border:1px solid #bfe3cd;}"
    + ".gl-qno{font-family:var(--disp,sans-serif);font-weight:700;font-size:13px;color:var(--ink,#16242e);margin-right:2px;}"
    + ".gl-meta{font-family:var(--mono,monospace);font-size:10.5px;color:var(--ink-faint,#7d8c95);width:100%;}"
    + ".gl-q{font-size:14.5px;line-height:1.55;color:var(--ink,#16242e);margin:6px 0 11px;white-space:pre-wrap;}"
    + ".gl-pat{font-size:12.5px;line-height:1.45;color:var(--ink-soft,#42525d);background:var(--mist,#e8edeb);border:1px solid var(--line,#dde4e2);border-left:3px solid var(--teal,#0f766e);border-radius:9px;padding:8px 11px;margin:8px 0;}"
    + ".gl-pat.new{border-left-color:var(--coral,#bf4d36);}"
    + ".gl-pat b{color:var(--ink,#16242e);}"
    + ".gl-why{font-size:12.5px;line-height:1.5;color:var(--ink-soft,#42525d);margin:6px 0 10px;}"
    + ".gl-why b{color:var(--ink,#16242e);}"
    + ".gl-np{background:#fdf6f3;border:1px solid #f1d7cd;border-radius:11px;padding:11px 13px;margin:9px 0;}"
    + ".gl-np .t{font-family:var(--mono,monospace);font-size:10px;font-weight:600;color:var(--coral,#bf4d36);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;}"
    + ".gl-np .r{font-size:12.5px;line-height:1.5;color:var(--ink-soft,#42525d);margin:3px 0;}"
    + ".gl-np .r b{color:var(--ink,#16242e);}"
    + ".gl-lad{margin-top:8px;border-top:1px dashed var(--line,#dde4e2);padding-top:11px;}"
    + ".gl-lq{font-family:var(--mono,monospace);font-size:10.5px;font-weight:600;color:var(--ink-faint,#7d8c95);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px;}"
    + ".gl-chip{display:block;width:100%;text-align:left;border:1px solid var(--line,#dde4e2);background:var(--paper,#fff);color:var(--ink,#16242e);font-family:var(--body,sans-serif);font-size:13.5px;line-height:1.4;padding:10px 12px;border-radius:10px;margin-bottom:7px;cursor:pointer;transition:border-color .12s,background .12s;}"
    + ".gl-chip:hover{border-color:var(--teal,#0f766e);}"
    + ".gl-chip.ok{background:#eaf6ef;border-color:var(--green,#2f8f63);color:#1f6b46;}"
    + ".gl-chip.bad{background:var(--coral-soft,#fbe9e4);border-color:var(--coral,#bf4d36);color:#8f3826;}"
    + ".gl-chip .mk{float:right;font-weight:700;}"
    + ".gl-act{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px;}"
    + ".gl-btn{font-family:var(--disp,sans-serif);font-weight:600;font-size:12.5px;border:1px solid var(--line,#dde4e2);background:var(--paper,#fff);color:var(--ink-soft,#42525d);padding:8px 13px;border-radius:10px;cursor:pointer;transition:.12s;}"
    + ".gl-btn:hover{border-color:var(--teal,#0f766e);color:var(--teal,#0f766e);}"
    + ".gl-btn.p{background:var(--teal,#0f766e);border-color:var(--teal,#0f766e);color:#fff;}"
    + ".gl-btn.p:hover{background:#0c655e;color:#fff;}"
    + ".gl-hint{font-size:13px;line-height:1.55;color:var(--ink,#16242e);background:var(--mist,#e8edeb);border:1px solid var(--line,#dde4e2);border-radius:10px;padding:9px 12px;margin-top:8px;}"
    + ".gl-hint .n{font-family:var(--mono,monospace);color:var(--teal,#0f766e);font-weight:700;margin-right:6px;}"
    + ".gl-sol{font-size:13.5px;line-height:1.6;color:var(--ink,#16242e);background:#eaf6ef;border:1px solid #bfe3cd;border-radius:10px;padding:10px 13px;margin-top:9px;white-space:pre-wrap;}"
    + ".gl-sol::before{content:'Solution';display:block;font-family:var(--mono,monospace);font-size:9.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--green,#2f8f63);margin-bottom:4px;}"
    + ".gl-empty{color:var(--ink-faint,#7d8c95);font-size:13px;text-align:center;padding:34px 10px;}";
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  }

  function ladderHTML(g){
    var st = getState(g.id), L = g.ladder || {chip:[],hints:[],correct:0,solution:""};
    var picked = (typeof st.oi === "number");
    var h = st.h || 0, sol = !!st.s;
    var html = '<div class="gl-lad"><div class="gl-lq">Which move fits?</div>';
    (L.chip||[]).forEach(function(opt,i){
      var cls = "gl-chip", mk = "";
      if (picked){
        if (i === L.correct){ cls += " ok"; mk = '<span class="mk">✓</span>'; }
        else if (i === st.oi){ cls += " bad"; mk = '<span class="mk">✕</span>'; }
      }
      html += '<button class="'+cls+'" data-act="chip" data-id="'+esc(g.id)+'" data-i="'+i+'"'+(picked?' disabled':'')+'>'+esc(opt)+mk+'</button>';
    });
    for (var k=0;k<h;k++){
      html += '<div class="gl-hint"><span class="n">Hint '+(k+1)+'</span>'+esc((L.hints||[])[k]||"")+'</div>';
    }
    html += '<div class="gl-act">';
    if (h < (L.hints||[]).length){
      html += '<button class="gl-btn" data-act="hint" data-id="'+esc(g.id)+'">Reveal hint ('+h+'/'+(L.hints||[]).length+')</button>';
    }
    if (!sol){
      html += '<button class="gl-btn p" data-act="sol" data-id="'+esc(g.id)+'">Show solution</button>';
    }
    html += '<button class="gl-btn" data-act="done" data-id="'+esc(g.id)+'">'+(st.done?"✓ Re-done":"Mark re-done")+'</button>';
    html += '<button class="gl-btn" data-act="reset" data-id="'+esc(g.id)+'">↺ Reset</button>';
    html += '</div>';
    if (sol){ html += '<div class="gl-sol">'+esc(L.solution)+'</div>'; }
    html += '</div>';
    return html;
  }

  function cardHTML(g){
    var st = getState(g.id);
    var isNew = g.diagnosis === "new";
    var html = '<div class="gl-card">';
    html += '<div class="gl-h">';
    html += '<span class="gl-qno">'+esc(g.qno||"")+'</span>';
    html += '<span class="gl-badge '+(isNew?'gl-b-new':'gl-b-exist')+'">'+(isNew?'new pattern':'existing pattern')+'</span>';
    if (g.type) html += '<span class="gl-badge gl-b-type">'+esc(g.type)+'</span>';
    if (st.done) html += '<span class="gl-badge gl-b-done">re-done</span>';
    html += '<span class="gl-meta">'+esc(g.test||"")+' · '+esc(g.date||"")+'</span>';
    html += '</div>';
    html += '<div class="gl-q">'+esc(g.qtext)+'</div>';
    html += '<div class="gl-pat'+(isNew?' new':'')+'"><b>'+(isNew?'Missing move':'Maps to')+':</b> '+esc(g.pat||"")+'</div>';
    if (g.whyMissed) html += '<div class="gl-why"><b>Why it slipped:</b> '+esc(g.whyMissed)+'</div>';
    if (isNew && g.newPattern){
      var np = g.newPattern;
      html += '<div class="gl-np"><div class="t">Proposed new pattern card</div>';
      html += '<div class="r"><b>'+esc(np.name)+'</b></div>';
      if(np.trigger) html += '<div class="r"><b>Trigger:</b> '+esc(np.trigger)+'</div>';
      if(np.move)    html += '<div class="r"><b>Move:</b> '+esc(np.move)+'</div>';
      if(np.why)     html += '<div class="r"><b>Why:</b> '+esc(np.why)+'</div>';
      if(np.fails)   html += '<div class="r"><b>Fails:</b> '+esc(np.fails)+'</div>';
      html += '</div>';
    }
    html += ladderHTML(g);
    html += '</div>';
    return html;
  }

  function passesFilter(g){
    var st = getState(g.id);
    if (FILTER === "all") return true;
    if (FILTER === "new") return g.diagnosis === "new";
    if (FILTER === "unresolved") return !st.done;
    return g.chapter === FILTER;
  }

  function render(){
    var chapters = [];
    GAPLOG.forEach(function(g){ if(chapters.indexOf(g.chapter)<0) chapters.push(g.chapter); });
    var open = GAPLOG.filter(function(g){return !getState(g.id).done;}).length;

    var html = '<div class="gl-wrap">';
    html += '<div class="gl-top"><button class="gl-x" data-act="close" aria-label="Close">×</button>';
    html += '<h2>Gap Log</h2>';
    html += '<div class="gl-sub">'+GAPLOG.length+' logged · '+open+' still to re-do cold · each tagged to the chapter it belongs to</div>';
    html += '<div class="gl-filters">';
    html += '<button class="gl-f'+(FILTER==="all"?" on":"")+'" data-act="filter" data-f="all">All</button>';
    html += '<button class="gl-f'+(FILTER==="unresolved"?" on":"")+'" data-act="filter" data-f="unresolved">⚑ Redo-cold</button>';
    html += '<button class="gl-f'+(FILTER==="new"?" on":"")+'" data-act="filter" data-f="new">New patterns</button>';
    chapters.forEach(function(c){
      html += '<button class="gl-f'+(FILTER===c?" on":"")+'" data-act="filter" data-f="'+esc(c)+'">'+esc(c)+'</button>';
    });
    html += '</div></div>';

    var shown = 0;
    chapters.forEach(function(c){
      var items = GAPLOG.filter(function(g){return g.chapter===c && passesFilter(g);});
      if(!items.length) return;
      shown += items.length;
      html += '<div class="gl-grp">'+esc(c)+' · '+items.length+'</div>';
      items.forEach(function(g){ html += cardHTML(g); });
    });
    if(!shown) html += '<div class="gl-empty">Nothing matches this filter.</div>';
    html += '</div>';
    overlay.innerHTML = html;
  }

  function onClick(e){
    var t = e.target.closest("[data-act]"); if(!t) return;
    var act = t.getAttribute("data-act"), id = t.getAttribute("data-id");
    if (act === "close"){ close(); return; }
    if (act === "filter"){ FILTER = t.getAttribute("data-f"); render(); overlay.scrollTop = 0; return; }
    if (!id) return;
    var st = getState(id);
    if (act === "chip"){ if(typeof st.oi!=="number"){ st.oi = parseInt(t.getAttribute("data-i"),10); setState(id,st);} }
    else if (act === "hint"){ var g=GAPLOG.find(function(x){return x.id===id;}); var max=(g.ladder.hints||[]).length; st.h=Math.min((st.h||0)+1,max); setState(id,st); }
    else if (act === "sol"){ st.s = true; setState(id,st); }
    else if (act === "done"){ st.done = !st.done; setState(id,st); }
    else if (act === "reset"){ setState(id,{}); }
    render();
  }

  function ensureOverlay(){
    injectStyle();
    if(overlay) return;
    overlay = document.createElement("div");
    overlay.className = "gl-ov";
    overlay.addEventListener("click", function(e){ if(e.target===overlay) close(); });
    overlay.addEventListener("click", onClick);
    document.body.appendChild(overlay);
  }
  function open(){
    if(!gaplogReady()){ console.warn("[gaplog] open() called but GAPLOG isn't loaded yet."); alert("Gap Log data not loaded yet — ensure the updated curriculum.js (with GAPLOG) is deployed and loaded before gaplog.js."); return; }
    ensureOverlay(); render(); overlay.classList.add("show"); document.body.style.overflow="hidden";
  }
  function close(){ if(overlay){ overlay.classList.remove("show"); document.body.style.overflow=""; } }

  // public API — the left drawer's "Gap Analysis" item calls window.GapLog.open()
  window.GapLog = { open: open, close: close };

  function ready(){
    if (gaplogReady()){ console.log("[gaplog] ready — " + GAPLOG.length + " entries. Open via the drawer → Gap Analysis (or window.GapLog.open())."); }
  }
  function waitReady(tries){
    if (gaplogReady()) return ready();
    if (tries <= 0){ console.warn("[gaplog] GAPLOG not found. Check: (1) deploy the NEW curriculum.js containing GAPLOG; (2) load it BEFORE gaplog.js; (3) hard-refresh to clear the GitHub Pages cache."); return; }
    setTimeout(function(){ waitReady(tries-1); }, 150);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ waitReady(20); });
  else waitReady(20);
})();
