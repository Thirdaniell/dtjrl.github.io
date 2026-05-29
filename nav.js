// Shared nav — injected into each page
const NAV_HTML = `
<nav class="sidenav">
  <div class="nav-logo">// FTJ</div>
  <div class="nav-links">
    <a href="index.html" class="nav-link" data-page="index">
      <span class="nav-icon">◈</span>
      <span class="nav-label">Journal</span>
    </a>
    <a href="rules.html" class="nav-link" data-page="rules">
      <span class="nav-icon">◉</span>
      <span class="nav-label">Rules</span>
    </a>
    <a href="analytics.html" class="nav-link" data-page="analytics">
      <span class="nav-icon">◐</span>
      <span class="nav-label">Analytics</span>
    </a>
    <a href="info.html" class="nav-link" data-page="info">
      <span class="nav-icon">◎</span>
      <span class="nav-label">Guide</span>
    </a>
    <a href="checklist.html" class="nav-link" data-page="checklist">
      <span class="nav-icon">◻</span>
      <span class="nav-label">Check</span>
    </a>
  </div>
  <div class="nav-bottom">
    <a href="https://www.youtube.com/@DTJRL" target="_blank" rel="noopener" class="nav-yt">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#ff0000"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.05 0 12 0 12s0 3.95.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.47 20.5 12 20.5 12 20.5s7.53 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.95 24 12 24 12s0-3.95-.5-5.81zM9.75 15.52V8.48L15.86 12l-6.11 3.52z"/></svg>
    </a>
    <button class="nav-theme-btn" id="nav-theme-btn" onclick="navToggleTheme()" title="Toggle light/dark mode">☀</button>
    <div class="nav-status" id="nav-live" ondblclick="navAdminAccess()" title="" style="cursor:default;">LIVE</div>
  </div>
</nav>`;

const NAV_CSS = `
  .sidenav {
    position: fixed;
    left: 0; top: 0; bottom: 0;
    width: 64px;
    background: #0a0a0a;
    border-right: 1px solid #1a1a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem 0 0.75rem 0;
    z-index: 200;
    height: 100vh;
    box-sizing: border-box;
  }
  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    color: #c8ff00;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    margin-bottom: 1.25rem;
    flex-shrink: 0;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0;
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    width: 100%;
    align-items: center;
  }
  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 9px 8px;
    text-decoration: none;
    color: #555;
    transition: color 0.15s;
    position: relative;
    width: 100%;
  }
  .nav-link:hover, .nav-link.active { color: #c8ff00; }
  .nav-link.active::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    transform: translateY(-50%);
    width: 2px; height: 24px;
    background: #c8ff00;
  }
  .nav-icon { font-size: 16px; line-height: 1; }
  .nav-label {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .nav-bottom {
    margin-top: auto;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding-top: 10px;
    border-top: 1px solid #1a1a1a;
    width: 100%;
    padding-bottom: 4px;
  }
  .nav-status {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 0.15em;
    color: #00e676;
    writing-mode: vertical-rl;
    animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .nav-yt {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    transition: opacity 0.15s;
  }
  .nav-yt:hover { opacity: 1; }
  .nav-theme-btn {
    background: none;
    border: none;
    font-size: 14px;
    cursor: pointer;
    color: #444;
    transition: color 0.15s;
    padding: 0;
    line-height: 1;
  }
  .nav-theme-btn:hover { color: #c8ff00; }
  body { padding-left: 64px; transition: background 0.2s, color 0.2s; }
  body.light {
    --bg: #f4f4f4;
    --surface: #ffffff;
    --surface2: #ececec;
    --border: #e0e0e0;
    --border2: #cccccc;
    --text: #111111;
    --text2: #555555;
    --text3: #999999;
    --red-dim: rgba(220,38,38,0.08);
    --green-dim: rgba(0,180,80,0.08);
  }
  body.light .sidenav { background: #ffffff; border-right-color: #e0e0e0; }
  body.light .nav-link { color: #999; }
  body.light .nav-link:hover, body.light .nav-link.active { color: #111; }
  body.light .nav-link.active::before { background: #111; }
  body.light .nav-logo { color: #111; }
  body.light .nav-bottom { border-top-color: #e0e0e0; }
  @media (max-width: 768px) {
    .sidenav {
      top: auto; bottom: 0; left: 0; right: 0;
      width: 100%; height: 56px;
      flex-direction: row;
      border-right: none;
      border-top: 1px solid #1a1a1a;
      padding: 0;
    }
    .nav-logo { display: none !important; }
    .nav-bottom { display: none !important; }
    .nav-links { flex-direction: row !important; gap: 0 !important; flex: 1 !important; justify-content: space-around !important; align-items: center !important; width: 100% !important; overflow: visible !important; }
    .nav-link { flex-direction: column !important; padding: 8px 10px !important; min-width: 44px !important; justify-content: center !important; }
    .nav-link.active::before { top: 0 !important; left: 50% !important; transform: translateX(-50%) !important; width: 24px !important; height: 2px !important; }
    body { padding-left: 0 !important; padding-bottom: 56px !important; }
  }
`;

function initNav(activePage) {
  if (document.querySelector('.sidenav')) return;
  const style = document.createElement('style');
  style.textContent = NAV_CSS;
  document.head.appendChild(style);
  const div = document.createElement('div');
  div.innerHTML = NAV_HTML;
  document.body.insertBefore(div.firstElementChild, document.body.firstChild);
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === activePage) link.classList.add('active');
  });
  if (localStorage.getItem('ftj-theme') === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('nav-theme-btn');
    if (btn) btn.textContent = '☾';
  }
}

function navToggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('ftj-theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('nav-theme-btn');
  if (btn) btn.textContent = isLight ? '☾' : '☀';
}

function navAdminAccess() {
  window.location.href = 'admin.html';
}
