import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/* ============================================================
   DATA
   ============================================================ */

const tools = [
  'Claude', 'ChatGPT', 'Cursor', 'Supabase',
  'n8n', 'Make', 'Midjourney', 'Vercel',
];

const programBlocks = [
  {
    num: '01',
    title: 'AI-старт',
    sub: 'Как разговаривать с нейросетями, чтобы получать максимум',
    lessons: '4 урока',
    items: [
      'AI простыми словами — без терминов',
      'Топ-моделей 2026: Claude, GPT, Gemini, Grok',
      'Промпт-инжиниринг: 7 рабочих техник',
      'AI как личный ассистент 24/7',
    ],
    result: 'Библиотека из 200+ промптов',
  },
  {
    num: '02',
    title: 'Сайты через AI',
    sub: 'Главный блок — собираешь продающие сайты через AI',
    lessons: '8 уроков',
    items: [
      'Главные AI-инструменты для сайтов в 2026',
      'Подключаешь форму заявок и базу клиентов',
      'Публикуешь сайт на своём домене',
      'Делаешь дизайн, который не выдаёт AI',
    ],
    result: 'Готовый сайт на твоём домене',
  },
  {
    num: '03',
    title: 'Боты и автоматизация',
    sub: 'Самая доходная ниша. Боты для бизнеса от 50 тыс ₽',
    lessons: '6 уроков',
    items: [
      'Telegram-боты, которые отвечают как человек',
      'AI-помощники, делающие рутину сами',
      'Связываешь сервисы между собой без кода',
      'Закрываешь заявки клиентов 24/7 без участия',
    ],
    result: 'Свой бот и автоматизация в портфолио',
  },
  {
    num: '04',
    title: 'Свои AI-сервисы',
    sub: 'Запускаешь собственный цифровой продукт за выходные',
    lessons: '5 уроков',
    items: [
      'Идея → рабочий прототип за 2 дня',
      'Свои персональные AI-помощники',
      'Платные сервисы с подпиской',
      'Как тестировать продукт на реальных людях',
    ],
    result: 'Рабочий прототип своего сервиса',
  },
  {
    num: '05',
    title: 'Деньги. Как продавать дорого',
    sub: 'Эксклюзив тарифа «Лично с Адамом»',
    lessons: '7 уроков',
    locked: true,
    items: [
      'Какие AI-услуги покупают и за сколько',
      'Где брать клиентов: 10 рабочих источников',
      'Упаковка эксперта: портфолио и кейсы',
      'Переписка, продажи, КП, договоры',
      'Работа с возражениями',
      'Как поднять чек в 3 раза',
    ],
    result: 'Первые заявки и продажа на 50 000 ₽+',
  },
];

const portfolio = [
  { num: '01', title: 'Сайт через AI', desc: 'Сайт с дизайном, текстами, формой заявок и базой клиентов за вечер. Публикуешь на твоём домене — отдаёшь заказчику готовым.', price: '40–80 тыс ₽' },
  { num: '02', title: 'Telegram-бот с AI', desc: 'Бот, который консультирует клиентов и принимает заявки 24/7 как настоящий менеджер. Без твоего участия.', price: '50–150 тыс ₽' },
  { num: '03', title: 'Автоматизация бизнеса', desc: 'Связываешь Telegram, Google-таблицы и CRM. AI обрабатывает заявки сам — клиент экономит часы работы.', price: '90–200 тыс ₽' },
  { num: '04', title: 'Свой цифровой сервис', desc: 'Прототип собственного продукта за выходные. Можно показывать инвесторам или сразу запускать в продажу.', price: '150–300 тыс ₽' },
];

/* SVG sticker-style icons */
const Icon = ({ name }) => {
  const stroke = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  switch (name) {
    case 'freelancer':
      return (
        <svg viewBox="0 0 32 32" {...stroke}>
          <rect x="4" y="7" width="24" height="16" rx="2" />
          <path d="M2 25h28" />
          <path d="M12 19h8M16 11v4" />
        </svg>
      );
    case 'business':
      return (
        <svg viewBox="0 0 32 32" {...stroke}>
          <path d="M5 12 16 5l11 7v14H5z" />
          <path d="M13 26v-7h6v7" />
        </svg>
      );
    case 'rocket':
      return (
        <svg viewBox="0 0 32 32" {...stroke}>
          <path d="M21 11a5 5 0 1 0-10 0c0 5 5 11 5 11s5-6 5-11z" />
          <circle cx="16" cy="11" r="2" />
          <path d="M11 21l-4 4M21 21l4 4M9 17l-3 1 1 3M23 17l3 1-1 3" />
        </svg>
      );
    case 'automation':
      return (
        <svg viewBox="0 0 32 32" {...stroke}>
          <circle cx="16" cy="16" r="3" />
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4M8 8l3 3M21 21l3 3M8 24l3-3M21 11l3-3" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'arrow':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'down':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M5 12l5 5L20 6" />
        </svg>
      );
    case 'cross':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'lock':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <rect x="5" y="11" width="14" height="10" rx="1.5" />
          <path d="M8 11V7a4 4 0 1 1 8 0v4" />
        </svg>
      );
    case 'plus':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'play':
      return (
        <svg viewBox="0 0 24 24" {...stroke}>
          <path d="M8 5v14l11-7-11-7z" />
        </svg>
      );
    default:
      return null;
  }
};

const whoFor = [
  { icon: 'freelancer', title: 'Фрилансер', desc: 'Добавить AI-услуги в прайс и поднять чек в 3 раза.' },
  { icon: 'business', title: 'Предприниматель', desc: 'Делать сайты и сервисы без программистов — экономить сотни тысяч.' },
  { icon: 'rocket', title: 'Хочешь в IT', desc: 'Зайти в новую профессию через вайб-кодинг без 3 лет учёбы.' },
  { icon: 'automation', title: 'Специалист', desc: 'Автоматизировать рутину через AI — освободить 20+ часов в неделю.' },
];

/* PRICING — 3 тарифа */
const pricing = [
  {
    tier: '// БЕЗ ОБРАТНОЙ СВЯЗИ',
    name: 'Самостоятельно',
    price: '9 990',
    meta: '// 2 блока · только записи',
    intro: 'Идеально для нулевиков, кто никогда не работал с AI и хочет попробовать в своём темпе.',
    link: 'https://pay.tbank.ru/3GE0uTe4',
    features: [
      { text: '2 блока курса (12 уроков)', strong: true },
      { text: 'Блок 01 — AI-старт с нуля' },
      { text: 'Блок 02 — Сайты через AI' },
      { text: 'Видеозаписи в постоянном доступе' },
      { text: 'Библиотека 200+ промптов' },
      { text: 'Доступ к материалам на 1 год' },
      { text: 'Обратная связь и проверка проектов', dim: true },
      { text: 'Групповые созвоны и чат', dim: true },
      { text: 'Блоки 03–04 (боты, MVP)', dim: true },
      { text: 'Блок 05 (продажи и клиенты)', dim: true },
    ],
    cta: 'Купить за 9 990 ₽',
  },
  {
    tier: '// С КУРАТОРОМ',
    name: 'С куратором',
    price: '39 990',
    meta: '// 4 блока · обратная связь · созвоны',
    intro: 'Курс с проверкой твоих проектов, групповыми созвонами и общим чатом. Доводим до результата.',
    link: 'https://pay.tbank.ru/F926Yo6K',
    features: [
      { text: '4 блока курса (23 урока)', strong: true },
      { text: 'Проверка твоих проектов куратором', strong: true, highlight: true },
      { text: 'Групповые созвоны', strong: true, highlight: true },
      { text: 'Общий чат с куратором и группой', highlight: true },
      { text: 'Блок 03 — Боты и автоматизация' },
      { text: 'Блок 04 — Свои сервисы и MVP' },
      { text: 'Библиотека 200+ промптов' },
      { text: 'Доступ к материалам на 1 год' },
      { text: 'Блок 05 (продажи и клиенты)', dim: true },
      { text: 'Личная работа с Адамом', dim: true },
    ],
    cta: 'Купить за 39 990 ₽',
  },
  {
    tier: '// ЛИЧНОЕ МЕНТОРСТВО',
    name: 'Лично с Адамом',
    price: '99 900',
    meta: '// все 5 блоков + личное сопровождение',
    intro: 'Полное менторство с прямым доступом ко мне. Доводим до первой продажи.',
    badge: '★ только 15 мест',
    spots: 'осталось 7 из 15',
    featured: true,
    link: 'https://pay.tbank.ru/IBuz1SfX',
    features: [
      { text: 'Все 5 блоков (30+ уроков)', strong: true },
      { text: 'Блок 05 — Деньги: продажи, клиенты, КП', strong: true, highlight: true },
      { text: 'Шаблоны лендингов, КП, договоров', highlight: true },
      { text: 'Личный чат с Адамом на 2 месяца', strong: true },
      { text: '8 индивидуальных созвонов' },
      { text: 'Разбор каждого твоего проекта' },
      { text: 'Помощь с поиском первых клиентов' },
      { text: 'Личный план развития' },
      { text: 'Бесплатные обновления курса' },
      { text: 'Сообщество выпускников пожизненно', strong: true },
    ],
    cta: 'Купить за 99 900 ₽',
  },
];

/* PROBLEM SYMPTOMS — категорированный список */
const problemItems = [
  {
    num: '01',
    tag: 'шум',
    title: 'Везде кричат: «AI — это золото»',
    body: 'Сотни каналов, тысячи постов: «успей войти», «AI заменит всех». Звучит угрожающе, но непонятно, что конкретно с этим делать тебе.',
  },
  {
    num: '02',
    tag: 'туториалы',
    title: 'ChatGPT пишет «как-то так»',
    body: 'Ты пробовал. Сохранил 50 туториалов в закладки. Не открыл ни один. Промпты получаются средние, результат — на троечку.',
  },
  {
    num: '03',
    tag: 'долго',
    title: '3 года в IT — это нереально',
    body: 'Думал: «надо вкатиться в программирование». Курсы, алгоритмы, собесы. Полтора-три года на джуна. Время уходит.',
  },
  {
    num: '04',
    tag: 'зависть',
    title: 'Школьники зарабатывают больше',
    body: 'Школьники собирают сайты через AI за час — продают по 50 000 ₽. Фрилансеры берут 100 000 ₽ за бота. А ты пока «учишь матчасть».',
  },
  {
    num: '05',
    tag: 'страх',
    title: 'Уже поздно?',
    body: 'Кажется, поезд ушёл. Все вокруг что-то делают, ты — нет. Тебе стыдно начинать с нуля «в этом возрасте». Это нормально. Я через это прошёл.',
  },
];

const faqItems = [
  {
    q: 'У меня нет опыта в программировании. Получится?',
    a: 'Курс рассчитан именно на тех, кто не пишет код. Вайб-кодинг — это про то, как ставить задачу нейросети простым языком. Если умеешь формулировать мысли — справишься.',
  },
  {
    q: 'Сколько времени нужно тратить в неделю?',
    a: '5–8 часов. Программа разбита так, чтобы можно было совмещать с работой. Уроки короткие, по 15–25 минут.',
  },
  {
    q: 'В чём разница между тарифами?',
    a: '«Записи» — 4 блока курса и материалы для самостоятельной работы. «Лично с Адамом» — все 5 блоков, включая закрытый блок про продажи и поиск клиентов, плюс созвоны со мной, разбор твоих проектов и шаблоны документов.',
  },
  {
    q: 'Это очередной курс «как разбогатеть на AI»?',
    a: 'Нет. Это технический курс с проектами в портфолио. На курсе ты соберёшь 4 рабочих проекта, которые сможешь сразу показать клиентам.',
  },
  {
    q: 'Долго ли искать первого клиента?',
    a: 'Ученики прошлых потоков закрывали первую продажу на 30–80 тыс ₽ в течение первого месяца после старта. В тарифе с наставничеством я помогаю с поиском.',
  },
  {
    q: 'Какие нужны программы и подписки?',
    a: 'Большинство инструментов бесплатные или имеют бесплатный тариф. Максимум потратишь 20–30$ в месяц на подписки (Claude, ChatGPT) — окупится после первого проекта.',
  },
];

const incomeRows = [
  { service: 'Лендинг через AI', time: '4–8 часов', price: '30–80 тыс ₽', vol: '3–5 проектов', total: 'до 400k ₽' },
  { service: 'Telegram-бот с AI', time: '1–2 дня', price: '50–150 тыс ₽', vol: '2–3 бота', total: 'до 450k ₽' },
  { service: 'Автоматизация n8n', time: '2–5 дней', price: '70–200 тыс ₽', vol: '1–2 проекта', total: 'до 400k ₽' },
  { service: 'AI-ассистент', time: '1–2 дня', price: '30–70 тыс ₽', vol: '3–4 шт', total: 'до 280k ₽' },
  { service: 'Свой AI-продукт', time: 'разово', price: 'подписка', vol: '50–500 юзеров', total: 'без потолка' },
];

/* ============================================================
   HOOKS / UTILS
   ============================================================ */

function useMousePos() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  useEffect(() => {
    const m = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, [x, y]);
  return { x, y };
}

function Cursor() {
  const { x, y } = useMousePos();
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const enter = () => setHover(true);
    const leave = () => setHover(false);
    const sel = 'a, button, .magnetic, .interactive, .faq-item';
    const t = setTimeout(() => {
      document.querySelectorAll(sel).forEach((el) => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    }, 400);
    return () => {
      clearTimeout(t);
      document.querySelectorAll(sel).forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);
  return (
    <>
      <motion.div
        className="cursor-ring"
        style={{ x: sx, y: sy }}
        animate={{ scale: hover ? 1.35 : 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
      <motion.div className="cursor-dot" style={{ x, y }} />
    </>
  );
}

function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 18, stiffness: 200 });
  const sy = useSpring(y, { damping: 18, stiffness: 200 });
  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ num, suffix = '', label }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !seen) {
          setSeen(true);
          const dur = 1400;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(eased * num));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [num, seen]);
  return (
    <div className="counter" ref={ref}>
      <div className="counter-num">
        {val}
        {suffix}
      </div>
      <div className="counter-label">{label}</div>
    </div>
  );
}

/* ============================================================
   NAV
   ============================================================ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="nav-inner">
        <a href="#top" className="logo">
          <span className="logo-bracket">[</span>
          <span>ai/max</span>
          <span className="logo-bracket">]</span>
        </a>
        <ul className="nav-menu">
          <li><a href="#what">/что-это</a></li>
          <li><a href="#program">/программа</a></li>
          <li><a href="#portfolio">/портфолио</a></li>
          <li><a href="#pricing">/тарифы</a></li>
          <li><a href="guide.html" className="nav-guide">/гайд<span className="nav-new">new</span></a></li>
        </ul>
        <Magnetic strength={0.2}>
          <a href="#pricing" className="nav-cta">
            <span>./start.sh</span>
            <Icon name="play" />
          </a>
        </Magnetic>
      </div>
    </motion.nav>
  );
}

/* ============================================================
   HERO — terminal-style, no 3D
   ============================================================ */

function TypingLine({ text, delay = 0 }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 30);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);
  return <span>{shown}</span>;
}

function HeroCards() {
  return (
    <div className="hero-stack">
      <motion.div
        className="hcard hcard-1"
        initial={{ opacity: 0, y: 40, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hcard-top">
          <span className="hcard-tag">01 / PROMPT</span>
          <span className="hcard-dot" />
        </div>
        <div className="hcard-body">
          <div className="prompt-line">
            <span className="prompt-arrow">{'>'}</span>
            <TypingLine text="сделай лендинг для курса" delay={1500} />
            <span className="caret" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hcard hcard-2"
        initial={{ opacity: 0, y: 60, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hcard-top">
          <span className="hcard-tag">02 / LANDING.html</span>
          <span className="hcard-dot" />
        </div>
        <div className="hcard-body">
          <div className="mini-site">
            <div className="mini-bar">
              <span /><span /><span />
            </div>
            <div className="mini-hero">
              <div className="mini-h1" />
              <div className="mini-h2" />
              <div className="mini-btn">→</div>
            </div>
            <div className="mini-row">
              <div className="mini-box" />
              <div className="mini-box" />
              <div className="mini-box" />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hcard hcard-3"
        initial={{ opacity: 0, y: 80, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hcard-3-inner">
          <span className="hcard-tag-3">03 / INCOME</span>
          <div className="hcard-amount">+80 000<span>₽</span></div>
          <div className="hcard-sub">за 1 вечер работы</div>
        </div>
      </motion.div>

      <motion.div
        className="hero-sticker"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -12 }}
        transition={{ duration: 0.6, delay: 2.2, type: 'spring', damping: 12 }}
      >
        <span>NEW</span>
        <span>2026</span>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" />
      <div className="container hero-inner">
        <div className="hero-left">
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="dot-live" />
            <span>// курс адама алиева · поток #1 · 2026</span>
          </motion.div>

          <h1 className="hero-title">
            <motion.span
              className="ht-line"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              ВАЙБ-
            </motion.span>
            <motion.span
              className="ht-line ht-accent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              КОДИНГ
              <span className="ht-cursor" />
            </motion.span>
            <motion.span
              className="ht-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
            >
              <span className="ht-mark">↳</span> с нуля до{' '}
              <span className="ht-highlight">100k ₽/проект</span>
            </motion.span>
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
          >
            Учись делать сайты, ботов и AI-сервисы через нейросети.
            Без знания программирования и 3 лет в IT.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <Magnetic strength={0.25}>
              <a href="#pricing" className="btn btn-primary">
                <span>Забрать курс</span>
                <Icon name="arrow" />
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#program" className="btn btn-ghost">
                <span>Программа</span>
                <Icon name="down" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Counter num={30} suffix="+" label="// уроков" />
            <Counter num={4} label="// проекта" />
            <Counter num={200} suffix="+" label="// промптов" />
          </motion.div>
        </div>

        <div className="hero-right">
          <HeroCards />
        </div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
      >
        <span className="hsc-line" />
        <span className="hsc-text">scroll ↓</span>
      </motion.div>
    </section>
  );
}

/* ============================================================
   MARQUEE
   ============================================================ */

function Marquee() {
  return (
    <section className="marquee-section">
      <div className="container">
        <div className="marquee-label">// стек, который освоишь</div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {[...tools, ...tools, ...tools].map((t, i) => (
            <span className="marquee-item" key={i}>
              <span className="mq-sym">▲</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION HEADER PARTS
   ============================================================ */

function Eyebrow({ children }) {
  return (
    <motion.div
      className="eyebrow"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <span className="eyebrow-arrow">[</span>
      {children}
      <span className="eyebrow-arrow">]</span>
    </motion.div>
  );
}

function Title({ children }) {
  return (
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.h2>
  );
}

function Intro({ children }) {
  return (
    <motion.p
      className="section-intro"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {children}
    </motion.p>
  );
}

/* ============================================================
   WHAT — before/after
   ============================================================ */

function What() {
  return (
    <section className="what" id="what">
      <div className="container">
        <Eyebrow>// концепция</Eyebrow>
        <Title>
          Что такое <mark>вайб-кодинг</mark>
        </Title>
        <Intro>
          Новая профессия, которая родилась в 2024 и взорвалась в 2026.
          Программисты больше не монополисты.
        </Intro>

        <div className="what-grid">
          <motion.div
            className="what-card before"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="what-tag">// БЫЛО</div>
            <div className="what-title">Нужен был программист</div>
            <ul className="what-list">
              <li>Чтобы сделать сайт</li>
              <li>Чтобы написать бота</li>
              <li>Чтобы автоматизировать процесс</li>
              <li>Месяцы работы, десятки тысяч ₽</li>
            </ul>
            <div className="what-stamp stamp-red">старая модель</div>
          </motion.div>
          <motion.div
            className="what-card after"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div className="what-tag">// СТАЛО</div>
            <div className="what-title">Нужен ты и нейросеть</div>
            <ul className="what-list">
              <li>Пишешь нейросети что хочешь — простым языком</li>
              <li>Она пишет код за тебя</li>
              <li>Лендинг за вечер, бот за день</li>
              <li>Автоматизация за выходные</li>
            </ul>
            <div className="what-stamp stamp-lime">новая модель ✓</div>
          </motion.div>
        </div>

        <motion.div
          className="what-callout"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="callout-mark">→</span>
          Кодить теперь может <mark>каждый</mark>, кто умеет формулировать мысли.
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PROBLEM
   ============================================================ */

function Problem() {
  return (
    <section className="problem">
      <div className="container">
        <motion.div
          className="news-masthead"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="news-side">№ 01</span>
          <span className="news-title">AI MAXIMUM POST</span>
          <span className="news-side news-side-right">2026 · 16 стр.</span>
        </motion.div>

        <motion.div
          className="news-meta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>колонка автора</span>
          <span className="news-dot">·</span>
          <span>читать ≈ 2 мин</span>
          <span className="news-dot">·</span>
          <span>тираж — для своих</span>
        </motion.div>

        <motion.h2
          className="news-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Школьники зарабатывают на AI больше, чем ты. <span className="news-headline-em">Хватит догонять.</span>
        </motion.h2>

        <motion.div
          className="news-deck"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          → если хотя бы одно из ниже попало в точку — этот курс для тебя
        </motion.div>

        <div className="news-items">
          {problemItems.map((it, i) => (
            <motion.div
              key={it.num}
              className="news-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
            >
              <div className="news-item-left">
                <span className="news-item-num">{it.num}</span>
                <span className="news-item-tag">// {it.tag}</span>
              </div>
              <div className="news-item-right">
                <h3 className="news-item-title">{it.title}</h3>
                <p className="news-item-body">{it.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.aside
          className="news-pull"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="news-pull-mark">"</span>
          Лендинг, который раньше делали&nbsp;командой две недели, я&nbsp;собираю за&nbsp;вечер. И&nbsp;продаю за&nbsp;<mark>те&nbsp;же&nbsp;80&nbsp;000&nbsp;₽</mark>.
          <span className="news-pull-sign">— Адам Алиев</span>
        </motion.aside>

        <motion.div
          className="news-foot"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span>конец колонки →</span>
          <span className="news-foot-line" />
          <span>продолжение на стр. 02</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */

function About() {
  return (
    <section className="about">
      <div className="container">
        <Eyebrow>// об авторе</Eyebrow>
        <Title>
          Я, <mark>Адам Алиев</mark>
        </Title>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p>5 лет помогаю предпринимателям делать и масштабировать онлайн-продукты. За спиной 100+ проектов и 30+ обученных ребят.</p>
            <p>Полтора года назад я начал внедрять AI в свою работу. Сначала — для контента. Потом — для лендингов. Потом — для своих сервисов.</p>
            <p><strong>Понял одну вещь: вайб-кодинг — это новая профессия с дикими чеками. И конкуренции в ней пока почти нет.</strong></p>
            <p>Лендинг, который раньше делали 2 недели командой из 3 человек, я теперь собираю за вечер один. И продаю за те же 80 000 ₽.</p>
            <p>В этом курсе всё, что я знаю про вайб-кодинг и работу с AI. Без воды.</p>
          </motion.div>

          <motion.div
            className="about-card interactive"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="ac-row">
              <span className="ac-key">years_in_product</span>
              <span className="ac-val">5</span>
            </div>
            <div className="ac-row">
              <span className="ac-key">projects_done</span>
              <span className="ac-val">100+</span>
            </div>
            <div className="ac-row">
              <span className="ac-key">students_taught</span>
              <span className="ac-val">30+</span>
            </div>
            <div className="ac-row">
              <span className="ac-key">ai_experience</span>
              <span className="ac-val">1.5y</span>
            </div>
            <div className="ac-row">
              <span className="ac-key">avg_check</span>
              <span className="ac-val ac-highlight">80k ₽</span>
            </div>
            <div className="ac-sticker">verified ✓</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INCOME
   ============================================================ */

function Income() {
  return (
    <section className="income">
      <div className="container">
        <Eyebrow>// сколько платят</Eyebrow>
        <Title>
          Цифры <mark>AI-услуг 2026</mark>
        </Title>
        <Intro>Данные с фриланс-бирж и от моих учеников. Без преувеличений.</Intro>

        <motion.div
          className="income-table"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="income-row head">
            <div>// услуга</div>
            <div>время</div>
            <div>за проект</div>
            <div>в месяц</div>
            <div>потолок</div>
          </div>
          {incomeRows.map((r, i) => (
            <motion.div
              key={i}
              className="income-row"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="income-service" data-label="услуга">{r.service}</div>
              <div data-label="время">{r.time}</div>
              <div className="income-price" data-label="цена">{r.price}</div>
              <div data-label="в месяц">{r.vol}</div>
              <div className="income-month" data-label="потолок">{r.total}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="income-callout"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="callout-mark">→</span>
          Связка <mark>«лендинг + бот + автоматизация»</mark> = <strong>100–200k ₽</strong> с одного клиента
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PROGRAM
   ============================================================ */

function Program() {
  return (
    <section className="program" id="program">
      <div className="container">
        <Eyebrow>// программа</Eyebrow>
        <Title>
          5 блоков. 30+ уроков. <br />4 проекта в <mark>портфолио</mark>
        </Title>
        <Intro>Каждый урок — конкретный навык, который приносит деньги.</Intro>

        <div className="program-list">
          {programBlocks.map((b, i) => (
            <motion.div
              key={b.num}
              className={`block interactive ${b.locked ? 'block-locked' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="block-left">
                <div className="block-num">{b.num}</div>
                <div className="block-lessons">{b.lessons}</div>
                {b.locked && (
                  <div className="block-lock-tag">
                    <Icon name="lock" />
                    <span>VIP</span>
                  </div>
                )}
              </div>

              <div className="block-mid">
                <h3 className="block-title">{b.title}</h3>
                <p className="block-sub">{b.sub}</p>
                <ul className="block-list">
                  {b.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </div>

              <div className="block-right">
                <div className="block-result-label">// результат</div>
                <div className="block-result">{b.result}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PORTFOLIO
   ============================================================ */

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      className="proj interactive"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      whileHover={{ y: -6 }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        ref.current.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      }}
    >
      <div className="proj-top">
        <span className="proj-num">{p.num}</span>
        <span className="proj-tag">// проект</span>
      </div>
      <h3 className="proj-title">{p.title}</h3>
      <p className="proj-desc">{p.desc}</p>
      <div className="proj-foot">
        <div>
          <div className="proj-price-label">// цена на рынке</div>
          <div className="proj-price">{p.price}</div>
        </div>
        <span className="proj-arr">
          <Icon name="arrow" />
        </span>
      </div>
    </motion.div>
  );
}

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <Eyebrow>// что ты сделаешь</Eyebrow>
        <Title>
          4 проекта <mark>в портфолио</mark> уже на курсе
        </Title>
        <Intro>Не учебные задания, а готовые кейсы, которые можно показывать клиентам сразу.</Intro>

        <div className="portfolio-grid">
          {portfolio.map((p, i) => (
            <ProjectCard key={p.num} p={p} i={i} />
          ))}
        </div>

        <motion.div
          className="portfolio-sum"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="portfolio-sum-label">// сумма портфолио в деньгах</span>
          <span className="portfolio-sum-val">от 250 000 ₽</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   WHO
   ============================================================ */

function Fit() {
  const yes = [
    'Никогда не программировал — и не собираешься',
    'Хочешь зарабатывать на цифровых продуктах',
    'Готов вложить 1–2 часа в день первый месяц',
    'Не боишься переспрашивать и пробовать',
    'Любопытно — что вообще можно делать с AI',
  ];
  const no = [
    'Ищешь «волшебную кнопку», чтобы AI делал всё сам',
    'Хочешь быстрых денег без вложения времени',
    'Не готов писать вопросы и разбираться',
    'Уверен, что «уже поздно», и не хочешь пробовать',
  ];
  const reasons = [
    { k: 'Не нужен опыт.', v: 'Программа с нуля — для тех, кто никогда не открывал код.' },
    { k: 'Ты не один.', v: 'В тарифе «С куратором» — общий чат и созвоны. Зависнешь — вытащим.' },
    { k: 'Маленькие шаги.', v: 'Уроки по 15–25 минут. Каждый — конкретный навык, а не теория.' },
    { k: 'Можно перепроходить.', v: 'Доступ остаётся с тобой. Не понял — вернёшься позже.' },
  ];
  return (
    <section className="fit">
      <div className="container">
        <Eyebrow>// для тебя ли это</Eyebrow>
        <Title>
          Подойдёт ли <mark>тебе</mark> этот курс?
        </Title>

        <div className="fit-grid">
          <motion.div
            className="fit-card fit-yes"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="fit-tag">✓ ТОЧНО ПОДОЙДЁТ, ЕСЛИ:</div>
            <ul>
              {yes.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </motion.div>
          <motion.div
            className="fit-card fit-no"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="fit-tag">× ЛУЧШЕ ПРОЙТИ МИМО, ЕСЛИ:</div>
            <ul>
              {no.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="fit-divider"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>↓</span>
        </motion.div>

        <motion.div
          className="fit-promise"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <h3>А у меня получится?</h3>
          <p className="fit-answer">
            Короткий ответ: <mark>да, если будешь делать.</mark>
          </p>
          <p className="fit-body">
            Тебе не нужен код, опыт и техническое образование. Программа разбита
            на маленькие шаги — от простого к сложному. Не понял — спрашиваешь,
            объясняем заново. У учеников прошлых потоков средний срок до первой
            продажи — около 3 недель после старта.
          </p>
          <ul className="fit-points">
            {reasons.map((r, i) => (
              <li key={i}><strong>{r.k}</strong> {r.v}</li>
            ))}
          </ul>
          <div className="fit-signature">— Адам Алиев</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING
   ============================================================ */

function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <Eyebrow>// тарифы</Eyebrow>
        <Title>
          Выбери <mark>свой формат</mark>
        </Title>
        <Intro>Один раз заплатил — пользуешься. Без подписок и допродаж.</Intro>

        <div className="pricing-grid">
          {pricing.map((p, i) => (
            <motion.div
              key={p.name}
              className={`price-card ${p.featured ? 'featured' : ''} interactive`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              {p.badge && <span className="price-badge">{p.badge}</span>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-name">{p.name}</div>
              <div className="price-amount">
                <span className="num">{p.price}</span>
                <span className="cur">₽</span>
              </div>
              <div className="price-meta">{p.meta}</div>
              {p.intro && <p className="price-intro">{p.intro}</p>}

              <ul className="price-list">
                {p.features.map((f, idx) => (
                  <li
                    key={idx}
                    className={`${f.strong ? 'strong' : ''} ${f.dim ? 'dim' : ''} ${f.highlight ? 'highlight' : ''}`}
                  >
                    <span className="check">
                      <Icon name={f.dim ? 'cross' : 'check'} />
                    </span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <Magnetic strength={0.15}>
                <a href={p.link || '#'} target="_blank" rel="noopener" className="price-cta">
                  <span>{p.cta}</span>
                  <Icon name="arrow" />
                </a>
              </Magnetic>
              {p.spots && <div className="price-spots">// {p.spots}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq">
      <div className="container">
        <Eyebrow>// вопросы</Eyebrow>
        <Title>Часто спрашивают</Title>

        <div className="faq-list">
          {faqItems.map((f, i) => (
            <motion.div
              key={i}
              className={`faq-item ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <div className="faq-q">
                <span className="faq-q-num">0{i + 1}</span>
                <span className="faq-q-text">{f.q}</span>
                <span className="faq-toggle">
                  <Icon name={open === i ? 'cross' : 'plus'} />
                </span>
              </div>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL
   ============================================================ */

function Final() {
  return (
    <section className="final">
      <div className="container final-content">
        <div className="final-grid-bg" />
        <motion.div
          className="final-tag"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="dot-live" /> // готов начать
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Время заходить <br />
          в AI — <mark>сейчас</mark>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Через год вайб-кодеров будут сотни тысяч. Сейчас — единицы.<br />
          Заходи, пока чеки дикие.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <Magnetic strength={0.3}>
            <a href="#pricing" className="btn btn-primary btn-large">
              <span>Записаться на курс</span>
              <Icon name="arrow" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-bracket">[</span>
          <span>ai/max</span>
          <span className="logo-bracket">]</span>
        </div>
        <div className="footer-meta">// © Адам Алиев · 2026</div>
        <div className="footer-links">
          <a href="#">оферта</a>
          <a href="#">политика</a>
          <a href="mailto:hi@aimaximum.ru">hi@aimaximum.ru</a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   VERSION BADGE
   ============================================================ */

function VersionBadge() {
  return (
    <a className="version-badge interactive" href="#v1">
      <span className="vb-tag">version</span>
      <span className="vb-name">v2.0</span>
      <span className="vb-sep">/</span>
      <span className="vb-switch">→ v1</span>
    </a>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  return (
    <>
      <Cursor />
      <VersionBadge />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <What />
        <Problem />
        <About />
        <Income />
        <Program />
        <Portfolio />
        <Fit />
        <Pricing />
        <FAQ />
        <Final />
      </main>
      <Footer />
    </>
  );
}
