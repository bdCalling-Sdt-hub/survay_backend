import { Types } from 'mongoose';

export interface IStrength {
  title: string;
  description: string;
}

export interface IPieChartData {
  category: string;
  percentage: number;
}

export interface IProgressBarData {
  label: string;
  percentage: number;
}

export interface ICourseSuggestions {
  title: string;
  description: string;
  platform: string;
  link: string;
}

export interface IWhy {
  user: Types.ObjectId;
  initialSummary: string;
  keyPoints: string[];
  strengths: IStrength[];
  weaknesses: IStrength[];
  pieChartData: IPieChartData[];
  progressBarData: IProgressBarData[];
  finalSummary: string;
  courseSuggestions: ICourseSuggestions[];
}
