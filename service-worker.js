/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

importScripts('workbox-sw.dev.v2.0.0.js');

const workboxSW = new self.WorkboxSW();
workboxSW.precache([
  {
    "url": "images/ai.jpg",
    "revision": "da971af664aa9fcc87289c850cc8614b"
  },
  {
    "url": "images/js.jpg",
    "revision": "f51f650dfe69858b7be3a2afdecf1a4f"
  },
  {
    "url": "offline.html",
    "revision": "ecdbe72129512617e600bc9169de4f74"
  }
]);

self.addEventListener('install', (event) => {
  const urls = [
    'https://cdn.ampproject.org/v0.js',
    'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
    'https://cdn.ampproject.org/shadow-v0.js'
  ];
  const cacheName = workboxSW.runtimeCacheName;
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});
//Cache visited pages
workboxSW.router.registerRoute(/(.*)\/articles\/(.*)html/, args => {
  return workboxSW.strategies.networkFirst().handle(args).then(response => {
    if (!response) {
      return caches.match('offline.html');
    }
    return response;
  });
});

workboxSW.router.registerRoute(/(.*)\.(?:js|css|png|gif|jpg|svg)/,
  workboxSW.strategies.cacheFirst()
);
//Add a route for the AMP runtime
workboxSW.router.registerRoute(/(.*)cdn\.ampproject\.org(.*)/,
  workboxSW.strategies.staleWhileRevalidate()
);