export type ActivityDay = {
  date: string;
  count: number;
};

export type ActivityResponse = {
  totalSolved: number;
  currentStreak: number;
  range: { from: string; to: string };
  days: ActivityDay[];
};

export type HeatmapLevel = 0 | 1 | 2 | 3 | 4;

export type HeatmapCell = {
  date: string | null;
  count: number;
  level: HeatmapLevel;
};
