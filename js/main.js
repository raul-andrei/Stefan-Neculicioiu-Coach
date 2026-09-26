/* ============================================================
   Stefan Neculicioiu — Youth Coach Website
   main.js

   A. Scroll-aware header
   B. Mobile navigation toggle
   C. Scroll-triggered reveal animations
   D. Active navigation link highlighting
   E. Expand / collapse toggle
   ============================================================ */

(function () {
  'use strict';

  // Tells the inline <head> failsafe that JS-driven states (reveals,
  // expanders) will work; without it the page falls back to static.
  window.mainReady = true;

  /* ─────────────────────────────────────────────
     A. SCROLL-AWARE HEADER
     Adds .header--scrolled when page is scrolled
     past 50px (uses rAF throttle).
  ───────────────────────────────────────────── */
  const header = document.querySelector('.header');

  if (header) {
    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader(); // Run once on load
  }


  /* ─────────────────────────────────────────────
     B. MOBILE NAVIGATION TOGGLE
     Toggles .is-open on hamburger + mobile menu.
     Closes on nav link click or Escape key.
  ───────────────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    // Scroll lock: html has overflow-x set, so overflow on <body> alone
    // never stops the page (and iOS ignores it anyway). Pin the body in
    // place at the current offset and restore it on close.
    const root = document.documentElement;
    let lockedY = 0;

    function openMenu() {
      hamburger.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      lockedY = window.scrollY;
      document.body.style.top = -lockedY + 'px';
      root.classList.add('menu-open');
    }

    function closeMenu() {
      if (!root.classList.contains('menu-open')) return;
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      root.classList.remove('menu-open');
      document.body.style.top = '';
      // Jump back without the page's smooth scroll-behavior kicking in
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, lockedY);
      root.style.scrollBehavior = '';
    }

    hamburger.addEventListener('click', function () {
      hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }


  /* ─────────────────────────────────────────────
     C. SCROLL-TRIGGERED REVEAL ANIMATIONS
     IntersectionObserver on .js-reveal elements.
     Adds .is-visible once element enters viewport.
  ───────────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.js-reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show all immediately
    revealElements.forEach(function (el) { el.classList.add('is-visible'); });
  }


  /* ─────────────────────────────────────────────
     D. ACTIVE NAVIGATION LINK HIGHLIGHTING
     Matches current page path to nav href values
     and applies .is-active class.
  ───────────────────────────────────────────── */
  const currentPath = window.location.pathname;

  function markActiveLinks(selector) {
    document.querySelectorAll(selector).forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      const cleanHref = href.replace(/^\//, '').replace(/\/$/, '');
      const cleanPath = currentPath.replace(/^\//, '').replace(/\/$/, '');

      const isHome = (cleanHref === '' || cleanHref === 'index.html') &&
                     (cleanPath === '' || cleanPath.endsWith('index.html') || cleanPath === '');
      const isMatch = cleanHref !== '' && cleanPath.endsWith(cleanHref);

      if (isHome || isMatch) {
        link.classList.add('is-active');
      }
    });
  }

  markActiveLinks('.nav__link');
  markActiveLinks('.mobile-menu__link');


  /* ─────────────────────────────────────────────
     E. EXPAND / COLLAPSE TOGGLE
     Buttons with [data-target] toggle .is-expanded
     on the matching #id element, and update their
     own label + arrow direction.
  ───────────────────────────────────────────── */
  document.querySelectorAll('.expand-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const content  = document.getElementById(targetId);
      if (!content) return;

      const isExpanded = content.classList.toggle('is-expanded');
      btn.classList.toggle('is-expanded', isExpanded);
      btn.setAttribute('aria-expanded', String(isExpanded));

      const label = btn.querySelector('.expand-toggle__text');
      if (label) {
        label.textContent = isExpanded ? 'Închide' : btn.dataset.labelOpen || 'Citește mai mult';
      }
    });

    // Store the original open label so we can restore it on collapse
    const label = btn.querySelector('.expand-toggle__text');
    if (label) btn.dataset.labelOpen = label.textContent;
  });

})();
