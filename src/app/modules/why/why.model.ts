import mongoose, { Schema } from 'mongoose';
import {
  ICourseSuggestions,
  IPieChartData,
  IProgressBarData,
  IStrength,
  IWhy,
} from './why.interface';

const StrengthSchema = new Schema<IStrength>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
const weeknessSchema = new Schema<IStrength>({
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

const courseSuggestionSchema = new Schema<ICourseSuggestions>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  platform: {
    type: String,
  },
  link: {
    type: String,
  },
});

const WhySchema = new Schema<IWhy>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'NormalUser',
    },
    initialSummary: { type: String },
    keyPoints: { type: [String] },
    strengths: { type: [StrengthSchema] },
    weaknesses: { type: [weeknessSchema] },
    pieChartData: { type: [PieChartDataSchema] },
    progressBarData: { type: [ProgressBarDataSchema] },
    finalSummary: { type: String },
    courseSuggestions: [courseSuggestionSchema],
  },
  {
    timestamps: true,
  },
);

const Why = mongoose.model<IWhy>('Why', WhySchema);

export default Why;
