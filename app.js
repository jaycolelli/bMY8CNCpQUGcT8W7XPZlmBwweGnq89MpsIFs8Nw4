/* deadline / ribbon / end card (same as the magazine, visualizer, and order site) */
function $(s){ return document.querySelector(s); }
function esc(s){ return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

var DEADLINE_MS = Date.parse('2026-12-02T18:00:00Z');
function daysLeft(now){
  if(now >= DEADLINE_MS) return -1;
  var fmt = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Phoenix', year:'numeric', month:'2-digit', day:'2-digit'});
  var t0 = Date.parse(fmt.format(new Date(now)) + 'T00:00:00Z');
  var t1 = Date.parse('2026-12-02T00:00:00Z');
  return Math.round((t1 - t0) / 86400000);
}
function countdownLabel(d){ return d>=2 ? d+' days left' : d===1 ? '1 day left' : d===0 ? 'last day' : ''; }

function endCard(){
  var c = String(window.JAY_CONTACT || '').trim(), ch = '';
  if(c){
    ch = /^https?:\/\//i.test(c) ? '<a href="'+esc(c)+'">'+esc(c)+'</a>' : c.indexOf('@')>0 ? '<a href="mailto:'+esc(c)+'">'+esc(c)+'</a>' : esc(c);
    ch = '<p style="margin:14px 0 0;font-size:16px;color:#D4AF5F;word-break:break-word">'+ch+'</p>';
  }
  var e = $('#endcard');
  e.innerHTML = '<div class="bar"></div><div class="k">Preview edition</div><h1>This preview has closed.</h1><p class="p">Want ABC taking delivery requests 24/7, on the web and on the phone, in English and Spanish, with every request waiting on one board in the morning?</p><div class="j">JayCo</div><div class="s">AI Consulting &amp; Services</div><p style="margin:0;font-size:16px;line-height:1.5">Let\'s talk.</p>'+ch;
  e.hidden = false;
  $('#app').hidden = true;
  var v = $('#player');
  if(v){ try{ v.pause(); }catch(_){ } }
}

function tickRibbon(){
  var d = daysLeft(Date.now());
  if(d < 0){ endCard(); return false; }
  var l = countdownLabel(d);
  var el = $('#ribbon-days');
  if(el) el.textContent = l ? ' · ' + l : '';
  return true;
}

if(tickRibbon()){
  setInterval(tickRibbon, 60000);
  var x = $('#ribbon-x');
  if(x) x.onclick = function(){ $('#ribbon').remove(); };
}
