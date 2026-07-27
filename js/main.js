/* ============================================================
   Stefan Neculicioiu — Youth Coach Website
   main.js

   A. Scroll-aware header
   B. Mobile navigation toggle
   C. Scroll-triggered reveal animations
   D. Active navigation link highlighting
   ============================================================ */

(function () {
  'use strict';

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
    function openMenu() {
      hamburger.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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

})();
