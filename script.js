/* ============================================================
   ANEETA PETER — PORTFOLIO  |  script.js
   Word Reveal · Typed Text · Scroll Animations · Nav · Cursor
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════
   1. WORD-BY-WORD REVEAL  (hero headings + bio)
══════════════════════════════════════════════════════════ */
(function initWordReveal() {
  const els = document.querySelectorAll('[data-word-reveal]');

  els.forEach(el => {
    const baseDelay  = parseInt(el.dataset.delay || 0, 10);
    const text       = el.textContent.trim();
    const words      = text.split(/\s+/);
    const isHeading  = /^h[1-6]$/i.test(el.tagName);

    el.innerHTML = words.map((w, i) =>
      `<span class="wr-word" style="--wi:${i};--bd:${baseDelay}ms">${w}</span>`
    ).join(isHeading ? '&nbsp;' : ' ');
  });
})();


/* ══════════════════════════════════════════════════════════
   2. TYPED TEXT EFFECT
══════════════════════════════════════════════════════════ */
(function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Software Developer',
    'Data Analytics Student',
    'Flutter Developer',
    'AI Enthusiast',
    'Problem Solver',
  ];

  let phraseIdx = 0, charIdx = 0, deleting = false, pause = false;
  const SPEED   = { type: 75, del: 40, after: 2000, before: 350 };

  function tick() {
    const cur = phrases[phraseIdx];
    if (pause) { pause = false; setTimeout(tick, SPEED.before); return; }

    if (!deleting) {
      el.textContent = cur.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === cur.length) { deleting = true; setTimeout(tick, SPEED.after); return; }
      setTimeout(tick, SPEED.type);
    } else {
      el.textContent = cur.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false; pause = true;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, SPEED.type); return;
      }
      setTimeout(tick, SPEED.del);
    }
  }
  setTimeout(tick, 1400);
})();


/* ══════════════════════════════════════════════════════════
   3. NAVBAR — scroll + hamburger + active link
══════════════════════════════════════════════════════════ */
(function initNav() {
  const nav       = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const links     = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const open = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', open);
      const bars = hamburger.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity   = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });

    links.forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      });
    });
  }
})();


/* ══════════════════════════════════════════════════════════
   4. SCROLL REVEAL — fade-in + skill bars + word rows
══════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  // Fade-in blocks
  const fadeEls = document.querySelectorAll('.fade-in');
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const siblings = e.target.closest('.container')
        ? e.target.closest('.container').querySelectorAll('.fade-in')
        : [e.target];
      let delay = 0;
      siblings.forEach(s => {
        if (!s.classList.contains('visible')) {
          setTimeout(() => s.classList.add('visible'), delay);
          delay += 80;
        }
      });
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  fadeEls.forEach(el => fadeObs.observe(el));

  // Skill bar fill
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); barObs.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.pill-fill').forEach(b => barObs.observe(b));

  // Word-reveal rows — trigger when section scrolls into view
  const wordObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.wr-word').forEach(w => w.classList.add('wr-show'));
        wordObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('[data-word-reveal]').forEach(el => wordObs.observe(el));
})();


/* ══════════════════════════════════════════════════════════
   5. SECTION TRANSITION — slide + fade every section
══════════════════════════════════════════════════════════ */
(function initSectionTransitions() {
  const sections = document.querySelectorAll('.section, .hero');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('sec-visible');
    });
  }, { threshold: 0.07 });
  sections.forEach(s => { s.classList.add('sec-hidden'); obs.observe(s); });
})();


/* ══════════════════════════════════════════════════════════
   6. TILT on cards
══════════════════════════════════════════════════════════ */
(function initTilt() {
  document.querySelectorAll('.proj-card, .exp-right, .stat-item, .cert-card, .skill-group').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = r.width / 2, cy = r.height / 2;
      const rx = ((e.clientY - r.top  - cy) / cy) * -5;
      const ry = ((e.clientX - r.left - cx) / cx) *  5;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();


/* ══════════════════════════════════════════════════════════
   7. SMOOTH SCROLL
══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});


/* ══════════════════════════════════════════════════════════
   8. CURSOR GLOW  (desktop)
══════════════════════════════════════════════════════════ */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:9999;
    width:320px;height:320px;margin-left:-160px;margin-top:-160px;
    background:radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 70%);
    border-radius:50%;top:0;left:0;transition:opacity .4s ease;
  `;
  document.body.appendChild(glow);
  let mx = -400, my = -400, cx = -400, cy = -400;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => glow.style.opacity = '0');
  document.addEventListener('mouseenter', () => glow.style.opacity = '1');
  function lerp(a, b, t) { return a + (b - a) * t; }
  (function animate() {
    cx = lerp(cx, mx, 0.09); cy = lerp(cy, my, 0.09);
    glow.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(animate);
  })();
})();


/* ══════════════════════════════════════════════════════════
   9. NUMBER COUNTER for stats
══════════════════════════════════════════════════════════ */
(function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const raw = el.textContent.trim();
      const num = parseInt(raw, 10);
      const suffix = raw.replace(/[0-9]/g, '');
      let start = 0;
      const step = 16, inc = num / (1400 / step);
      const timer = setInterval(() => {
        start += inc;
        if (start >= num) { el.textContent = num + suffix; clearInterval(timer); }
        else el.textContent = Math.floor(start) + suffix;
      }, step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat-num').forEach(s => obs.observe(s));
})();


/* ══════════════════════════════════════════════════════════
   10. SCROLL PROGRESS BAR
══════════════════════════════════════════════════════════ */
(function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed;top:0;left:0;height:2px;width:0%;z-index:3000;
    background:linear-gradient(90deg,#a855f7,#ec4899);
    transition:width .12s linear;pointer-events:none;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════
   11. CERTIFICATE LIGHTBOX
══════════════════════════════════════════════════════════ */
function openCert(src) {
  const lb  = document.getElementById('certLightbox');
  const img = document.getElementById('certLightboxImg');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  const lb = document.getElementById('certLightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert(); });
