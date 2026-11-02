'use client';

import { buildHeatmapWeeks, buildMonthLabels, getLevelColor } from '../lib/heatmap';
import type { ActivityDay, HeatmapLevel } from '../model/types';

type ActivityHeatmapProps = {
  days: ActivityDay[];
};

const LEGEND_LEVELS: HeatmapLevel[] = [0, 1, 2, 3, 4];

export function ActivityHeatmap({ days }: ActivityHeatmapProps) {
  const weeks = buildHeatmapWeeks(days);
  const monthLabels = buildMonthLabels(weeks);
  const columns = `repeat(${weeks.length}, minmax(0, 1fr))`;

  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="flex w-full flex-col gap-1.5">
        <div className="grid w-full gap-x-[3px]" style={{ gridTemplateColumns: columns }}>
          {monthLabels.map((label, index) => (
            <div
              key={`month-${index}`}
              className="h-4 overflow-visible text-[10px] font-semibold leading-none whitespace-nowrap text-[#a78bfa]"
            >
              {label ?? ''}
            </div>
          ))}
        </div>

        <div className="grid w-full gap-[3px]" style={{ gridTemplateColumns: columns }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
              {week.map((cell, dayIndex) => {
                if (!cell.date) {
                  return (
                    <div
                      key={`empty-${weekIndex}-${dayIndex}`}
                      className="aspect-square min-h-[10px] rounded-[3px] bg-transparent"
                      aria-hidden
                    />
                  );
                }

                return (
                  <div
                    key={cell.date}
                    title={`${cell.date}: ${cell.count}문제`}
                    className="aspect-square min-h-[10px] rounded-[3px]"
                    style={{ backgroundColor: getLevelColor(cell.level) }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ActivityHeatmapLegend() {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#a78bfa]">
      <span>적음</span>
      <div className="flex gap-[3px]">
        {LEGEND_LEVELS.map((level) => (
          <div
            key={level}
            className="size-[11px] rounded-[3px]"
            style={{ backgroundColor: getLevelColor(level) }}
          />
        ))}
      </div>
      <span>많음</span>
    </div>
  );
}
