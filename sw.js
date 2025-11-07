// ATHENEA AUDIT SYSTEM - NÚCLEO DE RESILIENCIA (Service Worker)
// Principios: FE, HONOR, VERDAD.
// Versión del Protocolo: 2.0.0

const CACHE_NAME = 'athenea-cache-v2';

// Activos soberanos: Se incluyen los recursos críticos de la CDN
// para garantizar la autonomía operativa del protocolo.
const ASSETS_TO_CACHE = [
  // --- Protocolo Base ---
  '/',
  '/index.html',
  '/index.tsx', // El punto de entrada del sistema
  '/src/app.component.css',
  '/src/assets/logo.svg',
  'manifest.json',

  // --- Dependencias de la Red de Distribución Cuántica (CDN) ---
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/rxjs@^7.8.2?conditions=es2015',
  'https://aistudiocdn.com/rxjs@^7.8.2/operators?conditions=es2015',
  'https://next.esm.sh/@angular/platform-browser@^20.3.10?external=rxjs',
  'https://next.esm.sh/@angular/common@^20.3.10?external=rxjs',
  'https://next.esm.sh/@angular/common@^20.3.10/http?external=rxjs',
  'https://next.esm.sh/@angular/core@^20.3.10?external=rxjs',
  'https://next.esm.sh/@google/genai@^1.29.0?external=rxjs',
  'https://next.esm.sh/@angular/compiler@^20.3.10?external=rxjs',
  'https://next.esm.sh/@angular/forms@^20.3.10?external=rxjs'
];


// Fase de Instalación: Se sella la caché con los activos soberanos.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('ATHENEA: Núcleo de Resiliencia v2 instalado. Sellando caché soberana...');
        // Se utiliza 'addAll' que es atómico. Si un recurso falla, la instalación falla.
        // Esto garantiza la integridad de la caché.
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(err => {
        console.error('ATHENEA: Fallo crítico al sellar la caché soberana. El núcleo podría estar inestable.', err);
      })
  );
});

// Fase de Activación: Se purgan las cachés antiguas para mantener la integridad.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('ATHENEA: Purgando caché obsoleta:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Tomar control inmediato de las páginas para que los clientes
      // no necesiten recargar para activar el nuevo Service Worker.
      return self.clients.claim();
    })
  );
});

// Fase de Interceptación (Fetch): Estrategia "Cache First, then Network".
// Se sirve desde la caché para garantizar la soberanía operativa y la velocidad.
self.addEventListener('fetch', (event) => {
  // Solo se aplica el protocolo de caché a las peticiones GET.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si el recurso existe en la caché, se sirve inmediatamente.
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está en caché, se busca en la red.
        return fetch(event.request).then(
          (networkResponse) => {
            // No se almacenan en caché las respuestas que no son exitosas (ej. 404, 500).
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              // Excepción para recursos de CDN que pueden ser 'cors'.
              if (networkResponse.type === 'cors' && networkResponse.status === 200) {
                 // No se cachean dinámicamente para evitar llenar la caché con dependencias no listadas.
                 return networkResponse;
              }
              return networkResponse;
            }
            return networkResponse;
          }
        );
      })
  );
});