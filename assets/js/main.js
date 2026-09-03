(function () {
  var hero = document.querySelector('.hero');
  var nav = document.querySelector('.side-nav');
  if (!hero || !nav || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      nav.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, { threshold: 0 });

  observer.observe(hero);
})();

(function () {
  var navItems = document.querySelectorAll('.side-nav__item');
  if (!navItems.length) return;

  navItems.forEach(function (item) {
    item.addEventListener('click', function () {
      navItems.forEach(function (i) {
        i.classList.toggle('side-nav__item--active', i === item);
      });
    });
  });

  if (!('IntersectionObserver' in window)) return;

  var sections = [];
  navItems.forEach(function (item) {
    var section = document.querySelector(item.getAttribute('href'));
    if (section) sections.push(section);
  });

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = '#' + entry.target.id;
      navItems.forEach(function (i) {
        i.classList.toggle('side-nav__item--active', i.getAttribute('href') === id);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
})();

(function () {
  var tabs = document.querySelectorAll('.howto__tab');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function (t) {
        t.classList.toggle('howto__tab--active', t === tab);
      });

      document.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-tab-panel') !== target;
      });
    });
  });
})();

(function () {
  var openers = document.querySelectorAll('[data-modal-open]');
  if (!openers.length) return;

  var activeModal = null;

  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    activeModal = modal;
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
    activeModal = null;
  }

  openers.forEach(function (opener) {
    opener.addEventListener('click', function () {
      var modal = document.getElementById(opener.getAttribute('data-modal-open'));
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll('[data-modal]').forEach(function (modal) {
    modal.querySelectorAll('[data-modal-close]').forEach(function (closer) {
      closer.addEventListener('click', function () {
        closeModal(modal);
      });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activeModal) closeModal(activeModal);
  });

  var consent = document.getElementById('cert-modal-consent');
  var goBtn = document.getElementById('cert-modal-go');
  if (consent && goBtn) {
    var syncGoBtn = function () {
      goBtn.setAttribute('aria-disabled', String(!consent.checked));
    };
    consent.addEventListener('change', syncGoBtn);
    syncGoBtn();

    goBtn.addEventListener('click', function (e) {
      if (!consent.checked) {
        e.preventDefault();
        consent.focus();
      }
    });
  }
})();
(function () {
  var openers = document.querySelectorAll('[data-modal-open]');
  if (!openers.length) return;

  var activeModal = null;

  function openModal(modal) {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    activeModal = modal;
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
    activeModal = null;
  }

  openers.forEach(function (opener) {
    opener.addEventListener('click', function () {
      var modal = document.getElementById(opener.getAttribute('data-modal-open'));
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll('[data-modal]').forEach(function (modal) {
    modal.querySelectorAll('[data-modal-close]').forEach(function (closer) {
      closer.addEventListener('click', function () {
        closeModal(modal);
      });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activeModal) closeModal(activeModal);
  });

  var consent = document.getElementById('cert-modal-consent');
  var goBtn = document.getElementById('cert-modal-go');
  if (consent && goBtn) {
    var syncGoBtn = function () {
      goBtn.setAttribute('aria-disabled', String(!consent.checked));
    };
    consent.addEventListener('change', syncGoBtn);
    syncGoBtn();

    goBtn.addEventListener('click', function (e) {
      if (!consent.checked) {
        e.preventDefault();
        consent.focus();
      }
    });
  }
})();