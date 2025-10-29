const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle');

/*menu show- hidden*/
navToggle.addEventListener('click', () =>{

    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('animate-toggle');
});


/*const styleSwitcher = document.getElementById('style-switcher'),
switcherToggle = document.getElementById('switcher-toggle'),
switcherClose = document.getElementById('switcher-close');

switcherToggle.addEventListener('click', () =>{
    styleSwitcher.classList.add('show-switcher');
}
)*/ 



/* ===== Year in footer ===== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== Works filter (simple) ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const cat = btn.dataset.filter;
    workCards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

/* ===== Testimonials slider (auto-rotate) ===== */
const testiCards = document.querySelectorAll('.testi-card');
if (testiCards.length) {
  let i = 0;
  setInterval(() => {
    testiCards[i].classList.remove('is-active');
    i = (i + 1) % testiCards.length;
    testiCards[i].classList.add('is-active');
  }, 5000);
}

/* ===== Optional: close menu on link click (works if you later add hrefs with #ids) ===== */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navMenu && navMenu.classList.contains('show-menu')) {
      navMenu.classList.remove('show-menu');
      if (navToggle) navToggle.classList.remove('animate-toggle');
    }
  });
});





(function(){
  const grid = document.querySelector('#services .services-grid');
  if(!grid) return;

  const cards = Array.from(grid.querySelectorAll('.service-card'));
  const prevBtn = document.querySelector('#services .services-arrow--prev');
  const nextBtn = document.querySelector('#services .services-arrow--next');

  const getActiveIndex = () => {
    const viewportCenter = grid.getBoundingClientRect().left + grid.clientWidth / 2;
    let best = {i: 0, d: Infinity};
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const d = Math.abs(cardCenter - viewportCenter);
      if (d < best.d) best = {i, d};
    });
    return best.i;
  };

  const setActiveClasses = () => {
    const idx = getActiveIndex();
    cards.forEach((c, i) => {
      c.classList.toggle('is-active', i === idx);
      c.classList.toggle('is-prev',   i === idx - 1);
      c.classList.toggle('is-next',   i === idx + 1);
    });
    // дисабъл на стрелките в краищата
    prevBtn.toggleAttribute('disabled', getScrollIndex() <= 0);
    nextBtn.toggleAttribute('disabled', getScrollIndex() >= cards.length - 1);
  };

  // изчисляваме „индекса“ по най-близката карта
  const getScrollIndex = () => getActiveIndex();

  const scrollToIndex = (targetIndex) => {
    const target = cards[Math.max(0, Math.min(cards.length - 1, targetIndex))];
    target?.scrollIntoView({inline: 'center', behavior: 'smooth', block: 'nearest'});
  };

  // първоначално центрираме първата карта
  cards[0]?.scrollIntoView({inline: 'center', block: 'nearest'});

  // listeners
  grid.addEventListener('scroll', () => { requestAnimationFrame(setActiveClasses); }, {passive:true});
  window.addEventListener('resize', () => { requestAnimationFrame(setActiveClasses); });

  prevBtn.addEventListener('click', () => scrollToIndex(getScrollIndex() - 1));
  nextBtn.addEventListener('click', () => scrollToIndex(getScrollIndex() + 1));

  // клавиатурна навигация
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); nextBtn.click(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prevBtn.click(); }
  });

  // след кратко време маркираме активната (за да имаме измерени размери)
  setTimeout(setActiveClasses, 50);
})();


if (location.hash) {
  history.replaceState(null, '', location.pathname + location.search);
}
