.nav-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  /* move everything slightly higher */
  padding-bottom: 22px;

  /* match width/alignment of nav links */
  width: 100%;
}

.nav-yt,
.nav-theme-btn,
.nav-status {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-yt {
  opacity: 0.55;
  transition: opacity 0.15s;
}

.nav-yt:hover {
  opacity: 1;
}

.nav-theme-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: var(--text3, #444);
  transition: color 0.15s;
  padding: 0;
  line-height: 1;
}

.nav-theme-btn:hover {
  color: var(--accent, #c8ff00);
}

.nav-status {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.15em;
  color: #00e676;
  writing-mode: vertical-rl;
  animation: pulse 2s infinite;
}
