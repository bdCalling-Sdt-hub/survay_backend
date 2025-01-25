import { Types } from 'mongoose';

export interface IStory {
  title: string;
  description: string;
  author: Types.ObjectId;
  story_image: string;
}
