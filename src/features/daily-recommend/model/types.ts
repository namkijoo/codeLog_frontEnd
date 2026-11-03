export type RecommendationItem = {
  title: string;
  problemNumber: number;
  platform: string;
  difficulty: string;
  reason: string;
  problemUrl: string;
};

export type DailyRecommendFeedback = {
  strengths: string[];
  improvements: string[];
  focusToday: string;
};

export type DailyRecommendResponse = {
  date: string;
  recommendations: RecommendationItem[];
};

export type FeedbackResponse = DailyRecommendFeedback;
