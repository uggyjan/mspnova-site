/* MSPNova site — shared chrome (header + footer + nav state + FAQ).
   Drop into any page after <body>; the script auto-injects header/footer
   into [data-mn-header] and [data-mn-footer], and wires up FAQ accordions. */

(function () {
  'use strict';

  // ---------- LOGO (static SVG, brand-book spec) ----------
  // Resolves to <root>assets/mspnova-logo.svg or mspnova-logo-on-dark.svg
  // depending on background. Path-rewriting happens later via data-mn-root.
  function logo({ onDark = false, scale = 1 } = {}) {
    var src = onDark ? '/assets/mspnova-logo-on-dark.svg?v=3' : '/assets/mspnova-logo.svg?v=3';
    var height = Math.round(40 * scale);
    var width = Math.round(240 * scale * (height / 40));
    return '<a href="/" class="nv-logo-static" aria-label="MSPNova home">'
      + '<img src="' + src + '" alt="MSPNova" width="' + width + '" height="' + height + '" style="display:block;height:' + height + 'px;width:' + width + 'px;max-width:none;flex-shrink:0;"/>'
      + '</a>';
  }
  // ---------- HEADER ----------
  function header(currentPath) {
    const items = [
      { href: '/features/', label: 'Features' },
      { href: '/pricing/',  label: 'Pricing' },
      { href: '/customers/', label: 'Customers' },
      { href: '/integrations/', label: 'Integrations' },
      { href: '/security/', label: 'Security' },
      { href: '/about/',    label: 'About' },
    ];
    const isActive = (href) => {
      // Strip leading slash, compare against current pathname
      const target = href.replace(/^\//, '').replace(/\/$/, ''); // "features"
      if (target === '') return /(^|\/)(index\.html)?$/.test(currentPath);
      return currentPath.indexOf('/' + target) >= 0 || currentPath.indexOf(target + '/') >= 0;
    };
    return `
<header class="site-header">
  <div class="container site-header__inner">
    <div class="site-header__logo">${logo({ onDark: true, scale: 0.9 })}</div>
    <nav class="site-nav" aria-label="Primary">
      ${items.map(i => `<a href="${i.href}" class="${isActive(i.href) ? 'is-active' : ''}">${i.label}</a>`).join('')}
    </nav>
    <a href="/contact/" class="btn btn-primary btn-sm btn-arrow site-header__cta">Book a demo</a>
    <button class="site-header__menu-btn" aria-label="Open menu" aria-expanded="false" data-mn-menu>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
    </button>
  </div>
  <div class="site-header__mobile" hidden data-mn-mobile>
    <div class="container" style="padding-top: 16px; padding-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">
      ${items.map(i => `<a href="${i.href}" style="font-size: 16px; padding: 12px 0; color: #fff; border-bottom: 1px solid var(--c-navy-3);">${i.label}</a>`).join('')}
      <a href="/contact/" class="btn btn-primary btn-arrow" style="margin-top: 12px;">Book a demo</a>
    </div>
  </div>
</header>`.trim();
  }

  // ---------- FOOTER ----------
  function footer() {
    const cols = [
      { t: 'Product', items: [
        ['Triage', '/features/triage/'],
        ['Needs Attention', '/features/needs-attention/'],
        ['Pulse', '/features/pulse/'],
        ['Field Ops', '/features/field-ops/'],
        ['Client Portal', '/features/client-portal/'],
        ['Pricing', '/pricing/'],
      ]},
      { t: 'Solutions', items: [
        ['For Autotask MSPs', '/integrations/#autotask'],
        ['White-label portal', '/features/client-portal/'],
        ['Microsoft Teams', '/integrations/#teams'],
      ]},
      { t: 'Company', items: [
        ['About', '/about/'],
        ['Customers', '/customers/'],
        ['Contact', '/contact/'],
        ['Sitemap', '/sitemap/'],
      ]},
      { t: 'Trust', items: [
        ['Security', '/security/'],
        ['Privacy', '/privacy/'],
        ['Terms', '/terms/'],
        ['DPA', '/security/#dpa'],
      ]},
    ];
    const socials = [
      { id: 'linkedin', href: 'https://www.linkedin.com/company/mspnova/', svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"/></svg>' },
    ];
    const year = new Date().getFullYear();
    return `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <div>
        <div style="margin-bottom: 24px;">${logo({ onDark: true, scale: 1 })}</div>
        <p class="site-footer__about">AI dispatch for MSPs. Built inside a working help desk by Techital, in Glendale, CA.</p>
        <div class="site-footer__socials" aria-label="Social media">
          ${socials.map(s => `<a class="site-footer__social" href="${s.href}" aria-label="${s.id}" rel="noopener">${s.svg}</a>`).join('')}
        </div>
      </div>
      ${cols.map(c => `
        <div>
          <div class="site-footer__col-title">${c.t}</div>
          <div class="site-footer__list">
            ${c.items.map(([n, h]) => `<a href="${h}">${n}</a>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
    <div class="site-footer__bottom">
      <div>© ${year} Nova · Techital · All rights reserved</div>
      <div class="site-footer__compliance">
        <span>Built by operators</span>
        <span>Autotask · Entra · Anthropic</span>
      </div>
    </div>
  </div>
</footer>`.trim();
  }

  // ---------- ICONS (a minimal Feather-style set used across the site) ----------
  const ICONS = {
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    check:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    cpu:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="2" x2="9" y2="4"></line><line x1="15" y1="2" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="22"></line><line x1="15" y1="20" x2="15" y2="22"></line><line x1="20" y1="9" x2="22" y2="9"></line><line x1="20" y1="14" x2="22" y2="14"></line><line x1="2" y1="9" x2="4" y2="9"></line><line x1="2" y1="14" x2="4" y2="14"></line></svg>',
    dispatch:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>',
    message:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    server:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    shield:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    phone:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    target:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    zap:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
    activity:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
    layers:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    users:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    lock:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    chevronBg:  '<svg viewBox="0 0 100 110" fill="currentColor" aria-hidden="true"><path d="M5 22 L40 55 L5 88 Z" opacity="0.25"/><path d="M25 22 L60 55 L25 88 Z" opacity="0.5"/><path d="M45 22 L80 55 L45 88 Z" opacity="0.8"/><path d="M65 22 L100 55 L65 88 Z" opacity="1"/></svg>',
  };

  // ---------- ROOT URL ----------
  // Each page declares its depth from /site/ root via <html data-mn-root="../../">.
  // All header/footer links use root-relative paths like "/features/" — we rewrite
  // them to use this prefix at runtime, so the same partial works at any depth.
  function getRoot() {
    return document.documentElement.getAttribute('data-mn-root') || './';
  }
  function rewriteLinks(rootEl) {
    const root = getRoot();
    rootEl.querySelectorAll('a[href^="/"]').forEach(a => {
      const href = a.getAttribute('href');
      // External absolute URLs (http://, https://) start with two slashes via origin — already excluded by attribute selector match.
      // Skip mailto/tel — also excluded.
      // Map "/features/" → root + "features/index.html" so it works on file:// too
      let rel = href.slice(1); // drop leading /
      if (rel === '' || rel === '/') {
        a.setAttribute('href', root + 'index.html');
      } else if (rel.endsWith('/')) {
        a.setAttribute('href', root + rel + 'index.html');
      } else if (rel.includes('#') && !rel.includes('.html')) {
        // /integrations/#teams → root + "integrations/index.html#teams"
        const [p, h] = rel.split('#');
        const pp = p.endsWith('/') ? p + 'index.html' : (p ? p + '/index.html' : 'index.html');
        a.setAttribute('href', root + pp + '#' + h);
      } else {
        a.setAttribute('href', root + rel);
      }
    });
    rootEl.querySelectorAll('img[src^="/"]').forEach(img => {
      const src = img.getAttribute('src');
      img.setAttribute('src', root + src.slice(1));
    });
  }

  // ---------- INIT ----------
  function init() {
    const path = window.location.pathname;
    const headerSlot = document.querySelector('[data-mn-header]');
    const footerSlot = document.querySelector('[data-mn-footer]');
    if (headerSlot) headerSlot.outerHTML = header(path);
    if (footerSlot) footerSlot.outerHTML = footer();

    // Rewrite root-relative links inside the freshly injected chrome + body
    rewriteLinks(document.body);

    // Inline icons: <i data-icon="check"></i> → svg
    document.querySelectorAll('[data-icon]').forEach(el => {
      const name = el.getAttribute('data-icon');
      if (ICONS[name]) {
        el.innerHTML = ICONS[name];
        el.setAttribute('aria-hidden', 'true');
      }
    });

    // Mobile menu
    const menuBtn = document.querySelector('[data-mn-menu]');
    const mobile = document.querySelector('[data-mn-mobile]');
    if (menuBtn && mobile) {
      menuBtn.addEventListener('click', () => {
        const open = !mobile.hidden;
        mobile.hidden = open;
        menuBtn.setAttribute('aria-expanded', String(!open));
      });
    }

    // FAQ accordions
    document.querySelectorAll('.faq__item').forEach((item, i) => {
      const q = item.querySelector('.faq__q');
      if (!q) return;
      if (i === 0) item.classList.add('faq__item--open');
      q.addEventListener('click', () => {
        item.classList.toggle('faq__item--open');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging
  window.MSPNovaSite = { logo, header, footer, ICONS };
})();
