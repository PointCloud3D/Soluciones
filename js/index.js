// index.js - manejo de menú, scroll suave, marcado active y cambio de fondo por sección
(function () {
  // Mapeo: id de sección -> clase de fondo en body
  const sectionToClass = {
    'ingenieria': 'bg-ingenieria',
    'escaneo': 'bg-escaneo',
    'modelado': 'bg-modelado',
    'bimcad': 'bg-modelado',
    'planos': 'bg-modelado',
    'automatizacion': 'bg-automatizacion',
    'PLC-detail': 'bg-automatizacion',
    'hmi': 'bg-automatizacion',
    'domotica': 'bg-automatizacion',
    'redes': 'bg-automatizacion',
    'biomecanica': 'bg-biomecanica',
    'quienes': 'bg-quienes',
    'soluciones': 'bg-soluciones'
  };

  const body = document.body;
  const menuLinks = Array.from(document.querySelectorAll('.cntMenu a[data-target]'));
  const sections = Array.from(document.querySelectorAll('section[id]'));

  function clearActive() {
    menuLinks.forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.dropdownMenu .optionMenu').forEach(el => el.classList.remove('active'));
  }

  // Click en menú: scroll suave y marcar active
  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetId = href.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearActive();
        this.classList.add('active');
        const parentKey = this.dataset.parent;
        if (parentKey) {
          const parentLink = document.querySelector(`.cntMenu [data-target="${parentKey}"]`);
          if (parentLink) parentLink.classList.add('active');
        }
        history.replaceState(null, '', `#${targetId}`);
      }
    });
  });

  // IntersectionObserver para detectar sección visible y marcar menú + cambiar fondo
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        // marcar menú
        clearActive();
        const link = document.querySelector(`.cntMenu a[href="#${id}"], .cntMenu a[data-target="${id}"]`);
        if (link) {
          link.classList.add('active');
          const parentKey = link.dataset.parent;
          if (parentKey) {
            const parentLink = document.querySelector(`.cntMenu [data-target="${parentKey}"]`);
            if (parentLink) parentLink.classList.add('active');
          }
        } else {
          // fallback: si la sección es PLC-detail, marcar automatizacion
          if (id === 'PLC-detail') {
            const parentLink = document.querySelector(`.cntMenu [data-target="automatizacion"]`);
            if (parentLink) parentLink.classList.add('active');
            const plcLink = document.querySelector(`.cntMenu a[data-target="PLC-detail"]`);
            if (plcLink) plcLink.classList.add('active');
          }
        }

        // cambiar fondo
        const cls = sectionToClass[id] || null;
        if (cls) {
          // limpiar clases previas
          Object.values(sectionToClass).forEach(c => body.classList.remove(c));
          body.classList.add(cls);
        }
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // Al cargar, si hay hash, marcar el enlace correspondiente y aplicar fondo
  window.addEventListener('load', () => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      const link = document.querySelector(`.cntMenu a[href="#${hash}"], .cntMenu a[data-target="${hash}"]`);
      if (link) {
        clearActive();
        link.classList.add('active');
        const parentKey = link.dataset.parent;
        if (parentKey) {
          const parentLink = document.querySelector(`.cntMenu [data-target="${parentKey}"]`);
          if (parentLink) parentLink.classList.add('active');
        }
      }
      // aplicar fondo si corresponde
      const cls = sectionToClass[hash];
      if (cls) {
        Object.values(sectionToClass).forEach(c => body.classList.remove(c));
        body.classList.add(cls);
      }
    }
  });

  // Pequeña mejora: cerrar menú móvil al hacer click (si implementás menú móvil)
  document.addEventListener('click', (e) => {
    const icon = document.getElementById('iconMenu');
    if (!icon) return;
    if (e.target === icon) {
      document.getElementById('cntMenu').classList.toggle('hiddenMenu');
    }
  });
})();
