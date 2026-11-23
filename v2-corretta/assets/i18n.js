/* LINK-ITALIA & PARTNERS — traduzioni.
   I testi italiani sono nella pagina. Ogni altra lingua sta in i18n/<codice>.json
   con le stesse chiavi di i18n/it.json: una chiave mancante resta in italiano. */
(function () {
  'use strict';
  var LANGS = [
    ['bg', 'Български'], ['cs', 'Čeština'], ['da', 'Dansk'], ['de', 'Deutsch'],
    ['el', 'Ελληνικά'], ['en', 'English'], ['es', 'Español'], ['et', 'Eesti'],
    ['fi', 'Suomi'], ['fr', 'Français'], ['ga', 'Gaeilge'], ['hr', 'Hrvatski'],
    ['hu', 'Magyar'], ['it', 'Italiano'], ['lt', 'Lietuvių'], ['lv', 'Latviešu'],
    ['mt', 'Malti'], ['nl', 'Nederlands'], ['pl', 'Polski'], ['pt', 'Português'],
    ['ro', 'Română'], ['sk', 'Slovenčina'], ['sl', 'Slovenščina'], ['sv', 'Svenska']
  ];
  var codes = LANGS.map(function (l) { return l[0]; });
  var root = document.documentElement;
  var dict = {};
  var originals = new Map();

  function stored() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (q && codes.indexOf(q) > -1) { save(q); return q; }
    try { var s = localStorage.getItem('lang'); if (s && codes.indexOf(s) > -1) return s; } catch (e) {}
    return 'it';
  }
  function save(l) { try { localStorage.setItem('lang', l); } catch (e) {} }

  function remember() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      originals.set(el, { html: el.innerHTML });
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var o = originals.get(el) || {};
      o.attrs = {};
      el.getAttribute('data-i18n-attr').split(';').forEach(function (p) {
        var a = p.split(':')[0];
        o.attrs[a] = el.getAttribute(a);
      });
      originals.set(el, o);
    });
  }

  function apply(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var o = originals.get(el);
      var v = lang !== 'it' && dict[k];
      if (el.tagName === 'TITLE') { document.title = v ? tmp(v) : tmp(o.html); return; }
      el.innerHTML = v || o.html;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var o = originals.get(el);
      el.getAttribute('data-i18n-attr').split(';').forEach(function (p) {
        var parts = p.split(':'), a = parts[0], k = parts[1];
        var v = lang !== 'it' && dict[k];
        el.setAttribute(a, v ? tmp(v) : (o.attrs[a] || ''));
      });
    });
    root.lang = lang;
    root.classList.remove('i18n-pending');
    fitNav();
    var sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;
  }
  /* Se le voci del menu non stanno nella riga (lingue con parole lunghe),
     si usa il menu compatto come su tablet. */
  function fitNav() {
    var h = document.querySelector('.header-inner');
    if (!h) return;
    root.classList.remove('nav-collapse');
    if (window.innerWidth > 960 && h.scrollWidth > h.clientWidth + 1) root.classList.add('nav-collapse');
  }
  var fitTimer;
  window.addEventListener('resize', function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitNav, 80); });

  function tmp(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; }

  function load(lang) {
    if (lang === 'it') { dict = {}; apply('it'); return; }
    fetch('i18n/' + lang + '.json')
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { dict = d; apply(lang); })
      .catch(function () { dict = {}; apply('it'); });
  }

  window.I18N = {
    t: function (k, fallback) { return dict[k] || fallback; }
  };

  remember();
  var sel = document.getElementById('lang-select');
  if (sel) {
    LANGS.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l[0];
      o.textContent = l[1];
      o.lang = l[0];
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () { save(sel.value); load(sel.value); });
  }
  load(stored());
  setTimeout(function () { root.classList.remove('i18n-pending'); }, 1500);
})();
