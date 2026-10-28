const C='fr-v2',F=['./','index.html','styles.css','app.js','manifest.json','apple-touch-icon.png','icon-192.png','icon-512.png','audio/silence.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(e.request.headers.has('range')||e.request.mode==='navigate'||/\.(js|css|html)$/.test(u.pathname)||u.pathname.endsWith('/')){
  // network first for app code so updates arrive; audio range requests go straight to network
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&!e.request.headers.has('range')){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})));return}
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{if(n.ok&&n.status===200&&u.pathname.includes('/audio/')){const c=n.clone();caches.open(C).then(x=>x.put(e.request,c))}return n})))});
