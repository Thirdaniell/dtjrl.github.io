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
  </div>
  <div class="nav-bottom">
    <div class="nav-status">LIVE</div>
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
    padding: 1.5rem 0;
    z-index: 200;
  }
  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.1em;
    color: #c8ff00;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    margin-bottom: 2rem;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }
  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 8px;
    text-decoration: none;
    color: #444;
    transition: color 0.15s;
    position: relative;
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
  body { padding-left: 64px; }
  @media (max-width: 600px) {
    .sidenav {
      top: auto; bottom: 0; left: 0; right: 0;
      width: 100%; height: 56px;
      flex-direction: row;
      border-right: none;
      border-top: 1px solid #1a1a1a;
      padding: 0 1rem;
    }
    .nav-logo, .nav-bottom { display: none; }
    .nav-links { flex-direction: row; gap: 0; flex: 1; justify-content: space-around; }
    .nav-link { flex-direction: column; padding: 8px 16px; }
    .nav-link.active::before { top: 0; left: 50%; transform: translateX(-50%); width: 24px; height: 2px; }
    body { padding-left: 0; padding-bottom: 56px; }
  }
`;

function initNav(activePage) {
  const style = document.createElement('style');
  style.textContent = NAV_CSS;
  document.head.appendChild(style);
  const div = document.createElement('div');
  div.innerHTML = NAV_HTML;
  document.body.insertBefore(div.firstElementChild, document.body.firstChild);
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === activePage) link.classList.add('active');
  });
}
