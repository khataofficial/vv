/* Shared look: mode (light/dark/auto) + any accent colour. Used by store, community and admin. Same keys as My Khata. */
(function(){
var PRE=['#4AA8E8','#2563eb','#0ea5e9','#22c55e','#f59e0b','#f97316','#ef4444','#ec4899','#a855f7','#6366f1','#0f172a','#111111'];
var css='html[data-mode=light]{--bg:color-mix(in srgb,var(--accent) 7%,#fff);--card:#fff;--ink:#0f172a;--soft:#64748b;--line:color-mix(in srgb,var(--accent) 18%,#fff);--chip:color-mix(in srgb,var(--accent) 11%,#fff);color-scheme:light}'+
'html[data-mode=dark]{--bg:color-mix(in srgb,var(--accent) 6%,#0b0f19);--card:color-mix(in srgb,var(--accent) 8%,#131826);--ink:#f1f5f9;--soft:#94a3b8;--line:color-mix(in srgb,var(--accent) 20%,#1c2233);--chip:color-mix(in srgb,var(--accent) 16%,#1c2233);color-scheme:dark}'+
'.kt-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99;display:flex;align-items:flex-end;justify-content:center}.kt-sh{background:var(--card);color:var(--ink);width:100%;max-width:440px;border-radius:22px 22px 0 0;padding:20px 18px calc(20px + env(safe-area-inset-bottom,0px));font:14px/1.4 system-ui,sans-serif}@media(min-width:600px){.kt-ov{align-items:center}.kt-sh{border-radius:22px}}'+
'.kt-sh h3{margin:0 0 4px;font-size:18px}.kt-sh p{margin:0 0 12px;color:var(--soft);font-size:13px}.kt-sh b.l{display:block;margin:14px 0 8px;font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--soft)}'+
'.kt-seg{display:flex;gap:6px}.kt-seg button{flex:1;padding:11px;border:1px solid var(--line);border-radius:12px;background:var(--chip);color:var(--ink);font:inherit;font-weight:700;cursor:pointer}.kt-seg button.on{background:var(--accent);color:var(--on);border-color:var(--accent)}'+
'.kt-g{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.kt-g button{aspect-ratio:1;border-radius:50%;border:3px solid var(--card);box-shadow:0 0 0 1px var(--line);cursor:pointer}.kt-g button.on{box-shadow:0 0 0 3px var(--accent)}'+
'.kt-c{display:flex;gap:10px;align-items:center;margin-top:12px}.kt-c input{width:48px;height:40px;border:0;background:none;padding:0}.kt-x{margin-top:16px;width:100%;padding:12px;border:0;border-radius:12px;background:var(--accent);color:var(--on);font:inherit;font-weight:700;cursor:pointer}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k)||'';localStorage.setItem(k,v);}catch(e){return '';}}
function lum(h){var n=parseInt(h.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255;return(.299*r+.587*g+.114*b)/255;}
var shop='';
function eff(){var m=ls('khata-mode')||'auto',d=m==='dark'||(m==='auto'&&matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches);return d?'dark':'light';}
function apply(){var r=document.documentElement,a=shop||ls('khata-accent')||'#4AA8E8',mode=eff();
 if(!/^#[0-9a-f]{6}$/i.test(a))a='#2563eb';var on='#fff';
 if(mode==='dark'&&lum(a)<.2){a='#f1f5f9';on='#0b0f19';}else if(lum(a)>.78)on='#111';
 r.setAttribute('data-mode',mode);r.style.setProperty('--accent',a);r.style.setProperty('--ac',a);r.style.setProperty('--on',on);}
function save(m,a){if(m)ls('khata-mode',m);if(a!==undefined)ls('khata-accent',a);apply();}
window.KTheme={set:save,PRE:PRE,get:function(){return {mode:ls('khata-mode')||'auto',accent:ls('khata-accent')};},apply:apply,
 accent:function(c){shop=c||'';apply();},
 panel:function(){var o=document.createElement('div');o.className='kt-ov';var t=this.get();
  function paint(){t=KTheme.get();var cur=(t.accent||'#12a08a').toLowerCase();
   o.innerHTML='<div class="kt-sh"><h3>Customize</h3><b class="l">Mode</b><div class="kt-seg">'+[['light','<span data-ic="sun"></span>Light'],['dark','<span data-ic="moon"></span>Dark'],['auto','<span data-ic="smartphone"></span>Auto']].map(function(x){return '<button data-m="'+x[0]+'" class="'+(t.mode===x[0]?'on':'')+'">'+x[1]+'</button>';}).join('')+'</div><b class="l">Colour</b><div class="kt-g">'+PRE.map(function(c){return '<button data-c="'+c+'" style="background:'+c+'" class="'+(c===cur?'on':'')+'" aria-label="'+c+'"></button>';}).join('')+'</div><div class="kt-c"><input type="color" id="ktc" value="'+(/^#[0-9a-f]{6}$/i.test(cur)?cur:'#12a08a')+'"><span>Your own colour</span></div><button class="kt-x" id="ktd">Done</button></div>';}
  paint();document.body.appendChild(o);
  o.onclick=function(e){if(e.target===o||e.target.id==='ktd'){o.remove();return;}var b=e.target.closest('[data-m]');if(b){save(b.getAttribute('data-m'));paint();return;}b=e.target.closest('[data-c]');if(b){save(null,b.getAttribute('data-c'));paint();}};
  o.oninput=function(e){if(e.target.id==='ktc')save(null,e.target.value);};}};
apply();
})();
