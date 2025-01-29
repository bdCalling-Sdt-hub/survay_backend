interface Strength {
  title: string;
  description: string;
}

interface PieChartData {
  category: string;
  percentage: number;
}

interface ProgressBarData {
  label: string;
  percentage: number;
}

export interface IWhy {
  initialSummary: string;
  keyPoints: string[];
  strengths: Strength[];
  weaknesses: string[];
  pieChartData: PieChartData[];
  progressBarData: ProgressBarData[];
  finalSummary: string;
}
