// =============================================
//  LARISSA SANTOS — TERAPEUTA
//  script.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR: scroll behavior ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---- HAMBURGUER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Fecha ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  /* ---- ANIMAÇÕES DE SCROLL (IntersectionObserver) ---- */
  // Adiciona classes de animação aos elementos
  const animTargets = [
    { selector: '.highlight-card',     cls: 'fade-in' },
    { selector: '.sobre-image-wrap',   cls: 'fade-in-left' },
    { selector: '.sobre-content',      cls: 'fade-in-right' },
    { selector: '.servico-card',       cls: 'fade-in' },
    { selector: '.depo-card',          cls: 'fade-in' },
    { selector: '.contato-info',       cls: 'fade-in-left' },
    { selector: '.contato-form-wrap',  cls: 'fade-in-right' },
    { selector: '.section-header',     cls: 'fade-in' },
  ];

  animTargets.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add(cls);
    });
  });

  // Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay por índice dentro do pai
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  /* ---- SMOOTH SCROLL para âncoras ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- FORMULÁRIO → redireciona para WhatsApp ---- */
  const form = document.getElementById('contatoForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome     = document.getElementById('nome').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const servico  = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      if (!nome || !telefone) {
        alert('Por favor, preencha seu nome e telefone.');
        return;
      }

      const texto = [
        `Olá, Larissa! 💑`,
        `Meu nome é *${nome}*.`,
        servico  ? `Tenho interesse em: *${servico}*.`         : '',
        mensagem ? `Mensagem: ${mensagem}`                     : '',
        `Meu telefone: ${telefone}`,
        `Gostaria de agendar uma consulta!`,
      ].filter(Boolean).join('\n');

      const encoded = encodeURIComponent(texto);
      const url = `https://wa.me/5562940216600?text=${encoded}`;
      window.open(url, '_blank');
    });
  }

  /* ---- MÁSCARA SIMPLES PARA TELEFONE ---- */
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 7) {
        v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        v = `(${v}`;
      }
      e.target.value = v;
    });
  }

  /* ---- LINK ATIVO NA NAVBAR conforme seção visível ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => sectionObserver.observe(s));

});
