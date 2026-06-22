// ── SHARED ADMIN CONSTANTS ────────────────────────────────────────────────────
const WORKER   = 'https://trade-journal-proxy.daniel-mouldd.workers.dev';
const DB_ID    = '5398f956345943b7b12b2298bbb6e127';
const BIAS_DB  = 'c163f7373bb44be19ae4f4a886384ddf';
const WEEKLY_DB= '6d1309c6e6174f489e32293e253ae729';
const VIOLATIONS_DB = 'de631441836340d48d2ecbcbe86fbb94';
const PASS     = 'Pammolad123#';
const TODAY    = new Date().toISOString().split('T')[0];

// ── AUTH ──────────────────────────────────────────────────────────────────────
// Pages call requireAuth() on load. If not authenticated, redirect to hub.
function requireAuth() {
  const authed = sessionStorage.getItem('ftj_admin_auth');
  if (authed !== 'true') {
    window.location.href = 'admin.html';
    return false;
  }
  return true;
}

function setAuth() {
  sessionStorage.setItem('ftj_admin_auth', 'true');
}

function checkPassword(val) {
  return val === PASS;
}

// ── SHARED CALCULATIONS ───────────────────────────────────────────────────────
function calcPnL(entry, exit, contracts, instrument, direction) {
  const tickVal = {'NQ':20,'MNQ':2,'ES':50,'MES':5,'CL':1000,'GC':100,'RTY':50}[instrument] || 20;
  const pts = (direction === 'Short') ? (entry - exit) : (exit - entry);
  return Math.round(pts * contracts * tickVal);
}

function calcRR(entry, sl, tp) {
  if (!entry || !sl || !tp) return null;
  const risk = Math.abs(entry - sl);
  const reward = Math.abs(tp - entry);
  return risk > 0 ? Math.round((reward / risk) * 100) / 100 : null;
}

function calcDuration(entryTime, exitTime) {
  const parse = s => {
    const m = s.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!m) return null;
    let h = parseInt(m[1]), min = parseInt(m[2]);
    const ap = (m[3]||'').toUpperCase();
    if (ap === 'PM' && h < 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    return h * 60 + min;
  };
  const e = parse(entryTime), x = parse(exitTime);
  return (e != null && x != null && x > e) ? x - e : null;
}

// ── SHARED HELPERS ────────────────────────────────────────────────────────────
function getField(id) { return document.getElementById(id)?.value?.trim() || ''; }
function getNum(id)   { const v = parseFloat(document.getElementById(id)?.value); return isNaN(v) ? null : v; }
function getWeekRange() {
  const d = new Date(), day = d.getDay(), diff = d.getDate() - day;
  const start = new Date(d.setDate(diff));
  const end = new Date(start); end.setDate(end.getDate() + 6);
  const fmt = d2 => d2.toISOString().split('T')[0];
  return { start: fmt(start), end: fmt(end) };
}
function wExtractText(rt) { return (rt||[]).map(r=>r.plain_text||'').join(''); }

// ── FALLBACK GRADING (if worker call fails) ───────────────────────────────────
function autoGradeLocal(confluences, mistakes) {
  const hasIFVG=confluences.includes('IFVG'),hasFVG=confluences.includes('FVG'),hasMSS=confluences.includes('MSS'),hasCISD=confluences.includes('CISD'),hasSweep=confluences.includes('Liquidity Sweep')||confluences.includes('BSL Taken')||confluences.includes('SSL Taken'),hasHTF=confluences.includes('HTF PDA Delivery')&&confluences.includes('HTF Trend'),hasKZ=confluences.includes('Kill Zone'),hasSMT=confluences.includes('SMT Divergence'),hasLRLR=confluences.includes('LRLR');
  const m=(mistakes||'').toLowerCase();
  if(['against','no htf','wrong bias','fomo','revenge'].some(w=>m.includes(w))) return 'B-';
  let score=0;
  if(hasIFVG)score+=2;else if(hasFVG)score+=1.5;
  if(hasMSS)score+=2;if(hasCISD)score+=1.5;if(hasSweep)score+=1.5;if(hasHTF)score+=2;if(hasKZ)score+=1.5;if(hasSMT)score+=1;if(hasLRLR)score+=1;if(confluences.length>=10)score+=1;
  if(score>=11&&hasMSS&&hasSweep&&hasIFVG&&hasKZ&&hasHTF) return 'A++';
  if(score>=9&&(hasMSS||hasCISD)) return 'A+';
  if(score>=7) return 'A';
  if(score>=5.5) return 'A-';
  if(score>=4) return 'B+';
  if(score>=3) return 'B';
  return 'B-';
}

function autoFollowedRulesLocal(mistakes) {
  const m=(mistakes||'').toLowerCase();
  if(['against','no htf','wrong bias','no stop','no bias yet','wrong instrument'].some(w=>m.includes(w))) return 'No ❌';
  if(['moved stop','be too early','trail','impatient','fomo','not checking all'].some(w=>m.includes(w))) return 'Partially ⚠️';
  if(m.length>5) return 'Partially ⚠️';
  return 'Yes ✅';
}

// ── SHARED CONFLUENCE DROPDOWN BUILDER ───────────────────────────────────────
const CONFLUENCE_GROUPS = [
  { label: 'Structure', items: ['MSS — Market Structure Shift','Displacement'] },
  { label: 'Entry (PDA Arrays)', items: ['IFVG — Inverse Fair Value Gap','FVG — Fair Value Gap','Order Block','Breaker Block','Mitigation Block','PDA Array'] },
  { label: 'Liquidity', items: ['Liquidity Sweep','BSL Taken','SSL Taken','Equal Highs/Lows'] },
  { label: 'Confluence', items: ['SMT Divergence','HTF PDA Delivery','HTF Trend','Retracement','Clear Targets','Volume','ATH — All Time High','Fib Target (-0.5)'] },
  { label: 'Model', items: ['Market Maker Model','Power of 3','Judas Swing','Kill Zone','NWOG','NDOG','Asian Range','CISD — Change in State of Delivery','LRLR — Low Resistance Liquidity Run'] },
];

// Gets the value from a confluence label (text before the dash)
function confValue(label) { return label.split(' —')[0].trim(); }

function buildConfDropdown(btnId, dropdownId, labelId, tagsId, onChangeFn) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  let html = '';
  CONFLUENCE_GROUPS.forEach(g => {
    html += `<div class="conf-group-lbl">${g.label}</div>`;
    g.items.forEach(item => {
      const val = confValue(item);
      html += `<label class="conf-opt"><input type="checkbox" value="${val}" onchange="${onChangeFn}()"> ${item}</label>`;
    });
  });
  html += `<button class="conf-clear" onclick="clearConf('${dropdownId}','${labelId}','${tagsId}')">✕ Clear</button>`;
  dropdown.innerHTML = html;
}

function updateConfDisplay(dropdownId, labelId, tagsId) {
  const checked = Array.from(document.querySelectorAll(`#${dropdownId} input:checked`)).map(cb=>cb.value);
  const lbl = document.getElementById(labelId);
  const tags = document.getElementById(tagsId);
  if (lbl) lbl.textContent = checked.length ? `${checked.length} selected` : 'Select confluences...';
  if (tags) tags.innerHTML = checked.map(c=>`<span class="conf-tag">${c}</span>`).join('');
  document.querySelectorAll(`#${dropdownId} .conf-opt`).forEach(o=>o.classList.toggle('selected', o.querySelector('input').checked));
}

function clearConf(dropdownId, labelId, tagsId) {
  document.querySelectorAll(`#${dropdownId} input`).forEach(cb=>cb.checked=false);
  updateConfDisplay(dropdownId, labelId, tagsId);
}

function getCheckedConf(dropdownId) {
  return Array.from(document.querySelectorAll(`#${dropdownId} input:checked`)).map(cb=>cb.value);
}

function setCheckedConf(dropdownId, labelId, tagsId, values) {
  document.querySelectorAll(`#${dropdownId} input`).forEach(cb=>{
    cb.checked = values.includes(cb.value);
  });
  updateConfDisplay(dropdownId, labelId, tagsId);
}

// ── SHARED VERIFY CALL ────────────────────────────────────────────────────────
async function verifyTrade(tradeStr) {
  const res = await fetch(`${WORKER}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trade: tradeStr })
  });
  return res.json();
}

// ── SHARED NOTION HELPERS ─────────────────────────────────────────────────────
async function notionGet(path) {
  const res = await fetch(`${WORKER}/notion${path}`, { headers: { 'Content-Type': 'application/json' } });
  return res.json();
}

async function notionPost(path, body) {
  const res = await fetch(`${WORKER}/notion${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

async function notionPatch(path, body) {
  const res = await fetch(`${WORKER}/notion${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}
