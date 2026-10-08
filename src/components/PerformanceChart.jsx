import React from 'react';

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

export default function PerformanceChart() {
  const w = 320;
  const h = 100;
  const paddingLeft = 32;
  const paddingTop = 10;
  const chartWidth = w - paddingLeft;
  const chartHeight = h - paddingTop;

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

  const gridValues = [60, 40, 20, 0];
  const xLabels = [
    { text: '1 Jul', x: paddingLeft },
    { text: '7 Jul', x: paddingLeft + (chartWidth - 10) * 0.25 },
    { text: '14 Jul', x: paddingLeft + (chartWidth - 10) * 0.5 },
    { text: '21 Jul', x: paddingLeft + (chartWidth - 10) * 0.75 },
    { text: '28 Jul', x: paddingLeft + (chartWidth - 10) * 1 }
  ];

  return (
    <svg
      viewBox={`0 0 ${w} ${h + 20}`}
      className="chart-svg"
      style={{ width: '100%', height: 'auto', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="goldAreaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#E5C77A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid Lines */}
      {gridValues.map((val) => {
        const y = paddingTop + (1 - val / maxVal) * chartHeight;
        return (
          <g key={val}>
            <text
              x="4"
              y={y + 3}
              fill="#A8A29E"
              fontSize="9"
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              {val}
            </text>
            <line
              x1={paddingLeft}
              y1={y}
              x2={w}
              y2={y}
              stroke="#F0EBE2"
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* Gradient Area & Line */}
      <path d={areaPath} fill="url(#goldAreaGradient)" />
      <path
        d={curvePath}
        fill="none"
        stroke="#D4AF37"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* X Labels */}
      {xLabels.map((lbl, i) => (
        <text
          key={i}
          x={lbl.x}
          y={baseY + 16}
          textAnchor="middle"
          fill="#8C867E"
          fontSize="9"
          fontFamily="'Plus Jakarta Sans', sans-serif"
        >
          {lbl.text}
        </text>
      ))}
    </svg>
  );
}
