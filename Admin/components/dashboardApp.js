/**
 * Admin Dashboard Interactive Application Controller
 * Handles SVG chart generation, notifications, quick actions, and creator reviews.
 */
(function(window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Authentication & Profile
    if (window.AdminAuth) {
      window.AdminAuth.init();
    }

    // 2. Setup Profile Dropdown
    const profilePill = document.getElementById('admin-profile-pill');
    const profileMenu = document.getElementById('admin-profile-menu');
    if (profilePill && profileMenu) {
      profilePill.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        profileMenu.classList.remove('open');
      });
    }

    // 3. Notification Bell Toggle
    const notifBtn = document.getElementById('notification-bell-btn');
    const notifMenu = document.getElementById('notification-popup');
    if (notifBtn && notifMenu) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        notifMenu.classList.remove('open');
      });
    }

    // 4. Render Campaign Performance Chart
    renderPerformanceChart();

    // 5. Creator application interactive preview
    setupApplicationInteractions();
  });

  /**
   * Generates smooth SVG cubic bezier path string
   */
  function createSmoothPath(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }
    return d;
  }

  function renderPerformanceChart() {
    const svg = document.getElementById('performance-chart-svg');
    if (!svg) return;

    // ViewBox dimensions: 0 0 320 120
    const w = 320;
    const h = 100;
    const paddingLeft = 32;
    const paddingBottom = 22;
    const paddingTop = 10;
    const chartWidth = w - paddingLeft;
    const chartHeight = h - paddingTop;

    // Coordinates mapping for points matching the reference image curve:
    // (1 Jul: 0), (4 Jul: 22), (7 Jul: 18), (11 Jul: 32), (14 Jul: 42), (18 Jul: 34), (21 Jul: 48), (25 Jul: 60), (28 Jul: 55)
    // Values are 0 to 60
    const rawData = [
      { date: '1 Jul', val: 0 },
      { date: '4 Jul', val: 24 },
      { date: '7 Jul', val: 18 },
      { date: '11 Jul', val: 32 },
      { date: '14 Jul', val: 42 },
      { date: '18 Jul', val: 35 },
      { date: '21 Jul', val: 49 },
      { date: '25 Jul', val: 60 },
      { date: '28 Jul', val: 56 }
    ];

    const maxVal = 60;
    const points = rawData.map((d, index) => {
      const x = paddingLeft + (index / (rawData.length - 1)) * (chartWidth - 10);
      const y = paddingTop + (1 - d.val / maxVal) * chartHeight;
      return { x, y, val: d.val, date: d.date };
    });

    const curvePath = createSmoothPath(points);
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const baseY = paddingTop + chartHeight;
    const areaPath = `${curvePath} L ${lastPoint.x},${baseY} L ${firstPoint.x},${baseY} Z`;

    // Horizontal grid lines for 60, 40, 20, 0
    let gridMarkup = '';
    const gridValues = [60, 40, 20, 0];
    gridValues.forEach(val => {
      const y = paddingTop + (1 - val / maxVal) * chartHeight;
      gridMarkup += `
        <text x="4" y="${y + 3}" fill="#A8A29E" font-size="9" font-family="'Plus Jakarta Sans', sans-serif">${val}</text>
        <line x1="${paddingLeft}" y1="${y}" x2="${w}" y2="${y}" stroke="#F0EBE2" stroke-width="1" />
      `;
    });

    // X-axis labels: 1 Jul, 7 Jul, 14 Jul, 21 Jul, 28 Jul
    const xLabels = [
      { text: '1 Jul', x: paddingLeft },
      { text: '7 Jul', x: paddingLeft + (chartWidth - 10) * 0.25 },
      { text: '14 Jul', x: paddingLeft + (chartWidth - 10) * 0.5 },
      { text: '21 Jul', x: paddingLeft + (chartWidth - 10) * 0.75 },
      { text: '28 Jul', x: paddingLeft + (chartWidth - 10) * 1 }
    ];

    let xLabelsMarkup = '';
    xLabels.forEach(lbl => {
      xLabelsMarkup += `
        <text x="${lbl.x}" y="${baseY + 16}" text-anchor="middle" fill="#8C867E" font-size="9" font-family="'Plus Jakarta Sans', sans-serif">${lbl.text}</text>
      `;
    });

    svg.innerHTML = `
      <defs>
        <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.32" />
          <stop offset="60%" stop-color="#E5C77A" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#FAF8F5" stop-opacity="0" />
        </linearGradient>
      </defs>
      ${gridMarkup}
      <path d="${areaPath}" fill="url(#goldAreaGradient)" />
      <path d="${curvePath}" fill="none" stroke="#D4AF37" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      ${xLabelsMarkup}
    `;
  }

  function setupApplicationInteractions() {
    const rows = document.querySelectorAll('.application-row');
    rows.forEach(row => {
      row.addEventListener('click', () => {
        const name = row.querySelector('.applicant-name')?.textContent || 'Creator';
        const category = row.querySelector('.applicant-category')?.textContent || '';
        const status = row.querySelector('.status-badge')?.textContent || '';
        
        // Visual feedback when clicking application
        row.style.backgroundColor = '#F5EEDF';
        setTimeout(() => {
          row.style.backgroundColor = '';
        }, 300);
      });
    });
  }

})(window);
