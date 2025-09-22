/* app.js — único arquivo de comportamento do site  */
/* Cobre: header shrink, menu hambúrguer (até 1024px), smooth scroll,
   troca automática das avaliações, animações on-scroll e WhatsApp CTA. */

(() => {
  'use strict';

  // ====== Config WhatsApp (usado em vários CTAs) ============================
  const WA_NUMBER = '5561998817667';
  const WA_DEFAULT_MSG = 'Olá, Dra. Camila, gostaria de agendar uma consulta.';

  function openWhatsApp(customMsg) {
    const msg = encodeURIComponent(customMsg || WA_DEFAULT_MSG);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  }

  // ====== Helpers ===========================================================
  function $(sel, ctx = document) { return ctx.querySelector(sel); }
  function $all(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }

  // ====== Init quando DOM estiver pronto ===================================
  document.addEventListener('DOMContentLoaded', () => {
    const header = $('#header');
    const nav = header ? $('.main-nav', header) : null;
    const toggle = header ? $('.menu-toggle', header) : null;
    const mql = window.matchMedia('(max-width: 1024px)'); // hambúrguer até 1024px

    // 1) Header shrink on scroll (classe .scrolled)
    // (Baseado no seu header(rolagem).js) :contentReference[oaicite:0]{index=0}
    const updateHeader = () => {
      if (!header) return;
      const scrolled = window.scrollY > 50;
      header.classList.toggle('scrolled', scrolled);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // 2) Menu hambúrguer (abre/fecha, fecha em link, fora, e ao sair do mobile)
    // (Consolida o menu-mobile.js, ampliando para 1024px) :contentReference[oaicite:1]{index=1}
    function closeMenu() {
      if (!nav || !toggle) return;
      nav.classList.remove('active');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }

    if (toggle && nav && header) {
      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('active');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('menu-open', isOpen);
      });

      // fecha ao clicar num link do menu
      $all('.main-nav a', header).forEach(a => a.addEventListener('click', closeMenu));

      // fecha ao clicar fora
      document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !header.contains(e.target)) closeMenu();
      });

      // se saiu do mobile/tablet, reseta
      mql.addEventListener('change', (e) => { if (!e.matches) closeMenu(); });
    }

    // 3) Smooth scroll para âncoras internas (melhor que o seletor .button do seu script)
    // (Substitui o trecho de scroll de formWpp.js, que usava .button) :contentReference[oaicite:2]{index=2}
    $all('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const headerH = header?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - (headerH + 10);
        window.scrollTo({ top, behavior: 'smooth' });
        if (mql.matches) closeMenu();
      });
    });

    // 4) Troca automática dos grupos de avaliações
    // (Refatora a lógica do formWpp.js — mantive intervalo de 12s) :contentReference[oaicite:3]{index=3}
    const grupos = $all('.avaliacao-group');
    if (grupos.length > 1) {
      let i = grupos.findIndex(g => g.classList.contains('active'));
      if (i < 0) i = 0;
      setInterval(() => {
        grupos[i].classList.remove('active');
        i = (i + 1) % grupos.length;
        grupos[i].classList.add('active');
      }, 12000);
    }

    // 5) Animações on-scroll (IntersectionObserver unificado)
    // (Une o observer de .cartao-info do header(rolagem).js e o de .pilar-card/.chamada-para-acao__conteudo do meumetodoANIMACAO.js)
    // :contentReference[oaicite:4]{index=4} :contentReference[oaicite:5]{index=5}
    const revealSelectors = ['.cartao-info', '.pilar-card', '.chamada-para-acao__conteudo'];
    const revealEls = $all(revealSelectors.join(','));
    revealEls.forEach(el => el.classList.add('oculto'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('surgir', entry.isIntersecting);
      });
    }, { threshold: 0.3 });
    revealEls.forEach(el => io.observe(el));

    // 6) WhatsApp — form e botões “QUERO AGENDAR”
    // (#whatsappForm do btnagendar.js + botões soltos com texto) :contentReference[oaicite:6]{index=6} :contentReference[oaicite:7]{index=7}
    const wppForm = $('#whatsappForm');
    if (wppForm) {
      wppForm.addEventListener('submit', (e) => {
        e.preventDefault();
        openWhatsApp();
      });
    }

    // Botões/links sem href de WA, mas com texto “QUERO AGENDAR” ou data-open-wa
    $all('button, a').forEach(el => {
      const txt = (el.textContent || '').trim().toUpperCase();
      const isCtaText = txt.includes('QUERO AGENDAR');
      const isStandaloneSubmit = el.tagName === 'BUTTON' && el.getAttribute('type') === 'submit' && !el.closest('form');
      const alreadyWA = el.getAttribute('href')?.startsWith('https://wa.me/');
      if ((isCtaText || isStandaloneSubmit || el.hasAttribute('data-open-wa')) && !alreadyWA) {
        el.addEventListener('click', (ev) => {
          ev.preventDefault();
          openWhatsApp();
        });
      }
    });

    // 7) (Opcional) segurança mínima contra erros de import Firebase antigo
    // O seu formWpp.js tentava importar Firebase com bare imports (quebraria sem bundler). Vamos ignorar isso aqui. :contentReference[oaicite:8]{index=8}
  });
})();