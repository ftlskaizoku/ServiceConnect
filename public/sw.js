const CACHE_NAME = 'serviceconnect-v1';
const STATIC_ASSETS = [
  '/',
  '/client/',
  '/provider/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install: cache static assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network-first for API/navigation, cache-first for assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Cache-first for static assets (fonts, images, icons)
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.match(/\.(png|jpg|svg|ico|webp|woff2?)$/)
  ) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      }))
    );
    return;
  }

  // Network-first for pages
  event.respondWith(
    fetch(request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request).then(cached => {
        if (cached) return cached;
        // Offline fallback for navigation
        if (request.mode === 'navigate') return caches.match('/');
        return new Response('Hors ligne', { status: 503 });
      }))
  );
});

// Background sync notification
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
