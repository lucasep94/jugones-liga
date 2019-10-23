var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    '/app.js',
    '/main.app.js'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function (event) {
    // Perform install steps
    event.waitUntil(self.clients.claim());
});

// Respond with cached resources
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) { // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url)
                return request
            } else { // if there are no cache, try fetching request
                console.log('file is not cached, fetching : ' + e.request.url)
                return fetch(e.request)
            }

            // You can omit if/else for console.log & put one line below like this too.
            // return request || fetch(e.request)
        })
    )
})