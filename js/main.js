/* =========================================
   大宜味村社会福祉協議会 公式サイト
   main.js
   ========================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. 文字サイズ切替
  ───────────────────────────────────────── */
  const body = document.body;
  const fontBtns = document.querySelectorAll('.font-btn');
  const FONT_KEY = 'ogimi-font-size';

  const savedSize = localStorage.getItem(FONT_KEY) || 'medium';
  applyFontSize(savedSize);

  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.size;
      applyFontSize(size);
      localStorage.setItem(FONT_KEY, size);
    });
  });

  function applyFontSize(size) {
    body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    body.classList.add(`font-size-${size}`);
    document.querySelectorAll('.font-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.size === size);
    });
  }

  /* ─────────────────────────────────────────
     2. ハンバーガーメニュー
  ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    body.style.overflow = isOpen ? 'hidden' : '';
  });

  // メニュー外タップで閉じる
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // モバイルメニューリンクをクリックで閉じる
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // モバイル サブメニュー トグル
  document.querySelectorAll('.mobile-sub-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.nextElementSibling?.classList.toggle('open', !isOpen);
    });
  });

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  /* ─────────────────────────────────────────
     3. ヘッダーのスクロール処理
  ───────────────────────────────────────── */
  const header = document.getElementById('site-header');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    header?.classList.toggle('scrolled', scrollY > 10);
    lastScrollY = scrollY;
  }, { passive: true });

  /* ─────────────────────────────────────────
     4. ヒーロースライダー
  ───────────────────────────────────────── */
  const slidesWrapper = document.getElementById('slides-wrapper');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const totalSlides = document.querySelectorAll('.slide').length;

  let currentSlide = 0;
  let autoSlideTimer = null;

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function startAutoSlide() {
    autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  prevBtn?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
  nextBtn?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); });
  });

  // スワイプ対応
  let touchStartX = 0;
  slidesWrapper?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slidesWrapper?.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { goToSlide(dx < 0 ? currentSlide + 1 : currentSlide - 1); resetAutoSlide(); }
  }, { passive: true });

  startAutoSlide();

  // タブ非表示中はスライダーを一時停止
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearInterval(autoSlideTimer); }
    else { startAutoSlide(); }
  });

  /* ─────────────────────────────────────────
     5. お知らせタブ + JSON読み込み
  ───────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const newsListEl = document.getElementById('news-list');
  let newsData = null;
  let currentTab = 'news';

  // ローカル環境（file://）でfetchが失敗した場合のフォールバックデータ
  // ※ data/news.json の内容と同期して更新してください
  const FALLBACK_NEWS = {
    news: [
      { date: '2026-04-10', title: '令和8年度 事業計画書を掲載しました', url: '#' },
      { date: '2026-04-01', title: '令和8年度 社協だより「おおぎみ」第1号を発行しました', url: '#' },
      { date: '2026-03-25', title: '在宅安心カーの利用受付を開始しました', url: '#' },
      { date: '2026-03-15', title: '生活福祉資金の貸付相談について（令和8年度）', url: '#' },
      { date: '2026-02-28', title: 'ランドセル支給のご案内（令和8年度 新小学1年生対象）', url: '#' }
    ],
    kouza: [
      { date: '2026-04-20', title: 'がんじゅう教室（4月）参加者募集のお知らせ', url: '#' },
      { date: '2026-04-15', title: '介護予防講座「健康体操で元気に！」開催のご案内', url: '#' },
      { date: '2026-04-05', title: 'ボランティア入門講座（5月開催）参加者募集', url: '#' },
      { date: '2026-03-20', title: '発達相談サポート講座「子育てのヒント」開催報告', url: '#' },
      { date: '2026-03-10', title: '移動支援従事者研修のご案内', url: '#' }
    ],
    moyooshi: [
      { date: '2026-04-29', title: 'くがにサロン 春の交流会のご案内', url: '#' },
      { date: '2026-04-18', title: 'フードパントリー（食料支援）配布会 4月のお知らせ', url: '#' },
      { date: '2026-04-12', title: '大宜味共同店ネットワーク 春まつり参加のご案内', url: '#' },
      { date: '2026-03-22', title: '地域福祉活動 ボランティア清掃イベント 開催報告', url: '#' },
      { date: '2026-03-05', title: '令和7年度 社協総会 開催のご案内', url: '#' }
    ]
  };

  // news.json を取得。fetchが使えない環境（ローカルfile://）はフォールバックを使用
  fetch('./data/news.json')
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(data => {
      newsData = data;
      renderNews(currentTab);
    })
    .catch(() => {
      // GitHub Pages以外（ローカルプレビュー等）でもお知らせを表示
      newsData = FALLBACK_NEWS;
      renderNews(currentTab);
    });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.toggle('active', b === btn));
      renderNews(currentTab);
    });
  });

  function renderNews(tab) {
    if (!newsListEl || !newsData) return;

    const catMap = { news: 'お知らせ', kouza: '講座', moyooshi: '催し' };
    const catClass = { news: 'cat-news', kouza: 'cat-kouza', moyooshi: 'cat-moyooshi' };
    const items = newsData[tab] || [];

    if (items.length === 0) {
      newsListEl.innerHTML = '<li class="news-loading">現在この分類のお知らせはありません。</li>';
      return;
    }

    newsListEl.innerHTML = items.map(item => `
      <li class="news-item">
        <time class="news-date" datetime="${item.date}">${formatDate(item.date)}</time>
        <span class="news-cat ${catClass[tab]}">${catMap[tab]}</span>
        <a href="${escapeHtml(item.url)}" class="news-title">${escapeHtml(item.title)}</a>
      </li>
    `).join('');
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ─────────────────────────────────────────
     6. 村の人口データ（village.json）
  ───────────────────────────────────────── */
  fetch('./data/village.json')
    .then(r => r.json())
    .then(data => {
      const popEl = document.getElementById('stat-population');
      if (popEl && data.population) {
        popEl.innerHTML = `${escapeHtml(data.population.display)}<span>${escapeHtml(data.population.unit)}</span>`;
      }
      const elderlyEl = document.getElementById('stat-elderly-rate');
      if (elderlyEl && data.elderly_rate) {
        elderlyEl.innerHTML = `${escapeHtml(data.elderly_rate.display)}<span>${escapeHtml(data.elderly_rate.suffix)}</span>`;
      }
      const householdsEl = document.getElementById('stat-households');
      if (householdsEl && data.households) {
        householdsEl.innerHTML = `${escapeHtml(data.households.display)}<span>${escapeHtml(data.households.unit)}</span>`;
      }
    })
    .catch(() => {
      // village.json が読み込めない場合はHTMLの値をそのまま表示
    });

  /* ─────────────────────────────────────────
     7. ページトップボタン
  ───────────────────────────────────────── */
  const pageTop = document.getElementById('page-top');

  window.addEventListener('scroll', () => {
    pageTop?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  pageTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────────
     8. スクロールアニメーション (Intersection Observer)
  ───────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.service-card, .about-layout, .stat-item, .sidebar-banner, .cta-banner-inner'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
      observer.observe(el);
    });
  }

});
