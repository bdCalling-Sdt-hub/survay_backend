import httpStatus from 'http-status';
import AppError from '../../error/appError';
import QueryBuilder from '../../builder/QueryBuilder';
import unlinkFile from '../../helper/unLinkFile';
import { IStory } from './story.interface';
import Story from './story.model';
import { ENUM_STORY_STATUS } from '../../utilities/enum';

const createStory = async (profileId: string, payload: IStory) => {
  const result = await Story.create({ ...payload, author: profileId });
  return result;
};

const updateStory = async (
  profileId: string,
  id: string,
  payload: Partial<IStory>,
) => {
  const story = await Story.findOne({ _id: id, author: profileId });
  if (!story) {
    throw new AppError(httpStatus.NOT_FOUND, 'Story not found');
  }
  const result = await Story.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (payload.story_image) {
    unlinkFile(payload.story_image);
  }
  return result;
};

const getAllStory = async (query: Record<string, unknown>) => {
  const storyQuery = new QueryBuilder(
    Story.find().populate({ path: 'author', select: 'name profile_image' }),
    query,
  )
    .search(['title', 'description'])
    .fields()
    .filter()
    .paginate()
    .sort();

  const result = await storyQuery.modelQuery;
  const meta = await storyQuery.countTotal();
  return {
    meta,
    result,
  };
};
const getSingleStory = async (id: string) => {
  const result = await Story.findById(id);
  return result;
};

const deleteSingleStory = async (profileId: string, id: string) => {
  const story = await Story.findOne({ author: profileId, _id: id });
  if (!story) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  const result = await Story.findByIdAndDelete(id);
  if (story.story_image) {
    unlinkFile(story.story_image);
  }
  return result;
};

const approveStory = async (id: string) => {
  const story = await Story.findById(id);
  if (!story) {
    throw new AppError(httpStatus.NOT_FOUND, 'Story not found');
  }
  const result = await Story.findByIdAndUpdate(
    id,
    { status: ENUM_STORY_STATUS.APPROVED },
    { new: true, runValidators: true },
  );
  return result;
};

const StoryService = {
  createStory,
  updateStory,
  getAllStory,
  getSingleStory,
  deleteSingleStory,
  approveStory,
};

export default StoryService;
