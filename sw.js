const CACHE='sw7-contador-v26';
const FILES=['./','./index.html','./manifest.json','./icon-192.png?v=4','./icon-512.png?v=4','./apple-touch-icon.png?v=4','./splash.webp?v=2','./fanfare.mp3?v=2','./iconos/maravilla.webp?v=2','./iconos/monedas.webp?v=2','./iconos/azules.webp?v=2','./iconos/amarillas.webp?v=2','./iconos/ciencia.webp?v=2','./iconos/moradas.webp?v=2','./iconos/militar.webp?v=2','./iconos/flota.webp?v=2','./iconos/isla.webp?v=2','./iconos/naval.webp?v=2','./iconos/negras.webp?v=2','./iconos/deuda.webp?v=2','./iconos/penalizacion.webp?v=2','./iconos/lideres.webp?v=2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('sw7-contador-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
    if(r.ok&&new URL(e.request.url).origin===location.origin){const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c))}
    return r;
  }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
