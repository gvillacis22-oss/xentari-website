"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChartDataPoint } from "./types";
import { formatCompactCurrency } from "@/lib/calculatorUtils";

interface GrowthChartProps {
  data: ChartDataPoint[];
  targetValue?: number; // Optional - only shown in advanced mode
  retirementAge: number;
}

export function GrowthChart({ data, targetValue, retirementAge }: GrowthChartProps) {
  const showTarget = targetValue !== undefined && targetValue > 0;

  const chartDimensions = useMemo(() => {
    const width = 100;
    const height = 60;
    const padding = { top: 5, right: 5, bottom: 8, left: 5 };
    return { width, height, padding };
  }, []);

  const { maxValue, points, targetY, contributionPoints } = useMemo(() => {
    if (data.length === 0) return { maxValue: 0, points: "", targetY: 0, contributionPoints: "" };

    const maxBalance = Math.max(...data.map((d) => d.balance), showTarget ? targetValue : 0);
    const maxValue = maxBalance * 1.1;

    const { width, height, padding } = chartDimensions;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const xScale = (index: number) =>
      padding.left + (index / (data.length - 1)) * chartWidth;
    const yScale = (value: number) =>
      padding.top + chartHeight - (value / maxValue) * chartHeight;

    // Main balance line
    const points = data
      .map((d, i) => `${xScale(i)},${yScale(d.balance)}`)
      .join(" ");

    // Contribution area
    const contributionPoints =
      data.map((d, i) => `${xScale(i)},${yScale(d.contributions)}`).join(" ") +
      ` ${xScale(data.length - 1)},${yScale(0)} ${xScale(0)},${yScale(0)}`;

    const targetY = showTarget ? yScale(targetValue) : 0;

    return { maxValue, points, targetY, contributionPoints };
  }, [data, targetValue, showTarget, chartDimensions]);

  if (data.length === 0) {
    return (
      <div className="bg-background-surface border border-white/[0.06] rounded-xl p-5 h-48 flex items-center justify-center">
        <p className="text-text-muted text-sm">Enter values to see projection</p>
      </div>
    );
  }

  const { width, height, padding } = chartDimensions;
  const finalBalance = data[data.length - 1]?.balance || 0;
  const isAboveTarget = showTarget ? finalBalance >= targetValue : true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-surface border border-white/[0.06] rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm text-text-muted uppercase tracking-wider">
          Portfolio Growth
        </h4>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-accent rounded" />
            <span className="text-text-muted">Balance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-accent/30 rounded" />
            <span className="text-text-muted">Contributions</span>
          </div>
          {showTarget && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-text-muted/50 rounded border-dashed" style={{ borderTopWidth: 1, borderStyle: 'dashed' }} />
              <span className="text-text-muted">Target</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <defs>
            <linearGradient id="balanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 107, 53, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 107, 53, 0)" />
            </linearGradient>
            <linearGradient id="contributionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 107, 53, 0.15)" />
              <stop offset="100%" stopColor="rgba(255, 107, 53, 0)" />
            </linearGradient>
          </defs>

          {/* Target line - only show in advanced mode */}
          {showTarget && (
            <line
              x1={padding.left}
              y1={targetY}
              x2={width - padding.right}
              y2={targetY}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="0.3"
              strokeDasharray="2 2"
            />
          )}

          {/* Contribution area */}
          <motion.polygon
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            points={contributionPoints}
            fill="url(#contributionGradient)"
          />

          {/* Balance area fill */}
          <motion.polygon
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            points={`${points} ${width - padding.right},${height - padding.bottom} ${padding.left},${height - padding.bottom}`}
            fill="url(#balanceGradient)"
          />

          {/* Balance line */}
          <motion.polyline
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            points={points}
            fill="none"
            stroke="#FF6B35"
            strokeWidth="0.5"
          />

          {/* End point marker */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
            cx={width - padding.right}
            cy={data.length > 0 ? padding.top + (height - padding.top - padding.bottom) - (data[data.length - 1].balance / maxValue) * (height - padding.top - padding.bottom) : 0}
            r="1.5"
            fill="#FF6B35"
          />
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-text-muted">
          <span>{formatCompactCurrency(maxValue)}</span>
          <span>{formatCompactCurrency(maxValue / 2)}</span>
          <span>$0</span>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between text-[10px] text-text-muted mt-1 px-1">
          <span>{data[0]?.age}</span>
          <span>{Math.round((data[0]?.age + retirementAge) / 2)}</span>
          <span>{retirementAge}</span>
        </div>
      </div>

      {/* Summary below chart */}
      <div className={`mt-4 pt-4 border-t border-white/[0.06] grid gap-4 text-center ${showTarget ? 'grid-cols-3' : 'grid-cols-2'}`}>
        <div>
          <div className="text-xs text-text-muted mb-1">Start</div>
          <div className="text-sm text-white font-medium">
            {formatCompactCurrency(data[0]?.balance || 0)}
          </div>
        </div>
        {showTarget && (
          <div>
            <div className="text-xs text-text-muted mb-1">Target</div>
            <div className="text-sm text-white font-medium">
              {formatCompactCurrency(targetValue)}
            </div>
          </div>
        )}
        <div>
          <div className="text-xs text-text-muted mb-1">Projected</div>
          <div className={`text-sm font-medium ${showTarget ? (isAboveTarget ? "text-green-400" : "text-amber-400") : "text-accent"}`}>
            {formatCompactCurrency(finalBalance)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
