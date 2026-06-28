/* =========================================================================
   gaplog.js — Pattern Lab "Gap Log" (weekly test-miss loop closer)
   SELF-CONTAINED. Load AFTER curriculum.js (which defines `GAPLOG`):
       <script src="curriculum.js"></script>
       <script src="gaplog.js"></script>     <!-- add this one line -->
   It auto-injects a launcher button (⚑ Gaps). To wire your own nav button
   instead, call  window.GapLog.open()  from its click handler.
   Ladder state (chip pick / hints shown / solution / re-done) persists in
   localStorage under "pl.gaplog.<id>" — no Supabase/app.js coupling.
   ========================================================================= */
(function () {
  "use strict";
  if (typeof GAPLOG === "undefined" || !Array.isArray(GAPLOG)) {
    console.warn("[gaplog] GAPLOG array not found — is curriculum.js loaded first?");
    return;
  }
  var LS = "pl.gaplog.";
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function getState(id){ try{return JSON.parse(localStorage.getItem(LS+id))||{};}catch(e){return{};} }
  function setState(id,st){ try{localStorage.setItem(LS+id,JSON.stringify(st));}catch(e){} }

  var FILTER = "all";        // all | new | unresolved | <chapter name>
  var styleInjected = false, overlay = null;

  function injectStyle(){
    if(styleInjected) return; styleInjected = true;
    var css = ""
    + ".gl-ov{position:fixed;inset:0;background:rgba(8,10,16,.72);z-index:9000;display:none;overflow:auto;-webkit-overflow-scrolling:touch;}"
    + ".gl-ov.show{display:block;}"
    + ".gl-wrap{max-width:760px;margin:0 auto;padding:14px 12px 60px;}"
    + ".gl-top{position:sticky;top:0;background:#11141c;border:1px solid #232838;border-radius:14px;padding:12px 14px;margin-bottom:12px;box-shadow:0 6px 24px rgba(0,0,0,.4);}"
    + ".gl-top h2{margin:0 0 2px;font:600 17px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#eef1f8;}"
    + ".gl-sub{font:400 12px/1.4 system-ui;color:#8b93a7;}"
    + ".gl-x{position:absolute;top:10px;right:12px;width:30px;height:30px;border:none;border-radius:8px;background:#1c2130;color:#cfd6e6;font-size:18px;cursor:pointer;}"
    + ".gl-filters{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}"
    + ".gl-f{border:1px solid #2a3142;background:#161b27;color:#aab3c6;font:500 12px system-ui;padding:5px 10px;border-radius:999px;cursor:pointer;}"
    + ".gl-f.on{background:#3b82f6;border-color:#3b82f6;color:#fff;}"
    + ".gl-grp{font:600 12px system-ui;letter-spacing:.04em;text-transform:uppercase;color:#7a8298;margin:16px 4px 8px;}"
    + ".gl-card{background:#11141c;border:1px solid #232838;border-radius:14px;padding:14px;margin-bottom:12px;}"
    + ".gl-h{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px;}"
    + ".gl-badge{font:600 10px system-ui;letter-spacing:.03em;padding:3px 8px;border-radius:999px;text-transform:uppercase;}"
    + ".gl-b-new{background:#3a1d2b;color:#ff8fb0;border:1px solid #5d2b40;}"
    + ".gl-b-exist{background:#15314a;color:#7cc0ff;border:1px solid #1f4d75;}"
    + ".gl-b-type{background:#222838;color:#9aa6bd;border:1px solid #2f374a;}"
    + ".gl-b-done{background:#143524;color:#6ee7a0;border:1px solid #1f5638;}"
    + ".gl-qno{font:700 13px system-ui;color:#eef1f8;margin-right:2px;}"
    + ".gl-meta{font:400 11px system-ui;color:#7a8298;width:100%;}"
    + ".gl-q{font:500 14.5px/1.5 system-ui;color:#e6eaf3;margin:6px 0 10px;white-space:pre-wrap;}"
    + ".gl-pat{font:500 12.5px/1.45 system-ui;color:#cbd3e3;background:#161b27;border:1px solid #232838;border-left:3px solid #3b82f6;border-radius:8px;padding:8px 10px;margin:8px 0;}"
    + ".gl-pat.new{border-left-color:#ff6fa0;}"
    + ".gl-pat b{color:#fff;}"
    + ".gl-why{font:400 12.5px/1.5 system-ui;color:#9aa6bd;margin:6px 0 10px;}"
    + ".gl-np{background:#1a1320;border:1px solid #3a2030;border-radius:10px;padding:10px 12px;margin:8px 0;}"
    + ".gl-np .t{font:700 12px system-ui;color:#ff9cba;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px;}"
    + ".gl-np .r{font:400 12.5px/1.5 system-ui;color:#d7c2cd;margin:3px 0;}"
    + ".gl-np .r b{color:#ffd0df;}"
    + ".gl-lad{margin-top:6px;border-top:1px dashed #2a3142;padding-top:10px;}"
    + ".gl-lq{font:600 12px system-ui;color:#8b93a7;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px;}"
    + ".gl-chip{display:block;width:100%;text-align:left;border:1px solid #2a3142;background:#161b27;color:#d7dce8;font:500 13px/1.4 system-ui;padding:9px 11px;border-radius:9px;margin-bottom:6px;cursor:pointer;}"
    + ".gl-chip:hover{border-color:#3b82f6;}"
    + ".gl-chip.ok{background:#143524;border-color:#2f7d54;color:#aef0c8;}"
    + ".gl-chip.bad{background:#3a1722;border-color:#7d2f45;color:#ffb6c6;}"
    + ".gl-chip .mk{float:right;font-weight:700;}"
    + ".gl-act{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;}"
    + ".gl-btn{border:1px solid #2a3142;background:#1b2130;color:#cfd6e6;font:600 12.5px system-ui;padding:8px 12px;border-radius:9px;cursor:pointer;}"
    + ".gl-btn.p{background:#3b82f6;border-color:#3b82f6;color:#fff;}"
    + ".gl-btn:disabled{opacity:.4;cursor:default;}"
    + ".gl-hint{font:400 13px/1.55 system-ui;color:#d7dce8;background:#161b27;border:1px solid #232838;border-radius:9px;padding:9px 11px;margin-top:7px;}"
    + ".gl-hint .n{color:#7cc0ff;font-weight:700;margin-right:6px;}"
    + ".gl-sol{font:500 13.5px/1.6 system-ui;color:#aef0c8;background:#10231a;border:1px solid #1f5638;border-radius:9px;padding:10px 12px;margin-top:8px;white-space:pre-wrap;}"
    + ".gl-launch{position:fixed;right:14px;bottom:14px;z-index:8000;border:none;border-radius:999px;background:#3b82f6;color:#fff;font:600 13px system-ui;padding:11px 16px;box-shadow:0 6px 20px rgba(59,130,246,.45);cursor:pointer;}"
    + ".gl-empty{color:#7a8298;font:400 13px system-ui;text-align:center;padding:30px 10px;}";
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
    // hints revealed so far
    for (var k=0;k<h;k++){
      html += '<div class="gl-hint"><span class="n">Hint '+(k+1)+'</span>'+esc((L.hints||[])[k]||"")+'</div>';
    }
    html += '<div class="gl-act">';
    if (h < (L.hints||[]).length){
      html += '<button class="gl-btn" data-act="hint" data-id="'+esc(g.id)+'">Reveal hint ('+(h)+'/'+(L.hints||[]).length+')</button>';
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
    return g.chapter === FILTER;   // chapter name
  }

  function render(){
    var chapters = [];
    GAPLOG.forEach(function(g){ if(chapters.indexOf(g.chapter)<0) chapters.push(g.chapter); });
    var open = GAPLOG.filter(function(g){return !getState(g.id).done;}).length;

    var html = '<div class="gl-wrap">';
    html += '<div class="gl-top"><button class="gl-x" data-act="close">×</button>';
    html += '<h2>Gap Log</h2>';
    html += '<div class="gl-sub">'+GAPLOG.length+' logged · '+open+' still to re-do cold · tagged to the chapter each belongs to</div>';
    html += '<div class="gl-filters">';
    html += '<button class="gl-f'+(FILTER==="all"?" on":"")+'" data-act="filter" data-f="all">All</button>';
    html += '<button class="gl-f'+(FILTER==="unresolved"?" on":"")+'" data-act="filter" data-f="unresolved">⚑ Redo-cold</button>';
    html += '<button class="gl-f'+(FILTER==="new"?" on":"")+'" data-act="filter" data-f="new">New patterns</button>';
    chapters.forEach(function(c){
      html += '<button class="gl-f'+(FILTER===c?" on":"")+'" data-act="filter" data-f="'+esc(c)+'">'+esc(c)+'</button>';
    });
    html += '</div></div>';

    // group by chapter (respecting filter)
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
  function open(){ ensureOverlay(); render(); overlay.classList.add("show"); document.body.style.overflow="hidden"; }
  function close(){ if(overlay){ overlay.classList.remove("show"); document.body.style.overflow=""; } }

  function addLauncher(){
    injectStyle();
    if(document.querySelector(".gl-launch")) return;
    var b = document.createElement("button");
    b.className = "gl-launch"; b.type="button";
    var open_n = GAPLOG.filter(function(g){return !getState(g.id).done;}).length;
    b.innerHTML = "⚑ Gaps" + (open_n? ' <span style="background:#fff;color:#3b82f6;border-radius:999px;padding:0 6px;margin-left:4px;font-size:11px;">'+open_n+'</span>' : '');
    b.addEventListener("click", open);
    document.body.appendChild(b);
  }

  // public API + auto-launcher
  window.GapLog = { open: open, close: close, refreshLauncher: function(){ var b=document.querySelector(".gl-launch"); if(b) b.remove(); addLauncher(); } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addLauncher);
  else addLauncher();
})();
