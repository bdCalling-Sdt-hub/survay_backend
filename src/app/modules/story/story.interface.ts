import { Types } from 'mongoose';
import { ENUM_STORY_STATUS } from '../../utilities/enum';

export interface IStory {
  title: string;
  description: string;
  author: Types.ObjectId;
  story_image: string;
  status: (typeof ENUM_STORY_STATUS)[keyof typeof ENUM_STORY_STATUS];
}
