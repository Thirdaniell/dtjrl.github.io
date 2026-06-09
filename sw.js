const CACHE = 'ftj-v2';
const STATIC = [
  '/dtjrl.github.io/',
  '/dtjrl.github.io/index.html',
  '/dtjrl.github.io/admin.html',
  '/dtjrl.github.io/checklist.html',
  '/dtjrl.github.io/rules.html',
  '/dtjrl.github.io/info.html',
  '/dtjrl.github.io/analytics.html',
  '/dtjrl.github.io/nav.js',
  '/dtjrl.github.io/mobile.css',
  '/dtjrl.github.io/icon-192.png',
  '/dtjrl.github.io/icon-512.png',
  '/dtjrl.github.io/admin/admin.html',
  '/dtjrl.github.io/admin/admin-core.js',
  '/dtjrl.github.io/admin/log-trade.html',
  '/dtjrl.github.io/admin/edit-trade.html',
  '/dtjrl.github.io/admin/bias.html',
  '/dtjrl.github.io/admin/weekly.html',
  '/dtjrl.github.io/admin/premarket.html',
  'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap'
];

// Install — cache static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache first for static, network first for Notion/Worker API calls
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Always go network for API calls (Notion, Worker)
  if (
    url.hostname.includes('workers.dev') ||
    url.hostname.includes('notion.com') ||
    url.hostname.includes('api.notion')
  ) {
    e.respondWith(fetch(e.request));
    return;
  }

  // Network-first for HTML and JS — always get latest, fall back to cache offline
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.js') || url.pathname === '/dtjrl.github.io/') {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Offline — serve from cache, fallback to index.html for navigation
        return caches.match(e.request).then(cached => {
          if (cached) return cached;
          if (e.request.mode === 'navigate') return caches.match('/dtjrl.github.io/index.html');
        });
      })
    );
    return;
  }

  // Cache-first for everything else (images, fonts, CSS)
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      });
    })
  );
});
