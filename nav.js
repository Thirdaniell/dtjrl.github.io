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

    <a
      href="https://www.youtube.com/@DTJRL"
      target="_blank"
      rel="noopener"
      class="nav-yt"
      title="YouTube"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#ff0000">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.05 0 12 0 12s0 3.95.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.47 20.5 12 20.5 12 20.5s7.53 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.95 24 12 24 12s0-3.95-.5-5.81zM9.75 15.52V8.48L15.86 12l-6.11 3.52z"/>
      </svg>
    </a>

    <button
      class="nav-theme-btn"
      id="nav-theme-btn"
      onclick="navToggleTheme()"
      title="Toggle Theme"
    >
      ☀
    </button>

    <div
      class="nav-status"
      id="nav-live"
      ondblclick="navAdminAccess()"
      title="Admin Access"
    >
      LIVE
    </div>

  </div>

</nav>
`;

const NAV_CSS = `

html,
body{
  overflow-x:hidden;
}

body{
  padding-left:64px;
  transition:background .2s,color .2s;
}

/* SIDENAV */

.sidenav{
  position:fixed;
  left:0;
  top:0;
  bottom:0;

  width:64px;

  background:#0a0a0a;
  border-right:1px solid #1a1a1a;

  display:flex;
  flex-direction:column;
  align-items:center;

  padding:1.5rem 0 1rem;

  z-index:9999;

  height:100dvh;

  box-sizing:border-box;

  backdrop-filter:blur(10px);
}

/* LOGO */

.nav-logo{
  font-family:'Space Mono', monospace;
  font-size:9px;
  letter-spacing:.1em;
  color:#c8ff00;

  writing-mode:vertical-rl;
  text-orientation:mixed;

  margin-bottom:2rem;

  flex-shrink:0;
}

/* LINKS */

.nav-links{
  display:flex;
  flex-direction:column;
  gap:4px;

  width:100%;
  align-items:center;
}

.nav-link{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  gap:4px;

  width:100%;

  padding:12px 8px;

  text-decoration:none;

  color:#444;

  transition:
    color .15s,
    background .15s,
    transform .15s;

  position:relative;

  min-height:48px;
}

.nav-link:hover{
  color:#c8ff00;
  background:rgba(255,255,255,.02);
}

.nav-link.active{
  color:#c8ff00;
}

.nav-link.active::before{
  content:'';

  position:absolute;

  left:0;
  top:50%;

  transform:translateY(-50%);

  width:2px;
  height:24px;

  background:#c8ff00;
}

.nav-icon{
  font-size:16px;
  line-height:1;
}

.nav-label{
  font-family:'Space Mono', monospace;
  font-size:8px;
  letter-spacing:.08em;
  text-transform:uppercase;
}

/* BOTTOM BUTTONS */

.nav-bottom{
  display:flex;
  flex-direction:column;
  align-items:center;

  gap:14px;

  margin-top:17.5rem;

  padding-bottom:1rem;

  flex-shrink:0;
}

.nav-yt,
.nav-theme-btn,
.nav-status{
  opacity:.7;

  transition:
    opacity .15s,
    transform .15s;
}

.nav-yt:hover,
.nav-theme-btn:hover,
.nav-status:hover{
  opacity:1;
  transform:translateY(-1px);
}

/* YOUTUBE */

.nav-yt{
  display:flex;
  align-items:center;
  justify-content:center;
}

/* THEME BUTTON */

.nav-theme-btn{
  background:none;
  border:none;

  font-size:14px;

  cursor:pointer;

  color:var(--text3,#444);

  padding:0;

  line-height:1;
}

.nav-theme-btn:hover{
  color:var(--accent,#c8ff00);
}

/* LIVE */

.nav-status{
  font-family:'Space Mono', monospace;
  font-size:8px;
  letter-spacing:.15em;

  color:#00e676;

  writing-mode:vertical-rl;

  animation:pulse 2s infinite;

  cursor:pointer;
}

@keyframes pulse{
  0%,100%{opacity:1}
  50%{opacity:.3}
}

/* LIGHT MODE */

body.light{
  --bg:#f4f4f4;
  --surface:#ffffff;
  --surface2:#ececec;
  --border:#e0e0e0;
  --border2:#cccccc;
  --text:#111111;
  --text2:#555555;
  --text3:#999999;
}

body.light .sidenav{
  background:#ffffff;
  border-right-color:#e0e0e0;
}

body.light .nav-link{
  color:#999;
}

body.light .nav-link:hover,
body.light .nav-link.active{
  color:#111;
}

body.light .nav-link.active::before{
  background:#111;
}

body.light .nav-logo{
  color:#111;
}

/* MOBILE */

@media (max-width:600px){

  body{
    padding-left:0 !important;
    padding-bottom:calc(64px + env(safe-area-inset-bottom));
  }

  .sidenav{
    top:auto;
    bottom:0;
    left:0;
    right:0;

    width:100%;

    height:64px;

    flex-direction:row;

    border-right:none;
    border-top:1px solid #1a1a1a;

    padding:
      0
      max(1rem, env(safe-area-inset-left))
      env(safe-area-inset-bottom)
      max(1rem, env(safe-area-inset-left));

    backdrop-filter:blur(18px);

    overflow:hidden;
  }

  .nav-logo{
    display:none !important;
  }

  .nav-bottom{
    display:none !important;
  }

  .nav-links{
    flex-direction:row !important;

    gap:0 !important;

    width:100%;

    justify-content:space-around;
    align-items:center;
  }

  .nav-link{
    flex:1;

    min-width:0;

    padding:8px 4px !important;

    gap:3px;

    height:100%;
  }

  .nav-link.active::before{
    top:0 !important;
    left:50% !important;

    transform:translateX(-50%) !important;

    width:24px !important;
    height:2px !important;
  }

  .nav-icon{
    font-size:15px;
  }

  .nav-label{
    font-size:7px;
  }
}
`;

function initNav(activePage){

  if(document.querySelector('.sidenav')) return;

  const style = document.createElement('style');
  style.textContent = NAV_CSS;

  document.head.appendChild(style);

  const div = document.createElement('div');
  div.innerHTML = NAV_HTML;

  document.body.insertBefore(
    div.firstElementChild,
    document.body.firstChild
  );

  document.querySelectorAll('.nav-link').forEach(link => {
    if(link.dataset.page === activePage){
      link.classList.add('active');
    }
  });

  // Load saved theme

  if(localStorage.getItem('ftj-theme') === 'light'){

    document.body.classList.add('light');

    const btn = document.getElementById('nav-theme-btn');

    if(btn){
      btn.textContent = '☾';
    }
  }
}

function navToggleTheme(){

  document.body.classList.toggle('light');

  const isLight = document.body.classList.contains('light');

  localStorage.setItem(
    'ftj-theme',
    isLight ? 'light' : 'dark'
  );

  const btn = document.getElementById('nav-theme-btn');

  if(btn){
    btn.textContent = isLight ? '☾' : '☀';
  }
}

function navAdminAccess(){
  window.location.href = 'admin.html';
}
