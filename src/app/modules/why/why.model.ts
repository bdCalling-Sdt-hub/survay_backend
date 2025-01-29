import mongoose, { Schema } from 'mongoose';
import {
  IPieChartData,
  IProgressBarData,
  IStrength,
  IWhy,
} from './why.interface';

const StrengthSchema = new Schema<IStrength>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const PieChartDataSchema: Schema = new Schema<IPieChartData>({
  category: { type: String, required: true },
  percentage: { type: Number, required: true },
});

const ProgressBarDataSchema: Schema = new Schema<IProgressBarData>({
  label: { type: String, required: true },
  percentage: { type: Number, required: true },
});

const WhySchema = new Schema<IWhy>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'NormalUser',
  },
  initialSummary: { type: String, required: true },
  keyPoints: { type: [String], required: true },
  strengths: { type: [StrengthSchema], required: true },
  weaknesses: { type: [String], required: true },
  pieChartData: { type: [PieChartDataSchema], required: true },
  progressBarData: { type: [ProgressBarDataSchema], required: true },
  finalSummary: { type: String, required: true },
});

const Why = mongoose.model<IWhy>('Why', WhySchema);

export default Why;
