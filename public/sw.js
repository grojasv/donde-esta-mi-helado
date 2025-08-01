// Service Worker for Dónde Está Mi Helado?
// Provides offline functionality and caching for PWA experience

const CACHE_NAME = 'ice-cream-tracker-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache for offline functionality
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/app-icon.svg',
  '/favicon.svg',
  // Add other static assets as needed
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('🍦 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('✅ Service Worker installed successfully');
        // Take control immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker install failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🍦 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip Firebase requests - let them fail gracefully
  if (event.request.url.includes('firebaseio.com') || 
      event.request.url.includes('googleapis.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('📦 Serving from cache:', event.request.url);
          return cachedResponse;
        }
        
        // If not in cache, try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();
            
            // Cache the fetched resource for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.log('🔌 Network request failed, serving offline fallback');
            
            // If request is for a page, serve the main app (SPA behavior)
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
            
            // For other resources, just fail gracefully
            throw error;
          });
      })
  );
});

// Background sync for Firebase data (when connection returns)
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'firebase-sync') {
    event.waitUntil(
      // Notify the main app that we're back online
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: 'SYNC_FIREBASE',
            message: 'Connection restored - syncing with Firebase'
          });
        });
      })
    );
  }
});

// Push notification handling (for future features)
self.addEventListener('push', (event) => {
  console.log('🔔 Push notification received');
  
  const options = {
    body: 'Ice cream flavors updated!',
    icon: '/icons/app-icon.svg',
    badge: '/icons/app-icon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('🍦 Dónde Está Mi Helado?', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    self.clients.openWindow('/')
  );
});

// Message handling from main app
self.addEventListener('message', (event) => {
  console.log('📨 Message received from main app:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'REQUEST_SYNC') {
    // Request background sync when Firebase connection is needed
    self.registration.sync.register('firebase-sync');
  }
});

console.log('🍦 Service Worker script loaded');