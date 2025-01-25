import { Schema, model, Types } from 'mongoose';
const StorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    author: {
      type: Types.ObjectId,
      ref: 'NormalUser',
      required: true,
    },
    story_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Story Model
const Story = model('Story', StorySchema);

export default Story;
