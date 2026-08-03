"use client";

import { useId, useState } from "react";
import type { PopulationRecord } from "@/data/population";

export function PopulationChart({ data }: { data: PopulationRecord[] }) {
  const [active, setActive] = useState(data.length - 1);
  const gradientId = useId().replace(/:/g, "");
  const width = 900;
  const height = 360;
  const pad = { left: 66, right: 24, top: 28, bottom: 52 };
  const min = 0;
  const max = 60000;
  const x = (index: number) => pad.left + (index / (data.length - 1)) * (width - pad.left - pad.right);
  const y = (value: number) => pad.top + (1 - (value - min) / (max - min)) * (height - pad.top - pad.bottom);
  const points = data.map((item, index) => `${x(index)},${y(item.population)}`).join(" ");
  const selected = data[active];

  return (
    <div className="chart-shell">
      <div className="chart-summary"><span>{selected.year} {selected.type}</span><strong>{selected.population.toLocaleString()}</strong><small>people</small></div>
      <div className="chart-scroll">
        <svg className="population-chart" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Ajuy population from 1903 to 2024">
          {[0, 15000, 30000, 45000, 60000].map((value) => (
            <g key={value}><line x1={pad.left} x2={width - pad.right} y1={y(value)} y2={y(value)} className="chart-grid-line" /><text x={pad.left - 12} y={y(value) + 4} textAnchor="end" className="chart-axis-label">{value === 0 ? "0" : `${value / 1000}k`}</text></g>
          ))}
          <defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7FB77E" stopOpacity="0.5"/><stop offset="100%" stopColor="#7FB77E" stopOpacity="0.03"/></linearGradient></defs>
          <polygon points={`${pad.left},${height-pad.bottom} ${points} ${width-pad.right},${height-pad.bottom}`} fill={`url(#${gradientId})`} />
          <polyline points={points} fill="none" stroke="#2F6B3F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {data.map((item, index) => (
            <g key={item.year} className="chart-point" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} tabIndex={0} role="button" aria-label={`${item.year}: ${item.population.toLocaleString()} people`}>
              <circle cx={x(index)} cy={y(item.population)} r={index === active ? 8 : 5} fill={index === active ? "#F7C85C" : "#2F6B3F"} stroke="#fff" strokeWidth="3" />
              {(index % 2 === 0 || index === data.length - 1) && <text x={x(index)} y={height - 20} textAnchor="middle" className="chart-year">{item.year}</text>}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
