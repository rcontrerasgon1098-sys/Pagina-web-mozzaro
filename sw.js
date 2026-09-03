const CACHE_NAME = 'mozzaro-admin-v1';
const ASSETS_TO_CACHE = [
  '/admin.html',
  '/admin-styles.css',
  '/admin-app.js',
  '/manifest.json',
  '/assets/logo_mozzaro.jpeg'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch Assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Handle Background Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '🚨 Mozzaro Admin Alerta';
  const options = {
    body: data.body || 'Tienes un nuevo pedido registrado o entrega pendiente.',
    icon: '/assets/logo_mozzaro.jpeg',
    badge: '/assets/logo_mozzaro.jpeg',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
