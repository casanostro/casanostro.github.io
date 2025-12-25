/**
 * NEXUS SUPPLY CHAIN - Dashboard JavaScript
 * Command Center Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===================================
  // Configuration & State
  // ===================================
  const state = {
    alerts: [],
    notifications: [],
    chartInstances: {},
    importedData: null
  };

  // Chart.js global config
  Chart.defaults.color = '#888899';
  Chart.defaults.borderColor = '#1a1a2e';
  Chart.defaults.font.family = "'Consolas', 'Monaco', monospace";

  // ===================================
  // Mock Data
  // ===================================
  const mockData = {
    global: {
      otif: 94.2,
      flux: 12.4,
      orders: 847,
      service: 98.1,
      costs: -18
    },
    amont: {
      leadTime: 4.2,
      supplierPerf: 82,
      inTransit: 234,
      pending: 89,
      trend: [78, 80, 82, 79, 85, 82, 84]
    },
    aval: {
      otif: 94.2,
      deliveryPerf: 87,
      backlog: 156,
      shipments: 312,
      trend: [88, 85, 90, 87, 92, 89, 87]
    },
    appro: {
      coverage: 18,
      stockLevel: 64,
      stockouts: 12,
      reorder: 47,
      categories: [35, 25, 20, 15, 5]
    },
    logistique: {
      fillRate: 91,
      fleetUtil: 91,
      cost: 234,
      trucks: 47,
      trend: [85, 88, 90, 92, 89, 91, 93]
    },
    dwh: {
      uptime: 99.2,
      storage: 68,
      jobsOk: 142,
      jobsTotal: 145,
      failed: 3,
      trend: [98, 99, 99.5, 99.2, 99.8, 99.1, 99.2]
    },
    dtd: {
      critical: 1,
      warning: 2,
      info: 5,
      models: 8,
      predictions: 1200,
      accuracy: [92, 94, 93, 95, 94, 96, 95]
    },
    performance: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      otif: [92, 94, 93, 95, 94, 96, 94],
      service: [97, 98, 97, 99, 98, 98, 98],
      costs: [102, 98, 95, 92, 88, 85, 82]
    }
  };

  const mockAlerts = [
    { id: 1, time: '14:21', level: 'critical', message: 'Rupture imminente SKU-7842 (Stock < 2j) - Action requise' },
    { id: 2, time: '13:45', level: 'warning', message: 'Lead time fournisseur ABC dépassé (+2.1j vs objectif)' },
    { id: 3, time: '12:30', level: 'warning', message: 'Taux remplissage camion XY-234 inférieur à 70%' },
    { id: 4, time: '11:15', level: 'info', message: 'Nouveau lot réceptionné - Entrepôt Paris Nord' },
    { id: 5, time: '10:00', level: 'info', message: 'Job ETL #4521 terminé avec succès' }
  ];

  state.alerts = [...mockAlerts];
  state.notifications = [...mockAlerts];

  // ===================================
  // Utility Functions
  // ===================================
  function formatTime(date = new Date()) {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function formatDate(date = new Date()) {
    return date.toLocaleDateString('fr-FR');
  }

  function updateDateTime() {
    const now = new Date();
    document.getElementById('current-date').textContent = formatDate(now);
    document.getElementById('current-time').textContent = formatTime(now);
    document.getElementById('last-refresh').textContent = formatTime(now);
  }

  // ===================================
  // DateTime Update
  // ===================================
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // ===================================
  // Mini Charts Creation
  // ===================================
  function createMiniChart(canvasId, data, color, type = 'line') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 60);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '00');

    const config = {
      type: type,
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data: data,
          borderColor: color,
          backgroundColor: type === 'line' ? gradient : data.map((_, i) => [
            '#00f0ff', '#ff00ff', '#00ff88', '#ffee00', '#ff6600'
          ][i % 5]),
          borderWidth: 2,
          fill: type === 'line',
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: color
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#0d0d14',
            borderColor: color,
            borderWidth: 1,
            titleColor: color,
            bodyColor: '#e0e0e0',
            padding: 8,
            displayColors: false
          }
        },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    };

    if (type === 'doughnut') {
      config.options.cutout = '60%';
      delete config.options.scales;
    }

    return new Chart(ctx, config);
  }

  // Initialize mini charts
  state.chartInstances.amont = createMiniChart('chart-amont', mockData.amont.trend, '#00f0ff');
  state.chartInstances.aval = createMiniChart('chart-aval', mockData.aval.trend, '#00ff88');
  state.chartInstances.appro = createMiniChart('chart-appro', mockData.appro.categories, '#ff00ff', 'doughnut');
  state.chartInstances.logistique = createMiniChart('chart-logistique', mockData.logistique.trend, '#ffee00');
  state.chartInstances.dwh = createMiniChart('chart-dwh', mockData.dwh.trend, '#aa00ff');
  state.chartInstances.dtd = createMiniChart('chart-dtd', mockData.dtd.accuracy, '#ff6600');

  // ===================================
  // Main Trend Chart
  // ===================================
  function createTrendChart() {
    const ctx = document.getElementById('chart-trend');
    if (!ctx) return null;

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: mockData.performance.labels,
        datasets: [
          {
            label: 'OTIF Rate',
            data: mockData.performance.otif,
            borderColor: '#00f0ff',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#00f0ff',
            pointBorderColor: '#0d0d14',
            pointBorderWidth: 2
          },
          {
            label: 'Service Rate',
            data: mockData.performance.service,
            borderColor: '#00ff88',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#00ff88',
            pointBorderColor: '#0d0d14',
            pointBorderWidth: 2
          },
          {
            label: 'Cost Index',
            data: mockData.performance.costs,
            borderColor: '#ff00ff',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#ff00ff',
            pointBorderColor: '#0d0d14',
            pointBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 12,
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: '#0d0d14',
            borderColor: '#1a1a2e',
            borderWidth: 1,
            titleColor: '#00f0ff',
            bodyColor: '#e0e0e0',
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: '#1a1a2e',
              drawBorder: false
            },
            ticks: {
              padding: 10
            }
          },
          y: {
            min: 70,
            max: 110,
            grid: {
              color: '#1a1a2e',
              drawBorder: false
            },
            ticks: {
              padding: 10,
              callback: value => value + '%'
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }

  state.chartInstances.trend = createTrendChart();

  // Chart period buttons
  document.querySelectorAll('.chart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Here you would load different data based on period
      // For now, just visual feedback
    });
  });

  // ===================================
  // Alerts Feed
  // ===================================
  function renderAlerts(filter = 'all') {
    const feed = document.getElementById('alerts-feed');
    if (!feed) return;

    const filteredAlerts = filter === 'all'
      ? state.alerts
      : state.alerts.filter(a => a.level === filter);

    feed.innerHTML = filteredAlerts.map(alert => `
      <div class="alert-row ${alert.level}">
        <span class="alert-time">${alert.time}</span>
        <span class="alert-badge">${alert.level.toUpperCase()}</span>
        <span class="alert-message">${alert.message}</span>
      </div>
    `).join('');
  }

  renderAlerts();

  // Alert filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAlerts(btn.dataset.filter);
    });
  });

  // ===================================
  // Notifications Panel
  // ===================================
  const notifBtn = document.getElementById('notifications-btn');
  const notifPanel = document.getElementById('notifications-panel');
  const notifList = document.getElementById('notif-list');
  const clearNotifsBtn = document.getElementById('clear-notifs');

  function renderNotifications() {
    if (!notifList) return;

    const icons = { critical: '🔴', warning: '🟡', info: '🔵' };

    notifList.innerHTML = state.notifications.map(notif => `
      <div class="notif-item ${notif.level}">
        <span class="notif-item-icon">${icons[notif.level]}</span>
        <div class="notif-item-content">
          <div class="notif-item-message">${notif.message}</div>
          <div class="notif-item-time">${notif.time}</div>
        </div>
      </div>
    `).join('');

    document.getElementById('notif-count').textContent = state.notifications.length;
  }

  renderNotifications();

  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifPanel.classList.toggle('active');
    });
  }

  if (clearNotifsBtn) {
    clearNotifsBtn.addEventListener('click', () => {
      state.notifications = [];
      renderNotifications();
      notifPanel.classList.remove('active');
    });
  }

  // Close notifications when clicking outside
  document.addEventListener('click', (e) => {
    if (notifPanel && !notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
      notifPanel.classList.remove('active');
    }
  });

  // ===================================
  // Import Modal & File Handling
  // ===================================
  const importBtn = document.getElementById('import-btn');
  const importModal = document.getElementById('import-modal');
  const modalClose = document.getElementById('modal-close');
  const cancelImport = document.getElementById('cancel-import');
  const confirmImport = document.getElementById('confirm-import');
  const importZone = document.getElementById('import-zone');
  const fileInput = document.getElementById('file-input');
  const importPreview = document.getElementById('import-preview');

  function openModal() {
    importModal.classList.add('active');
    importPreview.innerHTML = '';
    confirmImport.disabled = true;
    state.importedData = null;
  }

  function closeModal() {
    importModal.classList.remove('active');
  }

  if (importBtn) importBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (cancelImport) cancelImport.addEventListener('click', closeModal);

  // Close modal on outside click
  if (importModal) {
    importModal.addEventListener('click', (e) => {
      if (e.target === importModal) closeModal();
    });
  }

  // File input handling
  if (importZone) {
    importZone.addEventListener('click', () => fileInput.click());

    importZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      importZone.classList.add('dragover');
    });

    importZone.addEventListener('dragleave', () => {
      importZone.classList.remove('dragover');
    });

    importZone.addEventListener('drop', (e) => {
      e.preventDefault();
      importZone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) processFile(file);
    });
  }

  function processFile(file) {
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'csv') {
      parseCSV(file);
    } else if (['xlsx', 'xls'].includes(extension)) {
      parseExcel(file);
    } else {
      alert('Format non supporté. Utilisez CSV ou Excel.');
    }
  }

  function parseCSV(file) {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        state.importedData = results.data;
        showPreview(results.data, results.meta.fields);
      },
      error: (error) => {
        console.error('CSV Parse Error:', error);
        alert('Erreur lors de la lecture du fichier CSV.');
      }
    });
  }

  function parseExcel(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(firstSheet);
        const headers = Object.keys(data[0] || {});
        state.importedData = data;
        showPreview(data, headers);
      } catch (error) {
        console.error('Excel Parse Error:', error);
        alert('Erreur lors de la lecture du fichier Excel.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function showPreview(data, headers) {
    if (!importPreview || !data.length) return;

    const previewRows = data.slice(0, 5);

    let html = '<table><thead><tr>';
    headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';

    previewRows.forEach(row => {
      html += '<tr>';
      headers.forEach(h => html += `<td>${row[h] || ''}</td>`);
      html += '</tr>';
    });

    html += '</tbody></table>';
    html += `<p style="margin-top: 1rem; color: #00f0ff; font-size: 0.75rem;">
      ${data.length} lignes détectées
    </p>`;

    importPreview.innerHTML = html;
    confirmImport.disabled = false;
  }

  if (confirmImport) {
    confirmImport.addEventListener('click', () => {
      if (state.importedData) {
        applyImportedData(state.importedData);
        closeModal();

        // Add notification
        state.notifications.unshift({
          id: Date.now(),
          time: formatTime(),
          level: 'info',
          message: `Import réussi: ${state.importedData.length} lignes chargées`
        });
        renderNotifications();
      }
    });
  }

  function applyImportedData(data) {
    // Map imported data to dashboard elements
    // This is a simplified example - in production, you'd have more sophisticated mapping

    if (data.length === 0) return;

    const firstRow = data[0];

    // Try to map common fields
    const mappings = {
      'otif': 'kpi-otif',
      'OTIF': 'kpi-otif',
      'flux': 'kpi-flux',
      'orders': 'kpi-orders',
      'commandes': 'kpi-orders',
      'service': 'kpi-service',
      'costs': 'kpi-costs',
      'couts': 'kpi-costs'
    };

    Object.keys(mappings).forEach(key => {
      if (firstRow[key] !== undefined) {
        const element = document.getElementById(mappings[key]);
        if (element) {
          element.innerHTML = firstRow[key] + (key.includes('otif') || key.includes('service') ? '<span class="kpi-unit">%</span>' : '');
        }
      }
    });

    console.log('Data imported:', data);
  }

  // ===================================
  // Real-time Simulation
  // ===================================
  function simulateDataUpdate() {
    // Randomly update some values for demo
    const randomVariation = () => (Math.random() - 0.5) * 2;

    // Update a random KPI slightly
    const kpis = ['kpi-otif', 'kpi-service'];
    const randomKpi = kpis[Math.floor(Math.random() * kpis.length)];
    const element = document.getElementById(randomKpi);

    if (element) {
      const currentValue = parseFloat(element.textContent);
      const newValue = Math.min(99.9, Math.max(90, currentValue + randomVariation())).toFixed(1);
      element.innerHTML = newValue + '<span class="kpi-unit">%</span>';
    }
  }

  // Simulate updates every 30 seconds
  setInterval(simulateDataUpdate, 30000);

  // ===================================
  // Add new alert simulation
  // ===================================
  function addRandomAlert() {
    const alertTypes = [
      { level: 'info', messages: [
        'Lot #' + Math.floor(Math.random() * 9999) + ' réceptionné',
        'Job ETL terminé avec succès',
        'Synchronisation DWH complète'
      ]},
      { level: 'warning', messages: [
        'Délai fournisseur supérieur au seuil',
        'Stock faible sur référence critique',
        'Taux de remplissage sous objectif'
      ]},
      { level: 'critical', messages: [
        'Rupture détectée - Action immédiate requise',
        'Échec synchronisation système',
        'Anomalie flux détectée'
      ]}
    ];

    const type = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const message = type.messages[Math.floor(Math.random() * type.messages.length)];

    const newAlert = {
      id: Date.now(),
      time: formatTime(),
      level: type.level,
      message: message
    };

    state.alerts.unshift(newAlert);
    state.notifications.unshift(newAlert);

    // Keep only last 20 alerts
    state.alerts = state.alerts.slice(0, 20);
    state.notifications = state.notifications.slice(0, 10);

    renderAlerts(document.querySelector('.filter-btn.active')?.dataset.filter || 'all');
    renderNotifications();

    // Update DTD counters
    updateDTDCounters();
  }

  function updateDTDCounters() {
    const critical = state.alerts.filter(a => a.level === 'critical').length;
    const warning = state.alerts.filter(a => a.level === 'warning').length;
    const info = state.alerts.filter(a => a.level === 'info').length;

    document.getElementById('dtd-critical').textContent = Math.min(critical, 9);
    document.getElementById('dtd-warning').textContent = Math.min(warning, 9);
    document.getElementById('dtd-info').textContent = Math.min(info, 9);
  }

  // Add random alert every 45-90 seconds
  setInterval(addRandomAlert, 45000 + Math.random() * 45000);

  // ===================================
  // Keyboard Shortcuts
  // ===================================
  document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
      closeModal();
      notifPanel?.classList.remove('active');
    }

    // Ctrl+I to open import
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      openModal();
    }
  });

  // ===================================
  // Console Branding
  // ===================================
  console.log('%c◈ NEXUS SUPPLY CHAIN', 'color: #00f0ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;');
  console.log('%cCommand Center v2.0', 'color: #888899; font-size: 12px;');
  console.log('%cSystem Online - All nodes active', 'color: #00ff88;');
  console.log('%c─────────────────────────────────', 'color: #1a1a2e;');
  console.log('%cKeyboard Shortcuts:', 'color: #ff00ff;');
  console.log('%c  Ctrl+I : Open Import Modal', 'color: #888899;');
  console.log('%c  ESC    : Close Modals', 'color: #888899;');

  // ===================================
  // Initial Setup Complete
  // ===================================
  document.body.classList.add('loaded');
});
