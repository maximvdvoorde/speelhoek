// Speelhoek service worker: keeps the menu page (every game is inside it) on the device, so it also works offline.
// build.py fills in VERSION from the page's content, so every rebuild installs a fresh copy and drops the old one.
const VERSION='__VERSION__', CACHE='speelhoek-'+VERSION;
const FILES=['./','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('speelhoek-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET'||new URL(req.url).origin!==location.origin) return;
  if(req.mode==='navigate'){
    // The menu page: try the network for a few seconds (to pick up new games), otherwise use the saved copy.
    // no-cache: always ask GitHub Pages, instead of reusing the browser's copy for its 10-minute max-age.
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      const net=fetch(req,{cache:'no-cache'}).then(r=>{ if(r.ok) cache.put('./',r.clone()); return r; });
      net.catch(()=>{});
      const saved=await cache.match('./');
      if(!saved) return net;
      try{ return await Promise.race([net,new Promise((_,fail)=>setTimeout(fail,3000))]); }
      catch(err){ return saved; }
    })());
    return;
  }
  // Icons and the manifest: saved copy first.
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(r=>r||fetch(req)));
});
