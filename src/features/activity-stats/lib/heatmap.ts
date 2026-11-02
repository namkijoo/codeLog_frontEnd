import type { ActivityDay, HeatmapCell, HeatmapLevel } from '../model/types';

const LEVEL_COLORS = [
  '#f3f0ff',
  '#ddd6fe',
  '#c4b5fd',
  '#8b5cf6',
  '#6d28d9',
] as const;

export function getLevelColor(level: HeatmapLevel): string {
  return LEVEL_COLORS[level];
}

export function getActivityLevel(count: number): HeatmapLevel {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

/** KST 날짜 문자열의 요일 (0=일 … 6=토) */
function getDayOfWeek(dateStr: string): number {
  return new Date(`${dateStr}T12:00:00+09:00`).getUTCDay();
}

const MONTH_LABELS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
] as const;

/**
 * GitHub 기여 그래프와 같이 열=주, 행=요일(일→토) 격자를 만듭니다.
 * 첫 주 앞쪽은 빈 셀로 패딩합니다.
 */
export function buildHeatmapWeeks(days: ActivityDay[]): HeatmapCell[][] {
  if (days.length === 0) return [];

  const firstDow = getDayOfWeek(days[0].date);
  const cells: HeatmapCell[] = [];

  for (let i = 0; i < firstDow; i += 1) {
    cells.push({ date: null, count: 0, level: 0 });
  }

  for (const day of days) {
    cells.push({
      date: day.date,
      count: day.count,
      level: getActivityLevel(day.count),
    });
  }

  const weeks: HeatmapCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7);
    while (week.length < 7) {
      week.push({ date: null, count: 0, level: 0 });
    }
    weeks.push(week);
  }

  return weeks;
}

/** 각 주 열 위에 표시할 월 라벨. 월이 바뀌는 주에만 라벨을 둡니다. */
export function buildMonthLabels(weeks: HeatmapCell[][]): (string | null)[] {
  let previousMonth: number | null = null;

  return weeks.map((week) => {
    const firstDatedCell = week.find((cell) => cell.date);
    if (!firstDatedCell?.date) return null;

    const month = Number(firstDatedCell.date.slice(5, 7)) - 1;
    if (previousMonth === month) return null;

    previousMonth = month;
    return MONTH_LABELS[month];
  });
}
