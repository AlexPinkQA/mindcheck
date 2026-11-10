import { Language } from '../data/translations';

export type SeverityLevel = 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe';

export type AssessmentMode = 'express' | 'deep' | 'dass21' | 'pc_ptsd_5' | 'pcl5' | 'itq';

export type AssessmentCategory = 'mood' | 'stress' | 'trauma';

export interface QuestionOption {
  value: number;
  label: string;
}

export interface Question {
  id: string;
  category: 'depression' | 'anxiety' | 'stress' | 'trauma' | 'sleep' | 'context' | 'crisis';
  text: string;
  subtext?: string;
  options: QuestionOption[];
  isCrisisTrigger?: boolean;
}

export interface CrisisContact {
  country: string;
  name: string;
  phone?: string;
  chatUrl?: string;
  description: string;
  isYouthSpecific?: boolean;
  isTraumaSpecific?: boolean;
}

export interface TraumaClusterScore {
  key: string;
  name: string;
  score: number;
  maxScore: number;
  level: SeverityLevel;
}

export interface AssessmentResult {
  depressionScore: number;
  depressionLevel: SeverityLevel;
  anxietyScore?: number;
  anxietyLevel?: SeverityLevel;
  stressScore?: number;
  stressLevel?: SeverityLevel;
  traumaScore?: number;
  traumaLevel?: SeverityLevel;
  traumaClusters?: TraumaClusterScore[];
  cptsdResult?: 'none' | 'ptsd' | 'cptsd';
  dsoScore?: number;
  crisisFlag: boolean;
  completionDate: string;
  answers: Record<string, number>;
  insights: string[];
  recommendations: string[];
  birthYear?: number;
  isUnder18?: boolean;
  mode: AssessmentMode;
  language: Language;
}
