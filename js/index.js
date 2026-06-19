// index.js - scroll suave, marcado active en menú y cambio de fondo por sección
(function(){
  const sectionToClass = {
    'inicio':'bg-inicio',
    'ingenieria':'bg-ingenieria',
    'escaneo':'bg-escaneo',
    'modelado':'bg-modelado',
    'bimcad':'bg-modelado',
    'planos':'bg-modelado',
    'automatizacion':'bg-automatizacion',
    'PLC-detail':'bg-automatizacion',
    'hmi':'bg-automatizacion',
    'domotica':'bg-automatizacion',
    'redes':'bg-automatizacion',
    'biomecanica':'bg-biomecanica',
    'quienes':'bg-quienes',
    'soluciones':'bg-soluciones'
  };

  const body = document.body;
  const menuLinks = Array.from(document.querySelectorAll('.cntMenu a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function clearActive(){ menuLinks.forEach(a=>a.classList.remove('active')); }

  // Click en menú: scroll suave y marcar active
  menuLinks.forEach(link=>{
    link.addEventListener('click', e=>{
      const href = link.getAttribute('href');
      if(!href || !href.startsWith('#')) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',`#${id}`);
      }
    });
  });

  // IntersectionObserver para marcar active y cambiar fondo
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        clearActive();
        const link = document.querySelector(`.cntMenu a[href="#${id}"]`);
        if(link) link.classList.add('active');

        // aplicar clase de fondo
        const cls = sectionToClass[id];
        // limpiar clases previas bg-*
        document.body.className = document.body.className.split(' ').filter(c=>!c.startsWith('bg-')).join(' ');
        if(cls) document.body.classList.add(cls);
      }
    });
  }, {root:null, rootMargin:'0px 0px -40% 0px', threshold:0});

  sections.forEach(s=>obs.observe(s));

  // Al cargar con hash, aplicar fondo
  window.addEventListener('load', ()=>{
    const h = location.hash.replace('#','');
    if(h && sectionToClass[h]) document.body.classList.add(sectionToClass[h]);
  });
})();
