export interface ResumeScoreCategory {
  category?: string;
  category_name?: string;
  score: number;
  max_score?: number;
  weight?: number;
  feedback?: string;
  feedback_text?: string;
}

export interface ResumeSkillGroup {
  category: string;  // "languages" | "frameworks" | "tools" | "soft_skills"
  skills: string[];
}

export interface ResumeImprovement {
  section: string;
  issue: string;
  before_text: string;
  suggested_text: string;
  priority: "high" | "medium" | "low";
}

export interface ResumeAnalysisReport {
  id?: string;
  overall_score: number;
  grade: string;
  summary: string;
  category_scores: ResumeScoreCategory[];
  skills: ResumeSkillGroup[];
  strengths: string[];
  weaknesses: string[];
  improvements: ResumeImprovement[];
  recommended_interview_topics: string[];
  created_at?: string;
}
