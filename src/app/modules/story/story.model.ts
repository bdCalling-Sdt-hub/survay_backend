import { Schema, model } from 'mongoose';
import { IStory } from './story.interface';
import { ENUM_STORY_STATUS } from '../../utilities/enum';
const StorySchema = new Schema<IStory>(
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
      type: Schema.Types.ObjectId,
      ref: 'NormalUser',
      required: true,
    },
    story_image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ENUM_STORY_STATUS),
      default: ENUM_STORY_STATUS.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

// Create and export the Story Model
const Story = model('Story', StorySchema);

export default Story;
