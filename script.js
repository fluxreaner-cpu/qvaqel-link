/* ========== Плавное появление секций ========== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ========== Бургер-меню ========== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.addEventListener('click', e => {
    if (e.target.tagName === 'A') navLinks.classList.remove('open');
  });
}

/* ========== Анимация печатающегося терминала ========== */
const termBody = document.getElementById('termBody');
if (termBody) {
  const lines = [
    { type: 'cmd', text: '$ qvaqel-recon --target "example.domain" --mode deep' },
    { type: 'out', text: '[*] Инициализация модулей разведки...' },
    { type: 'success', text: '[+] WHOIS: домен зарегистрирован 2019-04-12' },
    { type: 'success', text: '[+] DNS: A 104.21.45.89 · MX mail.example.domain' },
    { type: 'success', text: '[+] Subdomains: найдено 47 записей' },
    { type: 'out', text: '[*] Запуск GEOINT-модуля...' },
    { type: 'success', text: '[+] Геолокация сервера: 52.5200° N, 13.4050° E' },
    { type: 'success', text: '[+] ASN: AS14061 · провайдер: DigitalOcean' },
    { type: 'warn', text: '[!] Обнаружено 3 связанных домена' },
    { type: 'success', text: '[+] Отчёт сформирован: report_4a7f9c.json' },
    { type: 'cmd', text: '$ _' }
  ];

  let lineIdx = 0, charIdx = 0;
  let currentLineEl = null;

  function typeNext() {
    if (lineIdx >= lines.length) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      currentLineEl.appendChild(cursor);
      return;
    }
    const line = lines[lineIdx];
    if (charIdx === 0) {
      currentLineEl = document.createElement('div');
      currentLineEl.className = 'term-line';
      termBody.appendChild(currentLineEl);
    }
    if (charIdx < line.text.length) {
      const span = document.createElement('span');
      span.className = 'term-' + line.type;
      span.textContent = line.text[charIdx];
      currentLineEl.appendChild(span);
      charIdx++;
      setTimeout(typeNext, line.type === 'cmd' ? 35 : 15);
    } else {
      lineIdx++;
      charIdx = 0;
      setTimeout(typeNext, 250);
    }
  }
  setTimeout(typeNext, 600);
}

/* ========== Анимация счётчиков ========== */
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.count;
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + (target === 24 ? '/7' : '+');
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

/* ========== Эффект свечения на карточках ========== */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

/* ========== Параллакс-сетка на фоне ========== */
const grid = document.getElementById('bg-grid');
if (grid) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    grid.style.transform = `translate(${x}px, ${y}px)`;
  });
}