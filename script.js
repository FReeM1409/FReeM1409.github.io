// =====================================================================
// Kirill Makarov (FReeM1409) — Interactive Script & Internationalization
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initI18n();
  initSmoothScroll();
  initSandbox();
});

// 1. PROJECT FILTERS
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// 2. LIGHTBOX MODAL
function openLightbox(src, caption) {
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  img.src = src;
  cap.textContent = caption || '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// 3. CLIPBOARD COPY & TOAST
function copyToClipboard(text, btnElement) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Скопировано в буфер: ${text}`);
      if (btnElement) {
        const orig = btnElement.textContent;
        btnElement.textContent = '✔ Готово';
        setTimeout(() => btnElement.textContent = orig, 2000);
      }
    });
  } else {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(`Скопировано: ${text}`);
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// 4. SMOOTH SCROLL OFFSET
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// 5. INTERNATIONALIZATION (RU / EN)
const i18nData = {
  en: {
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.sandbox': 'Sandbox 🎮',
    'nav.stack': 'Tech Stack',
    'nav.education': 'Research & VAK',
    'nav.contacts': 'Contacts',
    'btn.pdf': 'PDF Resume',
    'hero.badge': 'Available for Hire: Python / QA Automation / Backend',
    'hero.greeting': 'Welcome, I am',
    'hero.role': 'Python & Backend Developer | System & ADB Automation | IoT Cybersecurity Researcher',
    'hero.desc': 'Developer of highload Telegram ecosystems, cross-platform desktop & mobile reverse-inspection tools, system automation, and resilient network infrastructures. End-to-end expertise: from SQL DB architecture and Linux server tuning to client GUIs and hardware verification.',
    'hero.location': 'Moscow, Russia (Remote / Hybrid / On-site)',
    'hero.exp': '3+ years commercial experience',
    'cta.tg': 'Message on Telegram (@sudo_QA)',
    'cta.inspector': 'Download Inspector (.EXE)',
    'metric.orders': 'Completed Orders',
    'metric.orders_sub': 'Across proprietary automated Telegram services',
    'metric.turnover': 'Commercial Turnover',
    'metric.turnover_sub': 'Digital goods distribution and high-speed VPN',
    'metric.db': 'Auto Catalog Part Indexes',
    'metric.db_sub': 'VAG ETKA, BMW ETK, Mercedes EPC, Mitsubishi ASA',
    'metric.vak': 'Scientific Publications',
    'metric.vak_sub': 'State Commission (VAK 2.3.6) in InfoSec & IoT Cryptography',
    'exp.title': 'Work Experience',
    'exp.desc': 'Commercial engineering, software quality assurance for distributed microservices, and system automation.',
    'exp.job1_title': 'Python Developer / QA Automation Engineer',
    'exp.job1_company': 'Freelance & Contract Engineering',
    'exp.job1_period': 'October 2024 — Present (2 yrs 2 mos)',
    'exp.job1_d1': 'Architected standalone desktop suites for low-level hardware telemetry and OS reverse-inspection (Tkinter, ADB Protocol, PyInstaller).',
    'exp.job1_d2': 'Developed and scaled highload Telegram bots backed by multi-million SQLite & PostgreSQL indexes (Aiogram 3.x, Telethon, Asyncio).',
    'exp.job1_d3': 'Engineered hardened VPN infrastructures (VLESS-XTLS-Reality, AmneziaWG, 3X-UI) on dedicated bare-metal European servers.',
    'exp.job1_d4': 'End-to-end E-Commerce automation (TON SDK WalletV5R1, Playwright, UIAutomator2 Device Bridge) processing 1,000+ orders.',
    'exp.job2_title': 'Software QA Engineer',
    'exp.job2_period': 'April 2024 — September 2024 (6 months)',
    'exp.job2_d1': 'Comprehensive quality assurance of web services and distributed microservices in a high-traffic production environment.',
    'exp.job2_d2': 'In-depth REST API testing using Postman, cURL, Charles Proxy, and OpenAPI/Swagger specifications.',
    'exp.job2_d3': 'Bug localization and analysis across Linux system logs, message brokers, and Chrome DevTools.',
    'exp.job2_d4': 'Authored and maintained comprehensive test suites, matrices, and bug reports in Test IT and Allure.',
    'exp.job3_title': 'Junior QA Engineer',
    'exp.job3_period': 'July 2022 — March 2024 (1 yr 9 mos)',
    'exp.job3_d1': 'Functional, regression, and smoke testing of web services and complex financial calculation engines.',
    'exp.job3_d2': 'End-to-End integration testing of data synchronization pipelines between customer portal and CRM/ERP systems.',
    'exp.job3_d3': 'Data integrity validation in relational databases via complex SQL queries and verification scripts.',
    'proj.title': 'Key Projects',
    'proj.desc': 'Production-grade engineering: from low-level desktop diagnostics to Highload Telegram bots and GameDev.',
    'proj.featured': '★ Flagship Project v4.3.0',
    'filter.all': 'All Projects',
    'filter.desktop': 'Desktop & ADB',
    'filter.tg': 'Telegram & Backend',
    'filter.sec': 'Network & Security',
    'filter.game': 'Gamedev',
    'stack.title': 'Technical Toolset',
    'stack.desc': 'A balanced engineering arsenal of languages, frameworks, system tools, and security protocols.',
    'stack.cat1': 'Backend & Python',
    'stack.cat2': 'Desktop, Mobile & Automation',
    'stack.cat3': 'Linux, DevOps & Infrastructure',
    'stack.cat4': 'Cybersecurity & QA Engineering',
    'edu.title': 'Education & Research',
    'edu.desc': 'Engineering foundation, PhD-level thesis research, and peer-reviewed VAK publications.',
    'contact.title': 'Ready to discuss a project or role?',
    'contact.desc': 'Open to backend development, automation tooling, security reverse-engineering, or QA Automation / Python Developer positions.'
  }
};

let currentLang = 'ru';

function initI18n() {
  const langBtn = document.getElementById('lang-toggle');
  const savedLang = localStorage.getItem('portfolio_lang') || 'ru';
  if (savedLang === 'en') {
    setLanguage('en');
  }

  langBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(nextLang);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);
  document.documentElement.lang = lang;

  const langBtn = document.getElementById('lang-toggle');
  if (lang === 'en') {
    langBtn.innerHTML = '<span class="lang-alt">RU</span> / <span class="lang-active" style="color:var(--accent-green)">EN</span>';
  } else {
    langBtn.innerHTML = '<span class="lang-active" style="color:var(--accent-green)">RU</span> / <span class="lang-alt">EN</span>';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (lang === 'en' && i18nData.en[key]) {
      if (!el.getAttribute('data-i18n-orig')) {
        el.setAttribute('data-i18n-orig', el.innerHTML);
      }
      el.innerHTML = i18nData.en[key];
    } else if (lang === 'ru' && el.getAttribute('data-i18n-orig')) {
      el.innerHTML = el.getAttribute('data-i18n-orig');
    }
  });
}

// =====================================================================
// 6. INTERACTIVE LIVE ENGINEERING SANDBOX (#sandbox)
// =====================================================================
function initSandbox() {
  initSandboxTabs();
  initDpStudioSimulator();
  initTelegramEmulator();
  initKrustyGame();
}

// A. Sandbox Tabs
function initSandboxTabs() {
  const tabs = document.querySelectorAll('.sandbox-tab-btn');
  const panels = document.querySelectorAll('.sandbox-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
        if (targetId === 'tab-dp-studio' && window.renderDpOscilloscope) {
          window.renderDpOscilloscope();
        }
        if (targetId === 'tab-krusty-game' && window.resizeGameCanvas) {
          window.resizeGameCanvas();
        }
      }
    });
  });
}

// B. DP Studio Audio Simulator (MIREA Algorithm)
function initDpStudioSimulator() {
  const dmaxSlider = document.getElementById('dp-dmax-slider');
  const dxmaxSlider = document.getElementById('dp-dxmax-slider');
  const dmaxVal = document.getElementById('dp-dmax-val');
  const dxmaxVal = document.getElementById('dp-dxmax-val');
  const modeBtns = document.querySelectorAll('.dp-mode-btn');
  const canvas = document.getElementById('dpOscilloscopeCanvas');
  const btnAudio = document.getElementById('btn-play-audio');

  const metricDpSize = document.getElementById('metric-dp-size');
  const metricZipSize = document.getElementById('metric-zip-size');
  const metricRatio = document.getElementById('metric-ratio');
  const pointsCount = document.getElementById('dp-points-count');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let currentMode = 'dichotomy';
  const NUM_SAMPLES = 512;
  const originalWave = [];

  // Generate synthetic audio wave (fundamental + speech harmonics + micro-vibrato)
  for (let i = 0; i < NUM_SAMPLES; i++) {
    const t = i / NUM_SAMPLES;
    const y = 0.52 * Math.sin(2 * Math.PI * 3 * t) +
              0.26 * Math.sin(2 * Math.PI * 7 * t + 0.5) +
              0.14 * Math.cos(2 * Math.PI * 13 * t) +
              0.08 * Math.sin(2 * Math.PI * 29 * t);
    originalWave.push(y);
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;
    ctx.scale(dpr, dpr);
  }

  window.renderDpOscilloscope = function() {
    resizeCanvas();
    const width = canvas.getBoundingClientRect().width;
    const height = 280;
    const dmax = parseInt(dmaxSlider.value, 10);
    const dxmax = parseInt(dxmaxSlider.value, 10);

    // Normalize dmax to canvas amplitude range
    const normDmax = (dmax / 2048) * 0.45;

    // Piecewise approximation computation
    let chords = [];

    if (currentMode === 'dichotomy') {
      chords = runDichotomy(0, NUM_SAMPLES - 1, normDmax, dxmax);
    } else if (currentMode === 'continuous') {
      chords = runContinuous(normDmax, dxmax);
    } else {
      chords = runPairwise(dxmax);
    }

    // DRAWING
    ctx.clearRect(0, 0, width, height);

    // Neon Cyber Grid
    ctx.strokeStyle = 'rgba(128, 216, 255, 0.07)';
    ctx.lineWidth = 1;
    const gridCols = 16;
    const gridRows = 8;
    for (let c = 0; c <= gridCols; c++) {
      const gx = (width / gridCols) * c;
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, height);
      ctx.stroke();
    }
    for (let r = 0; r <= gridRows; r++) {
      const gy = (height / gridRows) * r;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(width, gy);
      ctx.stroke();
    }

    // Zero-axis
    ctx.strokeStyle = 'rgba(0, 230, 118, 0.2)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 1. Draw Original WAV (Green)
    ctx.beginPath();
    ctx.strokeStyle = '#00e676';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#00e676';
    ctx.shadowBlur = 8;
    for (let i = 0; i < NUM_SAMPLES; i++) {
      const x = (i / (NUM_SAMPLES - 1)) * width;
      const y = height / 2 - originalWave[i] * (height * 0.42);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 2. Draw Piecewise-Linear Approximation .DP (Purple)
    ctx.beginPath();
    ctx.strokeStyle = '#e040fb';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#e040fb';
    ctx.shadowBlur = 10;
    chords.forEach((pt, idx) => {
      const x = (pt.i / (NUM_SAMPLES - 1)) * width;
      const y = height / 2 - pt.y * (height * 0.42);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 3. Draw Vertex Nodes
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 4;
    chords.forEach(pt => {
      const x = (pt.i / (NUM_SAMPLES - 1)) * width;
      const y = height / 2 - pt.y * (height * 0.42);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    // Update Live Metrics
    const numPoints = chords.length;
    const baseWav = 224; // KB
    const pointRatio = Math.max(numPoints / NUM_SAMPLES, 0.06);
    const dpSize = Math.max(baseWav * pointRatio * 1.22, 18.4).toFixed(1);
    const zipSize = Math.max(dpSize * 0.54, 11.2).toFixed(1);
    const compressionRatio = (baseWav / zipSize).toFixed(1);

    metricDpSize.textContent = `~${dpSize} КБ`;
    metricZipSize.textContent = `~${zipSize} КБ`;
    metricRatio.textContent = `до ${compressionRatio}x`;
    pointsCount.textContent = `Опорных хорд: ${numPoints} (Редукция ${((1 - numPoints / NUM_SAMPLES) * 100).toFixed(0)}%)`;
  };

  function runDichotomy(start, end, threshold, minLen) {
    const pts = [{ i: start, y: originalWave[start] }];

    function split(s, e) {
      if (e - s < minLen) {
        pts.push({ i: e, y: originalWave[e] });
        return;
      }
      const y0 = originalWave[s];
      const y1 = originalWave[e];
      let maxDev = -1;
      let maxIdx = s;

      for (let k = s + 1; k < e; k++) {
        const lineY = y0 + (y1 - y0) * ((k - s) / (e - s));
        const dev = Math.abs(originalWave[k] - lineY);
        if (dev > maxDev) {
          maxDev = dev;
          maxIdx = k;
        }
      }

      if (maxDev > threshold) {
        split(s, maxIdx);
        split(maxIdx, e);
      } else {
        pts.push({ i: e, y: originalWave[e] });
      }
    }

    split(start, end);
    return pts;
  }

  function runContinuous(threshold, minLen) {
    const pts = [{ i: 0, y: originalWave[0] }];
    let s = 0;
    while (s < NUM_SAMPLES - 1) {
      let e = Math.min(s + minLen, NUM_SAMPLES - 1);
      while (e < NUM_SAMPLES - 1) {
        let ok = true;
        const y0 = originalWave[s];
        const y1 = originalWave[e + 1];
        for (let k = s + 1; k <= e; k++) {
          const lineY = y0 + (y1 - y0) * ((k - s) / (e + 1 - s));
          if (Math.abs(originalWave[k] - lineY) > threshold) {
            ok = false;
            break;
          }
        }
        if (!ok || e - s > minLen * 3) break;
        e++;
      }
      pts.push({ i: e, y: originalWave[e] });
      s = e;
    }
    return pts;
  }

  function runPairwise(step) {
    const pts = [];
    for (let i = 0; i < NUM_SAMPLES; i += step) {
      pts.push({ i, y: originalWave[i] });
    }
    if (pts[pts.length - 1].i !== NUM_SAMPLES - 1) {
      pts.push({ i: NUM_SAMPLES - 1, y: originalWave[NUM_SAMPLES - 1] });
    }
    return pts;
  }

  // Sliders and Mode listeners
  dmaxSlider.addEventListener('input', () => {
    dmaxVal.textContent = dmaxSlider.value;
    window.renderDpOscilloscope();
  });

  dxmaxSlider.addEventListener('input', () => {
    dxmaxVal.textContent = dxmaxSlider.value;
    window.renderDpOscilloscope();
  });

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');
      window.renderDpOscilloscope();
    });
  });

  window.addEventListener('resize', () => {
    const dpPanel = document.getElementById('tab-dp-studio');
    if (dpPanel && dpPanel.classList.contains('active')) {
      window.renderDpOscilloscope();
    }
  });

  // Web Audio API Demonstration
  let audioCtx = null;
  btnAudio.addEventListener('click', () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      // Phase 1: Original rich tone
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Phase 2: Piecewise-linear tone (reconstructed .DP waveform)
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(523.25, now + 0.45);
      osc2.frequency.setValueAtTime(659.25, now + 0.65);

      gain2.gain.setValueAtTime(0.18, now + 0.45);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.45);
      osc2.stop(now + 0.95);

      showToast('🔊 Синтез: Оригинал WAV ➔ Аппроксимация .DP (без Фурье / БПФ)');
    } catch (e) {
      showToast('Аудио не поддерживается вашим браузером');
    }
  });

  // Initial draw
  setTimeout(window.renderDpOscilloscope, 50);
}

// C. Telegram Bot Emulator (Daos.V & BSD Store)
function initTelegramEmulator() {
  const history = document.getElementById('tg-chat-history');
  const actionBtns = document.querySelectorAll('.tg-quick-actions .tg-btn');
  if (!history || !actionBtns.length) return;

  const responses = {
    vin: {
      userText: '🚗 Пробить VIN: WVWZZZ2KZJX014921',
      botHtml: `🚗 <b>VIN Декодер: WVWZZZ2KZJX014921</b><br>
• <b>Марка / Модель:</b> Volkswagen Caddy IV Kasten (2K-J)<br>
• <b>Двигатель:</b> 1.6 MPI CWVA (110 л.с. / 81 кВт, Euro 5)<br>
• <b>Трансмиссия:</b> 5-ступ. МКПП (QAE / 02T)<br>
• <b>Год выпуска:</b> 2018 (Модельный год: J)<br>
• <b>Завод сборки:</b> Poznan (Польша)<br>
• <b>Каталожные узлы:</b> VAG ETKA online — 14 узлов найдено. Доступна взрыв-схема ГРМ, подвески и топливной рампы.`
    },
    part: {
      userText: '⚙ Найти артикул: 06A906262BR (VAG)',
      botHtml: `⚡ <b>Поиск по локальной БД SQLite (4 460 000+ записей):</b> выполнено за <b>0.012 сек</b>.<br><br>
<b>VAG 06A 906 262 BR</b> — Датчик концентрации кислорода (Лямбда-зонд до катализатора, 5 проводов).<br><br>
📊 <b>Сводка цен агрегатора (Exist / Autodoc / ZZap):</b><br>
• <b>ZZap:</b> от 7 690 ₽ (В наличии, 4 склада в Москве)<br>
• <b>Autodoc:</b> 8 120 ₽ (Срок доставки: 1 день, склад Дилер)<br>
• <b>Exist:</b> 8 450 ₽ (Срок доставки: 2 дня)<br>
• <b>Elcats:</b> Каталожный узел 906-030 (Выхлопная система)`
    },
    vpn: {
      userText: '🛡 Выдать тестовый ключ UC SHIELD (VLESS-Reality)',
      botHtml: `🛡 <b>UC SHIELD Security Gateway (3X-UI Docker Daemon):</b><br>
Сгенерирован персональный тестовый профиль VLESS-Reality на выделенном европейском сервере:<br><br>
<code style="display:block; background:#0c1017; padding:8px; border-radius:6px; font-size:0.75rem; word-break:break-all; color:#80d8ff;">vless://b8f2c310-7e5d-4f11-9a3b-da0432f7a912@de01.uc-shield.net:443?security=reality&encryption=none&pbk=xK7_90vPqX5aM8912qL0Pz11&type=tcp&sni=gateway.icloud.com#UC-SHIELD-DEMO</code><br>
• <b>Маскировка (SNI):</b> gateway.icloud.com (Apple Inc.)<br>
• <b>Статус:</b> Активен | Пинг: 28 мс | Лимит: 50 ГБ`
    },
    stars: {
      userText: '⭐ Автовыдача Stars (TON WalletV5R1)',
      botHtml: `⭐ <b>Автовыдача Telegram Stars (TON SDK WalletV5R1 + Fragment API):</b><br><br>
[LOG 00:00:00.12] Запрос на покупку 100 Stars от @demo_user<br>
[LOG 00:00:00.54] Подписание смарт-контракта TON WalletV5R1<br>
[LOG 00:00:01.32] Транзакция отправлена в сеть Fragment API<br>
[LOG 00:00:01.80] ✔ Блок смайнен! Хэш: <code>0x7f4a...9b1c</code><br><br>
⭐ <b>100 Telegram Stars</b> зачислены на баланс аккаунта! Время процессинга: <b>1.8 сек</b>.`
    }
  };

  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const item = responses[action];
      if (!item) return;

      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Append User message
      const userMsg = document.createElement('div');
      userMsg.className = 'tg-msg user';
      userMsg.innerHTML = `${item.userText}<span class="tg-msg-time">${nowTime}</span>`;
      history.appendChild(userMsg);
      history.scrollTop = history.scrollHeight;

      // Append Typing indicator
      const typingMsg = document.createElement('div');
      typingMsg.className = 'tg-msg bot font-mono';
      typingMsg.innerHTML = `<em>Daos.V печатает...</em>`;
      history.appendChild(typingMsg);
      history.scrollTop = history.scrollHeight;

      setTimeout(() => {
        if (typingMsg.parentNode) {
          history.removeChild(typingMsg);
        }

        const botMsg = document.createElement('div');
        botMsg.className = 'tg-msg bot';
        botMsg.innerHTML = `${item.botHtml}<span class="tg-msg-time">${nowTime}</span>`;
        history.appendChild(botMsg);
        history.scrollTop = history.scrollHeight;
      }, 350);
    });
  });
}

// D. Krusty Burger & Cyber Catcher Mini-Game
function initKrustyGame() {
  const canvas = document.getElementById('gameCanvas');
  const btnToggle = document.getElementById('btn-game-toggle');
  const scoreEl = document.getElementById('game-score');
  const comboEl = document.getElementById('game-combo');
  const livesEl = document.getElementById('game-lives');
  const planFill = document.getElementById('plan-fill');
  const planTarget = document.getElementById('plan-target');

  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let animationId = null;
  let isRunning = false;
  let score = 0;
  let combo = 1;
  let lives = 3;
  const TARGET_SCORE = 200;

  let paddle = { x: 200, width: 90, height: 16 };
  let items = [];
  let particles = [];
  let lastSpawn = 0;

  const itemTypes = [
    { char: '🍔', pts: 10, isBad: false, label: 'Бургер' },
    { char: '🦀', pts: 25, isBad: false, label: 'Крабсбургер' },
    { char: '⭐', pts: 50, isBad: false, label: 'Контракт' },
    { char: '👾', pts: 0, isBad: true, label: 'DDoS' },
    { char: '🐛', pts: 0, isBad: true, label: 'Баг' }
  ];

  window.resizeGameCanvas = function() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = (rect.height || 360) * dpr;
    ctx.scale(dpr, dpr);
    paddle.x = rect.width / 2;
  };

  function updateHUD() {
    scoreEl.textContent = score;
    comboEl.textContent = `x${combo}`;
    livesEl.textContent = '❤️'.repeat(Math.max(0, lives)) || '💀';
    const pct = Math.min((score / TARGET_SCORE) * 100, 100);
    planFill.style.width = `${pct}%`;
    planTarget.textContent = `${score}/${TARGET_SCORE}`;
  }

  function spawnItem(width) {
    const rnd = Math.random();
    let type = itemTypes[0];
    if (rnd > 0.85) type = itemTypes[2]; // Star
    else if (rnd > 0.65) type = itemTypes[1]; // Crab
    else if (rnd > 0.45) type = itemTypes[3]; // DDoS
    else if (rnd > 0.35) type = itemTypes[4]; // Bug

    items.push({
      x: 30 + Math.random() * (width - 60),
      y: -20,
      speed: 2.2 + Math.random() * 2.2,
      type
    });
  }

  function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 20,
        color
      });
    }
  }

  function gameLoop(timestamp) {
    if (!isRunning) return;
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height || 360;

    ctx.clearRect(0, 0, width, height);

    // Spawn items
    if (timestamp - lastSpawn > 650) {
      spawnItem(width);
      lastSpawn = timestamp;
    }

    // Draw Chef Tray (Paddle)
    ctx.shadowColor = '#00e676';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#00e676';
    const px = Math.max(0, Math.min(paddle.x - paddle.width / 2, width - paddle.width));
    const py = height - 32;
    ctx.beginPath();
    ctx.roundRect(px, py, paddle.width, paddle.height, 8);
    ctx.fill();

    // Paddle badge text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#07070d';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('👨‍🍳 KRUSTY', px + paddle.width / 2, py + 12);

    // Update & draw items
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.speed;

      // Draw item
      ctx.fillText(it.type.char, it.x, it.y);

      // Collision check with paddle
      if (it.y >= py - 8 && it.y <= py + paddle.height && it.x >= px - 10 && it.x <= px + paddle.width + 10) {
        if (it.type.isBad) {
          lives--;
          combo = 1;
          createParticles(it.x, it.y, '#ff5252');
          if (lives <= 0) {
            endGame(false);
            return;
          }
        } else {
          score += it.type.pts * combo;
          combo = Math.min(combo + 1, 5);
          createParticles(it.x, it.y, '#ffd700');
          if (score >= TARGET_SCORE) {
            endGame(true);
            return;
          }
        }
        items.splice(i, 1);
        updateHUD();
        continue;
      }

      // Out of bounds
      if (it.y > height + 20) {
        if (!it.type.isBad) {
          combo = 1;
          updateHUD();
        }
        items.splice(i, 1);
      }
    }

    // Update & draw particles
    for (let p = particles.length - 1; p >= 0; p--) {
      const pt = particles[p];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life--;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      if (pt.life <= 0) particles.splice(p, 1);
    }

    animationId = requestAnimationFrame(gameLoop);
  }

  function endGame(isWin) {
    isRunning = false;
    cancelAnimationFrame(animationId);
    const width = canvas.getBoundingClientRect().width;
    const height = canvas.getBoundingClientRect().height || 360;

    ctx.fillStyle = 'rgba(7, 7, 13, 0.85)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    if (isWin) {
      ctx.fillStyle = '#ffd700';
      ctx.fillText('★★★ ДНЕВНОЙ ПЛАН ВЫПОЛНЕН! ★★★', width / 2, height / 2 - 15);
      ctx.font = '14px JetBrains Mono, monospace';
      ctx.fillStyle = '#00e676';
      ctx.fillText(`Набрано: ${score} очков. Превосходная реакция!`, width / 2, height / 2 + 20);
    } else {
      ctx.fillStyle = '#ff5252';
      ctx.fillText('СМЕНА ПРЕРВАНА (DDoS / БАГИ)', width / 2, height / 2 - 15);
      ctx.font = '14px JetBrains Mono, monospace';
      ctx.fillStyle = '#f0f0f8';
      ctx.fillText(`Итоговый счет: ${score}. Нажмите кнопку для рестарта.`, width / 2, height / 2 + 20);
    }
  }

  function startGame() {
    window.resizeGameCanvas();
    score = 0;
    combo = 1;
    lives = 3;
    items = [];
    particles = [];
    isRunning = true;
    updateHUD();
    lastSpawn = performance.now();
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(gameLoop);
  }

  btnToggle.addEventListener('click', startGame);

  // Mouse & Touch controls
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.clientX - rect.left;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!e.touches.length) return;
    const rect = canvas.getBoundingClientRect();
    paddle.x = e.touches[0].clientX - rect.left;
    e.preventDefault();
  }, { passive: false });

  // Initial draw placeholder
  window.resizeGameCanvas();
  ctx.fillStyle = '#0e0e1a';
  ctx.font = '14px JetBrains Mono, monospace';
  ctx.fillStyle = '#80d8ff';
  ctx.textAlign = 'center';
  ctx.fillText('Нажмите «Начать смену / Рестарт», чтобы запустить мини-игру', canvas.width / (2 * (window.devicePixelRatio || 1)), 180);
}

