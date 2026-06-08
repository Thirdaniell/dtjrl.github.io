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
      <svg viewBox="0 0 24 24" width="18" height="18" fill="#ff0000">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.05 0 12 0 12s0 3.95.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.47 20.5 12 20.5 12 20.5s7.53 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.95 24 12 24 12s0-3.95-.5-5.81zM9.75 15.52V8.48L15.86 12l-6.11 3.52z"/>
      </svg>
    </a>

    <button class="nav-theme-btn" id="nav-theme-btn" onclick="navToggleTheme()" title="Toggle light/dark mode">
      ☀
    </button>

    <div class="nav-status" id="nav-live" ondblclick="navAdminAccess()" style="cursor:default;">
      LIVE
    </div>
  </div>
</nav>
`;

const NAV_CSS = `
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
  padding:1.5rem 0 1rem 0;
  z-index:200;
  min-height:100vh;
  height:100%;
  box-sizing:border-box;
}

.nav-logo{
  font-family:'Space Mono',monospace;
  font-size:9px;
  letter-spacing:0.1em;
  color:#c8ff00;
  writing-mode:vertical-rl;
  text-orientation:mixed;
  margin-bottom:2rem;
}

.nav-links{
  display:flex;
  flex-direction:column;
  gap:4px;
  flex:1;
  width:100%;
}

.nav-link{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:4px;
  padding:12px 8px;
  width:100%;
  text-decoration:none;
  color:#444;
  transition:color .15s;
  position:relative;
  box-sizing:border-box;
}

.nav-link:hover,
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
  font-family:'Space Mono',monospace;
  font-size:8px;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.nav-bottom{
  margin-top:auto;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:14px;
  width:100%;
  padding-bottom:24px;
}

.nav-yt,
.nav-theme-btn,
.nav-status{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
}

.nav-yt{
  opacity:.55;
  transition:opacity .15s;
}

.nav-yt:hover{
  opacity:1;
}

.nav-theme-btn{
  background:none;
  border:none;
  font-size:14px;
  cursor:pointer;
  color:var(--text3,#444);
  transition:color .15s;
  padding:0;
  line-height:1;
}

.nav-theme-btn:hover{
  color:var(--accent,#c8ff00);
}

.nav-status{
  font-family:'Space Mono',monospace;
  font-size:8px;
  letter-spacing:.15em;
  color:#00e676;
  writing-mode:vertical-rl;
  animation:pulse 2s infinite;
}

@keyframes pulse{
  0%,100%{opacity:1}
  50%{opacity:.3}
}

body{
  padding-left:64px;
  transition:background .2s,color .2s;
}

body.light{
  --bg:#f4f4f4;
  --surface:#ffffff;
  --surface2:#ececec;
  --border:#e0e0e0;
  --border2:#cccccc;
  --text:#111111;
  --text2:#555555;
  --text3:#999999;
  --red-dim:rgba(220,38,38,.08);
  --green-dim:rgba(0,180,80,.08);
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

@media (max-width:600px){

  .sidenav{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    top:auto;
    width:100%;
    height:60px!important;
    min-height:60px!important;
    max-height:60px!important;
    background:#0a0a0a;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    border-right:none;
    border-top:1px solid #1a1a1a;
    padding:0;
    overflow:hidden;
    z-index:9999;
  }

  .nav-logo{
    display:none!important;
  }

  .nav-bottom{
    display:none!important;
  }

  .nav-yt,
  .nav-theme-btn,
  .nav-status{
    display:none!important;
  }

  .nav-links{
    width:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-around;
    gap:0;
    flex:unset;
  }

  .nav-link{
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:8px 0!important;
    min-width:0;
    min-height:60px;
    box-sizing:border-box;
  }

  .nav-link.active::before{
    content:'';
    position:absolute;
    top:0!important;
    left:50%!important;
    transform:translateX(-50%)!important;
    width:24px!important;
    height:2px!important;
    background:#c8ff00;
  }

  .nav-icon{
    font-size:14px;
  }

  .nav-label{
    font-size:7px;
  }

  body{
    padding-left:0!important;
    padding-bottom:60px!important;
  }
}
`;

function initNav(activePage){
  const style=document.createElement('style');
  style.textContent=NAV_CSS;
  document.head.appendChild(style);

  const div=document.createElement('div');
  div.innerHTML=NAV_HTML;

  document.body.insertBefore(div.firstElementChild,document.body.firstChild);

  document.querySelectorAll('.nav-link').forEach(link=>{
    if(link.dataset.page===activePage){
      link.classList.add('active');
    }
  });

  if(localStorage.getItem('ftj-theme')==='light'){
    document.body.classList.add('light');

    const btn=document.getElementById('nav-theme-btn');

    if(btn){
      btn.textContent='☾';
    }
  }
}

function navToggleTheme(){
  document.body.classList.toggle('light');

  const isLight=document.body.classList.contains('light');

  localStorage.setItem('ftj-theme',isLight?'light':'dark');

  const btn=document.getElementById('nav-theme-btn');

  if(btn){
    btn.textContent=isLight?'☾':'☀';
  }
}

function navAdminAccess(){
  window.location.href='admin/admin.html';
}
