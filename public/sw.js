
const CACHE_NAME = 'ayzgo-driver-v2';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/7c42b02b-c831-4e0f-9d90-c5bea3cb1b4e.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: data.icon || '/lovable-uploads/7c42b02b-c831-4e0f-9d90-c5bea3cb1b4e.png',
      badge: '/lovable-uploads/7c42b02b-c831-4e0f-9d90-c5bea3cb1b4e.png',
      vibrate: [200, 100, 200],
      data: data.data,
      actions: data.actions || [],
      requireInteraction: true,
      tag: 'ayzgo-driver'
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'accept') {
    // Handle job acceptance
    event.waitUntil(
      clients.openWindow('/driver/active-job')
    );
  } else if (event.action === 'view') {
    // Handle view details
    event.waitUntil(
      clients.openWindow('/driver/home')
    );
  } else if (event.action === 'reply') {
    // Handle message reply
    event.waitUntil(
      clients.openWindow('/driver/active-job')
    );
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
