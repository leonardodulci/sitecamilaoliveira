(function () {
  const header   = document.getElementById('header');
  const toggle   = header.querySelector('.menu-toggle');
  const nav      = header.querySelector('.main-nav');
  const links    = header.querySelectorAll('.main-nav a');
  const mqMobile = window.matchMedia('(max-width: 768px)');

  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('active');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    nav.classList.add('active');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  // Fecha ao clicar em qualquer link do menu
  links.forEach(a => a.addEventListener('click', closeMenu));

  // Fecha ao clicar fora do header
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !header.contains(e.target)) {
      closeMenu();
    }
  });

  // Se sair do mobile, garante reset
  mqMobile.addEventListener('change', (e) => { if (!e.matches) closeMenu(); });
})();