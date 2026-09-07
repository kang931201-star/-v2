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
  var tabs = document.querySelectorAll('.season-tab');
  if (tabs.length < 2) return;

  var seasons = [
    { el: tabs[0], start: new Date(2026, 9, 1), end: new Date(2026, 9, 31, 23, 59, 59) },
    { el: tabs[1], start: new Date(2026, 10, 1), end: new Date(2026, 10, 30, 23, 59, 59) }
  ];

  var now = new Date();
  var activeSeason = seasons[0];

  seasons.forEach(function (season) {
    if (now >= season.start && now <= season.end) activeSeason = season;
  });
  if (now > seasons[seasons.length - 1].end) activeSeason = seasons[seasons.length - 1];

  tabs.forEach(function (tab) {
    tab.classList.toggle('season-tab--active', tab === activeSeason.el);
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
    var stillOpen = document.querySelector('[data-modal]:not([hidden])');
    document.body.style.overflow = stillOpen ? 'hidden' : '';
    activeModal = stillOpen || null;
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

  var guide = document.getElementById('cert-modal-guide');
  var form = document.getElementById('cert-modal-form');
  var success = document.getElementById('cert-modal-success');
  var fileInput = document.getElementById('cert-modal-file');
  var preview = document.getElementById('cert-modal-preview');
  var uploadIcon = document.getElementById('cert-modal-upload-icon');
  var uploadPlaceholder = document.getElementById('cert-modal-upload-placeholder');
  var uploadPlaceholderDefault = uploadPlaceholder ? uploadPlaceholder.textContent : '';
  var pidInput = document.getElementById('cert-modal-pid');
  var nameInput = document.getElementById('cert-modal-name');
  var phoneInput = document.getElementById('cert-modal-phone');
  var consent = document.getElementById('cert-modal-consent');
  var errorEl = document.getElementById('cert-modal-error');
  var certModal = document.getElementById('cert-modal');

  var ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];
  var MAX_FILE_SIZE = 3 * 1024 * 1024;

  if (fileInput && preview && uploadIcon && uploadPlaceholder) {
    fileInput.addEventListener('change', function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;

      if (ALLOWED_FILE_TYPES.indexOf(file.type) === -1) {
        fileInput.value = '';
        return showError('JPG, JPEG, PNG 파일만 업로드할 수 있습니다.', fileInput);
      }
      if (file.size > MAX_FILE_SIZE) {
        fileInput.value = '';
        return showError('파일 용량은 3MB 이하만 업로드할 수 있습니다.', fileInput);
      }
      clearError();

      var reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.hidden = false;
        uploadIcon.hidden = true;
        uploadPlaceholder.textContent = file.name;
      };
      reader.readAsDataURL(file);
    });
  }

  function showError(message, focusEl) {
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.hidden = false;
    }
    if (focusEl) focusEl.focus();
  }

  function clearError() {
    if (errorEl) errorEl.hidden = true;
  }

  function resetCertModal() {
    if (guide) guide.hidden = false;
    if (form) {
      form.reset();
      form.hidden = false;
    }
    if (success) success.hidden = true;
    if (preview) {
      preview.src = '';
      preview.hidden = true;
    }
    if (uploadIcon) uploadIcon.hidden = false;
    if (uploadPlaceholder) uploadPlaceholder.textContent = uploadPlaceholderDefault;
    clearError();
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      var hasFile = fileInput && fileInput.files && fileInput.files.length > 0;
      if (!hasFile) return showError('발급 완료 화면 캡처 이미지를 선택해 주세요.', fileInput);
      if (!pidInput.value.trim()) return showError('피카플레이 ID를 입력해 주세요.', pidInput);
      if (!nameInput.value.trim()) return showError('이름을 입력해 주세요.', nameInput);
      if (!phoneInput.value.trim()) return showError('휴대폰 번호를 입력해 주세요.', phoneInput);
      if (!consent.checked) return showError('개인정보 수집·이용에 동의해 주세요.', consent);

      var submission = {
        pid: pidInput.value.trim(),
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        fileName: fileInput.files[0].name,
        submittedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('cbl-cert-submission', JSON.stringify(submission));
      } catch (err) {
        /* localStorage unavailable (private mode, storage full) — submission still succeeds in-session */
      }

      if (guide) guide.hidden = true;
      form.hidden = true;
      if (success) success.hidden = false;
    });
  }

  if (certModal) {
    certModal.querySelectorAll('[data-modal-close]').forEach(function (closer) {
      closer.addEventListener('click', resetCertModal);
    });
  }
})();