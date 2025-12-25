/**
 * FLOW ORCHESTRATOR - Portfolio JavaScript
 * Adrien Tripon
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================
  // Mobile Menu Toggle
  // ===================================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });
  }

  // ===================================
  // Smooth Scroll for anchor links
  // ===================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===================================
  // KPI Counter Animation
  // ===================================
  const kpiCards = document.querySelectorAll('.kpi-card');
  const animatedKpis = new Set();

  function animateCounter(element, targetValue, duration = 2000) {
    const counter = element.querySelector('.counter');
    if (!counter) return;

    const isNegative = targetValue < 0;
    const absTarget = Math.abs(targetValue);
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(easeOut * absTarget);

      counter.textContent = isNegative ? `-${currentValue}` : (targetValue.toString().startsWith('+') ? `+${currentValue}` : currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function checkKpisInView() {
    kpiCards.forEach(card => {
      if (animatedKpis.has(card)) return;

      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

      if (isVisible) {
        const value = parseInt(card.dataset.value);
        animateCounter(card, value);
        animatedKpis.add(card);
      }
    });
  }

  // ===================================
  // Scroll Animations (Fade In)
  // ===================================
  const fadeElements = document.querySelectorAll('.section-header, .timeline-item, .projet-card, .stack-category, .contact-card');

  fadeElements.forEach(el => el.classList.add('fade-in'));

  function checkFadeElements() {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;

      if (isVisible) {
        el.classList.add('visible');
      }
    });
  }

  // Throttled scroll handler
  let scrollTimeout;
  function handleScroll() {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      checkKpisInView();
      checkFadeElements();
      scrollTimeout = null;
    }, 50);
  }

  window.addEventListener('scroll', handleScroll);

  // Initial check
  checkKpisInView();
  checkFadeElements();

  // ===================================
  // Carnet de Bord (Journal)
  // ===================================
  const carnetList = document.getElementById('carnet-list');
  const carnetForm = document.getElementById('carnet-form');
  const carnetTitleInput = document.getElementById('carnet-title');
  const carnetContentInput = document.getElementById('carnet-content');
  const carnetCategorySelect = document.getElementById('carnet-category');

  const STORAGE_KEY = 'carnet_entries';

  const categoryLabels = {
    reflexion: 'Réflexion',
    projet: 'Retour projet',
    apprentissage: 'Apprentissage',
    veille: 'Veille tech'
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  function getEntries() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  function renderEntries() {
    const entries = getEntries();

    if (entries.length === 0) {
      carnetList.innerHTML = `
        <div class="carnet-empty">
          <div class="carnet-empty-icon">📝</div>
          <p>Aucune entrée pour le moment.<br>Commencez à documenter votre parcours !</p>
        </div>
      `;
      return;
    }

    carnetList.innerHTML = entries
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(entry => `
        <article class="carnet-entry" data-id="${entry.id}">
          <div class="carnet-entry-header">
            <h3 class="carnet-entry-title">${escapeHtml(entry.title)}</h3>
            <div class="carnet-entry-meta">
              <span class="carnet-entry-category">${categoryLabels[entry.category] || entry.category}</span>
              <span class="carnet-entry-date">${formatDate(entry.timestamp)}</span>
              <button class="carnet-entry-delete" title="Supprimer" data-id="${entry.id}">×</button>
            </div>
          </div>
          <p class="carnet-entry-content">${escapeHtml(entry.content)}</p>
        </article>
      `)
      .join('');

    // Add delete handlers
    carnetList.querySelectorAll('.carnet-entry-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        deleteEntry(id);
      });
    });
  }

  function addEntry(title, content, category) {
    const entries = getEntries();
    const newEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      timestamp: Date.now()
    };
    entries.push(newEntry);
    saveEntries(entries);
    renderEntries();
  }

  function deleteEntry(id) {
    const entries = getEntries().filter(entry => entry.id !== id);
    saveEntries(entries);
    renderEntries();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  if (carnetForm) {
    carnetForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = carnetTitleInput.value;
      const content = carnetContentInput.value;
      const category = carnetCategorySelect.value;

      if (title.trim() && content.trim()) {
        addEntry(title, content, category);
        carnetTitleInput.value = '';
        carnetContentInput.value = '';
        carnetCategorySelect.selectedIndex = 0;
      }
    });
  }

  // Initial render
  renderEntries();

  // ===================================
  // Header scroll effect
  // ===================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      header.style.background = 'rgba(0, 0, 0, 0.9)';
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleHeaderScroll);

  // ===================================
  // Active nav link highlighting
  // ===================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  function highlightNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavLink);

  // ===================================
  // Preload fonts animation
  // ===================================
  document.body.classList.add('loaded');

  // ===================================
  // Console Easter Egg
  // ===================================
  console.log('%c◈ Flow Orchestrator', 'color: #00ffff; font-size: 24px; font-weight: bold;');
  console.log('%cAdrien Tripon - Chef de Projet Supply Chain & SI', 'color: #888; font-size: 14px;');
  console.log('%cOrchestrer. Optimiser. Délivrer.', 'color: #00ff88; font-style: italic;');
});
