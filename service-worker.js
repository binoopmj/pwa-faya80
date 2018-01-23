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
    "url": "images/banner-port80.jpg",
    "revision": "76e9aa1ac0b0bcd98358199e1615b313"
  },
  {
    "url": "images/port80-bg.jpg",
    "revision": "481548fc975196deaaeb7b513cf27a50"
  },
  {
    "url": "offline.html",
    "revision": "ecdbe72129512617e600bc9169de4f74"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "a0c58d4a374c823d95e2025d5445a9bd"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "e8b014581f911b6bb3a1ae12221633d2"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "4d25bc46c061f5445d4ac7a85e2e835b"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "9110d6f620343f120bbc62428300b049"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "f9604402c9b326f14829b60684285c61"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "19d31ff2fc6237b33604ce463987f878"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "99033fcd13df3a1bc600f5c3d20d07a1"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "d6ca7f1a710a152f5868dc0b9f1ca6b5"
  }
]);

self.addEventListener('install', (event) => {
  const urls = [
    'https://cdn.ampproject.org/v0.js',
    'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
    'https://cdn.ampproject.org/shadow-v0.js',
    'index.amp.html',
    '/'
  ];
  const cacheName = workboxSW.runtimeCacheName;
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});
//Cache visited pages
workboxSW.router.registerRoute(/(.*)((index.amp|\/articles\/)(.*)html)|(.*)\/$/, args => {
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