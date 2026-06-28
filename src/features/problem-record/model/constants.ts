export const PLATFORMS = ['프로그래머스'] as const;

export const DIFFICULTIES = ['Lv. 0', 'Lv. 1', 'Lv. 2', 'Lv. 3', 'Lv. 4', 'Lv. 5'] as const;

export const LANGUAGES = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'cpp', label: 'C++', icon: '⚡' },
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'go', label: 'Go', icon: '🔵' },
  { id: 'kotlin', label: 'Kotlin', icon: '🟣' },
] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type LanguageId = (typeof LANGUAGES)[number]['id'];

export const DEFAULT_CODE = `function bfs(start, lab, n, m) {
  const queue = [start];
  let time = 0;
  let spread = 0;
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && lab[nx][ny] === 0) {
          lab[nx][ny] = 2;
          queue.push([nx, ny]);
          spread += 1;
        }
      }
    }
    time += 1;
  }
  return time;
}`;

export const DEFAULT_MEMO = `• 0-1 BFS 대신 일반 BFS로 시간 계산
• 벽(1)은 통과 불가, 바이러스(2)는 확산
• 빈 칸(0)만 감염 가능 — 큐에 넣을 때 2로 변경
• 모든 바이러스 동시 확산 → 레벨별 time++`;
