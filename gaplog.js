/* =========================================================================
   gaplog.js — Pattern Lab "Gap Log" (weekly test-miss loop closer)
   SELF-CONTAINED. Load AFTER curriculum.js (which defines `GAPLOG`):
       <script src="curriculum.js"></script>
       <script src="gaplog.js"></script>
       <script src="app.js"></script>
   Opens as a FULL PAGE (opaque) from the left drawer's "Gap Analysis" item via
   window.GapLog.open(). Top app-bar has a ‹ Back button (returns to the app) and
   a Test-date filter; entries flow under each date, grouped by chapter.
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

  var DATEF = "all";     // "all" | a specific date string
  var STATUSF = "all";   // "all" | "unresolved" | "new"
  var styleInjected = false, overlay = null;

  var MON = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  function parseDate(s){ var p=String(s||"").trim().split(/\s+/); if(p.length<3) return 0; var mo=MON[p[1]]!=null?MON[p[1]]:0; return new Date(+p[2],mo,+p[0]).getTime()||0; }
  function distinctDates(){ var seen={},arr=[]; GAPLOG.forEach(function(g){ if(!seen[g.date]){seen[g.date]=1;arr.push(g.date);} }); arr.sort(function(a,b){return parseDate(b)-parseDate(a);}); return arr; }
  function passesStatus(g){ if(STATUSF==="new") return g.diagnosis==="new"; if(STATUSF==="unresolved") return !getState(g.id).done; return true; }

  function injectStyle(){
    if(styleInjected) return; styleInjected = true;
    var css = ""
    + ".gl-ov{position:fixed;inset:0;z-index:9000;background:var(--mist,#e8edeb);display:none;overflow:auto;-webkit-overflow-scrolling:touch;font-family:var(--body,'Inter',system-ui,sans-serif);}"
    + ".gl-ov.show{display:block;}"
    + ".gl-page{max-width:760px;margin:0 auto;padding:0 0 64px;}"
    /* sticky app-bar */
    + ".gl-bar{position:sticky;top:0;z-index:3;background:var(--ink,#16242e);color:#fff;display:flex;align-items:center;gap:12px;padding:12px 14px;}"
    + ".gl-back{flex:none;font-family:var(--body,sans-serif);font-size:13px;font-weight:600;color:#cfe6e2;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:20px;padding:7px 13px 7px 10px;cursor:pointer;display:inline-flex;align-items:center;gap:3px;}"
    + ".gl-back:hover{background:rgba(255,255,255,.24);color:#fff;}"
    + ".gl-bar-t h2{margin:0;font-family:var(--disp,'Space Grotesk',sans-serif);font-weight:600;font-size:17px;color:#fff;line-height:1.1;}"
    + ".gl-bar-t .gl-sub{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.03em;color:#9fc3bd;margin-top:2px;}"
    /* filter rows */
    + ".gl-filters{background:var(--paper,#fff);border-bottom:1px solid var(--line,#dde4e2);position:sticky;top:53px;z-index:2;padding:11px 14px 9px;}"
    + ".gl-frow{display:flex;align-items:center;gap:8px;}"
    + ".gl-frow + .gl-frow{margin-top:8px;}"
    + ".gl-flabel{flex:none;width:64px;font-family:var(--mono,monospace);font-size:9px;letter-spacing:.07em;text-transform:uppercase;color:var(--ink-faint,#7d8c95);}"
    + ".gl-chips{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none;}"
    + ".gl-chips::-webkit-scrollbar{display:none;}"
    + ".gl-f{flex:none;font-family:var(--body,sans-serif);font-size:12px;font-weight:500;border:1px solid var(--line,#dde4e2);background:var(--mist,#e8edeb);color:var(--ink-soft,#42525d);padding:5px 12px;border-radius:20px;cursor:pointer;white-space:nowrap;}"
    + ".gl-f:hover{border-color:var(--teal,#0f766e);color:var(--teal,#0f766e);}"
    + ".gl-f.on{background:var(--teal,#0f766e);border-color:var(--teal,#0f766e);color:#fff;}"
    /* body */
    + ".gl-body{padding:14px;}"
    + ".gl-dhead{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin:20px 2px 10px;padding-bottom:7px;border-bottom:2px solid var(--teal,#0f766e);}"
    + ".gl-dhead:first-child{margin-top:4px;}"
    + ".gl-ddate{font-family:var(--disp,sans-serif);font-weight:600;font-size:15px;color:var(--ink,#16242e);}"
    + ".gl-dtest{font-family:var(--mono,monospace);font-size:10.5px;color:var(--ink-faint,#7d8c95);}"
    + ".gl-dcount{margin-left:auto;font-family:var(--mono,monospace);font-size:10px;font-weight:600;color:var(--teal,#0f766e);background:var(--teal-soft,#e3f1ef);border-radius:20px;padding:2px 9px;}"
    + ".gl-grp{font-family:var(--mono,monospace);font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-faint,#7d8c95);margin:14px 4px 9px;font-weight:600;}"
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
    + ".gl-empty{color:var(--ink-faint,#7d8c95);font-size:13px;text-align:center;padding:40px 10px;}";
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
    html += '<span class="gl-meta">'+esc(g.test||"")+'</span>';
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

  function fchip(on, act, val, label){ return '<button class="gl-f'+(on?" on":"")+'" data-act="'+act+'" data-f="'+esc(val)+'">'+esc(label)+'</button>'; }

  function render(){
    var dates = distinctDates();
    var openN = GAPLOG.filter(function(g){return !getState(g.id).done;}).length;

    var html = '<div class="gl-page">';
    // app bar
    html += '<div class="gl-bar">';
    html += '<button class="gl-back" data-act="close" aria-label="Back to app">‹ Back</button>';
    html += '<div class="gl-bar-t"><h2>Gap Analysis</h2><div class="gl-sub">'+GAPLOG.length+' logged · '+openN+' to re-do cold</div></div>';
    html += '</div>';
    // filters
    html += '<div class="gl-filters">';
    html += '<div class="gl-frow"><span class="gl-flabel">Test date</span><div class="gl-chips">';
    html += fchip(DATEF==="all","datef","all","All dates");
    dates.forEach(function(d){ html += fchip(DATEF===d,"datef",d,d); });
    html += '</div></div>';
    html += '<div class="gl-frow"><span class="gl-flabel">Show</span><div class="gl-chips">';
    html += fchip(STATUSF==="all","statusf","all","All");
    html += fchip(STATUSF==="unresolved","statusf","unresolved","⚑ Redo-cold");
    html += fchip(STATUSF==="new","statusf","new","New patterns");
    html += '</div></div>';
    html += '</div>';
    // body — group by date (newest first), then by chapter
    html += '<div class="gl-body">';
    var datesToShow = (DATEF==="all") ? dates : [DATEF];
    var shown = 0;
    datesToShow.forEach(function(d){
      var inDate = GAPLOG.filter(function(g){ return g.date===d && passesStatus(g); });
      if(!inDate.length) return;
      shown += inDate.length;
      var tests = {}; inDate.forEach(function(g){ tests[g.test]=1; }); var tk = Object.keys(tests);
      html += '<div class="gl-dhead"><span class="gl-ddate">'+esc(d)+'</span>'
            + (tk.length===1?'<span class="gl-dtest">'+esc(tk[0])+'</span>':'')
            + '<span class="gl-dcount">'+inDate.length+'</span></div>';
      var chapters=[]; inDate.forEach(function(g){ if(chapters.indexOf(g.chapter)<0) chapters.push(g.chapter); });
      chapters.forEach(function(c){
        var items = inDate.filter(function(g){ return g.chapter===c; });
        html += '<div class="gl-grp">'+esc(c)+' · '+items.length+'</div>';
        items.forEach(function(g){ html += cardHTML(g); });
      });
    });
    if(!shown) html += '<div class="gl-empty">Nothing matches this filter.</div>';
    html += '</div></div>';
    overlay.innerHTML = html;
  }

  function onClick(e){
    var t = e.target.closest("[data-act]"); if(!t) return;
    var act = t.getAttribute("data-act"), id = t.getAttribute("data-id");
    if (act === "close"){ close(); return; }
    if (act === "datef"){ DATEF = t.getAttribute("data-f"); render(); overlay.scrollTop = 0; return; }
    if (act === "statusf"){ STATUSF = t.getAttribute("data-f"); render(); overlay.scrollTop = 0; return; }
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
    overlay.addEventListener("click", onClick);   // page (opaque) — Back button is the only exit, no click-outside
    document.body.appendChild(overlay);
  }
  function open(){
    if(!gaplogReady()){ console.warn("[gaplog] open() called but GAPLOG isn't loaded yet."); alert("Gap Log data not loaded yet — ensure the updated curriculum.js (with GAPLOG) is deployed and loaded before gaplog.js."); return; }
    DATEF = "all"; STATUSF = "all";
    ensureOverlay(); render(); overlay.classList.add("show"); overlay.scrollTop = 0; document.body.style.overflow="hidden";
  }
  function close(){ if(overlay){ overlay.classList.remove("show"); document.body.style.overflow=""; } }

  // public API — the left drawer's "Gap Analysis" item calls window.GapLog.open()
  window.GapLog = { open: open, close: close };

  function ready(){ if (gaplogReady()){ console.log("[gaplog] ready — " + GAPLOG.length + " entries across " + distinctDates().length + " test date(s). Open via drawer → Gap Analysis."); } }
  function waitReady(tries){
    if (gaplogReady()) return ready();
    if (tries <= 0){ console.warn("[gaplog] GAPLOG not found. Check: (1) deploy the NEW curriculum.js containing GAPLOG; (2) load it BEFORE gaplog.js; (3) hard-refresh to clear the GitHub Pages cache."); return; }
    setTimeout(function(){ waitReady(tries-1); }, 150);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ waitReady(20); });
  else waitReady(20);
})();
