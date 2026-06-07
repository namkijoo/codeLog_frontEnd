export const PLATFORMS = ['백준', '프로그래머스', 'LeetCode', 'SWEA', 'Codeforces'] as const;

export const DIFFICULTIES = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'] as const;

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

export const DEFAULT_CODE = `from collections import deque

def bfs(start, lab, n, m):
    queue = deque([start])
    time = 0
    spread = 0
    while queue:
        for _ in range(len(queue)):
            x, y = queue.popleft()
            for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
                nx, ny = x+dx, y+dy
                if 0<=nx<n and 0<=ny<m and lab[nx][ny]==0:
                    lab[nx][ny] = 2
                    queue.append((nx, ny))
                    spread += 1
        time += 1
    return time`;

export const DEFAULT_MEMO = `• 0-1 BFS 대신 일반 BFS로 시간 계산
• 벽(1)은 통과 불가, 바이러스(2)는 확산
• 빈 칸(0)만 감염 가능 — 큐에 넣을 때 2로 변경
• 모든 바이러스 동시 확산 → 레벨별 time++`;
