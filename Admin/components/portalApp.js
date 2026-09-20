/**
 * Arika Collabs - Admin Portal Interactive Controller
 * Powers live search, filtering, table pagination, modals, and sparkline rendering across all Admin pages.
 */
(function(window, document) {
  'use strict';

  // Sparkline Generator Helper
  function generateSparkline(color, values) {
    const points = values || [12, 18, 15, 24, 22, 30, 28, 38, 35, 45];
    const width = 80;
    const height = 30;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    const coords = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" class="stat-sparkline">
        <polyline points="${coords.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  // Initialize Metric Cards
  function initMetricCards(stats) {
    const container = document.getElementById('portal-stats-grid');
    if (!container || !stats) return;

    container.innerHTML = stats.map(stat => `
      <div class="stat-card" id="card-${stat.id}">
        <div class="stat-card-header">
          <div class="stat-icon-wrapper" style="background-color: ${stat.iconBg}; color: ${stat.iconColor};">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-body">
            <span class="stat-value" id="val-${stat.id}">${stat.value}</span>
            <span class="stat-label">${stat.title}</span>
          </div>
        </div>
        <div class="stat-card-footer">
          <div class="stat-trend-group">
            <span class="trend-badge trend-badge--up">${stat.change}</span>
            <span class="trend-period">${stat.period}</span>
          </div>
          ${generateSparkline(stat.sparkColor)}
        </div>
      </div>
    `).join('');
  }

  // Table Search and Filter Logic
  function initTableFilter(tableId, searchInputId, filterSelectId) {
    const table = document.getElementById(tableId);
    const searchInput = document.getElementById(searchInputId);
    const filterSelect = document.getElementById(filterSelectId);

    if (!table) return;

    function filterRows() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const filterVal = (filterSelect ? filterSelect.value : '').toLowerCase().trim();
      const tbody = table.querySelector('tbody');
      if (!tbody) return;

      const rows = tbody.querySelectorAll('tr');
      let visibleCount = 0;

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const matchesQuery = !query || text.includes(query);
        const matchesFilter = !filterVal || filterVal === 'all' || text.includes(filterVal);

        if (matchesQuery && matchesFilter) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      const countEl = document.getElementById('table-visible-count');
      if (countEl) {
        countEl.textContent = `Showing 1–${visibleCount} of ${visibleCount} items`;
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterRows);
    }
    if (filterSelect) {
      filterSelect.addEventListener('change', filterRows);
    }

    // Select All Checkbox
    const selectAll = document.getElementById('select-all-checkbox');
    if (selectAll) {
      selectAll.addEventListener('change', (e) => {
        const checkboxes = table.querySelectorAll('.table-checkbox:not(#select-all-checkbox)');
        checkboxes.forEach(cb => { cb.checked = e.target.checked; });
      });
    }
  }

  // Modal Dialog System
  function initModal(openBtnId, modalId, closeBtnId) {
    const openBtn = document.getElementById(openBtnId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);

    if (!modal) return;

    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Bind Global Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Logout binding
    document.querySelectorAll('[data-action="admin-logout"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AdminAuth) {
          window.AdminAuth.logout();
        } else {
          sessionStorage.clear();
          localStorage.removeItem('arika_admin_auth');
          window.location.href = '../login.html';
        }
      });
    });
  });

  window.PortalApp = {
    generateSparkline,
    initMetricCards,
    initTableFilter,
    initModal
  };
})(window, document);
