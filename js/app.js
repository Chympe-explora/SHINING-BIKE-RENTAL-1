/* ==========================================================================
   PreRent — Premium car rental · interactive prototype
   Vanilla JS, no build step, no dependencies.
   ========================================================================== */
(() => {
  'use strict';

  const IMG = 'assets/img/';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const raf = () => new Promise((r) => requestAnimationFrame(() => r()));
  const EASE = 'cubic-bezier(.65,0,.25,1)';

  /* ------------------------------------------------------------------------
     Icons
     ---------------------------------------------------------------------- */
  const sv = (body, w = 22, vb = 24, extra = '') =>
    `<svg width="${w}" height="${w}" viewBox="0 0 ${vb} ${vb}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${body}</svg>`;
  const I = {
    back: sv('<path d="M19 12H5M11 6l-6 6 6 6"/>', 22),
    arrowR: sv('<path d="M5 12h14M13 6l6 6-6 6"/>', 22),
    star: `<svg width="12" height="12" viewBox="0 0 24 24"><path fill="#f0b64d" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>`,
    starDark: `<svg width="12" height="12" viewBox="0 0 24 24"><path fill="#15161a" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>`,
    heart: sv('<path d="M12 20.5s-7.5-4.6-9-9.4C2 7.700 4.100 5 7 5c2 0 3.400 1.100 5 3 1.600-1.900 3-3 5-3 2.900 0 5 2.700 4 6.100-1.500 4.800-9 9.400-9 9.400z" fill="currentColor" stroke="none"/>', 21),
    heartO: sv('<path d="M12 20.5s-7.5-4.6-9-9.4C2 7.700 4.100 5 7 5c2 0 3.400 1.100 5 3 1.600-1.900 3-3 5-3 2.900 0 5 2.700 4 6.100-1.500 4.800-9 9.400-9 9.400z"/>', 21),
    share: sv('<path d="M12 15V3M8 7l4-4 4 4M6 11H5a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1v-8a1 1 0 00-1-1h-1"/>', 20),
    chat: sv('<path fill="currentColor" stroke="none" d="M5 4h14a2.500 2.500 0 012.500 2.500v8A2.500 2.500 0 0119 17h-6.500L8 21v-4H5a2.500 2.500 0 01-2.500-2.500v-8A2.500 2.500 0 015 4z"/><circle cx="8.500" cy="10.500" r="1.100" fill="#fff" stroke="none"/><circle cx="12" cy="10.500" r="1.100" fill="#fff" stroke="none"/><circle cx="15.500" cy="10.500" r="1.100" fill="#fff" stroke="none"/>', 22),
    phone: sv('<path fill="currentColor" stroke="none" d="M6.600 3.500l2.700-.5 1.700 4.300-2.100 1.500a11 11 0 005.500 5.500l1.500-2.100 4.300 1.700-.5 2.700a2.800 2.800 0 01-2.800 2.400C10.500 19 5 13.500 4.200 6.300a2.800 2.800 0 012.400-2.800z"/>', 22),
    cal: sv('<path fill="currentColor" stroke="none" d="M7 2.500h2v2h6v-2h2v2h1.500A2.500 2.500 0 0121 7v11.500a2.500 2.500 0 01-2.500 2.500h-13A2.500 2.500 0 013 18.500V7a2.500 2.500 0 012.500-2.500H7z"/><path d="M3 9h18" stroke="#fcf1de" stroke-width="1.600"/><g fill="#fcf1de" stroke="none"><rect x="6.500" y="11.500" width="2.400" height="2"/><rect x="10.800" y="11.500" width="2.400" height="2"/><rect x="15.100" y="11.500" width="2.400" height="2"/><rect x="6.500" y="15.500" width="2.400" height="2"/><rect x="10.800" y="15.500" width="2.400" height="2"/><rect x="15.100" y="15.500" width="2.400" height="2"/></g>', 21),
    clock: `<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#15161a"/><path d="M12 6.500V12l3.800 2.200" stroke="#fff" stroke-width="2.200" fill="none" stroke-linecap="round"/></svg>`,
    gridTog: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.200"><rect x="3" y="4" width="7.500" height="16" rx="3.500"/><rect x="13.500" y="4" width="7.500" height="16" rx="3.500"/></svg>`,
    listTog: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.200"><rect x="3" y="3" width="18" height="7.500" rx="3.500"/><rect x="3" y="13.500" width="18" height="7.500" rx="3.500"/></svg>`,
    turbo: `<svg width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4.500a5.500 5.500 0 015.400 6.600c-1-2.400-3.100-3.400-5-3.400-1.200 0-2.100.4-2.800 1-.2-1.700.3-3.600 2.400-4.200z" opacity=".95"/><circle cx="12" cy="13" r="2.300" fill="#fff" opacity=".9"/><path d="M19.500 4l3 1.500" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    half: `<svg width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.600"/><path d="M12 3a9 9 0 010 18z" fill="currentColor"/></svg>`,
    gauge: `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3.500 17a9 9 0 1117 0" fill="none" stroke="#15161a" stroke-width="3" stroke-linecap="round"/><path d="M12 15.500l3.800-4.600" stroke="#15161a" stroke-width="2.600" stroke-linecap="round"/><circle cx="12" cy="15.800" r="2" fill="#15161a"/></svg>`,
    stopw: `<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="13.500" r="8" fill="#fff"/><path d="M9.500 2.500h5" stroke="#fff" stroke-width="2.400" stroke-linecap="round"/><path d="M12 8.500v5.200" stroke="#1b1c21" stroke-width="2.200" stroke-linecap="round"/></svg>`,
    seat: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15161a" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3.500c1.800 0 3 1.400 2.800 3.200l-.6 6.800h6.300a2.500 2.500 0 012.500 2.500V20H8.500L6.500 8c-.2-2.500.4-4.500 1.500-4.500z" fill="#15161a" stroke="none"/></svg>`,
    x: `<svg width="8" height="8" viewBox="0 0 10 10" stroke="#fff" stroke-width="1.800" stroke-linecap="round"><path d="M2 2l6 6M8 2L2 8"/></svg>`,
    plus: sv('<path d="M12 5v14M5 12h14" stroke-width="2.4"/>', 18),
    dots: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><circle cx="5" cy="12" r="1.900"/><circle cx="12" cy="12" r="1.900"/><circle cx="19" cy="12" r="1.900"/></svg>`,
    chev: sv('<path d="M15 5l-7 7 7 7"/>', 16, 24, 'stroke-width="2.400"'),
    chevR: sv('<path d="M9 5l7 7-7 7"/>', 16, 24, 'stroke-width="2.400"'),
    check: `<svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 25l8 8 16-18"/></svg>`,
    pin: `<svg width="30" height="30" viewBox="0 0 32 32"><path fill="#fff" d="M17.500 4.500c4.700.6 7.800 4 7.800 8.200 0 4.700-5.400 10-8.900 14.300C13 22.700 9.100 18 9.100 13.300c0-4.900 3.600-9 8.400-8.800z"/><circle cx="17.200" cy="13" r="3" fill="#0c0c0d"/><path d="M3 8.500h6M1.500 13h5.500M4 17.500h4.500" stroke="#fff" stroke-width="2.200" stroke-linecap="round"/></svg>`,
    carTop: `<svg width="34" height="34" viewBox="0 0 40 40"><g transform="rotate(-38 20 20)"><rect x="4" y="12" width="32" height="16" rx="7" fill="#fff" stroke="#3a3b40" stroke-width="1.600"/><path d="M14 13.500h12l3 3v7l-3 3H14l-3-3v-7z" fill="#26272c"/><rect x="16" y="15" width="8" height="10" rx="2" fill="#7d8088"/><rect x="2.500" y="14" width="3" height="3" rx="1" fill="#3a3b40"/><rect x="2.500" y="23" width="3" height="3" rx="1" fill="#3a3b40"/></g></svg>`,
    visa: `<span class="vbadge">VISA</span>`,
  };

  /* ------------------------------------------------------------------------
     Data
     ---------------------------------------------------------------------- */
  const CARS = [
    {
      id: 'cullinan', name: 'Rolls-Royce Cullinan', cat: 'SUV', rate: '5.0', price: 2100, hp: 571, speed: 250, acc: 5.2, seats: 4,
      isNew: true, cls: 't-dark', file: 'rolls-royce-cullinan-cut.png', klass: 'Premium class',
      desc: 'A vehicle that makes the dream\nof comfortable off-roading a reality',
      mini: { w: 320, l: 4, t: 30 }, list: { w: 315, l: 12, t: 38 },
      hero: { file: 'rolls-royce-cullinan-cut.png', w: 714, l: -346, t: 68, bg: '#1b1c21' },
      book: { w: 315, l: 35 },
    },
    {
      id: 'urus', name: 'Lamborghini Urus', cat: 'SUV', rate: '4.6', price: 1700, hp: 650, speed: 305, acc: 3.6, seats: 5,
      cls: 't-yellow', file: 'lamborghini-urus-side-cut.png', klass: 'Super SUV',
      desc: 'Super sport performance meets\neveryday comfort and practicality',
      mini: { w: 190, l: 0, t: 6 }, list: { w: 230, l: 115, t: 15 },
      hero: { file: 'lamborghini-urus-front.png', w: 440, l: -10, t: -18, bg: '#23242a', crossfade: true, fade: true },
      book: { w: 250, l: 140 },
    },
    {
      id: 'phantom', name: 'Rolls-Royce Phantom', cat: 'Sedan', rate: '4.7', price: 1900, hp: 563, speed: 250, acc: 5.3, seats: 5,
      cls: 't-gray', file: 'rolls-royce-phantom-cut.png', klass: 'Luxury sedan',
      desc: 'The pinnacle of effortless luxury,\nwhisper-quiet and endlessly refined',
      mini: { w: 186, l: 8, t: 40 }, list: { w: 300, l: 45, t: 11 },
      hero: { file: 'rolls-royce-phantom-cut.png', w: 446, l: 25, t: 88, bg: '#e7e6e9', light: true },
      book: { w: 300, l: 90 },
    },
    {
      id: 'bentley', name: 'Bentley Continental GT', cat: 'Sedan', rate: '4.8', price: 1500, hp: 635, speed: 333, acc: 3.7, seats: 4,
      cls: 't-blue', file: 'bentley-continental-gt-cut.png', klass: 'Grand tourer',
      desc: 'A grand tourer built to cross\ncontinents in absolute comfort',
      mini: { w: 316, l: 8, t: 42 }, list: { w: 300, l: 20, t: 40 },
      hero: { file: 'bentley-continental-gt-cut.png', w: 656, l: -281, t: 110, bg: '#1b1c21' },
      book: { w: 318, l: 30 },
    },
  ];
  const byId = Object.fromEntries(CARS.map((c) => [c.id, c]));
  const LIST_ORDER = ['cullinan', 'bentley', 'phantom', 'urus'];
  const CATS = ['SUV', 'Sedan', 'Convertible'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const state = {
    carId: 'cullinan',
    view: 'grid',           // grid = SUV / Sedan rows, list = big cards
    filter: null,
    liked: {},
    address: '416 Broadway St, New York, 1556',
    start: new Date(2022, 11, 24),
    end: new Date(2022, 11, 26),
    picking: false,
    month: new Date(2022, 11, 1),
    time: '11:00 AM',
    calFlow: 'next',
    card: { num: '4500 2890 7700 0308', exp: '08 / 26', cvv: '•••' },
  };

  /* ------------------------------------------------------------------------
     Helpers / markup
     ---------------------------------------------------------------------- */
  const make = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const splitName = (n) => n.replace(' ', '\n');
  const days = () => Math.max(1, Math.round((state.end - state.start) / 864e5) + 1);
  const fmtRange = () => {
    const a = state.start, b = state.end;
    if (a.getTime() === b.getTime()) return `${a.getDate()} ${MON[a.getMonth()]}, ${a.getFullYear()}`;
    if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) return `${a.getDate()} – ${b.getDate()} ${MON[b.getMonth()]}, ${b.getFullYear()}`;
    return `${a.getDate()} ${MON[a.getMonth()]} – ${b.getDate()} ${MON[b.getMonth()]}, ${b.getFullYear()}`;
  };
  const style = (g) => `width:${g.w}px;left:${g.l}px;top:${g.t}px`;

  /* ---- map ---- */
  function streets(w, h, seed = 11) {
    let s = seed; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const cx = w / 2, cy = h / 2, R = Math.hypot(w, h);
    const fam = (ang, gap, sw) => {
      let o = `<g transform="rotate(${ang} ${cx} ${cy})">`;
      for (let y = cy - R; y < cy + R; y += gap * (0.6 + rnd() * 1.0)) {
        o += `<line x1="${cx - R}" y1="${y.toFixed(1)}" x2="${cx + R}" y2="${(y + (rnd() - .5) * 26).toFixed(1)}" stroke-width="${(sw * (0.7 + rnd() * 0.8)).toFixed(1)}"/>`;
      }
      return o + '</g>';
    };
    return `<svg class="streets" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" stroke="#fff" stroke-linecap="round" fill="none">${fam(-27, 34, 5.5)}${fam(58, 40, 5.5)}${fam(-72, 130, 4.5)}</svg>`;
  }
  const ROUTE = 'M92 300 L111 379 L130 366 L146 381 L238 296 L277 259 L262 235 L296 196';
  function mapHTML(w, h) {
    return `<div class="map">${streets(w, h)}
      <svg class="streets" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="pointer-events:none">
        <defs><linearGradient id="rg${w}${h}" gradientUnits="userSpaceOnUse" x1="92" y1="380" x2="290" y2="200"><stop offset="0" stop-color="#17181c"/><stop offset=".55" stop-color="#3a3b40"/><stop offset="1" stop-color="#cfd0d5"/></linearGradient></defs>
        <path class="route" d="${ROUTE}" stroke="url(#rg${w}${h})"/>
      </svg>
      <div class="pin-dot" style="left:92px;top:300px"></div>
      <div class="pin" style="left:92px;top:254px">${I.pin}</div>
      <div class="car-mark" style="left:296px;top:196px">${I.carTop}</div>
    </div>`;
  }

  /* ---- screens ---- */
  const S = {};

  S.onboarding = () => `
    <section class="screen s-onboarding" data-screen="onboarding">
      <div class="onb-bg"></div>
      <div class="onb-top"><span class="brand">PreRent</span><span class="onb-dots"><i></i><i></i><i class="on"></i><i></i></span><button class="skip" data-act="start">Skip</button></div>
      <h1>Premium<br>car rental</h1>
      <p>Rent the car of your dreams<br>with home delivery</p>
      <button class="btn-white pressable" data-act="start">Get started</button>
    </section>`;

  const mini = (c) => `
    <article class="mini ${c.cls}" data-car="${c.id}">
      <div class="rate">${c.cls === 't-dark' ? I.star : I.starDark.replace('#15161a', '#15161a')}<span>${c.rate}</span></div>
      <img class="car" src="${IMG}${c.file}" style="${style(c.mini)}" alt="${c.name}" draggable="false">
      <div class="nm">${splitName(c.name)}</div>
      <div class="pr">$ ${c.price}<i>/ Day</i></div>
    </article>`;

  const big = (c) => `
    <article class="big ${c.cls}" data-car="${c.id}">
      <div class="rate">${c.cls === 't-dark' ? I.star : I.starDark}<span>${c.rate}</span></div>
      <button class="heart ${state.liked[c.id] ? 'on' : ''}" data-act="like" data-id="${c.id}">${state.liked[c.id] ? I.heart : I.heart}</button>
      <img class="car" src="${IMG}${c.file}" style="${style(c.list).replace(/left:[^;]+;?/, 'left:' + c.list.l + 'px;')}" alt="${c.name}" draggable="false">
      <div class="nm">${c.name}</div>
      ${c.isNew ? '<span class="new">New</span>' : ''}
      <div class="hr"></div>
      <div class="stats"><span>${I.turbo}${c.hp} hp</span><span>${I.half}${c.acc} sec</span><div class="pr">$ ${c.price}<i>/ Day</i></div></div>
    </article>`;

  function homeBody() {
    if (state.filter === 'Convertible') return `<div class="empty">No convertibles available<br>in your area right now.</div>`;
    if (state.view === 'list') {
      const ids = LIST_ORDER.filter((id) => !state.filter || byId[id].cat === state.filter);
      return `<div class="list">${ids.map((id) => big(byId[id])).join('')}</div>`;
    }
    return ['SUV', 'Sedan'].filter((c) => !state.filter || state.filter === c).map((cat) => `
      <div class="sec"><div class="sec-head"><h2>${cat}</h2><button class="arr" data-act="chip" data-chip="${cat}" aria-label="${cat}">${I.arrowR}</button></div>
        <div class="row-scroll">${CARS.filter((c) => c.cat === cat).map(mini).join('')}</div></div>`).join('');
  }

  S.home = () => `
    <section class="screen s-home" data-screen="home">
      <div class="hdr"><div><b>David Smith</b><small>Personal discount available</small></div><div class="avatar"><img src="${IMG}avatar-david.png" alt=""></div></div>
      <div class="chips">${CATS.map((c) => `<button class="chip pressable ${state.filter === c ? 'on' : ''}" data-act="chip" data-chip="${c}">${c}</button>`).join('')}
        <button class="view-toggle pressable" data-act="toggle-view" aria-label="Change layout">${state.view === 'grid' ? I.gridTog : I.listTog}</button></div>
      <div class="home-scroll" id="homeScroll">${homeBody()}</div>
    </section>`;

  const featCards = (c) => `
    <div class="feat f-cream"><div class="ic">${I.turbo.replace('15', '20').replace('15', '20')}</div><div class="lb">Engine\noutput</div><div class="v">${c.hp}<small>hp</small></div></div>
    <div class="feat f-blue"><div class="ic">${I.gauge}</div><div class="lb">Highest\nspeed</div><div class="v">${c.speed}<small>km/h</small></div></div>
    <div class="feat f-dark"><div class="ic">${I.stopw}</div><div class="lb">Time\nto 100 km/h</div><div class="v">${c.acc}<small>sec</small></div></div>
    <div class="feat f-lilac"><div class="ic">${I.seat}</div><div class="lb">Seats\navailable</div><div class="v">${c.seats}<small>pers</small></div></div>`;

  S.detail = (c) => `
    <section class="screen s-detail ${c.hero.light ? 'light' : ''}" data-screen="detail" style="--hero:${c.hero.bg}">
      <div class="hero"><img src="${IMG}${c.hero.file}" style="${style(c.hero)}${c.hero.fade ? ';-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%),linear-gradient(180deg,transparent,#000 8%,#000 90%,transparent);-webkit-mask-composite:source-in;mask-composite:intersect;mask-image:linear-gradient(90deg,transparent,#000 12%),linear-gradient(180deg,transparent,#000 8%,#000 90%,transparent)' : ''}" alt="${c.name}" draggable="false"></div>
      <div class="dt-top"><button class="glass pressable" data-act="back" aria-label="Back">${I.back}</button>
        <div class="g"><button class="glass pressable" data-act="share" aria-label="Share">${I.share}</button><button class="glass pressable ${state.liked[c.id] ? 'on' : ''}" data-act="like-dt" aria-label="Favourite">${state.liked[c.id] ? I.heart.replace('currentColor', '#ebb95c') : I.heartO}</button></div></div>
      <div class="dt-info"><div class="r1"><span>${c.klass}</span><span>${I.star}${c.rate}</span></div><h2>${c.name}</h2><p>${c.desc}</p></div>
      <div class="dt-sheet"><h3>Features</h3><div class="feats">${featCards(c)}</div>
        <div class="dt-bottom"><div class="price">$<b>${c.price}</b><i>/ Day</i></div><button class="btn-gold pressable" data-act="book">Book a car</button></div></div>
    </section>`;

  S.booking = (c) => `
    <section class="screen s-booking" data-screen="booking">
      ${mapHTML(390, 844)}
      <div class="hdr"><div><b>David Smith</b><small>Personal discount available</small></div><div class="avatar"><img src="${IMG}avatar-david.png" alt=""></div></div>
      <div class="b-panel" style="top:calc(var(--ah) - 320px)"><div class="nm">${c.name}</div>${c.isNew ? '<span class="new">New</span>' : ''}</div>
      <img class="b-car" src="${IMG}${c.file}" style="width:${c.book.w}px;left:${c.book.l}px;top:calc(var(--ah) - 397px)" alt="${c.name}" draggable="false">
      <div class="b-sheet" style="height:214px">
        <div class="r1"><span data-r="range">${fmtRange()}</span><span>$ ${c.price} / Day</span></div>
        <div class="r2"><label class="field"><input data-r="addr" value="${state.address}" aria-label="Address" spellcheck="false"></label><button class="cal-btn pressable" data-act="cal-open" aria-label="Choose dates">${I.cal}</button></div>
        <button class="btn-gold pressable" data-act="next">Next</button>
      </div>
    </section>`;

  const calDays = () => {
    const y = state.month.getFullYear(), m = state.month.getMonth();
    const first = new Date(y, m, 1).getDay(); const dim = new Date(y, m + 1, 0).getDate();
    const cells = []; const total = Math.ceil((first + dim) / 7) * 7;
    for (let i = 0; i < total; i++) cells.push(new Date(y, m, 1 - first + i));
    return cells.map((d) => {
      const out = d.getMonth() !== m, t = d.getTime(), s = state.start.getTime(), e = state.end.getTime();
      const isS = t === s, isE = t === e, band = t >= s && t <= e;
      const cls = ['d', out ? 'out' : '', d.getDay() === 0 ? 'sun' : '', band ? 'band' : '', isS ? 's' : '', isE ? 'e' : '', (isS || isE) ? 'edge' : ''].filter(Boolean).join(' ');
      return `<div class="${cls}" data-t="${t}"><span>${d.getDate()}</span></div>`;
    }).join('');
  };
  const calCard = () => `
    <div class="cal-nav"><button class="round pressable" data-act="mprev" aria-label="Previous month">${I.chev}</button><b>${MONTHS[state.month.getMonth()]} ${state.month.getFullYear()}</b><button class="round pressable" data-act="mnext" aria-label="Next month">${I.chevR}</button></div>
    <div class="cal-grid">${['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((w) => `<div class="wd">${w}</div>`).join('')}${calDays()}</div>`;

  S.calendar = () => `
    <section class="screen s-calendar" data-screen="calendar">
      <div class="cal-top"><button class="icon-btn pressable" data-act="back" aria-label="Back">${I.back}</button><div class="avatar"><img src="${IMG}avatar-david.png" alt=""></div></div>
      <h1>Pick a date</h1><div class="sub" data-r="sum">${fmtRange()} · ${days()} day${days() > 1 ? 's' : ''}</div>
      <div class="cal-card" id="calCard">${calCard()}</div>
      <div class="time"><h4>Pick-up time</h4><div class="tl">${['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'].map((t) => `<button class="tchip pressable ${t === state.time || t.replace(/^0/, '') === state.time ? 'on' : ''}" data-act="time" data-time="${t.replace(/^0/, '')}">${t.replace(/^0/, '')}</button>`).join('')}</div></div>
      <button class="btn-dark pressable cta" data-act="confirm">Confirm</button>
    </section>`;

  S.tracking = () => `
    <section class="screen s-tracking" data-screen="tracking">
      ${mapHTML(390, 520)}
      <div class="trk-top"><button class="icon-btn pressable" data-act="back" aria-label="Back">${I.back}</button><h1>Order tracking</h1><div class="dots">${I.dots}</div></div>
      <div class="mgr"><div class="avatar"><img src="${IMG}avatar-steve.png" alt=""></div><div class="who"><b>Steve Torn</b><small>Your manager</small></div>
        <div class="acts"><button class="sq cream pressable" data-act="toast" data-msg="Chat with Steve is coming soon" aria-label="Chat">${I.chat.replace('currentColor', '#15161a')}</button><button class="sq gold pressable" data-act="toast" data-msg="Calling Steve Torn…" aria-label="Call">${I.phone.replace('currentColor', '#15161a')}</button></div></div>
      <div class="trk-bottom">
        <div class="r1"><span>Remaining time</span><div class="timer"><span data-r="h">1</span><small>h</small><span data-r="m">05</span><small>min</small></div></div>
        <div class="r2"><div class="tm">${I.clock}<span data-r="time">${state.time}</span></div><button class="btn-gold pressable" data-act="pay">Pay now</button></div>
      </div>
    </section>`;

  S.payment = () => `
    <section class="screen s-payment" data-screen="payment">
      <div class="pay-top"><button class="icon-btn pressable" data-act="back" aria-label="Back">${I.back}</button><div class="avatar"><img src="${IMG}avatar-david.png" alt=""></div></div>
      <h1>Your cards</h1><button class="plus pressable" data-act="focus-num" aria-label="Add card">${I.plus}</button>
      <div class="tabs">${['Bank card', 'Apple Pay', 'Google Pay', 'Samsung Pay'].map((t, i) => `<button class="tab pressable ${i === 0 ? 'on' : ''}" data-act="tab">${t}</button>`).join('')}</div>
      <div class="pay-sheet"><div class="grab"></div><h3>Add new card</h3>
        <div class="gcard"><div class="visa">VISA</div>
          <div class="num"><span class="dt"><i></i><i></i><i></i><i></i></span><span class="dt"><i></i><i></i><i></i><i></i></span><span class="dt"><i></i><i></i><i></i><i></i></span><span data-r="last">0380</span></div>
          <div class="lb" style="left:24px">Valid thru</div><div class="vv" style="left:24px" data-r="exp">08 / 26</div>
          <div class="lb" style="left:126px">CVV</div><div class="vv" style="left:126px;letter-spacing:.3em" data-r="cvv">•••</div></div>
        <div class="inputs">
          <div class="inp">${I.visa}<input data-in="num" inputmode="numeric" maxlength="19" value="${state.card.num}" aria-label="Card number"><span class="x" data-act="clear" data-for="num">${I.x}</span></div>
          <div class="inp split"><div><input data-in="exp" inputmode="numeric" maxlength="7" value="${state.card.exp}" aria-label="Expiry"><span class="x" data-act="clear" data-for="exp">${I.x}</span></div>
            <div><input data-in="cvv" inputmode="numeric" maxlength="3" value="${state.card.cvv}" aria-label="CVV"><span class="x" data-act="clear" data-for="cvv">${I.x}</span></div></div>
        </div>
        <div class="pay-div"></div>
        <button class="btn-dark pressable" data-act="save">Save card</button>
        <div class="ok" data-r="ok"><div class="badge">${I.check}</div><h2>Booking confirmed</h2><p data-r="okp"></p>
          <div class="sum"><span data-r="okc"></span><span data-r="okt"></span></div>
          <button class="btn-gold pressable" data-act="restart">Back to home</button></div>
      </div>
    </section>`;

  /* ------------------------------------------------------------------------
     App controller
     ---------------------------------------------------------------------- */
  const root = document.documentElement;
  const appEl = $('#app');
  let K = 1, AH = 844, cur = null, lock = false;
  const stack = [];

  function fit() {
    const vw = window.innerWidth, vh = window.innerHeight;
    const mobile = vw <= 520 || (vw <= 900 && vh > vw * 1.25 && vw <= 820 && 'ontouchstart' in window);
    document.body.classList.toggle('is-mobile', mobile);
    let k, ah = 844;
    if (mobile) { k = vw / 390; ah = Math.max(vh / k, 640); }
    else { k = Math.min((vh * 0.94) / 866, (vw * 0.92) / 412); k = Math.max(0.45, Math.min(k, 1.7)); }
    K = k; AH = ah;
    root.style.setProperty('--k', k.toFixed(4));
    root.style.setProperty('--ah', ah.toFixed(1) + 'px');
  }
  window.addEventListener('resize', fit);

  function relRect(el) {
    const a = appEl.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: (r.left - a.left) / K, y: (r.top - a.top) / K, w: r.width / K, h: r.height / K };
  }
  function mount(html, cls = '') {
    const el = make(html); appEl.appendChild(el); if (cls) el.classList.add(...cls.split(' ')); return el;
  }
  function toast(msg) {
    $$('.toast', appEl).forEach((t) => t.remove());
    const t = make(`<div class="toast">${msg}</div>`);
    Object.assign(t.style, { position: 'absolute', left: '50%', top: 'calc(var(--safe) + 14px)', transform: 'translate(-50%,-20px)', opacity: 0, zIndex: 300, background: '#15161a', color: '#fff', font: '600 13px/1 var(--font)', padding: '12px 18px', borderRadius: '16px', boxShadow: '0 14px 30px rgba(0,0,0,.25)', whiteSpace: 'nowrap', transition: 'all .4s cubic-bezier(.2,.8,.2,1)' });
    appEl.appendChild(t); requestAnimationFrame(() => { t.style.opacity = 1; t.style.transform = 'translate(-50%,0)'; });
    setTimeout(() => { t.style.opacity = 0; t.style.transform = 'translate(-50%,-20px)'; setTimeout(() => t.remove(), 400); }, 2000);
  }

  /* ---- generic transitions ---- */
  async function push(el, opts = {}) {
    lock = true; const from = cur;
    el.classList.add('is-active', 'push-in'); if (opts.enter) el.classList.add('in');
    from.classList.add('push-out');
    await wait(640);
    from.classList.remove('push-out', 'is-active'); el.classList.remove('push-in');
    stack.push(from); cur = el; lock = false;
  }
  async function pop() {
    if (!stack.length) return; lock = true;
    const from = cur, to = stack.pop();
    to.classList.add('is-active', 'pop-in'); from.classList.add('pop-out');
    await wait(640);
    to.classList.remove('pop-in'); from.remove(); cur = to; lock = false;
  }
  async function rise(el, opts = {}) {
    lock = true; const from = cur;
    el.classList.add('is-active', 'up-in', 'in');
    await wait(720);
    el.classList.remove('up-in'); from.classList.remove('is-active'); stack.push(from); cur = el; lock = false;
  }
  async function sink() {
    lock = true; const from = cur, to = stack.pop();
    to.classList.add('is-active'); from.classList.add('down-out');
    await wait(560); from.remove(); cur = to; lock = false;
  }

  /* ---- onboarding ---- */
  function showOnboarding() {
    cur = mount(S.onboarding(), 'is-active');
    requestAnimationFrame(() => cur.classList.add('play'));
  }
  async function onbToHome() {
    if (lock) return; lock = true;
    const onb = cur;
    const home = make(S.home()); appEl.insertBefore(home, onb);
    home.classList.add('is-active', 'home-in', 'home-settle');
    onb.classList.add('onb-out');
    await wait(900);
    onb.remove(); home.classList.remove('home-settle'); cur = home; lock = false;
  }

  /* ---- home interactions ---- */
  async function refreshHome(animate = true) {
    const sc = $('#homeScroll', cur); if (!sc) return;
    if (animate) { sc.classList.add('swap-out'); await wait(260); }
    sc.classList.remove('swap-out'); sc.innerHTML = homeBody(); sc.scrollTop = 0;
    $$('.chip', cur).forEach((c) => c.classList.toggle('on', c.dataset.chip === state.filter));
    $('.view-toggle', cur).innerHTML = state.view === 'grid' ? I.gridTog : I.listTog;
    if (animate) { sc.classList.add('swap-in'); await wait(520); sc.classList.remove('swap-in'); }
  }

  function tapRing(e) {
    const a = appEl.getBoundingClientRect();
    const r = make('<div class="tap-ring"></div>');
    r.style.left = (e.clientX - a.left) / K + 'px'; r.style.top = (e.clientY - a.top) / K + 'px';
    appEl.appendChild(r); setTimeout(() => r.remove(), 600);
  }

  /* ---- shared element morph: card <-> detail hero ---- */
  function morphParts(c, cardEl) {
    const cardImg = $('img.car', cardEl);
    const cr = relRect(cardEl), ir = relRect(cardImg);
    return { cr, ir, cardBg: getComputedStyle(cardEl).backgroundImage !== 'none' ? getComputedStyle(cardEl).backgroundImage : getComputedStyle(cardEl).backgroundColor, cardImg };
  }
  function buildMorph(c, cr, ir, cardBg, cardSrc) {
    const m = make(`<div class="morph"><div class="mo" style="position:absolute;inset:0;background:${c.hero.bg};opacity:0"></div><img class="ma" src="${cardSrc}" alt=""><img class="mb" src="${IMG}${c.hero.file}" alt="" style="opacity:0"></div>`);
    Object.assign(m.style, { left: cr.x + 'px', top: cr.y + 'px', width: cr.w + 'px', height: cr.h + 'px', background: cardBg, borderRadius: '26px' });
    const ma = $('.ma', m); Object.assign(ma.style, { left: ir.x - cr.x + 'px', top: ir.y - cr.y + 'px', width: ir.w + 'px' });
    const mb = $('.mb', m); Object.assign(mb.style, { left: c.hero.l + 'px', top: c.hero.t + 'px', width: c.hero.w + 'px' });
    if (c.hero.fade) mb.style.cssText += ';-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%);mask-image:linear-gradient(90deg,transparent,#000 12%)';
    appEl.appendChild(m); return m;
  }

  async function openDetail(cardEl) {
    if (lock) return; lock = true;
    const c = byId[cardEl.dataset.car]; state.carId = c.id;
    const home = cur;
    const { cr, ir, cardBg } = morphParts(c, cardEl);
    const cardSrc = $('img.car', cardEl).src;
    const dt = make(S.detail(c)); appEl.appendChild(dt);
    const m = buildMorph(c, cr, ir, cardBg, cardSrc);
    cardEl.style.visibility = 'hidden';
    const D = 640, o = { duration: D, easing: EASE, fill: 'forwards' };
    m.animate([{ left: cr.x + 'px', top: cr.y + 'px', width: cr.w + 'px', height: cr.h + 'px', borderRadius: '26px' }, { left: '0px', top: '0px', width: '390px', height: AH + 'px', borderRadius: '0px' }], o);
    const ma = $('.ma', m), mb = $('.mb', m), mo = $('.mo', m);
    if (c.hero.crossfade) {
      ma.animate([{ left: ir.x - cr.x + 'px', top: ir.y - cr.y + 'px', width: ir.w + 'px', opacity: 1 }, { left: c.hero.l + 60 + 'px', top: c.hero.t + 130 + 'px', width: c.hero.w * 0.7 + 'px', opacity: 0 }], o);
      mb.animate([{ opacity: 0 }, { opacity: 0, offset: .35 }, { opacity: 1 }], o);
    } else {
      ma.animate([{ left: ir.x - cr.x + 'px', top: ir.y - cr.y + 'px', width: ir.w + 'px' }, { left: c.hero.l + 'px', top: c.hero.t + 'px', width: c.hero.w + 'px' }], o);
    }
    mo.animate([{ opacity: 0 }, { opacity: 1 }], { ...o, duration: D * 0.8 });
    // other cards recede
    $$('.mini,.big', home).forEach((el) => { if (el !== cardEl) el.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: .0, transform: 'scale(.94)' }], { duration: 380, easing: EASE, fill: 'forwards' }); });
    await wait(D - 40);
    dt.classList.add('is-active', 'in'); await raf();
    await wait(60); m.remove();
    home.classList.remove('is-active');
    $$('.mini,.big', home).forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    stack.push(home); cur = dt; lock = false;
  }

  async function closeDetail() {
    if (lock) return; lock = true;
    const dt = cur, home = stack[stack.length - 1], c = byId[state.carId];
    home.classList.add('is-active');
    const cardEl = $(`[data-car="${c.id}"]`, home);
    const { cr, ir, cardBg } = morphParts(c, cardEl);
    cardEl.style.visibility = 'hidden';
    const m = buildMorph(c, { x: 0, y: 0, w: 390, h: AH }, ir, cardBg, $('img.car', cardEl).src);
    // start state = full-screen hero
    const ma = $('.ma', m), mb = $('.mb', m), mo = $('.mo', m);
    Object.assign(m.style, { left: '0px', top: '0px', width: '390px', height: AH + 'px', borderRadius: '0px' });
    mo.style.opacity = 1;
    const D = 600, o = { duration: D, easing: EASE, fill: 'forwards' };
    dt.classList.add('out');
    await wait(200);
    // swap the live hero for the morph layer instantly
    $$('.hero, .dt-top, .dt-info, .dt-sheet', dt).forEach((e) => (e.style.visibility = 'hidden')); dt.style.background = 'transparent';
    m.animate([{ left: '0px', top: '0px', width: '390px', height: AH + 'px', borderRadius: '0px' }, { left: cr.x + 'px', top: cr.y + 'px', width: cr.w + 'px', height: cr.h + 'px', borderRadius: '26px' }], o);
    if (c.hero.crossfade) {
      Object.assign(mb.style, { opacity: 1 }); Object.assign(ma.style, { opacity: 0, left: c.hero.l + 60 + 'px', top: c.hero.t + 130 + 'px', width: c.hero.w * 0.7 + 'px' });
      ma.animate([{ opacity: 0, left: c.hero.l + 60 + 'px', top: c.hero.t + 130 + 'px', width: c.hero.w * 0.7 + 'px' }, { opacity: 1, left: ir.x - cr.x + 'px', top: ir.y - cr.y + 'px', width: ir.w + 'px' }], o);
      mb.animate([{ opacity: 1 }, { opacity: 1, offset: .35 }, { opacity: 0 }], o);
    } else {
      ma.animate([{ left: c.hero.l + 'px', top: c.hero.t + 'px', width: c.hero.w + 'px' }, { left: ir.x - cr.x + 'px', top: ir.y - cr.y + 'px', width: ir.w + 'px' }], o);
    }
    mo.animate([{ opacity: 1 }, { opacity: 0 }], { ...o, duration: D * 0.9 });
    $$('.mini,.big', home).forEach((el) => { if (el !== cardEl) el.animate([{ opacity: 0, transform: 'scale(.94)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 480, easing: EASE, fill: 'none' }); });
    await wait(D);
    cardEl.style.visibility = ''; m.remove(); dt.remove(); stack.pop(); cur = home; lock = false;
  }

  /* ---- booking ---- */
  async function toBooking() {
    if (lock) return;
    const c = byId[state.carId];
    const el = make(S.booking(c)); appEl.appendChild(el);
    await push(el, { enter: true });
  }

  /* ---- calendar ---- */
  async function toCalendar(flow) {
    if (lock) return;
    const a = $('[data-r="addr"]', cur); if (a) { state.address = a.value.trim() || state.address; }
    state.calFlow = flow; state.picking = false;
    const el = make(S.calendar()); appEl.appendChild(el); await push(el);
  }
  function rerenderCal() {
    $('#calCard', cur).innerHTML = calCard();
    $('[data-r="sum"]', cur).textContent = `${fmtRange()} · ${days()} day${days() > 1 ? 's' : ''}`;
  }
  async function confirmCal() {
    if (lock) return;
    if (state.calFlow === 'next') {
      const el = make(S.tracking()); appEl.appendChild(el); await push(el, { enter: true }); startTracking(el);
    } else {
      const prev = stack[stack.length - 1];
      const r = $('[data-r="range"]', prev); if (r) r.textContent = fmtRange();
      await pop();
    }
  }

  /* ---- tracking ---- */
  async function startTracking(el) {
    const path = $('.route', el); if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 1900, delay: 250, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' });
    const car = $('.car-mark', el), pt = (d) => path.getPointAtLength(len * d);
    const s = pt(0), e = pt(1);
    car.animate([{ left: s.x + 'px', top: s.y + 'px' }, { left: e.x + 'px', top: e.y + 'px' }], { duration: 1900, delay: 250, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'backwards' });
    // count-up
    const h = $('[data-r="h"]', el), m = $('[data-r="m"]', el); let t0 = performance.now();
    (function tick(t) { const p = Math.min(1, (t - t0) / 1100); const v = Math.round(65 * p); h.textContent = Math.floor(v / 60); m.textContent = String(v % 60).padStart(2, '0'); if (p < 1) requestAnimationFrame(tick); else { h.textContent = '1'; m.textContent = '05'; } })(t0);
  }

  /* ---- payment ---- */
  async function toPayment() {
    if (lock) return;
    const el = make(S.payment()); appEl.appendChild(el); await rise(el);
  }
  const maskNum = (v) => v.replace(/\D/g, '').slice(-4).padStart(4, '•') || '0000';
  function bindPayment(root) {
    const num = $('[data-in="num"]', root), exp = $('[data-in="exp"]', root), cvv = $('[data-in="cvv"]', root);
    num.addEventListener('input', () => {
      let v = num.value.replace(/\D/g, '').slice(0, 16); num.value = v.replace(/(.{4})/g, '$1 ').trim();
      $('[data-r="last"]', root).textContent = v.length >= 4 ? v.slice(-4) : '••••'; state.card.num = num.value;
    });
    exp.addEventListener('input', () => {
      let v = exp.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + ' / ' + v.slice(2); exp.value = v; $('[data-r="exp"]', root).textContent = v || 'MM / YY';
    });
    cvv.addEventListener('focus', () => { if (cvv.value === '•••') cvv.value = ''; });
    cvv.addEventListener('input', () => { cvv.value = cvv.value.replace(/\D/g, '').slice(0, 3); $('[data-r="cvv"]', root).textContent = cvv.value.replace(/./g, '•') || '•••'; });
  }
  async function saveCard() {
    const root = cur, btn = $('.btn-dark', root);
    const numOk = $('[data-in="num"]', root).value.replace(/\D/g, '').length === 16;
    if (!numOk) { toast('Enter a valid 16-digit card number'); $('[data-in="num"]', root).focus(); return; }
    const c = byId[state.carId];
    btn.classList.add('busy'); btn.innerHTML = '<div class="spin"></div>';
    await wait(1000);
    const ok = $('[data-r="ok"]', root);
    $('[data-r="okp"]', ok).innerHTML = `Your ${c.name} will arrive<br>at ${state.time} on ${fmtRange()}`;
    $('[data-r="okc"]', ok).textContent = `${days()} day${days() > 1 ? 's' : ''} · ${c.name.split(' ').slice(-1)[0]}`;
    $('[data-r="okt"]', ok).textContent = `$ ${(c.price * days()).toLocaleString('en-US')}`;
    ok.classList.add('show');
  }
  async function restart() {
    if (lock) return; lock = true;
    const home = stack[0].classList.contains('s-home') ? stack[0] : null;
    const fresh = make(S.home()); state.filter = null; appEl.appendChild(fresh);
    fresh.classList.add('is-active', 'home-in');
    fresh.style.opacity = 0; fresh.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });
    await wait(520);
    [...appEl.children].forEach((e) => { if (e !== fresh && e.classList.contains('screen')) e.remove(); });
    fresh.style.opacity = ''; stack.length = 0; cur = fresh; lock = false;
  }

  /* ---- global events ---- */
  appEl.addEventListener('pointerdown', (e) => { if (e.target.closest('.mini,.big')) tapRing(e); });
  appEl.addEventListener('click', async (e) => {
    const t = e.target.closest('[data-act],[data-car],.d[data-t]');
    if (!t) return;
    if (t.matches('.d[data-t]')) {
      const d = new Date(+t.dataset.t);
      if (!state.picking) { state.start = d; state.end = d; state.picking = true; }
      else { if (d < state.start) { state.start = d; state.end = d; } else { state.end = d; state.picking = false; } }
      if (d.getMonth() !== state.month.getMonth()) state.month = new Date(d.getFullYear(), d.getMonth(), 1);
      rerenderCal(); return;
    }
    if (t.dataset.car && !t.dataset.act) { if (e.target.closest('.heart')) return; return openDetail(t); }
    const act = t.dataset.act;
    switch (act) {
      case 'start': return onbToHome();
      case 'toggle-view': if (lock) return; state.view = state.view === 'grid' ? 'list' : 'grid'; $('.view-toggle svg', cur).animate([{ transform: 'rotate(0)' }, { transform: 'rotate(90deg)' }], { duration: 300, easing: EASE }); return refreshHome(true);
      case 'chip': if (lock) return; state.filter = state.filter === t.dataset.chip ? null : t.dataset.chip; return refreshHome(true);
      case 'like': { e.stopPropagation(); const id = t.dataset.id; state.liked[id] = !state.liked[id]; t.classList.toggle('on', !!state.liked[id]); t.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 350 }); return; }
      case 'like-dt': { const id = state.carId; state.liked[id] = !state.liked[id]; t.classList.toggle('on', !!state.liked[id]); t.innerHTML = state.liked[id] ? I.heart.replace('currentColor', '#ebb95c') : I.heartO; if (state.liked[id]) toast('Added to favourites'); return; }
      case 'share': { const u = location.href; if (navigator.share) { try { await navigator.share({ title: byId[state.carId].name, url: u }); } catch (_) { } } else { try { await navigator.clipboard.writeText(u); } catch (_) { } toast('Link copied'); } return; }
      case 'back': {
        if (lock) return;
        const s = cur.dataset.screen;
        if (s === 'detail') return closeDetail();
        if (s === 'payment') return sink();
        return pop();
      }
      case 'book': return toBooking();
      case 'next': if (!$('[data-r="addr"]', cur).value.trim()) { toast('Enter a delivery address'); return; } return toCalendar('next');
      case 'cal-open': return toCalendar('edit');
      case 'mprev': state.month = new Date(state.month.getFullYear(), state.month.getMonth() - 1, 1); return rerenderCal();
      case 'mnext': state.month = new Date(state.month.getFullYear(), state.month.getMonth() + 1, 1); return rerenderCal();
      case 'time': state.time = t.dataset.time; $$('.tchip', cur).forEach((x) => x.classList.toggle('on', x === t)); return;
      case 'confirm': return confirmCal();
      case 'pay': return toPayment();
      case 'toast': return toast(t.dataset.msg);
      case 'tab': $$('.tab', cur).forEach((x) => x.classList.toggle('on', x === t)); return;
      case 'focus-num': { const i = $('[data-in="num"]', cur); i.focus(); i.select(); return; }
      case 'clear': { const i = $(`[data-in="${t.dataset.for}"]`, cur); i.value = ''; i.dispatchEvent(new Event('input')); i.focus(); return; }
      case 'save': return saveCard();
      case 'restart': return restart();
    }
  });
  // keep the card-form live bindings alive for any payment screen created
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1 && n.matches('.s-payment')) bindPayment(n); }))).observe(appEl, { childList: true });
  appEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('[data-r="addr"]')) e.target.blur(); });

  /* ------------------------------------------------------------------------
     Intro showcase (mirrors the opening of the video)
     ---------------------------------------------------------------------- */
  const PRELOAD = ['onboarding-bg.png', 'rolls-royce-cullinan-cut.png', 'bentley-continental-gt-cut.png', 'rolls-royce-phantom-cut.png', 'lamborghini-urus-side-cut.png', 'lamborghini-urus-front.png', 'avatar-david.png', 'avatar-steve.png'];
  const preload = () => Promise.all(PRELOAD.map((f) => new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = IMG + f; })));

  function phone(html, x, y, extra = '') {
    const p = make(`<div class="sc-phone" style="left:${x}px;top:${y}px;${extra}"><div class="app flat" style="--safe:0px">${html}</div></div>`);
    return p;
  }

  async function intro() {
    const sc = $('#showcase'), skip = $('#skipIntro');
    let done = false;
    const finish = async () => {
      if (done) return; done = true;
      skip.classList.add('hide');
      $('#device').animate([{ transform: 'scale(1.14)' }, { transform: 'scale(1)' }], { duration: 1300, easing: 'cubic-bezier(.2,.8,.2,1)' });
      sc.classList.add('hide'); await wait(650); sc.remove(); skip.remove();
    };
    skip.addEventListener('click', () => { skipped = true; finishNow(); });
    let skipped = false;
    const finishNow = () => { $$('.sc-stage *', sc).forEach((n) => n.getAnimations && n.getAnimations().forEach((a) => a.cancel())); finish(); };
    const stop = () => skipped;

    const stage = make('<div class="sc-stage"><div class="sc-plane"></div></div>'); sc.appendChild(stage);
    const plane = $('.sc-plane', stage);
    const vh = window.innerHeight, vw = window.innerWidth;
    const fitS = Math.min((vh * 0.86) / 844, (vw * 0.9) / 390);

    /* A — three flat screens (tracking → list → cards) */
    const prevView = state.view; state.view = 'list';
    const listHome = S.home(); state.view = prevView;
    const seq = [S.tracking(), listHome, S.payment()].map((h) => {
      const p = phone(h, -195, -422); p.style.opacity = 0; p.style.transform = `scale(${fitS})`; p.style.transformOrigin = '50% 50%'; plane.appendChild(p); return p;
    });
    // remove the intro-only helper: make the tracking screen's route visible
    for (const p of seq) {
      if (stop()) return;
      p.animate([{ opacity: 0, transform: `translateY(30px) scale(${fitS * .96})` }, { opacity: 1, transform: `translateY(0) scale(${fitS})` }], { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
      await wait(780);
      p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: 'forwards' });
    }
    if (stop()) return;

    /* B — tilted board drifting across the frame */
    const board = make('<div class="sc-board" style="position:absolute;left:0;top:0;transform-style:preserve-3d"></div>'); plane.appendChild(board);
    state.view = 'grid';
    const screens = [S.onboarding(), S.home(), S.detail(byId.cullinan), S.booking(byId.cullinan), S.tracking(), S.payment(), S.calendar(), S.home()];
    const GAP = 470;
    screens.forEach((h, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const p = phone(h, col * GAP - 195 - GAP, row * 930 - 422 - 470);
      board.appendChild(p);
    });
    const s0 = fitS * 0.62;
    board.animate([
      { transform: `rotateX(52deg) rotateZ(-38deg) scale(${s0 * 0.8}) translate3d(240px, 40px, 0)`, opacity: 0.0 },
      { transform: `rotateX(52deg) rotateZ(-38deg) scale(${s0}) translate3d(120px, 20px, 0)`, opacity: 1, offset: .18 },
      { transform: `rotateX(46deg) rotateZ(-30deg) scale(${s0 * 1.08}) translate3d(-140px, -70px, 0)`, opacity: 1 }
    ], { duration: 1600, easing: 'cubic-bezier(.45,0,.25,1)', fill: 'forwards' });
    await wait(1450); if (stop()) return;

    /* C — onboarding lands flat, then cut to the studio scene */
    board.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
    const ob = phone(S.onboarding(), -195, -422); ob.style.opacity = 0; ob.style.transformOrigin = '50% 50%'; plane.appendChild(ob);
    ob.animate([{ opacity: 0, transform: `scale(${fitS * 1.4})` }, { opacity: 1, transform: `scale(${fitS})` }], { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
    await wait(950); if (stop()) return;
    finish();
  }

  /* ------------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  async function boot() {
    fit();
    await preload();
    showOnboarding();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || /[?&]nointro/.test(location.search)) { $('#showcase')?.remove(); $('#skipIntro')?.remove(); return; }
    intro();
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
