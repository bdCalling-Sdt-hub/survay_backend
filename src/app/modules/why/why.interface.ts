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

export interface IWhy {
  initialSummary: string;
  keyPoints: string[];
  strengths: IStrength[];
  weaknesses: string[];
  pieChartData: IPieChartData[];
  progressBarData: IProgressBarData[];
  finalSummary: string;
}
