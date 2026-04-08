/**
 * Force Ouvrière — Saint-Maur-des-Fossés
 * script.js — Global JavaScript
 *
 * Features:
 *  1. Sticky navbar on scroll
 *  2. Mobile menu toggle
 *  3. Active nav link highlighting
 *  4. Scroll-triggered fade-in animations
 *  5. Actions data array + dynamic rendering (actions.html)
 *  6. Contact form validation + mailto fallback
 */

/* =============================================
   1. NAVBAR — sticky shadow & mobile toggle
   ============================================= */
(function initNavbar() {
  const navbar    = document.querySelector('.navbar');
  const toggle    = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.nav-mobile');

  if (!navbar) return;

  /* Add shadow when user scrolls */
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* Mobile hamburger toggle */
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    /* Close menu when a link is clicked */
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    });
  }
})();


/* =============================================
   2. ACTIVE NAV LINK
   ============================================= */
(function highlightActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


/* =============================================
   3. SCROLL FADE-IN (IntersectionObserver)
   ============================================= */
(function initFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  /* Observe all .fade-in elements */
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();


/* =============================================
   4. ACTIONS DATA + RENDERING (actions.html)
   ============================================= */

/**
 * Actions database — edit this array to add/remove/update actions.
 * Each action object contains:
 *   - id       : unique number
 *   - title    : string
 *   - desc     : string (short description)
 *   - status   : 'en cours' | 'à venir' | 'terminée'
 *   - date     : string (display date)
 */
const ACTIONS = [
  {
    id: 1,
    title: 'Négociation des salaires 2024',
    desc: 'Engagement des discussions avec la direction concernant la revalorisation des grilles salariales et l\'indexation sur l\'inflation.',
    status: 'en cours',
    date: 'Depuis janvier 2024',
  },
  {
    id: 2,
    title: 'Journée de mobilisation nationale',
    desc: 'Participation à la journée d\'action nationale Force Ouvrière pour la défense du pouvoir d\'achat et des retraites.',
    status: 'en cours',
    date: '14 mars 2024',
  },
  {
    id: 3,
    title: 'Réunion d\'information — nouvelles réformes',
    desc: 'Séance d\'information ouverte à tous les salariés sur les dernières réformes sociales et leurs impacts sur vos droits.',
    status: 'à venir',
    date: '5 avril 2024',
  },
  {
    id: 4,
    title: 'Permanence juridique — droits au travail',
    desc: 'Consultation gratuite avec nos conseillers juridiques sur vos droits : licenciement, temps de travail, congés, discrimination.',
    status: 'à venir',
    date: '18 avril 2024',
  },
  {
    id: 5,
    title: 'Forum d\'adhésion de printemps',
    desc: 'Stand d\'information et d\'adhésion pour rencontrer nos délégués et en savoir plus sur les avantages d\'être adhérent FO.',
    status: 'à venir',
    date: '26 avril 2024',
  },
  {
    id: 6,
    title: 'Grève du 1er février — transport',
    desc: 'Mobilisation réussie sur la question des conditions de travail dans le secteur des transports. Plus de 60% de grévistes.',
    status: 'terminée',
    date: '1 février 2024',
  },
  {
    id: 7,
    title: 'Accord sur le télétravail',
    desc: 'Signature d\'un accord-cadre sur le télétravail garantissant 2 jours/semaine et la prise en charge des frais professionnels.',
    status: 'terminée',
    date: 'Décembre 2023',
  },
  {
    id: 8,
    title: 'Formation des délégués syndicaux',
    desc: 'Session de formation intensive pour nos délégués sur le droit du travail, la négociation collective et les outils numériques syndicaux.',
    status: 'terminée',
    date: 'Novembre 2023',
  },
];

/**
 * Renders an action card HTML string
 * @param {Object} action
 * @returns {string} HTML
 */
function renderActionCard(action) {
  const statusMap = {
    'en cours' : { cls: 'badge-encours',  label: 'En cours' },
    'à venir'  : { cls: 'badge-avenir',   label: 'À venir'  },
    'terminée' : { cls: 'badge-terminee', label: 'Terminée' },
  };
  const s = statusMap[action.status] || statusMap['terminée'];

  /* Calendar icon SVG (inline) */
  const calIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

  return `
    <article class="action-card fade-in">
      <div class="action-card-top">
        <h3>${action.title}</h3>
        <span class="badge ${s.cls}">${s.label}</span>
      </div>
      <p>${action.desc}</p>
      <div class="action-card-date">${calIcon} ${action.date}</div>
    </article>`;
}

/**
 * Renders all action categories into their containers.
 * Runs only when the #actions-encours element exists (actions.html).
 */
(function renderActions() {
  const containers = {
    'en cours' : document.getElementById('actions-encours'),
    'à venir'  : document.getElementById('actions-avenir'),
    'terminée' : document.getElementById('actions-terminee'),
  };

  /* Exit if not on the actions page */
  if (!containers['en cours']) return;

  /* Group actions by status */
  const groups = { 'en cours': [], 'à venir': [], 'terminée': [] };
  ACTIONS.forEach(a => {
    if (groups[a.status] !== undefined) groups[a.status].push(a);
  });

  /* Inject cards & update count badges */
  Object.entries(groups).forEach(([status, items]) => {
    const container = containers[status];
    if (!container) return;

    /* Update count badge */
    const countEl = document.querySelector(`[data-count="${status}"]`);
    if (countEl) countEl.textContent = items.length;

    if (items.length === 0) {
      container.innerHTML = '<p class="no-actions">Aucune action pour le moment.</p>';
    } else {
      container.innerHTML = items.map(renderActionCard).join('');
    }
  });

  /* Re-trigger fade-in observer for dynamically added cards */
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && (e.target.classList.add('visible'), observer.unobserve(e.target))),
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.action-card.fade-in').forEach(el => observer.observe(el));
})();


/* =============================================
   5. HOME — preview 3 latest "en cours" actions
   ============================================= */
(function renderHomeActions() {
  const grid = document.getElementById('home-actions-grid');
  if (!grid) return;

  const preview = ACTIONS
    .filter(a => a.status === 'en cours' || a.status === 'à venir')
    .slice(0, 3);

  if (preview.length === 0) {
    grid.innerHTML = '<p class="no-actions">Aucune action en cours.</p>';
    return;
  }

  grid.innerHTML = preview.map(renderActionCard).join('');

  /* Trigger fade-in for freshly rendered cards */
  const obs = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && (e.target.classList.add('visible'), obs.unobserve(e.target))),
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  grid.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
})();


/* =============================================
   6. CONTACT FORM — validation + mailto
   ============================================= */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const subject = form.querySelector('#subject') ? form.querySelector('#subject').value : 'Contact FO Saint-Maur';
    const message = form.querySelector('#message').value.trim();

    /* Basic validation */
    if (!name || !email || !message) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Veuillez entrer une adresse email valide.');
      return;
    }

    /* Mailto fallback — replace the email address below with a real one */
    const mailto = `mailto:syndicat.fo@mairie-saint-maur.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\n${message}`)}`;

    window.location.href = mailto;

    /* Show success state */
    form.style.display = 'none';
    if (success) success.style.display = 'block';
  });
})();
