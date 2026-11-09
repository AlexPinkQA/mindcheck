export type SeverityLevel = 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe';

export type AssessmentStage = 'welcome' | 'stage1_screening' | 'stage1_result' | 'stage2_deep' | 'final_result';

export interface QuestionOption {
  value: number;
  label: string;
}

export interface Question {
  id: string;
  category: 'depression' | 'anxiety' | 'sleep' | 'context' | 'crisis';
  text: string;
  subtext?: string;
  options: QuestionOption[];
  isCrisisTrigger?: boolean; // triggers immediate crisis help if answered with high risk
}

export interface CrisisContact {
  country: string;
  name: string;
  phone?: string;
  chatUrl?: string;
  description: string;
  isYouthSpecific?: boolean;
}

export interface AssessmentResult {
  depressionScore: number;
  depressionLevel: SeverityLevel;
  anxietyScore?: number;
  anxietyLevel?: SeverityLevel;
  crisisFlag: boolean;
  completionDate: string;
  answers: Record<string, number>;
  insights: string[];
  recommendations: string[];
}
