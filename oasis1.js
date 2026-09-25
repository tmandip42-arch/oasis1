/* ═══════════════════════════════════════════
   OASIS CREATION POKHARA — SCRIPT
   ═══════════════════════════════════════════ */

(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const WHATSAPP = '9779856017909';
  const waLink = (msg) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  /* ───────── STORE INVENTORY ───────── */
  const ITEMS = [
    // ── BAGS & PURSES ──
    { emoji: '👜', tag: 'Bags', cat: 'bags', title: 'Side Bag — Unisex', desc: 'Everyday cross-body side bag with roomy compartments. Available in black, olive and tan.' },
    { emoji: '👛', tag: 'Purses', cat: 'bags', title: 'Women\'s Purse', desc: 'Compact hand purse with zip compartments — perfect for daily use or a night out.' },
    { emoji: '🎒', tag: 'Bags', cat: 'bags', title: 'Backpack', desc: 'Casual backpack for school, work or travel. Sturdy straps, multiple pockets.' },
    { emoji: '💼', tag: 'Bags', cat: 'bags', title: 'Laptop Shoulder Bag', desc: 'Padded shoulder bag that fits most 14–15" laptops. Clean, professional look.' },

    // ── JACKETS ──
    { emoji: '🧥', tag: 'Jackets', cat: 'jackets', title: 'Puffer Jacket', desc: 'Warm padded puffer — great for Pokhara winter mornings. Men & women sizes.' },
    { emoji: '🥋', tag: 'Jackets', cat: 'jackets', title: 'Windproof Jacket', desc: 'Lightweight windproof outer layer with hood. Perfect for trekking and travel.' },
    { emoji: '🧥', tag: 'Jackets', cat: 'jackets', title: 'Denim Jacket', desc: 'Classic denim jacket — a wardrobe staple for both men and women.' },
    { emoji: '🧥', tag: 'Jackets', cat: 'jackets', title: 'Fleece Jacket', desc: 'Cosy fleece for cool evenings. Soft, warm, and easy to layer.' },

    // ── CLOTHING ──
    { emoji: '👖', tag: 'Pants', cat: 'clothing', title: 'Cargo Pants', desc: 'Durable cargo pants with plenty of pockets. Unisex fit, multiple colours.' },
    { emoji: '👖', tag: 'Pants', cat: 'clothing', title: 'Slim-Fit Jeans', desc: 'Stretch denim jeans in slim fit — for him and her. Standard sizes available.' },
    { emoji: '👕', tag: 'Tops', cat: 'clothing', title: 'T-Shirt (Men)', desc: 'Cotton crew-neck tee. Plain, printed and graphic designs in stock.' },
    { emoji: '👚', tag: 'Tops', cat: 'clothing', title: 'T-Shirt (Women)', desc: 'Soft cotton tees in relaxed and fitted cuts. Many colours available.' },
    { emoji: '🧥', tag: 'Hoodies', cat: 'clothing', title: 'Pullover Hoodie', desc: 'Warm fleece-lined hoodie — unisex, with kangaroo pocket.' },

    // ── ACCESSORIES ──
    { emoji: '🧢', tag: 'Accessories', cat: 'accessories', title: 'Baseball Cap', desc: 'Classic cap in assorted colours. Adjustable strap, unisex fit.' },
    { emoji: '🧣', tag: 'Accessories', cat: 'accessories', title: 'Scarf / Muffler', desc: 'Soft winter scarf to keep the cold out. Multiple colours.' },
    { emoji: '🧤', tag: 'Accessories', cat: 'accessories', title: 'Winter Gloves', desc: 'Warm knit gloves — great for chilly Pokhara mornings.' },
    { emoji: '👓', tag: 'Accessories', cat: 'accessories', title: 'Sunglasses', desc: 'UV-protective sunglasses in trendy frames. For men and women.' },
    { emoji: '⌚', tag: 'Accessories', cat: 'accessories', title: 'Wrist Watch', desc: 'Everyday watch with a clean dial. Great gift option.' },
    { emoji: '👔', tag: 'Accessories', cat: 'accessories', title: 'Leather Belt', desc: 'Classic leather belt with metal buckle. Adjustable, multiple sizes.' },
    { emoji: '💰', tag: 'Accessories', cat: 'accessories', title: 'Wallet', desc: 'Compact bi-fold wallet for men or women. Multiple card slots.' },
    { emoji: '🧦', tag: 'Accessories', cat: 'accessories', title: 'Socks (Pack)', desc: 'Comfortable cotton socks — sold as a pack. Assorted designs.' }
  ];

  /* ═══════════ PRELOADER ═══════════ */
  const preloader = $('#preloader');
  const bar = $('#preloaderBar');
  let progress = 0;

  const tick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18, 100);
    if (bar) bar.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        preloader?.classList.add('is-done');
        document.body.style.overflow = '';
        $('#hero')?.classList.add('is-ready');
        setTimeout(() => preloader?.remove(), 900);
      }, 300);
    }
  }, 130);

  document.body.style.overflow = 'hidden';

  /* ═══════════ RENDER COLLECTION ═══════════ */
  const grid = $('#grid');
  if (grid) {
    grid.innerHTML = ITEMS.map((item, i) => {
      const msg = `Hi Oasis Creation Pokhara! I'm interested in the "${item.title}". Could you share the price, available sizes/colours and availability?`;
      return `
        <article class="card reveal" data-cat="${item.cat}" style="transition-delay:${(i % 6) * 60}ms">
          <div class="card__top">
            <div class="card__emoji" aria-hidden="true">${item.emoji}</div>
            <span class="card__tag">${item.tag}</span>
          </div>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__desc">${item.desc}</p>
          <a class="card__cta" href="${waLink(msg)}" target="_blank" rel="noopener" data-cursor="hover">
            <i class="fa-brands fa-whatsapp"></i> Ask on WhatsApp
          </a>
        </article>
      `;
    }).join('');
  }

  /* ═══════════ FILTERS ═══════════ */
  const filters = $('#filters');
  if (filters) {
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;

      $$('.filter', filters).forEach(f => f.classList.remove('is-active'));
      btn.classList.add('is-active');

      const cat = btn.dataset.filter;
      $$('.card', grid).forEach(card => {
        const match = cat === 'all' || card.dataset.cat === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  /* ═══════════ NAV — sticky + drawer ═══════════ */
  const nav = $('#nav');
  const burger = $('#burger');
  const drawer = $('#drawer');

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-stuck', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('is-open');
    drawer?.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('[data-close]').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('is-open');
      drawer?.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  /* ═══════════ SCROLL PROGRESS ═══════════ */
  const progressBar = $('#scrollProgress');
  const updateProgress = () => {
    if (!progressBar) return;
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progressBar.style.width = `${(scrolled || 0) * 100}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ═══════════ REVEAL ON SCROLL ═══════════ */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(el => io.observe(el));

  /* ═══════════ CUSTOM CURSOR ═══════════ */
  const cursor = $('#cursor');
  const dot = $('#cursorDot');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (canHover && cursor && dot) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const loop = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();

    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('a, button, [data-cursor="hover"], .card, .social-card, .visit__card, .filter');
      cursor.classList.toggle('is-hover', !!t);
    });
  }

  /* ═══════════ MAGNETIC BUTTONS ═══════════ */
  if (canHover) {
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ═══════════ CARD SPOTLIGHT ═══════════ */
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });

  /* ═══════════ HERO PARALLAX ═══════════ */
  const parallaxEls = $$('[data-parallax]');
  if (parallaxEls.length) {
    let rafId = null;
    window.addEventListener('scroll', () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0;
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
        rafId = null;
      });
    }, { passive: true });
  }

  /* ═══════════ MARQUEE — seamless loop ═══════════ */
  const track = $('#marqueeTrack');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ═══════════ YEAR ═══════════ */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ═══════════ SMOOTH ANCHOR SCROLL ═══════════ */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ═══════════ CONSOLE SIGNATURE ═══════════ */
  console.log(
    '%cOasis Creation Pokhara',
    'color:#e0a25c;font-family:serif;font-size:18px;font-weight:700;'
  );
  console.log(
    '%cBags · Jackets · Clothing · Accessories · WhatsApp: 9856017909',
    'color:#b7a998;font-size:12px;'
  );
})();