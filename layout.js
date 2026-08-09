// Shared behavior for the header + footer markup that's duplicated
// (identical classes, same styles.css) across all 4 pages. Static markup
// because runtime injection proved unreliable against the DC framework's
// own compile/mount cycle (broke position:sticky, occasionally left
// placeholders empty). Initialization here is deferred a macrotask and
// re-armed on `load` as a defensive safety net around that same
// compile/mount timing; the click handler uses delegation on `document`
// (a target that's never replaced) and the scroll handler does fresh
// element lookups on every tick rather than caching references, so
// neither depends on exactly when the DC framework finishes its work.
(function () {
  function copyEmailText() {
    var lang = window.getLang ? window.getLang() : 'en';
    var dict = window.I18N && window.I18N[lang];
    return (dict && dict['common.footer.copyEmail']) || 'Copy email';
  }

  function copiedText() {
    var lang = window.getLang ? window.getLang() : 'en';
    var dict = window.I18N && window.I18N[lang];
    return (dict && dict['common.footer.copied']) || 'Copied ✓';
  }

  function wireClickDelegation() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('#copy-email-btn');
      if (!btn) return;
      btn.textContent = copiedText();
      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText('arskondesign@gmail.com').catch(function () {});
        }
      } catch (err) {}
      clearTimeout(btn._copyTimer);
      btn._copyTimer = setTimeout(function () { btn.textContent = copyEmailText(); }, 2000);
    });
  }

  function check(el) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    return r.top <= 140 && r.bottom > 140;
  }

  function onScroll() {
    // Work/About/Contact sections only exist on the homepage; on case
    // pages the header links point to the homepage instead, so there's
    // nothing to spy on and no active state to show.
    var work = document.getElementById('work');
    var about = document.getElementById('about');
    var contact = document.getElementById('contact');
    if (!work || !about) return;

    var links = document.querySelectorAll('.nav-home__link[data-nav]');
    if (!links.length) return;

    var active = '';
    if (check(work)) active = 'work';
    if (check(about)) active = 'about';
    if (check(contact)) active = 'contact';
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === active);
    });
  }

  // The .reveal { opacity: 0 } rule survived the migration but the script that
  // added .visible on scroll was lost — leaving reveal content invisible on the
  // case pages. An IntersectionObserver desyncs here because the DC runtime
  // replaces elements after they're observed, so instead we re-query the live
  // DOM on every scroll tick (same robust pattern as the header scroll-spy) and
  // reveal whatever has entered the viewport.
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var els = document.querySelectorAll('.reveal:not(.visible)');
    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      if (r.top < vh * 0.95 && r.bottom > 0) els[i].classList.add('visible');
    }
  }

  var scrollWired = false;
  function onScrollAll() { onScroll(); revealInView(); }

  function init() {
    wireClickDelegation();
    if (!scrollWired) {
      scrollWired = true;
      window.addEventListener('scroll', onScrollAll, { passive: true });
    }
    onScroll();
    revealInView();
  }

  init();
  setTimeout(init, 0);
  setTimeout(function () { onScroll(); revealInView(); }, 300);
  setTimeout(revealInView, 800);
  window.addEventListener('load', function () {
    init();
    onScroll();
    revealInView();
  });
})();
