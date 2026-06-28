export type BoardResponse = {
  id: number;
  username: string;
  problemNumber: number;
  problemUrl: string;
  platformName: string;
  tags: string[];
  difficulty: string;
  title: string;
  memo: string;
  language: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type SortKey = 'date' | 'difficulty' | 'platform' | 'tags';
